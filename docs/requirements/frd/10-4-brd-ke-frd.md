<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

10.4 Matriks keterlacakan BRD → FRD → test case

Tujuan bisnis (BO)

| BRD | Kebutuhan bisnis | Kebutuhan FRD | Use case | Test case |
| --- | --- | --- | --- | --- |
| BO-01 | Alur otomatis selesai | DOM-007–009; LEAD-004–005; PAY-006–009; PRV-001–007 | UC-03, UC-04, UC-10, UC-14, UC-19, UC-20 | TC-ACC-011; TC-DOM-007–009; TC-E2E-001; TC-ERR-003; TC-LEAD-004–005; TC-MIG-002; TC-PAY-006–009, 101–102, 106–108, 113; TC-PRV-001–005 |
| BO-02 | Pelanggan mandiri | EDT-014; ONB-001–007 | UC-05, UC-06 | TC-EDT-014; TC-ONB-001–006; TC-UAT-001 |
| BO-03 | Pendapatan dimulai | ADM-002; PAY-001–012; SITE-001; SUB-004 | UC-03, UC-04, UC-12, UC-14, UC-16, UC-19, UC-20, UC-21 | TC-ADM-002; TC-ERR-003; TC-MIG-002; TC-PAY-001–012, 101–104, 106–113; TC-SITE-001; TC-SUB-004 |
| BO-04 | MRR | ADM-002, 022; PAY-001–012; SUB-004; TIER-001 | UC-01, UC-03, UC-04, UC-12, UC-14, UC-16, UC-19, UC-21 | TC-ADM-002, 022; TC-ERR-003; TC-MIG-002; TC-PAY-001–012, 101–104, 106–113; TC-SUB-004; TC-TIER-001 |
| BO-05 | Modal aman | NTF-010 | — | TC-NTF-010 |
| BO-06 | Akuisisi hemat | ADM-002, 012; MKT-009 | UC-01, UC-02, UC-16 | TC-ADM-002, 012; TC-MKT-009 |
| BO-07 | Churn ≤ 5% | ADM-002; NTF-005; SUB-004–007 | UC-12, UC-14, UC-16, UC-21 | TC-ADM-002; TC-NTF-005; TC-SUB-004–007 |
| BO-08 | Aktivasi instan | DOM-007–008; PRV-004 | UC-04 | TC-DOM-007–008; TC-PRV-001 |
| BO-09 | Onboarding mudah | ADM-002; NTF-003; ONB-001–006 | UC-05, UC-16 | TC-ADM-002; TC-NTF-003; TC-ONB-001–005 |
| BO-10 | Dukungan ringan | ADM-013; ONB-007; STS-001 | UC-05, UC-25, UC-26 | TC-ADM-013; TC-NFR-024; TC-ONB-006; TC-STS-001 |
| BO-11 | Nilai bagi pelanggan | ADM-002; CRM-006–007, 015; LEAD-001–008, 011; NTF-007 | UC-10, UC-11, UC-15, UC-16, UC-27, UC-28 | TC-ADM-002; TC-CRM-006–007, 015; TC-E2E-005; TC-LEAD-001–008, 011; TC-NTF-007; TC-SEC-003 |
| BO-12 | Konversi pendaftar | ADM-002, 012; MKT-009 | UC-01, UC-02, UC-16 | TC-ADM-002, 012; TC-MKT-009 |
| BO-13 | Porsi Premium + Eksklusif ≥ 30% | ADM-002, 022; MKT-011; TIER-001, 003 | UC-01, UC-16, UC-19 | TC-ADM-002, 022; TC-MKT-011; TC-TIER-001, 003 |
| BO-14 | Website lulus Core Web Vitals | BLK-010–011; MKT-010; PUB-007 | UC-01, UC-07, UC-09 | TC-BLK-010–011; TC-MIG-004; TC-MKT-010; TC-PUB-006; TC-SEC-009 |

Kebutuhan fungsional BRD

