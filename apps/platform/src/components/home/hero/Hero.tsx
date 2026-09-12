import Image from "next/image";
import { HeroCopy } from "./components/HeroCopy";
import { HeroScene } from "./components/HeroScene";
import { HeroQuickLinks } from "./components/HeroQuickLinks";

export function Hero() {
  return <section className="hero" id="top" aria-labelledby="hero-title">
    <Image className="heroBackground" src="/images/marketing/hero/background.png"
      alt="" fill sizes="100vw" loading="eager" fetchPriority="high" />
    <HeroCopy />
    <HeroScene />
    <HeroQuickLinks />
  </section>;
}
