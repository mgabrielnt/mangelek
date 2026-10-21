import "./setup.mjs";
import assert from "node:assert/strict";
import { test } from "node:test";
import { itemError, parseCms, serializeCms, slugify, type CmsItem } from "../src/lib/cms/document";
const item: CmsItem = { id: "sample", collection: "services", title: "Identitas merek", slug: "identitas-merek", summary: "Ringkasan", body: "Paragraf pertama.\n\nParagraf kedua.", price: "200000", archived: false, updatedAt: "2026-09-23T00:00:00.000Z" };
test("CMS backups preserve all collection content and recoverable archive state", () => {
  const doc = { version: 1 as const, items: [item, { ...item, id: "archived", slug: "arsip", archived: true }] };
  assert.deepEqual(parseCms(serializeCms(doc)), doc);
  assert.equal(slugify("Cerita & Karya Kami"), "cerita-karya-kami");
});
test("CMS rejects duplicate routes including archived records and malformed backups", () => {
  assert.match(itemError({ ...item, id: "new" }, [{ ...item, archived: true }]), /sudah digunakan/);
  assert.equal(itemError({ ...item, id: "new", collection: "menu" }, [item]), "");
  for (const changed of [{ title: "" }, { slug: "../admin" }, { collection: "unknown" }, { price: "-1" }, { updatedAt: "invalid" }, { body: "x".repeat(30001) }]) assert.throws(() => parseCms(JSON.stringify({ version: 1, items: [{ ...item, ...changed }] })));
  assert.throws(() => parseCms('{"version":1,"items":null}'));
  assert.throws(() => parseCms(JSON.stringify({ version: 1, items: [item, item] })));
});
