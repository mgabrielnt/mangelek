---
name: release
description: Deploy produksi Mangelek. Hanya dijalankan oleh Gab.
disable-model-invocation: true
argument-hint: "[irisan, mis. S-01]"
---
# /release $ARGUMENTS

Gab meminta rilis produksi untuk: $ARGUMENTS.

1. Panggil agent `devops` dengan skill `release-checklist` mode produksi untuk irisan ini.
2. Sebelum perintah deploy apa pun, tampilkan ke Gab: daftar perubahan, migrasi yang akan jalan, rencana rollback,
   hasil G6 (CI, staging). Minta konfirmasi eksplisit "ya, rilis" (AskUserQuestion).
3. Setelah deploy: cek kesehatan (halaman utama, login, satu situs pelanggan, formulir lead), catat di
   `docs/runbooks/releases.md` dan STATE.md. Bila cek gagal, jalankan rollback dan laporkan.
