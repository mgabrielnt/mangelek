"use client";

import Image from "next/image";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import type { JourneyStep } from "@/data/journey";

type Props = { item: JourneyStep; index: number; progress: MotionValue<number> };

export function JourneyVisual({ item, index, progress }: Props) {
  const reduced = useReducedMotion();
  const y = useTransform(progress, [0, .4, 1], [48, 0, -24]);
  const rotate = useTransform(progress, [0, .45, 1], [index % 2 ? 4 : -4, 0, 0]);
  const scale = useTransform(progress, [0, .4, 1], [.94, 1, 1]);
  const badgeY = useTransform(progress, [0, .5, 1], [18, 0, -12]);
  return <div className={`journeyVisual journeyVisual--${item.tone}`}>
    <span className="journeyGrid" aria-hidden="true" />
    <span className="journeyOrdinal" aria-hidden="true">0{index + 1}</span>
    <motion.figure className="journeyImage"
      style={{ y: reduced ? 0 : y, rotate: reduced ? 0 : rotate, scale: reduced ? 1 : scale }}>
      <Image src={item.image} alt={`Ilustrasi ${item.title}`} fill
        sizes="(max-width: 700px) 66vw, 400px" />
    </motion.figure>
    <motion.div className="journeyBadge" style={{ y: reduced ? 0 : badgeY }}>
      <span className="journeyBadgeMark" aria-hidden="true">↗</span>
      <span><small>MANGELEK</small><strong>{item.note}</strong></span>
    </motion.div>
    <span className="journeyVisualFooter" aria-hidden="true">{item.label} / MANGELEK</span>
  </div>;
}
