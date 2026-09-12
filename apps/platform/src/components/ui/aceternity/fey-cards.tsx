"use client";

import { motion, type Variants } from "motion/react";
import { useState } from "react";
import type { WhyCard } from "@/data/why-mangelek";

const spring = { type: "spring", visualDuration: .5, bounce: .18 } as const;

export function FeyCards({ cards }: { cards: WhyCard[] }) {
  const [active, setActive] = useState<number | null>(null);
  const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: .12, staggerDirection: -1 } } };
  const card: Variants = { hidden: (offset: number) => ({ x: offset }), visible: { x: 0, transition: spring } };
  const headline = active === null ? "Semua yang penting. Dalam satu pengalaman." : cards[active]?.label;

  return <div className="feyScene">
    <motion.p className="feyHeadline" key={headline}
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      {headline}
    </motion.p>
    <motion.div className="feyDeck" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .45 }}>
      <div className="feyBase"><span>M</span><small>mangelek</small></div>
      {cards.map((item, index) => {
        const shift = active !== null && index > active;
        return <motion.button key={item.label} type="button" className={`feyCard${active === index ? " isActive" : ""}`}
          style={{ left: `${32 + index * 32}px`, zIndex: index + 2 }} variants={card} custom={-index * 32}
          onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(index)} onBlur={() => setActive(null)}
          onClick={() => setActive((value) => value === index ? null : index)}>
          <motion.div className="feyCardInner" animate={{ x: shift ? 62 : 0 }} transition={spring}>
            <img src={item.src} alt={item.label} loading="lazy" decoding="async" />
            <span>{item.label}</span>
          </motion.div>
        </motion.button>;
      })}
    </motion.div>
  </div>;
}
