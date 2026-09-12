"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Group, MeshPhongMaterial } from "three";
import ThreeGlobe from "three-globe";
import type { GlobeArc } from "@/data/contact-globe";

function World({ arcs }: { arcs: GlobeArc[] }) {
  const group = useRef<Group>(null);
  const globe = useMemo(() => new ThreeGlobe(), []);

  useEffect(() => {
    const material = globe.globeMaterial() as MeshPhongMaterial;
    material.color.set("#111a26");
    material.emissive.set("#07101b");
    material.emissiveIntensity = .55;
    material.shininess = 12;
    globe.arcsData(arcs).arcStartLat("startLat").arcStartLng("startLng")
      .arcEndLat("endLat").arcEndLng("endLng").arcAltitude("arcAlt")
      .arcColor("color").arcStroke(.55).arcDashLength(.46).arcDashGap(.28)
      .arcDashAnimateTime(1900);
  }, [arcs, globe]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * .055;
  });

  return <group ref={group}><primitive object={globe} /></group>;
}

export function GithubGlobe({ arcs }: { arcs: GlobeArc[] }) {
  return <div className="githubGlobe">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 260], fov: 45 }}>
      <ambientLight intensity={2.4} />
      <directionalLight position={[-100, 80, 120]} intensity={3.2} color="#b8c9e0" />
      <directionalLight position={[120, -40, 80]} intensity={2.1} color="#d6b37b" />
      <World arcs={arcs} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={.9} maxPolarAngle={2.25} />
    </Canvas>
  </div>;
}
