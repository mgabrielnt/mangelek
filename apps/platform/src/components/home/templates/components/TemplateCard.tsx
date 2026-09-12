"use client";

import { useRef } from "react";
import Image from "next/image";
import type { TemplateCategory } from "@/data/templates";
import { TemplatePreview } from "./TemplatePreview";

type Props = { item: TemplateCategory; index: number; active: boolean };

export function TemplateCard({ item, index, active }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  return <article className="templateCard" data-active={active}>
    <button className="templateOpen" type="button"
      onClick={() => dialog.current?.showModal()} aria-label={`Lihat ${item.title}`}>
      <span className="templateCardTop"><span>{String(index + 1).padStart(2, "0")}</span>
        <span>KOLEKSI MANGELEK</span></span>
      <span className="templateArtwork">
        <Image src={`/images/marketing/categories/${item.image}`} alt=""
          fill sizes="(max-width: 600px) 80vw, 380px" draggable={false} />
      </span>
      <span className="templateCardBottom"><strong>{item.label}</strong>
        <span className="templateOpenIcon" aria-hidden="true">↗</span></span>
    </button>
    <TemplatePreview item={item} dialogRef={dialog} />
  </article>;
}
