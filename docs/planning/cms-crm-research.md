# Mangelek: CMS dan CRM dalam satu ruang kerja

Riset dan implementasi awal, 23 September 2026. Ini membedakan pola produk profesional, fitur yang sudah bekerja, dan pekerjaan produksi yang belum tersedia. Dasar awal adalah bisnis jasa; struktur kontak dan tindak lanjut juga dapat dipakai template restoran. Bukan klaim kesetaraan fitur dengan produk rujukan.

## Temuan dan keputusan produk

| Area | Pola dari sumber primer | Keputusan Mangelek |
| --- | --- | --- |
| Model CRM | HubSpot memisahkan kontak, perusahaan, deal, aktivitas, dan asosiasi antarrekanan. | Empat modul: Kontak, Perusahaan, Peluang, Tindak lanjut. Detail kontak menampilkan peluang dan riwayat terkait. |
| Kualitas data | Email dan domain digunakan HubSpot dalam pencegahan duplikasi. | Email dan domain dibandingkan tanpa membedakan kapital, termasuk catatan di arsip. Arsip tidak memutus relasi. |
| Penjualan | Salesforce menekankan kemajuan lead/opportunity melalui tahap pipeline, dengan aktivitas yang membantu tindak lanjut. | Tahap Baru, Dihubungi, Penawaran, Negosiasi, Berhasil, Tidak lanjut. Nilai total berasal dari peluang terbuka yang benar-benar dimasukkan. |
| Tugas | HubSpot mendukung tanggal, prioritas, dan hubungan tugas ke catatan CRM. | Tugas dapat ditautkan ke kontak/peluang; pilihan peluang mengisi kontak terkait. Filter belum selesai, terlewat, selesai, dan arsip. |
| Model CMS | Contentful memodelkan entry dengan field bertipe, validasi, dan referensi ke entry/media. | Koleksi layanan, menu, artikel dengan validasi. Model media dan referensi koleksi ke renderer perlu ditambahkan sebelum publikasi. |
| Alur editorial | Sanity membedakan draft dan dokumen published serta menyediakan pengalaman preview dan history. | Konten lokal tetap berlabel draft. Pratinjau tidak dianggap publikasi. Revisi server, persetujuan, dan jadwal publikasi adalah pekerjaan lanjutan. |
| Daftar kerja | Carbon menempatkan pencarian/filter/aksi di toolbar, dengan tindakan baris yang konsisten. | Daftar responsif, satu tindakan tambah utama, pencarian dan filter konsisten. Detail hubungan ditampilkan saat membuka catatan. |
| Aksesibilitas | WCAG 2.2 mencakup alternatif untuk dragging, target yang dapat dioperasikan, dan fokus terlihat. | Native select untuk tahap; tidak wajib drag. Label formulir, ring fokus, status/error yang diumumkan, kontrol sentuh, reduced motion. |

## Fitur profesional dan status implementasi

**Aktif pada build lokal:** CRUD kontak/perusahaan/peluang/tugas; arsip dan pemulihan; pencarian/filter; tahap dan nilai peluang; tugas bertanggal dan prioritas; catatan internal; riwayat interaksi; pencegahan duplikasi; relasi antarcatatan; cadangan JSON tervalidasi; perlindungan perubahan belum disimpan, konflik antartab, dan kegagalan penyimpanan. CMS yang ada mempertahankan koleksi, penyuntingan, pratinjau teks, dan cadangannya.

**Belum aktif:** sinkronisasi akun, akses tim, audit log server yang tidak dapat diedit pengguna, inbox email/WhatsApp, formulir publik yang otomatis menghasilkan lead, deduplikasi lintas sumber/merge, import CSV dengan pemetaan field, segmentasi tersimpan, automasi, notifikasi, laporan historis, rich text/media CMS, versioning/review/publish CMS, pencarian server, dan custom fields. Riwayat lokal bukan audit log yang tahan perubahan. Izin pemasaran lokal bukan mesin pengiriman ataupun bukti persetujuan lengkap.

Kanban adalah kandidat tahap berikutnya bila volume peluang membutuhkannya. Daftar saat ini tetap mendukung seluruh perubahan tahap melalui keyboard dan sentuhan. Tidak ditambahkan grafik tanpa data, automasi semu, atau pemilik tugas fiktif.

