"use client";

import type { ReactNode } from "react";

type MenuProps = { children: ReactNode; setActive: (item: string | null) => void };
type ItemProps = MenuProps & { active: string | null; item: string };
type ProductProps = { title: string; href: string; src: string; description: string };

export function Menu({ children, setActive }: MenuProps) {
  return <nav className="hoverMenu" onMouseLeave={() => setActive(null)}>{children}</nav>;
}

export function MenuItem({ children, setActive, active, item }: ItemProps) {
  const open = active === item;
  return (
    <div className="hoverMenuItem" onMouseEnter={() => setActive(item)}>
      <button type="button" aria-expanded={open}>{item}<span aria-hidden>⌄</span></button>
      {open && <div className="hoverMenuPanel">{children}</div>}
    </div>
  );
}

export function HoveredLink({ children, href }: { children: ReactNode; href: string }) {
  return <a className="hoveredLink" href={href}>{children}</a>;
}

export function ProductItem({ title, href, src, description }: ProductProps) {
  return (
    <a className="productItem" href={href}>
      <img src={src} alt="" loading="lazy" />
      <span><strong>{title}</strong><small>{description}</small></span>
    </a>
  );
}
