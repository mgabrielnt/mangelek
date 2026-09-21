"use client";
import { useEffect, useState } from "react";
import { createDraft, parseDraft, type SiteDraft } from "@/lib/editor/document";
import { SiteCanvas } from "./SiteCanvas";

export function EditorPreview() {
  const [draft, setDraft] = useState<SiteDraft>(createDraft);
  const [selection, setSelection] = useState("");
  const [editing, setEditing] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== window.parent || event.source === window) return;
      if (event.data?.type === "editor-ping") { window.parent.postMessage({ type: "editor-ready" }, window.location.origin); return; }
      if (event.data?.type !== "editor-document") return;
      try {
        setDraft(parseDraft(JSON.stringify(event.data.draft))); setSelection(typeof event.data.selected === "string" ? event.data.selected : ""); setEditing(event.data.editing === true); setReady(true);
      } catch { /* Ignore untrusted or unsupported documents. */ }
    }
    window.addEventListener("message", receive);
    window.parent.postMessage({ type: "editor-ready" }, window.location.origin);
    return () => window.removeEventListener("message", receive);
  }, []);
  if (!ready) return <p className="editorPreviewWaiting">Preview draft ditampilkan dari Website Editor. <a href="/editor" target="_top">Buka editor</a></p>;
  return <SiteCanvas draft={draft} selected={selection} editing={editing} onSelect={id => window.parent.postMessage({ type: "editor-select", id }, window.location.origin)} />;
}
