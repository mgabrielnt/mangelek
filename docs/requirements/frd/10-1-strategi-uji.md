<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

10.1 Strategi dan lingkungan uji

| Level | Yang diuji | Alat | Lingkungan | Kapan | Jumlah TC |
| --- | --- | --- | --- | --- | --- |
| Unit | Fungsi murni: tanggal (BRU-07), harga, slug, validator V-01–V-20, transisi status | Vitest | CI | Setiap commit | 14 |
| Integrasi | API + Postgres/RLS, webhook, worker, penjadwal, adapter vendor mode uji | Vitest + Supabase CLI, mock reseller | CI dan staging | Setiap PR ke main | 129 |
| Kontrak | Respons API terhadap OpenAPI v5.3 dan format Error | Validator skema OpenAPI | CI | Setiap PR | 3 |
| E2E | Alur pengguna lintas halaman dan aplikasi | Playwright (Chromium, WebKit, emulasi ponsel) | Staging | Harian dan sebelum rilis | 91 |
| Keamanan | Isolasi A/B, ASVS L2, header, rahasia, XSS, batas penyalahgunaan | Playwright, skrip, gitleaks, pemindai header | CI dan staging | Setiap rilis | 39 |
| Performa | Core Web Vitals, waktu aktivasi, p90/p95 | Lighthouse CI, k6 skala kecil | Staging | Sprint terkait dan sebelum G1 | 12 |
| Manual | Hal yang butuh mata manusia atau perangkat nyata | Daftar periksa | Staging | Sebelum G1 | 11 |
| UAT pilot | 3 UMKM pilot menyelesaikan website sendiri | Observasi + rekaman | Staging | Januari 2027 | 2 |

Lingkungan dan data uji

| Lingkungan | Konfigurasi | Data uji |
| --- | --- | --- |
| CI | Supabase CLI dengan migrasi v5.3, mock Midtrans/reseller/Resend, jam yang bisa disuntik | Akun A dan B (B dengan 2 website), 8 template seed dari 2 tingkat + 1 Eksklusif uji, tabel uji tanggal dan harga, 7 operator admin uji (satu per peran) |
| Staging | Proyek Supabase staging, Midtrans sandbox, reseller mode uji atau deposit uji, zona Cloudflare staging, domain pengirim Resend uji, kunci Turnstile uji | 10 akun uji untuk D-01, domain .my.id dan .com uji (D-05), 15 pelanggan seed untuk ADM-002, kotak masuk Gmail uji |
| Staging + jam simulasi | Variabel NOW_OVERRIDE yang hanya aktif bila APP_ENV=staging; penjadwal bisa dipicu manual | Langganan dan domain di setiap ambang H-30 s.d. H+30, site di zona WIB, WITA, WIT |
| Produksi | Hanya uji asap setelah G1; tidak ada jam simulasi atau data uji | Halaman publik, webhook health, 3 website pilot |

Kriteria masuk, keluar, dan tingkat cacat

| Hal | Ketentuan |
| --- | --- |
| Masuk pengujian sprint | CI lulus; migrasi terbaru sudah diterapkan di staging; data seed tersedia; kebutuhan sprint punya AC |
| Keluar G1 | 100% test case wajib G1 lulus; Should yang sudah dibangun lulus; 0 cacat Kritis atau Tinggi terbuka; cacat Sedang punya tanggal perbaikan; bukti D-01 s.d. D-14 tersimpan |
| Kritis | Uang, masa aktif, atau domain salah; data tenant bocor; website pelanggan turun |
| Tinggi | Alur Must terhenti tanpa jalan lain |
| Sedang | Alur Must bisa diselesaikan lewat jalan lain; Should gagal |
| Rendah | Tampilan atau teks; tidak menghambat alur |
| Bukti | Setiap eksekusi mencatat tanggal, commit, lingkungan, hasil, dan tautan bukti (log, tangkapan layar, laporan) di kolom Status tab Matriks keterlacakan dan di docs/testing |
| Pengulangan | Cacat yang diperbaiki diuji ulang dengan TC yang gagal plus regresi E2E alur inti |
