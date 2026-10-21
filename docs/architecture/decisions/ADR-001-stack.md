# ADR-001 Stack platform Mangelek untuk Tahap 0 sampai G2
Status: Disetujui Gab 2026-10-21 — Opsi B (lihat bagian Keputusan Gab)
Tanggal: 2026-10-21 · Kelas perubahan: Besar · Penulis: architect

## Konteks
- Gab meminta stack dievaluasi ulang sebelum dibangun (D-004). BRD v4.0 dan FRD v3.0 sudah mengasumsikan
  Supabase (Postgres + Auth), Cloudflare (Workers, R2, Queues, Cron, for SaaS, Turnstile), Resend, dan Midtrans.
- Kode yang ada: Next.js 16 di `apps/platform` dengan `@supabase/ssr` (halaman auth sudah dibuat), kerangka
  Workers di `apps/sites`, `.env.example` sudah menyebut Hyperdrive, R2, Queues.
- Batas: K-28 (hanya arsitektur yang berbayar); anggaran Tahap 0 maks Rp800.000 total, berhenti di Rp600.000 (D-007);
  keamanan minimum tidak boleh dikorbankan (D-008); NFR-01/27 (kecepatan dan berat JS per tingkat), NFR-04 (99,5%),
  NFR-07 (isolasi tenant), NFR-15 + FRD 7.6 (cadangan).
- Kurs untuk perkiraan: Rp17.900/USD (sama dengan BRD 11.2). Harga dari halaman resmi, dibuka 2026-10-21.

## Opsi
| Kriteria | A. Stack BRD, semua paket gratis | B. Stack BRD + Workers Paid sejak awal | C. Neon + auth sendiri + Cloudflare |
| --- | --- | --- | --- |
| Database & auth | Supabase Free: 500 MB, 50.000 MAU, 2 proyek aktif | Sama dengan A | Neon Free: 1 GB/proyek, 100 CU-jam; auth ditulis sendiri (mis. Better Auth) |
| Edge & situs pelanggan | Workers Free: 100.000 permintaan/hari, **10 ms CPU/permintaan**; R2 10 GB; for SaaS 100 hostname | Workers Paid: 10 juta permintaan/bulan, 30 dtk CPU | Sama dengan A |
| Email | Resend Free: 3.000/bulan, 100/hari | Sama | Sama |
| Biaya Tahap 0 (Rp/bulan) | Rp0 | ±Rp89.500 ($5) | Rp0 |
| Total 6 bulan Tahap 0 | Rp0 | ±Rp537.000 (di bawah batas Rp600.000) | Rp0 |
| Tahap B (≥ 6 website, BRD 11.2) | Supabase Pro $25 + Workers Paid $5 = ±Rp537.000/bulan | Sama | Neon Launch (bayar per pakai) + Workers Paid |
| Backup bawaan | Tidak ada di Free; **wajib** ekspor sendiri | Sama dengan A | PITR 6 jam (maks 1 GB) di Free |
| Risiko utama | CPU 10 ms bisa terlampaui oleh SSR dashboard/editor; proyek Free dijeda setelah 1 minggu tanpa aktivitas | Biaya tetap sebelum ada pendapatan | Auth buatan sendiri = permukaan serangan baru untuk developer solo; kode auth Supabase yang ada dibuang |
| Cocok dengan kode yang ada | Penuh | Penuh | Rendah |
| Vercel Hobby | Tidak dipertimbangkan: Hobby hanya untuk penggunaan non-komersial | | |

### Keamanan minimum (D-008)
| Kontrol | A | B | C |
| --- | --- | --- | --- |
| HTTPS semua situs + domain kustom | Ya (Cloudflare, for SaaS) | Ya | Ya |
| RLS + uji tenant A/B | Ya (Postgres) | Ya | Ya, tetapi tanpa `auth.uid()` bawaan |
| Backup + uji restore | Ya, dengan ekspor harian sendiri ke R2 (GitHub Actions, gratis) | Ya, sama | Ya (PITR 6 jam) + ekspor ke R2 |
| MFA admin, batas login | Ya (Supabase Auth) | Ya | Harus dibuat sendiri |
| Rate limit + proteksi bot | Ya (Workers + Turnstile) | Ya | Ya |
| Secret store | Ya (Wrangler secrets, env server) | Ya | Ya |
| Tanpa simpan data kartu | Ya (Midtrans) | Ya | Ya |

