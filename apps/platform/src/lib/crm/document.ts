export const crmSections = { contacts: "Kontak", companies: "Perusahaan", deals: "Peluang", tasks: "Tindak lanjut" } as const;
export type CrmSection = keyof typeof crmSections;
export const stages = { new: "Baru", contacted: "Dihubungi", proposal: "Penawaran", negotiation: "Negosiasi", won: "Berhasil", lost: "Tidak lanjut" } as const;
export type Stage = keyof typeof stages;
type Base = { id: string; archived: boolean; createdAt: string; updatedAt: string };
export type Contact = Base & { name: string; email: string; phone: string; companyId: string; status: "lead" | "customer"; source: string; consent: "unknown" | "allowed" | "denied"; notes: string };
export type Company = Base & { name: string; domain: string; industry: string; notes: string };
export type Deal = Base & { name: string; contactId: string; amount: string; stage: Stage; due: string; notes: string };
export type Task = Base & { name: string; contactId: string; dealId: string; due: string; priority: "normal" | "high"; done: boolean; notes: string };
export type CrmRecord = Contact | Company | Deal | Task;
export type Activity = { id: string; at: string; contactId: string; dealId: string; text: string };
export type CrmDocument = { version: 1; contacts: Contact[]; companies: Company[]; deals: Deal[]; tasks: Task[]; activities: Activity[] };
export const emptyCrm: CrmDocument = { version: 1, contacts: [], companies: [], deals: [], tasks: [], activities: [] };
export function dateOnlyValid(value: string) { const date = new Date(`${value}T12:00:00Z`); return !value || /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value; }
export function todayLocal() { const now = new Date(); return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`; }
export function money(value: number | string) { return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(value)); }
const fail = (message: string): never => { throw new Error(message); };
const text = (value: unknown, max = 200): value is string => typeof value === "string" && value.length <= max;
export function validateCrm(document: CrmDocument): CrmDocument {
  if (!document || document.version !== 1) fail("Format cadangan CRM tidak didukung.");
  for (const key of [...Object.keys(crmSections), "activities"] as (keyof Omit<CrmDocument,"version">)[]) if (!Array.isArray(document[key]) || document[key].length > 1000) fail("Data CRM tidak valid atau melampaui batas penyimpanan lokal.");
  const ids = new Set<string>();
  for (const item of [...document.contacts, ...document.companies, ...document.deals, ...document.tasks]) {
    if (!item || !text(item.id,100) || !/^[a-zA-Z0-9_-]+$/.test(item.id) || ids.has(item.id)) fail("ID catatan CRM harus unik.");
    ids.add(item.id);
    if (!text(item.name,160) || !item.name.trim()) fail("Isi nama catatan terlebih dahulu.");
    if (!text(item.notes,10000) || typeof item.archived !== "boolean" || !text(item.createdAt,40) || !text(item.updatedAt,40) || !Number.isFinite(Date.parse(item.createdAt)) || !Number.isFinite(Date.parse(item.updatedAt))) fail("Detail catatan CRM tidak valid.");
  }
  const companies = new Set(document.companies.map(item=>item.id)), contacts = new Set(document.contacts.map(item=>item.id)), deals = new Set(document.deals.map(item=>item.id));
  const emails = new Set<string>(), domains = new Set<string>();
  for (const item of document.companies) {
    if (!text(item.domain,200) || item.domain && !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(item.domain) || !text(item.industry,100)) fail("Domain perusahaan harus seperti contoh.com, tanpa https atau garis miring.");
    const domain = item.domain.toLowerCase(); if (domain && domains.has(domain)) fail("Domain ini sudah digunakan oleh perusahaan lain, termasuk arsip."); if (domain) domains.add(domain);
  }
  for (const item of document.contacts) {
    if (!text(item.email,254) || item.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)) fail("Alamat email kontak tidak valid.");
    const email = item.email.trim().toLowerCase(); if (email && emails.has(email)) fail("Email ini sudah digunakan oleh kontak lain, termasuk arsip."); if (email) emails.add(email);
    if (!text(item.phone,40) || item.phone && !/^\+?[\d\s()-]{5,40}$/.test(item.phone)) fail("Nomor telepon hanya boleh berisi angka, spasi, +, kurung, atau tanda hubung.");
    if (!text(item.companyId,100) || item.companyId && !companies.has(item.companyId) || !["lead","customer"].includes(item.status) || !["unknown","allowed","denied"].includes(item.consent) || !text(item.source,100)) fail("Perusahaan, status, atau preferensi kontak tidak valid.");
  }
  for (const item of document.deals) {
    if (!text(item.contactId,100) || !contacts.has(item.contactId)) fail("Pilih kontak yang tersedia untuk peluang ini.");
    if (!text(item.amount,12) || !/^\d{1,12}$/.test(item.amount)) fail("Nilai peluang harus angka rupiah tanpa titik, koma, atau tanda minus.");
    if (!Object.hasOwn(stages,item.stage) || !text(item.due,10) || !dateOnlyValid(item.due)) fail("Tahap atau tanggal target peluang tidak valid.");
  }
  for (const item of document.tasks) {
    if (!text(item.contactId,100) || item.contactId && !contacts.has(item.contactId) || !text(item.dealId,100) || item.dealId && !deals.has(item.dealId)) fail("Kontak atau peluang untuk tindak lanjut tidak ditemukan.");
    if (item.dealId && item.contactId && document.deals.find(deal=>deal.id===item.dealId)?.contactId !== item.contactId) fail("Kontak tindak lanjut harus sesuai kontak pada peluang yang dipilih.");
    if (!text(item.due,10) || !item.due || !dateOnlyValid(item.due) || !["normal","high"].includes(item.priority) || typeof item.done !== "boolean") fail("Isi tanggal tindak lanjut dan prioritas yang valid.");
  }
  for (const item of document.activities) {
    if (!item || !text(item.id,100) || ids.has(item.id) || !text(item.at,40) || !Number.isFinite(Date.parse(item.at)) || !text(item.text,4000) || !text(item.contactId,100) || item.contactId && !contacts.has(item.contactId) || !text(item.dealId,100) || item.dealId && !deals.has(item.dealId)) fail("Riwayat aktivitas tidak valid.");
    ids.add(item.id);
  }
  if (new TextEncoder().encode(JSON.stringify(document)).length > 2_000_000) fail("Cadangan CRM melebihi kapasitas lokal 2 MB.");
  return document;
}
export function parseCrm(raw: string) { if (raw.length > 2_000_000) fail("Cadangan CRM terlalu besar."); return validateCrm(JSON.parse(raw) as CrmDocument); }
export function replaceRecord(document: CrmDocument, section: CrmSection, record: CrmRecord): CrmDocument {
  const next = { ...document, [section]: document[section].some(item => item.id === record.id) ? document[section].map(item=>item.id === record.id ? record : item) : [record,...document[section]] };
  if (section === "deals") next.tasks = next.tasks.map(task => task.dealId === record.id ? { ...task, contactId: (record as Deal).contactId } : task);
  return next;
}
export function newRecord(section: CrmSection): CrmRecord {
  const base = { id: crypto.randomUUID(), name: "", notes: "", archived: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  if (section === "contacts") return { ...base, email:"",phone:"",companyId:"",status:"lead",source:"Manual",consent:"unknown" };
  if (section === "companies") return {...base,domain:"",industry:""};
  if (section === "deals") return {...base,contactId:"",amount:"0",stage:"new",due:""};
  return {...base,contactId:"",dealId:"",due:todayLocal(),priority:"normal",done:false};
}
