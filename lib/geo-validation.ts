import { Point, Feature, Polygon } from "geojson";

// Cache for geocoding results to minimize API calls
const geocodeCache: Map<string, { lat: number; lng: number }> = new Map();

// Load the GeoJSON data from the public folder
async function loadGreaterLondonBoundary(): Promise<Feature<Polygon>> {
  try {
    const response = await fetch("/greater-london.geo.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading Greater London boundary:", error);
    throw new Error("Failed to load Greater London boundary data");
  }
}

// Point in polygon algorithm implementation
function isPointInPolygon(point: Point, polygon: Feature<Polygon>): boolean {
  const [longitude, latitude] = point.coordinates;
  const coordinates = polygon.geometry.coordinates[0];

  let inside = false;
  for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
    const [xi, yi] = coordinates[i];
    const [xj, yj] = coordinates[j];

    const intersect =
      yi > latitude !== yj > latitude &&
      longitude < ((xj - xi) * (latitude - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

// Function to geocode a UK postcode using postcodes.io (free service)
async function geocodePostcode(
  postcode: string
): Promise<{ lat: number; lng: number } | null> {
  // Remove spaces and convert to uppercase
  const cleanPostcode = postcode.replace(/\s+/g, "").toUpperCase();

  // Check cache first
  const cached = geocodeCache.get(cleanPostcode);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${cleanPostcode}`
    );
    const data = await response.json();

    if (!response.ok || !data.result) {
      return null;
    }

    const result = {
      lat: data.result.latitude,
      lng: data.result.longitude,
    };

    // Cache the result
    geocodeCache.set(cleanPostcode, result);

    return result;
  } catch (error) {
    console.error("Error geocoding postcode:", error);
    return null;
  }
}

// Additional boundaries for specific excluded areas
const EXCLUDED_AREAS: Feature<Polygon>[] = [];

// Main validation function
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
}> {
  try {
    // Basic postcode format validation
    const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
    if (!postcodeRegex.test(postcode)) {
      return {
        isServiceable: false,
        error: "Invalid postcode format",
      };
    }

    // Load Greater London boundary
    const greaterLondonBoundary = await loadGreaterLondonBoundary();

    // Geocode the postcode
    const coordinates = await geocodePostcode(postcode);
    if (!coordinates) {
      return {
        isServiceable: false,
        error: "Unable to geocode postcode",
      };
    }

    // Create GeoJSON point from coordinates
    const point: Point = {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    };

    // Check if point is in Greater London
    const isInGreaterLondon = isPointInPolygon(point, greaterLondonBoundary);

    if (!isInGreaterLondon) {
      return {
        isServiceable: false,
        coordinates,
        error: "Address is outside Greater London",
      };
    }

    // Check excluded areas if option is enabled
    if (options.checkExcludedAreas) {
      for (const excludedArea of EXCLUDED_AREAS) {
        if (isPointInPolygon(point, excludedArea)) {
          return {
            isServiceable: false,
            coordinates,
            error: "Address is in excluded area",
          };
        }
      }
    }

    return {
      isServiceable: true,
      coordinates,
    };
  } catch (error) {
    return {
      isServiceable: false,
      error: "Validation error occurred",
    };
  }
}

// Helper function to add custom excluded areas
export function addExcludedArea(area: Feature<Polygon>) {
  EXCLUDED_AREAS.push(area);
}

// Helper function to clear geocoding cache
export function clearGeocodeCache() {
  geocodeCache.clear();
}

// Types for custom area definitions
export interface ServiceAreaDefinition {
  name: string;
  polygon: Feature<Polygon>;
  isExcluded: boolean;
}

// Function to add multiple service area definitions
export function updateServiceAreas(areas: ServiceAreaDefinition[]) {
  // Clear existing excluded areas
  EXCLUDED_AREAS.length = 0;

  // Add new excluded areas
  areas
    .filter((area) => area.isExcluded)
    .forEach((area) => EXCLUDED_AREAS.push(area.polygon));
}
