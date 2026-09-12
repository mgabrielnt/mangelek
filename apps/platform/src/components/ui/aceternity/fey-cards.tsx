"use client";

import { motion, type Variants } from "motion/react";
import { useState } from "react";

const cards = ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"];
const spring = { type: "spring", visualDuration: .5, bounce: .2 } as const;
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: .2, staggerDirection: -1 } } };
const item: Variants = { hidden: (offset: number) => ({ x: offset }), visible: { x: 0, transition: spring } };

export function FeyCards() {
  const [active, setActive] = useState<number | null>(null);
  const hovered = active !== null;

  return (
    <div className="feyScene">
      <motion.h2 className="feyTitle feyTitleGlow" animate={{ opacity: hovered ? 1 : 0 }}>
        Inspired by the pros. Made for you.
      </motion.h2>
      <motion.h2 className="feyTitle" animate={{ opacity: hovered ? 0 : 1 }}>
        Inspired by the pros. Made for you.
      </motion.h2>
      <motion.div className="feyDeck" variants={container} initial="hidden" animate="visible">
        <img className="feyBaseImg" src="https://assets.aceternity.com/labs/main.webp" alt="" />
        {cards.map((src, index) => {
          const shift = active !== null && index > active;
          const selected = active === index;
          return (
            <motion.button key={src} type="button" className="feyCard"
              style={{ left: 32 + index * 32, zIndex: 20 + index }} variants={item} custom={-index * 32}
              onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)}
              onClick={() => setActive((value) => value === index ? null : index)}>
              <motion.div className="feyCardInner" animate={{ x: shift ? 60 : 0 }} transition={spring}>
                <img className={`feyActive${selected ? " isActive" : ""}`}
                  src={`https://assets.aceternity.com/labs/${src}`} alt="" />
                {index < 4 && <img className={`feyIdle${selected ? " isHidden" : ""}`}
                  src="https://assets.aceternity.com/labs/idle.webp" alt="" />}
                {index < 4 && <span className="feyShadow" aria-hidden />}
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
