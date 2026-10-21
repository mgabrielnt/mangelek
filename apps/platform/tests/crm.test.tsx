import "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { CrmWorkspace } from "../src/components/cms/CrmWorkspace";
import { shiftDay } from "../src/components/cms/CrmAgenda";
import { dateOnlyValid, emptyCrm, newRecord, parseCrm, replaceRecord, stages, validateCrm, type Company, type Contact, type Deal, type Task } from "../src/lib/crm/document";
const company = { ...newRecord("companies"), name: "Example Studio", domain: "example.com" } as Company;
const contact = { ...newRecord("contacts"), name: "Example Contact", email: "person@example.com", companyId: company.id } as Contact;
const deal = { ...newRecord("deals"), name: "Website", contactId: contact.id, amount: "200000", stage: "proposal" } as Deal;
const task = { ...newRecord("tasks"), name: "Follow up", contactId: contact.id, dealId: deal.id, due: "2026-09-24" } as Task;
const data = { ...emptyCrm, companies: [company], contacts: [contact], deals: [deal], tasks: [task], activities: [{ id: "activity-1", contactId: contact.id, dealId: deal.id, at: contact.createdAt, text: "Sent a proposal" }] };

test("Agenda dates cross month and year boundaries without losing the local day", () => {
  assert.equal(shiftDay("2026-12-31",1),"2027-01-01");
  assert.equal(shiftDay("2024-03-01",-1),"2024-02-29");
  assert.equal(shiftDay("2026-09-28",6),"2026-10-04");
});

test("Agenda completes and reopens tasks, saves schedules explicitly, and protects against stale writes", async () => {
  let raw = JSON.stringify(data);
  Object.defineProperty(globalThis,"localStorage",{configurable:true,value:{getItem:()=>raw,setItem:(_key:string,value:string)=>{raw=value;}}});
  const originalFormData = globalThis.FormData;
  globalThis.FormData = window.FormData as typeof FormData;
  const host = document.getElementById("test-root")!;
  const root = createRoot(host);
  try {
    await act(async()=>root.render(<CrmWorkspace template="service" initialSection="tasks" embedded />));
    await act(async()=>host.querySelector<HTMLButtonElement>('.crmAgendaComplete')!.click());
    assert.equal(parseCrm(raw).tasks[0].done,true);
    assert.match(parseCrm(raw).activities.at(-1)!.text,/Selesai/);
    assert.equal(host.querySelectorAll('.crmAgendaTask').length,0);
    await act(async()=>host.querySelector<HTMLButtonElement>('.crmAgendaStats button[data-tone="done"]')!.click());
    await act(async()=>host.querySelector<HTMLButtonElement>('.crmAgendaComplete')!.click());
    assert.equal(parseCrm(raw).tasks[0].done,false);
    await act(async()=>host.querySelector<HTMLButtonElement>('.crmAgendaStats button[data-tone="active"]')!.click());
    const input = host.querySelector<HTMLInputElement>('.crmAgendaTaskDetails input')!;
    input.value = '2026-10-05';
    assert.equal(parseCrm(raw).tasks[0].due,task.due);
    await act(async()=>host.querySelector('.crmAgendaTaskDetails form')!.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true})));
    assert.equal(parseCrm(raw).tasks[0].due,'2026-10-05');
    assert.match(parseCrm(raw).activities.at(-1)!.text,/Jadwal/);
    const newer = JSON.stringify({...parseCrm(raw),tasks:[{...parseCrm(raw).tasks[0],name:'Updated elsewhere'}]});
    raw = newer;
    await act(async()=>host.querySelector<HTMLButtonElement>('.crmAgendaComplete')!.click());
    assert.equal(raw,newer);
    assert.match(host.textContent!,/Periksa versi tersimpan/);
  } finally { await act(async()=>root.unmount()); globalThis.FormData = originalFormData; }
});
test("CRM backup roundtrip preserves relationships, history, and archived records", () => {
  const archived = replaceRecord(data, "contacts", { ...contact, archived: true });
  assert.deepEqual(parseCrm(JSON.stringify(archived)), archived);
  assert.equal(archived.tasks[0].contactId, contact.id);
  assert.equal(data.contacts[0].archived, false);
});
test("CRM prevents case-insensitive duplicate email and domains, including archives", () => {
  assert.throws(() => validateCrm({ ...data, contacts: [contact, { ...contact, id: "another", email: "PERSON@EXAMPLE.COM", archived: true }] }), /Email ini sudah/);
  assert.throws(() => validateCrm({ ...data, companies: [company, { ...company, id: "another", domain: "EXAMPLE.COM" }] }), /Domain ini sudah/);
});
test("CRM refuses orphaned or mismatched relationships without discarding records", () => {
  assert.throws(() => validateCrm({ ...data, companies: [] }), /Perusahaan/);
  assert.throws(() => validateCrm({ ...data, contacts: [] }), /kontak/);
  assert.throws(() => validateCrm({ ...data, deals: [] }), /peluang/);
  const other = { ...contact, id: "other", email: "other@example.com" };
  assert.throws(() => validateCrm({ ...data, contacts: [contact, other], tasks: [{ ...task, contactId: other.id }] }), /sesuai/);
});
test("CRM rejects invalid money, impossible dates, arbitrary stages, and malformed imports", () => {
  for (const amount of ["-1", "1e4", "2.5", "200,000", ""]) assert.throws(() => validateCrm({ ...data, deals: [{ ...deal, amount }] }), /Nilai peluang/);
  for (const due of ["2026-02-29", "9999-99-99", "invalid", ""]) assert.throws(() => validateCrm({ ...data, tasks: [{ ...task, due }] }), /tanggal/);
  assert.equal(dateOnlyValid("2024-02-29"), true);
  assert.equal(dateOnlyValid("2026-02-29"), false);
  assert.throws(() => parseCrm(JSON.stringify({ ...data, deals: [{ ...deal, stage: "unknown" }] })), /Tahap/);
  for (const value of [null, {}, { ...data, contacts: null }, { ...data, contacts: [contact, contact] }]) assert.throws(() => parseCrm(JSON.stringify(value)));
});

