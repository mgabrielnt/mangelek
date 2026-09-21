# Mangelek

<!-- impeccable:product-schema 1 -->

## Platform
web

## Product Purpose
Website bisnis dan CMS dalam satu langganan. Pengunjung mempelajari paket dan menjelajahi tema.

## Capabilities and Constraints
Pricing mempertahankan satu paket Website + CMS, enam fitur yang tercantum di src/data/pricing/features.ts, dan CTA ke /#templates. Pengguna menyetujui harga Rp200.000 per bulan. Persetujuan lanjutan 2026-09-20 menambahkan checkout terpisah dengan Rp200.000 per bulan atau Rp2.400.000 untuk 12 bulan, tanpa diskon dan tanpa perpanjangan otomatis. Jangan mengarang kuota atau trial. Komponen billing mendukung bulanan dan tahunan bila dikonfigurasi; nominal tahunan adalah total tagihan penuh. Domain dibayar terpisah. Storage tambahan dan AI hanya rencana.

## Brand Commitments
Bahasa Indonesia; merek Mangelek. Pengguna meminta pricing minimal dan premium dengan referensi React Bits Pricing 14, fungsi tetap, serta peningkatan responsif dan aksesibilitas.

## Evidence on Hand
Data pricing dan docs/decisions/2026-09-14-pricing.md. Instruksi lanjutan pengguna: jalankan implementasi dan seluruh skill yang diminta.

## Accessibility & Inclusion
Keyboard, fokus terlihat, target sentuh, layout mobile, dan reduced motion.

## Authentication
Halaman login, daftar, pemulihan kata sandi, dan akun memakai adapter Supabase Auth untuk email/password serta Google. Pengguna meminta implementasi dan melanjutkan dengan default integrasi tersebut. Login Google menggunakan identitas akun Google, tanpa akses kotak masuk Gmail. Proyek Supabase dan konfigurasi OAuth belum disediakan; aktivasi layanan dan pengujian provider langsung masih diperlukan. Halaman akun memverifikasi pengguna di server dan tidak mengimplementasikan dashboard CMS atau tenant; checkout dan status langganan tersedia pada route commerce terpisah.

## Blogs and Templates

`/blogs` dan empat halaman artikel menyajikan panduan asli berbahasa Indonesia tentang persiapan website, konten, domain, dan formulir kontak. Konten bersifat statis dalam `src/data/blogs.ts`, bukan integrasi CMS. Waktu baca dihitung dari panjang teks; tidak ada penulis, tanggal publikasi, atau metrik popularitas rekaan. Empat ilustrasi memakai aset repository yang sudah ada: website-editor, cms-dashboard, domain-management, dan business-dashboard.

`/templates` dan enam halaman detail menampilkan konsep Service Modern, Restaurant Premium, Company Profile, Beauty & Wellness, Property Showcase, dan Education Hub dari `src/data/templates.ts`. Dua kartu live demo memakai komposisi preview dengan foto baru; empat kartu konsep memakai gambar kategori lama tanpa modifikasi. Home tetap memakai seluruh gambar kategori yang sudah ada. Gambar katalog adalah konsep visual untuk diskusi, bukan tema terpasang. Company Profile, Beauty & Wellness, Property Showcase, dan Education Hub tetap berupa konsep; aksi keempat detail menuju `/?template=<id>#contact` mengisi konteks konsep di alur kontak yang sudah ada. Harga tetap Rp200.000 per bulan yang sebelumnya disetujui, dengan domain dibayar terpisah; paket tetap Website + CMS. Service Modern dan Restaurant Premium saja memiliki live demo, enam palet, tiga font pack, preview desktop/ponsel, dan aksi ke checkout.

Kedua perpustakaan menyimpan pencarian `q` dan kategori `kategori` dalam URL, menyediakan hasil kosong dan reset, serta mendukung keyboard, fokus terlihat, pengumuman jumlah hasil, dan reduced motion. Kontrak permukaan ada di `BLOG-DESIGN.md` dan `TEMPLATES-DESIGN.md`; dokumentasi visual menambahkan scope tanpa mengganti pricing, authentication, atau body Home.

## Preview, Commerce, and Home Navigation

