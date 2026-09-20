"use client";

import { DesktopNavigation } from "./components/DesktopNavigation";
import { MobileNavigation } from "./components/MobileNavigation";
import { useNavigation } from "./hooks/useNavigation";

export function Header({ activePage }: { activePage?: "pricing" | undefined } = {}) {
  const nav = useNavigation();
  return <header className="siteHeader">
    <a className="skipLink" href="#main-content">Lewati navigasi</a>
    <div ref={nav.root} className="navShell" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) nav.close();
    }} onClick={(event) => {
      if ((event.target as Element).closest("a")) nav.close();
    }}>
      <a className="navBrand" href="/" aria-label="Mangelek — beranda">
        <span className="navBrandMark" aria-hidden="true">m.</span><span>mangelek</span>
      </a>
      <DesktopNavigation active={nav.active} setActive={nav.setActive} activePage={activePage} />
      <div className="navActions">
        <a className="navSecondary" href="/login">Log in</a>
        <a className="navCta" href="/signup">Mulai <span aria-hidden="true">↗</span></a>
      </div>
      <button ref={nav.toggle} type="button" className="mobileToggle"
        aria-controls="mobile-navigation" aria-expanded={nav.mobileOpen}
        aria-label={nav.mobileOpen ? "Tutup navigasi" : "Buka navigasi"}
        onClick={nav.toggleMobile}><span /><span /></button>
      <MobileNavigation open={nav.mobileOpen} activePage={activePage} />
    </div>
  </header>;
}
