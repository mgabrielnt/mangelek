<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas A. Identitas dan akses (7 entitas)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| auth_users | id | PK | Milik Supabase Auth; aplikasi hanya memakai PK |
| profiles | display_name, locale (id), phone_e164 (baru), marketing_opt_out (baru), signup_attribution jsonb (baru: utm, perujuk, kode rujukan, halaman pendaratan) | PK = FK auth_users.id | Pemilik baca/ubah sendiri; atribusi ditulis sekali saat daftar |
| tenants | name, status (active, suspended, deleting, deleted), reference_code char(8) (baru), suspension_reason, suspended_at, legal_hold bool (baru), deleted_at | UNIQUE reference_code | Status suspended hanya oleh admin; legal_hold menahan purge |
| memberships | user_id, role (owner) | UNIQUE tenant_id; UNIQUE (tenant_id, user_id) | Satu pemilik per tenant; satu tenant boleh punya banyak website |
| platform_operators (baru) | user_id, active, mfa_enrolled_at (v3), last_login_at | UNIQUE user_id | Hanya server; MFA aal2 wajib; peran di admin_role_assignments |
| legal_documents (baru) | kind (terms, privacy, form_consent, site_privacy_template, dpa, ropa, subprocessors), version, effective_at, content_hash, url | UNIQUE (kind, version) | Dibaca publik; ditulis admin |
| consents (baru) | subject_type (user, lead), subject_id, legal_document_id, accepted_at, ip_hash | UNIQUE (subject_type, subject_id, legal_document_id) | Hanya tambah; bukti persetujuan |
