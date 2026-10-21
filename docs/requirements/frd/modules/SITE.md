<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# SITE — Banyak website per akun

Fitur utama: Tambah website, batas per akun, pemilih website, isolasi per website, langganan per website, ringkasan, 1 domain untuk 1 website

Ringkas: 7 kebutuhan (7 Must), 7 kriteria penerimaan, 7 test case.

## Kebutuhan fungsional

| ID | Fungsi | Aktor | Input | Proses | Output | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-SITE-001 | Menambah website dari dashboard | PEL | Tombol Tambah website | Alur sama dengan pembelian pertama: kategori → template dan tingkat → domain → checkout (purpose = initial, site_id kosong); data usaha bisa disalin dari website lain | Website baru dibuat oleh PRV-001 setelah lunas | Must | FR-30 | UC-20 | AC-SITE-01 | TC-SITE-001 |
| FR-SITE-002 | Membatasi jumlah website per akun | SIS | Permintaan order website baru | Maks 10 website belum dihapus per akun (RB-21, dapat diubah admin) dan maks 1 order website baru pending | E-SITE-LIMIT (409) dengan tautan bantuan | Must | FR-30 | UC-20 | AC-SITE-02 | TC-SITE-002 |
| FR-SITE-003 | Memilih website yang dikelola | PEL | Pemilih website di kepala dashboard | Daftar website akun dengan nama, tingkat, status; pilihan terakhir diingat; URL memuat id site; semua halaman editor, media, lead, analitik, domain, dan langganan memakai site terpilih | Pindah website ≤ 1 klik tanpa keluar akun | Must | FR-30 | UC-20 | AC-SITE-03 | TC-SITE-003 |
| FR-SITE-004 | Mengisolasi data antar website | SIS | Setiap permintaan ke data milik site | Server memeriksa site milik tenant dan cocok dengan konteks; FK komposit (tenant_id, site_id, id); kuota, lead, analitik, media, dan ekspor dihitung per site | Data website 1 tidak muncul di website 2 di akun yang sama | Must | FR-30, NFR-07 | UC-20 | AC-SITE-04 | TC-MIG-009; TC-SEC-007; TC-SITE-004 |
| FR-SITE-005 | Mengelola langganan per website | SIS | subscriptions dengan UNIQUE site_id | Siklus masa aktif, tagihan, berhenti, dan purge berjalan per website; email menyebut nama website | Satu website menunggak tidak memengaruhi website lain | Must | BRU-01, BRU-09 | UC-20 | AC-SITE-05 | TC-MIG-009; TC-PAY-114; TC-SITE-005 |
| FR-SITE-006 | Menampilkan ringkasan semua website | PEL | Beranda dashboard | Kartu per website: tingkat, status tayang, domain, masa aktif, tagihan terbuka, lead 30 hari; total tagihan bulan ini | Pemilik melihat semua usahanya dalam satu layar | Must | FR-30 | UC-20 | AC-SITE-06 | TC-SITE-006 |
| FR-SITE-007 | Mengikat satu domain ke satu website | SIS | Domain terkelola atau hostname luar | UNIQUE hostname di hostname_bindings dan domains.site_id; memindah domain ke website lain = lepas (DOM-013) lalu hubungkan ulang dengan bukti kepemilikan | Satu domain tidak pernah menayangkan dua website | Must | BRU-01, BRU-16 | UC-20 | AC-SITE-07 | TC-SITE-007 |

## Kriteria penerimaan

| ID | Kriteria penerimaan | Kebutuhan | Prioritas | Test case |
| --- | --- | --- | --- | --- |
| AC-SITE-01 | Diberikan akun dengan 1 website, ketika Tambah website diselesaikan dan dibayar sandbox, maka website kedua dengan langganan baru tayang ≤ 5 menit dan data usaha bisa disalin dari website pertama. | SITE-001 | Must | TC-SITE-001 |
| AC-SITE-02 | Diberikan akun dengan 10 website atau 1 order website baru pending, ketika order website baru dibuat, maka ditolak E-SITE-LIMIT atau E-CONFLICT. | SITE-002 | Must | TC-SITE-002 |
| AC-SITE-03 | Diberikan akun dengan 3 website, ketika pemilih website dipakai, maka semua halaman dashboard berpindah ke website terpilih dalam 1 klik dan pilihan terakhir diingat setelah login ulang. | SITE-003 | Must | TC-SITE-003 |
| AC-SITE-04 | Diberikan website 1 dan 2 di akun yang sama, ketika lead, media, analitik, dan ekspor website 1 diminta dengan konteks website 2 lewat API langsung, maka ditolak 404 dan kuota dihitung terpisah. | SITE-004 | Must | TC-SITE-004 |
| AC-SITE-05 | Diberikan dua website dengan tanggal habis berbeda, ketika satu melewati H+8, maka hanya website itu nonaktif dan email menyebut nama website itu. | SITE-005 | Must | TC-SITE-005 |
| AC-SITE-06 | Diberikan akun dengan 3 website berstatus berbeda, ketika beranda dashboard dibuka, maka kartu tiap website menampilkan tingkat, status, domain, masa aktif, tagihan, dan lead 30 hari sesuai database. | SITE-006 | Must | TC-SITE-006 |
| AC-SITE-07 | Diberikan domain terhubung ke website 1, ketika dihubungkan ke website 2 tanpa dilepas, maka ditolak E-HOSTNAME-TAKEN; setelah dilepas dan diverifikasi ulang, domain menayangkan website 2 saja. | SITE-007 | Must | TC-SITE-007 |

