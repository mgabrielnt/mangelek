import { AuthForm } from "@/components/auth/AuthForm";
import { authUnavailableMessage } from "@/lib/auth/config";

export const metadata = { title: "Masuk — Mangelek" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const message = error === "callback" ? "Tautan masuk tidak valid atau sudah kedaluwarsa. Coba masuk kembali atau minta tautan pemulihan baru." : error === "unavailable" ? authUnavailableMessage : "";
  return <AuthForm mode="login" initialError={message} />;
}
