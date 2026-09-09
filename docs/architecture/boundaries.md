# Batas arsitektur - target implementasi

- apps menggunakan packages; packages tidak mengimpor apps.
- API dan jobs menggunakan core; core memakai db dan port integrasi.
- Browser boleh memakai contracts, ui, themes, dan site-renderer yang aman.
- db, core, adapter berahasia, dan server observability tidak masuk browser.
- Terapkan pembatasan impor pada lint/CI dan boundary server Next.js.
  Dokumen ini sendiri belum menegakkan batas impor.
- Admin dan dashboard memerlukan otorisasi server; route group bukan proteksi.
- Preview harus berizin dan dipisahkan dari cache publik. Tetapkan origin serta
  cookie sesuai threat model sebelum membuat endpoint preview.
- Website publik resolve hostname terverifikasi ke site; hanya baca versi
  published. Jangan menerima tenant_id dari pengguna sebagai bukti akses.
- Cache menyertakan site_id dan publication_version. Jangan cache draft publik.
- Pelanggan baru adalah record database, bukan salinan source code.
- Worker entrypoint dan wrangler.jsonc berada di aplikasi masing-masing.
  infra memiliki resource bersama; hindari dua pengelola resource yang sama.