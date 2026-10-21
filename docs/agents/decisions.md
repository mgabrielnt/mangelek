# Keputusan Gab (log)

Jawaban Gab atas pertanyaan agent. Dipakai ulang agar pertanyaan yang sama tidak diajukan dua kali.
Keputusan yang mengubah BRD/FRD diberi nomor K-29 dst. dan harus masuk ke BRD/FRD versi berikutnya.

| Tanggal | ID | Keputusan | Sumber |
| --- | --- | --- | --- |
| 2026-10-21 | D-001 | Tim agent memakai Claude Code saja (bukan Codex). Sisa konfigurasi Codex dibiarkan. | Rancangan Tim Agent |
| 2026-10-21 | D-002 | Agent bekerja mandiri; bertanya hanya pada 7 pemicu di CLAUDE.md. | Rancangan Tim Agent |
| 2026-10-21 | D-003 | Irisan pertama S-01 = alur inti end-to-end: template → site → CMS → publish → website → formulir → lead di CRM. | Rancangan Tim Agent |
| 2026-10-21 | D-004 | Stack dievaluasi ulang oleh architect (ADR-001) dan wajib disetujui Gab. | Rancangan Tim Agent |
| 2026-10-21 | D-005 | Harga tahunan = 10 × bulanan per tingkat (Standar Rp1.490.000, Premium Rp2.000.000, Eksklusif Rp3.000.000). Sesuai BRU-02; `PRODUCT.md` dan data pricing aplikasi usang. | Gab |
| 2026-10-21 | D-006 | Opus tersedia di akun Pro: architect dan tech-lead memakai Opus. | Gab |
| 2026-10-21 | D-007 | Batas biaya arsitektur (hosting, database, email) sampai pelanggan berbayar pertama: total Rp800.000 dari modal Rp1,6 juta. Berhenti dan tanya di Rp600.000. Setelah ada pendapatan: maks 25% pendapatan bulanan (usulan). Domain Mangelek (1 tahun di muka) dan Claude Pro di luar angka ini; domain pelanggan dibayar pelanggan. | Gab |
| 2026-10-21 | D-008 | Keamanan pelanggan tidak boleh dikorbankan demi anggaran; berkembang bertahap (Tahap 0 → 1 → 2). | Gab |
| 2026-10-21 | D-009 | BRD/FRD dokumen hidup: boleh berubah, tetapi setiap perubahan ditanyakan ke Gab dulu. | Gab |
| 2026-10-21 | D-010 | CRM dikembangkan terus, hanya fitur yang perlu; setiap usulan fitur ditanyakan dulu. | Gab |
| 2026-10-21 | D-011 | Agent berjalan saat Gab menyuruh (/lanjut) dan selalu melanjutkan; template terus ditambah dengan referensi terbaik sebagai inspirasi. | Gab |
| 2026-10-21 | D-012 / K-30 | G0: ADR-001 Opsi B disetujui — stack BRD + Cloudflare Workers Paid ($5, ±Rp89.500/bulan) sejak Fase 0. BRD 11.2 baris "Pembangunan Rp0" perlu diperbarui. | Gab |
| 2026-10-21 | D-013 | Bila biaya arsitektur kumulatif melewati cadangan BRD Rp150.000, agent bertanya dulu pos modal mana yang dipakai. | Gab |
| 2026-10-21 | D-014 | Tahap biaya mengikuti BRD 11.2 (Supabase Pro saat ≥ 6 website berbayar); usulan "maks 25% pendapatan" dibatalkan. | Gab |
| 2026-10-21 | D-015 / K-29 | Backup database harian ke R2 sejak Tahap 0 (RPO ≤ 24 jam), menggantikan backup mingguan FRD 7.6. | Gab |
