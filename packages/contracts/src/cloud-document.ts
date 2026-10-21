/** Canonical v5.2 wire format. Local demo backups deliberately use a separate schema. */
export type BlockType = "hero" | "text" | "image" | "services" | "menu" | "contact" | "articles";
export type ContentBlock = { id: string; type: BlockType; props: { heading?: string; text?: string; asset_id?: string; collection_key?: string; button_label?: string; button_url?: string } };
export type ContentPage = { id: string; path: string; title: string; seo_description: string; blocks: ContentBlock[] };
export type CloudDocument = { schema_version: 1; pages: ContentPage[]; navigation: { label: string; path: string }[]; theme: { primary_color: string; font_key: "sans" | "serif" } };
export type CloudDraft = { revision_id: string; revision_no: number; etag: string; document: CloudDocument; updated_at: string };
export const MAX_CLOUD_DOCUMENT_BYTES = 1_048_576;
export const isUuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
const types: BlockType[] = ["hero", "text", "image", "services", "menu", "contact", "articles"];
function record(value: unknown, keys: string[]): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).some(key => !keys.includes(key))) throw new Error("Objek dokumen tidak didukung.");
  return value as Record<string, unknown>;
}
function text(value: unknown, max: number): value is string { return typeof value === "string" && value.length <= max; }
function path(value: unknown): value is string { return text(value, 240) && /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/?)*$/.test(value); }
export function safeButtonUrl(value: unknown): boolean {
  if (!text(value, 2048) || /[\s\\\u0000-\u001f]/.test(value)) return false;
  if (value === "" || path(value) || /^#[a-zA-Z0-9_-]+$/.test(value)) return true;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; } catch { return false; }
}
export function parseCloudDocument(value: unknown): CloudDocument {
  const d = record(value, ["schema_version", "pages", "navigation", "theme"]);
  if (new TextEncoder().encode(JSON.stringify(d)).byteLength > MAX_CLOUD_DOCUMENT_BYTES) throw new Error("Dokumen melebihi batas 1 MB; gambar harus memakai referensi media.");
  if (d.schema_version !== 1 || !Array.isArray(d.pages) || !d.pages.length || d.pages.length > 20 || !Array.isArray(d.navigation) || d.navigation.length > 20) throw new Error("Dokumen harus berisi 1–20 halaman.");
  const ids = new Set<string>(), paths = new Set<string>();
  const uniqueId = (id: unknown) => { if (!isUuid(id) || ids.has(id)) throw new Error("ID halaman dan blok harus unik."); ids.add(id); };
  for (const page of d.pages) {
    const p = record(page, ["id", "path", "title", "seo_description", "blocks"]); uniqueId(p.id);
    if (!path(p.path) || paths.has(p.path.replace(/\/$/, "") || "/") || !text(p.title, 120) || !p.title.trim() || !text(p.seo_description, 320) || !Array.isArray(p.blocks) || p.blocks.length > 100) throw new Error("Judul, alamat, atau blok halaman tidak valid.");
    paths.add(p.path.replace(/\/$/, "") || "/");
    for (const block of p.blocks) {
      const b = record(block, ["id", "type", "props"]); uniqueId(b.id);
      if (!types.includes(b.type as BlockType)) throw new Error("Jenis blok tidak didukung.");
      const props = record(b.props, ["heading", "text", "asset_id", "collection_key", "button_label", "button_url"]);
      for (const [key, max] of [["heading", 200], ["text", 20000], ["button_label", 80]] as const) if (key in props && !text(props[key], max)) throw new Error("Teks blok melebihi batas.");
      if ("asset_id" in props && (!isUuid(props.asset_id) || !["hero", "image"].includes(b.type as string))) throw new Error("Referensi gambar tidak valid untuk blok ini.");
      if ("collection_key" in props && (!["services", "menu", "articles"].includes(b.type as string) || props.collection_key !== b.type)) throw new Error("Gunakan koleksi bawaan yang sesuai jenis blok.");
      if ("button_url" in props && !safeButtonUrl(props.button_url)) throw new Error("Alamat tombol harus HTTPS, alamat halaman, atau tautan bagian.");
    }
  }
  if (!paths.has("/")) throw new Error("Website membutuhkan halaman beranda dengan alamat /.");
  for (const item of d.navigation) { const nav = record(item, ["label", "path"]); if (!text(nav.label, 80) || !nav.label.trim() || !path(nav.path) || !paths.has(nav.path.replace(/\/$/, "") || "/")) throw new Error("Navigasi harus menunjuk halaman yang tersedia."); }
  const theme = record(d.theme, ["primary_color", "font_key"]);
  if (typeof theme.primary_color !== "string" || !/^#[0-9a-f]{6}$/i.test(theme.primary_color) || !["sans", "serif"].includes(theme.font_key as string)) throw new Error("Tema tidak didukung.");
  return d as CloudDocument;
}
export function parseDraftPatch(value: unknown): CloudDocument { const body = record(value, ["document"]); return parseCloudDocument(body.document); }
