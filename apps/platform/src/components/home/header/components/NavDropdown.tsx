"use client";

import type { ReactNode } from "react";

type Props = { id: string; label: string; active: string | null;
  setActive: (id: string | null) => void; children: ReactNode };

export function NavDropdown({ id, label, active, setActive, children }: Props) {
  const open = active === id;
  return <li className="navDropdown" onPointerEnter={(event) => {
    if (event.pointerType === "mouse") setActive(id);
  }} onPointerLeave={(event) => {
    if (!event.currentTarget.contains(document.activeElement)) setActive(null);
  }} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) setActive(null);
  }}>
    <button type="button" className="navLink" aria-expanded={open}
      aria-controls={`nav-${id}`} onClick={() => setActive(open ? null : id)}>
      {label}<span className="navChevron" aria-hidden="true" />
    </button>
    <div className="navDropdownPanel" id={`nav-${id}`} hidden={!open}>
      {children}
    </div>
  </li>;
}
