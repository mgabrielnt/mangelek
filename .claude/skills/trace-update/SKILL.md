---
name: trace-update
description: Memperbarui docs/requirements/traceability.csv (FR, use case, rute UI, operasi API, entitas DB, test case, status) untuk irisan Mangelek.
user-invocable: false
---
# Memperbarui traceability

File: `docs/requirements/traceability.csv`. Kolom tetap:
`Requirement_ID,Type,Source,Use_Case,Module,UI_Route,API_Operation,DB_Entity,Test_ID,Status`

- Satu baris per FR. Bila FR sudah ada, ubah barisnya; jangan duplikat.
- `Status`: `Direncanakan` (masuk spec) → `Dibangun` (G4) → `Terverifikasi` (G5, ada bukti tes) → `Dirilis` (production).
- `UI_Route`, `API_Operation`, `DB_Entity` diisi dari plan.md/api.yaml saat diketahui; kosong bila belum.
- Beberapa nilai dalam satu sel dipisah `;`. Bungkus sel berkoma dengan tanda kutip.
- Jangan mengubah Status menjadi `Terverifikasi` tanpa qa-report.md yang menunjukkan tes lulus.
