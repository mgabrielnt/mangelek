import { COUNTRY_DATA_URL, type CountryFeature } from "./globe-config";

type CountryCollection = { features?: CountryFeature[] };

export async function loadCountries() {
  try {
    const response = await fetch(COUNTRY_DATA_URL, { cache: "force-cache" });
    if (!response.ok) return [];
    const data = await response.json() as CountryCollection;
    return Array.isArray(data.features) ? data.features : [];
  } catch {
    return [];
  }
}