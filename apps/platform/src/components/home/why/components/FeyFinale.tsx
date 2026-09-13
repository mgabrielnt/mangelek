"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FeyCards } from "@/components/ui/aceternity/fey-cards";

export function FeyFinale() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, .45, 1], [.86, 1, 1.035]);
  const glow = useTransform(scrollYProgress, [0, .5, 1], [.1, .6, .1]);
  return <div className="feyFinale" ref={ref}>
    <div className="feyFinalePin">
      <motion.div className="feyFinaleAura" style={{ opacity: reduced ? .3 : glow }} aria-hidden="true" />
      <motion.div className="feyFinaleScene" style={{ scale: reduced ? 1 : scale }}>
        <FeyCards />
      </motion.div>
    </div>
  </div>;
}
