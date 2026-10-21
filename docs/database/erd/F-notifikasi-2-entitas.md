<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas F. Notifikasi (2 entitas)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| notification_deliveries | outbox_id, channel (email), template_code, recipient_ref, priority (baru: 1–3), scheduled_for (baru), status (queued, deferred, sent, delivered, bounced, complained, failed), provider_message_id, attempt_count, next_retry_at | UNIQUE (outbox_id, channel, recipient_ref) | Gagal email tidak membatalkan transaksi bisnis |
| email_suppressions (baru) | email_hash, reason (hard_bounce, complaint, manual) | UNIQUE email_hash | Dicek sebelum kirim; hanya server |
