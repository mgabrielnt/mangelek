---
name: ac-to-test
description: Mengubah kriteria terima dan test case FRD Mangelek menjadi file tes yang gagal dulu, dengan penamaan ID TC dan level uji yang benar.
user-invocable: false
---
# Kriteria terima → tes

1. Untuk setiap AC di spec.md, cari TC-nya di modul FRD (kolom Level, Data uji, Langkah kunci, Lulus bila).
2. Level menentukan tempat:
   - Unit: di samping kode (`*.test.ts`), fungsi murni.
   - Integrasi/API: `tests/integration/<modul>/`.
   - Komponen/halaman platform: `apps/platform/tests/*.test.tsx` (node --test + jsdom, ikuti pola yang ada).
   - E2E: `tests/e2e/<irisan>/*.spec.ts` (Playwright, viewport 360 dan 1440).
3. Nama tes memuat ID: `test("TC-LEAD-002 formulir menolak tanpa persetujuan", ...)`.
4. Tulis tes sehingga **gagal** sebelum fitur ada; catat perintah dan hasil gagalnya di laporan.
5. Tes isolasi tenant ditambahkan untuk setiap endpoint/tabel baru (lihat skill rls-pattern).
6. Jangan memakai data pribadi asli; pakai fixture di `tests/fixtures/`.
