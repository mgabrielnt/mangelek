export const journey = [
  {
    label: "Tema", title: "Pilih tema Anda",
    description: "Lihat pratinjau dan pilih tema yang sesuai dengan karakter bisnis Anda.",
    image: "/images/marketing/categories/company.webp", note: "Identitas Anda",
    tone: "sand",
  },
  {
    label: "Langganan", title: "Aktifkan langganan",
    description: "Buat akun, tinjau rincian langganan, lalu selesaikan pembayaran.",
    image: "/images/marketing/features/cms-dashboard.webp", note: "Langkah awal Anda",
    tone: "sand",
  },
  {
    label: "Personalisasi", title: "Sesuaikan dengan bisnis Anda",
    description: "Tambahkan logo, atur warna, dan lengkapi halaman dengan informasi serta foto bisnis Anda.",
    image: "/images/marketing/features/website-editor.webp", note: "Dalam kendali Anda",
    tone: "sage",
  },
  {
    label: "Publikasi", title: "Publikasikan website Anda",
    description: "Hubungkan domain, periksa tampilan di ponsel dan desktop, lalu publikasikan website Anda.",
    image: "/images/marketing/features/domain-management.webp", note: "Siap diperkenalkan",
    tone: "sage",
  },
  {
    label: "Kelola", title: "Kelola dalam satu tempat",
    description: "Perbarui konten, tanggapi pertanyaan calon pelanggan, dan pantau kunjungan melalui dashboard Anda.",
    image: "/images/marketing/features/business-dashboard.webp", note: "Ruang untuk berkembang",
    tone: "night",
  },
] as const;

export type JourneyStep = typeof journey[number];
