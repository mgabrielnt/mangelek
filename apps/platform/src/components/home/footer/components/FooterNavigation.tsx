import { mainLinks, supportLinks } from "@/data/navigation";

export function FooterNavigation() {
  return <nav className="footerNavigation" aria-label="Navigasi footer">
    <div><h3>Jelajahi</h3><ul>{mainLinks.map((item) => <li key={item.href}>
      <a href={item.href}>{item.title}</a>
    </li>)}</ul></div>
    <div><h3>Mulai di sini</h3><ul>{supportLinks.map((item) => <li key={item.title}>
      <a href={item.href}>{item.title}</a>
    </li>)}</ul></div>
  </nav>;
}
