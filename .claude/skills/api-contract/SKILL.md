---
name: api-contract
description: Aturan kontrak API Mangelek - OpenAPI di docs/specs ke tipe di packages/contracts, format error, validasi input, idempotensi, dan versi.
user-invocable: false
---
# Kontrak API

1. Sumber kontrak: `docs/specs/S-xx/api.yaml` (ditulis architect). Referensi lama: `docs/planning/openapi-v5.2.json`.
2. Tipe request/response dan skema validasi di `packages/contracts/src/<modul>/`; diekspor dari satu index.
   Frontend dan backend hanya memakai tipe dari sini.
3. Error mengikuti bentuk Problem Details (RFC 9457): `type`, `title`, `status`, `detail`, plus `code` dari
   katalog `docs/requirements/frd/9-error.md` (mis. `E-RATE-LIMITED`). Pesan untuk pengguna dari katalog itu.
4. Validasi input di batas API; tolak field tak dikenal; batas panjang sesuai FRD.
5. Operasi yang bisa terulang (checkout, webhook, kirim formulir, provisioning) memakai kunci idempoten unik.
6. Konteks tenant/site dari sesi atau hostname terverifikasi, tidak pernah dari body/query sebagai bukti akses.
7. Perubahan kontrak yang memutus klien = CR kelas Sedang (architect + tech-lead + security).
