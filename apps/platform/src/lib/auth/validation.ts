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
  return value === "/reset-password" ? "/reset-password" : "/account";
}