| BRD | Kebutuhan bisnis | Kebutuhan FRD | Use case | Test case |
| --- | --- | --- | --- | --- |
| FR-01 | Melihat tingkat, harga, template | MKT-001–003, 011 | UC-01, UC-19 | TC-MIG-001, 004, 006; TC-MKT-001–003, 011 |
| FR-02 | Mencoba template | MKT-004–005 | UC-01 | TC-MKT-004–005 |
| FR-03 | Cari domain + total harga | DOM-001–002, 004; PAY-001 | UC-03, UC-19 | TC-DOM-001–002, 004; TC-PAY-001 |
| FR-04 | Hubungkan domain sendiri | DOM-005, 010–011 | UC-03, UC-09 | TC-DOM-005, 010–011 |
| FR-05 | Akun email/Google + verifikasi | ACC-001–004, 008–009; PAY-003 | UC-02, UC-03 | TC-ACC-001–004, 008–009; TC-PAY-003 |
| FR-06 | Satu checkout Midtrans per website | PAY-002–004, 010, 012 | UC-03, UC-12, UC-14, UC-19 | TC-PAY-002–004, 010, 012, 103–104, 110–112 |
| FR-07 | Website otomatis setelah lunas | PRV-001–004 | UC-04, UC-19, UC-20 | TC-PRV-001–002 |
| FR-08 | Domain otomatis + HTTPS | DOM-007–008 | UC-04 | TC-DOM-007–008 |
| FR-09 | Wizard onboarding | ONB-001–004 | UC-05 | TC-ONB-001–003 |
| FR-10 | Edit klik-untuk-ubah + simpan cloud | EDT-001–002, 005–010, 015–016, 018–019 | UC-06, UC-22 | TC-EDT-001–002, 005–010, 015–016, 018–019; TC-MIG-003, 005, 010; TC-SEC-003 |
| FR-11 | Terbitkan + pulihkan | PUB-001, 004–006 | UC-07 | TC-PUB-001, 004–005, 011 |
| FR-12 | Unggah gambar | MED-001–003, 005–006 | UC-05, UC-08 | TC-MED-001–002, 004–005 |
| FR-13 | Tombol WhatsApp + formulir | LEAD-001–002; ONB-005 | UC-05, UC-10 | TC-LEAD-001–002; TC-ONB-004 |
| FR-14 | Lead ke email pemilik | CRM-001; LEAD-004–005, 007–008, 010 | UC-10, UC-11, UC-27 | TC-CRM-001; TC-E2E-005; TC-LEAD-004–005, 007–008, 010; TC-NFR-025; TC-SEC-003 |
| FR-15 | Status langganan, tingkat, domain, riwayat | PAY-011; SUB-010 | UC-03, UC-12, UC-13 | TC-PAY-011, 109; TC-SUB-010 |
| FR-16 | Tagih, ingatkan, nonaktif, aktif kembali | PAY-012; SUB-001–002, 004 | UC-03, UC-04, UC-12, UC-18, UC-21 | TC-ERR-003; TC-PAY-012, 111, 114; TC-SUB-001–002, 004 |
| FR-17 | Berhenti sendiri | SUB-009 | UC-13 | TC-SUB-009 |
| FR-18 | Privasi, syarat, lisensi, persetujuan | LEAD-002, 006; LGL-001–002 | UC-02, UC-10 | TC-ACC-001; TC-LEAD-002, 006; TC-LGL-001–002; TC-MKT-001 |
| FR-19 | Kunjungan dan klik | ANL-001–004; LEAD-011 | UC-15 | TC-ANL-001–004; TC-LEAD-011 |
| FR-20 | Panel admin berperan | ADM-001–006, 014, 017 | UC-16, UC-17, UC-18, UC-24 | TC-ADM-001–006, 014, 017; TC-SEC-008 |
| FR-21 | 8 template saat peluncuran | ADM-010; MKT-003, 010 | UC-01 | TC-ADM-010; TC-MIG-004; TC-MKT-003, 010 |
| FR-22 | Tagih otomatis kartu/GoPay (Fase 2) | PAY-016 | UC-12 | TC-PAY-016 |
| FR-23 | CRM inti: kotak masuk, pipeline, linimasa, tugas, balas cepat | CRM-001–009; LEAD-010 | UC-11, UC-27 | TC-CRM-001–009; TC-E2E-005; TC-LEAD-010; TC-NFR-025 |
| FR-24 | SEO dasar + LocalBusiness | EDT-011, 020 | UC-06, UC-07 | TC-EDT-011, 020 |
| FR-25 | Ajak teman (Fase 2) | REF-001–002 | — | TC-REF-001–002 |
| FR-26 | Transfer domain masuk (ditunda) | DOM-019 | — | — (Won’t, tidak diuji) |
| FR-27 | Refund otomatis (ditunda; diganti refund manual) | PAY-013, 017 | UC-17, UC-24 | TC-PAY-013, 105 |
| FR-28 | Asisten AI (ditunda) | EDT-017 | — | — (Won’t, tidak diuji) |
| FR-29 | Akun staf pelanggan (ditunda) | ACC-012 | — | — (Won’t, tidak diuji) |
| FR-30 | Banyak website per akun | PAY-003; PRV-001; SITE-001–006 | UC-03, UC-04, UC-19, UC-20 | TC-MIG-009; TC-PAY-003, 114; TC-PRV-001; TC-SEC-007; TC-SITE-001–006 |
| FR-31 | Tiga tingkat dan kursi Eksklusif | MKT-003, 005, 011; PAY-002; TIER-001–003, 006 | UC-01, UC-03, UC-19 | TC-MIG-004; TC-MKT-003, 005, 011; TC-PAY-002, 110, 112; TC-TIER-001–003, 006 |
| FR-32 | Ganti template/tingkat periode berikutnya | SUB-011, 013–014 | UC-12, UC-21 | TC-PAY-113; TC-SUB-011, 013–014 |
| FR-33 | Blok Lokasi + Petunjuk Arah | BLK-004–006; ONB-004 | UC-05, UC-22 | TC-BLK-004–006; TC-ONB-003 |
| FR-34 | Pustaka blok dan varian | BLK-001–003, 007–009; EDT-003 | UC-06, UC-22 | TC-BLK-001–003, 007–009; TC-EDT-003; TC-MIG-010 |
| FR-35 | WhatsApp per item | BLK-008; CRM-007; LEAD-012 | UC-10, UC-22, UC-27 | TC-BLK-008; TC-CRM-007; TC-E2E-005; TC-LEAD-012 |
| FR-36 | Animasi terkunci + versi ringan | BLK-010–011; MKT-004 | UC-01, UC-07 | TC-BLK-010–011; TC-MKT-004; TC-SEC-009 |
| FR-37 | Halaman status | STS-001–004 | UC-26 | TC-NFR-024; TC-STS-001–004 |
| FR-38 | Ekspor isi milik pelanggan | CRM-014; LEAD-008; LGL-005 | UC-11, UC-28 | TC-CRM-014; TC-LEAD-008; TC-LGL-005; TC-SEC-003 |
| FR-39 | Hak data ≤ 3×24 jam | ADM-024; CRM-009; LGL-007 | UC-23, UC-27 | TC-ADM-024; TC-CRM-009; TC-LGL-007 |
| FR-40 | Kontrol layanan admin | ADM-013, 018–019, 021 | UC-25, UC-26 | TC-ADM-013, 018–019, 021 |
| FR-41 | Laporan MRR per tingkat (Should) | ADM-002, 022 | UC-16 | TC-ADM-002, 022 |
| FR-42 | Laporan penyalahgunaan (Should) | ADM-020 | UC-18 | TC-ADM-020 |
| FR-43 | Voucher (Could) | ADM-023 | UC-03 | TC-ADM-023 |
| FR-44 | Maskot/ilustrasi khusus (Could, layanan tambahan) | — (layanan manual di luar sistem, Fase 2) | — | — |
| FR-45 | CRM lanjutan: nilai, label, field kustom, impor, laporan, atribusi (Should) | CRM-010–018 | UC-28 | TC-CRM-010–018 |
| FR-46 | Otomasi CRM sederhana (Should) | CRM-019 | UC-28 | TC-CRM-019 |
| FR-47 | Email, penawaran, skor, kampanye, janji temu (Could) | CRM-020–024 | — | TC-CRM-020–024 |
| FR-48 | Inbox WhatsApp API dan AI CRM (ditunda) | CRM-025 | — | — (Won’t, tidak diuji) |

