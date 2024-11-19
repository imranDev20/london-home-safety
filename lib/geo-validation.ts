import { Point, Feature, Polygon, MultiPolygon, Position } from "geojson";

const geocodeCache: Map<string, { lat: number; lng: number }> = new Map();

async function loadLondonBoundaries(): Promise<
  Feature<Polygon | MultiPolygon>[]
> {
  try {
    const response = await fetch("/london-geo.json");
    const data = await response.json();
    return data.features;
  } catch (error) {
    console.error("Error loading London boundaries:", error);
    throw new Error("Failed to load London boundary data");
  }
}

function isPointInSimplePolygon(point: Position, polygon: Position[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const intersect =
      yi > point[1] !== yj > point[1] &&
      point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }
  return inside;
}

function isPointInPolygon(
  point: Point,
  feature: Feature<Polygon | MultiPolygon>
): boolean {
  const coordinates = point.coordinates;

  if (feature.geometry.type === "Polygon") {
    return isPointInSimplePolygon(coordinates, feature.geometry.coordinates[0]);
  } else {
    // For MultiPolygon, check if point is in any of the polygons
    return feature.geometry.coordinates.some((polygonCoords) =>
      isPointInSimplePolygon(coordinates, polygonCoords[0])
    );
  }
}

async function geocodePostcode(
  postcode: string
): Promise<{ lat: number; lng: number } | null> {
  const cleanPostcode = postcode.replace(/\s+/g, "").toUpperCase();

  const cached = geocodeCache.get(cleanPostcode);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${cleanPostcode}`
    );
    const data = await response.json();

    if (!response.ok || !data.result) return null;

    const result = {
      lat: data.result.latitude,
      lng: data.result.longitude,
    };

    geocodeCache.set(cleanPostcode, result);
    return result;
  } catch (error) {
    console.error("Error geocoding postcode:", error);
    return null;
  }
}

const EXCLUDED_AREAS: Feature<Polygon | MultiPolygon>[] = [];

export async function isAddressServiceable(
  postcode: string,
  options: {
    cacheResults?: boolean;
    checkExcludedAreas?: boolean;
  } = {}
): Promise<{
  isServiceable: boolean;
  coordinates?: { lat: number; lng: number };
  error?: string;
  borough?: string;
}> {
  try {
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!postcodeRegex.test(postcode)) {
      return { isServiceable: false, error: "Invalid postcode format" };
    }

    const londonBoundaries = await loadLondonBoundaries();
    const coordinates = await geocodePostcode(postcode);

    if (!coordinates) {
      return { isServiceable: false, error: "Unable to geocode postcode" };
    }

    const point: Point = {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    };

    let isInLondon = false;
    let borough: string | undefined;

    for (const boundary of londonBoundaries) {
      if (isPointInPolygon(point, boundary)) {
        isInLondon = true;
        borough = boundary.properties?.name;
        break;
      }
    }

    if (!isInLondon) {
      return {
        isServiceable: false,
        coordinates,
        error: "Address is outside London",
      };
    }

    if (options.checkExcludedAreas) {
      for (const excludedArea of EXCLUDED_AREAS) {
        if (isPointInPolygon(point, excludedArea)) {
          return {
            isServiceable: false,
            coordinates,
            error: "Address is in excluded area",
            borough,
          };
        }
      }
    }

    return {
      isServiceable: true,
      coordinates,
      borough,
    };
  } catch (error) {
    return {
      isServiceable: false,
      error: "Validation error occurred",
    };
  }
}

export function addExcludedArea(area: Feature<Polygon | MultiPolygon>) {
  EXCLUDED_AREAS.push(area);
}

export function clearGeocodeCache() {
  geocodeCache.clear();
}

export interface ServiceAreaDefinition {
  name: string;
  polygon: Feature<Polygon | MultiPolygon>;
  isExcluded: boolean;
}

export function updateServiceAreas(areas: ServiceAreaDefinition[]) {
  EXCLUDED_AREAS.length = 0;
  areas
    .filter((area) => area.isExcluded)
    .forEach((area) => EXCLUDED_AREAS.push(area.polygon));
}
