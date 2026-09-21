"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { palettes,fontPacks,resolveDesign,designQuery } from "@/data/template-designs";
import type { TemplateCategory } from "@/data/templates";
import { BlogIcon } from "@/components/blogs/BlogIcon";
export function TemplateCustomizer({item}:{item:TemplateCategory}){
  const params=useSearchParams();
  const design=resolveDesign({template:item.id,palette:params.get("palette")??undefined,font:params.get("font")??undefined});
  const [device,setDevice]=useState<"desktop"|"mobile">("desktop");
  const [frameReady,setFrameReady]=useState(false);
  const iframe=useRef<HTMLIFrameElement>(null);
  const initialSrc=useRef(`/preview/${item.id}?${designQuery(design)}`);
  useEffect(()=>{
    function ready(event:MessageEvent){if(event.origin===window.location.origin&&event.source===iframe.current?.contentWindow&&event.data?.type==="mangelek-ready")setFrameReady(true);}
    window.addEventListener("message",ready);
    iframe.current?.contentWindow?.postMessage({type:"mangelek-ping"},window.location.origin);
    return ()=>window.removeEventListener("message",ready);
  },[]);
  useEffect(()=>{iframe.current?.contentWindow?.postMessage({type:"mangelek-design",design},window.location.origin);},[design.template,design.palette,design.font,frameReady]);
  function update(key:"palette"|"font",value:string){const next={...design,[key]:value};window.history.replaceState(null,"",`/templates/${item.id}?${designQuery(next)}`);}
  const palette=palettes.find(p=>p.id===design.palette)!;
  const font=fontPacks.find(f=>f.id===design.font)!;
  return <main className="customizer" id="blog-main" tabIndex={-1}>
    <section className="previewWorkspace" aria-label="Live preview template">
      <div className="previewToolbar"><Link href="/templates" className="previewBack"><BlogIcon name="back"/> Semua template</Link><div className="previewDevice" role="group" aria-label="Ukuran preview">{(["desktop","mobile"] as const).map(mode=><button type="button" key={mode} aria-pressed={device===mode} onClick={()=>setDevice(mode)}>{mode==="desktop"?"Desktop":"Ponsel"}</button>)}</div></div>
      <div className={`previewBrowser ${device==="mobile"?"previewIsMobile":""}`}><div className="previewBrowserBar"><span aria-hidden="true"><i/><i/><i/></span><span>{item.title}</span><span>Live preview</span></div>
        {!frameReady&&<p className="previewLoading" role="status">Memuat preview…</p>}
        <iframe ref={iframe} title={`Live preview ${item.title}`} src={initialSrc.current} onLoad={()=>setFrameReady(true)} sandbox="allow-scripts allow-same-origin"/>
      </div><p className="previewHint">Jelajahi halaman di dalam preview. Isi bisnis merupakan contoh.</p>
    </section>
    <aside className="previewInspector" aria-label="Sesuaikan desain"><div className="previewIntro"><h1>{item.title}</h1><p>Mulai dari desain ini. Buat terasa seperti bisnis Anda.</p><Link className="previewPrimary" href={`/checkout?${designQuery(design)}`}>Pilih template ini <BlogIcon name="arrow"/></Link><p className="previewPrice">Website + CMS · Rp200.000 / bulan</p></div>
      <fieldset className="paletteSelector"><legend>Color palettes <span>{palette.name}</span></legend><div>{palettes.map(p=><button type="button" key={p.id} aria-label={`Palet ${p.name}`} aria-pressed={design.palette===p.id} onClick={()=>update("palette",p.id)}><span className="paletteSwatches" aria-hidden="true">{[p.background,p.surface,p.accent,p.ink].map(color=><i key={color} style={{background:color}}/>)}</span><span>{p.name}</span></button>)}</div></fieldset>
      <fieldset className="fontSelector"><legend>Font packs <span>{font.name}</span></legend><div>{fontPacks.map(f=><button key={f.id} type="button" aria-pressed={design.font===f.id} onClick={()=>update("font",f.id)}><span className="fontSpecimen" style={{fontFamily:f.family}}>Aa</span><span><strong>{f.name}</strong><small>{f.heading}</small></span></button>)}</div></fieldset>
      <p className="blogSrOnly" role="status" aria-live="polite">Desain {palette.name}, font {font.name}.</p>
      <div className="previewSecondaryActions"><Link href={`/editor?${designQuery(design)}`}>Coba Website Editor <BlogIcon name="arrow"/></Link><a href={`/preview/${item.id}?${designQuery(design)}`} target="_blank" rel="noopener noreferrer">Buka demo penuh <BlogIcon name="arrow"/><span className="blogSrOnly">(tab baru)</span></a><button type="button" onClick={()=>{window.history.replaceState(null,"",`/templates/${item.id}`);setDevice("desktop");}}>Atur ulang desain</button></div>
    </aside>
  </main>;
}
