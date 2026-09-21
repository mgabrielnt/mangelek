"use client";
import { BlogIcon } from "@/components/blogs/BlogIcon";
import { useEffect, useState, type CSSProperties } from "react";
import { demoContent, palettes, fontPacks, resolveDesign, type DesignSelection } from "@/data/template-designs";

export function TemplateDemo({initial}:{initial:DesignSelection}) {
  const [design,setDesign]=useState(initial);
  useEffect(()=>{
    function ready(){window.parent.postMessage({type:"mangelek-ready"},window.location.origin);}
    function receive(event:MessageEvent){ if(event.origin!==window.location.origin || event.source!==window.parent)return; if(event.data?.type==="mangelek-ping"){ready();return;} if(event.data?.type==="mangelek-design")setDesign(resolveDesign(event.data.design ?? {})); }
    window.addEventListener("message",receive);
    ready();
    return ()=>window.removeEventListener("message",receive);
  },[]);
  const content=demoContent[design.template]!;
  const palette=palettes.find(p=>p.id===design.palette)!;
  const font=fontPacks.find(f=>f.id===design.font)!;
  const styles={"--demo-bg":palette.background,"--demo-ink":palette.ink,"--demo-accent":palette.accent,"--demo-surface":palette.surface,"--demo-heading":font.family} as CSSProperties;
  return <div className="demoWebsite" style={styles} data-font={design.font}>
    <a className="demoSkip" href="#demo-main">Lewati navigasi demo</a>
    <header className="demoHeader"><a className="demoBrand" href="#demo-main">{content.brand}</a><nav aria-label="Navigasi contoh website"><a href="#demo-about">Tentang</a><a href="#demo-collection">{design.template==="restaurant" ? "Menu" : "Layanan"}</a><a href="#demo-contact">Hubungi kami</a></nav></header>
    <main id="demo-main" tabIndex={-1}>
      <section className="demoHero"><div className="demoHeroCopy"><h1>{content.title}</h1><p>{content.intro}</p><a className="demoButton" href="#demo-collection">Jelajahi lebih dekat</a></div><img src={`/images/templates/${design.template}.webp`} alt={content.imageAlt} width={1600} height={1067} fetchPriority="high"/></section>
      <section className="demoAbout" id="demo-about"><h2>{content.aboutTitle}</h2><p>{content.about}</p></section>
      <section className="demoCollection" id="demo-collection"><h2>{content.collection}</h2><div>{content.items.map((item,i)=><article key={item}><h3>{item}</h3><p>{content.descriptions[i]}</p><a href="#demo-contact">Cari tahu lebih lanjut <BlogIcon name="external"/></a></article>)}</div></section>
      <section className="demoContact" id="demo-contact"><h2>{content.cta}</h2><p>Setiap cerita dimulai dari satu percakapan.</p><details><summary>Lihat informasi kontak</summary><p>Ini contoh website untuk pratinjau. Nomor telepon, alamat, dan kanal kontak bisnis Anda akan tampil di sini.</p></details></section>
    </main><footer className="demoFooter"><a className="demoBrand" href="#demo-main">{content.brand}</a><p>Contoh website oleh Mangelek. Nama dan isi bisnis bersifat ilustratif.</p></footer>
  </div>;
}
