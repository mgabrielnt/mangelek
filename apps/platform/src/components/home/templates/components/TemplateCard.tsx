"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import type { TemplateCategory } from "@/data/templates";
import { TemplatePreview } from "./TemplatePreview";

type Props = { item: TemplateCategory; index: number; total: number; active: boolean; progress: MotionValue<number> };

export function TemplateCard({ item, index, total, active, progress }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const distance = index % 2 ? 24 : 40;
  const imageY = useTransform(progress, [0, .5, 1], [distance, 0, -distance / 2]);
  const labelY = useTransform(progress, [0, .5, 1], [10, 0, -6]);
  return <article id={`template-${item.id}`} className="templateCard" data-active={active} role="group"
    aria-roledescription="slide" aria-label={`${item.label}, ${index + 1} dari ${total}`}>
    <button className="templateOpen" type="button"
      onClick={() => dialog.current?.showModal()} aria-label={`Lihat ${item.title}`}>
      <span className="templateCardTop"><span>{String(index + 1).padStart(2, "0")}</span>
        <span>KOLEKSI MANGELEK</span></span>
      <motion.span className="templateArtwork" style={{ y: reduced ? 0 : imageY }}>
        <Image src={`/images/marketing/categories/${item.image}`} alt=""
          fill sizes="(max-width: 700px) 80vw, 390px" draggable={false} />
      </motion.span>
      <motion.span className="templateCardBottom" style={{ y: reduced ? 0 : labelY }}>
        <strong>{item.label}</strong><span className="templateOpenIcon" aria-hidden="true">↗</span>
      </motion.span>
    </button>
    <TemplatePreview item={item} dialogRef={dialog} />
  </article>;
}
