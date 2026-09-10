"use client";

import { useEffect, useState, type ReactNode } from "react";

export function FloatingNav({ children }: { children: ReactNode }) {
  const [floating, setFloating] = useState(false);
  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={`siteHeader${floating ? " isFloating" : ""}`}>{children}</header>;
}

export function NavbarLogo() {
  return <a className="brand" href="/" aria-label="Mangelek home">MANGELEK</a>;
}

export function NavbarButton({ children, href, variant = "primary" }: {
  children: ReactNode; href: string; variant?: "primary" | "ghost";
}) {
  return <a className={`navbarButton ${variant}`} href={href}>{children}</a>;
}
