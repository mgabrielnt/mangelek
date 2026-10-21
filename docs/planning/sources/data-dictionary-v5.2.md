# Kamus data dan integritas v5.2

Model rancangan lengkap untuk lingkup MVP yang disepakati, bukan skema hasil inspeksi database produksi. Semua kolom ditampilkan di diagram domain. Kolom auth.users hanya referensi PK; sistem Auth vendor tetap dikelola vendor.

PK UUID, waktu timestamptz (UTC), uang integer rupiah. NN=NOT NULL; NULL=opsional. FK bergaris putus-putus karena PK surrogate tidak bergantung PK parent. Crow foot di ujung anak: 0..N; dua garis di parent: tepat 1; lingkaran+garis: 0..1. M:N dipecah melalui tabel penghubung.

Semua FK ON DELETE RESTRICT; penghapusan terjadwal dilakukan eksplisit dengan urutan dependensi. Bukti keuangan tidak dihapus mengikuti retensi konten. Retensi legal belum ditetapkan dan harus disahkan. Penghapusan user Auth memerlukan prosedur anonimisasi/reassignment untuk referensi pembuat, tidak boleh cascade diam-diam.

Tabel operasional yang bisa tanpa tenant hanya server/internal. Untuk job milik tenant, service memeriksa tenant sama; FK dengan tenant nullable tidak menjamin kecocokan saat NULL. Tidak ada akses pelanggan langsung untuk inbox/outbox/job/audit. Semua tabel exposed wajib RLS + grants minimum; service-role tidak dikirim ke browser.

## auth_users
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Referensi auth.users milik Supabase; hanya PK yang digunakan aplikasi, bukan skema internal provider.

## profiles
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK, FK |
| display_name | text | NN |  |
| locale | text | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: Validasi schema/status aplikasi sesuai kontrak.


- FK id -> auth_users.id; parent 1; anak 0..1; tenant composite=False; site composite=False; delete RESTRICT.

## tenants
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| name | text | NN |  |
| status | text | NN |  |
| deleted_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: status IN ('active','suspended','deleting','deleted')



## memberships
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| user_id | uuid | NN | FK |
| role | text | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: tenant_id,user_id; tenant_id

CHECK: role = 'owner'

MVP satu owner per tenant: UNIQUE tenant_id. Owner dapat mempunyai tenant berbeda secara model, tetapi satu site per paket.
- FK tenant_id -> tenants.id; parent 1; anak 0..1; tenant composite=False; site composite=False; delete RESTRICT.
- FK user_id -> auth_users.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## plans
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| code | text | NN |  |
| name | text | NN |  |
| quota_version | integer | NN |  |
| quotas | jsonb | NN |  |
| enabled | boolean | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: code

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Satu produk Website + CMS; quotas schema berversi dan divalidasi.

## plan_prices
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| plan_id | uuid | NN | FK |
| period_months | integer | NN |  |
| amount_rupiah | bigint | NN |  |
| currency | char(3) | NN |  |
| valid_from | timestamptz | NN |  |
| valid_until | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: period_months IN (1,12); amount_rupiah >= 0; currency = 'IDR'

Seed 200000/1 bulan dan 2400000/12 bulan. Harga lama immutable; cegah rentang aktif bertumpuk di transaksi katalog.
- FK plan_id -> plans.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## templates
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| code | text | NN |  |
| name | text | NN |  |
| enabled | boolean | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: code

CHECK: Validasi schema/status aplikasi sesuai kontrak.



## template_versions
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| template_id | uuid | NN | FK |
| version | text | NN |  |
| schema_version | integer | NN |  |
| manifest | jsonb | NN |  |
| object_prefix | text | NN |  |
| status | text | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: template_id,version

CHECK: status IN ('draft','released','retired')


- FK template_id -> templates.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## subscriptions
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| plan_id | uuid | NN | FK |
| status | text | NN |  |
| active_until | timestamptz | NULL |  |
| grace_until | timestamptz | NULL |  |
| retention_until | timestamptz | NULL |  |
| auto_renew | boolean | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: tenant_id

