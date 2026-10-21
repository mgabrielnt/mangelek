import * as React from "react";
import type { CSSProperties } from "react";
import { palettes, fontPacks } from "@saas/themes/catalog";
import { sectionNames, validButtonUrl, type SiteDraft } from "@saas/contracts/website";

/** One renderer for the editable canvas and its read-only preview. Plain text only. */
export function SiteRenderer({ draft, selected, editing, onSelect, onNavigate }: { draft: SiteDraft; selected: string; editing: boolean; onSelect: (id: string) => void; onNavigate?: (id: string) => void }) {
  const palette = palettes.find(p => p.id === draft.palette)!;
  const font = fontPacks.find(f => f.id === draft.font)!;
  const styles = { "--demo-bg": palette.background, "--demo-ink": palette.ink, "--demo-accent": palette.accent, "--demo-surface": palette.surface, "--demo-heading": font.family } as CSSProperties;
  const sections = draft.sections.filter(section => !section.hidden);
  function navigate(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const path = href.length > 1 ? href.replace(/\/$/, "") : href;
    const target = path === "/" ? "home" : draft.pages?.find(page => `/${page.slug}` === path)?.id;
    if (target && onNavigate) { event.preventDefault(); onNavigate(target); }
    else if (href.startsWith("/") && onNavigate) event.preventDefault();
  }
  return <div className="demoWebsite editorSite" style={styles} data-font={draft.font}>
    <header className="demoHeader"><a className="demoBrand" href={draft.pages?.length ? "/" : "#site-main"} onClick={e => navigate(e,"/")}>{draft.brand}</a><nav aria-label="Navigasi website">{draft.pages?.length ? <><a href="/" onClick={e => navigate(e,"/")}>Beranda</a>{draft.pages.map(page => <a href={`/${page.slug}`} key={page.id} onClick={e => navigate(e,`/${page.slug}`)}>{page.title}</a>)}</> : sections.filter(s => s.kind !== "hero").slice(0, 3).map(s => <a href={`#section-${s.id}`} key={s.id}>{sectionNames[s.kind]}</a>)}</nav></header>
    <main id="site-main">{sections.map(section => <section key={section.id} id={`section-${section.id}`} className={`canvasSection demo${section.kind === "hero" ? "Hero" : section.kind === "about" ? "About" : section.kind === "collection" ? "Collection" : "Contact"}`} data-selected={editing && selected === section.id} onClick={editing ? () => onSelect(section.id) : undefined}>
      {editing && <button className="canvasEdit" aria-label={`Edit ${sectionNames[section.kind]}: ${section.title}`} onClick={() => onSelect(section.id)}>{sectionNames[section.kind]} · Edit</button>}
      {section.kind === "hero" ? <><div className="demoHeroCopy"><h1>{section.title}</h1><p>{section.body}</p>{section.button && <a className="demoButton" href={section.buttonUrl && validButtonUrl(section.buttonUrl) ? section.buttonUrl : `#section-${sections.find(s => s.kind !== "hero")?.id ?? section.id}`} onClick={e => navigate(e,section.buttonUrl ?? "")} {...(section.buttonUrl?.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{section.button}</a>}</div>{section.image && <img src={section.image} alt={section.imageAlt} width={1600} height={1067} />}</> : <>
        <h2>{section.title}</h2>{section.body && <p className="canvasBody">{section.body}</p>}
        {section.kind === "collection" && <div>{section.items.map((item, index) => <article key={index}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>}
      </>}
    </section>)}</main>
    <footer className="demoFooter"><span className="demoBrand">{draft.brand}</span><p>Draft website · Belum dipublikasikan</p></footer>
  </div>;
}
