---
name: adr-write
description: Template ADR Mangelek (konteks, opsi, biaya bulanan Rupiah, keamanan minimum, keputusan, akibat) dan aturan penomoran serta penggantian ADR.
user-invocable: false
---
# Menulis ADR

Lokasi: `docs/architecture/decisions/ADR-nnn-<slug>.md`. Nomor berurutan, tidak pernah dipakai ulang.

```markdown
# ADR-nnn <judul>
Status: Usulan | Disetujui Gab (tanggal) | Digantikan oleh ADR-mmm
Tanggal: YYYY-MM-DD · Kelas perubahan: Kecil | Sedang | Besar

## Konteks
<masalah, NFR terkait (NFR-xx), batasan: K-28, anggaran>

## Opsi
| Kriteria | Opsi A | Opsi B | Opsi C |
| --- | --- | --- | --- |
| Biaya Tahap 0 (Rp/bulan) | | | |
| Biaya Tahap 1 perkiraan | | | |
| Batas paket gratis yang relevan | | | |
| Keamanan minimum terpenuhi? (HTTPS, RLS, backup, MFA, rate limit, secrets) | | | |
| Kecocokan dengan kode yang ada | | | |
| Risiko utama | | | |

## Keputusan
<opsi + alasan dalam 3-5 kalimat>

## Akibat
- Positif / negatif / pekerjaan migrasi / pemicu untuk ditinjau ulang

## Sumber
- [Halaman harga resmi](url), dibuka YYYY-MM-DD
```

Aturan: harga hanya dari halaman resmi yang dibuka (bukan ingatan); kurs yang dipakai ditulis. Kelas Besar = Status Usulan sampai Gab setuju. ADR lama tidak dihapus: ubah Status menjadi "Digantikan oleh ADR-mmm".
