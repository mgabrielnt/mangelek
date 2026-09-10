"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import type { ShowcaseCard } from "./types";

export function ShowcaseItem({ card }: { card: ShowcaseCard }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useOutsideClick(dialogRef, close);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && close();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return <>
    <button className="showcaseCard" onClick={() => setOpen(true)}>
      <img src={card.src} alt={card.title} loading="lazy" decoding="async" draggable={false} />
      <span className="showcaseShade" />
      <span className="showcaseCopy"><small>{card.category}</small><strong>{card.title}</strong></span>
    </button>
    {open && <div className="showcaseModal">
      <div className="showcaseBackdrop" />
      <div ref={dialogRef} className="showcaseDialog" role="dialog" aria-modal="true" aria-label={card.title}>
        <button className="showcaseClose" onClick={close} aria-label="Close">×</button>
        <small>{card.category}</small><h3>{card.title}</h3>{card.content}
      </div>
    </div>}
  </>;
}
