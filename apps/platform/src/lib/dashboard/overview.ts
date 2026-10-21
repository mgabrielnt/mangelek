import { parseCms, type CmsDocument } from "@/lib/cms/document";
import { parseCrm, type CrmDocument } from "@/lib/crm/document";
import { parseDraft, type SiteDraft } from "@/lib/editor/document";

export type WorkspaceSnapshot = { cms: CmsDocument | null; crm: CrmDocument | null; website: SiteDraft | null; errors: string[] };
export function readWorkspace(storage: Pick<Storage, "getItem">, template: string): WorkspaceSnapshot {
  const result: WorkspaceSnapshot = { cms: null, crm: null, website: null, errors: [] };
  const read = <T,>(key: string, parse: (raw: string) => T, label: string): T | null => {
    try { const raw = storage.getItem(key); return raw ? parse(raw) : null; }
    catch { result.errors.push(`${label} belum dapat dibaca. Buka modulnya untuk memeriksa atau memulihkan cadangan.`); return null; }
  };
  result.cms = read(`mangelek-cms-local-v1-${template}`, parseCms, "Konten CMS");
  result.crm = read(`mangelek-crm-local-v1-${template}`, parseCrm, "Data CRM");
  result.website = read(`mangelek-editor-v1-${template}`, parseDraft, "Draft website");
  return result;
}
export function workspaceSummary(snapshot: WorkspaceSnapshot, today: string) {
  const crm = snapshot.crm;
  const tasks = (crm?.tasks ?? []).filter(item => !item.done && !item.archived).sort((a,b) => a.due.localeCompare(b.due) || Number(b.priority === "high") - Number(a.priority === "high"));
  const contacts = (crm?.contacts ?? []).filter(item => !item.archived);
  const deals = (crm?.deals ?? []).filter(item => !item.archived);
  const openDeals = deals.filter(item => !["won", "lost"].includes(item.stage));
  return { tasks, overdue: tasks.filter(item => item.due < today), dueToday: tasks.filter(item => item.due === today), contacts, deals, openDeals, openValue: openDeals.reduce((total,item) => total + Number(item.amount), 0), content: (snapshot.cms?.items ?? []).filter(item => !item.archived).sort((a,b) => b.updatedAt.localeCompare(a.updatedAt)), activities: [...(crm?.activities ?? [])].sort((a,b) => b.at.localeCompare(a.at)) };
}
