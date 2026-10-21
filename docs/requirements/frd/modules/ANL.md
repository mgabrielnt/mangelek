<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# ANL — Analitik

Fitur utama: Kunjungan tanpa cookie, klik WhatsApp/arah/peta, dashboard 7/30 hari per website

Ringkas: 5 kebutuhan (3 Must), 5 kriteria penerimaan, 5 test case.

## Kebutuhan fungsional

| ID | Fungsi | Aktor | Input | Proses | Output | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-ANL-001 | Merekam kunjungan tanpa cookie | SIS | Permintaan halaman di Worker Sites | Simpan analytics_events: site, release, path, host perujuk, jenis perangkat, negara; pengunjung unik diperkirakan dengan hash IP + user agent bergaram harian yang garamnya dibuang setiap hari | Tidak ada cookie atau IP mentah di website pelanggan | Must | FR-19 | UC-15 | AC-ANL-01 | TC-ANL-001 |
| FR-ANL-002 | Menampilkan analitik di dashboard | PEL | GET /v1/sites/{id}/analytics dengan rentang 7 atau 30 hari | Hitung kunjungan, perkiraan pengunjung unik, halaman dan sumber teratas, perangkat, jumlah lead, klik WhatsApp, Petunjuk Arah, dan buka peta; definisi tiap angka tampil | Angka dashboard = jumlah peristiwa uji untuk website terpilih | Must | FR-19 | UC-15 | AC-ANL-02 | TC-ANL-002 |
| FR-ANL-003 | Mengecualikan bot | SIS | User agent | Daftar pola bot dan penanda bot terverifikasi bila tersedia | Kunjungan crawler uji tidak terhitung | Should | FR-19 | UC-15 | AC-ANL-03 | TC-ANL-003 |
| FR-ANL-004 | Mengagregasi analitik harian | SIS | analytics_events | Penjadwal harian menulis analytics_daily per site dan tanggal; idempoten | Dashboard dan laporan bulanan membaca agregat | Must | FR-19 | UC-15 | AC-ANL-04 | TC-ANL-004 |
| FR-ANL-005 | Menerima masukan pelanggan | PEL | Nilai 1–5 + teks ≤ 1.000 | Dikirim sebagai email ke admin; tidak disimpan di database | Konfirmasi terkirim | Could | BRD 7.3 | UC-15 | AC-ANL-05 | TC-ANL-005 |

## Kriteria penerimaan

| ID | Kriteria penerimaan | Kebutuhan | Prioritas | Test case |
| --- | --- | --- | --- | --- |
| AC-ANL-01 | Diberikan website pelanggan, ketika dibuka di browser bersih, maka tidak ada cookie, tidak ada permintaan ke domain Google sebelum peta diklik, analytics\_events tanpa IP mentah, dan garam harian berganti setiap hari. | ANL-001, LGL-006 | Must | TC-ANL-001 |
| AC-ANL-02 | Diberikan 120 kunjungan, 4 lead, dan klik WhatsApp, Petunjuk Arah, dan peta buatan, ketika dashboard 7 dan 30 hari dibuka untuk website terpilih, maka angka sama dengan jumlah peristiwa uji dan definisi tiap angka tampil. | ANL-002 | Must | TC-ANL-002 |
| AC-ANL-03 | Diberikan user agent crawler uji, ketika halaman diminta, maka kunjungan tidak dihitung. | ANL-003 | Should | TC-ANL-003 |
| AC-ANL-04 | Diberikan agregasi harian, ketika dijalankan dua kali untuk tanggal yang sama, maka analytics\_daily menghasilkan angka sama tanpa duplikat. | ANL-004 | Must | TC-ANL-004 |
| AC-ANL-05 | Diberikan masukan nilai 1–5 dan teks ≤ 1.000, ketika dikirim, maka admin menerima email dan tidak ada baris tersimpan. | ANL-005 | Could | TC-ANL-005 |

## Test case

| ID | Kelompok | Judul / memverifikasi | Kebutuhan dicakup | Prioritas | Wajib G1 | Level | Lingkungan | Data uji | Langkah kunci | Lulus bila | Otomasi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-ANL-001 | ANL — Analitik | Merekam kunjungan tanpa cookie | ANL-001, LGL-006 | Must | Ya | Keamanan | Staging + jam simulasi | Browser bersih | Buka 3 halaman; periksa cookie; majukan jam 1 hari | AC-ANL-01 terpenuhi: Diberikan website pelanggan, ketika dibuka di browser bersih, maka tidak ada cookie, tidak ada permintaan ke domain Google sebelum peta diklik, analytics_events tanpa IP mentah, dan garam harian berganti setiap hari. | Otomatis |
| TC-ANL-002 | ANL — Analitik | Menampilkan analitik di dashboard | ANL-002 | Must | Ya | Integrasi | Staging | Data analitik buatan | Seed peristiwa; jalankan agregasi; buka dashboard | AC-ANL-02 terpenuhi: Diberikan 120 kunjungan, 4 lead, dan klik WhatsApp, Petunjuk Arah, dan peta buatan, ketika dashboard 7 dan 30 hari dibuka untuk website terpilih, maka angka sama dengan jumlah peristiwa uji dan definisi tiap angka tampil. | Otomatis |
| TC-ANL-003 | ANL — Analitik | Mengecualikan bot | ANL-003 | Should | Tidak | Integrasi | Staging | UA bot | curl dengan UA bot | AC-ANL-03 terpenuhi: Diberikan user agent crawler uji, ketika halaman diminta, maka kunjungan tidak dihitung. | Otomatis |
| TC-ANL-004 | ANL — Analitik | Mengagregasi analitik harian | ANL-004 | Must | Ya | Integrasi | CI | 1 hari data | Jalankan pekerjaan 2 kali | AC-ANL-04 terpenuhi: Diberikan agregasi harian, ketika dijalankan dua kali untuk tanggal yang sama, maka analytics_daily menghasilkan angka sama tanpa duplikat. | Otomatis |
| TC-ANL-005 | ANL — Analitik | Menerima masukan pelanggan | ANL-005 | Could | Tidak | E2E | Staging | Masukan uji | Kirim formulir masukan | AC-ANL-05 terpenuhi: Diberikan masukan nilai 1–5 dan teks ≤ 1.000, ketika dikirim, maka admin menerima email dan tidak ada baris tersimpan. | Otomatis |
