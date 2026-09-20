# Mangelek

<!-- impeccable:product-schema 1 -->

## Platform
web

## Product Purpose
Website bisnis dan CMS dalam satu langganan. Pengunjung mempelajari paket dan menjelajahi tema.

## Capabilities and Constraints
Pricing mempertahankan satu paket Website + CMS, enam fitur yang tercantum di src/data/pricing/features.ts, dan CTA ke /#templates. Pengguna menyetujui harga Rp200.000 per bulan. Hanya langganan bulanan yang ditawarkan; jangan mengarang harga tahunan, diskon, kuota, trial, atau checkout. Komponen billing mendukung bulanan dan tahunan bila dikonfigurasi; nominal tahunan adalah total tagihan penuh. Domain dibayar terpisah. Storage tambahan dan AI hanya rencana.

## Brand Commitments
Bahasa Indonesia; merek Mangelek. Pengguna meminta pricing minimal dan premium dengan referensi React Bits Pricing 14, fungsi tetap, serta peningkatan responsif dan aksesibilitas.

## Evidence on Hand
Data pricing dan docs/decisions/2026-09-14-pricing.md. Instruksi lanjutan pengguna: jalankan implementasi dan seluruh skill yang diminta.

## Accessibility & Inclusion
Keyboard, fokus terlihat, target sentuh, layout mobile, dan reduced motion.

## Authentication
Halaman login, daftar, pemulihan kata sandi, dan akun memakai adapter Supabase Auth untuk email/password serta Google. Pengguna meminta implementasi dan melanjutkan dengan default integrasi tersebut. Login Google menggunakan identitas akun Google, tanpa akses kotak masuk Gmail. Proyek Supabase dan konfigurasi OAuth belum disediakan; aktivasi layanan dan pengujian provider langsung masih diperlukan. Halaman akun memverifikasi pengguna di server dan tidak mengimplementasikan dashboard CMS, tenant, atau checkout.

## Blogs and Templates

`/blogs` dan empat halaman artikel menyajikan panduan asli berbahasa Indonesia tentang persiapan website, konten, domain, dan formulir kontak. Konten bersifat statis dalam `src/data/blogs.ts`, bukan integrasi CMS. Waktu baca dihitung dari panjang teks; tidak ada penulis, tanggal publikasi, atau metrik popularitas rekaan. Empat ilustrasi memakai aset repository yang sudah ada: website-editor, cms-dashboard, domain-management, dan business-dashboard.

`/templates` dan enam halaman detail menampilkan konsep Service Modern, Restaurant Premium, Company Profile, Beauty & Wellness, Property Showcase, dan Education Hub dari `src/data/templates.ts`. Enam gambar kategori yang sudah ada digunakan tanpa modifikasi. Gambar adalah konsep visual untuk diskusi, bukan tema terpasang atau demo interaktif. Aksi detail menuju `/?template=<id>#contact` mengisi konteks konsep di alur kontak yang sudah ada. Harga tetap Rp200.000 per bulan yang sebelumnya disetujui, dengan domain dibayar terpisah; tidak ada checkout atau paket baru.

Kedua perpustakaan menyimpan pencarian `q` dan kategori `kategori` dalam URL, menyediakan hasil kosong dan reset, serta mendukung keyboard, fokus terlihat, pengumuman jumlah hasil, dan reduced motion. Kontrak permukaan ada di `BLOG-DESIGN.md` dan `TEMPLATES-DESIGN.md`; dokumentasi visual menambahkan scope tanpa mengganti pricing, authentication, atau Home.
