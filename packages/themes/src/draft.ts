import { demoContent, resolveDesign } from "./catalog";
import type { SiteDraft, SiteSection, SectionKind } from "@saas/contracts/website";
export function createDraft(input: { template?: string | undefined; palette?: string | undefined; font?: string | undefined } = {}): SiteDraft {
  const design = resolveDesign(input);
  const content = demoContent[design.template]!;
  const section = (kind: SectionKind, title: string, body: string): SiteSection => ({ id: kind, kind, title, body, hidden: false, image: "", imageAlt: "", button: "", items: [] });
  return { version: 1, ...design, name: `${content.brand} — Beranda`, brand: content.brand, sections: [
    { ...section("hero", content.title, content.intro), image: `/images/templates/${design.template}.webp`, imageAlt: content.imageAlt, button: "Jelajahi lebih dekat" },
    section("about", content.aboutTitle, content.about),
    { ...section("collection", content.collection, ""), items: content.items.map((title, i) => ({ title, body: content.descriptions[i]! })) },
    section("contact", content.cta, "Tuliskan alamat, jam buka, atau cara terbaik untuk menghubungi bisnis Anda."),
  ] };
}
