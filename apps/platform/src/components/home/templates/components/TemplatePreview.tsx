"use client";

import { useState, type RefObject } from "react";
import Image from "next/image";
import type { TemplateCategory } from "@/data/templates";

type Props = { item: TemplateCategory; dialogRef: RefObject<HTMLDialogElement | null> };

export function TemplatePreview({ item, dialogRef }: Props) {
  const [loaded, setLoaded] = useState(false);
  return <dialog ref={dialogRef} className="templateDialog"
    aria-labelledby={`preview-${item.id}`} onToggle={(event) => {
      if (event.newState === "open") setLoaded(true);
    }} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) dialogRef.current?.close();
    }}>
    <button type="button" className="previewClose" autoFocus
      onClick={() => dialogRef.current?.close()} aria-label="Tutup preview">×</button>
    <div className="previewArtwork">{loaded && <Image
      src={`/images/marketing/categories/${item.image}`} alt={`Konsep ${item.title}`}
      fill sizes="(max-width: 700px) 90vw, 400px" />}</div>
    <div className="previewCopy">
      <span className="sectionLabel">KOLEKSI MANGELEK</span>
      <h3 id={`preview-${item.id}`}>{item.title}</h3>
      <p>Awal yang tepat untuk identitas bisnis Anda.</p>
      <a className="marketingLink" href="#contact" onClick={() => {
        dialogRef.current?.close();
        requestAnimationFrame(() => document.getElementById("contact-name")?.focus());
      }}>Diskusikan template ini <span aria-hidden="true">↗</span></a>
    </div>
  </dialog>;
}
