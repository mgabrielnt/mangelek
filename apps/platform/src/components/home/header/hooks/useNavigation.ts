"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useNavigation() {
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = useCallback(() => { setActive(null); setMobileOpen(false); }, []);
  useEffect(() => {
    const desktop = matchMedia("(min-width: 961px)");
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, [close]);
  useEffect(() => {
    if (!active && !mobileOpen) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      const control = mobileOpen ? toggle.current : root.current?.querySelector<HTMLButtonElement>(
        `[aria-controls="nav-${active}"]`,
      );
      close();
      control?.focus();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [active, mobileOpen, close]);
  return { root, toggle, active, setActive, mobileOpen, close,
    toggleMobile: () => { setActive(null); setMobileOpen((open) => !open); } };
}
