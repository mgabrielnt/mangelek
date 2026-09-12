import type { MeshPhongMaterial } from "three";
import type { GlobeArc } from "@/data/contact-globe";
import { EARTH_TEXTURE_URL, HOME_POINT, type CountryFeature } from "./globe-config";
import { loadCountries } from "./load-countries";

const countryName = (item: object) => {
  const props = (item as CountryFeature).properties;
  return props?.NAME ?? props?.ADMIN ?? props?.name;
};

const countryFill = (item: object) =>
  countryName(item) === "Indonesia"
    ? "rgba(217,183,121,.78)"
    : "rgba(48,67,90,.34)";

export async function createGlobe(arcs: GlobeArc[]) {
  const [{ default: ThreeGlobe }, countries] = await Promise.all([
    import("three-globe"),
    loadCountries(),
  ]);

  const globe = new ThreeGlobe()
    .globeImageUrl(EARTH_TEXTURE_URL)
    .showAtmosphere(true).atmosphereColor("#8fa8c7").atmosphereAltitude(.13)
    .polygonsData(countries).polygonAltitude(.008)
    .polygonCapColor(countryFill).polygonSideColor(() => "rgba(0,0,0,0)")
    .polygonStrokeColor(() => "rgba(190,211,237,.52)")
    .arcsData(arcs).arcStartLat("startLat").arcStartLng("startLng")
    .arcEndLat("endLat").arcEndLng("endLng").arcAltitude("arcAlt")
    .arcColor("color").arcStroke(.45).arcDashLength(.42).arcDashGap(.3)
    .arcDashAnimateTime(1900).pointsData(HOME_POINT)
    .pointLat("lat").pointLng("lng").pointColor("color")
    .pointRadius("radius").pointAltitude(.018);

  const material = globe.globeMaterial() as MeshPhongMaterial;
  material.color.set("#0d1520");
  material.emissive.set("#050c14");
  material.emissiveIntensity = .42;
  material.shininess = 16;
  globe.rotation.set(.05, -1.78, 0);
  return globe;
}