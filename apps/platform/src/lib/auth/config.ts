export function authConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  try {
    const parsed = new URL(url);
    if (!(["https:", "http:"].includes(parsed.protocol))) return null;
    return { url, key };
  } catch { return null; }
}

export const authUnavailableMessage = "Layanan akun belum tersedia. Silakan coba lagi nanti atau hubungi kami.";
