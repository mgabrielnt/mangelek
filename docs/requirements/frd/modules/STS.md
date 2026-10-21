<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# STS — Halaman status

Fitur utama: Halaman publik terpisah, insiden, pemantau otomatis, langganan pembaruan

Ringkas: 4 kebutuhan (2 Must), 4 kriteria penerimaan, 4 test case.

## Kebutuhan fungsional

| ID | Fungsi | Aktor | Input | Proses | Output | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-STS-001 | Menampilkan halaman status publik | PEN, PEL | Berkas status JSON di penyimpanan statis terpisah | Komponen: Website pelanggan, Dashboard dan editor, Pembayaran, Domain, Email; status Normal, Gangguan sebagian, Gangguan besar, Pemeliharaan; riwayat insiden 90 hari | Halaman tetap terbuka walau platform mati | Must | FR-37, NFR-30 | UC-26 | AC-STS-01 | TC-NFR-024; TC-STS-001 |
| FR-STS-002 | Memperbarui insiden | ADM Operasional, Pemilik | Judul, komponen, dampak, pesan, status | Buat dan perbarui insiden; tiap pembaruan menerbitkan ulang berkas status ≤ 1 menit; insiden selesai tetap di riwayat | Pelanggan melihat pembaruan resmi | Must | FR-37 | UC-26 | AC-STS-02 | TC-STS-002 |
| FR-STS-003 | Memperbarui status otomatis dari pemantau | SIS | Pemeriksaan uptime tiap 5 menit oleh Cloudflare Worker Cron (gratis) | 3 kegagalan berturut-turut → komponen “Gangguan sebagian” dan peringatan admin; pulih 3 kali → kembali normal bila tidak ada insiden manual | Gangguan terlihat walau admin belum sempat menulis | Should | FR-37 | UC-26 | AC-STS-03 | TC-STS-003 |
| FR-STS-004 | Berlangganan pembaruan status | PEL | Email | Kirim pembaruan insiden ke pelanggan yang berlangganan; berhenti sekali klik | Pelanggan tahu saat gangguan selesai | Could | FR-37 | UC-26 | AC-STS-04 | TC-STS-004 |

## Kriteria penerimaan

| ID | Kriteria penerimaan | Kebutuhan | Prioritas | Test case |
| --- | --- | --- | --- | --- |
| AC-STS-01 | Diberikan platform staging dimatikan, ketika status.mangelek.com dibuka, maka halaman tetap tampil dengan 5 komponen dan riwayat 90 hari. | STS-001 | Must | TC-STS-001 |
| AC-STS-02 | Diberikan insiden baru dari admin Operasional, ketika disimpan, maka halaman status menampilkannya ≤ 1 menit dan insiden selesai tetap ada di riwayat. | STS-002 | Must | TC-STS-002 |
| AC-STS-03 | Diberikan 3 pemeriksaan gagal berturut-turut, ketika pemantau berjalan, maka komponen menjadi Gangguan sebagian dan admin menerima peringatan; 3 pemeriksaan sukses memulihkan. | STS-003 | Should | TC-STS-003 |
| AC-STS-04 | Diberikan pelanggan berlangganan status, ketika insiden diperbarui, maka email terkirim dan tautan berhenti bekerja sekali klik. | STS-004 | Could | TC-STS-004 |

## Test case

| ID | Kelompok | Judul / memverifikasi | Kebutuhan dicakup | Prioritas | Wajib G1 | Level | Lingkungan | Data uji | Langkah kunci | Lulus bila | Otomasi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-STS-001 | STS — Halaman status | Menampilkan halaman status publik | STS-001 | Must | Ya | E2E | Staging | Staging | Matikan platform; buka halaman status | AC-STS-01 terpenuhi: Diberikan platform staging dimatikan, ketika status.mangelek.com dibuka, maka halaman tetap tampil dengan 5 komponen dan riwayat 90 hari. | Otomatis |
| TC-STS-002 | STS — Halaman status | Memperbarui insiden | STS-002 | Must | Ya | E2E | Staging | Insiden uji | Buat, perbarui, selesaikan | AC-STS-02 terpenuhi: Diberikan insiden baru dari admin Operasional, ketika disimpan, maka halaman status menampilkannya ≤ 1 menit dan insiden selesai tetap ada di riwayat. | Otomatis |
| TC-STS-003 | STS — Halaman status | Memperbarui status otomatis dari pemantau | STS-003 | Should | Tidak | Integrasi | Staging | Pemantau uji | Simulasikan kegagalan | AC-STS-03 terpenuhi: Diberikan 3 pemeriksaan gagal berturut-turut, ketika pemantau berjalan, maka komponen menjadi Gangguan sebagian dan admin menerima peringatan; 3 pemeriksaan sukses memulihkan. | Otomatis |
| TC-STS-004 | STS — Halaman status | Berlangganan pembaruan status | STS-004 | Could | Tidak | Integrasi | Staging | Email uji | Berlangganan; perbarui insiden | AC-STS-04 terpenuhi: Diberikan pelanggan berlangganan status, ketika insiden diperbarui, maka email terkirim dan tautan berhenti bekerja sekali klik. | Otomatis |
