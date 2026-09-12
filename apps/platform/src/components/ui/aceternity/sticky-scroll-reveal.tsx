"use client";

import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

export type StickyScrollItem = {
  title: string;
  description: string;
  content: ReactNode;
  meta?: string;
};

type Props = { items: StickyScrollItem[]; className?: string };

export function StickyScrollReveal({ items, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const cardY = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(items.length - 1, Math.floor(value * items.length));
    setActive(Math.max(0, next));
    const root = rootRef.current?.offsetHeight ?? 0;
    const card = visualRef.current?.offsetHeight ?? 0;
    cardY.set(value * Math.max(0, root - card));
  });

  return <div ref={rootRef} className={`stickyScroll ${className}`}>
    <div className="stickyScrollCopy">
      {items.map((item, index) => <motion.article key={item.title}
        className={`stickyScrollItem${active === index ? " isActive" : ""}`}
        animate={{ opacity: active === index ? 1 : .28, y: active === index ? 0 : 10 }}
        transition={{ duration: .28 }}>
        {item.meta && <span>{item.meta}</span>}
        <h3>{item.title}</h3><p>{item.description}</p>
      </motion.article>)}
    </div>
    <div className="stickyScrollStage">
      <motion.div ref={visualRef} style={{ y: cardY }} className="stickyScrollVisual"
        key={active} initial={{ opacity: 0, scale: .98, filter: "blur(7px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: .42, ease: [0.16, 1, 0.3, 1] }}>
        {items[active]?.content}
      </motion.div>
    </div>
  </div>;
}
