import { resolveDesign, designQuery } from "@/data/template-designs";
export type AuthMode = "login" | "signup" | "forgot" | "reset";
export type AuthErrors = Partial<Record<"name" | "email" | "password", string>>;

export function validateAuth(mode: AuthMode, values: { name: string; email: string; password: string }): AuthErrors {
  const errors: AuthErrors = {};
  if (mode === "signup" && !values.name.trim()) errors.name = "Masukkan nama Anda.";
  if (mode !== "reset" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Masukkan alamat email yang valid.";
  if (mode !== "forgot" && !values.password) errors.password = "Masukkan kata sandi Anda.";
  else if ((mode === "signup" || mode === "reset") && values.password.length < 8) errors.password = "Gunakan minimal 8 karakter untuk kata sandi.";
  return errors;
}

export function authErrorMessage(code?: string) {
  switch (code) {
    case "invalid_credentials": return "Email atau kata sandi belum cocok. Periksa kembali atau atur ulang kata sandi.";
    case "email_not_confirmed": return "Buka tautan konfirmasi di email Anda sebelum masuk.";
    case "over_request_rate_limit":
    case "over_email_send_rate_limit": return "Terlalu banyak percobaan. Tunggu beberapa saat, lalu coba lagi.";
    case "weak_password": return "Kata sandi terlalu mudah ditebak. Gunakan kombinasi yang lebih kuat.";
    case "same_password": return "Gunakan kata sandi yang berbeda dari sebelumnya.";
    default: return "Permintaan belum berhasil. Coba kembali atau hubungi kami jika masih terkendala.";
  }
}

export function safeAuthDestination(value: string | null) {
  if(value==="/reset-password"||value==="/subscription")return value;
  if(!value||value.length>1000||!value.startsWith("/")||value.startsWith("//")||value.includes("\\"))return "/account";
  try{
    const url=new URL(value,"https://mangelek.invalid");
    if(url.origin!=="https://mangelek.invalid")return "/account";
    if(url.pathname==="/checkout"){
      const design=resolveDesign({template:url.searchParams.get("template")??undefined,palette:url.searchParams.get("palette")??undefined,font:url.searchParams.get("font")??undefined});
      return `/checkout?${designQuery(design)}&period=${url.searchParams.get("period")==="yearly"?"yearly":"monthly"}`;
    }
    const order=url.searchParams.get("order");
    if(url.pathname==="/checkout/status"&&order&&/^mgl-[a-f0-9]{32}$/.test(order))return `/checkout/status?order=${order}`;
  }catch{/* Allow only normalized internal purchase routes. */}
  return "/account";
}
