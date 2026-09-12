"use client";

import type { GlobeArc } from "@/data/contact-globe";
import { useGlobeScene } from "./use-globe-scene";

export function GithubGlobe({ arcs }: { arcs: GlobeArc[] }) {
  const hostRef = useGlobeScene(arcs);

  return (
    <div className="githubGlobe" aria-label="Visual koneksi global Mangelek">
      <div ref={hostRef} className="githubGlobeCanvas" aria-hidden />
      <div className="githubGlobeHalo" aria-hidden />
    </div>
  );
}
