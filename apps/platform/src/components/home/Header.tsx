const productItems = [
  ["Website Builder", "#templates"], ["Managed Hosting", "#features"],
  ["Business CMS", "#features"], ["Ecommerce", "#templates"],
  ["Domains", "#features"], ["Analytics", "#features"],
] as const;

const supportItems = [
  ["Help Center", "#support"], ["Documentation", "#support"],
  ["Contact Support", "#support"], ["System Status", "#support"],
] as const;

type Items = readonly (readonly [string, string])[];

function Dropdown({ label, items }: { label: string; items: Items }) {
  return (
    <details className="navDropdown">
      <summary>{label}<span aria-hidden="true">⌄</span></summary>
      <div className="dropdownPanel">
        {items.map(([name, href]) => <a key={name} href={href}>{name}</a>)}
      </div>
    </details>
  );
}

export function Header() {
  return (
    <header className="siteHeader">
      <a className="brand" href="#" aria-label="Mangelek home">MANGELEK</a>
      <nav className="desktopNav" aria-label="Navigasi utama">
        <Dropdown label="Products" items={productItems} />
        <a href="#templates">Pricing</a>
        <Dropdown label="Support" items={supportItems} />
        <a href="#features">Blog</a>
      </nav>
      <div className="headerActions">
        <a className="loginLink" href="#login">Log in</a>
        <a className="primaryButton" href="#templates">Get started</a>
      </div>
      <details className="mobileMenu">
        <summary aria-label="Buka menu">Menu</summary>
        <div className="mobilePanel">
          <strong>Products</strong>{productItems.slice(0, 4).map(([n, h]) => <a key={n} href={h}>{n}</a>)}
          <strong>Support</strong>{supportItems.slice(0, 3).map(([n, h]) => <a key={n} href={h}>{n}</a>)}
          <a href="#templates">Pricing</a><a href="#features">Blog</a>
        </div>
      </details>
    </header>
  );
}
