import assert from "node:assert/strict";
import { test } from "node:test";
import { filterArticles } from "../src/data/blogs";
test("Article search combines category and case-insensitive words",()=>{
  assert.equal(filterArticles("  DOMAIN  ","Domain").length,1);
  assert.equal(filterArticles("domain","Konten").length,0);
  assert.equal(filterArticles("website bisnis","Semua")[0]?.slug,"menyiapkan-website-bisnis");
  assert.equal(filterArticles("zz-nonexistent","Semua").length,0);
  assert.equal(filterArticles("   ","Semua").length,4);
});
