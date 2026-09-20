export const blogCategories = ["Semua", "Memulai", "Konten", "Domain", "Pelanggan"] as const;
export type BlogCategory = (typeof blogCategories)[number];
export type BlogSection = { id: string; title: string; paragraphs: string[]; checklist?: string[] };
export type BlogArticle = {
  slug: string; title: string; excerpt: string; category: Exclude<BlogCategory, "Semua">;
  image: string; imageAlt: string; intro: string; sections: BlogSection[];
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "menyiapkan-website-bisnis", category: "Memulai",
    title: "Website bisnis yang baik dimulai sebelum memilih tema.",
    excerpt: "Tentukan tujuan, siapkan bahan, dan susun halaman yang benar-benar dibutuhkan bisnis Anda.",
    image: "/images/marketing/features/website-editor.webp", imageAlt: "Ilustrasi editor website dengan pilihan konten, warna, dan tata letak.",
    intro: "Sebelum memikirkan warna atau bentuk tombol, tuliskan apa yang perlu dipahami pengunjung tentang bisnis Anda. Persiapan sederhana ini membantu setiap keputusan desain memiliki alasan yang jelas.",
    sections: [
      { id: "tentukan-tujuan", title: "Mulai dari satu tujuan utama", paragraphs: ["Bayangkan seseorang baru pertama kali mengenal bisnis Anda. Apa yang ingin mereka ketahui, dan langkah apa yang sebaiknya mereka ambil setelah membaca website? Untuk usaha jasa, langkah itu mungkin mengirim pertanyaan. Untuk bisnis dengan lokasi fisik, pengunjung mungkin membutuhkan alamat dan jam operasional.", "Pilih satu tindakan utama untuk halaman beranda. Tindakan lain tetap bisa tersedia, tetapi tidak perlu semuanya mendapat penekanan yang sama."], checklist: ["Siapa pengunjung utama website?", "Masalah apa yang dapat dibantu oleh bisnis Anda?", "Apa langkah berikutnya yang paling relevan bagi pengunjung?"] },
      { id: "siapkan-bahan", title: "Kumpulkan bahan sebelum menyusun halaman", paragraphs: ["Siapkan deskripsi singkat bisnis, daftar layanan, foto yang dapat digunakan, dan informasi kontak yang masih berlaku. Pisahkan informasi wajib dari materi yang bisa ditambahkan kemudian.", "Gunakan foto dan contoh pekerjaan yang memang boleh Anda publikasikan. Bila sebuah materi belum tersedia, catat kekurangannya dalam daftar kerja. Hindari mengisi website dengan testimoni atau angka yang belum dapat dibuktikan."], checklist: ["Nama bisnis dan deskripsi singkat", "Layanan atau produk utama", "Foto dengan izin penggunaan", "Alamat, jam operasional, dan kanal kontak"] },
      { id: "susun-alur", title: "Susun alur yang mudah diikuti", paragraphs: ["Mulailah dengan penjelasan tentang bisnis, lanjutkan dengan apa yang ditawarkan, kemudian berikan cara untuk menghubungi Anda. Nama menu sebaiknya mengikuti istilah yang dipahami pelanggan, seperti Layanan, Tentang Kami, dan Kontak.", "Tidak semua bisnis membutuhkan banyak halaman. Halaman yang ringkas dengan informasi lengkap dapat menjadi awal yang lebih mudah dikelola daripada struktur besar yang sebagian isinya masih kosong."] },
      { id: "pilih-tema", title: "Pilih tema berdasarkan isi", paragraphs: ["Setelah bahan terkumpul, bandingkan tema dengan kebutuhan konten Anda. Perhatikan ruang untuk foto, panjang judul, susunan layanan, dan posisi kontak. Coba bayangkan materi bisnis Anda berada di dalamnya.", "Sebelum meluncurkan website, baca kembali seluruh halaman dari ponsel. Periksa apakah tautan menuju tujuan yang benar, teks mudah dibaca, dan informasi kontak dapat ditemukan. Gunakan hasil pemeriksaan itu sebagai daftar perbaikan terakhir."] },
    ],
  },
  {
    slug: "konten-website-yang-mudah-dikelola", category: "Konten",
    title: "Konten rapi, website lebih mudah dirawat.",
    excerpt: "Cara menata teks, foto, dan rutinitas pembaruan agar informasi bisnis tetap jelas.",
    image: "/images/marketing/features/cms-dashboard.webp", imageAlt: "Ilustrasi pengelolaan konten dan media dalam sebuah dashboard.",
    intro: "Website terus membutuhkan perhatian setelah terbit. Dengan bahan yang tersusun rapi dan penanggung jawab yang jelas, pembaruan kecil tidak harus berubah menjadi pekerjaan besar.",
    sections: [
      { id: "inventaris-konten", title: "Buat daftar konten yang Anda miliki", paragraphs: ["Catat halaman, foto, dan dokumen yang akan digunakan. Untuk setiap bahan, tuliskan tujuan, pemilik, serta informasi yang perlu diperiksa sebelum terbit.", "Nama berkas yang jelas memudahkan pekerjaan berikutnya. Gunakan nama yang menjelaskan isi foto atau dokumen, sehingga orang lain tidak perlu membuka satu per satu untuk menemukan bahan yang tepat."], checklist: ["Pisahkan materi siap terbit dan draf", "Catat sumber serta izin penggunaan foto", "Simpan versi asli sebelum mengedit", "Tentukan siapa yang menyetujui perubahan"] },
      { id: "tulis-untuk-pembaca", title: "Tulis untuk pertanyaan pelanggan", paragraphs: ["Mulailah setiap bagian dengan informasi yang paling dibutuhkan pembaca. Jelaskan layanan dengan bahasa yang dipakai pelanggan sehari-hari, lalu tambahkan rincian jika diperlukan.", "Baca judul dan kalimat pembuka tanpa melihat bagian lain. Apakah maknanya masih jelas? Hindari judul yang hanya terdengar menarik tetapi tidak menjelaskan isi. Tombol juga sebaiknya menyebut tindakannya, misalnya Lihat layanan atau Hubungi kami."] },
      { id: "jadwal-pembaruan", title: "Jadikan pembaruan sebagai kebiasaan", paragraphs: ["Tentukan waktu untuk meninjau informasi yang sering berubah, seperti jam buka, layanan, kontak, dan ketersediaan produk. Sesuaikan frekuensinya dengan kegiatan bisnis; tidak ada satu jadwal yang cocok untuk semua orang.", "Setelah perubahan diterbitkan, buka halaman sebagaimana pengunjung melihatnya. Periksa foto, tautan, dan teks di layar kecil. Simpan catatan perubahan agar anggota tim lain mengetahui apa yang sudah diperbarui."] },
    ],
  },
  {
    slug: "memilih-domain-bisnis", category: "Domain",
    title: "Memilih nama domain yang mudah dikenali.",
    excerpt: "Pertimbangan sederhana sebelum memilih alamat website dan menghubungkannya ke bisnis Anda.",
    image: "/images/marketing/features/domain-management.webp", imageAlt: "Ilustrasi pengelolaan alamat dan koneksi domain website.",
    intro: "Nama domain adalah alamat yang dibagikan ketika Anda mengarahkan pelanggan ke website. Pilih nama yang masuk akal bagi bisnis dan mudah diperiksa kembali sebelum melakukan pembelian.",
    sections: [
      { id: "nama-yang-jelas", title: "Utamakan nama yang jelas", paragraphs: ["Buat beberapa pilihan yang dekat dengan nama bisnis. Coba ucapkan setiap pilihan kepada orang lain dan minta mereka menuliskannya. Cara sederhana ini membantu menemukan ejaan yang membingungkan atau bagian yang mudah terlewat.", "Hindari menambahkan terlalu banyak singkatan hanya untuk mendapatkan nama yang tersedia. Pikirkan juga apakah nama tersebut masih sesuai jika layanan bisnis Anda berkembang."] },
      { id: "periksa-biaya", title: "Periksa pembelian dan perpanjangan", paragraphs: ["Saat membandingkan penyedia domain, baca harga pembelian serta ketentuan perpanjangannya. Jangan hanya melihat nominal promosi yang pertama muncul. Catat siapa yang memegang akun penyedia dan siapa yang akan mengurus perpanjangan.", "Pada paket Mangelek, koneksi domain termasuk dalam paket. Pembelian dan perpanjangan nama domain dibayar terpisah kepada penyedia yang Anda pilih."], checklist: ["Periksa kembali ejaan nama domain", "Baca harga dan ketentuan perpanjangan", "Gunakan akun yang dikelola oleh bisnis", "Catat tanggal perpanjangan dan penanggung jawab"] },
      { id: "sebelum-menghubungkan", title: "Siapkan akses sebelum menghubungkan domain", paragraphs: ["Pastikan Anda dapat masuk ke akun penyedia domain dan mengetahui siapa yang berwenang mengubah pengaturannya. Ikuti petunjuk koneksi yang sesuai dengan penyedia dan platform website Anda.", "Bila domain sudah dipakai untuk email atau layanan lain, catat pengaturan yang ada sebelum melakukan perubahan. Hindari mengganti pengaturan yang tidak Anda pahami; minta bantuan pengelola domain agar layanan bisnis tetap berjalan."] },
    ],
  },
  {
    slug: "formulir-kontak-yang-jelas", category: "Pelanggan",
    title: "Buat formulir kontak yang mudah dijawab.",
    excerpt: "Minta informasi yang relevan, jelaskan langkah berikutnya, dan siapkan proses tindak lanjut.",
    image: "/images/marketing/features/business-dashboard.webp", imageAlt: "Ilustrasi ruang kerja untuk mengelola informasi bisnis dan pelanggan.",
    intro: "Formulir kontak adalah awal percakapan. Pertanyaan yang jelas membantu pengunjung menyampaikan kebutuhan dan membantu tim Anda menentukan langkah berikutnya.",
    sections: [
      { id: "pilih-pertanyaan", title: "Tanyakan yang benar-benar dibutuhkan", paragraphs: ["Mulailah dari informasi yang diperlukan untuk membalas: nama, satu kanal kontak, dan ringkasan kebutuhan. Tambahkan pertanyaan lain hanya jika jawabannya akan dipakai dalam tindak lanjut.", "Bedakan kolom wajib dan opsional dengan jelas. Jika sebuah informasi belum dibutuhkan pada percakapan pertama, pertimbangkan untuk menanyakannya nanti."], checklist: ["Setiap kolom punya label yang jelas", "Kolom wajib ditandai secara konsisten", "Contoh isian membantu tanpa menggantikan label", "Pesan kesalahan menjelaskan cara memperbaiki isian"] },
      { id: "jelaskan-hasil", title: "Jelaskan apa yang terjadi setelah dikirim", paragraphs: ["Sesudah formulir berhasil diproses, tampilkan konfirmasi yang sesuai dengan hasil sebenarnya. Bila pengiriman gagal, berikan cara untuk mencoba lagi atau kanal kontak alternatif.", "Jangan menjanjikan waktu balasan yang belum dapat dipenuhi tim. Informasi sederhana tentang langkah berikutnya lebih membantu daripada pesan keberhasilan yang terlalu umum."] },
      { id: "siapkan-tindak-lanjut", title: "Siapkan orang dan prosesnya", paragraphs: ["Tentukan siapa yang memeriksa pesan masuk dan bagaimana kebutuhan pelanggan diteruskan kepada orang yang tepat. Formulir yang baik tetap memerlukan proses tindak lanjut yang jelas.", "Uji alur lengkap sebelum mengandalkannya: isi dari ponsel, kirim pertanyaan contoh, pastikan pesan diterima, lalu coba membalas. Periksa juga keadaan ketika ada isian yang salah agar pengunjung tahu apa yang perlu diperbaiki."] },
    ],
  },
];

export function readingMinutes(article: BlogArticle) {
  const text = [article.intro, ...article.sections.flatMap(s => [s.title, ...s.paragraphs, ...(s.checklist ?? [])])].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export function filterArticles(query: string, category: string) {
  const terms = query.toLocaleLowerCase("id-ID").trim().split(/\s+/).filter(Boolean);
  return blogArticles.filter(article => (category === "Semua" || article.category === category) && terms.every(term =>
    `${article.title} ${article.excerpt} ${article.category}`.toLocaleLowerCase("id-ID").includes(term)));
}
