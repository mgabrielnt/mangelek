<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

FRD Mangelek v3.0 — Versi Final (ekspor Excel)

Informasi dokumen

| Atribut | Isi |
| --- | --- |
| Proyek | Mangelek — SaaS website bisnis + domain + CMS + CRM untuk UMKM |
| Jenis dokumen | Functional Requirements Document (FRD) |
| Versi | 3.0 — Final, siap disetujui |
| Pemilik | Gab (Mangelek Gabriel Nicholas Tambun), pendiri dan developer tunggal |
| Dokumen induk | BRD Mangelek — Versi Final 4.0 (21 Okt 2026) |
| Menggantikan | FRD Mangelek — Versi Final 2.0 (20 Okt 2026) |
| Acuan teknis | Repositori saas-platform: decisions-v5.2.md, data-dictionary-v5.2.md, openapi-v5.2.json (52 operasi), packages/contracts, packages/themes, migrasi 20260920_billing.sql, proposal editor-v52.sql, IA dashboard-owner-ia-2026-09-26.csv |
| Lingkup rilis | Fase 0 (MVP) sampai peluncuran Feb 2027. Should = Fase 2; Could = bila sempat; Won't = ditunda |
| Bagian yang dimuat | 3, 4, 5, 7, 8, 9, 10, dan 11 (persetujuan dan isu terbuka), ditambah tab Katalog test case dan Matriks keterlacakan. Bagian 1–2 (pendahuluan) ada di FRD v1.0; bagian 6 (antarmuka) mengikuti DESIGN.md, EDITOR-DESIGN.md, dan IA dashboard di repositori |

Angka kunci (dihitung dengan rumus dari sheet lain)

| Ukuran | Nilai |
| --- | --- |
| Kebutuhan fungsional | 245 |
| Must | 187 |
| Should | 40 |
| Could | 13 |
| Won't | 5 |
| Kriteria penerimaan | 235 |
| Test case | 301 |
| Wajib G1 | 247 |
| Wajib G1 yang sudah lulus | 0 |
| Test case gagal | 0 |
| FR Must berstatus Lulus | 0 |
| Kesiapan G1 (FR Must lulus / semua FR Must) | 0 |

Isi workbook

| Sheet | Isi |
| --- | --- |
| 3 Gambaran Umum | Latar belakang, aktor, stakeholder, asumsi, batasan, dependensi, penyelarasan v5.2 |
| 4.1 Modul | 21 modul dan jumlah kebutuhan per prioritas |
| 4.2 Kebutuhan Fungsional | 245 FR termasuk modul CRM: input, proses, output, prioritas, sumber BRD, UC, AC, TC (bisa difilter) |
| 4.3 Use Case | 28 use case: user story, skenario utama, alternatif, pengecualian |
| 4.4 Aturan & Validasi | Penerapan BRU, aturan bisnis tambahan RB-01 s.d. RB-30 (termasuk nol biaya), validasi V-01 s.d. V-25 |
| 4.5 Hak Akses | Matriks peran pengguna dan matriks izin 7 peran admin |
| 4.6 MoSCoW | Ringkasan prioritas dan urutan sprint |
| 5.5 Status | Transisi status langganan, kursi, peluang CRM, dan objek lain |
| 7.2 Entitas | 73 entitas dalam 9 kelompok (I = CRM) dengan atribut, kunci, aturan |
| 7.3-7.6 Data | Struktur Document v3, migrasi M-01 s.d. M-10, retensi, cadangan |
| 8 NFR | Kebutuhan non-fungsional dengan target terukur |
| 9 Error | Katalog kode error, kegagalan vendor, pengecualian proses |
| 10.1 Strategi Uji | Level uji, lingkungan, kriteria masuk/keluar |
| 10.2 Kriteria Penerimaan | 235 kriteria Diberikan–ketika–maka |
| Katalog Test Case | 301 test case — lembar eksekusi (kolom kuning diisi penguji) |
| Matriks Keterlacakan | 245 FR dengan status uji otomatis dari Katalog Test Case |
| 10.3 Deliverable G1 | Ringkasan test case dan penerimaan D-01 s.d. D-14 |
| 10.4 BRD ke FRD | BO, FR, NFR, BRU BRD → FR FRD → UC → TC |
| 11 Isu Terbuka | Persetujuan, isu terbuka, dan sumber |
| Diagram | 31 diagram Mermaid FRD (konteks, flowchart, use case, activity, sequence, state, ERD termasuk CRM) |

Sumber: FRD Mangelek v3.0 (Claude Docs, 21 Okt 2026). Diagram ada di sheet Diagram dan di paket Mangelek-Diagram-Mermaid.zip (PNG, SVG, sumber .mmd).
