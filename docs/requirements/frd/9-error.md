<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

9. Penanganan error dan pengecualian

9.2 Katalog kode error

| Kode | HTTP | Kapan terjadi | Pesan ke pengguna | Perilaku sistem | Diulang? |
| --- | --- | --- | --- | --- | --- |
| E-UNAUTHENTICATED | 401 | Sesi tidak ada atau kedaluwarsa | “Sesi Anda berakhir. Silakan masuk lagi.” | Arahkan ke login dengan URL kembali; perubahan lokal disimpan | Tidak |
| E-SIGNATURE-INVALID | 401 | Tanda tangan webhook salah | (tidak ada pengguna) | Simpan peristiwa signature_valid = false; peringatan admin bila ≥ 5/jam | Tidak |
| E-AUTH-LOCKED | 429 | 5 gagal masuk dalam 15 menit | “Terlalu banyak percobaan. Coba lagi dalam 15 menit.” | Jeda + Retry-After | Setelah jeda |
| E-EMAIL-UNVERIFIED | 403 | Checkout sebelum verifikasi email | “Verifikasi email Anda dulu untuk melanjutkan pembayaran.” + Kirim Ulang | — | Tidak |
| E-FORBIDDEN | 403 | Bukan pemilik atau bukan operator | “Anda tidak memiliki akses ke halaman ini.” | Audit percobaan | Tidak |
| E-READ-ONLY | 403 | Menulis saat grace, suspended, atau tenant ditangguhkan | “Website sedang dalam masa tenggang. Perpanjang langganan untuk mengedit.” + Bayar | — | Tidak |
| E-ENTITLEMENT | 403 | Tidak ada periode berbayar yang berjalan | “Fitur ini belum aktif untuk akun Anda.” | — | Tidak |
| E-BOT-CHECK | 403 | Verifikasi Turnstile gagal | “Verifikasi keamanan gagal. Muat ulang halaman, atau hubungi lewat WhatsApp.” | Kiriman tidak disimpan | Setelah muat ulang |
| E-NOT-FOUND | 404 | Objek tidak ada atau milik tenant lain | “Data tidak ditemukan.” | Tidak membedakan keduanya | Tidak |
| E-CONFLICT | 409 | Anggota kedua, atau order website baru ganda | “Masih ada pesanan website yang belum selesai.” | — | Tidak |
| E-REVISION-CONFLICT | 409 | If-Match tidak cocok | “Ada perubahan dari tab atau perangkat lain.” | Dialog tiga pilihan (EDT-006) | Setelah memuat ulang |
| E-IDEMPOTENCY-MISMATCH | 409 | Kunci sama, isi berbeda | “Permintaan tidak bisa diproses. Muat ulang halaman.” | — | Tidak |
| E-QUOTE-EXPIRED | 409 | Quote lewat 30 menit | “Harga domain sudah diperbarui. Periksa lagi sebelum membayar.” | Quote baru dibuat dan ditampilkan | Ya |
| E-DOMAIN-UNAVAILABLE | 409 | Nama baru saja diambil | “Nama domain ini baru saja diambil. Pilih nama lain.” | Tampilkan saran | Tidak |
| E-HOSTNAME-TAKEN | 409 | Host sudah terhubung ke site lain | “Domain ini sudah terhubung ke website lain.” | — | Tidak |
| E-ORDER-STATE | 409 | Order sudah dibayar atau kedaluwarsa | “Pesanan ini sudah kedaluwarsa. Buat pesanan baru.” | — | Tidak |
| E-TEMPLATE-RETIRED | 409 | Versi template pensiun | “Template ini sudah diperbarui. Pilih ulang desain Anda.” | — | Tidak |
| E-TIER-MISMATCH | 422 | Tingkat harga tidak sama dengan tingkat template | “Template ini hanya tersedia di tingkat <tingkat>. Pilih ulang paket Anda.” | Order tidak dibuat | Setelah diperbaiki |
| E-SEAT-UNAVAILABLE | 409 | Kursi Eksklusif penuh atau sudah dipakai usaha sejenis di kota yang sama | “Template ini sudah dipakai usaha sejenis di kota Anda. Pilih template Eksklusif lain atau Premium.” | Tawarkan alternatif dan daftar tunggu | Tidak |
| E-SITE-LIMIT | 409 | Batas website per akun tercapai | “Akun Anda sudah mencapai batas 10 website. Hubungi kami bila butuh lebih.” | Tautan WhatsApp bantuan | Tidak |
| E-APPROVAL-REQUIRED | 202 | Aksi admin sensitif butuh persetujuan | “Permintaan persetujuan sudah dikirim.” | admin_approvals dibuat | Setelah disetujui |
| E-APPROVAL-INVALID | 409 | Penyetuju sama dengan peminta sebelum 24 jam, payload berubah, atau kedaluwarsa | “Persetujuan tidak sah. Ajukan ulang.” | Aksi tidak dijalankan; audit | Tidak |
| E-CRM-LIMIT | 429 | Kuota CRM website penuh (RB-27) | “Batas 5.000 kontak tercapai. Hapus atau ekspor kontak lama.” | Tidak ada kontak dibuat; lead tetap tersimpan di kiriman formulir | Setelah kuota tersedia |
| E-VALIDATION | 422 | Isian melanggar V-01 s.d. V-19 | Pesan per kolom (Bagian 4.4) | details per kolom | Setelah diperbaiki |
| E-DOCUMENT-INVALID | 422 | Dokumen melanggar V-20 | “Ada bagian yang belum valid:” + daftar | Daftar lokasi masalah | Setelah diperbaiki |
| E-PUBLISH-INVALID | 422 | Validasi sebelum terbit gagal | “Website belum bisa diterbitkan:” + daftar | Release tidak dibuat | Setelah diperbaiki |
| E-UPLOAD-TOO-LARGE | 422 | File > 1,5 MB | “Ukuran gambar maksimal 1,5 MB.” | — | Setelah diperbaiki |
| E-UNSUPPORTED-TYPE | 422 | Bukan JPG/PNG/WebP atau isi tidak sesuai | “Gunakan gambar JPG, PNG, atau WebP.” | Media rejected | Setelah diperbaiki |
| E-RATE-LIMITED | 429 | Batas permintaan terlampaui | “Terlalu banyak permintaan. Coba lagi sebentar.” | Retry-After | Setelah jeda |
| E-QUOTA-EXCEEDED | 429 | Kuota media, formulir, atau terbit habis | “Kuota media 500 MB penuh. Hapus gambar yang tidak dipakai.” | Waktu reset disertakan bila ada | Setelah kuota tersedia |
| E-CHECKOUT-DISABLED | 503 | Pembayaran dimatikan konfigurasi | “Pembayaran sedang tidak tersedia. Coba lagi beberapa menit lagi.” | — | Ya |
| E-PROVIDER-UNAVAILABLE | 503 | Midtrans, reseller, atau Cloudflare gangguan | “Layanan pembayaran sedang gangguan. Pesanan Anda aman; coba lagi.” | Cek status provider sebelum mengulang | Ya |
| E-SERVICE-UNAVAILABLE | 503 | Database atau penyimpanan tidak tersedia | “Sistem sedang sibuk. Perubahan Anda belum tersimpan; kami mencoba lagi.” | Klien mengulang dengan jeda | Ya |
| E-INTERNAL | 500 | Galat tak terduga | “Terjadi kesalahan. Kode: XXXXXXXX. Hubungi kami lewat WhatsApp bila berulang.” | Log + peringatan admin bila > 1% permintaan dalam 5 menit | Ya, sekali |

