export type UserRole = 'tonton' | 'welbert';

export type PlaceCategory = 'home' | 'work' | 'study' | 'transit' | 'shopping' | 'weekend' | 'family';

export interface KnownPlace {
  id: string;
  name: string;
  shortName: string;
  category: PlaceCategory;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
  notes?: string;
  icon: string;
}

export type StepType = 'walk' | 'bus' | 'van' | 'decision' | 'arrive';

export interface JourneyStep {
  id: string;
  stepNumber: number;
  type: StepType;
  title: string;
  instruction: string;
  detail: string;
  locationName: string;
  latitude?: number;
  longitude?: number;
  busLine?: string;
  busLineName?: string;
  busDirection?: string;
  targetPlatform?: string;
  warningNote?: string;
  estimatedMinutes: number;
  distanceMeters?: number;
  decisionOptions?: {
    id: string;
    label: string;
    targetTripId: string;
    icon: string;
  }[];
}

export interface PresetTrip {
  id: string;
  name: string;
  originId: string;
  destinationId: string;
  originName: string;
  destinationName: string;
  estimatedTotalMinutes: number;
  routineHint?: string;
  steps: JourneyStep[];
}

export type TripStatus = 'idle' | 'in_progress' | 'paused' | 'completed' | 'sos';

export type TripSafetyStatus = 'normal' | 'delay' | 'deviation' | 'sos' | 'police_panic';

export interface ActiveJourney {
  id: string;
  tripId: string;
  tripName: string;
  originName: string;
  destinationName: string;
  destinationAddress: string;
  destinationLat: number;
  destinationLng: number;
  currentStepIndex: number;
  totalSteps: number;
  status: TripStatus;
  safetyStatus: TripSafetyStatus;
  startedAt: string;
  accompaniedByWelbert: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
  };
  deviationWarning?: string;
  lastUpdated: string;
}

export interface CompanionTelemetry {
  isSharing: boolean;
  activeJourney: ActiveJourney | null;
  lastKnownLocation: {
    latitude: number;
    longitude: number;
    accuracy: number;
    updatedAt: string;
    nearestPlaceName: string;
    distanceToNearestMeters: number;
  } | null;
  sosAlert: {
    active: boolean;
    timestamp: string;
    message: string;
    locationName: string;
    latitude: number;
    longitude: number;
  } | null;
  policePanicAlert?: {
    active: boolean;
    timestamp: string;
    locationName: string;
    latitude: number;
    longitude: number;
  } | null;
  batteryLevel?: number;
}
