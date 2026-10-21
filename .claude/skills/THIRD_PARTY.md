# Skill pihak ketiga

Diperiksa sebelum dipasang (isi dibaca, skrip dibaca, tidak ada perintah jaringan/hapus/eksekusi tersembunyi,
tidak ada instruksi yang mencoba mengubah perilaku agent di luar topiknya).

| Skill | Sumber | Commit | Lisensi | Diperiksa | Catatan |
| --- | --- | --- | --- | --- | --- |
| vercel-react-best-practices (`react-best-practices/`) | github.com/vercel-labs/agent-skills | 063bee94c3f4 (2026-08-28) | MIT | 2026-10-21 | Hanya Markdown + metadata.json. `AGENTS.md` 3.810 baris: baca per bagian, jangan utuh. |
| supabase-postgres-best-practices | github.com/supabase/agent-skills | c9be0e931b79 (2026-10-02) | MIT | 2026-10-21 | Hanya Markdown (SKILL.md + references/). Dipasang setelah ADR-001 memilih Supabase. |
| webapp-testing | github.com/anthropics/skills | dbd4588f9e10 (2026-10-09) | Apache-2.0 | 2026-10-21 | `scripts/with_server.py` menjalankan perintah server yang diberikan (shell=True); hanya pakai dengan perintah dev repo sendiri. Butuh Python Playwright. |

Skill desain di `.agents/skills/` (impeccable, web-design-guidelines, review-animations, improve-animations) dipakai lewat
pembungkus di folder ini; sumber dan hash tercatat di `skills-lock.json`.
