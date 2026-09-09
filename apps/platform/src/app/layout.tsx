import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mangelek — Website bisnis yang siap tumbuh",
  description:
    "Platform website terkelola untuk bisnis, lengkap dengan CMS, hosting, domain, dan dukungan operasional.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
