<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# TIER — Tingkat dan kursi Eksklusif

Fitur utama: Katalog 3 tingkat, kecocokan template–tingkat, sisa kursi, tahan dan lepas kursi, fitur per tingkat

Ringkas: 7 kebutuhan (6 Must), 7 kriteria penerimaan, 7 test case.

## Kebutuhan fungsional

| ID | Fungsi | Aktor | Input | Proses | Output | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-TIER-001 | Menyimpan katalog tingkat | SIS, ADM | plans standar, premium, eksklusif dengan features jsonb dan plan_prices 1 dan 12 bulan | Seed M-01; fitur per tingkat (paket animasi, dukungan prioritas, konsultasi onboarding) dibaca dari data, bukan konstanta kode | GET /v1/plans mengembalikan 3 tingkat dengan harga berlaku | Must | FR-31, BRU-02 | UC-01, UC-19 | AC-TIER-01 | TC-TIER-001 |
| FR-TIER-002 | Mencocokkan template dengan tingkat | SIS | template_versions.tier, plan_price_id | Tingkat plan_price harus sama dengan tingkat template saat order dan saat perubahan terjadwal | Ketidakcocokan ditolak E-TIER-MISMATCH (422) | Must | FR-31 | UC-19 | AC-TIER-02 | TC-TIER-002 |
| FR-TIER-003 | Menampilkan sisa kursi Eksklusif | PEN | Template Eksklusif; kota (opsional) | Sisa = 10 − kursi held/reserved/active; bila kota diisi, cek juga kategori + kota | “Sisa 7 dari 10 kursi”; “Sudah dipakai usaha sejenis di Pekanbaru” bila tidak tersedia | Must | BRU-18 | UC-19 | AC-TIER-03 | TC-TIER-003 |
| FR-TIER-004 | Menahan kursi saat checkout | SIS | POST /v1/seat-holds: template_version_id, kategori, kota | Kunci baris template; tolak bila kursi aktif + ditahan ≥ 10 atau ada kursi kategori + kota yang sama; buat template_seats held dengan hold_expires_at = sekarang + 30 menit; satu tahanan aktif per tenant | seat_hold_id, atau E-SEAT-UNAVAILABLE (409) | Must | BRU-18 | UC-19, UC-21 | AC-TIER-04 | TC-PAY-112; TC-TIER-004 |
| FR-TIER-005 | Mengonfirmasi dan melepas kursi | SIS | order.paid, order kedaluwarsa, tahanan lewat waktu, purge website, perubahan tingkat berlaku | Lunas → active dan terikat site_id; kedaluwarsa/tahanan lewat → released; purge (SUB-008) atau turun tingkat (SUB-013) → released; idempoten | Jumlah kursi selalu sama dengan website Eksklusif aktif + tahanan berlaku | Must | BRU-18 | UC-19, UC-21 | AC-TIER-05 | TC-PAY-112; TC-TIER-005 |
| FR-TIER-006 | Menerapkan fitur per tingkat | SIS | order_lines.quota_snapshot dan plans.features saat order | Salin ke periode; renderer memuat paket animasi tingkat; dashboard menampilkan kanal dukungan prioritas dan jadwal konsultasi untuk Eksklusif | Fitur sesuai tingkat yang dibayar | Must | FR-31 | UC-19 | AC-TIER-06 | TC-TIER-006 |
| FR-TIER-007 | Menerima daftar tunggu kursi Eksklusif | PEN | Email, kota, kategori | Simpan di waitlist_entries dengan template; email saat template Eksklusif baru dirilis | Calon pelanggan tidak hilang saat kursi penuh | Could | BRU-18 | UC-19 | AC-TIER-07 | TC-TIER-007 |

## Kriteria penerimaan

| ID | Kriteria penerimaan | Kebutuhan | Prioritas | Test case |
| --- | --- | --- | --- | --- |
| AC-TIER-01 | Diberikan seed M-01, ketika GET /v1/plans dipanggil, maka 3 tingkat dengan harga bulanan dan tahunan berlaku dan features tampil, tanpa nilai tertanam di kode. | TIER-001 | Must | TC-TIER-001 |
| AC-TIER-02 | Diberikan template Premium, ketika order atau perubahan terjadwal memakai plan\_price Standar, maka ditolak E-TIER-MISMATCH di API dan di service. | TIER-002 | Must | TC-TIER-002 |
| AC-TIER-03 | Diberikan template Eksklusif dengan 3 kursi aktif dan 1 ditahan, ketika galeri dibuka, maka “Sisa 6 dari 10 kursi” tampil; dengan kota yang sudah punya kategori sama, pesan tidak tersedia tampil. | TIER-003 | Must | TC-TIER-003 |
| AC-TIER-04 | Diberikan 9 kursi terpakai, ketika 3 tenant menahan kursi bersamaan, maka tepat 1 berhasil dan 2 menerima E-SEAT-UNAVAILABLE; kategori + kota yang sama ditolak; tahanan habis setelah 30 menit. | TIER-004 | Must | TC-TIER-004 |
| AC-TIER-05 | Diberikan kursi ditahan, ketika order lunas, kedaluwarsa, website dipurge, atau turun tingkat berlaku, maka kursi berturut-turut active, released, released, released dan jumlah kursi = website Eksklusif aktif + tahanan berlaku. | TIER-005 | Must | TC-TIER-005 |
| AC-TIER-06 | Diberikan website Standar dan Eksklusif, ketika diterbitkan dan dashboard dibuka, maka paket animasi dan kanal dukungan sesuai features tingkat masing-masing. | TIER-006 | Must | TC-TIER-006 |
| AC-TIER-07 | Diberikan template Eksklusif penuh, ketika pengunjung mendaftar daftar tunggu, maka entri tersimpan dengan template dan email terkirim saat template Eksklusif baru dirilis. | TIER-007 | Could | TC-TIER-007 |

