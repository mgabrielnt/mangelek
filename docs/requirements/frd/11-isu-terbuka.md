<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

11. Persetujuan dan isu terbuka

11.1 Persetujuan

| Peran | Nama | Keputusan | Tanggal | Catatan |
| --- | --- | --- | --- | --- |
| Pemilik bisnis dan developer | Gab (Mangelek Gabriel Nicholas Tambun) | Belum ditinjau |  |  |

11.2 Isu terbuka

| ID | Yang perlu diputuskan | Dampak bila belum diputuskan | Kebutuhan terdampak | Batas waktu |
| --- | --- | --- | --- | --- |
| IT-01 | Mencatat klarifikasi BRU-12 (maks 20 bagian per halaman dan 20 halaman per website) di BRD v3.1 lewat kontrol perubahan | BRD dan FRD berbeda; menurut kedudukan dokumen, BRD yang berlaku | FR-EDT-003, FR-EDT-004, FR-PUB-002; V-20 | Sebelum Sprint 2 |
| IT-02 | Mengesahkan jadwal retensi berlabel usulan di Bagian 7.5, termasuk arsip audit_events sampai 5 tahun | Pekerjaan purge dan arsip tidak punya angka final | FR-ADM-008, FR-SUB-008; NFR-14 | Sebelum G1 |
| IT-03 | Mengesahkan target RPO dan RTO usulan di Bagian 7.6 | TC-NFR-006 dan TC-MIG-008 tidak punya ambang lulus resmi | NFR-15 | Sebelum G1 |
| IT-04 | Menerapkan selisih Bagian 3.5 ke OpenAPI v5.3 dan kamus data v5.3 | Uji kontrak (TC-NFR-015, TC-ERR-001) memakai kontrak lama | Semua modul dengan endpoint baru atau berubah | Sebelum Sprint 2 |
| IT-05 | Memverifikasi asumsi AF-01 s.d. AF-10 di Bagian 3.4, termasuk persetujuan tiga tingkat harga (AF-07) | Setiap asumsi yang gugur memicu dampak yang tertulis di tabel 3.4 | Lihat kolom dampak tabel 3.4 | Sesuai kolom tenggat tabel 3.4 |
| IT-06 | Harga reseller per ekstensi dan apakah deposit Rp250.000 langsung bisa dipakai lewat API (BRD 18.1) | Harga jual domain dan margin belum final; quote bisa salah | FR-DOM-002, FR-DOM-003, FR-ADM-009; BRU-15 | Sebelum Sprint 6 |
| IT-07 | Apakah pendaftaran .my.id lewat reseller butuh dokumen tambahan dari pelanggan (BRD 18.1) | Alur checkout mungkin perlu langkah unggah dokumen | FR-DOM-005, FR-DOM-006, FR-DOM-007; UC-03 | Sebelum Sprint 6 |
| IT-08 | Metode pembayaran yang aktif di akun Midtrans perorangan Gab (BRD 18.1, AF-02) | Snap mungkin hanya menawarkan satu metode | FR-PAY-004; TC-PAY-101–111 | Sebelum Sprint 2 |
| IT-09 | Apakah Mangelek wajib mendaftar PSE lingkup privat, dan kapan (BRD 18.1) | Peluncuran publik bisa tertahan kewajiban pendaftaran | FR-LGL-001 s.d. FR-LGL-003; D-08 | Sebelum G1 |
| IT-10 | Persetujuan program ajak teman: 1 bulan gratis untuk kedua pihak (BRD 18.1) | FR-REF tetap tidak dibangun | FR-REF-001, FR-REF-002 | Sebelum Fase 2 |
| IT-11 | Langkah editor yang paling membingungkan pilot (BRD 18.1) | Perbaikan UX editor belum punya data | FR-EDT-014, FR-ONB-002; TC-UAT-001 | Saat pilot, sebelum G1 |
| IT-12 | Membuat kunci Maps Embed API dengan pembatasan API dan memutuskan perlu tidaknya pembatasan referer untuk domain pelanggan | Peta sematan tidak bisa diuji; hanya ilustrasi peta + Petunjuk Arah | FR-BLK-004; AF-08; NFR-28 | Sebelum Sprint 7 |
| IT-13 | Daftar kota/kabupaten (kode wilayah) untuk aturan kursi dan wizard | Aturan 1 per kategori per kota tidak bisa ditegakkan | FR-TIER-003, FR-TIER-004, FR-ONB-002; V-21; RB-26 | Sebelum Sprint 2 |
| IT-14 | Rubrik mutu template: penilai (Gab + 1 penilai luar) dan contoh skor acuan | Gerbang D-11 subjektif | FR-MKT-010; D-11 | Sebelum Sprint 7 |
| IT-15 | Perjanjian pemrosesan data dengan Supabase, Cloudflare, Resend, Midtrans dan penilaian transfer ke luar negeri (PP 33/2026) | Kebijakan privasi belum lengkap saat PP 33/2026 berlaku 16 Jan 2027 | FR-LGL-003, FR-LGL-009; NFR-14 | Sebelum 16 Jan 2027 |
