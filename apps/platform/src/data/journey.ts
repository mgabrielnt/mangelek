export const journey = [
  {
    label: "Temukan", title: "Mulai dari karakter.",
    description: "Pilih tampilan yang terasa tepat untuk bisnis Anda.",
    image: "/images/marketing/categories/company.webp", note: "Identitas Anda",
    tone: "sand", href: "#templates", action: "Jelajahi template",
  },
  {
    label: "Bentuk", title: "Jadikan milik Anda.",
    description: "Satukan halaman, konten, dan domain dalam satu pengalaman.",
    image: "/images/marketing/features/website-editor.webp", note: "Dalam kendali Anda",
    tone: "sage", href: "#features", action: "Lihat platform",
  },
  {
    label: "Tumbuh", title: "Buka langkah berikutnya.",
    description: "Website yang siap mengikuti arah bisnis Anda.",
    image: "/images/marketing/features/business-dashboard.webp", note: "Ruang untuk berkembang",
    tone: "night", href: "#contact", action: "Mulai percakapan",
  },
] as const;

export type JourneyStep = typeof journey[number];
