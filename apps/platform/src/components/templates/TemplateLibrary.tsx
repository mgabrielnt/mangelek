"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { templateCategories } from "@/data/templates";
import { BlogIcon } from "@/components/blogs/BlogIcon";
import { demoContent } from "@/data/template-designs";

export function TemplateLibrary() {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").slice(0,100);
  const category = templateCategories.find(item => item.id === params.get("kategori"))?.id ?? "all";
  const results = templateCategories.filter(item => (category === "all" || item.id === category) && `${item.title} ${item.label}`.toLowerCase().includes(query.trim().toLowerCase()));
  function update(q: string, category: string) {
    const next = new URLSearchParams();
    if(q) next.set("q",q);
    if(category !== "all") next.set("kategori",category);
    window.history.replaceState(null,"",`/templates${next.size ? `?${next}` : ""}`);
  }
  return <>
    <div className="templateLibraryTools">
      <div className="blogSearch"><BlogIcon name="search"/><label className="blogSrOnly" htmlFor="template-search">Cari template</label><input id="template-search" type="search" placeholder="Cari template…" value={query} maxLength={100} onChange={e=>update(e.target.value,category)}/>{query && <button type="button" aria-label="Hapus pencarian" onClick={()=>update("",category)}><BlogIcon name="close"/></button>}</div>
      <div className="blogCategories" role="group" aria-label="Kategori template">{[{id:"all",label:"Semua"},...templateCategories].map(item=><button type="button" key={item.id} aria-pressed={category===item.id} onClick={()=>update(query,item.id)}>{item.label}</button>)}</div>
    </div>
    <div className="blogSectionHeading"><h2>Koleksi template</h2><p role="status" aria-live="polite" aria-atomic="true">{results.length} desain · {results.filter(item=>Object.hasOwn(demoContent,item.id)).length} live demo</p></div>
    {results.length ? <div className="templateLibraryGrid">{results.map((item,index)=>{const demo=demoContent[item.id];return <article className="templateLibraryCard" key={item.id}><Link href={`/templates/${item.id}`} className="blogArticleLink">{demo?<div className="templateLiveThumbnail"><div className="thumbnailNav">{demo.brand}<span>Tentang · Layanan · Kontak</span></div><div className="thumbnailHero"><div><strong>{demo.title}</strong><span>Jelajahi lebih dekat</span></div><div className="thumbnailPhoto"><Image src={`/images/templates/${item.id}.webp`} alt={demo.imageAlt} fill sizes="(max-width:600px) 45vw,280px" priority={index<2}/></div></div></div>:<div className={`templateLibraryImage templateTint-${item.id}`}><Image src={`/images/marketing/categories/${item.image}`} alt={`Pratinjau konsep ${item.title}`} fill sizes="(max-width:600px) 90vw, (max-width:900px) 45vw,550px"/></div>}<div className="templateLibraryCaption"><div><p>{item.label}{demo?" · Live preview":" · Konsep"}</p><h3>{item.title}</h3></div><span className="templateView">{demo?"Coba desain":"Lihat konsep"} <BlogIcon name="arrow"/></span></div></Link></article>;})}</div> : <div className="blogEmpty"><h3>Belum ada template yang cocok.</h3><p>Coba kata kunci lain atau jelajahi seluruh koleksi.</p><button type="button" onClick={()=>update("","all")}>Tampilkan semua template <BlogIcon name="arrow"/></button></div>}
  </>;
}
