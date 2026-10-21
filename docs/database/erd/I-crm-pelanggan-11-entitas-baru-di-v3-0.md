<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas I. CRM pelanggan (11 entitas, baru di v3.0)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| contacts | site_id, name, email_norm, phone_e164, company, source (form, manual, import, booking, whatsapp, instagram, phone, walk_in), first_touch jsonb (halaman, perujuk, UTM, perangkat), owner_note, marketing_consent_at, marketing_consent_source, unsubscribed_at, score (Could), custom jsonb, last_activity_at, merged_into_id, deleted_at | UNIQUE parsial (site_id, email_norm) dan (site_id, phone_e164) saat tidak dihapus | RB-27, RB-28; hanya pemilik; admin tidak membaca isi (BRU-22) |
| crm_pipelines | site_id, name, is_default | UNIQUE parsial (site_id) saat is_default | Satu pipeline bawaan per website; banyak pipeline = Fase 3 |
| crm_stages | pipeline_id, name (1–40), position, kind (open, won, lost), rot_days (bawaan 3) | UNIQUE (pipeline_id, position) | ≤ 8 tahapan; tepat satu won dan satu lost |
| deals | site_id, contact_id, pipeline_id, stage_id, title, value_idr, items jsonb (item katalog, jumlah, harga), expected_close_on, status (open, won, lost), lost_reason (price, not_fit, no_response, other), lost_note, won_at, lost_at, first_response_at, stage_changed_at | Indeks (site_id, stage_id, status) | lost wajib lost_reason (V-25) |
| crm_activities | site_id, contact_id, deal_id, kind (form_submitted, note, stage_changed, wa_opened, email_opened, email_sent, task_done, import, merged, booking, automation), body (≤ 2.000), meta jsonb, actor (owner, system), created_by, edited_until | Indeks (contact_id, created_at desc) | Hanya tambah kecuali note ≤ 24 jam; menggantikan lead_notes |
| crm_tasks | site_id, contact_id, deal_id, title, due_at, has_time, status (open, done, cancelled), done_at, source (manual, auto_new_lead, automation, booking) | Indeks (site_id, status, due_at) | Ringkasan harian 08.00 waktu lokal tenant |
| message_templates | site_id, channel (whatsapp, email), name, subject, body (≤ 1.000), variables | UNIQUE (site_id, channel, name) | ≤ 20 per website; 3 template bawaan dari kategori template |
| crm_tags † | site_id, name (1–30), color | UNIQUE (site_id, name) | ≤ 50 per website (Should) |
| contact_tags † | contact_id, tag_id | PK (contact_id, tag_id) | Ikut terhapus bersama kontak |
| crm_custom_fields † | site_id, entity (contact, deal), key, label, type (text, number, date, select, boolean), options | UNIQUE (site_id, entity, key) | ≤ 20 per website; nilai di custom jsonb |
| crm_automations † | site_id, name, trigger (lead_created, stage_changed, task_overdue), conditions jsonb, actions jsonb (create_task, move_stage, add_tag, notify_owner), enabled, run_count | ≤ 10 per website | Dijalankan worker dari outbox; idempoten per (aturan, peristiwa) |
