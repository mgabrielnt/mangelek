<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

# Entitas D. Domain (6 entitas)

Diagram: lihat Mangelek-Diagram/mmd/17*-erd-*.mmd. Tanda † = Fase 2.

| Entitas | Atribut utama | Kunci dan unik | Aturan dan akses |
| --- | --- | --- | --- |
| domain_tlds (baru) | tld (my.id, com), enabled, markup_rupiah (bawaan 25.000), requires_documents, registrar | UNIQUE tld | Diubah admin (ADM-009); berlaku untuk quote baru |
| domain_quotes | fqdn, operation (register, renew), registrar, cost_rupiah, fee_rupiah, tax_rupiah, total_rupiah = cost + fee + tax, renewal_estimate_rupiah, available (baru), expires_at | FK komposit tenant | Tidak bisa diubah; sekali pakai lewat UNIQUE domain_orders.quote_id |
| domains | fqdn, registrar, provider_domain_ref, registrant_ref, managed, status, registered_at, expires_at, auto_renew = false, dns_zone_ref, dns_snapshot, transfer_requested_at (baru) | UNIQUE fqdn | Domain eksternal boleh tanpa registrant/provider ref |
| domain_orders | order_line_id, quote_id, domain_id, operation, request_key, registrant_snapshot_enc bytea (baru, terenkripsi), registrant_ref, status, attempts (baru), error_code, next_check_at | UNIQUE order_line_id, request_key, quote_id | site_id tidak wajib (dibuat saat checkout); snapshot registran dihapus ≤ 30 hari setelah final |
| hostname_bindings | site_id, domain_id (kosong untuk subdomain bawaan), hostname, provider_hostname_ref, ownership_token_hash, ownership_status, dns_status, tls_status, binding_status, is_canonical, verified_at, last_probe_at | UNIQUE hostname; UNIQUE parsial site_id saat kanonik + connected | Host kanonik harus lolos probe; tombstone sebelum dipakai ulang |
| registrar_balance_checks (baru) | registrar, balance_rupiah, low_balance, checked_at | — | Hanya server; disimpan 90 hari |
