"use client";

import { useState } from "react";
import {
  Navbar, NavBody, MobileNav, NavbarLogo, NavbarButton,
  MobileNavHeader, MobileNavToggle, MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";

const products = [
  ["Website Builder", "/themes", "Build and launch a polished business website."],
  ["Business CMS", "#features", "Manage pages, content, and business updates."],
  ["Ecommerce", "#features", "Create a storefront and manage online sales."],
  ["Managed Hosting", "#features", "Fast, secure hosting managed for you."],
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
            <div className="productGrid">
              {products.map(([title, href, description]) => <ProductItem key={title} title={title} href={href} description={description} />)}
            </div>
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
