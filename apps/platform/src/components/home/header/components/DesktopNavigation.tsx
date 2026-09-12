import { productLinks, supportLinks } from "@/data/navigation";
import { NavDropdown } from "./NavDropdown";

type Props = { active: string | null; setActive: (id: string | null) => void };

export function DesktopNavigation({ active, setActive }: Props) {
  return <nav className="desktopNavigation" aria-label="Navigasi utama">
    <ul className="navList">
      <NavDropdown id="products" label="Products" active={active} setActive={setActive}>
        <p className="navPanelLabel">SATU PLATFORM. BANYAK KEMUNGKINAN.</p>
        <ul className="navProductList">{productLinks.map((item) => <li key={item.title}>
          <a className="navProduct" href={item.href}>
            <span className="navProductIcon" aria-hidden="true">{item.icon}</span>
            <span><strong>{item.title}</strong><small>{item.description}</small></span>
            <span className="navProductArrow" aria-hidden="true">↗</span>
          </a>
        </li>)}</ul>
      </NavDropdown>
      <li><a className="navLink" href="#why-mangelek" onFocus={() => setActive(null)}>Cara kerja</a></li>
      <NavDropdown id="support" label="Support" active={active} setActive={setActive}>
        <ul className="navSupportList">{supportLinks.map((item) => <li key={item.title}>
          <a className="navSupport" href={item.href}>
            <strong>{item.title}</strong><small>{item.description}</small>
          </a>
        </li>)}</ul>
      </NavDropdown>
    </ul>
  </nav>;
}
