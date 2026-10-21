<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

8. Kebutuhan non-fungsional

| ID | Kategori | Kebutuhan | Target terukur | Cara uji | Kapan |
| --- | --- | --- | --- | --- | --- |
| NFR-01 | Performa | Website pelanggan cepat di semua tingkat | Core Web Vitals p75: LCP ≤ 2,5 detik, INP ≤ 200 ms, CLS ≤ 0,1; berat halaman utama ≤ 1 MB (Standar), ≤ 1,5 MB (Premium), ≤ 2 MB (Eksklusif) pada profil Slow 4G | Lighthouse ponsel pada 8 template; data lapangan web-vitals setelah G1 | Sebelum template dirilis |
| NFR-02 | Performa | Aktivasi setelah lunas | Website ≤ 5 menit; domain baru ≤ 24 jam | paid_at vs aktivasi release / verified_at binding | D-01, D-05 |
| NFR-03 | Performa | Pencarian domain | p90 ≤ 3 detik | 50 pencarian beruntun di staging | Sprint 6 |
| NFR-22 | Performa | Respons API | p95 baca ≤ 500 ms, tulis ≤ 1.000 ms (di luar waktu vendor); webhook dibalas ≤ 5 detik | Uji beban kecil 20 pengguna serentak | Sprint 3 |
| NFR-23 | Performa | Editor | Interaktif ≤ 3 detik di ponsel kelas menengah 4G; simpan draf p95 ≤ 1 detik; terbit ≤ 60 detik | Pengukuran di staging | Sprint 3 |
| NFR-04 | Ketersediaan | Website pelanggan dapat dibuka | ≥ 99,5% per bulan (≤ 3 jam 39 menit gangguan) | Pemantau uptime eksternal tiap 5 menit pada 3 website | Bulanan setelah G1 |
| NFR-05 | Keandalan | Pekerjaan otomatis pulih sendiri | ≥ 3 kali ulang; gagal permanen tampil di panel admin ≤ 15 menit; tidak ada pekerjaan hilang saat worker mati | Kegagalan buatan pada provisioning, domain, email, publish | D-01, D-05 |
| NFR-06 | Keandalan | Notifikasi ganda atau tak berurutan | Tidak menambah masa aktif atau mendaftarkan domain dua kali | 11 skenario billing-setup.md + TC-PAY | D-06 |
| NFR-15 | Keandalan | Cadangan dan pemulihan | RPO/RTO di Bagian 7.6 | Uji pulih ke proyek kosong | Sebelum G1, lalu kuartalan |
| NFR-07 | Keamanan | Isolasi data antar pelanggan | Akun A tidak bisa membaca/mengubah data akun B lewat UI, API, URL media, cache, pratinjau, ekspor | Uji A/B otomatis di CI untuk setiap tabel dan endpoint | D-07, setiap rilis |
| NFR-08 | Keamanan | Kunci rahasia | Hanya di server; rotasi tiap 6 bulan atau saat diduga bocor | Pemindaian pola kunci di bundle browser dan riwayat git | Setiap rilis |
| NFR-09 | Keamanan | Pembatasan penyalahgunaan | Login (ACC-006), formulir (LEAD-003), cari domain 30/menit/IP, API 120 permintaan/menit/pengguna, unggah 30/jam/site | Skrip beban kecil | Sprint 4 dan 6 |
| NFR-10 | Keamanan | Akses admin | Akun terpisah + TOTP; sesi 8 jam; habis setelah 30 menit tidak aktif; izin per peran diperiksa di server | Uji masuk tanpa TOTP + matriks izin (TC-SEC-008) | Sprint 8 |
| NFR-21 | Keamanan | Pengerasan aplikasi web | Kontrol OWASP ASVS Level 2 yang relevan; CSP ketat; HSTS; X-Content-Type-Options; Referrer-Policy: strict-origin-when-cross-origin; frame-ancestors 'none' kecuali pratinjau; cookie Secure, HttpOnly, SameSite=Lax; perlindungan CSRF; audit dependensi mingguan | Pemindai header + daftar periksa ASVS | Sebelum G1 |
| NFR-14 | Kepatuhan | Data pribadi (UU PDP, PP 33/2026) | Kebijakan privasi, persetujuan tercatat, IP di-hash, tanpa data kartu/kredensial, log tersamarkan; hak data dan notifikasi kebocoran ≤ 3×24 jam; catatan pemrosesan; daftar sub-prosesor dan transfer luar negeri | Daftar periksa LGL-001 s.d. LGL-009 + latihan insiden | D-08, sebelum 16 Jan 2027 |
| NFR-16 | Skalabilitas | Biaya tetap rendah saat tumbuh | Biaya infrastruktur per pelanggan < 15% harga setelah pelanggan ke-30 | Laporan biaya bulanan vs jumlah pelanggan | Bulanan setelah G2 |
| NFR-24 | Skalabilitas | Kapasitas rancangan | 100 tenant dan 1.000 kunjungan/hari/website tanpa perubahan arsitektur; peringatan saat pemakaian paket gratis ≥ 80% (Workers, Queues, R2, Resend) | Dasbor vendor + peringatan ADM-011 | Mingguan |
| NFR-11 | Kemudahan | Pemilik non-teknis menyelesaikan website | 3 dari 3 pilot terbit tanpa bantuan; wizard selesai ≤ 10 menit | Observasi pilot | Jan 2027 |
| NFR-12 | Bahasa | Antarmuka dan email | 100% Bahasa Indonesia; format Rp1.490.000, tanggal “20 Okt 2026”, label WIB/WITA/WIT | Pemeriksaan string bahasa Inggris di build | Setiap rilis |
| NFR-13 | Aksesibilitas | Halaman utama, dashboard, dan template | WCAG 2.2 AA: kontras ≥ 4,5:1, fokus terlihat dan tidak tertutup (2.4.11), target sentuh ≥ 24×24 px (2.5.8), keyboard, animasi > 5 detik bisa dijeda (2.2.2), setelan kurangi gerakan dihormati, zoom 200% | axe DevTools + uji keyboard + TC-NFR-021 | Sebelum G1 |
| NFR-17 | Observabilitas | Jejak satu transaksi | correlation_id dari Midtrans sampai website tayang; log JSON tersamarkan; metrik pekerjaan per status | Telusuri satu order uji di log | Sprint 2 |
| NFR-18 | Kompatibilitas | Perangkat dan browser | Matriks di bawah | Uji manual + Playwright | Sebelum G1 |
| NFR-19 | Zona waktu | Jadwal | Email dan transisi memakai zona waktu site | Simulasi WIB/WITA/WIT | Sprint 5 |
| NFR-20 | Kualitas | Pengujian logika uang | Cakupan cabang 100% untuk tanggal (BRU-07), harga (BRU-02, BRU-15), tanda tangan, transisi status; uji kontrak OpenAPI v5.3; E2E alur inti di CI | Laporan cakupan CI | Setiap rilis |
| NFR-25 | Pemeliharaan | Rilis aman | CI (typecheck, lint, test, batas impor) wajib lulus; deploy bisa dikembalikan ≤ 10 menit; migrasi punya skrip balik | Latihan rollback | Sebelum G1 |
| NFR-26 | Portabilitas | Pelanggan bisa membawa data | Ekspor lead CSV dan isi ZIP (Must), tanpa aset template | TC-LEAD, TC-LGL | Sprint 4 |
| NFR-27 | Performa | Anggaran berat per tingkat | JavaScript terkompresi sebelum interaksi: Standar ≤ 50 KB, Premium ≤ 120 KB, Eksklusif ≤ 200 KB; animasi stabil 60 fps di ponsel uji | Pemeriksa anggaran di build + profil performa (TC-NFR-020) | Setiap rilis template |
| NFR-28 | Privasi | Peta pihak ketiga | 0 permintaan ke domain Google sebelum klik peta | Rekaman HAR (TC-NFR-022) | Sprint 7 |
| NFR-29 | Keamanan | Log audit admin | 100% aksi admin tercatat (siapa, apa, kapan, alasan); tidak dapat diubah; disimpan ≥ 12 bulan (FRD: 2 tahun + arsip) | TC-NFR-023 | Sprint 8 |
| NFR-30 | Ketersediaan | Halaman status | Tetap terbuka saat platform mati; pembaruan tampil ≤ 1 menit | TC-NFR-024 | Sprint 8 |
| NFR-31 | Keamanan | Aset template | Semua skrip dan aset animasi di-host sendiri; CSP tanpa skrip pihak ketiga; frame-src Google hanya untuk Maps Embed | Pemindai CSP + TC-SEC-005 | Setiap rilis template |
| NFR-32 | Performa | CRM tetap cepat saat data besar | Kotak masuk, kanban, dan pencarian kontak p95 ≤ 1 detik pada 5.000 kontak dan 1.000 peluang per website | TC-NFR-025 | Sprint 4 |

Kompatibilitas perangkat dan browser (NFR-18)

| Platform | Browser | Versi | Catatan |
| --- | --- | --- | --- |
| Android 9 ke atas | Chrome, Samsung Internet | 2 versi mayor terakhir | Prioritas utama; uji di layar 360 × 800 dengan RAM 3 GB |
| iOS 16 ke atas | Safari | 2 versi mayor terakhir | Unggah foto dari kamera dan galeri |
| Windows 10+, macOS | Chrome, Edge, Firefox, Safari (macOS) | 2 versi mayor terakhir | Editor dan panel admin |
| Browser dalam aplikasi | WhatsApp, Instagram, Facebook (webview) | Terbaru | Website pelanggan wajib berfungsi; checkout boleh meminta membuka browser utama |
| Tidak didukung | Internet Explorer, Opera Mini mode ekstrem | — | Website pelanggan tetap terbaca karena HTML statis; formulir membutuhkan JavaScript |
