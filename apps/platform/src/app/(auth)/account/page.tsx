import Link from "next/link";
import { redirect } from "next/navigation";
import { getVerifiedUser } from "@/lib/auth/server";
import { authConfig } from "@/lib/auth/config";
import { SignOutButton } from "@/components/auth/SignOutButton";

export const metadata = { title: "Akun Anda — Mangelek" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!authConfig()) redirect("/login?error=unavailable");
  const user = await getVerifiedUser();
  if (!user) redirect("/login");
  return <div className="authFormWrap authAccount">
    <div className="authIntro"><h1 id="auth-title">Selamat datang<br />di Mangelek.</h1><p>Anda telah masuk dengan <strong>{user.email}</strong>.</p></div>
    <p>Temukan tema yang sesuai dengan karakter bisnis Anda, atau pelajari paket Website + CMS.</p>
    <Link className="authPrimary" href="/#templates">Jelajahi tema website</Link>
    <Link className="authGoogle" href="/pricing">Lihat paket dan harga</Link>
    <SignOutButton />
  </div>;
}
