<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari BRD/FRD. Jangan edit manual. -->

# Indeks kebutuhan (baca ini dulu)

Sumber kebenaran: BRD v4.0 dan FRD v3.0 (xlsx di root repo). File di sini dibuat otomatis; 
perubahan isi kebutuhan harus disetujui Gab, lalu xlsx diperbarui dan script dijalankan ulang.

## Modul FRD (baca hanya modul yang dikerjakan)

| Kode | Modul | Kebutuhan | Must | File |
| --- | --- | --- | --- | --- |
| MKT | Situs pemasaran dan katalog | 11 | 9 | frd/modules/MKT.md |
| ACC | Akun dan autentikasi | 12 | 8 | frd/modules/ACC.md |
| DOM | Domain | 19 | 14 | frd/modules/DOM.md |
| PAY | Checkout, pesanan, pembayaran | 17 | 14 | frd/modules/PAY.md |
| PRV | Provisioning website | 7 | 7 | frd/modules/PRV.md |
| ONB | Wizard onboarding dan bantuan | 7 | 6 | frd/modules/ONB.md |
| EDT | Editor dan CMS | 20 | 15 | frd/modules/EDT.md |
| MED | Media | 7 | 5 | frd/modules/MED.md |
| PUB | Publikasi dan hosting | 13 | 9 | frd/modules/PUB.md |
| LEAD | WhatsApp, formulir, lead | 12 | 12 | frd/modules/LEAD.md |
| ANL | Analitik | 5 | 3 | frd/modules/ANL.md |
| SUB | Siklus langganan | 14 | 13 | frd/modules/SUB.md |
| NTF | Email otomatis | 12 | 10 | frd/modules/NTF.md |
| ADM | Panel admin dan audit | 24 | 18 | frd/modules/ADM.md |
| LGL | Legal dan privasi | 9 | 9 | frd/modules/LGL.md |
| REF | Ajak teman | 2 | 0 | frd/modules/REF.md |
| TIER | Tingkat dan kursi Eksklusif | 7 | 6 | frd/modules/TIER.md |
| SITE | Banyak website per akun | 7 | 7 | frd/modules/SITE.md |
| BLK | Blok, varian, Lokasi, animasi | 11 | 11 | frd/modules/BLK.md |
| STS | Halaman status | 4 | 2 | frd/modules/STS.md |
| CRM | CRM pelanggan | 25 | 9 | frd/modules/CRM.md |

## File lain

| File | Baris |
| --- | --- |
| docs/requirements/frd/modules/MKT.md | 55 |
| docs/requirements/frd/modules/ACC.md | 56 |
| docs/requirements/frd/modules/DOM.md | 77 |
| docs/requirements/frd/modules/PAY.md | 71 |
| docs/requirements/frd/modules/PRV.md | 39 |
| docs/requirements/frd/modules/ONB.md | 41 |
| docs/requirements/frd/modules/EDT.md | 80 |
| docs/requirements/frd/modules/MED.md | 41 |
| docs/requirements/frd/modules/PUB.md | 59 |
| docs/requirements/frd/modules/LEAD.md | 58 |
| docs/requirements/frd/modules/ANL.md | 37 |
| docs/requirements/frd/modules/SUB.md | 64 |
| docs/requirements/frd/modules/NTF.md | 58 |
| docs/requirements/frd/modules/ADM.md | 94 |
| docs/requirements/frd/modules/LGL.md | 49 |
| docs/requirements/frd/modules/REF.md | 28 |
| docs/requirements/frd/modules/TIER.md | 43 |
| docs/requirements/frd/modules/SITE.md | 43 |
| docs/requirements/frd/modules/BLK.md | 55 |
| docs/requirements/frd/modules/STS.md | 34 |
| docs/requirements/frd/modules/CRM.md | 95 |
| docs/requirements/frd/test-cases-lintas-modul.md | 72 |
| docs/database/erd/A-identitas-dan-akses-7-entitas.md | 15 |
| docs/database/erd/B-katalog-pemasaran-dan-tagihan-14-entitas.md | 22 |
| docs/database/erd/C-website-konten-media-dan-publikasi-10-entitas.md | 18 |
| docs/database/erd/D-domain-6-entitas.md | 14 |
| docs/database/erd/E-lead-dan-analitik-4-entitas.md | 12 |
| docs/database/erd/F-notifikasi-2-entitas.md | 10 |
| docs/database/erd/G-operasi-6-entitas.md | 14 |
| docs/database/erd/H-tingkat-admin-kepatuhan-dan-status-13-entitas-baru-di-v3-0.md | 21 |
| docs/database/erd/I-crm-pelanggan-11-entitas-baru-di-v3-0.md | 19 |
| docs/requirements/frd/ringkasan.md | 61 |
| docs/requirements/frd/3-gambaran-umum.md | 120 |
| docs/requirements/frd/4-3-use-case.md | 69 |
| docs/requirements/frd/4-4-aturan-validasi.md | 97 |
| docs/requirements/frd/4-5-hak-akses.md | 70 |
| docs/requirements/frd/4-6-moscow.md | 39 |
| docs/requirements/frd/5-5-status.md | 45 |
| docs/requirements/frd/7-3-7-6-data.md | 86 |
| docs/requirements/frd/8-nfr.md | 48 |
| docs/requirements/frd/9-error.md | 89 |
| docs/requirements/frd/10-1-strategi-uji.md | 36 |
| docs/requirements/frd/matriks-keterlacakan.md | 253 |
| docs/requirements/frd/10-3-deliverable-g1.md | 33 |
| docs/requirements/frd/10-4-brd-ke-frd.md | 134 |
| docs/requirements/frd/11-isu-terbuka.md | 29 |
| docs/requirements/brd/ringkasan.md | 98 |
| docs/requirements/brd/1-2-dokumen-ringkasan.md | 70 |
| docs/requirements/brd/3-pasar-kompetitor.md | 60 |
| docs/requirements/brd/4-swot.md | 18 |
| docs/requirements/brd/5-tujuan-metrik.md | 22 |
| docs/requirements/brd/6-lingkup-deliverable.md | 68 |
| docs/requirements/brd/7-stakeholder.md | 38 |
| docs/requirements/brd/8-proses-bisnis.md | 35 |
| docs/requirements/brd/9-1-kebutuhan-fungsional.md | 56 |
| docs/requirements/brd/9-2-nfr.md | 28 |
| docs/requirements/brd/9-3-aturan-bisnis.md | 33 |
| docs/requirements/brd/9-4-9-5-data-admin.md | 45 |
| docs/requirements/brd/10-harga.md | 28 |
| docs/requirements/brd/11-biaya-manfaat.md | 91 |
| docs/requirements/brd/11-4-proyeksi-kas.md | 68 |
| docs/requirements/brd/12-pemasaran.md | 86 |
| docs/requirements/brd/13-asumsi-kendala.md | 48 |
| docs/requirements/brd/14-risiko.md | 26 |
| docs/requirements/brd/15-timeline.md | 38 |
| docs/requirements/brd/16-persetujuan.md | 23 |
| docs/requirements/brd/17-glosarium.md | 41 |
| docs/requirements/brd/18-5-keputusan.md | 34 |
| docs/requirements/brd/18-lampiran-sumber.md | 105 |