CHECK: auto_renew = false; status IN ('pending','active','grace','suspended','expired')


- FK tenant_id -> tenants.id; parent 1; anak 0..1; tenant composite=False; site composite=False; delete RESTRICT.
- FK plan_id -> plans.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## orders
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| subscription_id | uuid | NULL | FK |
| template_version_id | uuid | NULL | FK |
| merchant_order_id | text | NN |  |
| invoice_number | text | NULL |  |
| cycle_key | text | NULL |  |
| status | text | NN |  |
| currency | char(3) | NN |  |
| total_rupiah | bigint | NN |  |
| billing_snapshot | jsonb | NN |  |
| expires_at | timestamptz | NN |  |
| paid_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: merchant_order_id; invoice_number

CHECK: currency = 'IDR'; total_rupiah >= 0; status IN ('pending','paid','failed','expired','cancelled','partial_refund','refunded','chargeback')

Satu order renewal aktif per subscription/cycle: partial unique pending/paid; jumlah order_lines divalidasi transaksi sebelum checkout, bukan CHECK lintas tabel.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK subscription_id -> subscriptions.id; parent 0..1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK template_version_id -> template_versions.id; parent 0..1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## order_lines
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| order_id | uuid | NN | FK |
| plan_price_id | uuid | NULL | FK |
| kind | text | NN |  |
| description | text | NN |  |
| quantity | integer | NN |  |
| unit_rupiah | bigint | NN |  |
| total_rupiah | bigint | NN |  |
| period_months | integer | NULL |  |
| quota_snapshot | jsonb | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: kind IN ('subscription','domain_registration','domain_renewal'); quantity = 1; total_rupiah = quantity * unit_rupiah; unit_rupiah >= 0

Harga, periode dan kuota disalin ketika order dibuat. Domain fee/tax breakdown disimpan pada quote immutable.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK order_id -> orders.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK plan_price_id -> plan_prices.id; parent 0..1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## subscription_periods
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| subscription_id | uuid | NN | FK |
| order_line_id | uuid | NN | FK |
| starts_at | timestamptz | NN |  |
| ends_at | timestamptz | NN |  |
| quota_snapshot | jsonb | NN |  |
| created_at | timestamptz | NN |  |

UNIQUE: order_line_id

CHECK: ends_at > starts_at

Lock subscription saat menambah periode; tidak tumpang tindih. Entitlement dibuktikan period yang sudah dibayar, bukan flag browser.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK subscription_id -> subscriptions.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK order_line_id -> order_lines.id; parent 1; anak 0..1; tenant composite=True; site composite=False; delete RESTRICT.

## payments
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| order_id | uuid | NN | FK |
| provider | text | NN |  |
| transaction_id | text | NN |  |
| status | text | NN |  |
| method | text | NN |  |
| amount_rupiah | bigint | NN |  |
| currency | char(3) | NN |  |
| paid_at | timestamptz | NULL |  |
| provider_checked_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: provider,transaction_id

CHECK: amount_rupiah >= 0; currency = 'IDR'

Order dapat memiliki beberapa attempt. Paid kedua masuk rekonsiliasi; entitlement unik berdasarkan order_line.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK order_id -> orders.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## payment_events
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| payment_id | uuid | NULL | FK |
| provider | text | NN |  |
| dedupe_key | text | NN |  |
| merchant_order_ref | text | NN |  |
| signature_valid | boolean | NN |  |
| payload_redacted | jsonb | NN |  |
| received_at | timestamptz | NN |  |
| processed_at | timestamptz | NULL |  |
| processing_status | text | NN |  |
| error_code | text | NULL |  |

UNIQUE: provider,dedupe_key

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Inbox server-only, belum memiliki tenant tepercaya saat diterima. Midtrans tidak diasumsikan memiliki event_id universal: hash kanonik transaction_id+status+fraud+amount+refund identifier bila ada; simpan bukti redacted.
- FK payment_id -> payments.id; parent 0..1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## refunds
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| payment_id | uuid | NN | FK |
| refund_key | text | NN |  |
| provider_ref | text | NULL |  |
| amount_rupiah | bigint | NN |  |
| reason | text | NN |  |
| status | text | NN |  |
| requested_at | timestamptz | NN |  |
| completed_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: refund_key

