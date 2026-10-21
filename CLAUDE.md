# Mangelek — aturan tim agent

Mangelek: langganan website + CMS + CRM untuk UMKM Indonesia. Pemilik: Gab (solo).
Tiga tingkat template: Standar Rp149.000, Premium Rp200.000, Eksklusif Rp300.000 per bulan;
tahunan = 10 × bulanan. Pelanggan memilih template, membayar, mengedit sendiri, website terbit otomatis.

Bahasa: dokumen, laporan, dan teks UI dalam Bahasa Indonesia. Kode, nama file, dan pesan commit
dalam bahasa Inggris (Conventional Commits).

## Peta repo
- `apps/platform` Next.js 16 (marketing, auth, dashboard, editor, admin). Baca `apps/platform/AGENTS.md`.
- `apps/sites` renderer situs pelanggan · `apps/api` API · `apps/jobs` antrean dan jadwal
- `packages/*` contracts, core, db, integrations, observability, site-renderer, themes, ui, config
- Batas impor: `docs/architecture/boundaries.md` (wajib).
- Kebutuhan: mulai dari `docs/requirements/INDEX.md`. Jangan buka xlsx.
- Status tim: `docs/agents/STATE.md` · rencana: `docs/agents/roadmap.md`

## Sumber kebenaran
BRD v4.0, FRD v3.0, keputusan K-01 s.d. K-28 (`docs/requirements/brd/18-5-keputusan.md`),
keputusan Gab di `docs/agents/decisions.md`, dan ADR yang disetujui di `docs/architecture/decisions/`.
Dokumen ini hidup: isinya boleh berubah, tetapi perubahan diusulkan ke Gab dulu dan baru berlaku
setelah disetujui (dicatat sebagai K-29 dst., versi BRD/FRD naik, lalu jalankan
`python scripts/agents/export-requirements.py`).

## Konstitusi (berlaku untuk semua agent)
1. Bila dua sumber bertentangan: berhenti dan laporkan. Jangan memilih sendiri.
2. Tidak ada fitur tanpa ID FR. Kode baru harus terlacak ke story di `spec.md` dan `docs/requirements/traceability.csv`.
3. Kerjakan hanya cakupan tugas. Temuan lain ke `docs/agents/backlog.md`.
4. Tes dari kriteria terima ditulis/diperbarui sebelum implementasi. Tugas selesai hanya jika tes itu lulus.
5. Isolasi tenant mutlak: setiap tabel tenant ber-RLS; `tenant_id`/`site_id` dari klien bukan bukti akses;
   setiap endpoint punya tes akses lintas tenant.
6. db, core, adapter berahasia, dan observability server tidak pernah masuk bundle browser.
7. K-28 nol biaya: tanpa layanan, pustaka, font, atau aset berbayar. Dependensi baru wajib berlisensi
   MIT/Apache-2.0/BSD/ISC/OFL dan dicatat alasannya. Lisensi dengan Commons Clause wajib dicek `security`.
8. Next.js 16 berbeda dari data latih: baca `node_modules/next/dist/docs/` sebelum menulis kode Next.
9. Rahasia hanya lewat env/secret store. `NEXT_PUBLIC_` hanya untuk nilai publik. Log tanpa data pribadi.
10. Bukti, bukan klaim: "selesai", "aman", "lulus" hanya bersama perintah dan keluarannya.
11. Asumsi kecil yang diambil tanpa bertanya: satu baris di `docs/agents/assumptions.md`.
12. Agent tidak mengedit file di wilayah agent lain. Intervensi = tulisan di `docs/specs/<irisan>/notes.md`.
13. Satu tugas satu commit di branch `feat/<irisan>`. Tidak pernah push ke `main`, tidak pernah force-push.
14. Keamanan minimum (HTTPS, RLS, backup + uji restore, MFA admin, rate limit, secret store, tanpa simpan
    kartu, audit dependensi, UU PDP, monitoring) tidak boleh dikorbankan demi hemat biaya.

## Pemicu wajib bertanya ke Gab
Di luar daftar ini, putuskan sendiri dan catat asumsinya.
1. Sumber saling bertentangan.
2. Ada biaya baru, atau biaya arsitektur kumulatif akan melewati Rp150.000 (cadangan BRD 11.1) atau Rp600.000.
   Plafon total Rp800.000 sampai pelanggan berbayar pertama; domain Mangelek dan Claude Pro di luar angka ini.
3. Tidak bisa dibatalkan: pilihan stack, migrasi yang menghapus data, hapus file, deploy produksi.
4. Mengubah aturan bisnis atau kebutuhan BRD/FRD (harga, tier, isi paket, refund, tambah/ubah/hapus FR).
5. Menerima risiko keamanan (menunda temuan tinggi, melonggarkan RLS).
6. Butuh akun atau rahasia (Supabase, Cloudflare, payment gateway, registrar).
7. Gagal 3 kali pada tugas yang sama.

Subagent tidak bisa bertanya langsung: akhiri dengan `STATUS: PERLU_KEPUTUSAN` dan tulis pertanyaan
(konteks 1 kalimat, 2-4 opsi, rekomendasi, akibat tiap opsi). Orkestrator yang bertanya.

## Format laporan akhir setiap agent (maks 15 baris)
```
STATUS: SELESAI | TERHAMBAT | PERLU_KEPUTUSAN | PERLU_KONSULTASI
TUGAS: <id>
FILE: <path yang diubah>
BUKTI: <perintah> -> <hasil singkat>
CATATAN: <maks 3 baris>
PERTANYAAN: <bila ada>
```

## Intervensi bertahap
Catatan → konsultasi → keberatan (`BLOK` di laporan gerbang) → veto domain → eskalasi ke Gab.
Veto: `security` (keamanan, data tenant), `architect` (batas modul, kontrak), `database` (skema),
`designer` (aksesibilitas, anggaran performa), `pm` (cakupan). Naik tingkat hanya bila tingkat bawah gagal.

## Hemat token
- Baca hanya file yang dibutuhkan tugas. Cari dengan Grep dulu, baca dengan offset/limit.
- Detail tinggal di file; laporan ke Orkestrator maksimal 15 baris.
- Tes/typecheck/build: jalankan untuk paket terdampak saja (`pnpm --filter <paket> ...`).
- Jangan ubah file agent, skill, atau CLAUDE.md di tengah irisan.

## Perintah Gab
`/lanjut` (jalur produk) · `/lanjut template` · `/lanjut crm` · `/lanjut arsitektur` · `/status` · `/release`.
Selalu lanjutkan dari `docs/agents/STATE.md`; jangan pernah mulai dari awal.

# Compact instructions
Saat meringkas, simpan: irisan dan tugas aktif, gerbang terakhir, file yang diubah, pertanyaan terbuka,
langkah berikutnya. Buang isi file yang sudah dibaca dan keluaran perintah.
