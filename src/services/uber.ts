import { KnownPlace } from '../types';

/**
 * Normalizes and formats full official postal address for GPS and ride-hailing apps.
 * Strips out conversational parenthesis and nicknames (like "(Casa)" or "(Clima Bom)")
 * ensuring Uber, 99 and Google Maps route directly to the exact street address and coordinates.
 */
export function getCleanFullAddress(place: KnownPlace): string {
  // Exact verified addresses matching Google Maps
  if (place.id === 'casa') {
    return 'R. Quinze, 101 - Clima Bom, Maceió - AL, 57063-505';
  }
  if (place.id === 'paripueira') {
    return 'R. do Angelim, 650, Paripueira - AL, 57935-000';
  }
  if (place.id === 'orizon') {
    return 'Ecoparque Maceió - Benedito Bentes, Maceió - AL';
  }
  if (place.id === 'terminal_bb') {
    return 'Av. Cachoeira do Meirim, s/n, Benedito Bentes, Maceió - AL, 57084-000';
  }
  if (place.id === 'ufal') {
    return 'Av. Lourival Melo Mota, s/n, Tabuleiro do Martins, Maceió - AL, 57072-900';
  }
  return `${place.address}, ${place.neighborhood}`;
}

/**
 * Returns a clean business/building name without informal notes or brackets
 */
export function getCleanPlaceTitle(place: KnownPlace): string {
  if (place.id === 'casa') return 'Casa (Clima Bom)';
  if (place.id === 'paripueira') return 'Paripueira';
  if (place.id === 'orizon') return 'Ecoparque Maceió';
  if (place.id === 'terminal_bb') return 'Terminal Integrado Benedito Bentes';
  if (place.id === 'ufal') return 'Universidade Federal de Alagoas (UFAL)';
  return place.name.replace(/\s*\([^)]*\)/g, '').trim();
}

export interface RideLocation {
  address: string;
  latitude: number;
  longitude: number;
  title: string;
  isCurrentGps?: boolean;
}

/**
 * Builds universal deep link for the Uber app.
 * Adheres to Uber's official URL specifications:
 * - pickup[latitude] & pickup[longitude]
 * - pickup[formatted_address]
 * - dropoff[latitude] & dropoff[longitude]
 * - dropoff[formatted_address]
 * - dropoff[nickname]
 */
export function buildUberDeepLink(
  destination: KnownPlace,
  originPlace?: KnownPlace | null,
  userLat?: number,
  userLng?: number
): string {
  const destAddress = getCleanFullAddress(destination);
  const destTitle = getCleanPlaceTitle(destination);
  const params = new URLSearchParams();

  params.set('action', 'setPickup');
  params.set('client_id', 'uber');

  // Origin Configuration
  if (originPlace && originPlace.id !== 'current_gps') {
    // Specific selected origin place
    const origAddress = getCleanFullAddress(originPlace);
    params.set('pickup[latitude]', originPlace.latitude.toString());
    params.set('pickup[longitude]', originPlace.longitude.toString());
    params.set('pickup[formatted_address]', origAddress);
    params.set('pickup[nickname]', getCleanPlaceTitle(originPlace));
  } else {
    // Automatic GPS location
    if (userLat !== undefined && userLng !== undefined) {
      params.set('pickup[latitude]', userLat.toString());
      params.set('pickup[longitude]', userLng.toString());
    }
    params.set('pickup', 'my_location');
  }

  // Destination Configuration (Exact verified street address)
  params.set('dropoff[latitude]', destination.latitude.toString());
  params.set('dropoff[longitude]', destination.longitude.toString());
  params.set('dropoff[formatted_address]', destAddress);
  params.set('dropoff[nickname]', destTitle);

  return `https://m.uber.com/ul/?${params.toString()}`;
}

/**
 * Native custom scheme link (uber://)
 */
export function buildUberNativeSchemeLink(
  destination: KnownPlace,
  originPlace?: KnownPlace | null,
  userLat?: number,
  userLng?: number
): string {
  const destAddress = getCleanFullAddress(destination);
  const destTitle = getCleanPlaceTitle(destination);
  const params = new URLSearchParams();

  params.set('action', 'setPickup');

  if (originPlace && originPlace.id !== 'current_gps') {
    params.set('pickup[latitude]', originPlace.latitude.toString());
    params.set('pickup[longitude]', originPlace.longitude.toString());
    params.set('pickup[formatted_address]', getCleanFullAddress(originPlace));
  } else {
    if (userLat !== undefined && userLng !== undefined) {
      params.set('pickup[latitude]', userLat.toString());
      params.set('pickup[longitude]', userLng.toString());
    }
    params.set('pickup', 'my_location');
  }

  params.set('dropoff[latitude]', destination.latitude.toString());
  params.set('dropoff[longitude]', destination.longitude.toString());
  params.set('dropoff[formatted_address]', destAddress);
  params.set('dropoff[nickname]', destTitle);

  return `uber://?${params.toString()}`;
}

/**
 * Builds 99 deep links and fallbacks.
 * Uses 99/DiDi passenger URI schemes and web fallbacks.
 */
export function build99DeepLink(
  destination: KnownPlace,
  userLat?: number,
  userLng?: number
): string {
  const destAddress = encodeURIComponent(getCleanFullAddress(destination));
  
  if (userLat !== undefined && userLng !== undefined) {
    // DiDi / 99 deep link format
    return `didiPassenger://ride?pickup_lat=${userLat}&pickup_lon=${userLng}&dropoff_lat=${destination.latitude}&dropoff_lon=${destination.longitude}&dropoff_name=${destAddress}`;
  }
  return `taxis99://call?endlat=${destination.latitude}&endlng=${destination.longitude}&endname=${destAddress}`;
}

/**
 * Google Maps Directions Link with exact coordinates and driving mode
 */
export function buildGoogleMapsRouteLink(
  destination: KnownPlace,
  originPlace?: KnownPlace | null,
  userLat?: number,
  userLng?: number
): string {
  const destCoord = `${destination.latitude},${destination.longitude}`;
  if (originPlace && originPlace.id !== 'current_gps') {
    const origCoord = `${originPlace.latitude},${originPlace.longitude}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origCoord}&destination=${destCoord}&travelmode=driving`;
  }
  if (userLat !== undefined && userLng !== undefined) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destCoord}&travelmode=driving`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${destCoord}&travelmode=driving`;
}

/**
 * Waze Navigation Link directly to destination coordinates
 */
export function buildWazeLink(destination: KnownPlace): string {
  return `https://waze.com/ul?ll=${destination.latitude},${destination.longitude}&navigate=yes`;
}
