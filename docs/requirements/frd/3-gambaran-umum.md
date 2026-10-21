<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

3. Gambaran Umum Sistem

3.1 Latar belakang dan tujuan bisnis

| Tujuan BRD | Target | Yang wajib disediakan sistem | Kebutuhan FRD |
| --- | --- | --- | --- |
| BO-01 Alur otomatis selesai | D-01–D-14 diterima, 31 Jan 2027 | Bayar → website + domain aktif → lead masuk tanpa tindakan manual | PAY-006–009, PRV-001–007, DOM-007–009, LEAD-004–005 |
| BO-02 Pelanggan mandiri | 3 dari 3 pilot | Wizard, editor ponsel, bantuan kontekstual | ONB-001–007, EDT-014 |
| BO-03, BO-04 Pendapatan dan MRR | 15 website; MRR Rp2.590.000 | Checkout tiga tingkat, website tambahan, perpanjangan, MRR per tingkat | PAY-001–012, TIER-001–006, SITE-001, SUB-004, ADM-002 |
| BO-05 Modal aman | Kas ≥ Rp400.000 | Berjalan di paket gratis sampai 5 pelanggan; antrean email sadar kuota | NFR-16, NTF-010 |
| BO-06, BO-12 CAC dan konversi | CAC ≤ Rp150.000; konversi ≥ 2% | Atribusi sumber pendaftar dan laporan konversi | MKT-009, ADM-002, ADM-012 |
| BO-07 Churn | ≤ 5%/bulan | Pengingat, tenggang, aktif kembali, laporan churn | SUB-004–007, NTF-005, ADM-002 |
| BO-08 Aktivasi instan | Website ≤ 5 menit; domain ≤ 24 jam | Provisioning dan registrasi domain dari antrean | PRV-004, DOM-007–008, NFR-02 |
| BO-09 Onboarding mudah | ≥ 70% terbit dalam 7 hari | Wizard, email onboarding, metrik aktivasi | ONB-001–006, NTF-003, ADM-002 |
| BO-10 Dukungan ringan | ≤ 30/45/60 menit per website per bulan (Standar/Premium/Eksklusif) | Status jelas, pesan error yang menuntun, WhatsApp berkonteks, tampilan hanya-baca untuk Dukungan, halaman status | ONB-007, ADM-013, STS-001–002, Bagian 9 |
| BO-11 Nilai bagi pelanggan | ≥ 50% website menerima ≥ 1 lead/bulan | Formulir, WhatsApp per item, Petunjuk Arah, email lead, laporan bulanan | LEAD-001–008, LEAD-011–012, BLK-004, NTF-007, ADM-002 |
| BO-13 Nilai per pelanggan | ≥ 30% website Premium/Eksklusif; ARPU ≥ Rp170.000 | Perbandingan tingkat, kursi Eksklusif, laporan MRR per tingkat | MKT-011, TIER-001–005, ADM-002, ADM-022 |
| BO-14 Website cepat | 100% template dan ≥ 90% website lulus Core Web Vitals | Anggaran berat per tingkat, animasi terkunci, varian gambar | BLK-010–011, MKT-010, MED-004, PUB-007 |

3.2 Deskripsi umum sistem

| Komponen | Lokasi repositori | Tanggung jawab | Kondisi kode per 20 Okt 2026 |
| --- | --- | --- | --- |
| Aplikasi platform | apps/platform (Next.js) | Situs pemasaran, autentikasi, checkout, dashboard pelanggan, editor, panel admin | Pemasaran, autentikasi, checkout Midtrans, dan editor lokal sudah ada; rute dashboard dan admin masih kosong |
| API /v1 dan webhook | apps/api; sementara route handler di apps/platform/src/app/v1 | 52 operasi OpenAPI v5.2 + perubahan di Bagian 3.5, notifikasi Midtrans | Baru GET/PATCH draf; lainnya kerangka |
| Jobs | apps/jobs (Cloudflare Queues + Cron) | Provisioning, domain, build release, email, penjadwal masa aktif | Kerangka kosong |
| Website pelanggan | apps/sites (Cloudflare Workers) | Resolve hostname → site → release aktif; terima formulir | Kerangka (cache, domain-resolution, published-content) |
| Paket bersama | packages/contracts, themes, site-renderer, core, db, integrations, ui, observability | Kontrak dokumen, katalog 6 tema, renderer, logika domain, adapter vendor | contracts, themes, site-renderer sebagian; lainnya kosong |
| Data | Supabase Postgres + Auth; Cloudflare R2 | Data tenant dengan RLS; objek media dan release | Belum dikonfigurasi; migrasi v5.2 belum diterapkan |
| Halaman status | apps/status (statis, di-host terpisah) | Menampilkan kondisi layanan dan insiden dari berkas status | Belum ada |

