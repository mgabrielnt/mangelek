export type BusinessFeature = {
  title: string;
  label: string;
  text: string;
  image: string;
};

export const businessFeatures: BusinessFeature[] = [
  {
    title: "Website Editor",
    label: "Bangun",
    text: "Susun halaman dan sesuaikan tampilan website secara visual tanpa menyentuh kode.",
    image: "website-editor.webp",
  },
  {
    title: "CMS Dashboard",
    label: "Kelola",
    text: "Kelola konten, media, formulir, dan leads dari satu ruang kerja yang terarah.",
    image: "cms-dashboard.webp",
  },
  {
    title: "Domain",
    label: "Hubungkan",
    text: "Hubungkan dan kelola domain bisnis tanpa berpindah ke layanan lain.",
    image: "domain-management.webp",
  },
  {
    title: "Business Insight",
    label: "Pantau",
    text: "Pahami performa website melalui insight penting yang ringkas dan mudah dibaca.",
    image: "business-dashboard.webp",
  },
];
