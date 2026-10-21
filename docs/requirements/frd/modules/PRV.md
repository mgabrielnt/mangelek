<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# PRV — Provisioning website

Fitur utama: Buat site per order, slug, revisi 1, release 1, idempoten, ulang otomatis

Ringkas: 7 kebutuhan (7 Must), 5 kriteria penerimaan, 5 test case.

## Kebutuhan fungsional

| ID | Fungsi | Aktor | Input | Proses | Output | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-PRV-001 | Membuat website saat order pembuatan website lunas | SIS | order.paid untuk order initial (website pertama atau tambahan) | Pekerjaan site.provision berkunci order_line_id; buat sites (provisioning) dengan template_version_id, kategori, dan kota dari order; site_settings (zona waktu Asia/Jakarta, email lead = email pemilik); hubungkan subscriptions.site_id | Baris site milik tenant | Must | FR-07, FR-30 | UC-04, UC-19, UC-20 | AC-PRV-01 | TC-PRV-001 |
| FR-PRV-002 | Membuat alamat subdomain | SIS | Nama usaha | Transliterasi ke ASCII, huruf kecil, selain a–z/0–9 jadi tanda hubung, 3–40 karakter (V-05); tolak kata cadangan; bentrok diberi akhiran -2, -3; slug tidak bisa diubah pelanggan (RB-09) | sites.slug; binding bawaan <slug>.mangelek.com (domain_id kosong, connected, kanonik sampai ada domain) | Must | FR-07 | UC-04 | AC-PRV-02 | TC-PRV-002 |
| FR-PRV-003 | Membuat revisi pertama | SIS | template_versions.manifest (halaman, blok, isi demo), palette_id, font_pack_id, nama usaha | Susun Document v2; validasi skema; simpan site_revisions nomor 1; buat koleksi CMS bawaan sesuai template beserta item contoh; buat 5 baris onboarding_steps | Draf revisi 1 yang valid | Must | FR-07 | UC-04 | AC-PRV-01 | TC-PRV-001 |
| FR-PRV-004 | Menayangkan release pertama | SIS | Revisi 1 | Jalankan alur PUB-001 dengan aktor sistem; aktifkan dengan CAS; site → published; outbox site.published | Website tayang di subdomain ≤ 5 menit sejak paid_at; email “Website Anda sudah tayang” | Must | FR-07, BO-08 | UC-04 | AC-PRV-01 | TC-PRV-001 |
| FR-PRV-005 | Menjamin satu website per order | SIS | Pekerjaan yang diulang atau terduplikasi | UNIQUE sites.origin_order_line_id; pengulangan memakai site, revisi 1, dan release yang sudah ada | 3 kali eksekusi → 1 site, 1 revisi 1, 1 release aktif | Must | BRU-01, NFR-06 | UC-04 | AC-ACC-11; AC-PRV-03 | TC-ACC-011; TC-PRV-003 |
| FR-PRV-006 | Mengulang provisioning yang gagal | SIS | Galat langkah mana pun | Ulang 3 kali dengan jeda 1, 5, 15 menit; lease 5 menit untuk worker yang mati; setelah habis → failed_review | Peringatan admin ≤ 15 menit; satu email pelanggan “Website sedang kami siapkan” | Must | NFR-05 | UC-04 | AC-PRV-04 | TC-PRV-004 |
| FR-PRV-007 | Menerapkan kuota paket | SIS | order_lines.quota_snapshot | Salin ke subscription_periods.quota_snapshot; semua pemeriksaan batas membaca snapshot periode berjalan (nilai di RB-07) | Batas berasal dari data, bukan konstanta kode | Must | BRU-11, BRU-12 | UC-04 | AC-PRV-05 | TC-PRV-005 |

## Kriteria penerimaan

