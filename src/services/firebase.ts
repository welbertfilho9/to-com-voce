import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  getDocFromServer,
  getDoc
} from 'firebase/firestore';
import { CompanionTelemetry } from '../types';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  projectId: firebaseConfigJson.projectId,
  appId: firebaseConfigJson.appId,
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId
};

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Target Firestore Database instance
export const db = getFirestore(
  app,
  firebaseConfigJson.firestoreDatabaseId || '(default)'
);

const TELEMETRY_DOC_ID = 'live';

/**
 * Validates connection to live Firestore database
 */
export async function validateFirestoreConnection(): Promise<boolean> {
  try {
    const testDoc = doc(db, 'test', 'connection');
    await getDocFromServer(testDoc);
    return true;
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.warn('Firestore offline notice. Retrying background sync...');
      return false;
    }
    // Document might not exist yet, which is expected and means connection succeeded
    return true;
  }
}

/**
 * Publishes live journey telemetry to Google Cloud Firestore.
 * Instantaneously updates across any mobile or desktop device in real-time.
 */
export async function saveTelemetryToCloud(telemetry: CompanionTelemetry): Promise<void> {
  try {
    const telemetryRef = doc(db, 'telemetry', TELEMETRY_DOC_ID);
    
    // Clean undefined fields to avoid Firestore payload rejections
    const cleanPayload = JSON.parse(JSON.stringify({
      ...telemetry,
      id: TELEMETRY_DOC_ID,
      lastUpdated: new Date().toISOString()
    }));

    await setDoc(telemetryRef, cleanPayload, { merge: true });
  } catch (err) {
    console.error('Failed to sync telemetry to Firebase Firestore:', err);
  }
}

/**
 * Subscribes to real-time live updates on the companion's device (Welbert in Diadema).
 * Uses Firestore's native WebSockets for instant, sub-second bi-directional synchronization.
 */
export function subscribeToLiveTelemetry(
  onUpdate: (telemetry: CompanionTelemetry) => void
): () => void {
  const telemetryRef = doc(db, 'telemetry', TELEMETRY_DOC_ID);

  const unsubscribe = onSnapshot(
    telemetryRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as CompanionTelemetry;
        onUpdate(data);
      }
    },
    (error) => {
      console.warn('Firestore real-time subscription warning:', error.message);
    }
  );

  return unsubscribe;
}

/**
 * Fetches the current live state from Firestore once (useful during page load/refresh)
 */
export async function fetchLiveTelemetryOnce(): Promise<CompanionTelemetry | null> {
  try {
    const telemetryRef = doc(db, 'telemetry', TELEMETRY_DOC_ID);
    const snap = await getDoc(telemetryRef);
    if (snap.exists()) {
      return snap.data() as CompanionTelemetry;
    }
    return null;
  } catch (err) {
    console.warn('Failed to fetch telemetry snapshot:', err);
    return null;
  }
}
