---
name: review-gate
description: Definition of Done dan daftar periksa review kode Tech Lead Mangelek untuk gerbang G5.
user-invocable: false
---
# Review dan Definition of Done

Baca: spec.md, tasks.md, `git diff main...HEAD` (per file, bukan sekaligus bila besar), qa-report.md, security.md.

## Definition of Done (semua wajib)
- [ ] Setiap kriteria terima punya tes yang lulus (bukti di qa-report.md).
- [ ] Typecheck, lint, tes paket terdampak lulus (bukti runner).
- [ ] Nol temuan kritis/tinggi di security.md.
- [ ] Batas impor `docs/architecture/boundaries.md` dipatuhi.
- [ ] Tidak ada kode di luar cakupan tugas; tidak ada TODO tanpa entri backlog.
- [ ] Teks UI Bahasa Indonesia sesuai design.md; semua state ada.
- [ ] traceability.csv diperbarui; dokumen terkait (data dictionary, runbook) diperbarui.
- [ ] Commit kecil, Conventional Commits, satu tugas satu commit.

## Fokus review
Kebenaran logika, penanganan error dan kasus tepi, konkurensi/idempotensi, kesederhanaan, nama yang jelas,
duplikasi, ukuran bundle. Komentar: file:baris, masalah, saran. Putusan: SETUJU atau BLOK.
