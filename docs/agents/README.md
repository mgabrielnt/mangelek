# Cara memakai tim agent Mangelek

1. Buka terminal di `D:\saas-platform`, jalankan `claude`. Saat pertama kali, setujui "trust this folder" agar hook agent aktif.
2. Cek pemasangan: `/agents` (harus ada 11 agent), `/hooks` (2 hook PreToolUse), `/model` (Sonnet untuk sesi utama).
3. Perintah harian:
   - `/lanjut` — lanjutkan jalur produk dari `STATE.md`
   - `/lanjut template` · `/lanjut crm` · `/lanjut arsitektur`
   - `/lanjut status` — ringkasan 10 baris, tidak mengerjakan apa pun
   - `/release S-xx` — deploy produksi (hanya Anda)
4. Pantau kuota dengan `/usage` di awal dan akhir sesi. `/clear` saat pindah irisan; status tidak hilang karena tersimpan di file.
5. Jawaban Anda atas pertanyaan agent tercatat di `decisions.md`. Asumsi agent di `assumptions.md` boleh Anda batalkan kapan saja.

Bila BRD/FRD xlsx berubah (setelah Anda setujui): `python scripts/agents/export-requirements.py`.
