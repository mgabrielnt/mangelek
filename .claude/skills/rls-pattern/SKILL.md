---
name: rls-pattern
description: Pola isolasi tenant Mangelek di Postgres - kolom tenant, RLS per operasi, konteks tenant per transaksi, role aplikasi tanpa BYPASSRLS, dan tes tenant A vs B.
user-invocable: false
---
# Pola RLS dan isolasi tenant

Sumber: `docs/security/verification-plan.md`, `docs/architecture/boundaries.md`.

- Setiap tabel milik tenant punya `tenant_id uuid not null` (+ `site_id` bila per website), FK, dan indeks yang diawali kolom tenant.
- `alter table ... enable row level security; ... force row level security;`
- Policy terpisah untuk select/insert/update/delete. Insert/update wajib `with check` pada kolom tenant.
- Konteks tenant di-set di **transaksi yang sama** dengan query (mis. `set_config('app.tenant_id', $1, true)`), dibaca policy lewat fungsi stabil. Jangan pakai konteks tingkat sesi pada koneksi terpool.
- Bila memakai auth bawaan penyedia (mis. `auth.uid()`), bungkus dalam `(select ...)` di policy agar dievaluasi sekali.
- Role aplikasi: bukan owner tabel, tanpa BYPASSRLS. Operasi sistem lintas tenant lewat fungsi khusus yang diaudit.
- Cache query pooler dimatikan untuk jalur transaksi sensitif.
- Tes wajib per tabel: (1) tenant A membaca baris A; (2) tenant A tidak melihat baris B; (3) tenant A gagal insert/update dengan tenant_id B; (4) tanpa konteks tenant = nol baris.
