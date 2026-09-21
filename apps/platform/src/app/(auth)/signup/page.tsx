import { AuthForm } from "@/components/auth/AuthForm";
import { safeAuthDestination } from "@/lib/auth/validation";

export const metadata = { title: "Daftar — Mangelek" };
export default async function SignupPage({searchParams}:{searchParams:Promise<{next?:string}>}) { const {next}=await searchParams;return <AuthForm mode="signup" next={safeAuthDestination(next??null)} />; }