test("CRM stale tabs cannot archive over a newer save, and storage failures retain the record", async () => {
  let raw = JSON.stringify(data), failWrite = false;
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem: () => raw,
    setItem: (_key: string, value: string) => { if (failWrite) throw new DOMException("Quota exceeded", "QuotaExceededError"); raw = value; }
  } });
  const host = document.getElementById("test-root")!;
  const root = createRoot(host);
  const click = async (label: string) => { const button = [...host.querySelectorAll("button")].find(item => item.textContent === label)!; assert.ok(button, label); await act(async () => button.click()); };
  await act(async () => root.render(<CrmWorkspace template="service" />));
  const newer = JSON.stringify({ ...data, contacts: [{ ...contact, name: "Newer version" }] });
  raw = newer;
  await click("Arsipkan");
  assert.equal(raw, newer);
  assert.match(host.textContent!, /Periksa versi tersimpan/);
  await click("Muat versi tersimpan");
  failWrite = true;
  await click("Arsipkan");
  assert.equal(raw, newer);
  assert.match(host.textContent!, /Belum tersimpan/);
  assert.match(host.textContent!, /Newer version/);
  await act(async () => root.unmount());
});

test("pipeline stage selection persists history and moves the deal, while a stale tab cannot overwrite it", async () => {
  let raw = JSON.stringify(data);
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: {
    getItem: () => raw, setItem: (_key: string, value: string) => { raw = value; }
  } });
  const host = document.getElementById("test-root")!;
  const root = createRoot(host);
  await act(async () => root.render(<CrmWorkspace template="service" initialSection="deals" embedded />));
  const select = host.querySelector<HTMLSelectElement>(".crmDealCard select")!;
  assert.equal(select.value, "proposal");
  await act(async () => { select.value = "won"; select.dispatchEvent(new window.Event("change", { bubbles: true })); });
  const saved = parseCrm(raw);
  assert.equal(saved.deals[0].stage, "won");
  assert.match(saved.activities.at(-1)!.text, /Tahap berubah/);
  assert.equal(saved.tasks[0].dealId, deal.id);
  const column = [...host.querySelectorAll(".crmBoardColumn")].find(item => item.getAttribute("aria-label") === stages.won)!;
  assert.match(column.textContent!, /Website/);
  const newer = JSON.stringify({ ...saved, deals: [{ ...saved.deals[0], name: "Changed in another tab" }] });
  raw = newer;
  const moved = host.querySelector<HTMLSelectElement>(".crmDealCard select")!;
  await act(async () => { moved.value = "lost"; moved.dispatchEvent(new window.Event("change", { bubbles: true })); });
  assert.equal(raw, newer);
  assert.match(host.textContent!, /Periksa versi tersimpan/);
  await act(async () => root.unmount());
});

