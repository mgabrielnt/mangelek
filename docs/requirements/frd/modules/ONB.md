<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# ONB — Wizard onboarding dan bantuan

Fitur utama: 5 langkah profil usaha termasuk kota dan titik peta, simpan per langkah, WhatsApp berkonteks

Ringkas: 7 kebutuhan (6 Must), 6 kriteria penerimaan, 6 test case.

## Kebutuhan fungsional

| ID | Fungsi | Aktor | Input | Proses | Output | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-ONB-001 | Mengarahkan ke wizard | PEL | Order pertama paid dan site published atau provisioning | Arahkan ke /dashboard/onboarding; kartu wizard tetap di dashboard sampai semua langkah selesai atau dilewati | Wizard terbuka otomatis setelah status “Pembayaran berhasil” | Must | FR-09 | UC-05 | AC-ONB-01 | TC-ONB-001 |
| FR-ONB-002 | Menjalankan wizard 5 langkah | PEL | 1) nama usaha, kategori, kota, slogan; 2) logo; 3) WhatsApp, email publik, telepon; 4) alamat + titik peta (tautan Google Maps atau pin); 5) jam buka per hari | Validasi V-03, V-04, V-08, V-14, V-15, V-21; logo lewat alur MED; titik peta lewat BLK-005 | Data usaha lengkap | Must | FR-09 | UC-05 | AC-ONB-02 | TC-ONB-002 |
| FR-ONB-003 | Menyimpan tiap langkah | PEL | Tombol Lanjut atau Lewati | Simpan ke draf (document.business) dan onboarding_steps; semua langkah boleh dilewati; buka kembali di langkah terakhir | Menutup browser di langkah 3 lalu kembali membuka langkah 3 dengan data langkah 1–2 utuh | Must | FR-09, BO-09 | UC-05 | AC-ONB-02 | TC-ONB-002 |
| FR-ONB-004 | Mengisi data usaha ke website | SIS | document.business | Blok pembuka, kontak, footer, tombol WhatsApp, dan blok Lokasi membaca data usaha; peta di blok Lokasi dimuat setelah diklik (BLK-004); langkah akhir menampilkan pratinjau + Terbitkan | Setelah terbit, website menampilkan nama usaha, nomor WhatsApp, alamat, dan tombol Petunjuk Arah | Must | FR-09, FR-33 | UC-05 | AC-ONB-03 | TC-ONB-003 |
| FR-ONB-005 | Menormalkan nomor WhatsApp | SIS | Nomor diawali 08, 628, atau +628 | Hapus spasi/tanda hubung; 10–15 digit; simpan E.164 | “0812-3456-7890” tersimpan “+6281234567890” | Must | FR-13 | UC-05 | AC-ONB-04 | TC-ONB-004 |
| FR-ONB-006 | Menampilkan kelengkapan website | PEL | onboarding_steps, status terbit | Persentase = langkah selesai ÷ 5, ditambah syarat pernah terbit | Persentase naik tiap langkah; hilang di 100% | Should | BO-09, R-02 | UC-05 | AC-ONB-05 | TC-ONB-005 |
| FR-ONB-007 | Menyediakan bantuan berkonteks | PEL | Halaman aktif, kode referensi tenant | Tautan panduan blog dan tombol WhatsApp Mangelek berisi pesan awal + kode referensi 8 karakter (bukan UUID) + nama layar | Bantuan tersedia di dashboard dan halaman galat | Must | BRD 6.1, BO-10 | UC-05 | AC-ONB-06 | TC-ONB-006 |

## Kriteria penerimaan