## Test case

| ID | Kelompok | Judul / memverifikasi | Kebutuhan dicakup | Prioritas | Wajib G1 | Level | Lingkungan | Data uji | Langkah kunci | Lulus bila | Otomasi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-SITE-001 | SITE — Banyak website per akun | Menambah website dari dashboard | SITE-001 | Must | Ya | E2E | Staging | Akun uji | Alur tambah website penuh | AC-SITE-01 terpenuhi: Diberikan akun dengan 1 website, ketika Tambah website diselesaikan dan dibayar sandbox, maka website kedua dengan langganan baru tayang ≤ 5 menit dan data usaha bisa disalin dari website pertama. | Otomatis |
| TC-SITE-002 | SITE — Banyak website per akun | Membatasi jumlah website per akun | SITE-002 | Must | Ya | Integrasi | CI | 2 akun | POST /v1/orders | AC-SITE-02 terpenuhi: Diberikan akun dengan 10 website atau 1 order website baru pending, ketika order website baru dibuat, maka ditolak E-SITE-LIMIT atau E-CONFLICT. | Otomatis |
| TC-SITE-003 | SITE — Banyak website per akun | Memilih website yang dikelola | SITE-003 | Must | Ya | E2E | Staging | Akun 3 website | Pindah website di tiap halaman | AC-SITE-03 terpenuhi: Diberikan akun dengan 3 website, ketika pemilih website dipakai, maka semua halaman dashboard berpindah ke website terpilih dalam 1 klik dan pilihan terakhir diingat setelah login ulang. | Otomatis |
| TC-SITE-004 | SITE — Banyak website per akun | Mengisolasi data antar website | SITE-004 | Must | Ya | Keamanan | CI | Akun 2 website | Uji API silang antar website | AC-SITE-04 terpenuhi: Diberikan website 1 dan 2 di akun yang sama, ketika lead, media, analitik, dan ekspor website 1 diminta dengan konteks website 2 lewat API langsung, maka ditolak 404 dan kuota dihitung terpisah. | Otomatis |
| TC-SITE-005 | SITE — Banyak website per akun | Mengelola langganan per website | SITE-005 | Must | Ya | Integrasi | Staging + jam simulasi | Akun 2 website | Majukan jam; periksa status dan email | AC-SITE-05 terpenuhi: Diberikan dua website dengan tanggal habis berbeda, ketika satu melewati H+8, maka hanya website itu nonaktif dan email menyebut nama website itu. | Otomatis |
| TC-SITE-006 | SITE — Banyak website per akun | Menampilkan ringkasan semua website | SITE-006 | Must | Ya | E2E | Staging | Akun 3 website | Buka beranda; bandingkan | AC-SITE-06 terpenuhi: Diberikan akun dengan 3 website berstatus berbeda, ketika beranda dashboard dibuka, maka kartu tiap website menampilkan tingkat, status, domain, masa aktif, tagihan, dan lead 30 hari sesuai database. | Otomatis |
| TC-SITE-007 | SITE — Banyak website per akun | Mengikat satu domain ke satu website | SITE-007 | Must | Ya | Integrasi | Staging | Domain uji | Hubungkan, lepas, hubungkan ulang | AC-SITE-07 terpenuhi: Diberikan domain terhubung ke website 1, ketika dihubungkan ke website 2 tanpa dilepas, maka ditolak E-HOSTNAME-TAKEN; setelah dilepas dan diverifikasi ulang, domain menayangkan website 2 saja. | Otomatis |
