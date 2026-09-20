import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogArticles, readingMinutes } from "@/data/blogs";
import { BlogCard } from "@/components/blogs/BlogCard";
import { BlogIcon } from "@/components/blogs/BlogIcon";

export const dynamicParams = false;
export function generateStaticParams() { return blogArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogArticles.find(item => item.slug === slug);
  return { title: article ? `${article.title} | Mangelek` : "Artikel tidak ditemukan — Mangelek", description: article?.excerpt };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = blogArticles.find(item => item.slug === slug);
  if (!article) notFound();
  const related = blogArticles.filter(item => item.slug !== slug).slice(0, 2);
  return <main id="blog-main" className="blogMain" tabIndex={-1}>
    <nav className="blogBreadcrumb" aria-label="Breadcrumb"><Link href="/blogs">Semua artikel</Link><span aria-hidden="true">/</span><Link href={`/blogs?kategori=${encodeURIComponent(article.category)}`}>{article.category}</Link></nav>
    <article>
      <header className="blogArticleHeader"><div className="blogMeta"><span>Panduan Mangelek</span><span>{readingMinutes(article)} menit baca</span></div><h1>{article.title}</h1><p>{article.excerpt}</p></header>
      <div className="blogArticleCover"><Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 1100px) 100vw, 1100px" priority /></div>
      <div className="blogReadingLayout"><aside className="blogContents"><nav aria-label="Dalam artikel ini"><h2>Dalam artikel ini</h2><ol>{article.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav></aside>
        <div className="blogProse"><p className="blogLead">{article.intro}</p>{article.sections.map(section => <section key={section.id} aria-labelledby={section.id}><h2 id={section.id}>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.checklist && <ul>{section.checklist.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}
          <div className="blogNextStep"><h2>Siap mengambil langkah berikutnya?</h2><p>Temukan tema yang sesuai dengan karakter bisnis Anda.</p><Link href="/templates">Jelajahi tema <BlogIcon name="arrow" /></Link></div>
        </div>
      </div>
    </article>
    <section className="blogRelated" aria-labelledby="related-title"><div className="blogSectionHeading"><h2 id="related-title">Lanjutkan membaca</h2><Link href="/blogs">Semua artikel <BlogIcon name="arrow" /></Link></div><div className="blogGrid">{related.map(item => <BlogCard key={item.slug} article={item} />)}</div></section>
  </main>;
}