Kebutuhan non-fungsional BRD (target terukurnya di Bagian 8)

| BRD | Kebutuhan bisnis | Kebutuhan FRD | Use case | Test case |
| --- | --- | --- | --- | --- |
| NFR-01 | Website cepat semua tingkat | BLK-011; MED-004; PUB-007 | UC-07, UC-08, UC-09 | TC-BLK-011; TC-MED-003; TC-NFR-001; TC-PUB-006; TC-SEC-009 |
| NFR-02 | Aktivasi setelah lunas | DOM-008 | UC-04 | TC-DOM-008; TC-NFR-002 |
| NFR-03 | Pencarian domain | — | — | TC-NFR-019 |
| NFR-04 | Ketersediaan 99,5% | PUB-003, 007 | UC-07, UC-09 | TC-ERR-002; TC-NFR-004; TC-PUB-003, 006 |
| NFR-05 | Pekerjaan diulang | ADM-005; NTF-011; PAY-009; PRV-006; SUB-012 | UC-03, UC-04, UC-10, UC-12, UC-14, UC-16 | TC-ADM-005; TC-ERR-002; TC-NFR-005; TC-NTF-011; TC-PAY-009, 101; TC-PRV-004; TC-SUB-012 |
| NFR-06 | Notifikasi ganda | PAY-008; PRV-005 | UC-03, UC-04, UC-14 | TC-ACC-011; TC-ERR-003; TC-NFR-018; TC-PAY-008, 101–102, 106, 113; TC-PRV-003 |
| NFR-07 | Isolasi data dan website | ACC-006–007; EDT-012; MED-003; PUB-009; SITE-004 | UC-02, UC-05, UC-06, UC-08, UC-09, UC-20 | TC-ACC-006–007; TC-EDT-012; TC-ERR-001; TC-MED-002; TC-MIG-009; TC-PUB-008; TC-SEC-001–003, 007; TC-SITE-004 |
| NFR-08 | Kunci rahasia | LGL-004; PAY-006 | UC-03, UC-04, UC-14 | TC-DOM-006; TC-LGL-004; TC-MIG-002; TC-PAY-006, 101, 106–107; TC-SEC-004 |
| NFR-09 | Formulir publik dibatasi | ACC-006; LEAD-003 | UC-02, UC-10 | TC-ACC-006; TC-LEAD-003; TC-SEC-006 |
| NFR-10 | Admin + MFA + peran | ADM-001, 014, 017 | UC-16, UC-24 | TC-ADM-001, 014, 017; TC-NFR-007; TC-SEC-008 |
| NFR-11 | Kemudahan non-teknis | EDT-007, 014; PUB-013 | UC-06, UC-07, UC-22 | TC-EDT-007, 014; TC-PUB-012; TC-UAT-001 |
| NFR-12 | 100% Bahasa Indonesia | — | — | TC-ERR-001; TC-NFR-010 |
| NFR-13 | Aksesibilitas WCAG 2.2 AA | BLK-003, 010; MED-007 | UC-01, UC-07, UC-08, UC-22 | TC-BLK-003, 010; TC-MED-006; TC-NFR-011, 021; TC-SEC-009 |
| NFR-14 | Data pribadi (PP 33/2026) | ACC-010; LEAD-006, 009; LGL-003–009; NTF-009 | UC-10, UC-11, UC-15, UC-23 | TC-ACC-010; TC-ANL-001; TC-DOM-006; TC-LEAD-006, 009; TC-LGL-003–009; TC-NFR-008, 022; TC-NTF-009; TC-SEC-004 |
| NFR-15 | Cadangan | — | — | TC-MIG-008; TC-NFR-006 |
| NFR-16 | Biaya tetap rendah | PUB-011 | UC-07 | TC-NFR-009; TC-PUB-010 |
| NFR-27 | Anggaran berat per tingkat | BLK-011; MKT-010 | UC-01, UC-07 | TC-BLK-011; TC-MIG-004; TC-MKT-010; TC-NFR-020; TC-SEC-009 |
| NFR-28 | Peta tanpa pihak ketiga sebelum klik | BLK-004; LGL-006 | UC-10, UC-22 | TC-ANL-001; TC-BLK-004; TC-LGL-006; TC-NFR-022 |
| NFR-29 | Log audit admin | ADM-008 | UC-17, UC-18, UC-25 | TC-ADM-008; TC-NFR-023 |
| NFR-30 | Halaman status terpisah | STS-001 | UC-26 | TC-NFR-024; TC-STS-001 |
| NFR-31 | Aset template di-host sendiri | BLK-010; EDT-012 | UC-01, UC-06, UC-07 | TC-BLK-010; TC-EDT-012; TC-SEC-009 |
| NFR-32 | Kinerja CRM | CRM-001, 003 | UC-27 | TC-CRM-001, 003; TC-E2E-005; TC-NFR-025 |

