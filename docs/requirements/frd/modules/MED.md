<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# MED — Media

Fitur utama: Upload intent, karantina, verifikasi, varian, kuota per website

Ringkas: 7 kebutuhan (5 Must), 6 kriteria penerimaan, 6 test case.

## Kebutuhan fungsional

| ID | Fungsi | Aktor | Input | Proses | Output | Prioritas | Sumber BRD | Use case | Kriteria penerimaan | Test case |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-MED-001 | Meminta izin unggah | PEL | site_id, mime_type (JPG/PNG/WebP), bytes ≤ 1.500.000, sha256 | Cek editor tidak terkunci; reservasi kuota secara atomik di usage_counters (tolak bila terpakai + ukuran > 500 MB); buat media_assets quarantined; URL unggah bertanda tangan berlaku 10 menit dengan header wajib | UploadIntent; atau E-UPLOAD-TOO-LARGE, E-UNSUPPORTED-TYPE (422), E-QUOTA-EXCEEDED (429) | Must | FR-12, BRU-11 | UC-05, UC-08 | AC-MED-01 | TC-MED-001 |
| FR-MED-002 | Mengunggah file | PEL | File gambar | Browser memeriksa jenis dan ukuran (V-08) sebelum mengunggah langsung ke R2 privat (karantina) | Objek tersimpan di karantina | Must | FR-12 | UC-05, UC-08 | AC-MED-01 | TC-MED-001 |
| FR-MED-003 | Memverifikasi unggahan | SIS | POST /v1/media/{id}/complete | Pekerjaan media.verify: cocokkan ukuran dan hash; cek magic bytes sesuai MIME; dimensi ≤ 6.000 px; hapus metadata EXIF/GPS; pindah ke prefix siap pakai; intent tanpa unggahan > 24 jam dibersihkan | ready + URL, atau rejected beserta alasan; kuota dikembalikan bila ditolak | Must | FR-12, NFR-07 | UC-05, UC-08 | AC-MED-02 | TC-MED-002 |
| FR-MED-004 | Membuat varian gambar | SIS | Media ready | WebP lebar 480, 960, 1.600 px | Website memakai srcset; file asli tidak dikirim ke ponsel | Should | NFR-01 | UC-08 | AC-MED-03 | TC-MED-003 |
| FR-MED-005 | Menampilkan pustaka media | PEL | GET /v1/sites/{id}/media (kursor, ≤ 100 per halaman) | Tampilkan nama asli, ukuran, teks alternatif, jumlah pemakaian, kuota terpakai/sisa | Pustaka dengan sisa kuota | Must | FR-12 | UC-08 | AC-MED-04 | TC-MED-004 |
| FR-MED-006 | Menghapus media | PEL | DELETE /v1/media/{id} | Jadwalkan hapus (delete_after); file tetap disimpan selama direferensikan release yang masih disimpan; kuota dikembalikan saat file benar-benar dihapus | 204; media hilang dari pustaka | Must | FR-12 | UC-08 | AC-MED-05 | TC-MED-005 |
| FR-MED-007 | Mengingatkan teks alternatif | PEL | Gambar tanpa teks alternatif | Daftar periksa sebelum terbit; tidak memblokir | Gambar tanpa teks alternatif ditandai | Should | NFR-13 | UC-07, UC-08 | AC-MED-06 | TC-MED-006 |

## Kriteria penerimaan

