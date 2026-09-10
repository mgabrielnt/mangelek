"use client";

import { useState } from "react";
import { FloatingNav, NavbarButton, NavbarLogo } from "@/components/ui/floating-navbar";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";

const products = [
  ["Website Builder", "/themes", "/images/marketing/features/website-editor.webp", "Build a polished business website."],
  ["Business CMS", "#features", "/images/marketing/features/cms-dashboard.webp", "Manage content and business updates."],
  ["Domains", "#features", "/images/marketing/features/domain-management.webp", "Connect and manage your domain."],
  ["Managed Hosting", "#features", "/images/marketing/features/business-dashboard.webp", "Fast, secure managed hosting."],
] as const;

const support = [
  ["Help Center", "/contact"], ["Documentation", "/contact"],
  ["Contact Support", "/contact"], ["System Status", "/contact"],
] as const;

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <FloatingNav>
      <div className="navShell">
        <NavbarLogo />
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="productGrid">
              {products.map(([title, href, src, description]) => (
                <ProductItem key={title} {...{ title, href, src, description }} />
              ))}
            </div>
          </MenuItem>
          <a href="/pricing">Pricing</a>
          <MenuItem setActive={setActive} active={active} item="Support">
            <div className="supportLinks">
              {support.map(([name, href]) => <HoveredLink key={name} href={href}>{name}</HoveredLink>)}
            </div>
          </MenuItem>
          <a href="#features">Blog</a>
        </Menu>
        <div className="navbarActions">
          <NavbarButton href="#login" variant="ghost">Login</NavbarButton>
          <NavbarButton href="/themes">Get started</NavbarButton>
        </div>
        <button className="mobileToggle" onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu" aria-expanded={mobileOpen}>{mobileOpen ? "×" : "☰"}</button>
        {mobileOpen && (
          <div className="mobilePanel">
            <a href="/themes">Products</a><a href="/pricing">Pricing</a>
            <a href="/contact">Support</a><a href="#features">Blog</a>
            <NavbarButton href="#login" variant="ghost">Login</NavbarButton>
            <NavbarButton href="/themes">Get started</NavbarButton>
          </div>
        )}
      </div>
    </FloatingNav>
  );
}
