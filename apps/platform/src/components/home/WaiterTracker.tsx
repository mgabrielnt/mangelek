"use client";

import { useRef } from "react";

export function WaiterTracker() {
  const headRef = useRef<HTMLImageElement>(null);

  function follow(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.35;
    const head = headRef.current;
    if (!head) return;
    head.style.setProperty("--look-x", `${Math.max(-1, Math.min(1, x * 2))}`);
    head.style.setProperty("--look-y", `${Math.max(-1, Math.min(1, y * 2))}`);
  }

  function reset() {
    headRef.current?.style.setProperty("--look-x", "0");
    headRef.current?.style.setProperty("--look-y", "0");
  }

  return (
    <div className="waiterHitbox" onPointerMove={follow} onPointerLeave={reset}>
      <img
        ref={headRef}
        className="waiterHead"
        src="/images/home/waiter-head.webp"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
