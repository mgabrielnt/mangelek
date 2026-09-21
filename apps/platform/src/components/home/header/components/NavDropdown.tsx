"use client";

import { useRef, type ReactNode } from "react";

type Props = { id: string; label: string; active: string | null;
  setActive: (id: string | null) => void; children: ReactNode };

export function NavDropdown({ id, label, active, setActive, children }: Props) {
  const open = active === id;
  const hoverOpened = useRef(false);
  return <li className="navDropdown" onPointerEnter={(event) => {
    if (event.pointerType === "mouse") { hoverOpened.current = !open; setActive(id); }
  }} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) setActive(null);
  }}>
    <button type="button" className="navLink" aria-expanded={open}
      aria-controls={`nav-${id}`} onClick={(event) => {
        setActive(event.detail > 0 && hoverOpened.current ? id : open ? null : id);
        hoverOpened.current = false;
      }}>
      {label}<span className="navChevron" aria-hidden="true" />
    </button>
    <div className="navDropdownPanel" id={`nav-${id}`} hidden={!open}>
      {children}
    </div>
  </li>;
}
