---
name: release-checklist
description: Daftar periksa rilis Mangelek untuk staging dan produksi - CI, migrasi, backup, rollback, cek kesehatan, catatan rilis.
user-invocable: false
---
# Rilis

## Staging (otomatis setelah G5)
1. CI hijau di branch irisan (typecheck, tes, build, audit, gitleaks, tes isolasi).
2. Backup database staging, lalu jalankan migrasi; catat hasil.
3. Deploy staging; jalankan E2E alur irisan terhadap staging.
4. Tulis rollback: versi sebelumnya, cara membalik migrasi atau langkah expand-contract.
5. Catat di `docs/runbooks/releases.md`: tanggal, irisan, commit, hasil, rollback.

## Produksi (hanya lewat /release oleh Gab)
1. Semua langkah staging lulus untuk commit yang sama.
2. Backup produksi segar + verifikasi bisa dibaca.
3. Tampilkan ringkasan ke Gab dan tunggu konfirmasi.
4. Migrasi → deploy → cek kesehatan (beranda, login, satu situs pelanggan, formulir lead, webhook uji).
5. Gagal = rollback segera, laporkan.