CHECK: amount_rupiah > 0

Jumlah refund sukses <= amount pembayaran ditegakkan dengan row lock; domain sukses tidak otomatis refundable.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK payment_id -> payments.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## sites
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| template_version_id | uuid | NN | FK |
| slug | text | NN |  |
| title | text | NN |  |
| status | text | NN |  |
| active_release_id | uuid | NULL | FK |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |
| deleted_at | timestamptz | NULL |  |
| desired_release_id | uuid | NULL | FK |
| desired_mapping_revision | bigint | NN |  |
| active_mapping_revision | bigint | NN |  |

UNIQUE: tenant_id; slug; active_release_id

CHECK: status IN ('provisioning','ready','published','suspended','deleted')

Satu site per tenant pada MVP. active_release_id harus release site+tenant yang sama; FK ditambah setelah releases dibuat.
- FK tenant_id -> tenants.id; parent 1; anak 0..1; tenant composite=False; site composite=False; delete RESTRICT.
- FK template_version_id -> template_versions.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK active_release_id -> releases.id; parent 0..1; anak 0..1; tenant composite=True; site composite=True; delete RESTRICT.
- FK desired_release_id -> releases.id; parent 0..1; anak 0..N; tenant composite=True; site composite=True; delete RESTRICT.

## site_revisions
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| revision_no | bigint | NN |  |
| schema_version | integer | NN |  |
| document | jsonb | NN |  |
| content_hash | text | NN |  |
| created_by | uuid | NN | FK |
| created_at | timestamptz | NN |  |

UNIQUE: site_id,revision_no

CHECK: revision_no > 0

Immutable. document memuat halaman, navigasi, SEO, konfigurasi form dan snapshot koleksi CMS saat publish; tidak menyimpan script bebas.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK created_by -> auth_users.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## cms_collections
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| key | text | NN |  |
| schema_version | integer | NN |  |
| schema_json | jsonb | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: site_id,key

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Hanya tiga koleksi bawaan; bukan schema builder bebas.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## cms_items
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| collection_id | uuid | NN | FK |
| slug | text | NN |  |
| data | jsonb | NN |  |
| revision_no | bigint | NN |  |
| deleted_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: collection_id,slug

CHECK: revision_no > 0


- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK collection_id -> cms_collections.id; parent 1; anak 0..N; tenant composite=True; site composite=True; delete RESTRICT.

## media_assets
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| object_key | text | NN |  |
| mime_type | text | NN |  |
| bytes | bigint | NN |  |
| sha256 | text | NN |  |
| status | text | NN |  |
| delete_after | timestamptz | NULL |  |
| created_by | uuid | NN | FK |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: object_key

CHECK: bytes >= 0

Signed upload intent -> quarantine -> pemeriksaan -> ready. Penghapusan ditunda jika masih direferensikan release.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK created_by -> auth_users.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## revision_assets
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| revision_id | uuid | NN | FK |
| media_asset_id | uuid | NN | FK |
| created_at | timestamptz | NN |  |

UNIQUE: revision_id,media_asset_id

CHECK: Validasi schema/status aplikasi sesuai kontrak.


- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK revision_id -> site_revisions.id; parent 1; anak 0..N; tenant composite=True; site composite=True; delete RESTRICT.
- FK media_asset_id -> media_assets.id; parent 1; anak 0..N; tenant composite=True; site composite=True; delete RESTRICT.

## releases
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| revision_id | uuid | NN | FK |
| release_no | bigint | NN |  |
| object_prefix | text | NN |  |
| manifest_hash | text | NN |  |
| status | text | NN |  |
| activated_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |

UNIQUE: site_id,release_no; object_prefix

CHECK: status IN ('queued','building','validating','ready','failed')

Aktif ditentukan hanya oleh sites.active_release_id; menghindari dua sumber kebenaran status aktif.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK revision_id -> site_revisions.id; parent 1; anak 0..N; tenant composite=True; site composite=True; delete RESTRICT.

