export const productLinks = [
  { title: "Template website", href: "/templates", description: "Temukan karakter bisnis Anda.", icon: "01" },
  { title: "Website & CMS", href: "/#features", description: "Bangun dan kelola dalam satu ruang.", icon: "02" },
  { title: "Domain & insight", href: "/#features", description: "Terhubung. Terarah. Terukur.", icon: "03" },
] as const;

export const supportLinks = [
  { title: "Cara memulai", href: "/#why-mangelek", description: "Dari ide ke langkah berikutnya." },
  { title: "Diskusikan kebutuhan", href: "/#contact", description: "Siapkan rencana website Anda." },
] as const;

export const mainLinks = [
  { title: "Template", href: "/templates" },
  { title: "Platform", href: "/#features" },
  { title: "Cara kerja", href: "/#why-mangelek" },
  { title: "Pricing", href: "/pricing" },
  { title: "Kontak", href: "/#contact" },
] as const;

export const headerLinks = [
  mainLinks[0],
  mainLinks[1],
  { title: "Blogs", href: "/blogs" },
  mainLinks[3],
  mainLinks[4],
  { title: "Log in", href: "/login" },
] as const;
