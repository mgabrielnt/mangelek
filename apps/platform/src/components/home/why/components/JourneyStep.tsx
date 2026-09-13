"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { JourneyStep as Step } from "@/data/journey";
import { JourneyVisual } from "./JourneyVisual";

type Props = { item: Step; index: number };

export function JourneyStep({ item, index }: Props) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start .85", "end .2"] });
  const textY = useTransform(scrollYProgress, [0, .35, 1], [28, 0, -16]);
  const dotScale = useTransform(scrollYProgress, [0, .3, 1], [.65, 1, 1]);
  return <li ref={ref} className="timelineEntry" id={`journey-${index + 1}`}>
    <div className="timelineMarker" aria-hidden="true">
      <motion.i style={{ scale: reduced ? 1 : dotScale }} />
    </div>
    <div className="timelineCopy">
      <motion.div style={{ y: reduced ? 0 : textY }}>
        <h3>{item.title}</h3><p>{item.description}</p>
        <a className="marketingLink" href={item.href}>{item.action}<span aria-hidden="true">↗</span></a>
      </motion.div>
    </div>
    <JourneyVisual item={item} index={index} progress={scrollYProgress} />
  </li>;
}
