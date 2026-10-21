<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

4.4 Aturan bisnis dan validasi

Penerapan aturan bisnis BRD

| BRU | Aturan (ringkas) | Ditegakkan oleh | Titik penegakan |
| --- | --- | --- | --- |
| BRU-01 | Banyak website per akun; 1 website = 1 langganan + 1 template + 1 tingkat + maks 1 domain; 1 domain = 1 website | ACC-011, PRV-005, SITE-002, SITE-005, SITE-007 | UNIQUE memberships.tenant_id, subscriptions.site_id, sites.origin_order_line_id, hostname_bindings.hostname |
| BRU-02 | Tiga tingkat: Rp149.000/Rp1.490.000, Rp200.000/Rp2.000.000, Rp300.000/Rp3.000.000; belum termasuk domain; harga diperiksa di server | MKT-002, PAY-002, TIER-001, TIER-002 | Harga dari plan_prices berlaku sesuai tingkat template, disalin ke order_lines |
| BRU-03 | Lunas hanya dari notifikasi terverifikasi | PAY-005, PAY-006, PAY-007 | Tanda tangan SHA512 + GET Status API |
| BRU-04 | Pengingat H-7 dan H-1 | SUB-012, NTF-005 | Penjadwal per jam, kunci dedupe |
| BRU-05 | Tenggang 7 hari, nonaktif hari ke-8 | SUB-005, SUB-006, PUB-008 | grace_until; renderer membaca status |
| BRU-06 | Aktif kembali saat lunas; isi dihapus H+30 | SUB-007, SUB-008 | Konsumen order.paid; pekerjaan site.purge |
| BRU-07 | Aturan tanggal perpanjangan, bulan kalender | SUB-002, SUB-003 | Satu fungsi tanggal yang diuji unit + exclusion constraint periode |
| BRU-08 | Pelanggan adalah registran | DOM-006, DOM-018 | Data registran dikirim ke reseller atas nama pelanggan |
| BRU-09 | Berhenti di akhir periode, tanpa prorata | SUB-009 | cancel_at_period_end |
| BRU-10 | Refund manual hanya untuk pembayaran ganda/kesalahan sistem, ≤ 7 hari kerja | PAY-013, DOM-009 | Endpoint admin + kunci baris total refund |
| BRU-11 | Gambar JPG/PNG/WebP ≤ 1,5 MB; kuota 500 MB | MED-001, MED-003, PRV-007 | Izin unggah + usage_counters atomik |
| BRU-12 | Maks 20 bagian per halaman dan 20 halaman per website (klarifikasi FRD), minimal 1 bagian terlihat | EDT-003, EDT-004, PUB-002 | Validasi V-20 saat simpan draf dan saat terbit |
| BRU-13 | Pelanggar dinonaktifkan tanpa refund | ADM-007 | tenants.status = suspended + audit |
| BRU-14 | Domain ditagih H-30; belum dibayar sampai H-3 → tidak diperpanjang | DOM-014, DOM-015 | Penjadwal domain |
| BRU-15 | Harga domain = reseller + Rp25.000, dikunci; didaftarkan setelah bayar | DOM-003, PAY-002, DOM-007 | domain_quotes sekali pakai; konsumen order.paid |
| BRU-16 | Pilih satu: beli, hubungkan, atau subdomain; subdomain selalu ada | DOM-005, DOM-012 | Binding bawaan tidak bisa dihapus |
| BRU-17 | Ganti template/tingkat berlaku di periode berikutnya, tanpa prorata | SUB-011, SUB-013, SUB-004 | scheduled_changes diterapkan saat periode baru dari order.paid |
| BRU-18 | Kursi Eksklusif: 10 per template, 1 per kategori per kota | TIER-003, TIER-004, TIER-005 | template_seats dengan kunci baris template dan UNIQUE parsial (template, kategori, kota) |
| BRU-19 | Hanya isi milik pelanggan yang bisa diekspor; template milik Mangelek | LGL-001, LGL-005 | Ekspor hanya membaca dokumen, CMS, media unggahan, dan lead |
| BRU-20 | Animasi dan efek template terkunci | BLK-010 | Parameter animasi hanya di manifest template; Document tidak punya kolom animasi |
| BRU-21 | Aksi sensitif butuh persetujuan orang kedua | ADM-015, ADM-009, ADM-019 | admin_approvals + pemeriksaan hash payload |
| BRU-22 | Admin tidak membaca isi lead; PII tersamar; impersonasi hanya-baca ≤ 60 menit | ADM-003, ADM-013, ADM-016 | Respons API admin tanpa kolom isi lead; impersonation_sessions |
| BRU-23 | Hak data dan notifikasi kebocoran ≤ 3×24 jam; Mangelek prosesor data lead | LGL-003, LGL-007, LGL-008, ADM-024 | data_requests.due_at, data_incidents |
| BRU-24 | Tidak memuat konten Google sebelum klik; Petunjuk Arah lewat Maps URLs | BLK-004, LGL-006 | Renderer blok Lokasi; CSP frame-src Google hanya setelah klik |

