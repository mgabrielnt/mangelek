export const pricingFeatures = [
  { title: "Website & konten", items: [
    "Pilihan tema website", "Editor logo, warna, dan halaman",
    "Dashboard CMS", "Pengelolaan foto dan media",
  ] },
  { title: "Hosting & pelanggan", items: [
    "Hosting dan publikasi website", "Koneksi domain sendiri",
    "Formulir kontak dan leads", "Analitik kunjungan",
  ] },
] as const;

// Publish only quotas backed by approved server-side entitlements.
export const usageLimits: readonly { label: string; value: string }[] = [];

export const pricingAddons = [
  { name: "Nama domain", description: "Pembelian dan perpanjangan dibayar terpisah, sesuai ekstensi dan penyedia domain." },
] as const;
