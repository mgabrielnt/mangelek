# Keputusan teknis dan syarat implementasi v5.2

## Status dan cakupan
Ini model target yang diusulkan untuk MVP, bukan hasil reverse engineering database produksi. v5.2 memperinci baseline v5; ERD teknis ini menggantikan peta data ringkas 11–12 untuk pemrograman. Spesifikasi lama tetap memuat tujuan bisnis, kuota dan biaya. Tidak ada pembelian vendor, penerapan migrasi atau deployment pada pekerjaan ini.

## Perubahan yang disengaja
- Katalog plan/price dan template/version dipisah agar order dan website mengunci versi yang dibeli.
- subscription_periods mencatat pemberian masa aktif sekali per order_line; active_until hanya proyeksi yang direkonsiliasi.
- payment_events memakai dedupe_key, bukan mengasumsikan Midtrans memberi event_id universal. Jika payload tidak membedakan dua kejadian, jangan menganggap hash sebagai satu-satunya bukti keuangan; status/provider refund identifier tetap direkonsiliasi.
- sites mempunyai desired_release_id, desired_mapping_revision, active_release_id, active_mapping_revision. Database dan edge tidak dapat di-commit sebagai satu transaksi. Worker memakai fencing/CAS per-site; job versi lama tidak boleh mengalahkan versi baru. Rekonsiliasi menutup celah crash pada setiap langkah.
- active_release_id adalah sumber penunjuk aktif; releases.status=ready hanya berarti release lolos build. Label activated pada proses adalah hasil operasi, bukan kolom status kedua yang bisa bertentangan.
- revision_assets mempertahankan media selama release membutuhkan; CMS dibekukan ke snapshot revision saat publish. Schema JSON Document pada OpenAPI menetapkan bentuk template awal, dan wajib divalidasi per block type.
- domain_quotes menyimpan harga dan expiry; satu quote dikonsumsi satu domain_order. Timeout registrar masuk unknown sampai hasil dapat dipastikan. DNS snapshot dan zone reference mendukung pemulihan record.
- Semua tambahan adalah tabel/modul dalam database dan codebase yang sama, bukan microservice/vendor baru. Ukuran dan pemakaian tetap perlu load test; tidak menjamin biaya fase pasti cukup.

## Integritas yang wajib ditegakkan
1. UUID dari server; timestamp UTC. Default id/created_at/updated_at harus dipilih konsisten pada migrasi nyata (usulan gen_random_uuid()/now(), trigger updated_at). Proposal SQL sengaja tidak menjalankan konfigurasi extension atau Auth vendor.
2. FK tenant komposit mencegah ID lintas tenant. Anak site-owned menggunakan FK tenant+site+id bila sesuai. Kolom nullable operasional hanya untuk event global, tidak boleh dipakai untuk melewati pemeriksaan tenant.
3. Enum status dan allowed transitions divalidasi di service; CHECK status per tabel perlu diselaraskan dengan state diagram pada migration task. Jangan menganggap setiap field text bebas nilai.
4. Lock subscription ketika memberi period. Usulan exclusion constraint dengan rentang [starts_at,ends_at) atau transaksi serializable/advisory lock harus membuktikan tidak ada periode bertumpuk. FK order_line tidak membuktikan jenis line; validasi kind=subscription dan paid order dalam transaksi pemberian entitlement.
5. Jumlah line harus sama dengan total order; refundable total tidak boleh melebihi payment. Gunakan row lock + transaksi/trigger yang teruji; jangan CHECK yang membaca tabel lain.
6. Renewal website: paid sebelum expiry menambah dari expiry lama; sesudah expiry dari aktivasi kembali. Bulan kalender, bukan 30 hari tetap. Tetapkan clamp akhir bulan secara konsisten dan uji tahun kabisat.
7. Domain quote satu kali, harga tidak dinaikkan setelah pembayaran tanpa izin. Domain order harus line kind domain yang tepat dan quote/tenant/name sama. Customer tetap registran.
8. Satu owner dan site per tenant MVP; perubahan menjadi multi-role/multi-site memerlukan migrasi constraint dan perubahan paket, bukan sekadar membuka UI.
9. Satu canonical connected hostname per site; normalized ASCII IDNA hostname unik. Canonical hostname harus tenant/site benar. Domain unlink memblokir route, purge dan tombstone sebelum dapat dipakai ulang; bukti ownership harus baru.
10. Job lease + dedupe key tidak menjamin exactly-once vendor effect. Periksa state provider sebelum retry, khususnya register/renew/refund.

