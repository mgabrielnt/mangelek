# Diagram Mangelek (Mermaid)

Dibuat 21 Okt 2026 untuk BRD v4.0 dan FRD v3.0. Semua diagram ditulis dalam Mermaid (gratis, open-source) dan dirender dengan Mermaid CLI 11 + tata letak ELK.

## Cara render ulang

```bash
npm i -g @mermaid-js/mermaid-cli @mermaid-js/layout-elk
mmdc -i mmd/01-konteks.mmd -o 01-konteks.svg -c mmd/cfg.json -b white
```

Gunakan `cfg_greedy.json` untuk diagram konteks dan use case, dan `cfg_dagre.json` hanya bila ELK gagal. Sumber `.mmd` juga bisa ditempel langsung ke mermaid.live atau GitHub Markdown.

## Daftar

| File | Dokumen | Judul | Konfigurasi |
| --- | --- | --- | --- |
| 01-konteks | FRD v3.0 | Diagram konteks · 4 aktor, komponen Mangelek, 7 sistem eksternal | cfg_greedy.json |
| 02-alur-end-to-end | FRD v3.0 | Flowchart end-to-end · pelanggan, sistem, vendor · tingkat, kursi, banyak website | cfg.json |
| 03a-uc-pembelian | FRD v3.0 | Use case pembelian dan akun · UC-01 s.d. UC-05, UC-19, UC-20 | cfg_greedy.json |
| 03b-uc-konten | FRD v3.0 | Use case konten, lead, dan CRM · UC-06 s.d. UC-11, UC-15, UC-22, UC-27, UC-28 | cfg_greedy.json |
| 03c-uc-langganan | FRD v3.0 | Use case langganan dan hak data · UC-12 s.d. UC-14, UC-21, UC-23 | cfg_greedy.json |
| 03d-uc-admin | FRD v3.0 | Use case admin dan sistem · UC-04, UC-16 s.d. UC-18, UC-24 s.d. UC-26 | cfg_greedy.json |
| 04-act-checkout | FRD v3.0 | Activity checkout sampai aktivasi · tahan kursi, jenis alamat, 4 cabang paralel | cfg.json |
| 05-act-edit-terbit | FRD v3.0 | Activity edit, simpan, terbit · klik-untuk-ubah, konflik etag, build gagal | cfg.json |
| 06-act-penjadwal | FRD v3.0 | Activity penjadwal masa aktif · 11 ambang per website, kunci dedupe | cfg.json |
| 07-act-ganti-template | FRD v3.0 | Activity ganti template terjadwal · pesan kursi, perpanjangan, salin isi | cfg.json |
| 08-seq-pembayaran | FRD v3.0 | Sequence notifikasi Midtrans sampai fulfillment · 6 partisipan | cfg.json |
| 09-seq-domain | FRD v3.0 | Sequence registrasi domain dan HTTPS · 5 partisipan | cfg.json |
| 10-seq-terbit | FRD v3.0 | Sequence terbitkan release · 5 partisipan, CAS | cfg.json |
| 11-seq-lead | FRD v3.0 | Sequence formulir lead sampai CRM · 5 partisipan | cfg.json |
| 12-seq-persetujuan | FRD v3.0 | Sequence persetujuan aksi sensitif · peminta, penyetuju, sistem | cfg.json |
| 13-seq-lokasi | FRD v3.0 | Sequence blok Lokasi · pengunjung, website, Google Maps | cfg.json |
| 14-state-langganan | FRD v3.0 | State langganan · 6 status, 12 transisi | cfg.json |
| 15-state-kursi | FRD v3.0 | State kursi Eksklusif · held, reserved, active, released | cfg.json |
| 15b-state-peluang | FRD v3.0 | State peluang CRM · tahapan terbuka, Menang, Kalah, dibuka ulang | cfg.json |
| 16-erd-ringkasan | FRD v3.0 | ERD ringkasan · 9 kelompok; panah dari kelompok yang dirujuk ke kelompok yang merujuk | cfg.json |
| 17a-erd-identitas | FRD v3.0 | ERD A · identitas dan akses | cfg.json |
| 17b-erd-tagihan | FRD v3.0 | ERD B · katalog, pemasaran, tagihan | cfg.json |
| 17c-erd-website | FRD v3.0 | ERD C · website, konten, media, publikasi | cfg.json |
| 17d-erd-domain | FRD v3.0 | ERD D · domain dan hostname | cfg.json |
| 17e-erd-lead | FRD v3.0 | ERD E · lead dan analitik | cfg.json |
| 17f-erd-notifikasi | FRD v3.0 | ERD F · notifikasi | cfg.json |
| 17g-erd-operasi | FRD v3.0 | ERD G · operasi | cfg.json |
| 17h1-erd-kursi | FRD v3.0 | ERD H1 · kursi Eksklusif dan perubahan terjadwal | cfg.json |
| 17h2-erd-admin | FRD v3.0 | ERD H2 · peran admin, persetujuan, dan kontrol | cfg.json |
| 17h3-erd-kepatuhan | FRD v3.0 | ERD H3 · kepatuhan data, laporan, dan halaman status | cfg.json |
| 17i-erd-crm | FRD v3.0 | ERD I · CRM: kontak, pipeline, peluang, aktivitas, tugas, label, field kustom, template pesan, otomasi | cfg.json |
| B1-proses-bisnis | BRD v4.0 §8.2 | Proses bisnis usulan | cfg.json |
| B2-roadmap | BRD v4.0 §15 | Roadmap dan gerbang G1–G3 | cfg.json |