## Urutan arsitektur produksi

1. **Identitas workspace/site.** Ganti penyimpanan berdasarkan template dengan identitas tenant/site yang diverifikasi server. Template adalah desain, bukan batas kepemilikan data. Pertahankan batas owner-only dari rancangan proyek sampai kebutuhan tim disetujui.
2. **Database dan API.** Tabel contacts, companies, deals, tasks, activities, content_entries, assets dan referensi dengan tenant/site ID, foreign key, validasi server, indeks pencarian, soft archive, serta unique email/domain dalam workspace. Akses setiap record harus diperiksa melalui sesi dan kebijakan tenant.
3. **Migrasi data lokal yang eksplisit.** Tampilkan ringkasan impor dan konflik; jangan otomatis mengunggah data pribadi atau menggabungkan cadangan milik browser lain. Simpan cadangan sebelum migrasi. Gunakan revision/ETag agar perubahan dari perangkat lain tidak tertimpa.
4. **Lead dari website.** Endpoint formulir tervalidasi, pencegahan spam/rate limit, deduplikasi, asal lead, waktu dan bukti persetujuan. Penyimpanan entry dan aktivitas terkait harus atomik dan idempoten.
5. **CMS ke website.** Renderer membaca versi published, sedangkan editor/preview membaca draft yang berizin. Validasi referensi media, SEO, dan route sebelum publish; simpan revisi dan dukung rollback. Unggahan media memerlukan storage dan batas ukuran/tipe yang nyata.
6. **Pekerjaan latar belakang.** Pengingat dan jadwal publish melalui antrean/job, retry, idempotensi, status gagal dan observabilitas. Jangan menyebut tugas lokal sebagai pengingat yang sudah dikirim.
7. **Komunikasi.** Tentukan penyedia email/WhatsApp dan domain pengirim; perlukan status delivery, webhook terverifikasi, opt-out dan pembatasan pengiriman sebelum mengaktifkan kampanye.
8. **Tim dan analitik.** Baru tambahkan role/permission, assignment dan laporan setelah kebutuhan bisnis, event pipeline, retensi, serta sumber data dipastikan. Laporan harus membedakan nilai peluang dari pendapatan yang benar-benar dibayar.

Yang dibutuhkan sebelum pemakaian produksi: konfigurasi autentikasi dan database proyek, skema tenant/site final, keputusan kepemilikan CRM (per bisnis atau per website), storage media, domain publikasi, serta provider komunikasi bila automasi diaktifkan. Konfigurasi tersebut tidak diperlukan untuk mencoba alur lokal yang sudah tersedia.

## Sumber primer

- [HubSpot: Understand objects](https://knowledge.hubspot.com/records/understand-objects)
- [HubSpot: Associate records](https://knowledge.hubspot.com/records/associate-records)
- [HubSpot: Deduplication of records](https://knowledge.hubspot.com/records/deduplication-of-records)
- [HubSpot: Create tasks](https://knowledge.hubspot.com/tasks/create-tasks)
- [Salesforce Trailhead: Manage leads and sales pipelines](https://trailhead.salesforce.com/content/learn/modules/sales-for-small-business/manage-leads-and-sales-pipelines)
- [Contentful: Data model](https://www.contentful.com/developers/docs/concepts/data-model/)
- [Contentful: Roles](https://www.contentful.com/help/roles/)
- [Sanity: Drafts](https://www.sanity.io/docs/content-lake/drafts)
- [Sanity: Presenting and previewing content](https://www.sanity.io/docs/content-lake/presenting-and-previewing-content)
- [Sanity: History experience](https://www.sanity.io/docs/user-guides/history-experience)
- [Sanity: Scheduled drafts](https://www.sanity.io/docs/studio/scheduled-drafts)
- [IBM Carbon: Data table usage](https://carbondesignsystem.com/components/data-table/usage/)
- [W3C: WCAG](https://www.w3.org/TR/wcag/)

Dokumentasi Apple HIG web mengembalikan halaman yang bergantung pada JavaScript saat diakses; tidak dijadikan bukti riset yang berhasil dibaca. Pedoman gerak Apple/Emil dari skill lokal dipakai untuk implementasi gerak singkat dan reduced motion, tanpa klaim validasi resmi Apple.
