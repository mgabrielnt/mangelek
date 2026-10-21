"use client";
import { useEffect, useRef, useState } from "react";
import { MAX_DRAFT_BYTES, MAX_SECTIONS, rewritePageLinks, moveSection, newSection, parseDraft, serializeDraft, sectionNames, type SectionKind, type SiteDraft, type SiteSection } from "@/lib/editor/document";
import { EditorIcon, type EditorIconName } from "./EditorIcon";
import { EditorProperties } from "./EditorProperties";
import { EditorPageSettings } from "./EditorPageSettings";
import { useEditor } from "./useEditor";

function Tool({ name, label, ...props }: { name: EditorIconName; label: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) { return <button type="button" className="editorTool" aria-label={label} title={label} {...props}><EditorIcon name={name} /></button>; }

export function WebsiteEditor({ initial }: { initial: SiteDraft }) {
  const editor = useEditor(initial);
  const [pageId, setPageId] = useState("home");
  const [pageSettings, setPageSettings] = useState(false);
  const document = editor.draft;
  const page = document.pages?.find(p => p.id === pageId);
  const draft = page ? { ...document, sections: page.sections } : document;
  function change(update: SiteDraft | ((current: SiteDraft) => SiteDraft)) {
    const next = typeof update === "function" ? update(draft) : update;
    return editor.change(page ? { ...next, sections: document.sections, pages: document.pages!.map(p => p.id === page.id ? { ...p, sections: next.sections } : p) } : next);
  }
  function choosePage(id: string) { setPageId(id); setPageSettings(false); setSelected(""); }
  function addPage() {
    if ((document.pages?.length ?? 0) >= 19) return;
    let number = 2; while (document.pages?.some(p => p.slug === `halaman-${number}`)) number++;
    const id = crypto.randomUUID();
    const hero = newSection("hero"); hero.image = document.sections.find(s => s.kind === "hero")?.image ?? ""; hero.imageAlt = document.sections.find(s => s.kind === "hero")?.imageAlt ?? ""; hero.title = "Ceritakan hal yang berarti."; hero.body = "Halaman baru untuk cerita, layanan, atau informasi bisnis Anda.";
    if (editor.change({ ...document, pages: [...(document.pages ?? []), { id, title: "Halaman baru", slug: `halaman-${number}`, seoTitle: "", seoDescription: "", sections: [hero] }] })) { choosePage(id); setPageSettings(true); setPanel("content"); }
  }
  function removePage() { if (!page) return; if (editor.change(rewritePageLinks({ ...document, pages: document.pages!.filter(p => p.id !== page.id) }, page.slug, "/"))) { choosePage("home"); editor.setNotice("Halaman dihapus. Gunakan Urungkan untuk mengembalikannya."); } }
  const [selected, setSelected] = useState(initial.sections[0]!.id);
  const [panel, setPanel] = useState<"structure" | "content" | "design">("content");
  const [styleMode, setStyleMode] = useState(false);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [preview, setPreview] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const [frameRevision, setFrameRevision] = useState(0);
  const [adding, setAdding] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [pendingImport, setPendingImport] = useState<SiteDraft | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const frameBox = useRef<HTMLDivElement>(null);
  const [frameSize, setFrameSize] = useState({ width: 960, height: 700 });
  const importInput = useRef<HTMLInputElement>(null);
  const section = draft.sections.find(s => s.id === selected) ?? draft.sections[0]!;
  const sectionIndex = draft.sections.indexOf(section);
  useEffect(() => {
    if (!frameBox.current) return;
    const observer = new ResizeObserver(entries => { const rect = entries[0]?.contentRect; if (rect) setFrameSize({ width: rect.width, height: rect.height }); });
    observer.observe(frameBox.current);
    return () => observer.disconnect();
  }, []);
  const scale = device === "desktop" ? Math.min(1, frameSize.width / 960) : 1;
  useEffect(() => {
    // Either React tree can hydrate first; retry the handshake until the frame
    // acknowledges it instead of relying on a single load/message event.
    const ping = window.setInterval(() => frame.current?.contentWindow?.postMessage({ type: "editor-ping" }, window.location.origin), 500);
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "editor-ready") { window.clearInterval(ping); setFrameReady(true); setFrameRevision(value => value + 1); }
      if (event.data?.type === "editor-navigate" && typeof event.data.id === "string") { setPageId(event.data.id); setPageSettings(false); setSelected(""); }
      if (event.data?.type === "editor-select" && typeof event.data.id === "string") { setSelected(event.data.id); setPageSettings(false); setStyleMode(false); setPanel("content"); }
    }
    window.addEventListener("message", receive);
    return () => { window.clearInterval(ping); window.removeEventListener("message", receive); };
  }, []);
  useEffect(() => {
    if (frameReady && editor.loaded) frame.current?.contentWindow?.postMessage({ type: "editor-document", draft, selected: section.id, editing: !preview }, window.location.origin);
  }, [draft, section.id, preview, frameReady, frameRevision, editor.loaded]);
  const update = (patch: Partial<SiteSection>) => { const id = section.id; return change(current => ({ ...current, sections: current.sections.map(s => s.id === id ? { ...s, ...patch } : s) })); };
  function select(id: string) { setPageSettings(false); setSelected(id); setPanel("content"); setStyleMode(false); }
  function add(kind: SectionKind) {
    if (draft.sections.length >= MAX_SECTIONS) return;
    const fresh = newSection(kind); if (!change({ ...draft, sections: [...draft.sections, fresh] })) return; select(fresh.id); setAdding(false); editor.setNotice(`${sectionNames[kind]} ditambahkan di akhir halaman.`);
  }
  function remove() {
    if (draft.sections.length <= 1 || !section.hidden && draft.sections.filter(s => !s.hidden).length <= 1) return;
    change({ ...draft, sections: draft.sections.filter(s => s.id !== section.id) }); setSelected(draft.sections[sectionIndex === 0 ? 1 : sectionIndex - 1]!.id); editor.setNotice("Bagian dihapus. Gunakan Urungkan untuk mengembalikannya.");
  }
  function download() {
    try {
      const raw = serializeDraft(document); parseDraft(raw);
      const url = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
      const a = window.document.createElement("a"); a.href = url; a.download = `mangelek-${draft.template}-draft.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); editor.setNotice("Cadangan JSON diunduh. Simpan file ini untuk memulihkan draft.");
    } catch (e) { editor.setError(e instanceof Error ? e.message : "Cadangan belum dapat diunduh. Periksa isi draft."); }
  }
  async function importDraft(file?: File) {
    if (!file) return;
    try {
      if (file.size > MAX_DRAFT_BYTES) throw new Error("File terlalu besar. Ukuran maksimal draft adalah 4,5 MB.");
      const parsed = parseDraft(await file.text());
      if (parsed.template !== initial.template) throw new Error("Cadangan ini menggunakan template berbeda. Buka editor template tersebut dahulu.");
      setPendingImport(parsed); editor.setError("");
    } catch (e) { editor.setError(e instanceof Error ? e.message : "File tidak dapat dibaca."); }
    finally { if (importInput.current) importInput.current.value = ""; }
  }
  const noOtherVisible = !section.hidden && draft.sections.filter(s => !s.hidden).length <= 1;
  return <div className="websiteEditor" data-panel={panel} data-preview={preview}>
    <a href="#editor-workspace" className="editorSkip">Lewati toolbar</a>
    <header className="editorHeader">
      <a href="/subscription" className="editorHome" aria-label="Kembali ke langganan" title="Kembali ke langganan"><EditorIcon name="back" /><span>mangelek.</span></a>
      <div className="editorDocument"><label htmlFor="editor-name" className="editorSrOnly">Nama website</label><input id="editor-name" value={draft.name} maxLength={100} onChange={e => change({ ...draft, name: e.target.value })} /><span className="editorSaveState"><i data-saved={!editor.dirty} />{editor.saving ? "Menyimpan draft…" : !editor.loaded ? "Memuat draft…" : editor.conflict ? "Versi baru tersedia" : editor.dirty ? "Perubahan belum disimpan" : "Tersimpan di perangkat ini"}</span></div>
      <div className="editorHistory"><Tool name="undo" label="Urungkan" disabled={!editor.canUndo} onClick={editor.undo} /><Tool name="redo" label="Ulangi" disabled={!editor.canRedo} onClick={editor.redo} /></div>
      <div className="editorHeaderActions"><a href={`/app?template=${draft.template}`} className="editorCmsLink"><EditorIcon name="layers" /><span>Dashboard</span></a><button className="editorSecondary" aria-pressed={preview} onClick={() => setPreview(!preview)}><EditorIcon name={preview ? "back" : "eye"} /><span>{preview ? "Kembali mengedit" : "Preview"}</span></button><button className="editorPrimary" onClick={editor.save} disabled={!editor.loaded || !editor.dirty || editor.saving || editor.conflict} aria-busy={editor.saving}><EditorIcon name="check" />{editor.saving ? "Menyimpan…" : "Simpan draft"}</button></div>
    </header>
    <div className="editorLocalNotice"><span>Draft lokal</span><p>Isi awal adalah contoh. Draft disimpan di browser ini, belum online.</p><button onClick={() => setShowPublish(!showPublish)} aria-expanded={showPublish}>Tentang publikasi</button></div>
    {showPublish && <div className="editorPublishInfo"><p><strong>Publikasi membutuhkan website yang sudah diaktifkan.</strong> Hubungkan penyimpanan situs dan layanan publikasi sesuai paket Anda. Untuk sekarang, Anda dapat menyunting, menyimpan, dan mengunduh draft.</p><a href="/subscription">Lihat langganan</a><Tool name="close" label="Tutup informasi publikasi" onClick={() => setShowPublish(false)} /></div>}
    {(editor.error || editor.notice) && <div className={`editorFeedback ${editor.error ? "editorFeedbackError" : ""}`} role={editor.error ? "alert" : "status"}><p>{editor.error || editor.notice}</p><Tool name="close" label="Tutup pesan" onClick={() => { editor.setError(""); editor.setNotice(""); }} /></div>}
    {editor.conflict && <section className="editorConflict" aria-labelledby="editor-conflict-title" role="alert"><div><h2 id="editor-conflict-title">Draft berubah di tab lain</h2><p>Perubahan Anda tetap ada di editor. Unduh salinannya, lalu muat versi tersimpan untuk melanjutkan tanpa menimpa perubahan lain.</p></div><div className="editorConflictActions"><button className="editorSecondary" onClick={download}>Unduh perubahan saya</button><button className="editorPrimary" onClick={editor.loadLatest}>Muat versi tersimpan</button></div></section>}
    {pendingImport && <div className="editorImportConfirmation" role="region" aria-label="Konfirmasi pemulihan"><p>Ganti isi editor dengan <strong>{pendingImport.name}</strong>? Draft tersimpan tetap aman sampai Anda menekan Simpan draft.</p><button className="editorPrimary" onClick={() => { editor.change(pendingImport); setPageId("home"); setSelected(pendingImport.sections[0]!.id); setPendingImport(null); editor.setNotice("Cadangan dipulihkan. Simpan draft untuk menyimpannya di perangkat ini."); }}>Pulihkan cadangan</button><button className="editorSecondary" onClick={() => setPendingImport(null)}>Batal</button></div>}
    <div className="editorMobilePanels" role="group" aria-label="Panel editor">{(["structure", "content", "design"] as const).map(p => <button key={p} aria-pressed={panel === p} onClick={() => { setPanel(p); setPageSettings(false); setStyleMode(p === "design"); }}>{p === "structure" ? "Struktur" : p === "content" ? "Konten" : "Desain"}</button>)}</div>
    <div className="editorWorkspace" id="editor-workspace" tabIndex={-1}>
      <aside className="editorOutline" aria-label="Struktur halaman"><div className="editorOutlineHeading"><h1>Website Editor</h1><div className="editorPagePicker"><label htmlFor="editor-page">Halaman website</label><div><select id="editor-page" value={page?.id ?? "home"} onChange={e => choosePage(e.target.value)}><option value="home">Beranda</option>{document.pages?.map(p => <option key={p.id} value={p.id}>{p.title || "Tanpa nama"}</option>)}</select><Tool name="style" label="Pengaturan halaman dan SEO" aria-pressed={pageSettings} onClick={() => { setPageSettings(!pageSettings); setPanel("content"); }} /></div><button className="editorTextButton" onClick={addPage} disabled={(document.pages?.length ?? 0) >= 19}><EditorIcon name="plus" />Tambah halaman<span>{1 + (document.pages?.length ?? 0)}/20</span></button></div><p>Bagian halaman <span>{draft.sections.length} bagian</span></p></div>
        <div className="editorSectionList">{draft.sections.map(s => <button key={s.id} aria-pressed={section.id === s.id} onClick={() => select(s.id)} className="editorSectionRow"><EditorIcon name={s.kind === "hero" ? "image" : s.kind === "collection" ? "layers" : "type"} /><span><strong>{sectionNames[s.kind]}</strong><small>{s.hidden ? "Disembunyikan" : s.title || "Tanpa judul"}</small></span>{s.hidden && <EditorIcon name="eye" />}</button>)}</div>
        <div className="editorArrange" role="group" aria-label="Susun bagian terpilih"><Tool name="up" label="Pindahkan bagian ke atas" disabled={sectionIndex === 0} onClick={() => change(d => moveSection(d, section.id, -1))} /><Tool name="down" label="Pindahkan bagian ke bawah" disabled={sectionIndex === draft.sections.length - 1} onClick={() => change(d => moveSection(d, section.id, 1))} /><Tool name="copy" label="Duplikasikan bagian" disabled={draft.sections.length >= MAX_SECTIONS} onClick={() => { const duplicate = { ...section, id: crypto.randomUUID() }; const sections = [...draft.sections]; sections.splice(sectionIndex + 1, 0, duplicate); if (change({ ...draft, sections })) select(duplicate.id); }} /><Tool name="eye" label={section.hidden ? "Tampilkan bagian" : "Sembunyikan bagian"} aria-pressed={section.hidden} disabled={noOtherVisible} onClick={() => update({ hidden: !section.hidden })} /><Tool name="trash" label="Hapus bagian" disabled={draft.sections.length <= 1 || noOtherVisible} onClick={remove} /></div>
        <button className="editorAdd" aria-expanded={adding} disabled={draft.sections.length >= MAX_SECTIONS} onClick={() => setAdding(!adding)}><EditorIcon name="plus" />Tambah bagian</button>
        {adding && <div className="editorAddOptions" aria-label="Pilih jenis bagian">{(Object.keys(sectionNames) as SectionKind[]).map(kind => <button key={kind} onClick={() => add(kind)}>{sectionNames[kind]}<EditorIcon name="plus" /></button>)}</div>}
        <div className="editorOutlineBottom"><p>Cadangan draft</p><button onClick={download}><EditorIcon name="download" />Unduh JSON</button><button onClick={() => importInput.current?.click()}><EditorIcon name="upload" />Pulihkan dari file</button><input ref={importInput} type="file" accept="application/json,.json" className="editorSrOnly" aria-label="Pilih file cadangan draft" onChange={e => void importDraft(e.target.files?.[0])} /><small>Cadangan berisi teks, desain, dan gambar Anda.</small></div>
      </aside>
      <main className="editorStage" aria-label="Kanvas website"><div className="editorCanvasToolbar"><button className="editorCurrentPage" onClick={() => { setPageSettings(!pageSettings); setPanel("content"); }} title="Pengaturan halaman dan SEO"><EditorIcon name="layers" />{page?.title || "Beranda"}</button><div role="group" aria-label="Ukuran kanvas"><Tool name="desktop" label="Preview desktop" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")} /><Tool name="phone" label="Preview ponsel" aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")} /></div><span className="editorCanvasMode">{preview ? "Mode preview" : "Klik bagian untuk mengedit"}</span></div>
        <div className="editorCanvasViewport"><div ref={frameBox} className="editorCanvasFrame" data-device={device}>{!frameReady && <p className="editorFrameLoading" role="status">Menyiapkan kanvas…</p>}<iframe ref={frame} title="Kanvas website yang sedang diedit" src="/editor/preview" style={{ width: `${frameSize.width / scale}px`, height: `${frameSize.height / scale}px`, transform: `scale(${scale})`, transformOrigin: "top left" }} sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" onLoad={() => frame.current?.contentWindow?.postMessage({ type: "editor-ping" }, window.location.origin)} /></div></div>
        <div className="editorCanvasFooter"><span>{draft.template === "restaurant" ? "Restaurant Premium" : "Service Modern"}</span><span>{preview ? "Preview draft · Belum online" : "Pilih, sesuaikan, jadikan milik Anda."}</span></div>
      </main>
      {pageSettings ? <EditorPageSettings key={page?.id ?? "home"} document={document} page={page} change={editor.change} remove={removePage} close={() => setPageSettings(false)} /> : <EditorProperties key={`${pageId}-${section.id}`} draft={draft} document={document} section={section} styleMode={styleMode} onStyleMode={value => { setStyleMode(value); setPanel(value ? "design" : "content"); }} update={update} change={change} onError={editor.setError} />}
    </div>
  </div>;
}
