"use client";
import { useEffect, useRef, useState } from "react";
import { collections, emptyCms, itemError, parseCms, serializeCms, slugify, type CmsDocument, type CmsItem, type CollectionKey } from "@/lib/cms/document";
import { EditorIcon } from "@/components/editor/EditorIcon";

export function CmsWorkspace({ template, embedded = false, recordId }: { template: "service" | "restaurant"; embedded?: boolean; recordId?: string | undefined }) {
  const key = `mangelek-cms-local-v1-${template}`;
  const [document, setDocument] = useState<CmsDocument>(emptyCms);
  const [loaded, setLoaded] = useState(false);
  const [collection, setCollection] = useState<CollectionKey>(template === "restaurant" ? "menu" : "services");
  const [query, setQuery] = useState("");
  const [archived, setArchived] = useState(false);
  const [editing, setEditing] = useState<CmsItem | null>(null);
  const [original, setOriginal] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [conflict, setConflict] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [pendingImport, setPendingImport] = useState<CmsDocument | null>(null);
  const baseline = useRef<string | null>(null), busy = useRef(false);
  const fileInput = useRef<HTMLInputElement>(null), titleInput = useRef<HTMLInputElement>(null);
  const dirty = editing !== null && JSON.stringify(editing) !== original;
  useEffect(() => {
    try { const raw = localStorage.getItem(key); baseline.current = raw; if (raw) { const stored = parseCms(raw); setDocument(stored); if (recordId) { const item = stored.items.find(item => item.id === recordId); if (item) { setCollection(item.collection); setEditing(item); setOriginal(JSON.stringify(item)); } else setError("Konten tidak ditemukan dalam koleksi lokal ini."); } } }
    catch { setError("Konten tersimpan tidak dapat dibaca. Penyimpanan dinonaktifkan agar data lama tetap aman."); setConflict(true); }
    setLoaded(true);
    const changed = (event: StorageEvent) => { if (event.key === key || event.key === null) setConflict(true); };
    window.addEventListener("storage", changed); return () => window.removeEventListener("storage", changed);
  }, [key]);
  useEffect(() => { if (editing) titleInput.current?.focus(); }, [editing?.id]);
  useEffect(() => { if (!dirty) return; const warn = (event: BeforeUnloadEvent) => event.preventDefault(); window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [dirty]);
  function canLeave() { return !dirty || window.confirm("Perubahan konten belum disimpan. Tinggalkan perubahan ini?"); }
  function open(item?: CmsItem) {
    if (!canLeave()) return;
    const next = item ? { ...item } : { id: crypto.randomUUID(), collection, title: "", slug: "", summary: "", body: "", price: "", archived: false, updatedAt: new Date().toISOString() };
    setEditing(next); setOriginal(JSON.stringify(next)); setPreview(false); setError(""); setNotice("");
  }
  async function persist(next: CmsDocument, message: string) {
    if (busy.current || conflict || !loaded) return false;
    busy.current = true; setSaving(true); let success = false;
    try {
      const raw = serializeCms(next); parseCms(raw);
      const write = () => {
        if (localStorage.getItem(key) !== baseline.current) { setConflict(true); return; }
        localStorage.setItem(key, raw); baseline.current = raw; setDocument(next); setError(""); setNotice(message); success = true;
      };
      if (window.navigator.locks) await window.navigator.locks.request(key, write); else write();
    } catch (e) { setError(e instanceof Error && !(e instanceof DOMException) ? e.message : "Konten belum tersimpan. Penyimpanan browser penuh atau diblokir; unduh cadangan untuk menjaga pekerjaan Anda."); }
    finally { busy.current = false; setSaving(false); }
    return success;
  }
  async function save() {
    if (!editing) return;
    const problem = itemError(editing, document.items);
    if (problem) { setError(problem); titleInput.current?.focus(); return; }
    const item = { ...editing, title: editing.title.trim(), updatedAt: new Date().toISOString() };
    const next = { ...document, items: document.items.some(value => value.id === item.id) ? document.items.map(value => value.id === item.id ? item : value) : [item, ...document.items] };
    if (await persist(next, "Konten disimpan di perangkat ini.")) { setEditing(item); setOriginal(JSON.stringify(item)); }
  }
  function backup() {
    try {
      const items = editing ? [...document.items.filter(item => item.id !== editing.id), editing] : document.items;
      const raw = serializeCms({ version: 1, items }); parseCms(raw);
      const url = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
      const link = window.document.createElement("a"); link.href = url; link.download = `mangelek-konten-${template}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("Cadangan diunduh, termasuk perubahan valid yang belum disimpan.");
    } catch (e) { setError(e instanceof Error ? e.message : "Cadangan belum dapat diunduh."); }
  }
  function loadLatest() {
    if (!canLeave()) return;
    try { const raw = localStorage.getItem(key); const next = raw ? parseCms(raw) : emptyCms; baseline.current = raw; setDocument(next); setEditing(null); setConflict(false); setError(""); setNotice("Versi tersimpan dimuat."); }
    catch { setError("Versi tersimpan belum bisa dibaca. Data belum diubah."); }
  }
  const visible = document.items.filter(item => item.collection === collection && item.archived === archived && `${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase().trim()));
  const meta = collections[collection];
  return <div className={`cmsWorkspace websiteEditor${embedded ? " workspaceEmbedded" : ""}`}>
    <a className="editorSkip" href="#cms-main">Lewati navigasi</a>
    <header className="cmsHeader"><a href="/subscription" className="cmsBrand" onClick={event => { if (!canLeave()) event.preventDefault(); }}>mangelek.</a><nav aria-label="Ruang kerja"><a href={`/editor?template=${template}`} onClick={event => { if (!canLeave()) event.preventDefault(); }}>Website Editor</a><a href={`/cms?template=${template}`} aria-current="page" onClick={event => event.preventDefault()}>Konten</a><a href={`/cms?template=${template}&area=crm`} onClick={event => { if (!canLeave()) event.preventDefault(); }}>Pelanggan</a></nav><span>{template === "service" ? "Service Modern" : "Restaurant Premium"}</span></header>
    <div className="cmsLocal"><span>Di perangkat ini</span><p>Konten belum terhubung ke website online. Simpan cadangan sebelum berpindah perangkat.</p></div>
    <div className="cmsLayout"><aside className="cmsSidebar"><p>Koleksi konten</p><nav aria-label="Koleksi konten">{(Object.keys(collections) as CollectionKey[]).map(value => <button key={value} aria-current={collection === value ? "page" : undefined} onClick={() => { if (canLeave()) { setCollection(value); setEditing(null); setQuery(""); setError(""); setNotice(""); } }}><EditorIcon name={value === "articles" ? "type" : "layers"} />{collections[value].name}<span>{document.items.filter(item => item.collection === value && !item.archived).length}</span></button>)}</nav><div className="cmsBackups"><button onClick={backup} disabled={!loaded}><EditorIcon name="download" />Unduh cadangan</button><button onClick={() => fileInput.current?.click()} disabled={!loaded || conflict}><EditorIcon name="upload" />Pulihkan cadangan</button><input ref={fileInput} className="editorSrOnly" type="file" accept="application/json,.json" aria-label="File cadangan konten" onChange={async event => { const file = event.target.files?.[0]; if (!file) return; try { if (file.size > 2_000_000) throw new Error("Cadangan terlalu besar."); setPendingImport(parseCms(await file.text())); } catch (e) { setError(e instanceof Error ? e.message : "Cadangan tidak dapat dibaca."); } finally { if (fileInput.current) fileInput.current.value = ""; } }} /></div></aside>
    <main id="cms-main" className="cmsMain">
      {conflict && <section className="cmsMessage" role="alert"><strong>Periksa versi tersimpan</strong><p>Konten berubah di tab lain atau belum bisa dibaca. Unduh pekerjaan Anda sebelum memuat versi tersimpan.</p><button className="editorSecondary" onClick={loadLatest}>Muat versi tersimpan</button></section>}
      {error && <p className="cmsMessage cmsError" role="alert">{error}</p>}{notice && <p className="cmsMessage" role="status">{notice}</p>}
      {pendingImport && <section className="cmsMessage"><p>Ganti koleksi lokal dengan {pendingImport.items.length} konten dari cadangan? Unduh cadangan saat ini bila masih diperlukan.</p><button className="editorPrimary" onClick={async () => { if (canLeave() && await persist(pendingImport,"Cadangan dipulihkan.")) { setPendingImport(null); setEditing(null); } }}>Pulihkan konten</button><button className="editorTextButton" onClick={() => setPendingImport(null)}>Batal</button></section>}
      <header className="cmsHeading"><div><h1>{meta.name}</h1><p>{meta.description}</p></div><button className="editorPrimary" disabled={!loaded || saving || conflict || document.items.length >= 500} onClick={() => open()}><EditorIcon name="plus" />Tambah {meta.singular}</button></header>
      {editing ? <section className="cmsEdit" aria-label="Sunting konten"><div className="cmsEditToolbar"><button className="editorTextButton" onClick={() => { if (canLeave()) setEditing(null); }}><EditorIcon name="back" />Kembali ke daftar</button><span>{dirty ? "Belum disimpan" : "Draft lokal"}</span><button className="editorSecondary" aria-pressed={preview} onClick={() => setPreview(!preview)}><EditorIcon name="eye" />{preview ? "Kembali mengedit" : "Pratinjau"}</button></div>
        {preview ? <article className="cmsArticle"><p className="cmsPreviewLabel">Pratinjau konten · belum online</p><h2>{editing.title || "Judul konten"}</h2><p className="cmsSummary">{editing.summary}</p>{editing.price && <p>{new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(editing.price))}</p>}<div>{editing.body || "Isi konten akan tampil di sini."}</div></article> : <form id="cms-form" className="cmsForm" onSubmit={event => { event.preventDefault(); void save(); }}><div className="cmsFields"><label className="editorField">Judul<input ref={titleInput} required maxLength={160} value={editing.title} onChange={event => setEditing({ ...editing, title: event.target.value, slug: editing.slug === slugify(editing.title) ? slugify(event.target.value) : editing.slug })} /></label><label className="editorField">Ringkasan<textarea maxLength={500} rows={3} value={editing.summary} onChange={event => setEditing({ ...editing, summary: event.target.value })} /><small>{editing.summary.length}/500 karakter</small></label><label className="editorField">{collection === "articles" ? "Isi artikel" : "Deskripsi lengkap"}<textarea className="cmsBodyInput" maxLength={30000} rows={12} value={editing.body} onChange={event => setEditing({ ...editing, body: event.target.value })} /><small>Teks biasa. Pisahkan paragraf dengan baris baru.</small></label></div><aside className="cmsDetails"><h2>Detail konten</h2><label className="editorField">Alamat konten<input required maxLength={100} value={editing.slug} onChange={event => setEditing({ ...editing, slug: event.target.value })} /><small>Unik dalam koleksi ini; belum menjadi halaman online.</small></label>{collection !== "articles" && <label className="editorField">Harga (Rp)<input inputMode="numeric" maxLength={12} value={editing.price} placeholder="Opsional" onChange={event => setEditing({ ...editing, price: event.target.value })} /><small>Angka tanpa titik atau koma.</small></label>}<p className="editorMuted">Perubahan tersimpan sebagai konten lokal. Publikasi website belum tersedia.</p></aside></form>}
        <footer className="cmsSave"><p>{editing.archived ? "Konten ini berada di arsip." : "Simpan agar perubahan tetap tersedia saat Anda kembali."}</p><button className="editorPrimary" disabled={!dirty || saving || conflict} onClick={() => void save()}>{saving ? "Menyimpan…" : "Simpan konten"}</button></footer>
      </section> : <><div className="cmsFilters"><label><span className="editorSrOnly">Cari konten</span><input type="search" placeholder={`Cari ${meta.singular}…`} value={query} onChange={event => setQuery(event.target.value)} /></label><div role="group" aria-label="Status konten"><button aria-pressed={!archived} onClick={() => setArchived(false)}>Konten</button><button aria-pressed={archived} onClick={() => setArchived(true)}>Arsip</button></div></div><p className="cmsResults" role="status">{loaded ? `${visible.length} ${meta.singular}${archived ? " di arsip" : ""}` : "Memuat konten…"}</p>
        {visible.length ? <div className="cmsList">{visible.map(item => <article key={item.id} className="cmsRow"><button className="cmsItemName" onClick={() => open(item)}><strong>{item.title}</strong><span>{item.summary || `/${item.slug}`}</span></button><span className="cmsItemDate">{new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"short",year:"numeric"}).format(new Date(item.updatedAt))}</span><span className="cmsBadge">{item.archived ? "Arsip" : "Draft lokal"}</span><button className="editorTextButton" disabled={saving || conflict} onClick={() => void persist({ ...document, items: document.items.map(value => value.id === item.id ? { ...value, archived: !value.archived, updatedAt: new Date().toISOString() } : value) }, item.archived ? "Konten dipulihkan." : "Konten dipindahkan ke arsip. Buka Arsip untuk memulihkannya.")}>{item.archived ? "Pulihkan" : "Arsipkan"}</button></article>)}</div> : loaded && <section className="cmsEmpty"><EditorIcon name={collection === "articles" ? "type" : "layers"} /><h2>{query ? "Konten tidak ditemukan." : archived ? "Arsip masih kosong." : `Mulai dengan ${meta.singular} pertama.`}</h2><p>{query ? "Coba kata lain atau kosongkan pencarian." : archived ? "Konten yang Anda arsipkan akan tetap tersedia di sini untuk dipulihkan." : "Tambahkan judul dan cerita yang membantu pelanggan mengenal bisnis Anda."}</p>{query ? <button className="editorSecondary" onClick={() => setQuery("")}>Hapus pencarian</button> : !archived && <button className="editorSecondary" disabled={conflict} onClick={() => open()}>Tambah {meta.singular}</button>}</section>}
      </>}
    </main></div>
  </div>;
}


