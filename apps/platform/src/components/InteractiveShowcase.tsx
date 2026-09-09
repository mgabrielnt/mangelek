"use client";

import { useRef } from "react";

const categories = ["Restaurant", "Company", "Beauty & Wellness", "Property", "Education", "E-commerce"];

export function InteractiveShowcase() {
  const visualRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const node = visualRef.current;
    if (!node) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    node.style.setProperty("--look-x", `${x * 8}px`);
    node.style.setProperty("--look-y", `${y * 5}px`);
    node.style.setProperty("--tilt-x", `${y * -1.2}deg`);
    node.style.setProperty("--tilt-y", `${x * 1.8}deg`);
  }

  function handlePointerLeave() {
    const node = visualRef.current;
    if (!node) return;
    node.style.setProperty("--look-x", "0px");
    node.style.setProperty("--look-y", "0px");
    node.style.setProperty("--tilt-x", "0deg");
    node.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <section className="showcase section-shell" id="template" aria-labelledby="showcase-title">
      <div className="section-copy">
        <p className="eyebrow">Pilih gaya bisnis Anda</p>
        <h2 id="showcase-title">Mulai dari template yang sudah dirancang untuk konversi.</h2>
        <p>
          Pilih kategori, sesuaikan konten, lalu kelola semuanya dari satu tempat. Tampilan dibuat fleksibel untuk layar kecil sampai desktop besar.
        </p>
      </div>

      <div
        className="menu-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="menu-grid" aria-label="Kategori template">
          {categories.map((category, index) => (
            <a className="menu-card" href="#mulai" key={category} style={{ "--card-index": index } as React.CSSProperties}>
              <span className="menu-card__art" aria-hidden="true">
                <span className="menu-card__shape" />
                <span className="menu-card__line menu-card__line--one" />
                <span className="menu-card__line menu-card__line--two" />
              </span>
              <span>{category}</span>
            </a>
          ))}
        </div>

        <div className="host-visual" ref={visualRef} aria-hidden="true">
          <div className="host-head">
            <span className="host-hair" />
            <span className="host-face">
              <i className="host-eye host-eye--left" />
              <i className="host-eye host-eye--right" />
              <i className="host-smile" />
            </span>
          </div>
          <div className="host-body">
            <span className="host-shirt" />
            <span className="host-apron" />
            <span className="host-arm host-arm--left" />
            <span className="host-arm host-arm--right" />
          </div>
        </div>
      </div>
    </section>
  );
}
