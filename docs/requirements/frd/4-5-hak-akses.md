<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

4.5 Hak akses per peran

Matriks peran pengguna (Ya = diizinkan; Milik sendiri = hanya baris tenant sendiri dan website terpilih; ADM = operator dengan izin yang sesuai di matriks admin; — = ditolak)

| Kemampuan | PEN | PWU | PEL | ADM | SIS |
| --- | --- | --- | --- | --- | --- |
| Melihat halaman publik, harga, template | Ya | Ya | Ya | Ya | — |
| Mencari domain (harga perkiraan) | Ya | — | Ya | Ya | — |
| Mendaftar dan masuk | Ya | — | Ya | Login admin terpisah + MFA | — |
| Membaca dan mengubah profil | — | — | Milik sendiri | Baca | — |
| Membuat quote dan order, membayar | — | — | Milik sendiri | — | — |
| Membaca order, invoice, langganan | — | — | Milik sendiri | Semua tenant | Tulis |
| Berhenti atau melanjutkan langganan | — | — | Milik sendiri | — | — |
| Menulis periode, payment_events, status order | — | — | — | Lewat Rekonsiliasi | Ya |
| Mencatat refund | — | — | — | Ya (MFA, alasan) | — |
| Membaca dan mengubah draf, CMS, media | — | — | Milik sendiri, saat active | Baca 60 menit dengan alasan (Could) | Saat provisioning |
| Menerbitkan dan rollback | — | — | Milik sendiri, saat active | — | Release pertama |
| Membaca website terbit | Ya | Ya | Ya | Ya | — |
| Menghubungkan atau melepas hostname | — | — | Milik sendiri | Cek Ulang | Verifikasi |
| Transfer domain keluar | — | — | Meminta | Memproses | — |
| Mengirim formulir kontak | — | Ya (token + host cocok) | — | — | — |
| Membaca, mengekspor, menghapus lead | — | — | Milik sendiri | Jumlah saja (RB-13) | Simpan + email |
| Melihat analitik | — | — | Milik sendiri | Agregat semua tenant | Merekam |
| Ringkasan, pelanggan, pekerjaan, domain, audit | — | — | — | Ya (MFA) | — |
| Menangguhkan atau memulihkan tenant | — | — | — | Ya + alasan | — |
| Mengubah harga, TLD, template | — | — | — | Ya | — |
| Menulis audit, outbox, pekerjaan, notifikasi | — | — | — | — | Ya (hanya tambah untuk audit) |

Matriks izin admin (L = lihat, K = kelola, S = setujui aksi orang lain, X = buka data pribadi dengan alasan; — = ditolak). Peran bertanda * aktif di MVP; peran lain disiapkan dan diaktifkan Pemilik saat ada staf.

| Kemampuan | Pemilik* | Operasional | Keuangan* | Dukungan* | Template & Konten | Pemasaran | Auditor |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ringkasan bisnis dan laporan | L | L (operasi) | L | L (tanpa keuangan) | — | L (agregat) | L |
| Pelanggan dan website (tersamar) | K | L | L | K | L (yang dimoderasi) | — | L |
| Membuka data pribadi | X | — | X | X | — | — | — |
| Tampilan hanya-baca pelanggan (≤ 60 menit) | K | — | — | K | — | — | — |
| Pesanan, pembayaran, invoice | L | — | K | L | — | — | L |
| Refund ≤ Rp200.000 | K | — | K | — | — | — | — |
| Refund > Rp200.000, pembayaran manual, ekspor massal, hapus permanen | S | K (ajukan hapus) | K (ajukan) + S | — | — | — | — |
| Hari gratis ≤ 30 hari, kirim ulang email atau tautan bayar | K | — | K | K | — | — | — |
| Pekerjaan gagal dan coba ulang | K | K | — | L | — | — | L |
| Domain dan tindakan domain manual | K | K | — | L | — | — | L |
| Tangguhkan atau pulihkan website | K | K | — | — | K | — | — |
| Laporan penyalahgunaan | K | L | — | L | K | — | L |
| Katalog template dan kursi Eksklusif | K | — | — | L | K | L | — |
| Harga dan TLD | K + S | — | K (ajukan) | — | — | — | L |
| Voucher (Fase 2) | S | — | L | — | — | K | L |
| Feature flag dan mode pemeliharaan | K | K | — | — | — | — | L |
| Halaman status | K | K | — | L | — | — | L |
| Permintaan hak data dan insiden | K | L | — | K | — | — | L |
| Operator dan peran | K | — | — | — | — | — | L |
| Isi CRM pelanggan (kontak, peluang, catatan) | — | — | — | — (hanya jumlah agregat) | — | — | — |
| Log audit | L | — | — | — | — | — | L |

Kemampuan pelanggan menurut status (berlaku per website)

| Kemampuan | pending | active | active + berhenti | grace | suspended | expired (> H+30) | Tenant ditangguhkan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Website publik | Belum ada | Tayang | Tayang sampai H | Tayang | Halaman nonaktif (503) | 404 (dihapus) | Halaman nonaktif (503) |
| Edit draf, media, CMS | — | Ya | Ya | Hanya-baca | Hanya-baca | — | Hanya-baca |
| Terbitkan, rollback | — | Ya | Ya | — | — | — | — |
| Beli atau hubungkan domain | — | Ya | Ya | — | — | — | — |
| Formulir menerima lead | — | Ya | Ya | Ya | — | — | — |
| Baca dan ekspor lead | — | Ya | Ya | Ya | Ya | — (dihapus) | Ya |
| Membayar | Order website baru | Perpanjang lebih awal | Ya (menghapus berhenti) | Ya | Ya | Order baru (website baru) | Tercatat, website tetap nonaktif |
| Berhenti berlangganan | — | Ya | Batalkan berhenti | — | — | — | — |
| Jadwalkan ganti template/tingkat | — | Ya | — | — | — | — | — |
| Email tagihan | Rangkaian belum bayar | H-7, H-1 | Pemberitahuan tanggal berakhir | H+1, H+7 | Win-back H+14, H+28 | — | — |
