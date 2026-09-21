import { AuthForm } from "@/components/auth/AuthForm";
import { authUnavailableMessage } from "@/lib/auth/config";
import { safeAuthDestination } from "@/lib/auth/validation";

export const metadata = { title: "Masuk — Mangelek" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string;next?:string }> }) {
  const { error,next } = await searchParams;
  const message = error === "callback" ? "Tautan masuk tidak valid atau sudah kedaluwarsa. Coba masuk kembali atau minta tautan pemulihan baru." : error === "unavailable" ? authUnavailableMessage : "";
  return <AuthForm mode="login" initialError={message} next={safeAuthDestination(next??null)} />;
}
