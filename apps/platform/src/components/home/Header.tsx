const productItems = [
  ["Product One", "#features"],
  ["Product Two", "#features"],
  ["Product Three", "#features"],
] as const;

const supportItems = [
  ["Help Center", "#features"],
  ["Documentation", "#features"],
  ["Contact", "#features"],
] as const;

function Dropdown({ label, items }: {
  label: string;
  items: readonly (readonly [string, string])[];
}) {
  return (
    <details className="navDropdown">
      <summary>{label}</summary>
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
        <a className="loginLink" href="#templates">Log in</a>
        <a className="primaryButton" href="#templates">Get started</a>
      </div>
      <details className="mobileMenu">
        <summary aria-label="Buka menu">Menu</summary>
        <div>
          <a href="#features">Products</a><a href="#templates">Pricing</a>
          <a href="#features">Support</a><a href="#features">Blog</a>
        </div>
      </details>
    </header>
  );
}
