import assert from "node:assert/strict";
import { test } from "node:test";
import { parseCloudDocument, parseDraftPatch, safeButtonUrl, type CloudDocument, type CloudDraft } from "@saas/contracts/cloud-document";
import { handleCloudDraft, type DraftGateway } from "../src/lib/editor/cloud-api";
const site = "11111111-1111-4111-8111-111111111111";
const revision = "22222222-2222-4222-8222-222222222222";
const document: CloudDocument = { schema_version: 1, pages: [{ id: site, path: "/", title: "Beranda", seo_description: "Bisnis kami", blocks: [{ id: revision, type: "hero", props: { heading: "Selamat datang", button_url: "https://example.com" } }] }], navigation: [{ label: "Beranda", path: "/" }], theme: { primary_color: "#334433", font_key: "sans" } };
const draft: CloudDraft = { revision_id: revision, revision_no: 1, etag: `"${revision}"`, document, updated_at: "2026-09-23T00:00:00Z" };
function request(body: unknown = { document }, headers: Record<string, string> = {}) { return new Request(`https://mangelek.test/v1/sites/${site}/draft`, { method: "PATCH", headers: { "content-type": "application/json", "if-match": draft.etag, ...headers }, body: JSON.stringify(body) }); }
test("v5.2 accepts canonical documents but never trusts client snapshots or tenant IDs", () => {
  assert.deepEqual(parseCloudDocument(document), document);
  assert.throws(() => parseDraftPatch({ document, tenant_id: site }));
  assert.throws(() => parseCloudDocument({ ...document, cms_snapshot: {} }));
  assert.throws(() => parseCloudDocument({ ...document, pages: Array(21).fill(document.pages[0]) }));
  assert.throws(() => parseCloudDocument({ ...document, pages: [document.pages[0], document.pages[0]] }));
  assert.throws(() => parseCloudDocument({ ...document, navigation: [{ label: "Hilang", path: "/missing" }] }));
  assert.throws(() => parseCloudDocument({ ...document, theme: { primary_color: "red", font_key: "script" } }));
});
test("Block validation refuses executable URLs, arbitrary props and mismatched collection types", () => {
  for (const url of ["javascript:alert(1)", "//evil.test", "data:text/html,test", "https://user:password@evil.test", "/\\evil.test", "https://good.test\n"]) assert.equal(safeButtonUrl(url), false);
  for (const props of [{ onclick: "bad" }, { asset_id: "not-a-uuid" }, { collection_key: "menu" }, { button_url: "javascript:alert(1)" }]) {
    assert.throws(() => parseCloudDocument({ ...document, pages: [{ ...document.pages[0], blocks: [{ id: revision, type: "hero", props }] }] }));
  }
});
test("API verifies the actor before database access, keeps drafts private and requires configuration", async () => {
  let accessed = false;
  const gateway = () => { accessed = true; return null; };
  const unauthorized = await handleCloudDraft(request(), site, { actor: async () => null, gateway });
  assert.equal(unauthorized.status, 401); assert.equal(accessed, false);
  const unavailable = await handleCloudDraft(request(), site, { actor: async () => site, gateway });
  assert.equal(unavailable.status, 503); assert.match(unavailable.headers.get("cache-control")!, /no-store/);
  assert.equal((await unavailable.json()).retryable, true);
});
test("API refuses cookie CSRF, missing revision, oversized payloads and injected snapshots", async () => {
  const dependencies = { actor: async () => site, gateway: () => { throw new Error("Must not reach database"); } };
  assert.equal((await handleCloudDraft(request(undefined, { cookie: "session=test", origin: "https://evil.test" }), site, dependencies)).status, 403);
  assert.equal((await handleCloudDraft(request(undefined, { "if-match": "*" }), site, dependencies)).status, 422);
  assert.equal((await handleCloudDraft(request({ document: { ...document, cms_snapshot: {} } }), site, dependencies)).status, 422);
  assert.equal((await handleCloudDraft(request({ document, padding: "x".repeat(1_048_640) }), site, dependencies)).status, 422);
});
test("API passes only the verified actor and returns exact ETag or recoverable conflict", async () => {
  let calls = 0;
  const gateway: DraftGateway = { async execute(actor, id, correlation, patch) {
    assert.equal(actor, "verified-actor"); assert.equal(id, site); assert.ok(correlation); assert.deepEqual(patch?.document, document); assert.equal(patch?.etag, draft.etag);
    return ++calls === 1 ? { status: 200, draft } : { status: 409, code: "revision_conflict" };
  } };
  const dependencies = { actor: async () => "verified-actor", gateway: () => gateway };
  const saved = await handleCloudDraft(request(), site, dependencies);
  assert.deepEqual(await saved.json(), draft); assert.equal(saved.headers.get("etag"), draft.etag);
  const conflict = await handleCloudDraft(request(), site, dependencies);
  assert.equal(conflict.status, 409); assert.equal((await conflict.json()).retryable, false);
});
