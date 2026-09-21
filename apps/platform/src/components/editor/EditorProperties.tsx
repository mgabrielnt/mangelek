"use client";
import { useRef, useState } from "react";
import { palettes, fontPacks } from "@/data/template-designs";
import { MAX_IMAGE_BYTES, sectionNames, type SiteDraft, type SiteSection } from "@/lib/editor/document";
import { EditorIcon } from "./EditorIcon";

export function EditorProperties({ draft, section, styleMode, onStyleMode, update, change, onError }: { draft: SiteDraft; section: SiteSection; styleMode: boolean; onStyleMode: (v: boolean) => void; update: (patch: Partial<SiteSection>) => boolean; change: (next: SiteDraft) => void; onError: (message: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const imageInput = useRef<HTMLInputElement>(null);
  async function upload(file?: File) {
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > MAX_IMAGE_BYTES) { onError("Gunakan gambar JPG, PNG, atau WebP berukuran maksimal 1,5 MB."); return; }
    setUploading(true);
    try {
      const data = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(new Error("read")); reader.readAsDataURL(file); });
      await new Promise<void>((resolve, reject) => { const image = new Image(); image.onload = () => image.width > 0 && image.width <= 12000 && image.height <= 12000 ? resolve() : reject(new Error("dimensions")); image.onerror = reject; image.src = data; });
      update({ image: data });
    } catch { onError("Gambar tidak dapat dibaca. Pilih gambar lain dengan dimensi maksimal 12.000 piksel."); }
    finally { setUploading(false); if (imageInput.current) imageInput.current.value = ""; }
  }
  return <aside className="editorProperties" aria-label="Pengaturan website">
    <div className="editorPropertyTabs" role="group" aria-label="Jenis pengaturan"><button aria-pressed={!styleMode} onClick={() => onStyleMode(false)}><EditorIcon name="type" />Konten</button><button aria-pressed={styleMode} onClick={() => onStyleMode(true)}><EditorIcon name="style" />Desain</button></div>
    {styleMode ? <div className="editorPropertyBody">
      <h2>Desain website</h2><p className="editorMuted">Satu gaya yang konsisten di seluruh halaman.</p>
      <label className="editorField">Nama bisnis<input value={draft.brand} maxLength={80} onChange={e => change({ ...draft, brand: e.target.value })} /></label>
      <fieldset className="editorPalettes"><legend>Palet warna</legend>{palettes.map(p => <button key={p.id} aria-pressed={draft.palette === p.id} onClick={() => change({ ...draft, palette: p.id })}><span className="editorSwatches" aria-hidden="true">{[p.background, p.surface, p.accent, p.ink].map((color, i) => <i key={i} style={{ background: color }} />)}</span><span>{p.name}</span>{draft.palette === p.id && <EditorIcon name="check" />}</button>)}</fieldset>
      <fieldset className="editorFonts"><legend>Pasangan font</legend>{fontPacks.map(f => <button aria-pressed={draft.font === f.id} key={f.id} onClick={() => change({ ...draft, font: f.id })}><span className="editorFontSample" style={{ fontFamily: f.family }}>Aa</span><span><strong>{f.name}</strong><small>{f.heading} + Manrope</small></span>{draft.font === f.id && <EditorIcon name="check" />}</button>)}</fieldset>
    </div> : <div className="editorPropertyBody">
      <h2>{sectionNames[section.kind]}</h2><p className="editorMuted">Perubahan langsung terlihat di kanvas.</p>
      {section.hidden && <p className="editorInlineNotice">Bagian ini disembunyikan dari preview.</p>}
      <label className="editorField">Judul<textarea rows={3} maxLength={200} value={section.title} onChange={e => update({ title: e.target.value })} /></label>
      <label className="editorField">Deskripsi<textarea rows={5} maxLength={4000} value={section.body} onChange={e => update({ body: e.target.value })} /></label>
      {section.kind === "hero" && <>
        <label className="editorField">Teks tombol<input maxLength={80} value={section.button} onChange={e => update({ button: e.target.value })} /><small>Mengarah ke bagian berikutnya pada halaman.</small></label>
        <div className="editorImageControl"><h3>Gambar pembuka</h3>{section.image ? <img src={section.image} alt="Gambar pembuka yang dipilih" /> : <p className="editorMuted">Belum ada gambar.</p>}
          <input ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp" className="editorSrOnly" id="editor-image" onChange={e => void upload(e.target.files?.[0])} disabled={uploading} />
          <label htmlFor="editor-image" className="editorSecondary editorUpload"><EditorIcon name="upload" />{uploading ? "Membaca gambar…" : "Ganti gambar"}</label><p className="editorMuted">JPG, PNG, WebP · Maks. 1,5 MB</p>
          {section.image && <button className="editorTextButton" onClick={() => update({ image: "", imageAlt: "" })}>Hapus gambar</button>}
        </div>
        <label className="editorField">Deskripsi gambar<input maxLength={300} value={section.imageAlt} onChange={e => update({ imageAlt: e.target.value })} /><small>Jelaskan isi gambar untuk pengguna pembaca layar.</small></label>
      </>}
      {section.kind === "collection" && <div className="editorItems"><h3>Isi bagian</h3>{section.items.map((item, i) => <fieldset key={i}><legend>Item {i + 1}</legend><label className="editorField">Nama<input maxLength={100} value={item.title} onChange={e => update({ items: section.items.map((v, j) => j === i ? { ...v, title: e.target.value } : v) })} /></label><label className="editorField">Keterangan<textarea rows={3} maxLength={1000} value={item.body} onChange={e => update({ items: section.items.map((v, j) => j === i ? { ...v, body: e.target.value } : v) })} /></label><button className="editorTextButton" onClick={() => update({ items: section.items.filter((_, j) => j !== i) })}>Hapus item {i + 1}</button></fieldset>)}<button className="editorSecondary" disabled={section.items.length >= 6} onClick={() => update({ items: [...section.items, { title: "Layanan baru", body: "Jelaskan layanan Anda." }] })}><EditorIcon name="plus" />Tambah item</button></div>}
    </div>}
  </aside>;
}
