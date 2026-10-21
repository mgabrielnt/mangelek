---
name: spec-slice
description: Template dan langkah menulis spec irisan Mangelek (docs/specs/S-xx/spec.md) dari modul FRD - story INVEST, kriteria Diberikan-ketika-maka, di luar cakupan, dan penanda klarifikasi.
user-invocable: false
---
# Menulis spec irisan

1. Baca baris irisan di `docs/agents/roadmap.md` (tujuan + modul + ID FR).
2. Baca hanya modul FRD terkait di `docs/requirements/frd/modules/`. Ambil kriteria terima (AC-xxx) dan test case (TC-xxx) apa adanya; jangan mengarang ulang.
3. Bila FRD dan BRD/keputusan bertentangan, atau perilaku tidak jelas, tulis `[PERLU KLARIFIKASI: ...]` dan laporkan `PERLU_KEPUTUSAN`. G1 tidak lulus selama penanda ini ada.
4. Tulis `docs/specs/S-xx/spec.md`:

```markdown
# S-xx <nama irisan>
Tujuan: <1 kalimat hasil bagi pelanggan>
Modul: <kode> · Fase BRD: <0/1/2>

## Story
### S-xx-US01 <judul>  (FR-XXX-nnn, Must)
Sebagai <peran>, saya ingin <tindakan>, agar <manfaat>.
Kriteria terima:
- AC-XXX-nn: Diberikan ..., ketika ..., maka ...
Test case: TC-XXX-nnn
Data pribadi: <tidak ada | jenis + persetujuan + masa simpan + hak hapus>

## Di luar cakupan
- ...

## Ketergantungan
- <irisan/akun/layanan>
```
5. Story harus INVEST: mandiri, bisa dinegosiasi, bernilai, bisa diperkirakan, kecil (selesai ≤ 1 irisan), bisa diuji.
6. Jalankan skill `trace-update` untuk FR yang masuk irisan.