Aturan bisnis turunan FRD

| ID | Aturan | Kebutuhan |
| --- | --- | --- |
| RB-01 | Quote registrasi berlaku 30 menit dan sekali pakai. Quote perpanjangan berlaku sampai batas H-3; kenaikan harga reseller ≤ Rp25.000 ditanggung Mangelek, lebih besar → quote baru + email | DOM-003, DOM-014 |
| RB-02 | Hanya satu order terbuka per siklus (cycle_key) | SUB-004, DOM-014 |
| RB-03 | Perpanjangan memakai harga plan_price periode terakhir yang dibayar selama harga itu belum dihentikan; kenaikan harga untuk pelanggan lama diumumkan ≥ 30 hari sebelumnya | SUB-004, ADM-009 |
| RB-04 | Saat tenggang: website tayang; editor, unggah media, dan terbit dikunci; lead dan pembayaran tetap bisa | SUB-005, EDT-013 |
| RB-05 | Pelanggan yang berhenti langsung nonaktif pada H, tanpa tenggang dan tanpa tagihan; isi dihapus H+30; bisa aktif kembali dengan membayar sebelum H+30 | SUB-009 |
| RB-06 | Order pertama kedaluwarsa 24 jam; order perpanjangan dapat dibayar sampai H+30; setiap percobaan Snap berlaku 24 jam | PAY-004, PAY-012 |
| RB-07 | Kuota per website (sama di semua tingkat): 20 halaman; 20 bagian per halaman; 3 koleksi CMS; 100 item per koleksi; media 500 MB; 1,5 MB per file; 1.000 kiriman formulir per bulan dan 100 per hari; 30 terbit per hari; 20 release disimpan | PRV-007 |
| RB-08 | Bagian domain yang sudah terdaftar tidak dapat direfund; refund domain hanya bila registrasi gagal permanen | PAY-013, DOM-009 |
| RB-09 | Slug subdomain tidak bisa diubah pelanggan pada MVP | PRV-002 |
| RB-10 | Pergantian periode, tingkat, atau template berlaku di perpanjangan berikutnya, tanpa prorata | SUB-011, SUB-013 |
| RB-11 | Tangguhan admin mengalahkan status langganan; pembayaran saat ditangguhkan dicatat tetapi tidak menayangkan website | ADM-007, SUB-001 |
| RB-12 | Jadwal memakai zona waktu site (bawaan Asia/Jakarta; bisa WITA atau WIT di pengaturan) | SUB-012, NTF-008 |
| RB-13 | Admin hanya melihat jumlah lead, bukan isinya | ADM-003 |
| RB-14 | Email lead dikirim ke email notifikasi terverifikasi; perubahannya butuh verifikasi | LEAD-005 |
| RB-15 | Satu hostname hanya untuk satu site; pemakaian ulang setelah dilepas butuh bukti kepemilikan baru | DOM-010, DOM-013 |
| RB-16 | Pelanggan nonaktif tetap bisa login untuk membayar, melihat, dan mengekspor lead sampai H+30 | SUB-006, LEAD-007 |
| RB-17 | Rollback dihitung ke kuota terbit; release aktif tidak pernah dihapus | PUB-005 |
| RB-18 | Revisi draf yang tidak dipakai release dipangkas: 50 terakhir disimpan | EDT-005 |
| RB-19 | Domain terkelola tetap ditagih perpanjangan walau langganan berakhir, sampai pelanggan meminta transfer keluar atau membiarkannya habis | DOM-014, DOM-018 |
| RB-20 | Harga yang tampil adalah harga yang dibayar; biaya Midtrans ditanggung Mangelek | PAY-001 |
| RB-21 | Satu akun maksimal 10 website yang belum dihapus dan 1 order website baru pending; batas bisa diubah admin | SITE-002 |
| RB-22 | Tingkat ditentukan template; perubahan tingkat tanpa ganti template tidak tersedia kecuali template yang sama punya versi di tingkat lain | TIER-002, SUB-011 |
| RB-23 | Kursi Eksklusif yang dipesan lewat perubahan terjadwal dihitung ke batas 10 sejak dijadwalkan dan dilepas bila jadwal dibatalkan atau perpanjangan tidak dibayar sampai H+7 | TIER-004, SUB-011 |
| RB-24 | Saat ganti template, blok tanpa padanan disimpan tersembunyi selama 2 periode lalu dipangkas | SUB-013 |
| RB-25 | Hari gratis dari admin ≤ 30 hari per tindakan tanpa persetujuan; lebih dari itu butuh persetujuan kedua | ADM-019, ADM-015 |
| RB-26 | Kota untuk aturan kursi = kota/kabupaten alamat usaha di wizard, dinormalkan ke daftar kode wilayah | TIER-003, TIER-004 |
| RB-27 | Kuota CRM per website: 5.000 kontak, 8 tahapan, 20 field kustom, 50 label, 20 template pesan, 10 aturan otomasi | CRM-002, CRM-011, CRM-012, CRM-018, CRM-019 |
| RB-28 | Kontak unik per website berdasarkan email (huruf kecil) atau telepon E.164; tidak pernah digabung lintas website atau lintas akun | CRM-002, CRM-008, CRM-014 |
| RB-29 | Kontak hanya masuk kampanye bila marketing_consent tercatat; persetujuan formulir kontak bukan persetujuan pemasaran | CRM-009, CRM-023 |
| RB-30 | Nol biaya fitur dan desain: setiap dependensi berlisensi MIT, ISC, BSD, Apache-2.0, atau OFL; desain, ilustrasi, ikon, dan animasi dibuat dari kode; tidak ada API berbayar per pemakaian. Biaya kas hanya arsitektur (hosting, database, email, domain, biaya transaksi) | BLK-010, BLK-011, BLK-004, CRM-007, CRM-017, CRM-021 |

