#!/usr/bin/env node
// Dua mode:
// 1) PreToolUse (Bash): bungkus perintah tes/typecheck/build/lint agar keluarannya disimpan ke log
//    dan yang masuk konteks hanya error + ringkasan.
// 2) `node trim-output.mjs --print <log>`: cetak bagian penting log.
import { readFileSync } from "node:fs";

const MAX = 120;
const ERR = /(error|fail|✖|×|✗|\bTS\d{4}\b|not ok|assert|exception|warn(ing)?:|cannot find|unexpected)/i;

if (process.argv[2] === "--print") {
  const file = process.argv[3];
  let lines = [];
  try { lines = readFileSync(file, "utf8").split(/\r?\n/); } catch { process.exit(0); }
  const keep = new Set();
  lines.forEach((l, i) => { if (ERR.test(l)) for (let k = i - 1; k <= i + 2; k++) if (k >= 0 && k < lines.length) keep.add(k); });
  const picked = [...keep].sort((a, b) => a - b).map((i) => lines[i]).slice(0, MAX);
  const tail = lines.filter((l) => l.trim()).slice(-12);
  console.log(`[log lengkap: ${file}, ${lines.length} baris]`);
  if (picked.length) console.log("--- baris error/peringatan ---\n" + picked.join("\n"));
  console.log("--- akhir keluaran ---\n" + tail.join("\n"));
  process.exit(0);
}

const input = JSON.parse(readFileSync(0, "utf8") || "{}");
const cmd = String(input.tool_input?.command || "");
const heavy = /^(pnpm|npm|npx|yarn|node --test|tsc|next|vitest|playwright)\b.*\b(test|typecheck|build|lint|tsc|vitest|playwright|e2e)\b/;
if (!heavy.test(cmd.trim()) || cmd.includes("trim-output.mjs") || /[|>]/.test(cmd)) process.exit(0);

const log = ".claude/tmp/last-output.log";
const wrapped = `mkdir -p .claude/tmp && ( ${cmd} ) > ${log} 2>&1; ec=$?; node "\${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/trim-output.mjs" --print ${log}; exit $ec`;
process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "allow",
    permissionDecisionReason: "Keluaran dipotong: hanya error dan ringkasan yang masuk konteks.",
    updatedInput: { ...input.tool_input, command: wrapped },
  },
}));
