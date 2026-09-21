import { createDraft } from "@saas/themes/draft";
import { sectionNames, type SectionKind, type SiteSection, type SiteDraft } from "@saas/contracts/website";
export * from "@saas/contracts/website";
export { createDraft } from "@saas/themes/draft";
export function newSection(kind: SectionKind): SiteSection {
  const base = createDraft().sections.find(section => section.kind === kind)!;
  return { ...base, id: crypto.randomUUID(), title: sectionNames[kind], body: "Ceritakan bagian ini dengan kata-kata Anda.", items: base.items.map(item => ({ ...item })) };
}
export function moveSection(draft: SiteDraft, id: string, direction: -1 | 1): SiteDraft {
  const index = draft.sections.findIndex(section => section.id === id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= draft.sections.length) return draft;
  const sections = [...draft.sections];
  [sections[index], sections[target]] = [sections[target]!, sections[index]!];
  return { ...draft, sections };
}
