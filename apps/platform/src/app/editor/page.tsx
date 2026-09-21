import { WebsiteEditor } from "@/components/editor/WebsiteEditor";
import { createDraft } from "@/lib/editor/document";
import "@/styles/template-demo.css";
import "@/styles/editor.css";
export const metadata = { title: "Website Editor — Mangelek", robots: { index: false, follow: false } };
export default async function EditorPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const text = (key: string) => typeof params[key] === "string" ? params[key] as string : undefined;
  const draft = createDraft({ template: text("template"), palette: text("palette"), font: text("font") });
  return <WebsiteEditor key={draft.template} initial={draft} />;
}
