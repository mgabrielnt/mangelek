---
name: security-gate
description: Daftar periksa review keamanan Mangelek (OWASP ASVS 5.0 Level 2 yang relevan, OWASP Top 10, isolasi tenant, webhook, rahasia, dependensi, lisensi, UU PDP) dan format temuan.
user-invocable: false
---
# Gerbang keamanan

Jalankan dulu (hanya baca): `git diff --stat main...HEAD`, `pnpm audit --prod`, gitleaks bila terpasang.
Bila tersedia, perintah bawaan `/security-review` boleh dipakai sebagai lapisan tambahan.

## Periksa pada diff
- **Akses:** otorisasi server per operasi; konteks tenant dari sesi/hostname; tes lintas tenant ada.
- **Data:** RLS aktif + force di tabel baru; tidak ada query tanpa konteks tenant; tidak ada SQL dirakit dari string.
- **Input/output:** validasi di batas API; sanitasi HTML/URL konten editor; batas ukuran upload; tidak ada `dangerouslySetInnerHTML` tanpa sanitasi.
- **Auth/sesi:** cookie httpOnly+secure+sameSite; CSRF untuk mutasi berbasis cookie; MFA admin; batas percobaan login.
- **Webhook/jobs:** tanda tangan atas raw body; idempoten; retry terbatas.
- **Rahasia:** tidak ada di kode, log, atau `NEXT_PUBLIC_`.
- **Publik:** rate limit + Turnstile di formulir; draft tidak pernah tersaji publik; cache memuat site_id + versi.
- **Dependensi & lisensi:** paket baru berlisensi bebas; Commons Clause (React Bits) tidak masuk template berbayar.
- **UU PDP:** persetujuan tercatat, masa simpan, hak hapus, log tanpa data pribadi.

## Format temuan di `docs/specs/S-xx/security.md`
| ID | Severity | File:baris | Masalah | Bukti | Perbaikan |
Severity kritis/tinggi = BLOK. Putusan akhir: LULUS atau BLOK.
