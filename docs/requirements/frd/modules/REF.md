<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# REF — Ajak teman

Fitur utama: Kode rujukan, hadiah 1 bulan

Ringkas: 2 kebutuhan (0 Must), 2 kriteria penerimaan, 2 test case.

## Kebutuhan fungsional

| ID | Fungsi | Aktor | Input | Proses | Output | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-REF-001 | Membuat kode rujukan | PEL | Tenant aktif | Kode unik + tautan ?ref=; ditangkap lewat MKT-009 | Kode tercatat saat pendaftar baru mendaftar | Should | FR-25 | — | AC-REF-01 | TC-REF-001 |
| FR-REF-002 | Memberi hadiah 1 bulan | SIS | Pembayaran pertama yang diajak lunas dan tidak direfund 7 hari | Kedua pihak mendapat periode 1 bulan lewat order Rp0 berlabel bonus; maksimal 12 bulan bonus/tahun; menunggu persetujuan BRD 18.1 | Fase 2 | Should | FR-25 | — | AC-REF-02 | TC-REF-002 |

## Kriteria penerimaan

| ID | Kriteria penerimaan | Kebutuhan | Prioritas | Test case |
| --- | --- | --- | --- | --- |
| AC-REF-01 | Diberikan tenant aktif (Fase 2), ketika kode rujukan dibuat dan dipakai pendaftar baru, maka kode tercatat di signup\_attribution. | REF-001 | Should | TC-REF-001 |
| AC-REF-02 | Diberikan pembayaran pertama yang diajak lunas dan tidak direfund 7 hari, ketika hadiah diproses, maka kedua pihak mendapat 1 bulan lewat order Rp0 dengan batas 12 bulan bonus per tahun. | REF-002 | Should | TC-REF-002 |

## Test case

| ID | Kelompok | Judul / memverifikasi | Kebutuhan dicakup | Prioritas | Wajib G1 | Level | Lingkungan | Data uji | Langkah kunci | Lulus bila | Otomasi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-REF-001 | REF — Ajak teman | Membuat kode rujukan | REF-001 | Should | Tidak | E2E | Staging | 2 akun | Buat kode; daftar dengan ?ref= | AC-REF-01 terpenuhi: Diberikan tenant aktif (Fase 2), ketika kode rujukan dibuat dan dipakai pendaftar baru, maka kode tercatat di signup_attribution. | Otomatis |
| TC-REF-002 | REF — Ajak teman | Memberi hadiah 1 bulan | REF-002 | Should | Tidak | Integrasi | Staging + jam simulasi | 2 akun | Bayar; majukan jam 8 hari; cek periode | AC-REF-02 terpenuhi: Diberikan pembayaran pertama yang diajak lunas dan tidak direfund 7 hari, ketika hadiah diproses, maka kedua pihak mendapat 1 bulan lewat order Rp0 dengan batas 12 bulan bonus per tahun. | Otomatis |
