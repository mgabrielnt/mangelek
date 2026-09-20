import Link from "next/link";

export default function ArticleNotFound() {
  return <main id="blog-main" className="blogMain blogEmpty" tabIndex={-1}><h1>Artikel tidak ditemukan.</h1><p>Alamatnya mungkin berubah. Temukan panduan lainnya di halaman Blogs.</p><Link href="/blogs">Kembali ke semua artikel</Link></main>;
}
