<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas E. Lead dan analitik (4 entitas)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| form_submissions | site_id, form_key, request_key, payload jsonb (nama, email, telepon, pesan), spam_status (clean, spam, rejected), consent_document_id (baru), consented_at (baru), ip_hash (baru), user_agent (baru, ≤ 256), delete_after | UNIQUE (site_id, request_key) | Tenant dari hostname tepercaya; hanya pemilik membaca |
| leads (baru) | site_id, form_submission_id, contact_id (v3), source (form, manual, import, booking), name, email, phone_e164, utm jsonb (v3), read_at, deleted_at; status dan tindak lanjut pindah ke deals dan crm_tasks (v3) | UNIQUE form_submission_id | Hapus permanen atas permintaan (LEAD-009, CRM-009) |
| analytics_events (baru) | site_id, release_id, occurred_at, kind (pageview, wa_click, wa_item_click, directions_click, map_open), path, referrer_host, device, country, visitor_hash (garam harian) | Indeks (site_id, occurred_at) | Tanpa IP mentah; disimpan 30 hari |
| analytics_daily (baru) | site_id, date, views, visitors, wa_clicks, directions_clicks (v3), map_opens (v3), leads, top_paths jsonb, top_referrers jsonb, devices jsonb | UNIQUE (site_id, date) | Disimpan 13 bulan |
