# S-01 Alur inti: template sampai lead di CRM
Tujuan: pemilik UMKM memilih template, punya website di subdomain, mengedit isinya di cloud, menerbitkannya,
dan menerima pesan pengunjung di kotak masuk CRM, semuanya tanpa bantuan manual.
Modul: MKT, ACC, PRV, EDT, PUB, LEAD, CRM · Fase BRD: 0 (Sprint 1, 3, 4 sebagian) · Status: F1 selesai (G1 lulus 2026-10-22)

## Batas irisan
- Tanpa pembayaran. Website dibuat dari **order uji** berstatus lunas (sandbox) yang dibuat oleh seed/skrip staging.
  Checkout Midtrans + pembuatan website otomatis dari notifikasi menjadi S-02 (asumsi Orkestrator 2026-10-21).
- Situs pelanggan diuji lokal (wrangler dev, header Host) dan di staging setelah Cloudflare aktif (D-016).
- Turnstile memakai kunci uji resmi di lokal.
- Mulai dari kode yang ada (commit 24f281f): halaman auth Supabase, editor lokal + `v1/sites/[id]/draft`,
  CMS/CRM/dashboard frontend, `packages/site-renderer`, `packages/themes`, `packages/db/proposals/editor-v52.sql`.
  Kode yang ada dipakai bila lulus kriteria; bila tidak, diganti di tugas yang sama.

## Story

### Tonggak M1 — Fondasi data dan akun

#### S-01-US01 Harga tiga tingkat dari satu sumber  (FR-MKT-002, Must)
Sebagai pengunjung, saya ingin melihat harga Standar, Premium, dan Eksklusif yang benar, agar bisa memilih tingkat yang sesuai.
Kriteria terima:
- AC-MKT-02: Diberikan plan_prices tiga tingkat yang berlaku, ketika /pricing dimuat, maka harga bulanan dan tahunan
  Standar, Premium, Eksklusif, hemat 2 bulan, dan 5 contoh total BRD 10.2 tampil dari GET /v1/plans, dan build tidak
  memuat angka harga tertanam.
Catatan: `apps/platform/PRODUCT.md`, `src/data/pricing/plan.ts`, dan `faq.ts` masih satu paket Rp200.000 / Rp2.400.000 →
diselaraskan (D-005). Lisensi rujukan "React Bits Pricing 14" dicek `security` sebelum dipakai di halaman berbayar.
Test case: TC-MKT-002
Data pribadi: tidak ada

#### S-01-US02 Tenant pemilik dibuat sekali  (FR-ACC-005, FR-ACC-011, Must)
Sebagai pemilik baru, saya ingin akun usaha saya siap begitu email terverifikasi, agar langsung bisa membuat website.
Kriteria terima:
- AC-ACC-05: Diberikan pengguna baru terverifikasi, ketika akses pertama dipanggil 3 kali bersamaan dan satu panggilan
  digagalkan di tengah, maka tercipta tepat satu profiles, tenants, dan memberships owner tanpa baris parsial.
- AC-ACC-11: Diberikan tenant dengan satu pemilik, ketika anggota kedua ditambahkan lewat API atau INSERT langsung,
  maka sistem membalas E-CONFLICT dan constraint UNIQUE memberships.tenant_id menolak; membuat website kedua tetap diizinkan.
Test case: TC-ACC-005, TC-ACC-011
Data pribadi: nama dan email pemilik · persetujuan: syarat layanan saat daftar (sudah ada di halaman daftar) ·
masa simpan: selama akun ada · hak hapus: FR-ACC-010 (S-07)

#### S-01-US03 Isolasi antar pelanggan  (NFR-07, Must)
Sebagai pemilik, saya ingin data saya tidak pernah terlihat oleh pelanggan lain.
Kriteria terima:
- NFR-07: Diberikan akun A dan B, ketika A mencoba membaca/mengubah data B lewat UI, API, URL media, cache, pratinjau,
  dan ekspor, maka semua ditolak; uji A/B otomatis berjalan di CI untuk setiap tabel dan endpoint S-01.
Test case: TC-SEC-001 s.d. TC-SEC-003 (lihat `test-cases-lintas-modul.md`)
Data pribadi: —

### Tonggak M2 — Website dibuat dan diedit

#### S-01-US04 Pilihan template terbawa ke pembuatan website  (FR-MKT-003, FR-MKT-005 sebagian, Must)
Sebagai pengunjung, saya ingin memilih template di galeri lalu mendaftar tanpa kehilangan pilihan itu.
Kriteria terima:
- AC-MKT-03: Diberikan template released dari 2 tingkat, ketika pengunjung memfilter kategori, tingkat, atau mencari,
  maka hanya versi released tampil dengan lencana tingkat, jumlah hasil diumumkan ke pembaca layar, dan hasil kosong
  menampilkan tombol reset. (S-01: minimal 1 template released per tingkat Standar dan Premium; 8 template = S-06.)