## Test case

| ID | Kelompok | Judul / memverifikasi | Kebutuhan dicakup | Prioritas | Wajib G1 | Level | Lingkungan | Data uji | Langkah kunci | Lulus bila | Otomasi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-TIER-001 | TIER — Tingkat dan kursi Eksklusif | Menyimpan katalog tingkat | TIER-001 | Must | Ya | Kontrak | CI | Seed harga | Panggil API; validasi skema | AC-TIER-01 terpenuhi: Diberikan seed M-01, ketika GET /v1/plans dipanggil, maka 3 tingkat dengan harga bulanan dan tahunan berlaku dan features tampil, tanpa nilai tertanam di kode. | Otomatis |
| TC-TIER-002 | TIER — Tingkat dan kursi Eksklusif | Mencocokkan template dengan tingkat | TIER-002 | Must | Ya | Integrasi | CI | Template Premium | POST order dan scheduled-change dengan tingkat salah | AC-TIER-02 terpenuhi: Diberikan template Premium, ketika order atau perubahan terjadwal memakai plan_price Standar, maka ditolak E-TIER-MISMATCH di API dan di service. | Otomatis |
| TC-TIER-003 | TIER — Tingkat dan kursi Eksklusif | Menampilkan sisa kursi Eksklusif | TIER-003 | Must | Ya | E2E | Staging | Seed kursi | Buka galeri; isi kota | AC-TIER-03 terpenuhi: Diberikan template Eksklusif dengan 3 kursi aktif dan 1 ditahan, ketika galeri dibuka, maka “Sisa 6 dari 10 kursi” tampil; dengan kota yang sudah punya kategori sama, pesan tidak tersedia tampil. | Otomatis |
| TC-TIER-004 | TIER — Tingkat dan kursi Eksklusif | Menahan kursi saat checkout | TIER-004 | Must | Ya | Integrasi | Staging + jam simulasi | Template dengan 9 kursi | Panggil paralel; majukan jam 31 menit | AC-TIER-04 terpenuhi: Diberikan 9 kursi terpakai, ketika 3 tenant menahan kursi bersamaan, maka tepat 1 berhasil dan 2 menerima E-SEAT-UNAVAILABLE; kategori + kota yang sama ditolak; tahanan habis setelah 30 menit. | Otomatis |
| TC-TIER-005 | TIER — Tingkat dan kursi Eksklusif | Mengonfirmasi dan melepas kursi | TIER-005 | Must | Ya | Integrasi | Staging + jam simulasi | 4 skenario | Jalankan tiap skenario; hitung kursi | AC-TIER-05 terpenuhi: Diberikan kursi ditahan, ketika order lunas, kedaluwarsa, website dipurge, atau turun tingkat berlaku, maka kursi berturut-turut active, released, released, released dan jumlah kursi = website Eksklusif aktif + tahanan berlaku. | Otomatis |
| TC-TIER-006 | TIER — Tingkat dan kursi Eksklusif | Menerapkan fitur per tingkat | TIER-006 | Must | Ya | E2E | Staging | 2 site | Bandingkan render dan dashboard | AC-TIER-06 terpenuhi: Diberikan website Standar dan Eksklusif, ketika diterbitkan dan dashboard dibuka, maka paket animasi dan kanal dukungan sesuai features tingkat masing-masing. | Otomatis |
| TC-TIER-007 | TIER — Tingkat dan kursi Eksklusif | Menerima daftar tunggu kursi Eksklusif | TIER-007 | Could | Tidak | Integrasi | Staging | Template penuh | Daftar; rilis template baru | AC-TIER-07 terpenuhi: Diberikan template Eksklusif penuh, ketika pengunjung mendaftar daftar tunggu, maka entri tersimpan dengan template dan email terkirim saat template Eksklusif baru dirilis. | Otomatis |
