"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type BoxProps = { children: ReactNode; className?: string };
type NavItem = { name: string; link: string };
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode; className?: string; href?: string;
  variant?: "primary" | "secondary";
};

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
export function NavbarButton({ children, className = "", href, variant = "primary", ...props }: ButtonProps) {
  const classes = `navbarButton ${variant} ${className}`;
  return href ? <a className={classes} href={href}>{children}</a> : <button className={classes} {...props}>{children}</button>;
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
  return isOpen ? <div className="mobilePanel">{children}</div> : null;
}
