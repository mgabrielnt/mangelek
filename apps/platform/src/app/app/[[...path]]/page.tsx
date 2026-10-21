import { notFound } from "next/navigation";
import { BusinessDashboard } from "@/components/dashboard/BusinessDashboard";
import "@/styles/editor.css";
import "@/styles/cms.css";
import "@/styles/crm.css";
import "@/styles/dashboard.css";

export const metadata = { title: "Dashboard — Mangelek", robots: { index: false, follow: false } };
const routes = new Set(["", "website", "cms", "cms/konten", "cms/media", "cms/form", "crm", "crm/kontak", "crm/organisasi", "crm/deals", "crm/aktivitas", "analytics", "domain", "support"]);
export default async function DashboardPage({ params, searchParams }: { params: Promise<{ path?: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ path = [] }, search] = await Promise.all([params, searchParams]);
  const route = path.join("/");
  if (!routes.has(route)) notFound();
  return <BusinessDashboard key={`${route}-${search.template}-${search.record}`} route={route} template={search.template === "restaurant" ? "restaurant" : "service"} recordId={typeof search.record === "string" ? search.record : undefined} filter={typeof search.filter === "string" ? search.filter : undefined} />;
}
