"use client";

import {
  Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton,
  MobileNavHeader, MobileNavToggle, MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

const navItems = [
  { name: "Products", link: "#products", children: [
    { name: "Website Builder", link: "/themes" },
    { name: "Managed Hosting", link: "#features" },
    { name: "Business CMS", link: "#features" },
    { name: "Ecommerce", link: "#features" },
  ]},
  { name: "Pricing", link: "/pricing" },
  { name: "Support", link: "#support", children: [
    { name: "Help Center", link: "/contact" },
    { name: "Documentation", link: "/contact" },
    { name: "Contact Support", link: "/contact" },
  ]},
  { name: "Blog", link: "#features" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="navbarActions">
          <NavbarButton href="#login" variant="secondary">Login</NavbarButton>
          <NavbarButton href="/themes" variant="primary">Get started</NavbarButton>
        </div>
      </NavBody>
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
        </MobileNavHeader>
        <MobileNavMenu isOpen={open} onClose={() => setOpen(false)}>
          {navItems.map((item) => (
            <a key={item.name} href={item.link} onClick={() => setOpen(false)}>{item.name}</a>
          ))}
          <NavbarButton href="#login" variant="secondary">Login</NavbarButton>
          <NavbarButton href="/themes" variant="primary">Get started</NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
