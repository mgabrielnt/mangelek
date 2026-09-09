# Verifikasi keamanan - belum dijalankan

- Autentikasi, sesi, MFA admin, pemulihan akun, CSRF dan otorisasi per operasi.
- Uji tenant A terhadap seluruh objek tenant B: API, DB, media, cache,
  preview, domain, antrean, exports, dan admin.
- RLS: role aplikasi bukan owner/BYPASSRLS; gunakan konteks tenant lokal
  dalam transaksi yang sama dengan query. Audit policy dan rollback konteks.
- Nonaktifkan query cache Hyperdrive untuk jalur transaksi sensitif.
- Validasi konten editor, sanitasi HTML/URL, batas upload dan kuota tenant.
- Verifikasi signature webhook terhadap raw body; cegah efek berulang.
- Jobs: idempotency, retry terbatas, dead-letter queue, observability.
- Publish: outbox/transaksi, versi immutable, perubahan pointer atomik,
  pengendalian konkurensi dan rollback yang dapat diuji.
- Tetapkan redaksi log, retensi data, least privilege dan rotasi secrets.
- Petakan kontrol OWASP ASVS Level 2 yang relevan; bukan klaim lulus audit.