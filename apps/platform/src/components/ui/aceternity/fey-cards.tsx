"use client";

import { motion, type Variants } from "motion/react";
import { useState } from "react";
import type { WhyCard } from "@/data/why-mangelek";

const GAP = 26;
const spring = { type: "spring", visualDuration: .46, bounce: .16 } as const;

export function FeyCards({ cards }: { cards: WhyCard[] }) {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : cards[active];
  const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: .1, staggerDirection: -1 } } };
  const card: Variants = { hidden: (offset: number) => ({ x: offset }), visible: { x: 0, transition: spring } };

  return (
    <div className="feyScene">
      <div className="feyStatus" aria-live="polite">
        <span>{selected ? selected.label : "Satu sistem"}</span>
        <p>{selected?.description ?? "Lima bagian penting yang dirancang untuk bekerja sebagai satu pengalaman."}</p>
      </div>
      <motion.div className="feyDeck" variants={container} initial="hidden"
        whileInView="visible" viewport={{ once: true, amount: .45 }}>
        <div className="feyBase"><strong>M</strong><small>mangelek</small></div>
        {cards.map((item, index) => {
          const shift = active !== null && index > active;
          return <motion.button key={item.label} type="button"
            className={`feyCard${active === index ? " isActive" : ""}`}
            style={{ left: `${GAP + index * GAP}px`, zIndex: index + 2 }}
            variants={card} custom={-index * GAP}
            onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)} onBlur={() => setActive(null)}
            onClick={() => setActive((value) => value === index ? null : index)}>
            <motion.div className="feyCardInner" animate={{ x: shift ? 48 : 0 }} transition={spring}>
              <img src={item.src} alt="" loading="lazy" decoding="async" />
              <span>{item.label}</span>
            </motion.div>
          </motion.button>;
        })}
      </motion.div>
    </div>
  );
}
