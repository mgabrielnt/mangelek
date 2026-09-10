"use client";

import { useEffect, useState } from "react";
import type { ShowcaseCard } from "./types";

export function ShowcaseItem({ card }: { card: ShowcaseCard }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return <>
    <button className="showcaseCard" onClick={() => setOpen(true)}>
      <img src={card.src} alt={card.title} loading="lazy" decoding="async" draggable={false} />
      <span className="showcaseShade" />
      <span className="showcaseCopy"><small>{card.category}</small><strong>{card.title}</strong></span>
    </button>
    {open && <div className="showcaseModal">
      <button className="showcaseBackdrop" onClick={() => setOpen(false)} aria-label="Close preview" />
      <div className="showcaseDialog" role="dialog" aria-modal="true" aria-label={card.title}>
        <button className="showcaseClose" onClick={() => setOpen(false)} aria-label="Close">×</button>
        <small>{card.category}</small><h3>{card.title}</h3>{card.content}
      </div>
    </div>}
  </>;
}