| ID | Kriteria penerimaan | Kebutuhan | Prioritas | Test case |
| --- | --- | --- | --- | --- |
| AC-MED-01 | Diberikan file 1.500.001 byte, file GIF, dan kuota 499,9 MB, ketika izin unggah diminta, maka berturut-turut E-UPLOAD-TOO-LARGE, E-UNSUPPORTED-TYPE, dan E-QUOTA-EXCEEDED; 10 unggahan paralel tidak pernah melampaui kuota. | MED-001, MED-002 | Must | TC-MED-001 |
| AC-MED-02 | Diberikan file JPG berisi EXIF GPS, file PNG berekstensi palsu, dan intent tanpa unggahan, ketika diverifikasi, maka JPG ready tanpa EXIF, file palsu rejected dengan kuota dikembalikan, dan intent yatim dibersihkan dalam 24 jam. | MED-003 | Must | TC-MED-002 |
| AC-MED-03 | Diberikan media ready, ketika varian dibuat, maka WebP 480, 960, dan 1.600 px tersedia dan halaman memakai srcset. | MED-004 | Should | TC-MED-003 |
| AC-MED-04 | Diberikan 150 media, ketika pustaka dibuka, maka halaman kursor ≤ 100 item menampilkan ukuran, teks alternatif, jumlah pemakaian, dan sisa kuota. | MED-005 | Must | TC-MED-004 |
| AC-MED-05 | Diberikan media dipakai release tersimpan, ketika dihapus, maka hilang dari pustaka tetapi file tetap tersedia untuk release itu, dan kuota baru dikembalikan saat file dihapus fisik. | MED-006 | Must | TC-MED-005 |
| AC-MED-06 | Diberikan gambar tanpa teks alternatif, ketika Terbitkan ditekan, maka daftar periksa menandainya tanpa memblokir terbit. | MED-007 | Should | TC-MED-006 |

## Test case

| ID | Kelompok | Judul / memverifikasi | Kebutuhan dicakup | Prioritas | Wajib G1 | Level | Lingkungan | Data uji | Langkah kunci | Lulus bila | Otomasi |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-MED-001 | MED — Media | Meminta izin unggah | MED-001, MED-002 | Must | Ya | Integrasi | Staging | 3 file + 10 unggahan paralel | Minta intent; jalankan 10 intent bersamaan | AC-MED-01 terpenuhi: Diberikan file 1.500.001 byte, file GIF, dan kuota 499,9 MB, ketika izin unggah diminta, maka berturut-turut E-UPLOAD-TOO-LARGE, E-UNSUPPORTED-TYPE, dan E-QUOTA-EXCEEDED; 10 unggahan paralel tidak pernah melampaui kuota. | Otomatis |
| TC-MED-002 | MED — Media | Memverifikasi unggahan | MED-003 | Must | Ya | Keamanan | Staging + jam simulasi | 3 file uji | Unggah; panggil complete; majukan jam 25 jam | AC-MED-02 terpenuhi: Diberikan file JPG berisi EXIF GPS, file PNG berekstensi palsu, dan intent tanpa unggahan, ketika diverifikasi, maka JPG ready tanpa EXIF, file palsu rejected dengan kuota dikembalikan, dan intent yatim dibersihkan dalam 24 jam. | Otomatis |
| TC-MED-003 | MED — Media | Membuat varian gambar | MED-004 | Should | Tidak | Integrasi | Staging | Foto 4.000 px | Unggah; terbitkan; periksa srcset | AC-MED-03 terpenuhi: Diberikan media ready, ketika varian dibuat, maka WebP 480, 960, dan 1.600 px tersedia dan halaman memakai srcset. | Otomatis |
| TC-MED-004 | MED — Media | Menampilkan pustaka media | MED-005 | Must | Ya | E2E | Staging | 150 media | Buka pustaka; muat halaman 2 | AC-MED-04 terpenuhi: Diberikan 150 media, ketika pustaka dibuka, maka halaman kursor ≤ 100 item menampilkan ukuran, teks alternatif, jumlah pemakaian, dan sisa kuota. | Otomatis |
| TC-MED-005 | MED — Media | Menghapus media | MED-006 | Must | Ya | Integrasi | Staging + jam simulasi | Media di release lama | Hapus; buka release; pangkas release; cek usage_counters | AC-MED-05 terpenuhi: Diberikan media dipakai release tersimpan, ketika dihapus, maka hilang dari pustaka tetapi file tetap tersedia untuk release itu, dan kuota baru dikembalikan saat file dihapus fisik. | Otomatis |
| TC-MED-006 | MED — Media | Mengingatkan teks alternatif | MED-007 | Should | Tidak | E2E | Staging | 2 gambar tanpa alt | Tekan Terbitkan; baca daftar periksa | AC-MED-06 terpenuhi: Diberikan gambar tanpa teks alternatif, ketika Terbitkan ditekan, maka daftar periksa menandainya tanpa memblokir terbit. | Otomatis |
