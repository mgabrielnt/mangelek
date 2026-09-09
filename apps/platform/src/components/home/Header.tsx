const navItems = [
  ["Products", "#features"],
  ["Pricing", "#templates"],
  ["Support", "#features"],
  ["Blog", "#features"],
] as const;

export function Header() {
  return (
    <header className="siteHeader">
      <a className="brand" href="#" aria-label="Mangelek home">MANGELEK</a>
      <nav className="desktopNav" aria-label="Navigasi utama">
        {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
      <div className="headerActions">
        <a className="loginLink" href="#templates">Log in</a>
        <a className="primaryButton" href="#templates">Get started</a>
      </div>
      <details className="mobileMenu">
        <summary aria-label="Buka menu">Menu</summary>
        <div>{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
      </details>
    </header>
  );
}
