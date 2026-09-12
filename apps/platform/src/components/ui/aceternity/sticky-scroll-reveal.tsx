"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
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
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(items.length - 1, Math.floor(value * items.length));
    setActive(Math.max(0, next));
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
      <motion.div key={active} className="stickyScrollVisual"
        initial={{ opacity: 0, y: 18, scale: .975, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: .48, ease: [0.16, 1, 0.3, 1] }}>
        {items[active]?.content}
      </motion.div>
    </div>
  </div>;
}