## domain_quotes
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| fqdn | text | NN |  |
| operation | text | NN |  |
| registrar | text | NN |  |
| cost_rupiah | bigint | NN |  |
| fee_rupiah | bigint | NN |  |
| tax_rupiah | bigint | NN |  |
| total_rupiah | bigint | NN |  |
| renewal_estimate_rupiah | bigint | NN |  |
| expires_at | timestamptz | NN |  |
| created_at | timestamptz | NN |  |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: operation IN ('register','renew'); cost_rupiah >= 0; fee_rupiah >= 0; tax_rupiah >= 0; total_rupiah = cost_rupiah + fee_rupiah + tax_rupiah

Quote immutable, harga renewal estimasi bukan janji tetap; nama premium di luar MVP.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## domains
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| fqdn | text | NN |  |
| registrar | text | NN |  |
| provider_domain_ref | text | NULL |  |
| registrant_ref | text | NULL |  |
| managed | boolean | NN |  |
| status | text | NN |  |
| registered_at | timestamptz | NULL |  |
| expires_at | timestamptz | NULL |  |
| auto_renew | boolean | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |
| dns_zone_ref | text | NULL |  |
| dns_snapshot | jsonb | NULL |  |

UNIQUE: fqdn

CHECK: auto_renew = false

Domain eksternal boleh tanpa registrant/provider ref; kepemilikan diverifikasi, domain transfer tidak menghapus histori order.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## domain_orders
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| order_line_id | uuid | NN | FK |
| quote_id | uuid | NN | FK |
| domain_id | uuid | NULL | FK |
| operation | text | NN |  |
| registrar_order_ref | text | NULL |  |
| request_key | text | NN |  |
| registrant_ref | text | NULL |  |
| status | text | NN |  |
| error_code | text | NULL |  |
| next_check_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: order_line_id; request_key; quote_id

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Domain FK baru diset setelah hasil sah; timeout status unknown, rekonsiliasi sebelum mencoba register ulang.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK order_line_id -> order_lines.id; parent 1; anak 0..1; tenant composite=True; site composite=False; delete RESTRICT.
- FK quote_id -> domain_quotes.id; parent 1; anak 0..1; tenant composite=True; site composite=False; delete RESTRICT.
- FK domain_id -> domains.id; parent 0..1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## hostname_bindings
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| domain_id | uuid | NULL | FK |
| hostname | text | NN |  |
| provider_hostname_ref | text | NULL |  |
| ownership_token_hash | text | NN |  |
| ownership_status | text | NN |  |
| dns_status | text | NN |  |
| tls_status | text | NN |  |
| binding_status | text | NN |  |
| is_canonical | boolean | NN |  |
| verified_at | timestamptz | NULL |  |
| last_probe_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: hostname

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Domain_id null untuk alamat bawaan. UNIQUE site_id WHERE is_canonical AND binding_status=connected; canonical host harus lolos probe. Tombstone/purge saat unlink sebelum reuse.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK domain_id -> domains.id; parent 0..1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## outbox
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NULL | FK |
| event_type | text | NN |  |
| aggregate_type | text | NN |  |
| aggregate_id | uuid | NN |  |
| dedupe_key | text | NN |  |
| payload | jsonb | NN |  |
| status | text | NN |  |
| available_at | timestamptz | NN |  |
| dispatched_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |

UNIQUE: dedupe_key

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Ditulis atomik dengan bisnis. aggregate_id referensi polimorfik terkontrol aplikasi; bukan FK yang dipalsukan.
- FK tenant_id -> tenants.id; parent 0..1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## job_runs
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NULL | FK |
| outbox_id | uuid | NN | FK |
| job_type | text | NN |  |
| idempotency_key | text | NN |  |
| status | text | NN |  |
| attempts | integer | NN |  |
| max_attempts | integer | NN |  |
| lease_until | timestamptz | NULL |  |
| next_retry_at | timestamptz | NULL |  |
| result_ref | jsonb | NULL |  |
| last_error_code | text | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: idempotency_key

CHECK: attempts >= 0; max_attempts > 0

