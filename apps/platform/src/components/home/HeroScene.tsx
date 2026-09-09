"use client";

import { useState } from "react";

const menu = [
  ["Education", "education.webp", 22],
  ["Company", "company.webp", 35],
  ["Beauty & Wellness", "beauty-wellness.webp", 48],
  ["Restaurant", "restaurant.webp", 61],
  ["Service", "service.webp", 74],
] as const;

export function HeroScene() {
  const [waiterX, setWaiterX] = useState(54);
  const [hovered, setHovered] = useState(false);
  const reset = () => { setWaiterX(54); setHovered(false); };

  return (
    <div className="heroScene" onPointerLeave={reset}>
      <img className="heroFrame" src="/images/marketing/hero/hero-menu-frame.webp" alt="" />
      <div className="heroMenu" aria-label="Kategori website">
        {menu.map(([label, file, x]) => (
          <a key={label} href="#templates" className="heroMenuItem"
            onPointerEnter={() => { setWaiterX(x); setHovered(true); }}>
            <img src={`/images/marketing/categories/${file}`} alt={label} />
          </a>
        ))}
      </div>
      <div className={`heroSpeech${hovered ? " isHidden" : ""}`} aria-hidden="true">
        <span>Mau Pesen apa?</span>
      </div>
      <img className="heroWaiter" src="/images/marketing/hero/hero-waiter.webp"
        alt="Pelayan virtual" style={{ left: `${waiterX}%` }} />
      <img className="heroCounter" src="/images/marketing/hero/hero-counter-alt.webp" alt="" />
    </div>
  );
}
