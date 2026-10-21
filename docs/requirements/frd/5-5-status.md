<!-- Dibuat otomatis oleh scripts/agents/export-requirements.py dari FRD-Mangelek-v3.0.xlsx. Jangan edit manual. -->

5.5 Tabel status dan transisi

Diagram status ada di sheet Diagram (14-state-langganan, 15-state-kursi, 15b-state-peluang).

Status langganan (per website)

| Dari | Ke | Pemicu | Efek |
| --- | --- | --- | --- |
| pending | active | order.paid pertama | Periode pertama; provisioning site |
| active | active | Perpanjangan lunas sebelum H | Periode baru dari H lama |
| active | grace | H lewat tanpa periode baru dan tanpa berhenti | Website tayang; editor hanya-baca |
| active + berhenti | suspended | H tercapai | Website nonaktif tanpa tenggang (RB-05) |
| grace | active | Lunas H+1 s.d. H+7 | Periode dari waktu lunas |
| grace | suspended | H+8 | Website nonaktif |
| suspended | active | Lunas sebelum H+30 | Aktif kembali ≤ 5 menit dengan release terakhir |
| suspended | expired | H+30 | Pekerjaan site.purge |
| expired | active | Order pertama baru lunas | Site baru dibuat dari template pilihan |
| active | active + berhenti | Pelanggan berhenti berlangganan (SUB-009) | Order perpanjangan terbuka dibatalkan; pengingat tagihan diganti pemberitahuan tanggal berakhir |
| active + berhenti | active | Batalkan berhenti sebelum H, atau perpanjangan lunas | Penanda berhenti dihapus; siklus tagihan kembali normal |
| active | active (tingkat/template baru) | Perpanjangan lunas dengan perubahan terjadwal | SUB-013 menerapkan perubahan di awal periode |

Status objek lain

| Objek | Status dan urutan | Catatan |
| --- | --- | --- |
| Order | pending → paid → partial_refund / refunded / chargeback; pending → expired / failed / cancelled | paid tidak pernah mundur |
| Percobaan pembayaran | pending → paid / expired / failed / cancelled | Satu order bisa punya beberapa percobaan |
| Site | provisioning → ready → published ⇄ suspended → deleted | ready = revisi ada, belum ada release aktif |
| Release | queued → building → validating → ready / failed | “Aktif” hanya ditentukan sites.active_release_id |
| Media | quarantined → processing → ready / rejected; ready → deleted | Hapus fisik setelah tidak direferensikan |
| Order domain | awaiting_payment → queued → submitting → succeeded; submitting → unknown → rekonsiliasi; → failed_review; awaiting_payment → cancelled | unknown tidak pernah diulang tanpa cek ke reseller |
| Domain | registering → registered → connected → expired; registering → failed_review; verification_required bila registri meminta dokumen | auto_renew selalu false |
| Binding hostname | pending → connected → unlinked; pending → failed_review setelah 72 jam | Sub-status kepemilikan, DNS, TLS terpisah |
| Pekerjaan | queued → running → ready; running → retry_wait → running (≤ batas) → failed_review | Coba ulang admin kembali ke queued |
| Peluang CRM | open (tahapan Baru → Dihubungi → Penawaran → tahapan kustom) → won / lost; lost/won → open (dibuka ulang) | lost wajib alasan; setiap perpindahan = aktivitas (CRM-003) |
| Tugas CRM | open → done; open → cancelled; open jatuh tempo lewat = terlambat (turunan) | Ringkasan harian 08.00 lokal (CRM-006) |
| Ekspor | queued → running → ready → expired; running → failed | Berkas disimpan 7 hari |
| Tenant | active ⇄ suspended (admin); active → deleting → deleted (hapus akun) | — |
| Kursi Eksklusif | held → active → released; held → released (30 menit atau order kedaluwarsa); reserved (perubahan terjadwal) → active / released | Jumlah held + reserved + active ≤ 10 per template |
| Perubahan terjadwal | scheduled → applied; scheduled → cancelled | Satu scheduled per langganan |
| Persetujuan admin | pending → approved → executed; pending → rejected / expired (7 hari) | Hash payload diperiksa saat eksekusi |
| Permintaan hak data | received → verified → in_progress → completed; received → cancelled | due_at = diterima + 72 jam |
| Insiden status | investigating → identified → monitoring → resolved | Riwayat 90 hari tampil di halaman status |
