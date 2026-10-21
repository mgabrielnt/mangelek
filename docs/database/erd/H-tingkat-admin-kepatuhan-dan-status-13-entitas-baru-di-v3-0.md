<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas H. Tingkat, admin, kepatuhan, dan status (13 entitas, baru di v3.0)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| template_seats | template_version_id, site_id, order_id, category, city_code, status (held, reserved, active, released), hold_expires_at, released_at | UNIQUE parsial (template_version_id, category, city_code) saat held/reserved/active | Kunci baris template saat menahan; jumlah aktif + ditahan ≤ seat_limit |
| scheduled_changes | subscription_id, target_plan_price_id, target_template_version_id, seat_id, status (scheduled, applied, cancelled), effective_cycle_key, created_by, applied_at | UNIQUE parsial subscription_id saat scheduled | Diterapkan oleh SUB-013 tepat sekali |
| admin_role_assignments | operator_id, role (owner, operations, finance, support, content, marketing, auditor), granted_by, revoked_at | UNIQUE parsial (operator_id, role) saat aktif | Minimal satu owner aktif |
| admin_approvals | action, object_type, object_id, payload_hash, reason, requested_by, decided_by, status, not_before, expires_at, executed_at | — | Penyetuju ≠ peminta kecuali setelah not_before (mode satu operator) |
| impersonation_sessions | operator_id, tenant_id, reason, started_at, ends_at (≤ 60 menit), ended_at | — | Hanya baca; email ke pelanggan |
| customer_notes † | tenant_id, body (≤ 2.000), created_by | FK komposit tenant | Tidak terlihat pelanggan |
| abuse_reports † | site_id, category, description, reporter_email_hash, status, handled_by | — | Ditindaklanjuti lewat ADM-007 |
| feature_flags | key, enabled, message, updated_by | PK key | Dibaca dengan cache ≤ 1 menit |
| data_requests | subject_email_hash, site_id, kind (access, rectify, copy, erase, withdraw, restrict), status, verified_at, due_at, responded_at, handled_by, response_ref | — | due_at = diterima + 72 jam |
| data_incidents | detected_at, summary, data_categories, affected_count, notified_subjects_at, notified_authority_at, status | — | Tenggat notifikasi 72 jam sejak detected_at |
| status_incidents | title, components (array), impact, status, started_at, resolved_at | — | Diterbitkan ke berkas status statis |
| status_updates | incident_id, status, message, posted_by, posted_at | — | Hanya tambah |
| vouchers † | code, percent_off, max_uses, used, valid_from, valid_until | UNIQUE code | Fase 2 |
