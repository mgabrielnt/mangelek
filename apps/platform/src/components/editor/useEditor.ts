"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { parseDraft, serializeDraft, type SiteDraft } from "@/lib/editor/document";

export function useEditor(initial: SiteDraft) {
  const [history, setHistory] = useState<{ past: SiteDraft[]; current: SiteDraft; future: SiteDraft[] }>({ past: [], current: initial, future: [] });
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [conflict, setConflict] = useState(false);
  const baseline = useRef<string | null>(null);
  const busy = useRef(false);
  const key = `mangelek-editor-v1-${initial.template}`;
  const current = useRef(history.current);
  current.current = history.current;
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      baseline.current = raw;
      if (raw) { const draft = parseDraft(raw); setHistory({ past: [], current: draft, future: [] }); setSaved(JSON.stringify(draft)); setNotice("Draft perangkat ini dipulihkan."); }
    } catch { setError("Draft tersimpan tidak dapat dibaca. Unduh cadangan sebelum mengganti penyimpanan perangkat ini."); }
    setLoaded(true);
  }, [key]);
  useEffect(() => {
    function storage(event: StorageEvent) {
      if ((event.key === key || event.key === null) && event.newValue !== baseline.current) setConflict(true);
    }
    window.addEventListener("storage", storage);
    return () => window.removeEventListener("storage", storage);
  }, [key]);
  const change = useCallback((update: SiteDraft | ((draft: SiteDraft) => SiteDraft)) => {
    const next = typeof update === "function" ? update(current.current) : update;
    try { serializeDraft(next); }
    catch (e) { setError(e instanceof Error ? e.message : "Draft terlalu besar. Kecilkan gambar, lalu coba lagi."); return false; }
    current.current = next;
    setHistory(h => {
      if (next === h.current || JSON.stringify(next) === JSON.stringify(h.current)) return h;
      return { past: [...h.past.slice(-29), h.current], current: next, future: [] };
    });
    setNotice("");
    setError("");
    return true;
  }, []);
  const undo = useCallback(() => setHistory(h => h.past.length ? { past: h.past.slice(0, -1), current: h.past.at(-1)!, future: [h.current, ...h.future] } : h), []);
  const redo = useCallback(() => setHistory(h => h.future.length ? { past: [...h.past, h.current], current: h.future[0]!, future: h.future.slice(1) } : h), []);
  const save = useCallback(async () => {
    if (busy.current) return;
    busy.current = true; setSaving(true);
    const write = () => {
      if (localStorage.getItem(key) !== baseline.current) { setConflict(true); setNotice(""); return; }
      let raw: string;
      try { raw = serializeDraft(current.current); parseDraft(raw); }
      catch (e) { setError(e instanceof Error ? e.message : "Periksa isi draft sebelum menyimpan."); return; }
      localStorage.setItem(key, raw); baseline.current = raw;
      setSaved(raw); setError(""); setConflict(false); setNotice("Draft disimpan di perangkat ini.");
    };
    try {
      if (window.navigator.locks) await window.navigator.locks.request(key, write);
      else write();
    } catch { setError("Draft belum tersimpan. Penyimpanan perangkat mungkin penuh atau diblokir. Unduh cadangan atau kecilkan gambar, lalu coba lagi."); }
    finally { busy.current = false; setSaving(false); }
  }, [key]);
  const loadLatest = useCallback(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) { setError("Draft tersimpan telah dihapus di tab lain. Unduh cadangan perubahan Anda sebelum memuat ulang halaman."); return; }
      const next = parseDraft(raw);
      setHistory(h => ({ past: [...h.past.slice(-29), h.current], current: next, future: [] }));
      current.current = next; baseline.current = raw;
      setSaved(JSON.stringify(next)); setConflict(false); setError("");
      setNotice("Versi tersimpan dimuat. Perubahan Anda sebelumnya masih dapat dikembalikan dengan Urungkan.");
    } catch { setError("Versi tersimpan tidak dapat dibaca. Unduh cadangan perubahan Anda; draft di editor tetap aman."); }
  }, [key]);
  const dirty = loaded && saved !== JSON.stringify(history.current);
  useEffect(() => {
    function before(event: BeforeUnloadEvent) { if (dirty) { event.preventDefault(); event.returnValue = ""; } }
    window.addEventListener("beforeunload", before);
    return () => window.removeEventListener("beforeunload", before);
  }, [dirty]);
  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() === "s") { event.preventDefault(); save(); }
      const target = event.target as HTMLElement;
      if (target.closest("input,textarea,select,[contenteditable=true]")) return;
      if (event.key.toLowerCase() === "z") { event.preventDefault(); event.shiftKey ? redo() : undo(); }
      if (event.key.toLowerCase() === "y") { event.preventDefault(); redo(); }
    }
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [save, undo, redo]);
  return { draft: history.current, loaded, dirty, saving, conflict, loadLatest, change, undo, redo, canUndo: Boolean(history.past.length), canRedo: Boolean(history.future.length), save, notice, setNotice, error, setError };
}