| ID | Kriteria penerimaan | Kebutuhan | Prioritas | Test case |
| --- | --- | --- | --- | --- |
| AC-PRV-01 | Diberikan pembayaran sandbox lunas untuk order pertama, ketika diulang 10 kali berturut-turut, maka setiap kali website tayang di subdomain ≤ 5 menit sejak paid\_at tanpa tindakan manual (D-01). | PRV-001, PRV-003, PRV-004 | Must | TC-PRV-001 |
| AC-PRV-02 | Diberikan nama usaha “Kopi Kenangan Senja!”, “Admin”, dan nama yang bentrok, ketika slug dibuat, maka hasilnya kopi-kenangan-senja, slug cadangan usaha-xxxxxx, dan akhiran -2. | PRV-002 | Must | TC-PRV-002 |
| AC-PRV-03 | Diberikan pekerjaan site.provision diantrekan 3 kali untuk order\_line yang sama, ketika semua selesai, maka tercipta 1 site dengan origin\_order\_line\_id itu, 1 revisi nomor 1, dan 1 release aktif; order website kedua milik tenant yang sama membuat site terpisah. | PRV-005 | Must | TC-PRV-003 |
| AC-PRV-04 | Diberikan galat di langkah build, ketika provisioning dijalankan, maka diulang pada 1, 5, dan 15 menit; worker yang mati diambil alih setelah lease 5 menit; setelah habis, failed\_review tampil di panel admin ≤ 15 menit dan pelanggan menerima satu email. | PRV-006 | Must | TC-PRV-004 |
| AC-PRV-05 | Diberikan perubahan plans.quotas setelah order dibayar, ketika batas diperiksa di periode berjalan, maka nilai dari subscription\_periods.quota\_snapshot yang dipakai. | PRV-007 | Must | TC-PRV-005 |

## Test case

| ID | Kelompok | Judul / memverifikasi | Kebutuhan dicakup | Prioritas | Wajib G1 | Level | Lingkungan | Data uji | Langkah kunci | Lulus bila | Otomasi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-PRV-001 | PRV — Provisioning website | Membuat website saat order pembuatan website lunas | PRV-001, PRV-003, PRV-004 | Must | Ya | E2E | Staging | 10 akun uji | Skrip E2E bayar sandbox; ukur paid_at ke release aktif | AC-PRV-01 terpenuhi: Diberikan pembayaran sandbox lunas untuk order pertama, ketika diulang 10 kali berturut-turut, maka setiap kali website tayang di subdomain ≤ 5 menit sejak paid_at tanpa tindakan manual (D-01). | Otomatis |
| TC-PRV-002 | PRV — Provisioning website | Membuat alamat subdomain | PRV-002 | Must | Ya | Unit | CI | Tabel nama usaha | Uji tabel fungsi slug | AC-PRV-02 terpenuhi: Diberikan nama usaha “Kopi Kenangan Senja!”, “Admin”, dan nama yang bentrok, ketika slug dibuat, maka hasilnya kopi-kenangan-senja, slug cadangan usaha-xxxxxx, dan akhiran -2. | Otomatis |
| TC-PRV-003 | PRV — Provisioning website | Menjamin satu website per order | PRV-005 | Must | Ya | Integrasi | Staging | Duplikasi pesan | Kirim pesan antrean 3 kali; hitung baris | AC-PRV-03 terpenuhi: Diberikan pekerjaan site.provision diantrekan 3 kali untuk order_line yang sama, ketika semua selesai, maka tercipta 1 site dengan origin_order_line_id itu, 1 revisi nomor 1, dan 1 release aktif; order website kedua milik tenant yang sama membuat site terpisah. | Otomatis |
| TC-PRV-004 | PRV — Provisioning website | Mengulang provisioning yang gagal | PRV-006 | Must | Ya | Integrasi | Staging | Galat buatan | Suntik galat; matikan worker; pantau job_runs dan email | AC-PRV-04 terpenuhi: Diberikan galat di langkah build, ketika provisioning dijalankan, maka diulang pada 1, 5, dan 15 menit; worker yang mati diambil alih setelah lease 5 menit; setelah habis, failed_review tampil di panel admin ≤ 15 menit dan pelanggan menerima satu email. | Otomatis |
| TC-PRV-005 | PRV — Provisioning website | Menerapkan kuota paket | PRV-007 | Must | Ya | Unit | CI | Kuota diubah | Ubah kuota paket; jalankan pemeriksaan batas | AC-PRV-05 terpenuhi: Diberikan perubahan plans.quotas setelah order dibayar, ketika batas diperiksa di periode berjalan, maka nilai dari subscription_periods.quota_snapshot yang dipakai. | Otomatis |
