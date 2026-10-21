import "./setup.mjs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { readWorkspace, workspaceSummary } from "../src/lib/dashboard/overview";
import { crmInsights } from "../src/lib/dashboard/insights";
import { emptyCrm, newRecord, replaceRecord, validateCrm, type Contact, type Deal, type Task } from "../src/lib/crm/document";

test("Dashboard preserves empty versus unreadable modules and does not overwrite local data", () => {
  assert.deepEqual(readWorkspace({ getItem: () => null }, "service"), { cms:null, crm:null, website:null, errors:[] });
  const broken = readWorkspace({ getItem: () => "invalid" }, "service");
  assert.equal(broken.errors.length, 3);
  assert.equal(broken.crm, null);
  const blocked = readWorkspace({ getItem: () => { throw new Error("blocked"); } }, "service");
  assert.equal(blocked.errors.length, 3);
});
test("Dashboard totals exclude archived and completed work; overdue and due-today never overlap", () => {
  const task = { ...newRecord("tasks"), name:"Call", due:"2026-09-27" } as Task;
  const contact = { ...newRecord("contacts"), name:"Contact" } as Contact;
  const deal = { ...newRecord("deals"), name:"Deal", contactId:contact.id, amount:"200000" } as Deal;
  const doc = { ...emptyCrm, contacts:[contact,{...contact,id:"archived",archived:true}], deals:[deal,{...deal,id:"won",stage:"won" as const,amount:"900000"},{...deal,id:"archived-deal",archived:true}], tasks:[task,{...task,id:"overdue",due:"2026-09-26"},{...task,id:"future",due:"2026-09-28"},{...task,id:"done",done:true},{...task,id:"archived-task",archived:true}] };
  const summary = workspaceSummary({ crm:doc, cms:null, website:null, errors:[] }, "2026-09-27");
  assert.equal(summary.contacts.length, 1);
  assert.equal(summary.openValue, 200000);
  assert.equal(summary.tasks.length, 3);
  assert.equal(summary.overdue.length, 1);
  assert.equal(summary.dueToday.length, 1);
  assert.equal(summary.tasks[0].id, "overdue");
});
test("Reassigning a deal keeps related task contacts consistent atomically", () => {
  const first = { ...newRecord("contacts"), name:"First" } as Contact;
  const second = { ...newRecord("contacts"), name:"Second" } as Contact;
  const deal = { ...newRecord("deals"), name:"Deal", contactId:first.id } as Deal;
  const task = { ...newRecord("tasks"), name:"Follow up", dealId:deal.id, contactId:first.id } as Task;
  const original = { ...emptyCrm, contacts:[first,second], deals:[deal], tasks:[task] };
  const updated = replaceRecord(original,"deals",{...deal,contactId:second.id});
  validateCrm(updated);
  assert.equal(updated.tasks[0].contactId,second.id);
  assert.equal(original.tasks[0].contactId,first.id);
});

test("CRM charts include both period boundaries and exclude outside dates", () => {
  const contact = { ...newRecord("contacts"), name:"Contact" } as Contact;
  const doc = { ...emptyCrm, contacts: [
    { ...contact, id:"start", createdAt:"2026-09-22T00:00:00" },
    { ...contact, id:"end", createdAt:"2026-09-28T23:59:59" },
    { ...contact, id:"before", createdAt:"2026-09-21T23:59:59" },
    { ...contact, id:"future", createdAt:"2026-09-29T00:00:00" },
  ] };
  const result = crmInsights(doc, "2026-09-28", 7);
  assert.equal(result.trend.length, 7);
  assert.deepEqual(result.trend[0], { day:"2026-09-22", contacts:1, deals:0 });
  assert.deepEqual(result.trend.at(-1), { day:"2026-09-28", contacts:1, deals:0 });
  assert.equal(result.newContacts, 2);
  for (const days of [30,90] as const) {
    const period = crmInsights(doc, "2026-09-28", days);
    assert.equal(period.trend.length, days);
    assert.equal(period.newContacts, 3);
  }
});

test("CRM history retains archived creations but current pipeline excludes archives", () => {
  const deal = { ...newRecord("deals"), name:"Deal", amount:"200000", createdAt:"2026-09-28T12:00:00", stage:"proposal" } as Deal;
  const result = crmInsights({ ...emptyCrm, deals:[deal,{...deal,id:"archived",archived:true},{...deal,id:"won",stage:"won",amount:"900000"}] }, "2026-09-28", 7);
  assert.equal(result.newDeals, 3);
  assert.equal(result.pipeline.reduce((sum,row) => sum + row.count,0), 2);
  assert.equal(result.pipeline.reduce((sum,row) => sum + row.amount,0), 1100000);
  assert.equal(crmInsights(null,"2026-09-28",7).newContacts,0);
  assert.deepEqual(crmInsights(null,"invalid",7).trend,[]);
});
