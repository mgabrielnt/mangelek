# Asumsi kerja

Keputusan kecil yang diambil agent tanpa bertanya. Gab boleh membatalkan baris mana pun.

| Tanggal | Agent | Asumsi | Alasan |
| --- | --- | --- | --- |
| 2026-10-21 | Orkestrator | S-01 belum memakai pembayaran: site dibuat dari order uji (sandbox), checkout Midtrans menjadi irisan S-02. | Gab memilih alur inti end-to-end lebih dulu; BRD Sprint 2 (Midtrans) tetap di roadmap. |
| 2026-10-21 | Orkestrator | Batas Rp800.000 (D-007) dibaca sebagai plafon, bukan rencana belanja. BRD 11.1 tetap memakai paket gratis sebelum pendapatan dengan cadangan infrastruktur Rp150.000. | Diperjelas Gab: D-012 (Workers Paid sejak awal) dan D-013 (tanya saat melewati Rp150.000). |
| 2026-10-21 | Orkestrator | Perintah `/status` bawaan Claude Code tidak ditimpa; status tim memakai `/lanjut status`. | `/status` adalah perintah bawaan untuk info akun. |
