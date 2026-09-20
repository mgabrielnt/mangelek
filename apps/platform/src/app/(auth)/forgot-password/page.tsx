import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = { title: "Pulihkan akun — Mangelek" };
export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <AuthForm mode="forgot" initialError={error === "expired" ? "Tautan pemulihan tidak valid atau sudah kedaluwarsa. Minta tautan baru di bawah ini." : ""} />;
}
