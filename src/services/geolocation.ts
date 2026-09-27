import { KNOWN_PLACES } from '../data/mockData';
import { KnownPlace } from '../types';

/**
 * Calculates distance between two coordinates in meters using the Haversine formula
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

/**
 * Calculates compass bearing from point 1 to point 2 in degrees (0 = North, 90 = East, 180 = South, 270 = West)
 */
export function calculateBearingDegrees(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);

  return ((θ * 180) / Math.PI + 360) % 360;
}

export function bearingToCardinal(deg: number): string {
  const points = ['Norte ⬆️', 'Nordeste ↗️', 'Leste ➡️', 'Sudeste ↘️', 'Sul ⬇️', 'Sudoeste ↙️', 'Oeste ⬅️', 'Noroeste ↖️'];
  const index = Math.round(deg / 45) % 8;
  return points[index];
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export interface NearestPlaceResult {
  place: KnownPlace;
  distanceMeters: number;
  bearing: number;
  directionLabel: string;
}

export function findNearestKnownPlace(
  lat: number,
  lng: number,
  places: KnownPlace[] = KNOWN_PLACES
): NearestPlaceResult | null {
  if (!places || places.length === 0) return null;

  let nearest: KnownPlace = places[0];
  let minDistance = calculateDistanceMeters(lat, lng, nearest.latitude, nearest.longitude);

  for (let i = 1; i < places.length; i++) {
    const p = places[i];
    const dist = calculateDistanceMeters(lat, lng, p.latitude, p.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = p;
    }
  }

  const bearing = calculateBearingDegrees(lat, lng, nearest.latitude, nearest.longitude);

  return {
    place: nearest,
    distanceMeters: minDistance,
    bearing,
    directionLabel: bearingToCardinal(bearing)
  };
}

export type DeviationStatus = 'normal' | 'check' | 'diverged';

export interface RouteDeviationAssessment {
  status: DeviationStatus;
  confidence: 'high' | 'medium' | 'low';
  message: string;
}

/**
 * Assesses potential route deviation gently without false alarm panic
 */
export function assessDeviation(
  currentLat: number,
  currentLng: number,
  targetLat: number,
  targetLng: number,
  expectedDistanceMeters: number,
  accuracyMeters: number
): RouteDeviationAssessment {
  const currentDist = calculateDistanceMeters(currentLat, currentLng, targetLat, targetLng);

  // If GPS accuracy is bad (> 60m), do not trigger alerts
  if (accuracyMeters > 70) {
    return {
      status: 'normal',
      confidence: 'low',
      message: 'Sinal GPS impreciso (em ambientes fechados ou nublado). Sem alertas.'
    };
  }

  // If moving farther than expected + tolerance
  if (currentDist > expectedDistanceMeters + 800) {
    return {
      status: 'diverged',
      confidence: 'medium',
      message: 'Parece que você está se afastando do destino. Respire fundo e verifique se o ônibus ou direção está correto.'
    };
  }

  if (currentDist > expectedDistanceMeters + 350) {
    return {
      status: 'check',
      confidence: 'medium',
      message: 'Verifique se você está caminhando na direção indicada.'
    };
  }

  return {
    status: 'normal',
    confidence: 'high',
    message: 'Tudo certo no trajeto.'
  };
}
