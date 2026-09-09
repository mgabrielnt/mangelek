import Image from "next/image";
import { WaiterTracker } from "./WaiterTracker";

export function Hero() {
  return (
    <section className="hero" aria-label="Pilih kategori website">
      <div className="heroVisual">
        <Image
          className="heroImage"
          src="/images/home/hero.webp"
          alt="Counter bisnis dengan pilihan kategori website"
          width={669}
          height={447}
          priority
          sizes="100vw"
        />
        <WaiterTracker />
      </div>
    </section>
  );
}
