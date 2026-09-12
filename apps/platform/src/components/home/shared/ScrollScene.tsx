"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type Props = { children: ReactNode; className?: string; distance?: number };

export function ScrollScene({ children, className = "", distance = 24 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, .45, 1], [distance, 0, -distance / 2]);
  return <div ref={ref} className={`scrollScene ${className}`}>
    <motion.div style={{ y: reduced ? 0 : y }}>{children}</motion.div>
  </div>;
}
