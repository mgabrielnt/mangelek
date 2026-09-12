export const COUNTRY_DATA_URL =
  "https://raw.githubusercontent.com/vasturiano/three-globe/017a3a5d182b2413f403154d3eb3ed4af3e598ca/example/country-polygons/ne_110m_admin_0_countries.geojson";

export const EARTH_TEXTURE_URL =
  "https://cdn.jsdelivr.net/gh/vasturiano/three-globe@017a3a5d182b2413f403154d3eb3ed4af3e598ca/example/img/earth-dark.jpg";

export const HOME_POINT = [{
  lat: -6.21,
  lng: 106.85,
  color: "#d9b779",
  radius: 0.55,
}];

export type CountryFeature = {
  properties?: { name?: string };
  [key: string]: unknown;
};