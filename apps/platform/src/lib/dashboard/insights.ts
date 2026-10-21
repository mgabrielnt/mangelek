import { stages, type CrmDocument } from "@/lib/crm/document";

const dayKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export function crmInsights(doc: CrmDocument | null, today: string, days: 7 | 30 | 90) {
  const end = new Date(`${today}T12:00:00`);
  if (!Number.isFinite(end.getTime())) return { trend: [], pipeline: [], newContacts: 0, newDeals: 0 };
  const trend = Array.from({ length: days }, (_, index) => {
    const date = new Date(end); date.setDate(end.getDate() - days + 1 + index);
    return { day: dayKey(date), contacts: 0, deals: 0 };
  });
  const lookup = new Map(trend.map(row => [row.day, row]));
  for (const contact of doc?.contacts ?? []) { const row = lookup.get(dayKey(new Date(contact.createdAt))); if (row) row.contacts++; }
  for (const deal of doc?.deals ?? []) { const row = lookup.get(dayKey(new Date(deal.createdAt))); if (row) row.deals++; }
  const pipeline = Object.entries(stages).map(([stage, label]) => {
    const deals = (doc?.deals ?? []).filter(deal => !deal.archived && deal.stage === stage);
    return { stage, label, count: deals.length, amount: deals.reduce((sum, deal) => sum + Number(deal.amount), 0) };
  });
  return { trend, pipeline, newContacts: trend.reduce((sum, row) => sum + row.contacts, 0), newDeals: trend.reduce((sum, row) => sum + row.deals, 0) };
}
