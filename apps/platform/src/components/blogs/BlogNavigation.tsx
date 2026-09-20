import Link from "next/link";

export function BlogNavigation({ active = "blogs" }: { active?: "blogs" | "templates" }) {
  return <header className="blogNav">
    <a className="blogSkip" href="#blog-main">Lewati navigasi</a>
    <Link className="blogBrand" href="/" aria-label="Mangelek — beranda">mangelek.</Link>
    <nav aria-label="Navigasi utama"><Link href="/templates" aria-current={active === "templates" ? "location" : undefined}>Templates</Link><Link href="/pricing">Pricing</Link><Link href="/blogs" aria-current={active === "blogs" ? "location" : undefined}>Blogs</Link></nav>
    <Link className="blogLogin" href="/login">Masuk</Link>
  </header>;
}
