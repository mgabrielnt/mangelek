import Image from "next/image";
import Link from "next/link";
import { readingMinutes, type BlogArticle } from "@/data/blogs";
import { BlogIcon } from "./BlogIcon";

export function BlogCard({ article, featured = false }: { article: BlogArticle; featured?: boolean }) {
  return <article className={featured ? "blogFeatured" : "blogCard"}>
    <Link className="blogArticleLink" href={`/blogs/${article.slug}`}>
      <div className="blogCover"><Image src={article.image} alt={article.imageAlt} fill sizes={featured ? "(max-width: 700px) 100vw, 55vw" : "(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"} priority={featured} /></div>
      <div className="blogCardCopy">
        <div className="blogMeta"><span>{article.category}</span><span>{readingMinutes(article)} menit baca</span></div>
        {featured ? <h2>{article.title}</h2> : <h3>{article.title}</h3>}
        <p>{article.excerpt}</p>
        <span className="blogRead">Baca panduan <BlogIcon name="arrow" /></span>
      </div>
    </Link>
  </article>;
}
