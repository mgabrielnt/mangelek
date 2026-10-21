import "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createDraft, MAX_DRAFT_BYTES, moveSection, parseDraft, serializeDraft, validImage, validButtonUrl, rewritePageLinks, draftImages } from "../src/lib/editor/document";
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
test("Multiple pages preserve SEO and button destinations; invalid routes and duplicate pages are rejected", () => {
  const draft = createDraft();
  const page = { id: "about-page", title: "Tentang kami", slug: "tentang-kami", seoTitle: "Tentang bisnis", seoDescription: "Cerita kami", sections: [{ ...draft.sections[0]!, buttonUrl: "/" }] };
  const website = { ...draft, pages: [page], homeSeo: { title: "Beranda bisnis", description: "Selamat datang" } };
  assert.deepEqual(parseDraft(serializeDraft(website)), website);
  assert.throws(() => parseDraft(JSON.stringify({ ...website, pages: [page, { ...page, id: "different" }] })));
  assert.throws(() => parseDraft(JSON.stringify({ ...website, pages: [{ ...page, slug: "../admin" }] })));
  assert.throws(() => parseDraft(JSON.stringify({ ...website, pages: [{ ...page, sections: [{ ...page.sections[0], buttonUrl: "javascript:alert(1)" }] }] })));
  for (const href of ["https://example.com", "/tentang-kami", "mailto:halo@example.com", "tel:+628123456789", "#section-contact"]) assert.equal(validButtonUrl(href), true);
  for (const href of ["//evil.test", "javascript:alert(1)", "data:text/html,hi", "https://user:secret@example.com"]) assert.equal(validButtonUrl(href), false);
  const html = renderToStaticMarkup(<SiteCanvas draft={website} selected="" editing={false} onSelect={() => {}} onNavigate={() => {}} />);
  assert.ok(html.includes('href="/tentang-kami"')); assert.ok(html.includes("Tentang kami"));
});
test("Image library deduplicates across pages and preserves source descriptions", () => {
  const draft = createDraft();
  draft.pages = [{ id: "about", title: "Tentang", slug: "tentang", seoTitle: "", seoDescription: "", sections: [{ ...draft.sections[0]! }] }];
  const images = draftImages(draft);
  assert.equal(images.length, 1);
  assert.deepEqual(images[0]!.pages, ["Beranda", "Tentang"]);
  assert.equal(images[0]!.alt, draft.sections[0]!.imageAlt);
  draft.sections[0]!.image = "";
  assert.deepEqual(draftImages(draft)[0]!.pages, ["Tentang"]);
});
test("Page route changes repair incoming links without changing unrelated destinations", () => {
  const draft = createDraft();
  draft.sections[0]!.buttonUrl = "/about/";
  draft.sections[1]!.buttonUrl = "https://example.com/about";
  draft.pages = [{ id: "about", title: "About", slug: "about", seoTitle: "", seoDescription: "", sections: [{ ...draft.sections[0]!, buttonUrl: "/about" }] }];
  const renamed = rewritePageLinks(draft, "about", "/story");
  assert.equal(renamed.sections[0]!.buttonUrl, "/story");
  assert.equal(renamed.pages![0]!.sections[0]!.buttonUrl, "/story");
  assert.equal(renamed.sections[1]!.buttonUrl, "https://example.com/about");
  assert.equal(draft.sections[0]!.buttonUrl, "/about/");
  assert.equal(rewritePageLinks(renamed, "story", "/").sections[0]!.buttonUrl, "/");
  assert.throws(() => parseDraft(JSON.stringify({ ...draft, pages: [{ ...draft.pages[0], title: "" }] })), /nama halaman/);
  assert.throws(() => parseDraft(JSON.stringify({ ...draft, sections: [{ ...draft.sections[0], buttonUrl: "javascript:bad" }] })), /tujuan tombol/);
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

test("A stale tab cannot overwrite a newer saved draft and recovery preserves its edits in undo", async () => {
  const store = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (key: string) => store.get(key) ?? null, setItem: (key: string, value: string) => store.set(key, value) } });
  let state!: ReturnType<typeof useEditor>;
  function Harness() { state = useEditor(createDraft()); return null; }
  const root = createRoot(document.getElementById("test-root")!);
  await act(() => root.render(<Harness />));
  await act(() => state.change(d => ({ ...d, brand: "Perubahan tab saya" })));
  const other = { ...createDraft(), brand: "Perubahan tab lain" };
  store.set("mangelek-editor-v1-restaurant", serializeDraft(other));
  await act(() => state.save());
  assert.equal(state.conflict, true); assert.equal(state.dirty, true);
  assert.equal(state.draft.brand, "Perubahan tab saya");
  assert.equal(parseDraft(store.get("mangelek-editor-v1-restaurant")!).brand, other.brand);
  await act(() => state.loadLatest());
  assert.equal(state.conflict, false); assert.equal(state.dirty, false); assert.equal(state.draft.brand, other.brand);
  await act(() => state.undo()); assert.equal(state.draft.brand, "Perubahan tab saya");
  await act(() => root.unmount());
});
