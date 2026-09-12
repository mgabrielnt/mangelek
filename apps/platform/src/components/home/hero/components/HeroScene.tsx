"use client";

import Image from "next/image";
import { heroMenu } from "@/data/hero-menu";
import { useHeroInteraction } from "../hooks/useHeroInteraction";

export function HeroScene() {
  const { scene, follow, reset } = useHeroInteraction();
  return <div className="heroScene" ref={scene}>
    <div className="heroMenu">
      {heroMenu.map((item) => <div key={item.id} className="heroMenuItem">
        <Image src={`/images/marketing/categories/${item.image}`} alt=""
          width={1024} height={1536} sizes="(min-width: 1440px) 142px, 10vw" loading="eager" />
        <a href={`#template-${item.id}`} aria-label={`Jelajahi template ${item.label}`}
          onPointerEnter={(event) => { if (event.pointerType !== "touch") follow(item.position); }}
          onPointerLeave={reset} onFocus={() => follow(item.position)} onBlur={reset} />
      </div>)}
    </div>
    <Image className="heroFrame" src="/images/marketing/hero/hero-menu-frame.webp" alt=""
      width={1448} height={1086} sizes="(min-width: 1440px) 1108px, 77vw" loading="eager" />
    <div className="heroSpeech" aria-hidden="true"><span>Mau pesan apa?</span></div>
    <Image className="heroWaiter" src="/images/marketing/hero/hero-waiter.webp" alt=""
      width={1024} height={1536} sizes="(min-width: 1440px) 588px, 41vw" loading="eager" />
    <Image className="heroCounter" src="/images/marketing/hero/hero-counter-alt.webp" alt=""
      width={1448} height={1086} sizes="(min-width: 1440px) 1642px, 114vw" loading="eager" />
  </div>;
}
