import { Suspense } from "react";
import { BlogLibrary } from "@/components/blogs/BlogLibrary";

export const metadata = { title: "Blogs — Panduan Website Bisnis | Mangelek", description: "Panduan praktis untuk menyiapkan website bisnis, mengelola konten, memilih domain, dan menyusun formulir kontak." };

export default function BlogsPage() {
  return <main id="blog-main" className="blogMain" tabIndex={-1}>
    <header className="blogHero"><h1>Ide yang tumbuh.<br />Bisnis yang melangkah.</h1><p>Catatan dan panduan praktis untuk membangun<br className="blogDesktopBreak" /> kehadiran bisnis Anda di web.</p></header>
    <Suspense fallback={<p className="blogLoading" role="status">Menyiapkan panduan…</p>}><BlogLibrary /></Suspense>
  </main>;
}
