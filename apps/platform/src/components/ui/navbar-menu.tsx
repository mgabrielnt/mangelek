"use client";

import type { ReactNode } from "react";

type MenuProps = { children: ReactNode; setActive: (value: string | null) => void };
type ItemProps = MenuProps & { active: string | null; item: string };

export function Menu({ children, setActive }: MenuProps) {
  return <nav className="hoverMenu" onMouseLeave={() => setActive(null)}>{children}</nav>;
}

export function MenuItem({ children, setActive, active, item }: ItemProps) {
  const open = active === item;
  return (
    <div className="hoverMenuItem" onMouseEnter={() => setActive(item)}>
      <button type="button" aria-expanded={open}>{item}<span>⌄</span></button>
      {open && <div className="hoverMenuPanel">{children}</div>}
    </div>
  );
}

export function HoveredLink({ children, href }: { children: ReactNode; href: string }) {
  return <a className="hoveredLink" href={href}>{children}</a>;
}

export function ProductItem({ title, href, description }: {
  title: string; href: string; src?: string; description: string;
}) {
  return (
    <a className="productItem" href={href}>
      <strong>{title}</strong><small>{description}</small>
    </a>
  );
}
