# Urutan implementasi

Status: baseline struktur; fitur dan infrastruktur belum dibuat.

1. Rekonsiliasi FR/NFR, use case, dan logical/physical data model asli.
   Dokumen asli tersebut belum disalin atau divalidasi oleh generator ini.
2. Pilih versi Node LTS, pnpm, TypeScript, React, Next.js dan dependencies
   yang kompatibel. Pin versi, isi packageManager, jalankan pnpm install,
   lalu commit pnpm-lock.yaml asli. Lockfile tidak dibuat manual.
3. Pilih satu adapter deployment frontend setelah spike kompatibilitas.
   Autentikasi, managed PostgreSQL, payment, email, monitoring dan IaC
   masih memerlukan keputusan. Jangan pasang dua adapter sekaligus.
4. Tambahkan dependencies per unit dan workspace:* untuk paket lokal.
   Buat entrypoint, exports yang menunjuk file nyata, tsconfig per runtime,
   konfigurasi Next/Tailwind/Workers, serta dev/build/typecheck/lint/test.
   Next dan Workers memiliki lib/types berbeda; jangan menyamakannya.
5. Implementasikan db/src/client.ts, db/src/tenant-context.ts, schema,
   migrations dan seeds dari ERD yang disetujui, bukan tebakan generator.
6. Implementasikan identity, tenancy, otorisasi server dan isolasi tenant.
7. Alur pertama: pilih tema -> buat site -> edit CMS -> publish -> buka
   website -> kirim formulir -> lead masuk. Gunakan renderer bersama.
8. Integrasikan billing/entitlements, domain, media, jobs dan notifikasi.
9. Uji keamanan, kinerja, rollback, restore; tetapkan kapasitas dan biaya.
10. Siapkan staging, CI, secrets, binding Workers dan deployment terkontrol.

Sprint adalah pengelompokan pekerjaan; tanggal dan kapasitas belum ditetapkan.
AI ditambahkan saat fiturnya mulai dibangun, bukan dependency wajib awal.
Struktur tidak membuktikan kesiapan produksi atau kelulusan FR/NFR.

## Pembaruan Website Editor — 2026-09-21

Tahap frontend editor tersedia di `/editor`: sunting teks/gambar/desain dan
struktur section, preview, undo/redo, simpan draft lokal dan cadangan JSON.
Kontrak dokumen, katalog tema dan renderer telah dipisahkan ke packages
contracts, themes dan site-renderer sesuai batas impor.

Ini belum menyelesaikan alur server langkah 5–8. ERD asli, membership/site
authorization, media storage, persistensi draft server, provisioning dan
publikasi immutable masih perlu dihubungkan. Rincian kebutuhan dan urutannya
ada di `docs/runbooks/website-editor.md`; draft lokal tidak dianggap website
terpublikasi atau penyimpanan milik tenant.
