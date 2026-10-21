import { createDraft } from "@saas/themes/draft";
import { sectionNames, type SectionKind, type SiteSection, type SiteDraft } from "@saas/contracts/website";
export * from "@saas/contracts/website";
export { createDraft } from "@saas/themes/draft";
export function draftImages(draft: SiteDraft) {
  const images = new Map<string, { src: string; alt: string; pages: string[] }>();
  for (const page of [{ title: "Beranda", sections: draft.sections }, ...(draft.pages ?? [])]) {
    for (const section of page.sections) {
      if (!section.image) continue;
      const existing = images.get(section.image);
      if (existing) { if (!existing.pages.includes(page.title)) existing.pages.push(page.title); }
      else images.set(section.image, { src: section.image, alt: section.imageAlt, pages: [page.title] });
    }
  }
  return [...images.values()];
}
/** Keep incoming page links intact in the same undoable document operation. */
export function rewritePageLinks(draft: SiteDraft, oldSlug: string, destination: string): SiteDraft {
  const rewrite = (sections: SiteSection[]) => sections.map(section => section.buttonUrl?.replace(/\/$/, "") === `/${oldSlug}` ? { ...section, buttonUrl: destination } : section);
  return { ...draft, sections: rewrite(draft.sections), ...(draft.pages ? { pages: draft.pages.map(page => ({ ...page, sections: rewrite(page.sections) })) } : {}) };
}
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
