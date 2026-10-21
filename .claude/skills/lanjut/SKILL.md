---
name: lanjut
description: Melanjutkan pekerjaan tim agent Mangelek dari titik terakhir di STATE.md. Argumen opsional - produk (bawaan), template, crm, arsitektur, atau status.
disable-model-invocation: true
argument-hint: "[produk|template|crm|arsitektur|status]"
allowed-tools: Bash(head *)
---
# /lanjut $ARGUMENTS

Status saat ini:
!`head -n 120 docs/agents/STATE.md 2>/dev/null || echo "STATE.md belum ada"`

Jalur yang diminta: "$ARGUMENTS" (kosong = produk).

1. Jangan pernah mulai dari awal. Ambil "Langkah berikutnya" di atas untuk jalur ini; bila kosong, ambil
   item berikutnya dari `docs/agents/roadmap.md` (produk), `docs/templates/catalog.md` (template),
   `docs/crm/` (crm), atau jadwal tinjauan di STATE.md (arsitektur).
2. Bila argumen `status`: jangan mengerjakan apa pun. Balas ringkasan maks 10 baris: jalur dan irisan aktif,
   fase dan gerbang terakhir, tugas selesai sejak sesi lalu, pertanyaan terbuka, saran perintah berikutnya.
   Sarankan Gab menjalankan `/usage` untuk sisa kuota.
3. Selain itu, jalankan alur di skill `mangelek-flow` sampai gerbang berikutnya lulus, kuota sesi menipis,
   atau ada `PERLU_KEPUTUSAN` yang menghalangi semua pekerjaan.
4. Sebelum berhenti, perbarui STATE.md (tugas selesai, commit, langkah berikutnya yang persis) dan beri Gab
   ringkasan 5 baris + pertanyaan terbuka bila ada.
