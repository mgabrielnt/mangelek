<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas B. Katalog, pemasaran, dan tagihan (14 entitas)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| plans | code (standar, premium, eksklusif), name, tier_rank (v3), features jsonb (v3: paket animasi, dukungan prioritas, konsultasi), quota_version, quotas jsonb (RB-07), enabled | UNIQUE code | Tiga tingkat; fitur dibaca dari data |
| plan_prices | plan_id, period_months (1, 12), amount_rupiah, currency, valid_from, valid_until | Tanpa rentang berlaku tumpang tindih per paket + periode | Harga lama tidak diubah; seed tiga tingkat (M-01) |
| templates | code, name, category (company, education, restaurant, beauty, property, service), enabled, sort_order (baru) | UNIQUE code | Katalog publik |
| template_versions | template_id, version, schema_version, manifest jsonb (halaman, blok, isi demo, koleksi), object_prefix, preview_url (baru), tier (v3), seat_limit (v3, 10 untuk Eksklusif), animation_pack (v3), perf_budget_kb (v3), quality_score (v3), status (draft, released, retired) | UNIQUE (template_id, version) | Hanya released yang bisa dibeli; dirilis bila lolos BLK-011 dan rubrik ≥ 7/10 |
| subscriptions | site_id (v3), plan_id, status (pending, active, grace, suspended, expired), active_until, grace_until, retention_until, auto_renew = false, cancel_at_period_end (baru), canceled_at (baru), cancel_reason (baru) | UNIQUE site_id (v3; sebelumnya tenant_id) | Ditulis server; satu langganan per website; perubahan periode/tingkat/template di scheduled_changes |
| subscription_periods | subscription_id, order_line_id, starts_at, ends_at, quota_snapshot | UNIQUE order_line_id; EXCLUDE tumpang tindih [starts_at, ends_at) | Tidak bisa diubah; dibuat dengan kunci baris langganan |
| orders | purpose (initial, renewal, domain, comp, manual), site_id (v3, kosong untuk website baru), subscription_id, template_version_id, merchant_order_id, invoice_number, cycle_key, status, total_rupiah, billing_snapshot jsonb, expires_at, paid_at | UNIQUE merchant_order_id, invoice_number; UNIQUE parsial cycle_key saat pending/paid | Total = jumlah baris (diperiksa dalam transaksi) |
| order_lines | order_id, plan_price_id, kind (subscription, domain_registration, domain_renewal), description, quantity = 1, unit_rupiah, total_rupiah, period_months, quota_snapshot | FK komposit tenant | Harga disalin saat order dibuat |
| payments | order_id, provider, provider_order_ref (baru), attempt_no (baru), transaction_id, status, method, amount_rupiah, token_expires_at (baru), paid_at, provider_checked_at | UNIQUE provider_order_ref; UNIQUE (provider, transaction_id) | Satu order bisa beberapa percobaan |
| payment_events | payment_id, provider, dedupe_key, merchant_order_ref, signature_valid, payload_redacted, received_at, processed_at, processing_status, error_code | UNIQUE (provider, dedupe_key) | Inbox server; tanpa tenant tepercaya saat diterima |
| refunds | payment_id, refund_key, provider_ref, amount_rupiah > 0, reason_category (baru), reason, status, requested_by (baru), requested_at, completed_at | UNIQUE refund_key | Total sukses ≤ pembayaran (kunci baris) |
| waitlist_entries (baru) | name, email, phone_e164, business_type, consent_document_id | UNIQUE email; UNIQUE phone_e164 | Hanya server; dihapus 90 hari setelah peluncuran |
| referral_codes † (baru) | code, active | UNIQUE tenant_id, code | Fase 2 |
| referral_rewards † (baru) | referral_code_id, referred_tenant_id, qualifying_order_id, status (pending, granted, revoked), granted_at | UNIQUE referred_tenant_id | Fase 2; hadiah diberikan lewat order Rp0 |
