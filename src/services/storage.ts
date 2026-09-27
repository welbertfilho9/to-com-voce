import { ActiveJourney, CompanionTelemetry, PresetTrip } from '../types';
import { PRESET_TRIPS } from '../data/mockData';

const STORAGE_KEY_JOURNEY = 'estou_com_voce_active_journey';
const STORAGE_KEY_TELEMETRY = 'estou_com_voce_telemetry';
const STORAGE_KEY_ROLE = 'estou_com_voce_role';
const STORAGE_KEY_CUSTOM_ROUTES = 'estou_com_voce_custom_routes';

export function getCustomTrips(): PresetTrip[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_ROUTES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomTrip(newTrip: PresetTrip): PresetTrip[] {
  try {
    const current = getCustomTrips();
    const existingIndex = current.findIndex(t => t.id === newTrip.id);
    let updated: PresetTrip[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = newTrip;
    } else {
      updated = [newTrip, ...current];
    }
    localStorage.setItem(STORAGE_KEY_CUSTOM_ROUTES, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return updated;
  } catch (err) {
    console.warn('Error saving custom trip:', err);
    return getCustomTrips();
  }
}

export function deleteCustomTrip(tripId: string): PresetTrip[] {
  try {
    const current = getCustomTrips();
    const updated = current.filter(t => t.id !== tripId);
    localStorage.setItem(STORAGE_KEY_CUSTOM_ROUTES, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    return updated;
  } catch (err) {
    console.warn('Error deleting custom trip:', err);
    return getCustomTrips();
  }
}

export function getAllTrips(): PresetTrip[] {
  const custom = getCustomTrips();
  return [...custom, ...PRESET_TRIPS];
}

export function getStoredJourney(): ActiveJourney | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_JOURNEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveStoredJourney(journey: ActiveJourney | null): void {
  try {
    if (!journey) {
      localStorage.removeItem(STORAGE_KEY_JOURNEY);
    } else {
      localStorage.setItem(STORAGE_KEY_JOURNEY, JSON.stringify(journey));
    }
    // Also notify across tabs or panels
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.warn('Storage write error (low device disk space):', err);
  }
}

export function getStoredTelemetry(): CompanionTelemetry {
  const defaults: CompanionTelemetry = {
    isSharing: false,
    activeJourney: null,
    lastKnownLocation: null,
    sosAlert: null,
    batteryLevel: 85
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_TELEMETRY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

export function saveStoredTelemetry(telemetry: CompanionTelemetry): void {
  try {
    // 1. Push to Google Cloud Firestore (Instant cross-device real-time sync)
    import('./firebase').then(({ saveTelemetryToCloud }) => {
      saveTelemetryToCloud(telemetry);
    }).catch((err) => {
      console.warn('Firebase sync error:', err);
    });

    // 2. Push to global real-time cloud relay as secondary redundancy
    import('./cloudSync').then(({ cloudSync }) => {
      cloudSync.publishTelemetry(telemetry);
    }).catch(() => {});
  } catch (err) {
    console.warn('Storage write error for telemetry:', err);
  }
}

/**
 * Fetches latest remote telemetry from cloud server
 */
export async function fetchRemoteTelemetry(): Promise<CompanionTelemetry | null> {
  try {
    const res = await fetch('/api/telemetry');
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

/**
 * Calculates current local storage bytes to prove minimum footprint for iPhone 14
 */
export function getLocalStorageFootprintKB(): number {
  try {
    let totalBytes = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalBytes += (localStorage[key].length + key.length) * 2;
      }
    }
    return Math.round((totalBytes / 1024) * 10) / 10;
  } catch {
    return 0.5;
  }
}
