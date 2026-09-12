"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref, offset: ["start center", "end center"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 32 });
  return <div className="scrollTimeline sectionWidth" ref={ref}>
    <div className="timelineTrack" aria-hidden="true">
      <motion.div className="timelineBeam" style={{ scaleY: reduced ? 1 : progress }} />
    </div>
    <ol className="timelineEntries">{children}</ol>
  </div>;
}
