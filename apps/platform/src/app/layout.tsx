import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mangelek — Website Bisnis Tanpa Ribet",
  description: "Pilih tema, kelola konten, dan kembangkan bisnis dari satu platform.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
