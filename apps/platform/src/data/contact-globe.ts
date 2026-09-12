export type GlobeArc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export const contactGlobeArcs: GlobeArc[] = [
  { startLat: -6.21, startLng: 106.85, endLat: 1.35, endLng: 103.82, arcAlt: .14, color: "#b9c9df" },
  { startLat: -6.21, startLng: 106.85, endLat: 35.68, endLng: 139.76, arcAlt: .24, color: "#d3b27d" },
  { startLat: -6.21, startLng: 106.85, endLat: -33.87, endLng: 151.21, arcAlt: .2, color: "#9fb8d8" },
  { startLat: -6.21, startLng: 106.85, endLat: 25.2, endLng: 55.27, arcAlt: .22, color: "#d3b27d" },
  { startLat: -6.21, startLng: 106.85, endLat: 51.51, endLng: -.13, arcAlt: .3, color: "#a9bdd7" },
];
