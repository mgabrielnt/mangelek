"use client";
import { useEffect, useState } from "react";
import { rewritePageLinks, type SiteDraft, type SitePage } from "@/lib/editor/document";
import { EditorIcon } from "./EditorIcon";

export function EditorPageSettings({ document, page, change, remove, close }: { document: SiteDraft; page: SitePage | undefined; change: (draft: SiteDraft) => boolean; remove: () => void; close: () => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [slug, setSlug] = useState(page?.slug ?? "");
  const [slugError, setSlugError] = useState("");
  useEffect(() => { setSlug(page?.slug ?? ""); }, [page?.slug]);
  const title = page?.seoTitle ?? document.homeSeo?.title ?? "";
  const description = page?.seoDescription ?? document.homeSeo?.description ?? "";
  const duplicate = page && document.pages?.some(p => p.id !== page.id && p.slug === slug);
  function commitSlug() {
    if (!page || slug === page.slug) return;
    if (duplicate || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setSlugError(duplicate ? "Alamat sudah dipakai. Alamat sebelumnya tetap digunakan." : "Gunakan huruf kecil, angka, dan tanda hubung. Alamat sebelumnya tetap digunakan.");
      setSlug(page.slug); return;
    }
    const next = rewritePageLinks(document, page.slug, `/${slug}`);
    if (!change({ ...next, pages: next.pages!.map(p => p.id === page.id ? { ...p, slug } : p) })) setSlug(page.slug);
  }
  function update(patch: Partial<SitePage>) {
    if (page) change({ ...document, pages: document.pages!.map(p => p.id === page.id ? { ...p, ...patch } : p) });
    else change({ ...document, homeSeo: { title: patch.seoTitle ?? title, description: patch.seoDescription ?? description } });
  }
  return <aside className="editorProperties" aria-label="Pengaturan halaman"><div className="editorPageSettingsHeader"><button className="editorTextButton" onClick={close}><EditorIcon name="back" />Kembali ke konten</button></div><div className="editorPropertyBody">
    <h2>Pengaturan halaman</h2><p className="editorMuted">Rapikan nama, alamat, dan tampilan di hasil pencarian.</p>
    <label className="editorField">Nama di navigasi<input value={page?.title ?? "Beranda"} maxLength={80} disabled={!page} onChange={e => update({ title: e.target.value })} /></label>
    <label className="editorField">Alamat halaman<div className="editorSlug"><span>/</span><input value={slug} placeholder={page ? "tentang-kami" : ""} disabled={!page} maxLength={100} aria-invalid={!!duplicate || !!page && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)} onChange={e => { setSlugError(""); setSlug(e.target.value.toLowerCase().replace(/\s+/g,"-")); }} onBlur={commitSlug} onKeyDown={e => { if (e.key === "Enter") e.currentTarget.blur(); }} /></div><small>{duplicate ? "Alamat ini sudah dipakai halaman lain." : page ? "Tautan menuju halaman ini ikut diperbarui saat alamat diterapkan." : "Beranda selalu menggunakan alamat utama website."}</small></label>
    {slugError && <p role="alert" className="editorMuted">{slugError}</p>}
    <div className="editorSeoHeading"><h3>Hasil pencarian</h3><span>SEO</span></div>
    <label className="editorField">Judul SEO<input value={title} maxLength={120} placeholder={`${page?.title ?? "Beranda"} — ${document.brand}`} onChange={e => update({ seoTitle: e.target.value })} /><small>{title.length}/120 karakter. Kosongkan untuk memakai nama halaman.</small></label>
    <label className="editorField">Deskripsi SEO<textarea value={description} maxLength={320} rows={4} placeholder="Ringkasan yang membantu orang memahami halaman ini." onChange={e => update({ seoDescription: e.target.value })} /><small>{description.length}/320 karakter.</small></label>
    <div className="editorSearchPreview" aria-label="Contoh hasil pencarian"><span>{document.brand} › {page?.slug ?? "Beranda"}</span><h3>{title || `${page?.title ?? "Beranda"} — ${document.brand}`}</h3><p>{description || "Tambahkan deskripsi singkat tentang isi halaman agar lebih mudah dikenali di hasil pencarian."}</p></div><p className="editorMuted">Simulasi tampilan. Mesin pencari dapat menampilkan teks yang berbeda setelah website dipublikasikan.</p>
    {page && <div className="editorPageDanger">{confirmDelete ? <><p>Hapus “{page.title}” beserta isinya? Tombol yang menuju halaman ini akan diarahkan ke Beranda. Anda dapat mengembalikannya dengan Urungkan.</p><button className="editorSecondary" onClick={remove}>Hapus halaman</button><button className="editorTextButton" onClick={() => setConfirmDelete(false)}>Batal</button></> : <button className="editorTextButton" onClick={() => setConfirmDelete(true)}>Hapus halaman ini</button>}</div>}
  </div></aside>;
}