Persetujuan 2026-09-20 menggantikan batas concept-only, monthly-only, dan no-checkout hanya untuk lingkup ini. Tepat dua demo interaktif berisi bisnis fiktif: Service Modern dan Restaurant Premium; empat kategori lain tetap konsep. Pilihan template, palet, dan font dipertahankan menuju checkout serta login. `/subscription` menampilkan status milik pengguna terverifikasi; query URL tidak membuktikan pembayaran.

Adapter hosted checkout Midtrans nonaktif tanpa konfigurasi environment dan memerlukan migration Supabase. Belum ada migration atau pembayaran nyata yang dijalankan dan belum ada integrasi provider/database yang diverifikasi. Aktivasi website, delivery CMS, refund, dan perpanjangan tidak otomatis; provisioning memerlukan tim Mangelek. Domain tetap terpisah. Lihat `../../docs/runbooks/billing-setup.md`.

Navbar Home diganti mega-menu full-width yang terinspirasi Squarespace; body Home tetap. Nama, salinan, dan aset Squarespace tidak dipakai. Font demo lokal berlisensi OFL dan dua foto Unsplash memiliki provenance di aset template. Verdict akhir untuk satu temuan konsistensi ikon: ship setelah koreksi SVG bersama; tujuh screenshot browser, build production, dan 24 tes lulus. Ini bukan verifikasi pembayaran langsung atau pengujian ponsel fisik.


## Home and Subscription Correction — 2026-09-21

Navbar Home transparan pada posisi awal dan menjadi floating glass setelah scroll 48px. Submenu tetap terbuka ketika pointer menuju opsi; menu keyboard dan mobile dipertahankan. Rail template memenuhi lebar viewport tanpa batas clipping internal 1600px, dengan kartu tetangga tetap mengintip di tepi layar.

Langganan saya menampilkan ringkasan paket, riwayat pembayaran dan bantuan. Tamu diarahkan masuk/daftar dengan tujuan kembali ke /subscription. Data akun berasal dari pengguna terverifikasi; keadaan gagal memuat dibedakan dari belum memiliki pesanan. Harga dan batas integrasi provider di atas tetap berlaku. Review independen: ship; delapan screenshot desktop/ponsel, build, 28 tes dan TypeScript check lulus. Detail: HOME-SUBSCRIPTION-FIXES.md.

## Website Editor — 2026-09-21

`/editor?template=restaurant` atau `service` menyediakan P0 penyuntingan tampilan, teks, gambar, dan struktur halaman. Enam palet dan tiga font pack memakai katalog yang sudah ada. Pengguna dapat mengubah identitas bisnis, konten bagian, gambar/alt text/tombol pembuka, dan item koleksi; menambah, menyusun, menduplikasi, menyembunyikan, atau menghapus bagian; memakai undo/redo serta preview desktop/ponsel dan mode baca saja. Batas dokumen adalah 20 bagian dengan sedikitnya satu bagian terlihat.

Simpan draft bersifat eksplisit dan hanya ke browser/perangkat ini. Draft terpisah per template, bukan per akun/tenant; pengguna profil browser yang sama dapat mengaksesnya. Backup JSON dan impor dengan konfirmasi memulihkan pekerjaan. JPG/PNG/WebP dibatasi 1,5 MB per unggahan; dokumen UTF-8 total dibatasi 4,5 MB sebelum perubahan diterapkan. Simpan dan unduh memakai serializer JSON ringkas yang sama. Kesalahan storage/validasi dan perubahan belum tersimpan diberi pesan. Batas ini berlaku untuk editor lokal, bukan kuota paket berlangganan.

`apps/platform` memiliki interaksi dan penyimpanan browser; `packages/contracts` memiliki bentuk/validasi dokumen; `packages/themes` memiliki katalog/isi awal; `packages/site-renderer` memiliki renderer bersama. Original ERD, provisioning tenant/site, persistence cloud, storage media produksi, dan publikasi belum terhubung. Tidak ada migration database langsung, pembayaran, bucket, atau deployment publik yang dijalankan untuk editor. Persyaratan handoff ada di `../../docs/runbooks/website-editor.md`; kontrak visual ada di `EDITOR-DESIGN.md`.

Empat capture diterima reviewer; temuan kapasitas agregat telah diperbaiki dan 36 tes lulus. Verdict akhir serta konfirmasi build masih menunggu. Bukti ini bukan pengujian ponsel fisik atau kesiapan produksi cloud.
