import { headerLinks } from "@/data/navigation";

export function MobileNavigation({ open, activePage }: { open: boolean; activePage?: "pricing" | undefined }) {
  return <nav id="mobile-navigation" className="mobileNavigation" hidden={!open}
    aria-label="Navigasi seluler">
    <span className="navPanelLabel">JELAJAHI MANGELEK</span>
    <ul>{headerLinks.map((item, index) => <li key={item.href}>
      <a href={item.href} aria-current={activePage === "pricing" && item.href === "/pricing" ? "page" : undefined}>
        <span><small aria-hidden="true">0{index + 1}</small>{item.title}</span>
        <span aria-hidden="true">↗</span></a>
    </li>)}</ul>
    <a href="/#contact" className="navCta">Mulai cerita Anda <span aria-hidden="true">↗</span></a>
  </nav>;
}