3.3 Stakeholder dan pengguna

| Peran | Kode | Akses ke sistem | Kebutuhan utama terhadap sistem | Perkiraan jumlah Jun 2027 |
| --- | --- | --- | --- | --- |
| Pengunjung situs pemasaran (calon pelanggan) | PEN | Publik, tanpa login | Melihat harga dan template, mencoba desain, mencari domain, mendaftar | ≥ 75 pendaftar/bulan (BRD 12.7) |
| Pelanggan / pemilik UMKM | PEL | Login email atau Google; peran owner; satu tenant dengan satu atau lebih website (maks 10) | Memilih tingkat, membayar per website, mengisi wizard, mengedit dan menerbitkan, menerima lead, mengelola domain dan langganan | 15 website |
| Pengunjung website UMKM | PWU | Publik di subdomain atau domain pelanggan | Membuka website cepat di ponsel, menghubungi lewat WhatsApp atau formulir | Ratusan per website per bulan |
| Operator admin Mangelek | ADM | Akun operator terpisah + MFA; 7 peran, MVP: Pemilik, Dukungan, Keuangan (Bagian 4.5) | Memantau pembayaran, domain, pekerjaan gagal; refund dengan persetujuan; membantu pelanggan hanya-baca; menangguhkan pelanggar; halaman status | 1 (Gab, Pemilik) |
| Proses otomatis | SIS | Kunci service-role di server | Menjalankan webhook, antrean, penjadwal secara idempoten | — |
| Vendor: Midtrans, reseller domain, Cloudflare, Supabase, Resend, Google Maps | — | Tidak login; dipanggil server (Maps Embed dari browser setelah klik) | Batas paket, format API, syarat merchant dan registran | 7 |
| Regulator: Komdigi (PSE), Lembaga PDP (UU PDP, PP 33/2026) | — | Tidak ada | Kebijakan privasi, persetujuan, hak data ≤ 3×24 jam, notifikasi kebocoran | 2 |

Asumsi yang harus dibuktikan sebelum sprint terkait:

