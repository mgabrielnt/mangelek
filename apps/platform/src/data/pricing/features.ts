export const pricingFeatures = [
  { icon: "layout", title: "Website dengan karakter Anda",
    description: "Mulai dari tema pilihan, lalu sesuaikan identitas bisnis Anda.",
    items: ["Pilihan tema website", "Logo, warna, dan konten bisnis", "Tampilan responsif"] },
  { icon: "edit", title: "Konten dalam kendali Anda",
    description: "Perbarui informasi bisnis melalui satu dashboard CMS.",
    items: ["Pengelolaan halaman dan konten", "Pustaka foto dan media", "Editor website"] },
  { icon: "chart", title: "Lebih dekat dengan pelanggan",
    description: "Kumpulkan pertanyaan dan pahami kunjungan website Anda.",
    items: ["Formulir kontak", "Pengelolaan leads", "Analitik kunjungan"] },
  { icon: "globe", title: "Siap hadir secara online",
    description: "Kelola publikasi dan alamat website dari tempat yang sama.",
    items: ["Hosting website", "Koneksi domain sendiri", "Pengelolaan publikasi"] },
] as const;

// Quotas need approved entitlements; never infer media capacity from DB RAM.
export const usageLimits: readonly { label: string; value: string }[] = [];

export const pricingAddons = [
  { icon: "globe", name: "Domain pilihan Anda", status: "Terpisah dari langganan",
    description: "Gunakan domain yang sudah Anda miliki. Pembelian dan perpanjangan domain mengikuti harga penyedia serta ekstensi pilihan Anda.",
    detail: "Koneksi domain termasuk dalam paket." },
  { icon: "storage", name: "Ruang penyimpanan tambahan", status: "Direncanakan",
    description: "Tambahan kapasitas media untuk kebutuhan yang berkembang. Pilihan kapasitas dan harga akan diumumkan saat tersedia.",
    detail: "Belum tersedia untuk dibeli." },
  { icon: "spark", name: "Asisten AI", status: "Direncanakan",
    description: "Bantuan AI untuk pengelolaan website direncanakan sebagai pilihan tambahan di tahap berikutnya.",
    detail: "Belum termasuk dalam paket utama." },
] as const;
