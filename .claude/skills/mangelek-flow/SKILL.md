---
name: mangelek-flow
description: Cara Orkestrator menjalankan tim agent Mangelek - urutan fase F0-F8, gerbang G0-G6, agent per fase, format serah-terima, pengumpulan pertanyaan untuk Gab, dan aturan naik model. Pakai setiap kali mengoordinasi pekerjaan irisan, template, CRM, atau arsitektur.
user-invocable: false
---
# Alur kerja Mangelek (untuk Orkestrator di sesi utama)

Anda mengoordinasi, bukan mengerjakan. Jangan membaca kode dalam-dalam dan jangan menulis kode fitur.
Status hanya disimpan di file: `docs/agents/STATE.md`.

## Fase dan gerbang per irisan `S-xx`
| Fase | Agent | Keluaran (di `docs/specs/S-xx/`) | Gerbang lulus jika |
| --- | --- | --- | --- |
| F1 Spec | pm | spec.md | G1: tiap story ber-ID FR, kriteria Diberikan–ketika–maka, tanpa `[PERLU KLARIFIKASI]` |
| F2 Rencana | architect → database → security | plan.md, api.yaml, delta skema, security.md (ancaman) | G2: kontrak, skema, spec cocok; tanpa risiko tinggi tanpa mitigasi |
| F3 Desain (paralel F2) | designer | design.md | G2: WCAG 2.2 AA, anggaran performa, K-28 |
| F4 Tugas | tech-lead (+ qa tulis tes) | tasks.md, tes gagal-dulu | G3: tiap tugas satu pemilik, file tidak tumpang tindih |
| F5 Bangun | database → backend → frontend | kode + tes, satu commit per tugas | G4: tes tugas lulus, typecheck/lint bersih (cek pakai runner) |
| F6 Verifikasi | qa, security, tech-lead | qa-report.md, security.md, review.md | G5: semua kriteria berbukti, nol temuan kritis/tinggi, review SETUJU |
| F7 Rilis | devops | catatan rilis, rollback | G6: CI hijau, staging diuji; production hanya via `/release` Gab |
| F8 Belajar | Anda | STATE.md, roadmap.md, traceability | retro 5 baris di STATE.md |

Periksa gerbang dari **file bukti**, bukan dari laporan agent. Gerbang gagal → kembalikan ke pemilik
dengan daftar perbaikan. Maks 2 putaran perbaikan; putaran ke-3 → tanya Gab.

## Memanggil agent
Prompt untuk subagent selalu berisi, ringkas:
```
Irisan: S-xx · Tugas: <id> · Fase: Fx
Baca: <2-5 path persis>
Kerjakan: <1-3 kalimat>
Selesai bila: <kriteria/tes>
Laporan: format CLAUDE.md, maks 15 baris.
```
- Jangan menempelkan isi file ke prompt; beri path.
- Paralel maksimal 2 agent dan hanya bila daftar file di tasks.md tidak beririsan (pakai `isolation: worktree` bila perlu).
- Pencarian file murah: agent bawaan Explore. Menjalankan tes/build: agent `runner`.

## Setelah setiap laporan
1. Perbarui `STATE.md`: baris tugas (status, commit, langkah berikutnya).
2. `PERLU_KONSULTASI` → panggil pemilik domain dengan pertanyaan itu saja.
3. `PERLU_KEPUTUSAN` → simpan di bagian "Pertanyaan terbuka" STATE.md; lanjutkan pekerjaan lain yang tidak terhalang.
4. Bila ada pertanyaan terbuka dan tidak ada lagi pekerjaan yang bisa jalan: ajukan semuanya sekaligus ke Gab
   (AskUserQuestion, maks 4, opsi rekomendasi pertama). Catat jawaban di `docs/agents/decisions.md`.

## Model
- Bawaan per agent ada di frontmatter. Naikkan ke Opus hanya bila: bagian berisiko tinggi (RLS, publish atomik,
  billing, webhook, idempotensi) gagal 2x, atau tech-lead merekomendasikan. Catat alasannya di STATE.md.
- Review kedua untuk RLS/otorisasi: panggil `security` dengan model opus.

## Jalur lain
- **Template:** pm pilih sel kosong `docs/templates/catalog.md` → designer riset + brief + desain → frontend bangun
  → qa (anggaran, a11y, 3 ukuran layar) → security (lisensi) → masuk katalog. Satu template per putaran.
- **CRM:** pm tulis usulan `docs/crm/proposals/CRM-xxx.md` → tanya Gab → bila setuju, jadi irisan biasa.
- **Arsitektur:** architect tulis tinjauan evolusi → CR → kelas Kecil/Sedang/Besar (Besar ke Gab).

## Sebelum berhenti (kuota menipis atau gerbang tercapai)
Tulis di STATE.md bagian "Langkah berikutnya" secara persis: jalur, irisan, fase, tugas, agent, file yang dibaca.