9.3 Perilaku saat komponen atau vendor gagal

| Kegagalan | Deteksi | Perilaku sistem | Yang dilihat pengguna | Pemulihan |
| --- | --- | --- | --- | --- |
| Snap Midtrans gagal saat checkout | Batas waktu 10 detik atau 5xx | Order tetap pending; status provider dicek sebelum percobaan baru | “Pembayaran sedang gangguan” + Coba Lagi | Otomatis saat pulih |
| Notifikasi Midtrans tidak datang | Order pending dengan percobaan aktif > 15 menit | Penjadwal memanggil GET Status API tiap 15 menit dan menerapkan hasilnya seperti notifikasi (PAY-007) | Status berubah tanpa menunggu notifikasi | Otomatis |
| Database tidak tersedia saat webhook masuk | Koneksi gagal | Balas 503 agar Midtrans mengirim ulang (hingga 4 kali untuk 503) | — | Otomatis |
| Reseller habis waktu atau 5xx | Batas waktu, 5xx | Status unknown → cek info domain → ulang (≤ 3) → failed_review | “Domain sedang didaftarkan”; website di subdomain | Admin: Coba Ulang |
| Saldo deposit kurang | API saldo atau galat saldo | Pekerjaan ditahan ≤ 24 jam; peringatan admin | “Domain sedang didaftarkan” | Admin isi saldo, lalu Coba Ulang |
| Cloudflare for SaaS gagal (hostname atau TLS) | Galat API, tls_status = failed | Ulang tiap 10 menit; lewat 72 jam → failed_review | Website di subdomain; sebab tampil di halaman Domain | Admin: Cek Ulang |
| Pelanggan menghapus catatan DNS setelah terhubung | Probe gagal 3 kali berturut-turut (30 menit) | Host kanonik kembali ke subdomain; binding pending; email pemberitahuan | Website tetap tayang di subdomain | Otomatis saat DNS diperbaiki |
| Resend gagal atau kuota habis | 4xx, 5xx, 429, penghitung harian | Email tetap di antrean; ulang 1, 5, 15, 60 menit; prioritas rendah ditunda (NTF-010) | Email terlambat; info tetap ada di dashboard | Otomatis |
| R2 tidak tersedia | Galat baca/tulis | Website disajikan dari cache edge bila ada, selain itu halaman 503 umum; unggah ditolak 503 | “Sistem sedang sibuk” | Otomatis |
| Antrean terlambat atau pesan > 24 jam hilang | Umur outbox pending | Dispatcher membuat ulang pesan dari outbox | Aktivasi lebih lambat | Otomatis + peringatan bila ≥ 80% kuota |
| Worker mati di tengah pekerjaan | lease_until lewat | Pekerjaan diambil worker lain; setiap langkah idempoten atau CAS | — | Otomatis |
| Crash di antara update database dan edge | desired_mapping_revision ≠ active_mapping_revision | Rekonsiliasi tiap 5 menit menyamakan penunjuk edge | — | Otomatis |
| Turnstile tidak tersedia | Verifikasi gagal karena layanan | Formulir menolak (gagal tertutup) dan menawarkan tombol WhatsApp | “Formulir sedang gangguan, hubungi lewat WhatsApp” | Otomatis |
| Penjadwal terlewat | Waktu putaran terakhir yang sukses | Putaran berikutnya mengejar ambang yang terlewat | — | Otomatis |
| Maps Embed API gagal atau kunci ditolak | Iframe galat | Ilustrasi peta dan tombol Petunjuk Arah tetap tampil | Alamat dan tombol arah tetap bisa dipakai | Otomatis; admin memeriksa kunci |
| Platform mati | Pemantau uptime | Halaman status (di-host terpisah) menampilkan gangguan | Kabar resmi di status.mangelek.com | Otomatis + insiden manual |
| Penahan kursi gagal di tengah | Transaksi gagal | Tidak ada kursi held tanpa pemilik; tahanan lama lewat 30 menit dilepas penjadwal | “Coba lagi” | Otomatis |

