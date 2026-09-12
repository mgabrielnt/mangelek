"use client";

import type { GlobeArc } from "@/data/contact-globe";
import { useGlobeScene } from "./use-globe-scene";
import { GlobeFallback } from "./GlobeFallback";

export function GithubGlobe({ arcs }: { arcs: GlobeArc[] }) {
  const hostRef = useGlobeScene(arcs);
  return <div className="githubGlobe" role="img" aria-label="Ilustrasi koneksi global Mangelek dari Indonesia">
    <div ref={hostRef} className="githubGlobeCanvas" aria-hidden="true" />
    <GlobeFallback />
    <div className="githubGlobeHalo" aria-hidden="true" />
  </div>;
}