## RLS dan matriks akses
Publik hanya membaca katalog released dan website release terpilih, atau mengirim form dengan token+host yang cocok. Owner membaca data tenant sendiri dan menulis konten melalui API. Keuangan, subscription_periods, payment_events, outbox, job_runs, audit_events dan notification_deliveries tidak dapat ditulis pelanggan. Owner hanya mendapat proyeksi read-only status/invoice/job yang disaring. Operator memakai akun terpisah, MFA dan audit. Service-role hanya server; tidak cukup menyatakan RLS jika koneksi backend bypass RLS, karena backend tetap harus menerapkan authorization dan konteks tenant.

## Retensi, penghapusan dan privasi
Grace website tujuh hari dan retensi konten 30 hari dari expiry masih usulan. Hapus file hanya setelah pemeriksaan referensi, retensi release dan legal hold. Ekspor token singkat, draft/preview no-store/noindex, media quarantined tidak publik. Jangan log credentials, kartu, token atau registrant detail. Bukti keuangan dan audit memiliki jadwal tersendiri yang perlu validasi kewajiban berlaku sebelum rilis. FK RESTRICT berarti cleanup harus eksplisit; tidak menghapus akun Auth atau tenant sebelum referensinya ditangani secara aman.

## Kontrak API lintas modul
Path relatif /v1. JWT Supabase diverifikasi issuer/audience/expiry; auth login/reset/logout tetap melalui SDK/provider yang dipilih. Akses operator wajib memeriksa MFA/role server, bukan role dari body. Semua tulis schema-validated, payload capped, correlation ID dan rate limit. List memakai cursor stabil dan limit <=100; authorization ulang tiap page. If-Match menggunakan token revisi yang dikembalikan GET dan wajib pada perubahan konten/metadata. Tambahkan header ETag saat implementasi dan validasi di contract test.

Idempotency request umum usulan 24 jam, scope tenant+actor+operation, hash payload; mismatch 409. Hasil duplikat diputar ulang; effectful fulfillment menggunakan kunci permanen order_line/cycle/domain request. 202 hanya menerima pekerjaan; GET job menyatakan hasil. 401 identitas/signature, 403 izin/entitlement, 404 objek dalam tenant tidak ditemukan, 409 konflik, 422 input, 429 limit, 503 gangguan sementara. Retry-After disertakan bila dapat ditentukan. Jangan retry 4xx tanpa memperbaiki sebab.

## Pengujian rancangan dan sebelum produksi
Pemeriksaan berkas: referensi OpenAPI, operationId, path parameter; validasi formal OpenAPI 3.1.1; parsing PostgreSQL; konsistensi kolom/FK/nullability dan cardinality; pemeriksaan visual semua diagram. Ini bukan tes runtime, bukan bukti RLS berjalan dan bukan jaminan performa.

Sebelum produksi: migration integration test pada versi PostgreSQL Supabase yang benar; RLS tenant A/B untuk semua resource; replay/out-of-order webhook; crash sebelum/sesudah commit, send queue, registrar success dan edge CAS; overlapping renewals; dua publisher berlomba; quote habis/nama diambil/saldo habis; ownership takeover; email MX/TXT tidak berubah; media malware/SSRF/XSS; quota race; ekspor; restore DB+media; load test sesuai baseline; review privasi/refund/domain ownership. G0–G4 hanya lulus dengan tautan bukti.

## Pekerjaan yang belum dapat dipastikan dari perancangan
Tanggal mulai, modal tunai, gaji pendiri, biaya marketing, domain platform, akun merchant live, registrar live/egress tetap, target kehilangan data yang disetujui dan kewajiban retensi finansial masih perlu keputusan atau verifikasi implementasi. Seluruhnya dicatat sebagai gate/keputusan terbuka di Notion. Tidak ada klaim sempurna atau production-ready sebelum pengujian tersebut.

