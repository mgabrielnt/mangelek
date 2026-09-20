import Link from "next/link";
import localFont from "next/font/local";
import { BlogNavigation } from "@/components/blogs/BlogNavigation";
import "@/styles/blogs.css";
import "@/styles/template-library.css";

const font = localFont({src:[{path:"../../../../public/fonts/manrope-regular.ttf",weight:"400"},{path:"../../../../public/fonts/manrope-semibold.ttf",weight:"600"}],variable:"--font-blog",display:"swap"});
export default function TemplatesLayout({children}:{children:React.ReactNode}) {
  return <div className={`blogPage ${font.variable}`}><BlogNavigation active="templates"/>{children}<footer className="blogFooter"><Link className="blogBrand" href="/">mangelek.</Link><span>© {new Date().getFullYear()} Mangelek</span><Link href="/#contact">Hubungi kami</Link></footer></div>;
}
