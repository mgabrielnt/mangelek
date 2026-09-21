import * as React from "react";
import type { CSSProperties } from "react";
import { palettes, fontPacks } from "@saas/themes/catalog";
import { sectionNames, type SiteDraft } from "@saas/contracts/website";

/** One renderer for the editable canvas and its read-only preview. Plain text only. */
export function SiteRenderer({ draft, selected, editing, onSelect }: { draft: SiteDraft; selected: string; editing: boolean; onSelect: (id: string) => void }) {
  const palette = palettes.find(p => p.id === draft.palette)!;
  const font = fontPacks.find(f => f.id === draft.font)!;
  const styles = { "--demo-bg": palette.background, "--demo-ink": palette.ink, "--demo-accent": palette.accent, "--demo-surface": palette.surface, "--demo-heading": font.family } as CSSProperties;
  const sections = draft.sections.filter(section => !section.hidden);
  return <div className="demoWebsite editorSite" style={styles} data-font={draft.font}>
    <header className="demoHeader"><a className="demoBrand" href="#site-main">{draft.brand}</a><nav aria-label="Navigasi website">{sections.filter(s => s.kind !== "hero").slice(0, 3).map(s => <a href={`#section-${s.id}`} key={s.id}>{sectionNames[s.kind]}</a>)}</nav></header>
    <main id="site-main">{sections.map(section => <section key={section.id} id={`section-${section.id}`} className={`canvasSection demo${section.kind === "hero" ? "Hero" : section.kind === "about" ? "About" : section.kind === "collection" ? "Collection" : "Contact"}`} data-selected={editing && selected === section.id} onClick={editing ? () => onSelect(section.id) : undefined}>
      {editing && <button className="canvasEdit" aria-label={`Edit ${sectionNames[section.kind]}: ${section.title}`} onClick={() => onSelect(section.id)}>{sectionNames[section.kind]} · Edit</button>}
      {section.kind === "hero" ? <><div className="demoHeroCopy"><h1>{section.title}</h1><p>{section.body}</p>{section.button && <a className="demoButton" href={`#section-${sections.find(s => s.kind !== "hero")?.id ?? section.id}`}>{section.button}</a>}</div>{section.image && <img src={section.image} alt={section.imageAlt} width={1600} height={1067} />}</> : <>
        <h2>{section.title}</h2>{section.body && <p className="canvasBody">{section.body}</p>}
        {section.kind === "collection" && <div>{section.items.map((item, index) => <article key={index}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>}
      </>}
    </section>)}</main>
    <footer className="demoFooter"><span className="demoBrand">{draft.brand}</span><p>Draft website · Belum dipublikasikan</p></footer>
  </div>;
}
