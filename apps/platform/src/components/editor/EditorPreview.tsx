"use client";
import { useEffect, useState } from "react";
import { createDraft, parseDraft, type SiteDraft } from "@/lib/editor/document";
import { SiteCanvas } from "./SiteCanvas";

export function EditorPreview() {
  const [draft, setDraft] = useState<SiteDraft>(createDraft);
  const [selection, setSelection] = useState("");
  const [editing, setEditing] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [pageId, setPageId] = useState("home");
  const [standalone, setStandalone] = useState(false);
  useEffect(() => {
    if (window.parent === window) {
      setStandalone(true);
      const template = new URLSearchParams(window.location.search).get("template") === "restaurant" ? "restaurant" : "service";
      try { const raw = localStorage.getItem(`mangelek-editor-v1-${template}`); if (raw) { setDraft(parseDraft(raw)); setReady(true); } else setError("Simpan draft di editor sebelum membuka pratinjau."); }
      catch { setError("Draft tersimpan belum dapat dibaca. Periksa cadangan melalui editor."); }
      return;
    }
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== window.parent || event.source === window) return;
      if (event.data?.type === "editor-ping") { window.parent.postMessage({ type: "editor-ready" }, window.location.origin); return; }
      if (event.data?.type !== "editor-document") return;
      try {
        setDraft(parseDraft(JSON.stringify(event.data.draft))); setError(""); setSelection(typeof event.data.selected === "string" ? event.data.selected : ""); setEditing(event.data.editing === true); setReady(true);
      } catch (e) { setError(e instanceof Error ? e.message : "Periksa isi halaman."); }
    }
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "editor-ready" }, window.location.origin);
    return () => window.removeEventListener("message", receive);
  }, []);
  if (!ready) return <p className="editorPreviewWaiting">{error || "Preview draft ditampilkan dari Website Editor."} <a href="/editor" target="_top">Buka editor</a></p>;
  const page = draft.pages?.find(item => item.id === pageId);
  const visibleDraft = standalone && page ? { ...draft, sections: page.sections } : draft;
  return <>{error && <p className="editorPreviewWaiting" role="alert">Preview menampilkan versi valid terakhir. {error}</p>}{standalone && <p className="editorPreviewWaiting">Pratinjau draft tersimpan · belum online. <a href={`/app?template=${draft.template}`}>Kembali ke dashboard</a></p>}<SiteCanvas draft={visibleDraft} selected={selection} editing={editing} onSelect={id => window.parent.postMessage({ type: "editor-select", id }, window.location.origin)} onNavigate={id => { if (standalone) setPageId(id); else window.parent.postMessage({ type: "editor-navigate", id }, window.location.origin); }} /></>;
}
