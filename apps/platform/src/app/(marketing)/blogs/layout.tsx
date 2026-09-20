import Link from "next/link";
import localFont from "next/font/local";
import { BlogNavigation } from "@/components/blogs/BlogNavigation";
import "@/styles/blogs.css";

const blogFont = localFont({ src: [
  { path: "../../../../public/fonts/manrope-regular.ttf", weight: "400", style: "normal" },
  { path: "../../../../public/fonts/manrope-semibold.ttf", weight: "600", style: "normal" },
], variable: "--font-blog", display: "swap" });

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <div className={`blogPage ${blogFont.variable}`}><BlogNavigation />{children}
    <footer className="blogFooter"><Link className="blogBrand" href="/">mangelek.</Link><span>© {new Date().getFullYear()} Mangelek</span><Link href="/#contact">Hubungi kami</Link></footer>
  </div>;
}
