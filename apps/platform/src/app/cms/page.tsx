import { redirect } from "next/navigation";
export const metadata = { title: "Konten & pelanggan — Mangelek", robots: { index: false, follow: false } };
export default async function CmsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const template = params.template === "restaurant" ? "restaurant" : "service";
  redirect(`/app/${params.area === "crm" ? "crm" : "cms"}?template=${template}`);
}