- AC-MKT-05 (varian S-01): Diberikan pilihan desain dan tingkat dibuat sebelum mendaftar, ketika pengunjung mendaftar
  dalam 7 hari, maka pilihan yang sama dipakai order uji; versi pensiun memicu E-TEMPLATE-RETIRED dan tingkat yang
  tidak cocok memicu E-TIER-MISMATCH.
Test case: TC-MKT-003, TC-MKT-005

#### S-01-US05 Website dibuat dari order lunas  (FR-PRV-001 s.d. FR-PRV-005, Must)
Sebagai pemilik, saya ingin website saya langsung ada di subdomain setelah order lunas.
Kriteria terima:
- AC-PRV-01 (varian S-01): Diberikan order uji lunas, ketika diulang 10 kali, maka setiap kali website tayang di
  subdomain ≤ 5 menit sejak paid_at tanpa tindakan manual.
- AC-PRV-02: Diberikan nama usaha "Kopi Kenangan Senja!", "Admin", dan nama yang bentrok, ketika slug dibuat, maka
  hasilnya kopi-kenangan-senja, slug cadangan usaha-xxxxxx, dan akhiran -2.
- AC-PRV-03: Diberikan pekerjaan site.provision diantrekan 3 kali untuk order_line yang sama, ketika semua selesai,
  maka tercipta 1 site dengan origin_order_line_id itu, 1 revisi nomor 1, dan 1 release aktif; order website kedua
  milik tenant yang sama membuat site terpisah.
Test case: TC-PRV-001, TC-PRV-002, TC-PRV-003

#### S-01-US06 Mengedit isi di cloud  (FR-EDT-001, 002, 003, 005, 006, 012, Must)
Sebagai pemilik, saya ingin mengubah teks, gambar, dan bagian halaman, dan perubahan saya tersimpan di mana pun saya membuka editor.
Kriteria terima:
- AC-EDT-01: Diberikan pemilik site, ketika editor dibuka, maka revisi terbaru dan etag dimuat dengan header no-store
  dan noindex; site tenant lain membalas 404.
- AC-EDT-02: Diberikan blok, ketika judul, teks, gambar, label tombol, dan URL diubah dalam batas V-09/V-11, maka
  pratinjau berubah ≤ 200 ms; nilai di atas batas ditolak dengan pesan per kolom.
- AC-EDT-03: Diberikan halaman berisi 20 bagian, ketika bagian ke-21 ditambah atau bagian terakhir yang terlihat
  disembunyikan, maka keduanya ditolak; jenis blok di luar manifest template tidak tersedia di pustaka.
- AC-EDT-05: Diberikan perubahan draf, ketika browser ditutup lalu dibuka di perangkat lain, maka perubahan tetap ada;
  simpan terjadi 3 detik setelah ketikan berhenti, indikator berganti Menyimpan… → Tersimpan, dan simpan < 1 detik
  sejak sebelumnya ditolak.
- AC-EDT-06: Diberikan draf dibuka di dua tab, ketika tab kedua menyimpan setelah tab pertama, maka tab kedua menerima
  E-REVISION-CONFLICT dan dialog tiga pilihan, tanpa perubahan yang hilang diam-diam.
- AC-EDT-12: Diberikan muatan javascript:, <script>, atribut onerror, dokumen 1,1 MiB, dan cms_snapshot dari klien,
  ketika disimpan atau diterbitkan, maka semuanya ditolak atau di-escape dan tidak pernah dieksekusi di website.
Test case: TC-EDT-001, 002, 003, 005, 006, 012

### Tonggak M3 — Terbit dan tayang

#### S-01-US07 Menerbitkan dengan aman  (FR-PUB-001, 002, 003, 010, Must)
Sebagai pemilik, saya ingin menekan Terbitkan dan yakin website lama tetap tayang bila ada masalah.
Kriteria terima:
- AC-PUB-01: Diberikan draf tersimpan, ketika Terbitkan ditekan, maka perubahan tayang ≤ 60 detik dari release baru
  ber-object_prefix unik, dan release sebelumnya tetap di riwayat 20 terakhir.
- AC-PUB-02: Diberikan revisi tanpa beranda, aset milik site lain, atau tautan navigasi rusak, ketika diterbitkan,
  maka E-PUBLISH-INVALID berisi daftar lokasi masalah dan tidak ada release dibuat.
- AC-PUB-03: Diberikan galat buatan di langkah build, validasi, dan aktivasi, ketika terbit berjalan, maka release
  failed, active_release_id tidak berubah, dan pelanggan melihat "Terbit gagal, versi sebelumnya tetap tayang".
- AC-PUB-09: Diberikan teks unik di draf yang belum terbit, ketika host publik, cache, dan sitemap dicari, maka teks
  itu tidak ditemukan; pratinjau membawa Cache-Control private, no-store dan X-Robots-Tag noindex.
Test case: TC-PUB-001, 002, 003, 009

