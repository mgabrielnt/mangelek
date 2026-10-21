export const collections = {
  services: { name: "Layanan", singular: "layanan", description: "Jelaskan apa yang Anda tawarkan dan manfaatnya bagi pelanggan." },
  menu: { name: "Menu", singular: "menu", description: "Susun pilihan makanan dan minuman dengan informasi yang jelas." },
  articles: { name: "Artikel", singular: "artikel", description: "Bagikan cerita, kabar, dan pengetahuan dari bisnis Anda." },
} as const;
export type CollectionKey = keyof typeof collections;
export type CmsItem = { id: string; collection: CollectionKey; title: string; slug: string; summary: string; body: string; price: string; archived: boolean; updatedAt: string };
export type CmsDocument = { version: 1; items: CmsItem[] };
export const emptyCms: CmsDocument = { version: 1, items: [] };
export function slugify(value: string) { return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100).replace(/-$/, ""); }
export function itemError(item: CmsItem, items: CmsItem[]) {
  if (!item.title.trim()) return "Isi judul konten terlebih dahulu.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug)) return "Alamat konten harus berisi huruf kecil, angka, dan tanda hubung.";
  if (items.some(other => other.id !== item.id && other.collection === item.collection && other.slug === item.slug)) return "Alamat ini sudah digunakan dalam koleksi yang sama, termasuk di arsip.";
  if (item.price && (!/^\d{1,12}$/.test(item.price) || Number(item.price) < 0)) return "Harga harus berupa angka rupiah tanpa titik atau koma.";
  return "";
}
export function serializeCms(document: CmsDocument) {
  const raw = JSON.stringify(document);
  if (new TextEncoder().encode(raw).length > 2_000_000) throw new Error("Penyimpanan lokal konten melebihi 2 MB. Unduh cadangan dan ringkas isi sebelum menyimpan.");
  return raw;
}
export function parseCms(raw: string): CmsDocument {
  if (raw.length > 2_000_000) throw new Error("Cadangan konten terlalu besar.");
  const value = JSON.parse(raw) as CmsDocument;
  if (!value || value.version !== 1 || !Array.isArray(value.items) || value.items.length > 500) throw new Error("Format cadangan konten tidak didukung.");
  const ids = new Set<string>();
  for (const item of value.items) {
    if (!item || typeof item.id !== "string" || !/^[\w-]{1,100}$/.test(item.id) || ids.has(item.id) || !Object.hasOwn(collections, item.collection) || typeof item.archived !== "boolean") throw new Error("Data konten tidak valid.");
    for (const [key, max] of [["title", 160], ["slug", 100], ["summary", 500], ["body", 30000], ["price", 12], ["updatedAt", 40]] as const) if (typeof item[key] !== "string" || item[key].length > max) throw new Error("Teks konten melebihi batas yang didukung.");
    if (!Number.isFinite(Date.parse(item.updatedAt))) throw new Error("Tanggal konten tidak valid.");
    const error = itemError(item, value.items); if (error) throw new Error(error);
    ids.add(item.id);
  }
  serializeCms(value);
  return value;
}
