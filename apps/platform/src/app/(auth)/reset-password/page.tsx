import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";
import { getVerifiedUser } from "@/lib/auth/server";
import { authConfig } from "@/lib/auth/config";

export const metadata = { title: "Kata sandi baru — Mangelek" };
export const dynamic = "force-dynamic";
export default async function ResetPasswordPage() {
  if (!authConfig()) redirect("/login?error=unavailable");
  if (!await getVerifiedUser()) redirect("/forgot-password?error=expired");
  return <AuthForm mode="reset" />;
}
