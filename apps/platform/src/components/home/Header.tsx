type NavItem = { title: string; description: string; href: string };

const productItems: NavItem[] = [
  { title: "Website Builder", description: "Build a polished site fast", href: "/themes" },
  { title: "Managed Hosting", description: "Fast, secure managed hosting", href: "#features" },
  { title: "Business CMS", description: "Manage pages and content", href: "#features" },
  { title: "Ecommerce", description: "Launch and manage your store", href: "#features" },
  { title: "Domains", description: "Connect your business domain", href: "#features" },
  { title: "Analytics", description: "Understand site performance", href: "#features" },
];

const supportItems: NavItem[] = [
  { title: "Help Center", description: "Answers to common questions", href: "/contact" },
  { title: "Documentation", description: "Guides for using Mangelek", href: "/contact" },
  { title: "Contact Support", description: "Get help from our team", href: "/contact" },
  { title: "System Status", description: "Check platform availability", href: "/contact" },
];

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  return (
    <details className="navDropdown">
      <summary>{label}<span aria-hidden="true">⌄</span></summary>
      <div className="dropdownPanel">
        {items.map((item) => (
          <a key={item.title} href={item.href}>
            <b>{item.title}</b><small>{item.description}</small>
          </a>
        ))}
      </div>
    </details>
  );
}

export function Header() {
  return (
    <header className="siteHeader">
      <a className="brand" href="/" aria-label="Mangelek home">MANGELEK</a>
      <nav className="desktopNav" aria-label="Navigasi utama">
        <Dropdown label="Products" items={productItems} />
        <a href="/pricing">Pricing</a>
        <Dropdown label="Support" items={supportItems} />
        <a href="#features">Blog</a>
      </nav>
      <div className="headerActions">
        <a className="loginLink" href="#login">Log in</a>
        <a className="primaryButton" href="/themes">Get started</a>
      </div>
      <details className="mobileMenu">
        <summary aria-label="Buka menu">Menu</summary>
        <div className="mobilePanel">
          <strong>Products</strong>{productItems.map((x) => <a key={x.title} href={x.href}>{x.title}</a>)}
          <strong>Support</strong>{supportItems.map((x) => <a key={x.title} href={x.href}>{x.title}</a>)}
          <a href="/pricing">Pricing</a><a href="#features">Blog</a>
        </div>
      </details>
    </header>
  );
}
