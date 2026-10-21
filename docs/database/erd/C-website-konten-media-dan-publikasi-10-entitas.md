<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas C. Website, konten, media, dan publikasi (10 entitas)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| sites | template_version_id, origin_order_line_id (v3), category (v3), city_code (v3), slug, title, status (provisioning, ready, published, suspended, deleted), active_release_id, desired_release_id, desired_mapping_revision, active_mapping_revision, deleted_at | UNIQUE origin_order_line_id, slug, active_release_id (UNIQUE tenant_id dihapus di v3) | Penunjuk aktif hanya active_release_id; diubah dengan CAS per site |
| site_settings (baru) | site_id, timezone (Asia/Jakarta, Asia/Makassar, Asia/Jayapura), lead_email, lead_email_verified_at, public_form_token, default_locale | PK site_id; UNIQUE public_form_token | Pemilik mengubah zona waktu dan email lead (dengan verifikasi) |
| onboarding_steps (baru) | site_id, step (business, logo, contact, location, hours), status (pending, done, skipped), completed_at | UNIQUE (site_id, step) | Dasar persentase kelengkapan |
| site_revisions | site_id, revision_no, kind (baru: draft, publish), schema_version, document jsonb, content_hash, created_by | UNIQUE (site_id, revision_no) | Tidak bisa diubah; revisi publish memuat cms_snapshot |
| cms_collections | site_id, key (services, menu, articles), schema_version, schema_json | UNIQUE (site_id, key) | Hanya 3 koleksi bawaan; bukan pembuat skema bebas |
| cms_items | collection_id, slug, data jsonb, revision_no, sort_order (baru), deleted_at | UNIQUE (collection_id, slug) | ≤ 100 item per koleksi; If-Match per item |
| media_assets | site_id, object_key, original_name (baru), mime_type, bytes, width (baru), height (baru), sha256, alt_text (baru), status, delete_after, created_by | UNIQUE object_key | Karantina → pemeriksaan → ready |
| revision_assets | revision_id, media_asset_id | UNIQUE (revision_id, media_asset_id) | Menahan media selama revisi/release membutuhkan |
| releases | revision_id, release_no, object_prefix, manifest_hash, status, error_code (baru), activated_at | UNIQUE (site_id, release_no), object_prefix | Objek di R2 tidak pernah ditimpa |
| preview_sessions (baru) | site_id, revision_id, token_hash, expires_at (≤ 15 menit), created_by | UNIQUE token_hash | Token mentah tidak disimpan |
