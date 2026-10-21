# Penyelarasan Website Editor dengan rencana v5.2

Tanggal pemeriksaan: 23 September 2026. Ini catatan implementasi, bukan tanda semua acceptance criteria selesai.

## Sumber yang digunakan

- [Pusat pengerjaan Notion v5.2](https://app.notion.com/p/3e37f3c8f43881aead21d9626962d8a8): teknis v5.2 menggantikan v5.1; bisnis/harga tetap v5.
- [US03 — Draft tersimpan](https://app.notion.com/p/3e37f3c8f43881b08f4be735edb6c566): lintas perangkat, konflik revisi 409, preview privat.
- [E03.1 — Draft cloud](https://app.notion.com/p/3e37f3c8f43881838988c7ab136c7719), [E03.2 — Konflik revisi](https://app.notion.com/p/3e37f3c8f43881618decd06a9b939082), [E02.2 — Membership](https://app.notion.com/p/3e37f3c8f4388127b274fc5487c7a373).
- [Dokumen bisnis v5](https://docs.google.com/document/d/1Ipsmu7fEpUKkRVBl7hyYe_lRpzencmDL0Mj5WHTh8VE/edit).
- [Keputusan teknis v5.2](https://drive.google.com/file/d/1wu6H2moRdhq_3f4kTXjYa2L-RFsTcSYc/view), [kamus data](https://drive.google.com/file/d/1l9mkQdF7TyoYzUCI_yrF7QuaqVfq2Ncw/view), [OpenAPI](https://drive.google.com/file/d/1Fx02tpoa6Kk7Bh5FA7_4_IBynapQCEJf/view). Salinan yang dibaca disimpan di `sources/` dan `openapi-v5.2.json`.

## Hasil pencocokan

| Kebutuhan | Kondisi implementasi |
|---|---|
| Dua demo; Rp200.000/bulan dan Rp2.400.000/12 bulan | Dipertahankan; tidak menambah demo atau mengubah harga |
| Sunting teks, gambar, susunan, desain | Editor lokal tersedia dengan undo, backup, preview desktop/ponsel |
| Penyimpanan aman antartab | Peringatan konflik, unduh perubahan, muat versi tersimpan; undo mempertahankan versi lokal sebelumnya. Web Locks menyerialkan penyimpanan pada browser pendukung; fallback pengecekan baseline bukan jaminan atomik lintas tab |
| Dokumen cloud v5.2 | Kontrak terpisah untuk pages/navigation/theme, 7 jenis blok, UUID unik, SEO, maksimum 20 halaman, tanpa script atau cms_snapshot dari klien |
| GET/PATCH `/v1/sites/{id}/draft` | Handler dan adapter Supabase tersedia; verified actor, If-Match/ETag, no-store/noindex, input capped, correlation ID, 401/403/404/409/422/429/503 |
| Revisi immutable dan tenant isolation | Proposal RPC mengunci site, memeriksa membership dan paid period, menyimpan revision + asset references + audit dalam transaksi; BELUM diterapkan atau diuji pada PostgreSQL |
| Editor cloud lintas perangkat | BELUM tersambung ke UI. Draft lokal tidak otomatis dikirim atau dikonversi karena formatnya berbeda |
| Private preview session | BELUM ada token TTL 15 menit/origin terpisah; preview saat ini hanya iframe lokal |
| CMS, media cloud, publish | BELUM ada layanan CMS/R2 quarantine, publish queue, immutable release, edge CAS |

## Perbedaan kontrak yang perlu diselesaikan

Draft lokal memakai empat jenis section, enam palet, tiga font, brand, hidden sections, teks alternatif, item inline, dan gambar data URL. OpenAPI v5.2 memakai tujuh block types, primary_color, dua font keys, asset_id dan collection_key. OpenAPI belum mempunyai padanan lossless untuk seluruh data lokal (terutama alt text, hidden, brand dan palet lengkap). Jangan mengganti schema_version atau membuang data secara diam-diam. Tambahkan adapter migrasi yang menampilkan perubahan kepada pemilik setelah template manifest dan media/CMS tervalidasi; atau revisi kontrak formal untuk field yang harus dipertahankan.

Validator runtime menerapkan batas implementasi tambahan: dokumen 1 MiB, 100 blok/halaman, 20 item navigasi, path lokal lower-case tanpa traversal, URL tombol HTTPS/local/anchor. Ini batas keamanan/editor awal, bukan kuota komersial yang dijanjikan. Validasi manifest template spesifik masih harus ditambahkan setelah manifest released tersedia.

## Yang dibutuhkan untuk aktivasi sesuai arsitektur

1. Project Supabase staging: URL/publishable key, service-role server-only, Auth/Google provider dan redirect yang benar. Simpan rahasia dalam `.env.local` atau secret store, tidak di chat. Workspace saat pemeriksaan hanya memiliki `.env.example`.
2. Migrasi dasar v5.2 yang diterapkan dan diuji: tenants, memberships, plan/version, sites, orders/order_lines, subscriptions/subscription_periods, revisions, CMS/media, revision_assets dan audit; RLS/grants serta composite FK harus terbukti. `billing_orders` lama bukan schema v5.2 dan tidak boleh dianggap sebagai membership atau entitlement.
3. Provisioning dari pembayaran terverifikasi: tenant + owner + satu site + revision pertama + template version. Tidak ada endpoint editor yang membuat paid period palsu. Review dan uji `packages/db/proposals/editor-v52.sql` setelah basis data tersebut tersedia; baru aktifkan `EDITOR_CLOUD_ENABLED=true`.
4. R2 bucket privat/quarantine, upload intent, pemeriksaan byte/MIME/dimensi, otorisasi asset dan lifecycle; Workers/Queues untuk publish; domain preview terpisah dan signing secret di server.
5. Acceptance staging: tenant A/B, dua penyimpan bersamaan (satu 200, satu 409), rollback audit gagal, sesi kedaluwarsa, read-only masa tenggang, restore draft lintas perangkat, token preview kedaluwarsa, quota race, publish gagal mempertahankan release lama.

Grace 7 hari, retensi 30 hari, kuota pilot dan recovery target masih proposal dalam dokumen sumber. Jangan mengubahnya menjadi janji UI atau menyatakan produksi siap tanpa keputusan dan pengujian. Tidak ada migrasi live, pembelian provider atau deployment yang dilakukan.

## Bukti pemeriksaan

42 tes aplikasi lulus pada 23 September 2026, termasuk lima tes kontrak/handler cloud dan konflik draft lokal. Tes handler memakai gateway terkontrol; ini bukan bukti RLS, PostgreSQL locking, entitlement nyata atau integrasi Supabase berjalan. Browser lokal membuktikan perubahan dari tab kedua memunculkan konflik, menonaktifkan penyimpanan lama, dan pemulihan tetap bisa di-undo. Pemeriksaan desain dibatasi pada perubahan editor ini.
