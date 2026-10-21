#!/usr/bin/env node
// PreToolUse (Edit|Write) di frontmatter agent: agent hanya boleh menulis di wilayahnya.
// Pemakaian: node guard-paths.mjs "apps/api/**" "packages/core/**"
// docs/specs/**, docs/agents/notes/** dan .claude/agent-memory/** selalu boleh (laporan dan catatan).
import { readFileSync } from "node:fs";
import path from "node:path";

const input = JSON.parse(readFileSync(0, "utf8") || "{}");
const file = input.tool_input?.file_path || input.tool_input?.notebook_path;
if (!file) process.exit(0);

const root = (process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd()).replace(/\\/g, "/");
let rel = file.replace(/\\/g, "/");
if (path.isAbsolute(file) || /^[A-Za-z]:\//.test(rel)) rel = path.posix.relative(root, rel);
rel = rel.replace(/^\.\//, "");

const always = ["docs/specs/**", "docs/agents/notes/**", ".claude/agent-memory/**"];
const globs = [...always, ...process.argv.slice(2)];
const toRe = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]]/g, "\\$&").replace(/\*\*/g, "\u0000").replace(/\*/g, "[^/]*").replace(/\u0000/g, ".*") + "$");

if (rel.startsWith("..") || !globs.some((g) => toRe(g).test(rel))) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: `File ${rel} di luar wilayah agent ini (${process.argv.slice(2).join(", ")}). Tulis catatan intervensi di docs/specs/<irisan>/notes.md agar pemilik wilayah yang mengubahnya.`,
    },
  }));
}
process.exit(0);