#### S-01-US08 Website tayang dari release aktif  (FR-PUB-007, Must)
Sebagai pengunjung website pelanggan, saya ingin halaman cepat terbuka dari alamat yang benar.
Kriteria terima:
- AC-PUB-06: Diberikan host tak dikenal, host bukan kanonik, dan host kanonik, ketika diminta ke Worker Sites, maka
  berturut-turut 404 umum, 301, dan halaman dari release aktif dengan kunci cache memuat site_id dan release_id.
- NFR-01/NFR-27: release statis; LCP ≤ 2,5 dtk dan JS ≤ 50 KB (Standar) / 120 KB (Premium) pada template S-01.
Test case: TC-PUB-006, TC-NFR-001, TC-NFR-020

### Tonggak M4 — Lead masuk CRM

#### S-01-US09 Formulir kontak yang aman  (FR-LEAD-002, 003, 004, 006, Must)
Sebagai pengunjung, saya ingin mengirim pesan ke usaha ini lewat formulir, dan data saya diperlakukan dengan benar.
Kriteria terima:
- AC-LEAD-02: Diberikan formulir tanpa email dan telepon, tanpa persetujuan, atau pesan 1.001 karakter, ketika dikirim,
  maka ditolak per kolom dan isian tetap utuh.
- AC-LEAD-03: Diberikan honeypot terisi, token Turnstile gagal, kiriman ke-6 per IP per jam, kiriman ke-101 per hari,
  request_key ganda, dan public_token dari host lain, ketika dikirim, maka berturut-turut 202 umum tanpa lead,
  E-BOT-CHECK, 429, 429, satu lead saja, dan ditolak.
- AC-LEAD-04: Diberikan kiriman sah, ketika disimpan, maka tenant dan site berasal dari hostname, ip_hash bergaram
  tersimpan, dan pencarian IP mentah di database tidak menemukan apa pun.
- AC-LEAD-06: Diberikan lead baru, ketika dibaca dari database, maka versi legal_documents form_consent dan waktu centang tercatat.
Test case: TC-LEAD-002, 003, 004, 006
Data pribadi: nama, WhatsApp/telepon/email, pesan, ip_hash · persetujuan: kotak centang wajib (versi dokumen tercatat) ·
masa simpan: selama website + sampai H+30 (FRD 7.5) · hak hapus: hapus per lead (FR-LEAD-009, S-03)

#### S-01-US10 Lead muncul di kotak masuk CRM  (FR-LEAD-010, FR-CRM-001, FR-CRM-002, Must)
Sebagai pemilik, saya ingin setiap pesan masuk ke kotak masuk sebagai kontak yang rapi, tanpa duplikat.
Kriteria terima:
- AC-LEAD-10: Diberikan dua kiriman formulir dari email yang sama dan satu dari email baru, ketika lead.created diproses,
  maka tercipta 2 kontak, kiriman kedua masuk linimasa kontak pertama, dan setiap kontak tanpa peluang terbuka mendapat
  peluang di tahapan Baru.
- AC-CRM-01: Diberikan 30 lead dari 3 sumber, ketika kotak masuk dibuka dan difilter sumber dan belum dibaca, maka
  hasil sesuai, hitungan lead baru tampil di menu, dan kotak masuk tetap terbuka saat website suspended.
- AC-CRM-02: Diberikan kontak dengan email Budi@Mail.com, ketika lead baru budi@mail.com dan kontak manual dengan telepon
  yang sama masuk, maka tetap satu kontak dengan 3 entri linimasa; kontak yang sama di website lain tetap terpisah.
Test case: TC-LEAD-010, TC-CRM-001, TC-CRM-002, TC-E2E-005 (sebagian)
Data pribadi: sama dengan US09; contacts/crm_activities ikut aturan retensi FRD 7.5

## Di luar cakupan (irisan lain)
- Checkout, Midtrans, invoice, refund (S-02) · email lead ke pemilik FR-LEAD-005 (S-03, butuh Resend)
- Login Google produksi dan pembatasan percobaan masuk FR-ACC-006 diuji ulang di staging (sudah ada di kode; verifikasi di F6)
- Pipeline, tugas, balas cepat, catatan CRM (S-03) · siklus langganan (S-04) · domain kustom (S-05)
- 8 template peluncuran, pustaka blok, SEO/LocalBusiness (S-06) · admin, onboarding, analitik (S-07)

## Ketergantungan
- Supabase staging `mangelek-staging` (ada) + kunci di `apps/platform/.env.local` (diisi Gab) + kata sandi database (Gab, sebelum F5 database).
- Cloudflare akun + Workers Paid saat deploy staging (F7, D-016).
- Skema dasar v5.x dari ERD kelompok A, B (sebagian), C, E, I (sebagian) — dirancang `architect` + `database` di F2.

## Gerbang G1
- [x] Setiap story ber-ID FR/NFR · [x] kriteria Diberikan–ketika–maka dari FRD apa adanya (varian S-01 ditandai)
- [x] Tanpa penanda PERLU KLARIFIKASI · [x] data pribadi tercatat untuk US02, US09, US10
