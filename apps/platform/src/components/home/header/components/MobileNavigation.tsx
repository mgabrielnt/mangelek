import { mainLinks } from "@/data/navigation";

export function MobileNavigation({ open }: { open: boolean }) {
  return <nav id="mobile-navigation" className="mobileNavigation" hidden={!open}
    aria-label="Navigasi seluler">
    <span className="navPanelLabel">JELAJAHI MANGELEK</span>
    <ul>{mainLinks.map((item, index) => <li key={item.href}>
      <a href={item.href}><span><small aria-hidden="true">0{index + 1}</small>{item.title}</span>
        <span aria-hidden="true">↗</span></a>
    </li>)}</ul>
    <a href="#contact" className="navCta">Mulai cerita Anda <span aria-hidden="true">↗</span></a>
  </nav>;
}