9.4 Pengecualian proses bisnis

| Situasi | Aturan | Hasil |
| --- | --- | --- |
| Dua pembayaran lunas untuk order yang sama | Satu periode; pembayaran kedua masuk daftar rekonsiliasi | Refund manual ≤ 7 hari kerja |
| Jumlah dibayar berbeda dari total | Tidak dianggap lunas; peringatan admin | Admin menghubungi pelanggan |
| settlement terverifikasi tiba setelah order kedaluwarsa | Uang sudah diterima → order ditandai paid dan fulfillment berjalan; bila domain sudah tidak tersedia → refund bagian domain | Pelanggan tidak dirugikan |
| Chargeback | Status chargeback; peringatan admin; tidak ada penangguhan otomatis | Admin memutuskan (BRU-13 bila penipuan) |
| Domain ternyata tidak tersedia saat registrasi | Gagal pasti → failed_review, refund bagian domain, tawaran beli nama lain | Website tetap di subdomain |
| Nama usaha menghasilkan slug kosong atau kata cadangan | Slug cadangan usaha- + 6 karakter acak | Alamat tetap unik |
| Sesi habis saat menyimpan draf | Perubahan disimpan lokal; setelah login dikirim ulang dengan etag lama | Konflik ditangani EDT-006 bila perlu |
| Pelanggan yang berhenti lalu membayar perpanjangan | Penanda berhenti dihapus | Langganan berlanjut normal |
| Tenant ditangguhkan membayar perpanjangan | Periode tercatat; website tetap nonaktif (RB-11) | Admin memutuskan pemulihan |
| Email notifikasi lead terpental | Masuk email_suppressions; lead tetap tersimpan | Spanduk “Perbaiki email notifikasi” |
| Refund melebihi sisa pembayaran | Ditolak E-VALIDATION | Admin memperbaiki jumlah |
| Coba ulang admin untuk pekerjaan yang sudah sukses di provider | Ditandai selesai tanpa memanggil ulang | Tidak ada efek ganda |
| Dua tenant menahan kursi Eksklusif terakhir bersamaan | Kunci baris template; yang kedua E-SEAT-UNAVAILABLE | Tidak ada kursi ke-11 |
| Perpanjangan dengan perubahan terjadwal tidak dibayar | Perubahan tetap scheduled sampai H+7, lalu cancelled dan kursi dilepas | Langganan ikut siklus tenggang biasa |
| Template baru tidak punya padanan blok | Blok disimpan tersembunyi 2 periode (RB-24) | Isi tidak hilang; pelanggan bisa memindahkannya |
| Persetujuan admin kedaluwarsa | Status expired setelah 7 hari; aksi tidak dijalankan | Peminta mengajukan ulang |
| Permintaan hak data mendekati tenggat | Peringatan admin saat sisa 12 jam | Jawaban ≤ 3×24 jam |
| Dua lead dari email yang sama tiba bersamaan | Upsert dengan UNIQUE parsial (site_id, email_norm); yang kalah membaca ulang dan menautkan | Satu kontak, dua entri linimasa |
| Kontak punya email dan telepon yang cocok dengan dua kontak berbeda | Ditautkan ke kontak yang cocok email; saran Gabungkan tampil di kedua kontak | Tidak ada penggabungan otomatis yang salah |
| Otomasi memicu dirinya sendiri (tahapan berubah → ubah tahapan) | Batas kedalaman 1 dan kunci idempoten (aturan, peristiwa) | Tidak ada loop |
