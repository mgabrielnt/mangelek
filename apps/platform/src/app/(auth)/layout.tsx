import localFont from "next/font/local";
import { AuthShell } from "@/components/auth/AuthShell";
import "@/styles/auth.css";

const authFont = localFont({
  src: [
    { path: "../../../public/fonts/manrope-regular.ttf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/manrope-semibold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-auth", display: "swap",
});

export const metadata = { robots: { index: false, follow: false } };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className={authFont.variable}><AuthShell>{children}</AuthShell></div>;
}