Logical job satu row, retry mengubah attempts; lease dipakai untuk recovery worker mati.
- FK tenant_id -> tenants.id; parent 0..1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK outbox_id -> outbox.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## idempotency_records
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| actor_id | uuid | NN | FK |
| operation | text | NN |  |
| client_key | text | NN |  |
| request_hash | text | NN |  |
| state | text | NN |  |
| response_status | integer | NULL |  |
| response_body | jsonb | NULL |  |
| expires_at | timestamptz | NN |  |
| created_at | timestamptz | NN |  |

UNIQUE: tenant_id,actor_id,operation,client_key

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Payload berbeda dengan key sama -> 409. Simpan minimal selama window retry yang diumumkan; usulan 24 jam untuk request umum, fulfillment permanen.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK actor_id -> auth_users.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## form_submissions
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| form_key | text | NN |  |
| request_key | text | NN |  |
| payload | jsonb | NN |  |
| spam_status | text | NN |  |
| created_at | timestamptz | NN |  |
| delete_after | timestamptz | NULL |  |

UNIQUE: site_id,request_key

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Public API resolve tenant dari hostname tepercaya; jangan terima tenant_id pengunjung.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## notification_deliveries
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NULL | FK |
| outbox_id | uuid | NN | FK |
| channel | text | NN |  |
| template_code | text | NN |  |
| recipient_ref | text | NN |  |
| provider_message_id | text | NULL |  |
| status | text | NN |  |
| attempt_count | integer | NN |  |
| next_retry_at | timestamptz | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: outbox_id,channel,recipient_ref

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Referensi email minim data, suppression server-only; gagal email tidak membatalkan transaksi bisnis.
- FK tenant_id -> tenants.id; parent 0..1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK outbox_id -> outbox.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## exports
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| requested_by | uuid | NN | FK |
| job_id | uuid | NULL | FK |
| status | text | NN |  |
| object_key | text | NULL |  |
| expires_at | timestamptz | NN |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: Validasi schema/status aplikasi sesuai kontrak.

URL unduhan sementara dibuat saat GET; jangan simpan token publik permanen.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
- FK requested_by -> auth_users.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK job_id -> job_runs.id; parent 0..1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.

## support_tickets
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| opened_by | uuid | NN | FK |
| subject | text | NN |  |
| description | text | NN |  |
| priority | text | NN |  |
| status | text | NN |  |
| correlation_id | text | NULL |  |
| created_at | timestamptz | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: Validasi schema/status aplikasi sesuai kontrak.


- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK opened_by -> auth_users.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## audit_events
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NULL | FK |
| actor_ref | text | NN |  |
| action | text | NN |  |
| object_type | text | NN |  |
| object_id | text | NN |  |
| outcome | text | NN |  |
| correlation_id | text | NN |  |
| metadata_redacted | jsonb | NN |  |
| created_at | timestamptz | NN |  |

UNIQUE: PK saja, selain key tenant komposit otomatis.

CHECK: Validasi schema/status aplikasi sesuai kontrak.

Append-only server; actor_ref bertahan setelah akun dihapus; tidak ada password/token/payload kartu.
- FK tenant_id -> tenants.id; parent 0..1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.

## usage_counters
| Kolom | PostgreSQL | Null | Kunci |
|---|---|---|---|
| id | uuid | NN | PK |
| tenant_id | uuid | NN | FK |
| site_id | uuid | NN | FK |
| metric | text | NN |  |
| window_start | timestamptz | NN |  |
| window_end | timestamptz | NN |  |
| used | bigint | NN |  |
| updated_at | timestamptz | NN |  |

UNIQUE: site_id,metric,window_start

CHECK: used >= 0; window_end > window_start

Increment/reservasi atomik; cegah balapan kuota; gunakan window harian/bulanan sesuai metrik.
- FK tenant_id -> tenants.id; parent 1; anak 0..N; tenant composite=False; site composite=False; delete RESTRICT.
- FK site_id -> sites.id; parent 1; anak 0..N; tenant composite=True; site composite=False; delete RESTRICT.
