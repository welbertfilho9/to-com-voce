import { KnownPlace } from '../types';

/**
 * Builds universal deep link for the Uber app.
 * Using https://m.uber.com/ul/ opens the installed native Uber app on iOS Safari directly,
 * or falls back cleanly to the web version if unavailable.
 */
export function buildUberDeepLink(place: KnownPlace): string {
  const formattedAddress = `${place.address}, ${place.neighborhood}`;
  const params = new URLSearchParams({
    action: 'setPickup',
    pickup: 'my_location',
    'dropoff[latitude]': place.latitude.toString(),
    'dropoff[longitude]': place.longitude.toString(),
    'dropoff[nickname]': place.shortName,
    'dropoff[formatted_address]': formattedAddress
  });

  return `https://m.uber.com/ul/?${params.toString()}`;
}

export function openUberWithVerification(place: KnownPlace): void {
  const url = buildUberDeepLink(place);
  window.open(url, '_blank', 'noopener,noreferrer');
}
