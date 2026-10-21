#!/usr/bin/env node
// PreToolUse (Read|Grep|Glob): tolak bacaan yang boros token.
import { readFileSync, statSync } from "node:fs";

const input = JSON.parse(readFileSync(0, "utf8") || "{}");
const t = input.tool_input || {};
const p = String(t.file_path || t.path || t.pattern || "").replace(/\\/g, "/");

const nextDocs = /\/node_modules\/next\/dist\/docs\//;
const rules = [
  [/\.xlsx?$/i, "File xlsx tidak dibaca langsung. Pakai docs/requirements/INDEX.md (hasil scripts/agents/export-requirements.py)."],
  [/(^|\/)node_modules\//, "node_modules tidak dibaca, kecuali node_modules/next/dist/docs/."],
  [/(^|\/)\.next\//, "Folder build .next tidak dibaca."],
  [/pnpm-lock\.yaml$/, "pnpm-lock.yaml terlalu besar; pakai `pnpm why <paket>`."],
  [/\.tsbuildinfo$/, "File tsbuildinfo tidak berguna untuk dibaca."],
  [/(^|\/)\.env(\.local|\.production|\.development)?$/, "File rahasia tidak boleh dibaca."],
  [/(^|\/)\.dev\.vars$/, "File rahasia tidak boleh dibaca."],
];

function deny(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason },
  }));
  process.exit(0);
}

if (p && !nextDocs.test(p)) {
  for (const [re, why] of rules) if (re.test(p)) deny(why);
}

// File teks besar tanpa offset/limit -> minta baca sebagian.
if (input.tool_name === "Read" && t.file_path && t.offset == null && t.limit == null) {
  try {
    const st = statSync(t.file_path);
    if (st.isFile() && st.size > 120_000 && !/\.(png|jpe?g|webp|gif|pdf|svg)$/i.test(p)) {
      deny(`File ${Math.round(st.size / 1024)} KB. Cari dulu dengan Grep, lalu baca bagian yang perlu dengan offset/limit.`);
    }
  } catch { /* file belum ada: biarkan */ }
}
process.exit(0);
