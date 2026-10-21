<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

10.3 Test case dan penerimaan deliverable BRD (G1)

| Kelompok | Jumlah | Wajib G1 | Otomatis |
| --- | --- | --- | --- |
| Per fitur (TC-MKT-001 s.d. TC-CRM-024) | 235 | 183 | 223 |
| Pembayaran dan tingkat (TC-PAY-101–114) | 14 | 14 | 14 |
| Isolasi dan keamanan (TC-SEC) | 9 | 9 | 9 |
| End-to-end dan UAT (TC-E2E, TC-UAT) | 5 | 5 | 4 |
| Non-fungsional (TC-NFR) | 25 | 23 | 21 |
| Migrasi data (TC-MIG) | 10 | 10 | 9 |
| Penanganan error (TC-ERR) | 3 | 3 | 3 |
| Total | 301 | 247 | 283 |

Penerimaan deliverable BRD (gerbang G1)

| Deliverable | Diterima bila (BRD 6.3) | Test case | Bukti yang disimpan |
| --- | --- | --- | --- |
| D-01 Website otomatis | Bayar sandbox → website tayang ≤ 5 menit, 10 kali berturut-turut | TC-E2E-001; TC-NFR-002; TC-PRV-001 | Log 10 eksekusi berurutan dengan paid_at dan waktu release aktif |
| D-02 Editor cloud + Terbitkan | Perubahan tetap ada setelah browser ditutup; terbit ≤ 1 menit; versi lama bisa dipulihkan; undo/redo dan duplikat bagian berjalan | TC-EDT-005–007, 019; TC-PUB-001, 004 | Rekaman layar simpan lintas perangkat, undo/redo, waktu terbit, dan rollback |
| D-03 Formulir lead dan CRM inti | Isi formulir sampai email ≤ 2 menit dan masuk CRM sebagai kontak + peluang; spam dibatasi | TC-CRM-002; TC-E2E-001, 005; TC-LEAD-003, 005 | 20 waktu tiba email lead, log penolakan 429, rekaman alur lead sampai Menang |
| D-04 Siklus masa aktif | Simulasi memicu pengingat, tenggang, nonaktif, aktif kembali; ganti template terjadwal berlaku di periode berikutnya | TC-E2E-002; TC-NTF-005; TC-PAY-113; TC-SUB-003–007, 012–013 | Laporan simulasi tanggal H-7 s.d. H+30 per zona waktu |
| D-05 Domain otomatis | .my.id dan .com terdaftar, HTTPS ≤ 24 jam; domain luar bisa dihubungkan | TC-DOM-007–008, 010–012; TC-NFR-002 | Domain .my.id dan .com uji dengan waktu HTTPS aktif; 1 domain luar terhubung |
| D-06 Uji pembayaran | 11 skenario billing-setup.md + 3 skenario tingkat lulus | TC-PAY-101–114 | Laporan 14 skenario dengan id transaksi sandbox |
| D-07 Isolasi data | Akun A tidak bisa membaca/mengubah data B; website 1 dan 2 tidak tercampur | TC-EDT-001; TC-LEAD-007; TC-PAY-109; TC-SEC-001–003, 007; TC-SITE-004 | Laporan CI uji A/B dan antar website untuk setiap tabel dan endpoint |
| D-08 Halaman legal | Privasi, syarat (lisensi + perjanjian pemrosesan), dan prosedur hak data tayang | TC-LGL-001–003, 007, 009; TC-MKT-001 | Tangkapan layar halaman legal, /privasi, dan formulir hak data dengan versi |
| D-09 Pilot | 3 UMKM terbit sendiri | TC-EDT-014; TC-UAT-001 | Catatan observasi dan rekaman 3 pilot |
| D-10 Email otomatis | Rangkaian 12.5 terkirim sesuai pemicu | TC-NTF-001–008 | Log notification_deliveries simulasi akun uji |
| D-11 Template peluncuran | 6 Standar + 2 Premium lulus rubrik ≥ 7/10, Core Web Vitals, WCAG 2.2 AA, anggaran berat | TC-BLK-010–011; TC-MKT-010; TC-NFR-001, 011, 020–021 | Lembar skor rubrik, laporan Lighthouse dan axe per template |
| D-12 Multi-website | Website kedua dengan langganan, template, dan domain terpisah; pemilih website berfungsi | TC-E2E-004; TC-SITE-001, 003, 005, 007 | Rekaman alur tambah website dan laporan isolasi |
| D-13 Admin berperan | Pemilik, Dukungan, Keuangan sesuai matriks izin; aksi sensitif butuh persetujuan kedua | TC-ADM-001, 014–016; TC-SEC-008 | Laporan uji matriks izin dan contoh persetujuan |
| D-14 Halaman status | Status publik tampil dan diperbarui saat insiden uji | TC-NFR-024; TC-STS-001–002 | Tangkapan layar insiden uji saat platform dimatikan |
