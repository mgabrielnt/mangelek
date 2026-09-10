"use client";

import { useState } from "react";
import {
  Navbar, NavBody, MobileNav, NavbarLogo, NavbarButton,
  MobileNavHeader, MobileNavToggle, MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";

const products = [
  ["Website Builder", "/themes", "/images/marketing/features/website-editor.webp", "Build and launch a polished business website."],
  ["Business CMS", "#features", "/images/marketing/features/cms-dashboard.webp", "Manage pages, content, and business updates."],
  ["Domains", "#features", "/images/marketing/features/domain-management.webp", "Connect and manage your business domain."],
  ["Managed Hosting", "#features", "/images/marketing/features/business-dashboard.webp", "Fast, secure hosting managed for you."],
] as const;
const support = [
  ["Help Center", "/contact"], ["Documentation", "/contact"],
  ["Contact Support", "/contact"], ["System Status", "/contact"],
] as const;
const mobileLinks = [
  ["Products", "/themes"], ["Pricing", "/pricing"],
  ["Support", "/contact"], ["Blog", "#features"],
] as const;

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Products">
            <div className="productGrid">{products.map(([title, href, src, description]) => <ProductItem key={title} title={title} href={href} src={src} description={description} />)}</div>
          </MenuItem>
          <a href="/pricing">Pricing</a>
          <MenuItem setActive={setActive} active={active} item="Support">
            <div className="supportLinks">{support.map(([name, href]) => <HoveredLink key={name} href={href}>{name}</HoveredLink>)}</div>
          </MenuItem>
          <a href="#features">Blog</a>
        </Menu>
        <div className="navbarActions"><NavbarButton href="#login" variant="secondary">Login</NavbarButton><NavbarButton href="/themes">Get started</NavbarButton></div>
      </NavBody>
      <MobileNav>
        <MobileNavHeader><NavbarLogo /><MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} /></MobileNavHeader>
        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          {mobileLinks.map(([name, href]) => <a key={name} href={href} onClick={() => setMobileOpen(false)}>{name}</a>)}
          <NavbarButton href="#login" variant="secondary">Login</NavbarButton><NavbarButton href="/themes">Get started</NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
