"use client";

import { useState } from "react";

const menu = [
  ["Education", "education.webp", 41.28],
  ["Company", "company.webp", 49.9],
  ["Beauty & Wellness", "beauty-wellness.webp", 41.28],
  ["Restaurant", "restaurant.webp", 49.9],
  ["Service", "service.webp", 58.77],
] as const;

export function HeroScene() {
  const [waiterX, setWaiterX] = useState(43.9);
  const [hovered, setHovered] = useState(false);
  const reset = () => { setWaiterX(43.9); setHovered(false); };

  return (
    <div className="heroScene" onPointerLeave={reset}>
      <div className="heroMenu" aria-label="Kategori website">
        {menu.map(([label, file, x]) => (
          <a key={label} href="#templates" className="heroMenuItem"
            onPointerEnter={() => { setWaiterX(x); setHovered(true); }}>
            <img src={`/images/marketing/categories/${file}`} alt={label} />
          </a>
        ))}
      </div>
      <img className="heroFrame" src="/images/marketing/hero/hero-menu-frame.webp" alt="" />
      <div className={`heroSpeech${hovered ? " isHidden" : ""}`} aria-hidden="true">
        <span>Mau Pesen apa?</span>
      </div>
      <img className="heroWaiter" src="/images/marketing/hero/hero-waiter.webp"
        alt="Pelayan virtual" style={{ left: `${waiterX}%` }} />
      <img className="heroCounter" src="/images/marketing/hero/hero-counter-alt.webp" alt="" />
    </div>
  );
}
