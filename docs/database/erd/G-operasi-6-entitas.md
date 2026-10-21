<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas G. Operasi (6 entitas)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| outbox | event_type, aggregate_type, aggregate_id, dedupe_key, payload, status, available_at, dispatched_at | UNIQUE dedupe_key | Ditulis atomik bersama perubahan bisnis; sumber kebenaran pekerjaan (pesan Queues hanya hidup 24 jam) |
| job_runs | outbox_id, job_type, idempotency_key, status, attempts, max_attempts, lease_until, next_retry_at, result_ref, last_error_code | UNIQUE idempotency_key | Satu baris per pekerjaan logis; lease memulihkan worker mati |
| idempotency_records | actor_id, operation, client_key, request_hash, state, response_status, response_body, expires_at (24 jam) | UNIQUE (tenant_id, actor_id, operation, client_key) | Isi berbeda dengan kunci sama → 409 |
| audit_events | actor_ref, action, object_type, object_id, outcome, correlation_id, metadata_redacted | — | Hanya tambah; tanpa kata sandi, token, atau data kartu |
| usage_counters | site_id, metric (media_bytes, forms, publishes, emails), window_start, window_end, used | UNIQUE (site_id, metric, window_start) | Penambahan/reservasi atomik |
| exports | site_id, requested_by, kind (baru: leads, content), params jsonb (baru), job_id, status, object_key, expires_at | FK komposit tenant | URL unduhan dibuat saat GET, berlaku 15 menit |