| ID | Kriteria penerimaan | Kebutuhan | Prioritas | Test case |
| --- | --- | --- | --- | --- |
| AC-ONB-01 | Diberikan status “Pembayaran berhasil”, ketika halaman status selesai, maka pelanggan diarahkan ke /dashboard/onboarding dan kartu wizard tetap di dashboard sampai semua langkah selesai atau dilewati. | ONB-001 | Must | TC-ONB-001 |
| AC-ONB-02 | Diberikan wizard 5 langkah, ketika pelanggan menutup browser di langkah 3 lalu kembali, maka langkah 3 terbuka dengan data langkah 1–2 utuh, semua langkah boleh dilewati, dan isian tidak valid ditolak V-03, V-04, V-08, V-14, V-15. | ONB-002, ONB-003 | Must | TC-ONB-002 |
| AC-ONB-03 | Diberikan data usaha lengkap dengan titik peta, ketika website diterbitkan, maka blok pembuka, kontak, footer, tombol WhatsApp, dan blok Lokasi menampilkan data itu, tombol Petunjuk Arah memakai Maps URLs, dan tidak ada permintaan ke Google sebelum peta diklik. | ONB-004 | Must | TC-ONB-003 |
| AC-ONB-04 | Diberikan nomor 0812-3456-7890, 628123456789, dan +62 812 3456 7890, ketika dinormalkan, maka semuanya tersimpan +6281234567890 atau setara E.164 dan nomor < 10 digit ditolak. | ONB-005 | Must | TC-ONB-004 |
| AC-ONB-05 | Diberikan 3 dari 5 langkah selesai tanpa terbit, ketika dashboard dibuka, maka persentase kelengkapan dihitung dari aturan ONB-006 dan hilang di 100%. | ONB-006 | Should | TC-ONB-005 |
| AC-ONB-06 | Diberikan halaman dashboard atau halaman galat, ketika tombol bantuan ditekan, maka WhatsApp terbuka dengan pesan awal berisi kode referensi 8 karakter dan nama layar, tanpa UUID. | ONB-007 | Must | TC-ONB-006 |

## Test case

| ID | Kelompok | Judul / memverifikasi | Kebutuhan dicakup | Prioritas | Wajib G1 | Level | Lingkungan | Data uji | Langkah kunci | Lulus bila | Otomasi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-ONB-001 | ONB — Wizard onboarding dan bantuan | Mengarahkan ke wizard | ONB-001 | Must | Ya | E2E | Staging | Akun baru lunas | Selesaikan pembayaran; lewati 2 langkah; cek kartu | AC-ONB-01 terpenuhi: Diberikan status “Pembayaran berhasil”, ketika halaman status selesai, maka pelanggan diarahkan ke /dashboard/onboarding dan kartu wizard tetap di dashboard sampai semua langkah selesai atau dilewati. | Otomatis |
| TC-ONB-002 | ONB — Wizard onboarding dan bantuan | Menjalankan wizard 5 langkah | ONB-002, ONB-003 | Must | Ya | E2E | Staging | Isian valid dan tidak valid | Isi 2 langkah, tutup tab, buka lagi; kirim isian tidak valid | AC-ONB-02 terpenuhi: Diberikan wizard 5 langkah, ketika pelanggan menutup browser di langkah 3 lalu kembali, maka langkah 3 terbuka dengan data langkah 1–2 utuh, semua langkah boleh dilewati, dan isian tidak valid ditolak V-03, V-04, V-08, V-14, V-15. | Otomatis |
| TC-ONB-003 | ONB — Wizard onboarding dan bantuan | Mengisi data usaha ke website | ONB-004 | Must | Ya | E2E | Staging | Data usaha uji | Terbitkan dari langkah akhir; periksa HTML publik | AC-ONB-03 terpenuhi: Diberikan data usaha lengkap dengan titik peta, ketika website diterbitkan, maka blok pembuka, kontak, footer, tombol WhatsApp, dan blok Lokasi menampilkan data itu, tombol Petunjuk Arah memakai Maps URLs, dan tidak ada permintaan ke Google sebelum peta diklik. | Otomatis |
| TC-ONB-004 | ONB — Wizard onboarding dan bantuan | Menormalkan nomor WhatsApp | ONB-005 | Must | Ya | Unit | CI | Tabel nomor | Uji tabel normalisasi | AC-ONB-04 terpenuhi: Diberikan nomor 0812-3456-7890, 628123456789, dan +62 812 3456 7890, ketika dinormalkan, maka semuanya tersimpan +6281234567890 atau setara E.164 dan nomor < 10 digit ditolak. | Otomatis |
| TC-ONB-005 | ONB — Wizard onboarding dan bantuan | Menampilkan kelengkapan website | ONB-006 | Should | Tidak | Unit | CI | onboarding_steps uji | Uji fungsi persentase | AC-ONB-05 terpenuhi: Diberikan 3 dari 5 langkah selesai tanpa terbit, ketika dashboard dibuka, maka persentase kelengkapan dihitung dari aturan ONB-006 dan hilang di 100%. | Otomatis |
| TC-ONB-006 | ONB — Wizard onboarding dan bantuan | Menyediakan bantuan berkonteks | ONB-007 | Must | Ya | E2E | Staging | Tenant uji | Klik bantuan di 3 halaman; baca URL wa.me | AC-ONB-06 terpenuhi: Diberikan halaman dashboard atau halaman galat, ketika tombol bantuan ditekan, maka WhatsApp terbuka dengan pesan awal berisi kode referensi 8 karakter dan nama layar, tanpa UUID. | Otomatis |
