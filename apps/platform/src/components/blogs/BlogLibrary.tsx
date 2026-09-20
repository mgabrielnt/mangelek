"use client";

import { useSearchParams } from "next/navigation";
import { blogArticles, blogCategories, filterArticles } from "@/data/blogs";
import { BlogCard } from "./BlogCard";
import { BlogIcon } from "./BlogIcon";

export function BlogLibrary() {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").slice(0, 100);
  const category = blogCategories.find(item => item === params.get("kategori")) ?? "Semua";
  const browsing = !query.trim() && category === "Semua";
  const featured = blogArticles[0]!;
  const results = filterArticles(query, category).filter(article => !browsing || article.slug !== featured.slug);
  function update(q: string, nextCategory: string) {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (nextCategory !== "Semua") next.set("kategori", nextCategory);
    window.history.replaceState(null, "", `/blogs${next.size ? `?${next}` : ""}`);
  }
  return <>
    <div className="blogTools">
      <div className="blogCategories" role="group" aria-label="Filter kategori artikel">{blogCategories.map(item =>
        <button key={item} type="button" aria-pressed={item === category} onClick={() => update(query, item)}>{item}</button>)}</div>
      <div className="blogSearch"><BlogIcon name="search" /><label className="blogSrOnly" htmlFor="blog-search">Cari artikel</label>
        <input id="blog-search" type="search" placeholder="Cari artikel…" value={query} maxLength={100} autoComplete="off" onChange={event => update(event.target.value, category)} />
        {query && <button type="button" aria-label="Hapus pencarian" onClick={() => update("", category)}><BlogIcon name="close" /></button>}
      </div>
    </div>
    {browsing && <BlogCard article={featured} featured />}
    <section className="blogResults" aria-labelledby="blog-results-title">
      <div className="blogSectionHeading"><h2 id="blog-results-title">{browsing ? "Jelajahi panduan lainnya" : "Hasil pencarian"}</h2><p role="status" aria-live="polite" aria-atomic="true">{results.length} artikel{category !== "Semua" ? ` · ${category}` : ""}</p></div>
      {results.length ? <div className="blogGrid">{results.map(article => <BlogCard key={article.slug} article={article} />)}</div> :
        <div className="blogEmpty"><h3>Belum ada artikel yang cocok.</h3><p>Coba kata kunci lain atau lihat semua panduan Mangelek.</p><button type="button" onClick={() => update("", "Semua")}>Tampilkan semua artikel <BlogIcon name="arrow" /></button></div>}
    </section>
  </>;
}
