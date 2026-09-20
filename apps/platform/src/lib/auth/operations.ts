import { createAuthClient } from "./client";
import { authConfig, authUnavailableMessage } from "./config";
import { authErrorMessage, type AuthMode } from "./validation";

export type AuthResult = { error?: string; message?: string; destination?: string };

export async function submitAuth(mode: AuthMode, values: { name: string; email: string; password: string }): Promise<AuthResult> {
  if (!authConfig()) return { error: authUnavailableMessage };
  const client = createAuthClient();
  const callback = `${window.location.origin}/auth/callback`;
  try {
    if (mode === "login") {
      const { error } = await client.auth.signInWithPassword({ email: values.email, password: values.password });
      return error ? { error: authErrorMessage(error.code) } : { destination: "/account" };
    }
    if (mode === "signup") {
      const { data, error } = await client.auth.signUp({ email: values.email, password: values.password,
        options: { data: { full_name: values.name }, emailRedirectTo: callback } });
      if (error) return { error: authErrorMessage(error.code) };
      return data.session ? { destination: "/account" } : { message: "Jika alamat ini dapat didaftarkan, tautan konfirmasi telah dikirim. Periksa kotak masuk dan folder spam Anda." };
    }
    if (mode === "forgot") {
      const { error } = await client.auth.resetPasswordForEmail(values.email, { redirectTo: `${callback}?next=/reset-password` });
      return error ? { error: authErrorMessage(error.code) } : { message: "Jika email terdaftar, tautan untuk mengatur ulang kata sandi akan dikirim. Periksa kotak masuk dan folder spam Anda." };
    }
    const { error } = await client.auth.updateUser({ password: values.password });
    return error ? { error: authErrorMessage(error.code) } : { destination: "/account" };
  } catch { return { error: "Tidak dapat terhubung. Periksa koneksi internet, lalu coba lagi." }; }
}

export async function signInWithGoogle(): Promise<AuthResult> {
  if (!authConfig()) return { error: authUnavailableMessage };
  try {
    const { error } = await createAuthClient().auth.signInWithOAuth({ provider: "google", options: {
      redirectTo: `${window.location.origin}/auth/callback`, queryParams: { prompt: "select_account" },
    } });
    return error ? { error: authErrorMessage(error.code) } : {};
  } catch { return { error: "Google belum dapat dihubungi. Coba lagi atau masuk dengan email." }; }
}