| ID | Asumsi | Dibuktikan kapan | Dampak bila salah |
| --- | --- | --- | --- |
| AF-01 | API reseller (kandidat Exabytes) menyediakan cek ketersediaan, harga, registrasi, perpanjangan, saldo, kontak registran, dan mode uji | Sebelum Sprint 6 | DOM-002, DOM-007, DOM-014, DOM-016 butuh langkah manual; D-05 terancam |
| AF-02 | Akun Midtrans perorangan mendukung QRIS dan minimal satu Virtual Account | Sebelum Sprint 2 | PAY-004 hanya satu metode |
| AF-03 | Cloudflare for SaaS gratis cukup untuk 100 hostname pertama | Sprint 6 | Biaya $0,10/hostname lebih awal |
| AF-04 | Resend Free (100 email/hari, 3.000/bulan, 1 domain) cukup sampai ±30 pelanggan (Resend (https://resend.com/blog/new-free-tier)) | Bulanan | NTF-010 menunda email prioritas rendah lebih sering |
| AF-05 | Email Auth Supabase dikirim lewat SMTP Resend agar verifikasi dan reset tidak terkena batas SMTP bawaan | Sprint 1 | ACC-001, ACC-004 tertunda |
| AF-06 | Website disajikan sebagai release statis, sehingga Worker tetap di bawah 10 ms CPU per permintaan pada paket gratis | Sprint 3 | Harus Workers Paid lebih awal |
| AF-07 | Persetujuan tiga tingkat harga (keputusan BRD v4.0 no. 2) diberikan sebelum migrasi harga | Sebelum Sprint 2 | Seed harga dan teks halaman harga berbeda |
| AF-08 | Maps Embed API tetap gratis tanpa batas pemakaian dengan kunci yang dibatasi ke API itu (Google (https://developers.google.com/maps/documentation/embed/usage-and-billing)) | Sprint 7 | BLK-004 hanya menampilkan ilustrasi peta dari kode + tombol Petunjuk Arah |
| AF-09 | Animasi Premium/Eksklusif dengan Motion (inti, MIT), CSS, dan SVG/Canvas muat dalam anggaran NFR-27 | Template Premium pertama | Paket animasi dikurangi atau dipindah ke CSS |
| AF-10 | Semua fitur dan desain bisa dibangun tanpa biaya lisensi atau API berbayar per pemakaian; biaya hanya arsitektur (RB-30) | Setiap sprint | Fitur ditunda sampai ada alternatif gratis, bukan dibeli |
| AF-10 | Agen AI memangkas waktu pembuatan template ±50% (Premium ≤ 60 jam) | Template Premium pertama | Hanya 1 template Premium saat G1; payback template lebih lama |

Batasan:

| Jenis | Batasan | Konsekuensi pada desain |
| --- | --- | --- |
| Anggaran | Modal Rp1.600.000; tanpa biaya tetap baru sebelum G2 | Semua fungsi Must berjalan di paket gratis |
| Sumber daya | Satu developer paruh waktu; tanpa dukungan 24 jam | Kegagalan harus pulih sendiri atau masuk panel admin ≤ 15 menit |
| Pembayaran | QRIS/VA tidak bisa ditagih otomatis; autodebit hanya kartu dan GoPay (Midtrans (https://docs.midtrans.com/reference/api-methods-1)) | Perpanjangan memakai tagihan + pengingat |
| Platform gratis | Workers 100.000 permintaan/hari dan 10 ms CPU; Queues 10.000 operasi/hari dengan retensi pesan 24 jam; R2 10 GB-bulan (Cloudflare (https://developers.cloudflare.com/workers/platform/pricing/)) | Outbox di database menjadi sumber kebenaran pekerjaan; kuota media 500 MB × 20 website sudah melewati 10 GB |
| Email | Resend Free 100 email/hari | Antrean prioritas (NTF-010) |
| Produk | Satu pemilik per akun; maks 10 website per akun; per website maks 20 halaman × 20 bagian; kursi Eksklusif 10 per template dan 1 per kategori per kota | Constraint dan penguncian baris di database, bukan hanya di antarmuka |
| Lisensi | GSAP tidak dipakai (lisensinya melarang solusi yang bersaing dengan Webflow); Rive tidak dipakai (ekspor produksi butuh paket Cadet $17/seat/bulan); Motion+ tidak dipakai (berbayar) | Animasi memakai Motion inti (MIT), CSS, dan SVG/Canvas yang ditulis sendiri, di-host sendiri |
| Biaya | Fitur dan desain nol biaya: hanya pustaka open-source berlisensi permisif atau kode sendiri; tidak ada API berbayar per pemakaian (Places, Static Maps, WhatsApp Business API, AI) | Biaya kas hanya arsitektur: Supabase, Cloudflare, Resend, domain, biaya transaksi Midtrans (RB-30) |

Dependensi:

| Dependensi | Dipakai oleh | Syarat siap | Bila tidak tersedia |
| --- | --- | --- | --- |
| Supabase (Postgres, Auth) | Semua modul | Proyek staging, migrasi v5.3, RLS teruji | Login dan dashboard tidak bisa dipakai; website terbit tetap tayang dari edge |
| Midtrans Snap + Status API | PAY | Merchant terverifikasi (NIB), URL notifikasi HTTPS | Checkout ditutup dengan pesan ramah; perpanjangan tertunda tanpa memutus website sebelum H+8 |
| Reseller domain | DOM | Deposit Rp250.000, kredensial API | Website tetap di subdomain; domain dicoba ulang |
| Cloudflare Workers, R2, Queues, Cron, for SaaS, Turnstile | PUB, MED, PRV, SUB, DOM, LEAD | Akun, zona domain platform, binding | Tanpa edge, website tidak tayang |
| Resend | NTF, ACC, LEAD | Domain pengirim dengan SPF, DKIM, DMARC | Email ditahan di outbox dan dikirim ulang |
| Domain platform Mangelek | PRV, PUB, NTF | Domain dibeli dan zona di Cloudflare | Subdomain pelanggan belum punya alamat |

3.5 Penyelarasan dengan rancangan teknis v5.2

| No. | Topik | v5.2 atau kode saat ini | Keputusan FRD v2.0 | Artefak yang diubah |
| --- | --- | --- | --- | --- |
| 1 | Harga | Seed Rp200.000/1 bulan dan Rp2.400.000/12 bulan; CHECK billing_price | Tiga tingkat: Rp149.000/Rp1.490.000, Rp200.000/Rp2.000.000, Rp300.000/Rp3.000.000 (BRU-02) | plans, plan_prices, src/data/pricing, FAQ, migrasi (7.4) |
| 2 | Template | Enum 2 kode (service-modern, restaurant-premium) | Katalog dari template_versions berstatus released dengan tier; 8 template saat peluncuran (BRD FR-21) | OpenAPI Template.code jadi string bebas; Template.tier |
| 3 | Checkout domain | Order langganan terpisah; POST /v1/domain-orders butuh site_id | Satu order dengan baris subscription + opsional domain_registration; domain_orders dibuat saat checkout tanpa site_id | POST /v1/orders menerima domain_choice |
| 4 | Tampilan | primary_color + font_key sans/serif | palette_id (6) + font_pack_id (3), sesuai editor | Document schema_version 2 |
| 5 | Isi blok | Tanpa teks alternatif, sembunyi, profil usaha | Tambah image_alt, hidden, dan document.business (nama, logo, kontak, alamat, koordinat, jam buka) | Block, Document |
| 6 | Formulir | Nama, email, pesan | + phone, persetujuan berversi; email atau telepon wajib salah satu; pesan 1–1.000 karakter | post_v1_forms_*_Request |
| 7 | Lead | Hanya form_submissions | + leads sebagai catatan kerja dan CRM (contacts, deals, crm_activities, crm_tasks) di MVP | Kamus data |
| 8 | Media | Maks 5 MiB per file | 1.500.000 byte per file; kuota 500 MB per website (BRU-11) | UploadIntent |
| 9 | Berhenti berlangganan | Tidak ada | cancel_at_period_end, canceled_at, cancel_reason | subscriptions, endpoint baru |
| 10 | Tenggang dan retensi | “Masih usulan” | Ditetapkan 7 dan 30 hari (BRU-05, BRU-06); editor hanya-baca saat tenggang | Penjadwal SUB |
| 11 | Perpanjangan domain | auto_renew = false | Tetap tanpa debit otomatis; sistem membuat tagihan H-30 (BRU-14) | Penjadwal DOM |
| 12 | Tiket dukungan | support_tickets + 2 endpoint | Won't untuk MVP; dukungan lewat WhatsApp berkonteks (BRD 6.1) | Endpoint dimatikan; tabel tidak dibuat |
| 13 | Operator | Tidak ada tabel | platform_operators dengan MFA wajib | Kamus data |
| 14 | Legal | Tidak ada | legal_documents + consents | Kamus data |
| 15 | Data tambahan | Tidak ada | site_settings, onboarding_steps, preview_sessions, analytics_*, email_suppressions, registrar_balance_checks, referral_* | ERD v2 (5.6) |
| 16 | Prototipe billing | Tabel billing_orders | Dimigrasi ke orders v5.3 lalu diarsipkan | Migrasi (7.4) |
| 17 | Draf lokal | SiteDraft v1 di browser | Adapter migrasi ke Document v2 dengan pratinjau sebelum disimpan | Migrasi (7.4) |
| 18 | Lingkup IA | Owner + Staff, CRM penuh | Owner saja; CRM inti Must (modul CRM, Bagian 4.2) | IA dashboard: menu CRM (Kotak masuk, Pipeline, Kontak, Tugas, Laporan) |
| 19 | Tingkat | Satu paket | 3 plans; tingkat ditentukan template_versions.tier (TIER-002) | plans.features, GET /v1/plans |
| 20 | Website per akun | UNIQUE sites.tenant_id, subscriptions.tenant_id | Banyak website; UNIQUE sites.origin_order_line_id dan subscriptions.site_id; batas 10 (RB-21) | Migrasi M-09, konteks site_id di API |
| 21 | Ganti template/tingkat | Tidak ada | scheduled_changes, berlaku di periode berikutnya (BRU-17) | Endpoint scheduled-changes |
| 22 | Kursi Eksklusif | Tidak ada | template_seats dengan tahan 30 menit (BRU-18) | Endpoint seat-holds |
| 23 | Blok | 7 jenis blok tanpa varian | Pustaka blok umum + kategori, 2–3 varian, latar bagian; Document v3 | Document schema_version 3, migrasi M-10 |
| 24 | Peta | Tautan saja | Ilustrasi peta SVG dari kode + Maps Embed (gratis) setelah klik + Petunjuk Arah lewat Maps URLs (BRU-24) | business.place_id, renderer blok Lokasi |
| 25 | SEO | Should | Must + JSON-LD LocalBusiness (EDT-020) | Build release |
| 26 | Admin | super_admin tunggal | 7 peran, persetujuan dua orang, masking PII, impersonasi hanya-baca (ADM-013–017) | admin_role_assignments, admin_approvals, impersonation_sessions |
| 27 | Halaman status | Tidak ada | Halaman statis terpisah (STS) | status_incidents, status_updates, apps/status |
| 28 | Hak data | Tidak ada | Permintaan ≤ 3×24 jam, insiden, catatan pemrosesan (PP 33/2026) | data_requests, data_incidents, legal_documents ropa |
| 29 | Ekspor | Konten penuh (Should) | Hanya isi milik pelanggan, Must (BRU-19) | POST /v1/exports |
| 30 | Animasi | Tidak diatur | Motion inti/CSS/SVG di-host sendiri, tanpa pustaka berbayar, terkunci, anggaran per tingkat (BLK-010–011) | template_versions.animation_pack, perf_budget_kb |
| 31 | CRM | CRM lokal di browser (/cms) | CRM cloud per website: kontak, pipeline, aktivitas, tugas, template pesan, otomasi (modul CRM) | 11 tabel kelompok I, endpoint /v1/sites/{id}/contacts, deals, tasks |