Aturan bisnis BRD

| BRD | Kebutuhan bisnis | Kebutuhan FRD | Use case | Test case |
| --- | --- | --- | --- | --- |
| BRU-01 | Banyak website; 1 website = 1 langganan + 1 domain | ACC-005, 011; PRV-005; SITE-005, 007 | UC-02, UC-03, UC-04, UC-20 | TC-ACC-005, 011; TC-MIG-009; TC-PAY-114; TC-PRV-003; TC-SITE-005, 007 |
| BRU-02 | Harga tiga tingkat | MKT-002; PAY-002; TIER-001 | UC-01, UC-03, UC-19 | TC-MIG-001; TC-MKT-002; TC-PAY-002, 110, 112; TC-TIER-001 |
| BRU-03 | Lunas dari notifikasi terverifikasi | PAY-005–007 | UC-03, UC-04, UC-14 | TC-MIG-002; TC-PAY-005–007, 101–102, 106–108 |
| BRU-04 | Pengingat H-7, H-1 | NTF-005; SUB-012 | UC-12, UC-14, UC-21 | TC-NTF-005; TC-SUB-012 |
| BRU-05 | Tenggang 7 hari | EDT-013; PUB-008; SUB-005–006 | UC-06, UC-12, UC-18 | TC-EDT-013; TC-PUB-007; TC-SUB-005–006 |
| BRU-06 | Aktif kembali; hapus H+30 | PUB-008; SUB-007–008 | UC-12, UC-18 | TC-PUB-007; TC-SUB-007–008 |
| BRU-07 | Aturan tanggal perpanjangan | SUB-002–003 | UC-04, UC-12 | TC-PAY-114; TC-SUB-002–003 |
| BRU-08 | Pelanggan = registran | DOM-006, 018 | UC-03 | TC-DOM-006, 018 |
| BRU-09 | Berhenti di akhir periode | SITE-005; SUB-009 | UC-13, UC-20 | TC-MIG-009; TC-PAY-114; TC-SITE-005; TC-SUB-009 |
| BRU-10 | Refund manual terbatas | ADM-004; DOM-009; PAY-013 | UC-04, UC-17, UC-24 | TC-ADM-004; TC-DOM-009; TC-PAY-013, 105 |
| BRU-11 | Batas gambar dan kuota | MED-001, 003; PRV-007 | UC-04, UC-05, UC-08 | TC-MED-001–002; TC-PRV-005 |
| BRU-12 | Batas bagian | EDT-003–004; PRV-007; PUB-002 | UC-04, UC-06, UC-07 | TC-EDT-003–004; TC-PRV-005; TC-PUB-002 |
| BRU-13 | Nonaktif pelanggar | ADM-007 | UC-18 | TC-ADM-007 |
| BRU-14 | Tagihan domain H-30, batas H-3 | DOM-014–015; NTF-005 | UC-12, UC-14, UC-21 | TC-DOM-014–015; TC-NTF-005 |
| BRU-15 | Harga domain dikunci | ADM-009; DOM-003, 007; PAY-002 | UC-03, UC-04, UC-19, UC-24 | TC-ADM-009; TC-DOM-003, 007; TC-PAY-002, 110, 112 |
| BRU-16 | Subdomain selalu ada | DOM-005, 012–013, 015; SITE-007 | UC-03, UC-09, UC-14, UC-20 | TC-DOM-005, 012–013, 015; TC-SITE-007 |
| BRU-17 | Ganti template periode berikutnya | NTF-005; SUB-004, 011, 013 | UC-12, UC-14, UC-21 | TC-NTF-005; TC-PAY-113; TC-SUB-004, 011, 013 |
| BRU-18 | Kursi Eksklusif | SUB-008; TIER-003–005, 007 | UC-12, UC-19, UC-21 | TC-PAY-112; TC-SUB-008; TC-TIER-003–005, 007 |
| BRU-19 | Lisensi: hanya isi diekspor | LGL-001, 005 | UC-02, UC-11 | TC-LGL-001, 005; TC-MKT-001 |
| BRU-20 | Animasi terkunci | BLK-010 | UC-01, UC-07 | TC-BLK-010; TC-SEC-009 |
| BRU-21 | Persetujuan dua orang | ADM-009, 015 | UC-24 | TC-ADM-009, 015 |
| BRU-22 | Masking PII, impersonasi hanya-baca | ADM-003, 013, 016 | UC-16, UC-18, UC-25 | TC-ADM-003, 013, 016; TC-SEC-008 |
| BRU-23 | Hak data dan kebocoran ≤ 3×24 jam | ADM-024; CRM-009; LGL-003, 007–008 | UC-10, UC-23, UC-27 | TC-ADM-024; TC-CRM-009; TC-LGL-003, 007–008 |
| BRU-24 | Peta dimuat setelah klik | BLK-004; LGL-006 | UC-10, UC-22 | TC-ANL-001; TC-BLK-004; TC-LGL-006; TC-NFR-022 |
| BRU-25 | Kontak unik per website | CRM-002, 008, 014 | UC-27, UC-28 | TC-CRM-002, 008, 014 |
| BRU-26 | Persetujuan pemasaran terpisah | CRM-009, 023 | UC-27 | TC-CRM-009, 023 |
| BRU-27 | Nol biaya fitur dan desain | BLK-004, 010–011; CRM-007, 017, 021 | UC-01, UC-07, UC-22, UC-27, UC-28 | TC-BLK-004, 010–011; TC-CRM-007, 017, 021; TC-E2E-005; TC-SEC-009 |
