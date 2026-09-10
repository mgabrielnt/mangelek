"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type BoxProps = { children: ReactNode; className?: string };
type NavItem = { name: string; link: string };

export function Navbar({ children }: BoxProps) {
  return <header className="siteHeader">{children}</header>;
}

export function NavBody({ children }: BoxProps) {
  return <div className="desktopNav">{children}</div>;
}

export function NavItems({ items }: { items: NavItem[] }) {
  return <nav className="navItems">{items.map((x) => <a key={x.name} href={x.link}>{x.name}</a>)}</nav>;
}

export function NavbarLogo() {
  return <a className="brand" href="/" aria-label="Mangelek home">MANGELEK</a>;
}

export function NavbarButton({ children, className = "", variant = "primary", ...props }:
  ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; className?: string; variant?: "primary" | "secondary" }) {
  return <button className={`navbarButton ${variant} ${className}`} {...props}>{children}</button>;
}

export function MobileNav({ children }: BoxProps) {
  return <div className="mobileMenu">{children}</div>;
}

export function MobileNavHeader({ children }: BoxProps) {
  return <div className="mobileNavHeader">{children}</div>;
}

export function MobileNavToggle({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return <button className="mobileToggle" onClick={onClick} aria-label="Toggle menu" aria-expanded={isOpen}>{isOpen ? "×" : "☰"}</button>;
}

export function MobileNavMenu({ isOpen, children }: BoxProps & { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return <div className="mobilePanel">{children}</div>;
}
