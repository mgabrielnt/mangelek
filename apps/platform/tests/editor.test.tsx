import "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createDraft, MAX_DRAFT_BYTES, moveSection, parseDraft, serializeDraft, validImage } from "../src/lib/editor/document";
import { SiteCanvas } from "../src/components/editor/SiteCanvas";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { useEditor } from "../src/components/editor/useEditor";

test("Both supported templates preserve selected design and round-trip through backup", () => {
  for (const template of ["restaurant", "service"]) {
    const draft = createDraft({ template, palette: "ocean", font: "modern" });
    assert.equal(draft.template, template); assert.equal(draft.palette, "ocean");
    assert.deepEqual(parseDraft(JSON.stringify(draft)), draft);
  }
});
test("Reordering is immutable and respects first/last boundaries", () => {
  const draft = createDraft(); const moved = moveSection(draft, "hero", 1);
  assert.equal(moved.sections[1]!.id, "hero"); assert.equal(draft.sections[0]!.id, "hero");
  assert.equal(moveSection(draft, "hero", -1), draft);
  assert.equal(moveSection(draft, "missing", 1), draft);
});
test("Imported drafts reject script URLs, duplicate identifiers, invalid themes and hidden-only content", () => {
  const draft = createDraft();
  assert.equal(validImage("javascript:alert(1)"), false);
  assert.equal(validImage("data:image/svg+xml;base64,AAAA"), false);
  assert.throws(() => parseDraft(JSON.stringify({ ...draft, font: "unknown" })));
  assert.throws(() => parseDraft(JSON.stringify({ ...draft, sections: [draft.sections[0], draft.sections[0]] })));
  assert.throws(() => parseDraft(JSON.stringify({ ...draft, sections: draft.sections.map(s => ({ ...s, hidden: true })) })));
  assert.throws(() => parseDraft(JSON.stringify({ ...draft, sections: [{ ...draft.sections[0], image: "https://tracking.test/pixel" }] })));
  assert.throws(() => parseDraft("not json"));
});
test("Canvas escapes user content, excludes hidden sections and removes edit controls in preview", () => {
  const draft = createDraft(); draft.sections[0]!.title = "<script>alert('test')</script>"; draft.sections[1]!.hidden = true;
  const html = renderToStaticMarkup(<SiteCanvas draft={draft} selected="hero" editing={false} onSelect={() => {}} />);
  assert.ok(html.includes("&lt;script&gt;")); assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes('id="section-about"')); assert.ok(!html.includes('class="canvasEdit"'));
  assert.ok(html.includes("Belum dipublikasikan"));
});

test("Editor save, undo/redo and reload recovery preserve the actual document", async () => {
  const store = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (key: string) => store.get(key) ?? null, setItem: (key: string, value: string) => store.set(key, value) } });
  let state!: ReturnType<typeof useEditor>;
  function Harness() { state = useEditor(createDraft()); return null; }
  let root = createRoot(document.getElementById("test-root")!);
  await act(() => root.render(<Harness />));
  await act(() => state.change(d => ({ ...d, brand: "Bisnis uji" })));
  await act(() => state.undo()); assert.equal(state.draft.brand, "Rasa & Ruang");
  await act(() => state.redo()); assert.equal(state.draft.brand, "Bisnis uji");
  await act(() => state.save()); assert.equal(state.dirty, false);
  await act(() => root.unmount());
  root = createRoot(document.getElementById("test-root")!);
  await act(() => root.render(<Harness />));
  assert.equal(state.draft.brand, "Bisnis uji"); assert.equal(state.dirty, false);
  await act(() => root.unmount());
});
test("Storage failure retains unsaved work and reports recovery instead of success", async () => {
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: () => null, setItem: () => { throw new Error("Quota exceeded"); } } });
  let state!: ReturnType<typeof useEditor>;
  function Harness() { state = useEditor(createDraft()); return null; }
  const root = createRoot(document.getElementById("test-root")!);
  await act(() => root.render(<Harness />));
  await act(() => state.change(d => ({ ...d, brand: "Jangan hilang" })));
  await act(() => state.save());
  assert.equal(state.draft.brand, "Jangan hilang"); assert.equal(state.dirty, true);
  assert.ok(state.error.includes("belum tersimpan")); assert.equal(state.notice, "");
  await act(() => root.unmount());
});
test("Combined image uploads and duplication cannot strand a draft above capacity", async () => {
  const store = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (key: string) => store.get(key) ?? null, setItem: (key: string, value: string) => store.set(key, value) } });
  let state!: ReturnType<typeof useEditor>;
  function Harness() { state = useEditor(createDraft()); return null; }
  const root = createRoot(document.getElementById("test-root")!);
  await act(() => root.render(<Harness />));
  const image = `data:image/jpeg;base64,${"A".repeat(1_990_000)}`;
  const hero = { ...state.draft.sections[0]!, image };
  await act(() => state.change(d => ({ ...d, sections: [hero, { ...hero, id: "second" }, { ...hero, id: "third", image: "" }] })));
  const valid = state.draft;
  await act(() => state.change(d => ({ ...d, sections: d.sections.map(s => s.id === "third" ? { ...s, image } : s) })));
  assert.equal(state.draft, valid); assert.ok(state.error.includes("4,5 MB"));
  await act(() => state.change(d => ({ ...d, sections: [...d.sections, { ...hero, id: "duplicate" }] })));
  assert.equal(state.draft, valid); assert.ok(state.error.includes("belum diterapkan"));
  await act(() => state.save());
  const backup = serializeDraft(state.draft);
  assert.equal(store.get("mangelek-editor-v1-restaurant"), backup);
  assert.deepEqual(parseDraft(backup), valid); assert.equal(state.dirty, false);
  await act(() => root.unmount());
});
test("The capacity boundary counts UTF-8 bytes and uses the same compact format for save/export", () => {
  const draft = createDraft();
  const raw = serializeDraft(draft);
  const padded = raw + " ".repeat(MAX_DRAFT_BYTES - new TextEncoder().encode(raw).byteLength);
  assert.deepEqual(parseDraft(padded), draft);
  assert.throws(() => parseDraft(padded + " "), /4,5 MB/);
  assert.throws(() => parseDraft(raw + "é".repeat(2_250_000)), /4,5 MB/);
});