## Keputusan yang diusulkan
**Opsi A dengan pemicu naik ke B.** Stack sesuai BRD, semua paket gratis selama belum ada pendapatan, dan dua mitigasi wajib:
1. **Backup harian** (bukan mingguan seperti FRD 7.6): GitHub Actions menjalankan `pg_dump` setiap hari ke R2, simpan 14 terakhir,
   objek tidak pernah ditimpa; uji pulih ke proyek kosong sebelum pilot dan tiap bulan. RPO ≤ 24 jam sejak Tahap 0.
2. **Situs pelanggan disajikan sebagai release statis** dari R2/cache edge (asumsi FRD AF-06) agar CPU tetap di bawah 10 ms.
   Dashboard dan editor diukur sejak S-01.

Pemicu naik (lewat CR, ditanyakan ke Gab karena ada biaya):
- Workers Paid ($5, ±Rp89.500/bulan): error batas CPU > 0,1% permintaan dalam 7 hari, butuh Cron/Queue di atas kuota gratis,
  **atau** paling lambat sebelum 3 pilot berjalan (Sprint 8). Biaya 3 bulan pertama ±Rp268.500, masih di dalam batas D-007.
- Supabase Pro ($25): sesuai BRD saat ≥ 6 website berbayar (G2), atau database > 400 MB (80% kuota), atau sebelum ada
  pelanggan yang datanya tidak boleh hilang lebih dari 24 jam bila backup sendiri gagal 2 kali.
- Resend Pro ($20): lebih dari 80 email/hari selama 7 hari (asumsi FRD AF-04).

Opsi C tidak dipilih: keuntungan PITR kecil dibanding risiko auth buatan sendiri untuk developer solo dan biaya membuang kode Supabase yang ada.

## Keputusan Gab (2026-10-21)
**Opsi B disetujui:** stack BRD (Supabase, Cloudflare Workers/R2/Queues/for SaaS/Turnstile, Resend, Midtrans) dengan
**Workers Paid sejak awal** ($5, ±Rp89.500/bulan) agar dashboard dan editor tidak terkena batas 10 ms CPU.
- Backup harian ke R2 tetap wajib (disetujui sebagai K-29, mengganti backup mingguan di FRD 7.6).
- Biaya kumulatif melewati Rp150.000 (bulan ke-2) → agent bertanya ke Gab pos modal mana yang dipakai (D-013).
- Tahap berikutnya mengikuti BRD 11.2: Supabase Pro saat ≥ 6 website berbayar (G2). Aturan "25% pendapatan" tidak dipakai (D-014).
- Langganan Workers Paid dibuat oleh Gab sendiri (butuh metode pembayaran); agent tidak membuat akun berbayar.

## Akibat
- Positif: Rp0 sampai ada pendapatan; tidak ada kode yang dibuang; sesuai BRD/FRD tanpa perubahan besar.
- Negatif: backup harus dikelola sendiri; proyek Free dijeda setelah 1 minggu tanpa aktivitas (apakah backup harian dihitung sebagai aktivitas harus dibuktikan di staging; sebelum ada pilot, jeda tidak merugikan pelanggan); batas 10 ms CPU perlu dipantau; 2 proyek Supabase = staging + production
  (pengembangan lokal memakai Supabase CLI bila Docker tersedia, atau staging).
- Perubahan dokumen: FRD 7.6 (backup mingguan → harian) perlu disetujui Gab sebagai K-29.
- Pemicu tinjau ulang: setiap 3 irisan (evolusi arsitektur) atau saat salah satu pemicu di atas terjadi.

## Sumber
- [Supabase pricing](https://supabase.com/pricing), dibuka 2026-10-21: Free 500 MB, 50.000 MAU, dijeda setelah 1 minggu tidak aktif, tanpa backup; Pro $25 dengan backup harian 7 hari.
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/) dan [limits](https://developers.cloudflare.com/workers/platform/limits/), dibuka 2026-10-21.
- [Cloudflare for SaaS plans](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/), dibuka 2026-10-21: 100 hostname gratis, $0,10 per hostname tambahan.
- [Neon pricing](https://neon.com/pricing), dibuka 2026-10-21.
- [Resend pricing](https://resend.com/pricing), dibuka 2026-10-21.
- [Vercel fair use](https://vercel.com/docs/limits/fair-use-guidelines), dibuka 2026-10-21: Hobby hanya non-komersial.
