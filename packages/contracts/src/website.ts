export type SectionKind = "hero" | "about" | "collection" | "contact";
export type SiteSection = {
  id: string; kind: SectionKind; title: string; body: string; hidden: boolean;
  image: string; imageAlt: string; button: string; items: { title: string; body: string }[];
};
export type SiteDraft = {
  version: 1; template: string; palette: string; font: string;
  name: string; brand: string; sections: SiteSection[];
};
export const sectionNames: Record<SectionKind, string> = { hero: "Pembuka", about: "Tentang", collection: "Layanan / menu", contact: "Kontak" };
export const MAX_SECTIONS = 20;
export const MAX_IMAGE_BYTES = 1_500_000;
export const MAX_DRAFT_BYTES = 4_500_000;
export const DRAFT_CAPACITY_MESSAGE = "Draft akan melebihi batas 4,5 MB. Perubahan belum diterapkan. Kecilkan atau hapus gambar lain, lalu coba lagi.";
export function serializeDraft(draft: SiteDraft): string {
  const raw = JSON.stringify(draft);
  if (new TextEncoder().encode(raw).byteLength > MAX_DRAFT_BYTES) throw new Error(DRAFT_CAPACITY_MESSAGE);
  return raw;
}
export function validImage(value: string) {
  return /^\/images\/templates\/(restaurant|service)\.webp$/.test(value) || /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(value) && value.length <= 2_000_100;
}
function string(value: unknown, max = 4000): value is string { return typeof value === "string" && value.length <= max; }
export function parseDraft(raw: string): SiteDraft {
  if (raw.length > MAX_DRAFT_BYTES || new TextEncoder().encode(raw).byteLength > MAX_DRAFT_BYTES) throw new Error("Draft terlalu besar. Batas total 4,5 MB; gunakan gambar yang lebih kecil.");
  let value: unknown;
  try { value = JSON.parse(raw); } catch { throw new Error("File bukan JSON yang valid."); }
  const fail = () => { throw new Error("Format draft tidak didukung. Gunakan cadangan dari editor Mangelek."); };
  if (!value || typeof value !== "object") return fail();
  const d = value as SiteDraft;
  const resolved = { template: ["restaurant", "service"].includes(d.template) ? d.template : "", palette: ["forest", "sand", "ocean", "rose", "mono", "olive"].includes(d.palette) ? d.palette : "", font: ["editorial", "modern", "expressive"].includes(d.font) ? d.font : "" };
  if (d.version !== 1 || !string(d.name, 100) || !d.name.trim() || !string(d.brand, 80) || !d.brand.trim() || resolved.template !== d.template || resolved.palette !== d.palette || resolved.font !== d.font || !Array.isArray(d.sections) || d.sections.length < 1 || d.sections.length > MAX_SECTIONS) return fail();
  const ids = new Set<string>();
  for (const s of d.sections) {
    if (!s || !string(s.id, 100) || !/^[a-zA-Z0-9_-]+$/.test(s.id) || ids.has(s.id) || !Object.hasOwn(sectionNames, s.kind) || !string(s.title, 200) || !string(s.body) || typeof s.hidden !== "boolean" || !string(s.image, 2_000_100) || s.image !== "" && !validImage(s.image) || !string(s.imageAlt, 300) || !string(s.button, 80) || !Array.isArray(s.items) || s.items.length > 6 || s.items.some(item => !item || !string(item.title, 100) || !string(item.body, 1000))) return fail();
    ids.add(s.id);
  }
  if (d.sections.every(section => section.hidden)) return fail();
  return d;
}