Aturan validasi data

| ID | Bidang | Aturan | Contoh pesan galat |
| --- | --- | --- | --- |
| V-01 | Email | Format email sederhana, ≤ 254 karakter, disimpan huruf kecil | “Alamat email belum benar.” |
| V-02 | Kata sandi | 8–72 karakter; tidak sama dengan email; tidak termasuk daftar sandi umum | “Kata sandi minimal 8 karakter dan tidak boleh terlalu umum.” |
| V-03 | Nama orang atau usaha | 2–120 karakter, bukan hanya spasi | “Nama minimal 2 huruf.” |
| V-04 | WhatsApp/telepon | Diawali 08, 628, atau +628; 10–15 digit; disimpan E.164 | “Nomor WhatsApp belum benar. Contoh: 0812 3456 7890.” |
| V-05 | Slug subdomain | 3–40 karakter a–z, 0–9, tanda hubung di tengah; bukan kata cadangan (admin, api, app, www, mail, mangelek, staging, preview, cdn, static, status, help, billing, dashboard) | (dibuat sistem; bentrok diberi akhiran angka) |
| V-06 | Nama domain | Nama 3–63 karakter a–z, 0–9, tanda hubung tidak di awal/akhir, tanpa awalan xn--; total ≤ 253; TLD aktif | “Nama domain hanya boleh huruf, angka, dan tanda hubung.” |
| V-07 | Data registran | Nama ≤ 120; email V-01; telepon V-04; alamat 10–255; kota dan provinsi wajib; kode pos 5 digit; negara kode ISO 2 huruf (bawaan ID) | “Lengkapi alamat pemilik domain.” |
| V-08 | Gambar | JPG, PNG, atau WebP; ≤ 1.500.000 byte; sisi ≤ 6.000 px; isi sesuai jenis | “Ukuran gambar maksimal 1,5 MB.” |
| V-09 | Teks blok | Judul ≤ 200; teks ≤ 20.000; label tombol ≤ 80; teks alternatif ≤ 300; teks polos | “Teks terlalu panjang (maks 200 karakter).” |
| V-10 | Halaman dan navigasi | Judul 1–120; alamat diawali /, segmen huruf kecil a–z, 0–9, tanda hubung, unik; navigasi ≤ 20 item, label ≤ 80 | “Alamat halaman sudah dipakai.” |
| V-11 | URL tombol | https:// tanpa nama pengguna/sandi, alamat lokal, #anchor, mailto:, tel:; ≤ 2.048 karakter | “Gunakan alamat HTTPS, halaman, email, atau telepon yang valid.” |
| V-12 | SEO | Judul ≤ 120; deskripsi ≤ 320; penghitung menyarankan 60 dan 160 | Penghitung karakter |
| V-13 | Formulir kontak | Nama 1–120; email atau telepon wajib salah satu; pesan 1–1.000 karakter teks polos; persetujuan wajib | “Isi email atau nomor WhatsApp agar pemilik bisa menghubungi Anda.” |
| V-14 | Jam buka | Per hari: Tutup, 24 jam, atau HH:MM–HH:MM dengan jam tutup setelah jam buka | “Jam tutup harus setelah jam buka.” |
| V-15 | Lokasi | Tautan HTTPS Google Maps, atau koordinat lintang −11 s.d. 6 dan bujur 95 s.d. 141 dengan ≥ 5 desimal; place_id opsional | “Tempel tautan Google Maps lokasi usaha Anda.” |
| V-16 | Item CMS | Nama ≤ 100 (judul artikel ≤ 120); deskripsi ≤ 1.000; harga bilangan bulat 0–1.000.000.000; kategori ≤ 60; slug unik per koleksi | “Nama item sudah dipakai.” |
| V-17 | Alasan aksi admin | 10–1.000 karakter | “Tulis alasan minimal 10 karakter.” |
| V-18 | Jumlah refund | Bilangan bulat ≥ 1 dan ≤ sisa pembayaran | “Jumlah melebihi sisa yang bisa direfund.” |
| V-19 | Idempotency-Key, request_key | 8–128 karakter | (galat teknis E-VALIDATION) |
| V-20 | Dokumen website | schema_version 3; ≤ 1 MiB; 1–20 halaman; ≤ 20 bagian per halaman; ID UUID unik; navigasi menunjuk halaman yang ada; tanpa cms_snapshot dari klien | “Dokumen melebihi batas 1 MB; gunakan gambar dari pustaka media.” |
| V-21 | Kota usaha | Wajib dipilih dari daftar kota/kabupaten (kode wilayah); bebas ketik tidak diterima | “Pilih kota dari daftar.” |
| V-22 | Varian dan latar blok | variant dan background harus ada di manifest template | (galat teknis E-DOCUMENT-INVALID) |
| V-23 | Isi blok baru | Galeri ≤ 24 gambar; testimoni ≤ 12, isi ≤ 300; FAQ ≤ 20, pertanyaan ≤ 200, jawaban ≤ 1.000; paket ≤ 6, ≤ 10 poin; banner ≤ 120 + tanggal berakhir; tautan media sosial HTTPS | “Maksimal 24 gambar per galeri.” |
| V-24 | Alasan dan kode verifikasi hak data | Alasan 10–1.000 karakter; kode 6 digit berlaku 10 menit, maks 3 percobaan | “Kode salah atau kedaluwarsa.” |
| V-25 | CRM | Nilai peluang 0–1.000.000.000; catatan ≤ 2.000; nama tahapan 1–40; label 1–30; template pesan ≤ 1.000 dengan variabel {nama}, {usaha}, {item}; alasan kalah wajib | “Pilih alasan peluang kalah.” |
