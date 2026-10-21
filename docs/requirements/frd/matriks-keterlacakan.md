<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

Matriks keterlacakan FR → BRD → UC → AC → TC (245 FR)

Status uji dihitung otomatis dari sheet Katalog Test Case: Gagal bila ada TC gagal; Lulus bila semua TC per fitur (TC-<MODUL>-0nn) lulus; Ditunda untuk Won't.

| FR | Fungsi | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case | Jumlah TC per fitur | TC lulus | TC gagal | Status uji |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-MKT-001 | Menampilkan halaman publik | Must | FR-01 | UC-01 | AC-MKT-01 | TC-MIG-006; TC-MKT-001 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-002 | Menampilkan harga tiga tingkat dari katalog | Must | FR-01, BRU-02 | UC-01 | AC-MKT-02 | TC-MIG-001; TC-MKT-002 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-003 | Menampilkan galeri template per kategori dan tingkat | Must | FR-01, FR-21, FR-31 | UC-01 | AC-MKT-03 | TC-MIG-004; TC-MKT-003 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-004 | Mempratinjau template | Must | FR-02 | UC-01 | AC-MKT-04 | TC-MKT-004 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-005 | Membawa pilihan desain dan tingkat ke checkout | Must | FR-02, FR-31 | UC-01 | AC-MKT-05 | TC-MKT-005 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-006 | Mencari domain tanpa login | Should | BRD 12.3 | UC-01 | AC-MKT-06 | TC-MKT-006 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-007 | Menampilkan blog panduan | Must | BRD 6.1 | UC-01 | AC-MKT-07 | TC-MKT-007 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-008 | Menerima daftar tunggu | Should | BRD 12.6 | UC-01 | AC-MKT-08 | TC-MIG-007; TC-MKT-008 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-009 | Merekam atribusi pendaftar | Must | BO-06, BO-12, A-07 | UC-01, UC-02 | AC-MKT-09 | TC-MKT-009 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-010 | Merilis 8 template peluncuran | Must | FR-21, D-11 | UC-01 | AC-MKT-10 | TC-MIG-004; TC-MKT-010 | 1 | 0 | 0 | Belum diuji |
| FR-MKT-011 | Menampilkan perbandingan tingkat | Must | FR-01, FR-31 | UC-01, UC-19 | AC-MKT-11 | TC-MKT-011 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-001 | Mendaftar dengan email | Must | FR-05 | UC-02 | AC-ACC-01 | TC-ACC-001 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-002 | Masuk atau mendaftar dengan Google | Must | FR-05 | UC-02 | AC-ACC-02 | TC-ACC-002 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-003 | Memverifikasi email | Must | FR-05 | UC-02 | AC-ACC-03 | TC-ACC-003 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-004 | Mengatur ulang kata sandi | Must | FR-05 | UC-02 | AC-ACC-04 | TC-ACC-004 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-005 | Menyiapkan tenant pemilik | Must | BRU-01 | UC-02 | AC-ACC-05 | TC-ACC-005 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-006 | Membatasi percobaan masuk | Must | NFR-07, NFR-09 | UC-02 | AC-ACC-06 | TC-ACC-006 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-007 | Mengelola sesi | Must | NFR-07 | UC-02 | AC-ACC-07 | TC-ACC-007 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-008 | Mengubah profil | Should | FR-05 | — | AC-ACC-08 | TC-ACC-008 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-009 | Mengubah email | Should | FR-05 | — | AC-ACC-09 | TC-ACC-009 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-010 | Menghapus akun | Should | NFR-14 | — | AC-ACC-10 | TC-ACC-010 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-011 | Menegakkan satu pemilik per akun | Must | BRU-01 | UC-02, UC-03 | AC-ACC-11 | TC-ACC-011 | 1 | 0 | 0 | Belum diuji |
| FR-ACC-012 | Akun staf pelanggan | Won't | FR-29 | — | — | — (Won’t) | 0 | 0 | 0 | Ditunda |
| FR-DOM-001 | Memvalidasi nama domain | Must | FR-03 | UC-03 | AC-DOM-01 | TC-DOM-001 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-002 | Memeriksa ketersediaan dan harga | Must | FR-03 | UC-03 | AC-DOM-02 | TC-DOM-002 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-003 | Membuat quote harga terkunci | Must | BRU-15 | UC-03 | AC-DOM-03 | TC-DOM-003 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-004 | Menyarankan nama lain | Should | FR-03 | UC-03 | AC-DOM-04 | TC-DOM-004 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-005 | Memilih jenis alamat di checkout | Must | FR-04, BRU-16 | UC-03 | AC-DOM-05 | TC-DOM-005 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-006 | Mencatat pelanggan sebagai registran | Must | BRU-08 | UC-03 | AC-DOM-06 | TC-DOM-006 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-007 | Mendaftarkan domain setelah lunas | Must | FR-08 | UC-04 | AC-DOM-07 | TC-DOM-007 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-008 | Menghubungkan domain terkelola ke website | Must | FR-08, NFR-02 | UC-04 | AC-DOM-08 | TC-DOM-008 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-009 | Menangani registrasi gagal | Must | R-05, BRU-10 | UC-04 | AC-DOM-09 | TC-DOM-009 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-010 | Menghubungkan domain sendiri | Must | FR-04 | UC-09 | AC-DOM-10 | TC-DOM-010 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-011 | Memverifikasi domain sendiri berkala | Must | FR-04 | UC-09 | AC-DOM-11 | TC-DOM-011 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-012 | Menetapkan hostname kanonik | Must | BRU-16 | UC-09 | AC-DOM-12 | TC-DOM-012 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-013 | Melepas hostname | Should | BRU-16 | UC-09 | AC-DOM-13 | TC-DOM-013 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-014 | Menagih dan memperpanjang domain | Must | BRU-14 | UC-14 | AC-DOM-14 | TC-DOM-014 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-015 | Menangani domain kedaluwarsa | Must | BRU-14, BRU-16 | UC-14 | AC-DOM-15 | TC-DOM-015 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-016 | Memantau saldo deposit reseller | Must | BRD 9.4, R-05 | UC-04 | AC-DOM-16 | TC-DOM-016 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-017 | Membeli domain dari dashboard | Should | IA APP-DOM-010 | UC-03 | AC-DOM-17 | TC-DOM-017 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-018 | Meminta transfer keluar | Should | BRU-08 | — | AC-DOM-18 | TC-DOM-018 | 1 | 0 | 0 | Belum diuji |
| FR-DOM-019 | Transfer domain masuk | Won't | FR-26 | — | — | — (Won’t) | 0 | 0 | 0 | Ditunda |
| FR-PAY-001 | Menampilkan ringkasan checkout | Must | FR-03, BRD 10.2 | UC-03, UC-19 | AC-PAY-01 | TC-PAY-001 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-002 | Membuat pesanan | Must | FR-06, FR-31, BRU-02, BRU-15 | UC-03, UC-19 | AC-PAY-02 | TC-PAY-002, 110, 112 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-003 | Memeriksa syarat checkout | Must | FR-05, FR-06, FR-30 | UC-03 | AC-PAY-03 | TC-PAY-003 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-004 | Membuka pembayaran Snap | Must | FR-06 | UC-03, UC-14 | AC-PAY-04 | TC-PAY-004, 111 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-005 | Menampilkan status pembayaran | Must | BRU-03 | UC-03, UC-14 | AC-PAY-05 | TC-PAY-005, 102 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-006 | Menerima notifikasi Midtrans | Must | BRU-03, NFR-08 | UC-03, UC-04, UC-14 | AC-PAY-06 | TC-MIG-002; TC-PAY-006, 101, 106–107 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-007 | Mengonfirmasi status ke Midtrans | Must | BRU-03 | UC-03, UC-04, UC-14 | AC-PAY-07 | TC-PAY-007, 101, 108 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-008 | Menerapkan status secara idempoten | Must | NFR-06 | UC-03, UC-04, UC-14 | AC-PAY-08 | TC-ERR-003; TC-PAY-008, 101–102, 106, 113 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-009 | Menerbitkan peristiwa lunas | Must | NFR-05 | UC-03, UC-04, UC-14 | AC-PAY-09 | TC-PAY-009, 101 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-010 | Menutup pesanan yang kedaluwarsa atau gagal | Must | FR-06 | UC-03 | AC-PAY-10 | TC-PAY-010, 103–104 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-011 | Menampilkan invoice dan riwayat pembayaran | Must | FR-15 | UC-03 | AC-PAY-11 | TC-PAY-011, 109 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-012 | Melanjutkan pembayaran tertunda | Must | FR-06, FR-16 | UC-03, UC-12 | AC-PAY-12 | TC-PAY-012, 111 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-013 | Mencatat refund manual | Must | BRU-10, FR-27 | UC-17, UC-24 | AC-PAY-13 | TC-PAY-013, 105 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-014 | Merekonsiliasi harian | Should | R-08 | UC-17 | AC-PAY-14 | TC-PAY-014 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-015 | Mencatat refund atau chargeback dari Midtrans | Must | R-08 | UC-17 | AC-PAY-15 | TC-PAY-015, 105 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-016 | Menagih otomatis kartu dan GoPay | Should | FR-22 | UC-12 | AC-PAY-16 | TC-PAY-016 | 1 | 0 | 0 | Belum diuji |
| FR-PAY-017 | Refund otomatis | Won't | FR-27 | — | — | — (Won’t) | 0 | 0 | 0 | Ditunda |
| FR-PRV-001 | Membuat website saat order pembuatan website lunas | Must | FR-07, FR-30 | UC-04, UC-19, UC-20 | AC-PRV-01 | TC-PRV-001 | 1 | 0 | 0 | Belum diuji |
| FR-PRV-002 | Membuat alamat subdomain | Must | FR-07 | UC-04 | AC-PRV-02 | TC-PRV-002 | 1 | 0 | 0 | Belum diuji |
| FR-PRV-003 | Membuat revisi pertama | Must | FR-07 | UC-04 | AC-PRV-01 | TC-PRV-001 | 1 | 0 | 0 | Belum diuji |
| FR-PRV-004 | Menayangkan release pertama | Must | FR-07, BO-08 | UC-04 | AC-PRV-01 | TC-PRV-001 | 1 | 0 | 0 | Belum diuji |
| FR-PRV-005 | Menjamin satu website per order | Must | BRU-01, NFR-06 | UC-04 | AC-ACC-11; AC-PRV-03 | TC-ACC-011; TC-PRV-003 | 2 | 0 | 0 | Belum diuji |
| FR-PRV-006 | Mengulang provisioning yang gagal | Must | NFR-05 | UC-04 | AC-PRV-04 | TC-PRV-004 | 1 | 0 | 0 | Belum diuji |
| FR-PRV-007 | Menerapkan kuota paket | Must | BRU-11, BRU-12 | UC-04 | AC-PRV-05 | TC-PRV-005 | 1 | 0 | 0 | Belum diuji |
| FR-ONB-001 | Mengarahkan ke wizard | Must | FR-09 | UC-05 | AC-ONB-01 | TC-ONB-001 | 1 | 0 | 0 | Belum diuji |
| FR-ONB-002 | Menjalankan wizard 5 langkah | Must | FR-09 | UC-05 | AC-ONB-02 | TC-ONB-002 | 1 | 0 | 0 | Belum diuji |
| FR-ONB-003 | Menyimpan tiap langkah | Must | FR-09, BO-09 | UC-05 | AC-ONB-02 | TC-ONB-002 | 1 | 0 | 0 | Belum diuji |
| FR-ONB-004 | Mengisi data usaha ke website | Must | FR-09, FR-33 | UC-05 | AC-ONB-03 | TC-ONB-003 | 1 | 0 | 0 | Belum diuji |
| FR-ONB-005 | Menormalkan nomor WhatsApp | Must | FR-13 | UC-05 | AC-ONB-04 | TC-ONB-004 | 1 | 0 | 0 | Belum diuji |
| FR-ONB-006 | Menampilkan kelengkapan website | Should | BO-09, R-02 | UC-05 | AC-ONB-05 | TC-ONB-005 | 1 | 0 | 0 | Belum diuji |
| FR-ONB-007 | Menyediakan bantuan berkonteks | Must | BRD 6.1, BO-10 | UC-05 | AC-ONB-06 | TC-ONB-006 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-001 | Membuka editor | Must | FR-10 | UC-06 | AC-EDT-01 | TC-EDT-001; TC-MIG-003 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-002 | Mengubah isi blok | Must | FR-10 | UC-06 | AC-EDT-02 | TC-EDT-002 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-003 | Mengelola bagian halaman | Must | BRU-12, FR-34 | UC-06 | AC-EDT-03 | TC-EDT-003 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-004 | Mengelola halaman dan navigasi | Should | BRU-12 | UC-06 | AC-EDT-04 | TC-EDT-004 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-005 | Menyimpan draf otomatis | Must | FR-10, D-02 | UC-06 | AC-EDT-05 | TC-EDT-005; TC-MIG-005, 010 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-006 | Menangani konflik revisi | Must | FR-10 | UC-06 | AC-EDT-06 | TC-EDT-006 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-007 | Mengurungkan dan mengulang | Must | FR-10 | UC-06, UC-22 | AC-EDT-07 | TC-EDT-007 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-008 | Mengganti tampilan website | Must | FR-10 | UC-06 | AC-EDT-08 | TC-EDT-008 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-009 | Mengelola item Layanan dan Menu | Must | FR-10 | UC-06 | AC-EDT-09 | TC-EDT-009 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-010 | Mengelola artikel | Should | FR-10 | UC-06 | AC-EDT-10 | TC-EDT-010 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-011 | Mengatur SEO dasar | Must | FR-24 | UC-06 | AC-EDT-11 | TC-EDT-011 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-012 | Menyaring isi berbahaya | Must | NFR-07 | UC-06 | AC-EDT-12 | TC-EDT-012 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-013 | Mengunci editor sesuai status | Must | BRU-05 | UC-06 | AC-EDT-13 | TC-EDT-013 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-014 | Dapat dipakai di ponsel | Must | NFR-11 | UC-06 | AC-EDT-14 | TC-EDT-014 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-015 | Membuat pratinjau privat | Should | FR-10 | UC-06 | AC-EDT-15 | TC-EDT-015; TC-SEC-003 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-016 | Mengunduh dan memulihkan cadangan JSON | Could | FR-10 | UC-06 | AC-EDT-16 | TC-EDT-016 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-017 | Asisten AI dan penyimpanan tambahan berbayar | Won't | FR-28 | — | — | — (Won’t) | 0 | 0 | 0 | Ditunda |
| FR-EDT-018 | Mengubah isi dengan klik di pratinjau | Must | FR-10 | UC-22 | AC-EDT-18 | TC-EDT-018 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-019 | Menduplikat bagian | Must | FR-10 | UC-22 | AC-EDT-19 | TC-EDT-019 | 1 | 0 | 0 | Belum diuji |
| FR-EDT-020 | Membuat data terstruktur LocalBusiness | Must | FR-24, K-09 | UC-07 | AC-EDT-20 | TC-EDT-020 | 1 | 0 | 0 | Belum diuji |
| FR-MED-001 | Meminta izin unggah | Must | FR-12, BRU-11 | UC-05, UC-08 | AC-MED-01 | TC-MED-001 | 1 | 0 | 0 | Belum diuji |
| FR-MED-002 | Mengunggah file | Must | FR-12 | UC-05, UC-08 | AC-MED-01 | TC-MED-001 | 1 | 0 | 0 | Belum diuji |
| FR-MED-003 | Memverifikasi unggahan | Must | FR-12, NFR-07 | UC-05, UC-08 | AC-MED-02 | TC-MED-002 | 1 | 0 | 0 | Belum diuji |
| FR-MED-004 | Membuat varian gambar | Should | NFR-01 | UC-08 | AC-MED-03 | TC-MED-003 | 1 | 0 | 0 | Belum diuji |
| FR-MED-005 | Menampilkan pustaka media | Must | FR-12 | UC-08 | AC-MED-04 | TC-MED-004 | 1 | 0 | 0 | Belum diuji |
| FR-MED-006 | Menghapus media | Must | FR-12 | UC-08 | AC-MED-05 | TC-MED-005 | 1 | 0 | 0 | Belum diuji |
| FR-MED-007 | Mengingatkan teks alternatif | Should | NFR-13 | UC-07, UC-08 | AC-MED-06 | TC-MED-006 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-001 | Menerbitkan website | Must | FR-11, D-02 | UC-07 | AC-PUB-01, 11 | TC-PUB-001, 011 | 2 | 0 | 0 | Belum diuji |
| FR-PUB-002 | Memvalidasi sebelum terbit | Must | BRU-12 | UC-07 | AC-PUB-02 | TC-PUB-002 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-003 | Mempertahankan website saat build gagal | Must | NFR-04 | UC-07 | AC-PUB-03 | TC-PUB-003 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-004 | Menampilkan riwayat release | Must | FR-11 | UC-07 | AC-PUB-01 | TC-PUB-001 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-005 | Memulihkan release lama | Must | FR-11 | UC-07 | AC-PUB-04 | TC-PUB-004 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-006 | Menyalin release lama ke draf | Should | FR-11 | UC-07 | AC-PUB-05 | TC-PUB-005 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-007 | Menyajikan website di edge | Must | NFR-01, NFR-04 | UC-09 | AC-PUB-06 | TC-PUB-006 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-008 | Menyesuaikan tampilan dengan status | Must | BRU-05, BRU-06 | UC-18 | AC-PUB-07 | TC-PUB-007 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-009 | Memaksa HTTPS | Must | NFR-07 | UC-09 | AC-PUB-08 | TC-PUB-008 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-010 | Menjaga draf tetap privat | Must | BRD 9.4 | UC-06, UC-07 | AC-PUB-09 | TC-PUB-009 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-011 | Membatasi jumlah terbit | Should | NFR-16 | UC-07 | AC-PUB-10 | TC-PUB-010 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-012 | Menghentikan penayangan | Could | — | UC-07 | AC-PUB-12 | TC-PUB-012 | 1 | 0 | 0 | Belum diuji |
| FR-PUB-013 | Menampilkan 404 bertema | Could | NFR-11 | UC-07 | AC-PUB-12 | TC-PUB-012 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-001 | Menampilkan tombol WhatsApp | Must | FR-13 | UC-10 | AC-LEAD-01 | TC-LEAD-001 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-002 | Menyediakan formulir kontak | Must | FR-13, FR-18 | UC-10 | AC-LEAD-02 | TC-LEAD-002 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-003 | Menyaring spam dan penyalahgunaan | Must | NFR-09 | UC-10 | AC-LEAD-03 | TC-LEAD-003 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-004 | Menyimpan kiriman sebagai lead | Must | FR-14 | UC-10 | AC-LEAD-04 | TC-LEAD-004 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-005 | Mengirim email lead ke pemilik | Must | FR-14 | UC-10 | AC-LEAD-05 | TC-LEAD-005 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-006 | Menyimpan bukti persetujuan pengunjung | Must | FR-18, NFR-14 | UC-10 | AC-LEAD-06 | TC-LEAD-006 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-007 | Menampilkan daftar lead | Must | FR-14 | UC-11 | AC-LEAD-07 | TC-LEAD-007 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-008 | Mengekspor lead ke CSV | Must | FR-14, BRD 9.4 | UC-11 | AC-LEAD-08 | TC-LEAD-008; TC-SEC-003 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-009 | Menghapus lead | Must | NFR-14 | UC-11, UC-23 | AC-LEAD-09 | TC-LEAD-009 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-010 | Menyerahkan lead ke CRM | Must | FR-23, FR-14 | UC-11, UC-27 | AC-LEAD-10 | TC-E2E-005; TC-LEAD-010 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-011 | Mencatat klik WhatsApp, Petunjuk Arah, dan peta | Must | FR-19, BO-11 | UC-15 | AC-LEAD-11 | TC-LEAD-011 | 1 | 0 | 0 | Belum diuji |
| FR-LEAD-012 | Menampilkan tombol Pesan via WhatsApp per item | Must | FR-35 | UC-10, UC-22 | AC-LEAD-12 | TC-LEAD-012 | 1 | 0 | 0 | Belum diuji |
| FR-ANL-001 | Merekam kunjungan tanpa cookie | Must | FR-19 | UC-15 | AC-ANL-01 | TC-ANL-001 | 1 | 0 | 0 | Belum diuji |
| FR-ANL-002 | Menampilkan analitik di dashboard | Must | FR-19 | UC-15 | AC-ANL-02 | TC-ANL-002 | 1 | 0 | 0 | Belum diuji |
| FR-ANL-003 | Mengecualikan bot | Should | FR-19 | UC-15 | AC-ANL-03 | TC-ANL-003 | 1 | 0 | 0 | Belum diuji |
| FR-ANL-004 | Mengagregasi analitik harian | Must | FR-19 | UC-15 | AC-ANL-04 | TC-ANL-004 | 1 | 0 | 0 | Belum diuji |
| FR-ANL-005 | Menerima masukan pelanggan | Could | BRD 7.3 | UC-15 | AC-ANL-05 | TC-ANL-005 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-001 | Menjaga transisi status langganan | Must | FR-16 | UC-18 | AC-SUB-01 | TC-ERR-003; TC-SUB-001 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-002 | Memberi periode masa aktif | Must | FR-16, BRU-07 | UC-04, UC-12 | AC-SUB-02 | TC-PAY-114; TC-SUB-002 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-003 | Menghitung tanggal masa aktif | Must | BRU-07 | UC-12 | AC-SUB-03 | TC-SUB-003 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-004 | Membuat tagihan perpanjangan | Must | FR-16, BRU-17 | UC-12, UC-21 | AC-SUB-04 | TC-SUB-004 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-005 | Menjalankan masa tenggang | Must | BRU-05 | UC-12 | AC-SUB-05 | TC-SUB-005 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-006 | Menonaktifkan website | Must | BRU-05 | UC-12 | AC-SUB-06 | TC-SUB-006 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-007 | Mengaktifkan kembali | Must | BRU-06 | UC-12 | AC-SUB-07 | TC-SUB-007 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-008 | Menghapus isi permanen pada H+30 | Must | BRU-06, BRU-18 | UC-12 | AC-SUB-08 | TC-SUB-008 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-009 | Berhenti berlangganan | Must | FR-17, BRU-09 | UC-13 | AC-SUB-09 | TC-SUB-009 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-010 | Menampilkan status langganan dan domain per website | Must | FR-15 | UC-12, UC-13 | AC-SUB-10 | TC-SUB-010 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-011 | Menjadwalkan perubahan untuk periode berikutnya | Must | FR-32, BRU-17 | UC-12, UC-21 | AC-SUB-11 | TC-PAY-113; TC-SUB-011 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-012 | Menjalankan penjadwal masa aktif | Must | NFR-05 | UC-12 | AC-SUB-12 | TC-SUB-012 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-013 | Menerapkan perubahan terjadwal saat periode baru | Must | FR-32, BRU-17 | UC-21 | AC-SUB-13 | TC-PAY-113; TC-SUB-013 | 1 | 0 | 0 | Belum diuji |
| FR-SUB-014 | Mempratinjau isi di template pengganti | Should | FR-32 | UC-21 | AC-SUB-14 | TC-SUB-014 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-001 | Mengirim email lewat Resend | Must | BRD 9.4 | — | AC-NTF-01 | TC-NTF-001 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-002 | Mengirim email transaksional | Must | D-10 | UC-04, UC-13 | AC-NTF-02 | TC-NTF-002 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-003 | Menjalankan rangkaian onboarding | Must | D-10, BRD 12.5 | UC-05 | AC-NTF-03 | TC-NTF-003 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-004 | Menjalankan rangkaian pendaftar belum bayar | Must | D-10 | UC-02 | AC-NTF-04 | TC-NTF-004 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-005 | Menjalankan rangkaian tagihan | Must | D-10, BRU-04, BRU-14, BRU-17 | UC-12, UC-14, UC-21 | AC-NTF-05 | TC-NTF-005 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-006 | Menjalankan rangkaian win-back | Must | D-10 | UC-12 | AC-NTF-06 | TC-NTF-006 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-007 | Mengirim laporan bulanan | Must | D-10, R-06 | UC-15 | AC-NTF-07 | TC-NTF-007 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-008 | Menjadwalkan pukul 09.00 waktu lokal | Must | BRD 3.2 | UC-12 | AC-NTF-08 | TC-NTF-008 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-009 | Menghormati berhenti menerima email | Must | NFR-14 | UC-15 | AC-NTF-09 | TC-NTF-009 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-010 | Mengatur prioritas dan kuota harian | Must | BRD 13.2 | — | AC-NTF-10 | TC-NTF-010 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-011 | Mencatat pantulan dan keluhan | Should | NFR-05 | UC-10 | AC-NTF-11 | TC-NTF-011 | 1 | 0 | 0 | Belum diuji |
| FR-NTF-012 | Menampilkan pusat notifikasi | Could | — | — | AC-NTF-12 | TC-NTF-012 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-001 | Masuk ke panel admin dengan MFA | Must | NFR-10, FR-20 | UC-16 | AC-ADM-01 | TC-ADM-001 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-002 | Menampilkan ringkasan bisnis dan operasi | Must | FR-20, FR-41, BRD 7.3 | UC-16 | AC-ADM-02 | TC-ADM-002 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-003 | Menampilkan pelanggan dan website | Must | FR-20, BRU-22 | UC-16, UC-18 | AC-ADM-03 | TC-ADM-003 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-004 | Memeriksa pesanan dan pembayaran | Must | FR-20, BRU-10 | UC-17 | AC-ADM-04 | TC-ADM-004 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-005 | Memulihkan pekerjaan gagal | Must | FR-20, NFR-05 | UC-16 | AC-ADM-05 | TC-ADM-005 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-006 | Memantau domain dan hostname | Must | FR-20 | UC-16 | AC-ADM-06 | TC-ADM-006 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-007 | Menangguhkan atau memulihkan tenant atau website | Must | BRU-13 | UC-18 | AC-ADM-07 | TC-ADM-007 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-008 | Mencatat dan mencari audit | Must | BRD 9.4 | UC-17, UC-18, UC-25 | AC-ADM-08 | TC-ADM-008; TC-NFR-023 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-009 | Mengatur harga dan TLD | Must | BRD 10.4, BRU-15, BRU-21 | UC-24 | AC-ADM-09 | TC-ADM-009 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-010 | Mengelola katalog template | Should | FR-21 | — | AC-ADM-10 | TC-ADM-010 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-011 | Mengirim peringatan ke admin | Must | R-04, R-05 | UC-16, UC-26 | AC-ADM-11 | TC-ADM-011 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-012 | Mengekspor laporan bulanan | Should | BRD 7.3 | — | AC-ADM-12 | TC-ADM-012 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-013 | Melihat dashboard pelanggan hanya-baca | Must | BRU-22, FR-40 | UC-25 | AC-ADM-13 | TC-ADM-013 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-014 | Menegakkan peran dan izin admin | Must | FR-20, BRD 9.5 | UC-24 | AC-ADM-14 | TC-ADM-014; TC-SEC-008 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-015 | Meminta persetujuan orang kedua | Must | BRU-21 | UC-24 | AC-ADM-15 | TC-ADM-015 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-016 | Menyamarkan data pribadi di panel admin | Must | BRU-22 | UC-25 | AC-ADM-16 | TC-ADM-016; TC-SEC-008 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-017 | Mengelola operator admin | Must | FR-20, BRD 9.5 | UC-24 | AC-ADM-17 | TC-ADM-017 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-018 | Mencatat catatan internal pelanggan | Should | FR-40 | UC-25 | AC-ADM-18 | TC-ADM-018 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-019 | Menjalankan kontrol layanan pelanggan | Must | FR-40 | UC-25 | AC-ADM-19 | TC-ADM-019 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-020 | Memoderasi laporan penyalahgunaan | Should | FR-42, R-10 | UC-18 | AC-ADM-20 | TC-ADM-020 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-021 | Mengatur mode pemeliharaan dan fitur | Must | FR-40 | UC-26 | AC-ADM-21 | TC-ADM-021 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-022 | Menampilkan laporan keuangan dan template | Should | FR-41 | UC-16 | AC-ADM-22 | TC-ADM-022 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-023 | Mengelola voucher | Could | FR-43 | UC-03 | AC-ADM-23 | TC-ADM-023 | 1 | 0 | 0 | Belum diuji |
| FR-ADM-024 | Menangani permintaan hak data | Must | FR-39, BRU-23 | UC-23 | AC-ADM-24 | TC-ADM-024 | 1 | 0 | 0 | Belum diuji |
| FR-LGL-001 | Menampilkan dokumen legal berversi | Must | FR-18 | UC-02 | AC-LGL-01; AC-MKT-01 | TC-LGL-001; TC-MKT-001 | 2 | 0 | 0 | Belum diuji |
| FR-LGL-002 | Meminta dan menyimpan persetujuan | Must | FR-18 | UC-02 | AC-ACC-01; AC-LGL-02 | TC-ACC-001; TC-LGL-002 | 2 | 0 | 0 | Belum diuji |
| FR-LGL-003 | Membuat halaman privasi di website pelanggan | Must | NFR-14, BRU-23 | UC-10 | AC-LGL-03 | TC-LGL-003 | 1 | 0 | 0 | Belum diuji |
| FR-LGL-004 | Tidak menyimpan data kartu dan kredensial | Must | NFR-14, NFR-08 | — | AC-DOM-06; AC-LGL-04 | TC-DOM-006; TC-LGL-004; TC-SEC-004 | 2 | 0 | 0 | Belum diuji |
| FR-LGL-005 | Mengekspor isi milik pelanggan | Must | FR-38, BRU-19 | UC-11 | AC-LGL-05 | TC-LGL-005 | 1 | 0 | 0 | Belum diuji |
| FR-LGL-006 | Menjalankan website tanpa pelacak pihak ketiga | Must | NFR-14, NFR-28, BRU-24 | UC-10 | AC-ANL-01; AC-LGL-06 | TC-ANL-001; TC-LGL-006; TC-NFR-022 | 2 | 0 | 0 | Belum diuji |
| FR-LGL-007 | Menerima permintaan hak data | Must | FR-39, BRU-23 | UC-23 | AC-LGL-07 | TC-LGL-007 | 1 | 0 | 0 | Belum diuji |
| FR-LGL-008 | Menangani kegagalan pelindungan data | Must | BRU-23, NFR-14 | UC-23 | AC-LGL-08 | TC-LGL-008 | 1 | 0 | 0 | Belum diuji |
| FR-LGL-009 | Memelihara catatan pemrosesan dan sub-prosesor | Must | NFR-14 | UC-23 | AC-LGL-09 | TC-LGL-009 | 1 | 0 | 0 | Belum diuji |
| FR-REF-001 | Membuat kode rujukan | Should | FR-25 | — | AC-REF-01 | TC-REF-001 | 1 | 0 | 0 | Belum diuji |
| FR-REF-002 | Memberi hadiah 1 bulan | Should | FR-25 | — | AC-REF-02 | TC-REF-002 | 1 | 0 | 0 | Belum diuji |
| FR-TIER-001 | Menyimpan katalog tingkat | Must | FR-31, BRU-02 | UC-01, UC-19 | AC-TIER-01 | TC-TIER-001 | 1 | 0 | 0 | Belum diuji |
| FR-TIER-002 | Mencocokkan template dengan tingkat | Must | FR-31 | UC-19 | AC-TIER-02 | TC-TIER-002 | 1 | 0 | 0 | Belum diuji |
| FR-TIER-003 | Menampilkan sisa kursi Eksklusif | Must | BRU-18 | UC-19 | AC-TIER-03 | TC-TIER-003 | 1 | 0 | 0 | Belum diuji |
| FR-TIER-004 | Menahan kursi saat checkout | Must | BRU-18 | UC-19, UC-21 | AC-TIER-04 | TC-PAY-112; TC-TIER-004 | 1 | 0 | 0 | Belum diuji |
| FR-TIER-005 | Mengonfirmasi dan melepas kursi | Must | BRU-18 | UC-19, UC-21 | AC-TIER-05 | TC-PAY-112; TC-TIER-005 | 1 | 0 | 0 | Belum diuji |
| FR-TIER-006 | Menerapkan fitur per tingkat | Must | FR-31 | UC-19 | AC-TIER-06 | TC-TIER-006 | 1 | 0 | 0 | Belum diuji |
| FR-TIER-007 | Menerima daftar tunggu kursi Eksklusif | Could | BRU-18 | UC-19 | AC-TIER-07 | TC-TIER-007 | 1 | 0 | 0 | Belum diuji |
| FR-SITE-001 | Menambah website dari dashboard | Must | FR-30 | UC-20 | AC-SITE-01 | TC-SITE-001 | 1 | 0 | 0 | Belum diuji |
| FR-SITE-002 | Membatasi jumlah website per akun | Must | FR-30 | UC-20 | AC-SITE-02 | TC-SITE-002 | 1 | 0 | 0 | Belum diuji |
| FR-SITE-003 | Memilih website yang dikelola | Must | FR-30 | UC-20 | AC-SITE-03 | TC-SITE-003 | 1 | 0 | 0 | Belum diuji |
| FR-SITE-004 | Mengisolasi data antar website | Must | FR-30, NFR-07 | UC-20 | AC-SITE-04 | TC-MIG-009; TC-SEC-007; TC-SITE-004 | 1 | 0 | 0 | Belum diuji |
| FR-SITE-005 | Mengelola langganan per website | Must | BRU-01, BRU-09 | UC-20 | AC-SITE-05 | TC-MIG-009; TC-PAY-114; TC-SITE-005 | 1 | 0 | 0 | Belum diuji |
| FR-SITE-006 | Menampilkan ringkasan semua website | Must | FR-30 | UC-20 | AC-SITE-06 | TC-SITE-006 | 1 | 0 | 0 | Belum diuji |
| FR-SITE-007 | Mengikat satu domain ke satu website | Must | BRU-01, BRU-16 | UC-20 | AC-SITE-07 | TC-SITE-007 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-001 | Menyediakan pustaka blok | Must | FR-34 | UC-22 | AC-BLK-01 | TC-BLK-001 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-002 | Memilih varian tata letak | Must | FR-34 | UC-22 | AC-BLK-02 | TC-BLK-002; TC-MIG-010 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-003 | Memilih latar bagian | Must | FR-34, NFR-13 | UC-22 | AC-BLK-03 | TC-BLK-003 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-004 | Menampilkan blok Lokasi | Must | FR-33, BRU-24 | UC-22 | AC-BLK-04 | TC-BLK-004 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-005 | Memasang titik peta | Must | FR-33 | UC-22 | AC-BLK-05 | TC-BLK-005 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-006 | Menghitung status buka | Must | FR-33 | UC-22 | AC-BLK-06 | TC-BLK-006 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-007 | Menampilkan galeri dan testimoni | Must | FR-34 | UC-22 | AC-BLK-07 | TC-BLK-007 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-008 | Menampilkan FAQ dan harga/paket | Must | FR-34, FR-35 | UC-22 | AC-BLK-08 | TC-BLK-008 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-009 | Menampilkan banner promo dan media sosial | Must | FR-34 | UC-22 | AC-BLK-09 | TC-BLK-009 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-010 | Menjalankan animasi terkunci | Must | FR-36, BRU-20, NFR-13 | UC-01, UC-07 | AC-BLK-10 | TC-BLK-010; TC-SEC-009 | 1 | 0 | 0 | Belum diuji |
| FR-BLK-011 | Menegakkan anggaran berat template | Must | NFR-27, NFR-01 | UC-07 | AC-BLK-11 | TC-BLK-011; TC-SEC-009 | 1 | 0 | 0 | Belum diuji |
| FR-STS-001 | Menampilkan halaman status publik | Must | FR-37, NFR-30 | UC-26 | AC-STS-01 | TC-NFR-024; TC-STS-001 | 1 | 0 | 0 | Belum diuji |
| FR-STS-002 | Memperbarui insiden | Must | FR-37 | UC-26 | AC-STS-02 | TC-STS-002 | 1 | 0 | 0 | Belum diuji |
| FR-STS-003 | Memperbarui status otomatis dari pemantau | Should | FR-37 | UC-26 | AC-STS-03 | TC-STS-003 | 1 | 0 | 0 | Belum diuji |
| FR-STS-004 | Berlangganan pembaruan status | Could | FR-37 | UC-26 | AC-STS-04 | TC-STS-004 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-001 | Menampilkan kotak masuk lead | Must | FR-23, FR-14 | UC-27 | AC-CRM-01 | TC-CRM-001; TC-E2E-005; TC-NFR-025 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-002 | Menyatukan kontak dan mencegah duplikat | Must | FR-23, BRU-25 | UC-27 | AC-CRM-02 | TC-CRM-002 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-003 | Mengelola pipeline tahapan | Must | FR-23 | UC-27 | AC-CRM-03 | TC-CRM-003; TC-E2E-005; TC-NFR-025 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-004 | Menampilkan linimasa kontak | Must | FR-23 | UC-27 | AC-CRM-04 | TC-CRM-004 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-005 | Mencatat catatan | Must | FR-23 | UC-27 | AC-CRM-05 | TC-CRM-005 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-006 | Membuat tugas dan pengingat tindak lanjut | Must | FR-23, BO-11 | UC-27 | AC-CRM-06 | TC-CRM-006 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-007 | Membalas cepat lewat WhatsApp atau email | Must | FR-23, FR-35 | UC-27 | AC-CRM-07 | TC-CRM-007; TC-E2E-005 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-008 | Menambah kontak manual | Must | FR-23 | UC-27 | AC-CRM-08 | TC-CRM-008 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-009 | Menghormati hak data dan persetujuan kontak | Must | FR-23, FR-39, BRU-23, BRU-26 | UC-27 | AC-CRM-09 | TC-CRM-009 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-010 | Mencatat nilai peluang dan item | Should | FR-45 | UC-28 | AC-CRM-10 | TC-CRM-010 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-011 | Memberi label dan menyimpan segmen | Should | FR-45 | UC-28 | AC-CRM-11 | TC-CRM-011 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-012 | Menambah field kustom | Should | FR-45 | UC-28 | AC-CRM-12 | TC-CRM-012 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-013 | Menandai peluang mandek | Should | FR-45 | UC-28 | AC-CRM-13 | TC-CRM-013 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-014 | Mengimpor dan mengekspor kontak | Should | FR-45, FR-38 | UC-28 | AC-CRM-14 | TC-CRM-014 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-015 | Menampilkan laporan CRM | Should | FR-45, BO-11 | UC-28 | AC-CRM-15 | TC-CRM-015 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-016 | Merekam atribusi sumber lead | Should | FR-45 | UC-28 | AC-CRM-16 | TC-CRM-016 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-017 | Memberi notifikasi lead baru di ponsel | Should | FR-45 | UC-28 | AC-CRM-17 | TC-CRM-017 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-018 | Menyesuaikan tahapan pipeline | Should | FR-45 | UC-28 | AC-CRM-18 | TC-CRM-018 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-019 | Menjalankan otomasi sederhana | Should | FR-46 | UC-28 | AC-CRM-19 | TC-CRM-019 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-020 | Mengirim email dari CRM | Could | FR-47 | — | AC-CRM-20 | TC-CRM-020 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-021 | Membuat penawaran sederhana | Could | FR-47 | — | AC-CRM-21 | TC-CRM-021 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-022 | Memberi skor lead | Could | FR-47 | — | AC-CRM-22 | TC-CRM-022 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-023 | Mengirim kampanye email ke segmen | Could | FR-47, BRU-26 | — | AC-CRM-23 | TC-CRM-023 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-024 | Menerima janji temu dari website | Could | FR-47 | — | AC-CRM-24 | TC-CRM-024 | 1 | 0 | 0 | Belum diuji |
| FR-CRM-025 | Inbox WhatsApp Business API dan asisten AI CRM | Won't | FR-48 | — | — | — (Won’t) | 0 | 0 | 0 | Ditunda |
