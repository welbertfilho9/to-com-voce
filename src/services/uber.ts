import { KnownPlace } from '../types';

/**
 * Builds universal deep link for the Uber app.
 * By including both pickup[latitude]/pickup[longitude] and dropoff[latitude]/dropoff[longitude],
 * Uber locks the user's real GPS position as origin and the exact validated address as destination.
 */
export function buildUberDeepLink(
  place: KnownPlace,
  userLat?: number,
  userLng?: number
): string {
  const formattedAddress = `${place.address}, ${place.neighborhood}`;
  const params = new URLSearchParams();

  params.set('action', 'setPickup');
  params.set('client_id', 'uber');

  // Origin (Automatic from current user GPS coordinates)
  if (userLat !== undefined && userLng !== undefined) {
    params.set('pickup[latitude]', userLat.toString());
    params.set('pickup[longitude]', userLng.toString());
    params.set('pickup[nickname]', 'Minha Localização Atual');
  }
  params.set('pickup', 'my_location');

  // Destination (Exact coordinates & address)
  params.set('dropoff[latitude]', place.latitude.toString());
  params.set('dropoff[longitude]', place.longitude.toString());
  params.set('dropoff[nickname]', place.name);
  params.set('dropoff[formatted_address]', formattedAddress);

  return `https://m.uber.com/ul/?${params.toString()}`;
}

/**
 * Native custom scheme url (uber://) for direct device app invocation
 */
export function buildUberNativeSchemeLink(
  place: KnownPlace,
  userLat?: number,
  userLng?: number
): string {
  const formattedAddress = `${place.address}, ${place.neighborhood}`;
  const params = new URLSearchParams();

  params.set('action', 'setPickup');
  if (userLat !== undefined && userLng !== undefined) {
    params.set('pickup[latitude]', userLat.toString());
    params.set('pickup[longitude]', userLng.toString());
  }
  params.set('pickup', 'my_location');

  params.set('dropoff[latitude]', place.latitude.toString());
  params.set('dropoff[longitude]', place.longitude.toString());
  params.set('dropoff[nickname]', place.name);
  params.set('dropoff[formatted_address]', formattedAddress);

  return `uber://?${params.toString()}`;
}

/**
 * Fallback to 99 app or Google Maps directions
 */
export function build99DeepLink(place: KnownPlace, userLat?: number, userLng?: number): string {
  if (userLat !== undefined && userLng !== undefined) {
    return `taxis99://call?startlat=${userLat}&startlng=${userLng}&endlat=${place.latitude}&endlng=${place.longitude}`;
  }
  return `taxis99://call?endlat=${place.latitude}&endlng=${place.longitude}`;
}

export function buildGoogleMapsRouteLink(place: KnownPlace, userLat?: number, userLng?: number): string {
  if (userLat !== undefined && userLng !== undefined) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${place.latitude},${place.longitude}&travelmode=driving`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}&travelmode=driving`;
}

export function openUberWithVerification(
  place: KnownPlace,
  userLat?: number,
  userLng?: number
): void {
  const url = buildUberDeepLink(place, userLat, userLng);
  // Setting window.location.href triggers iOS Universal Link handler directly to the native app,
  // avoiding Safari popup blocker.
  window.location.href = url;
}
