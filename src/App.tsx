import React, { useState, useEffect } from 'react';
import { UserRole, ActiveJourney, CompanionTelemetry, PresetTrip, KnownPlace } from './types';
import { KNOWN_PLACES, PRESET_TRIPS } from './data/mockData';
import {
  getStoredJourney,
  saveStoredJourney,
  getStoredTelemetry,
  saveStoredTelemetry,
  getAllTrips,
  saveCustomTrip,
  deleteCustomTrip
} from './services/storage';
import { Header } from './components/Header';
import { TontonView } from './components/TontonView';
import { WelbertView } from './components/WelbertView';
import { LostModal } from './components/LostModal';
import { WhereAmIModal } from './components/WhereAmIModal';
import { UberModal } from './components/UberModal';
import { DecisionPointModal } from './components/DecisionPointModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { CreateRouteModal } from './components/CreateRouteModal';
import { PanicPoliceModal } from './components/PanicPoliceModal';
import { findNearestKnownPlace } from './services/geolocation';

import { cloudSync } from './services/cloudSync';

export default function App() {
  const [role, setRole] = useState<UserRole>('tonton');
  const [activeJourney, setActiveJourney] = useState<ActiveJourney | null>(getStoredJourney);
  const [telemetry, setTelemetry] = useState<CompanionTelemetry>(getStoredTelemetry);
  const [allTrips, setAllTrips] = useState<PresetTrip[]>(getAllTrips);

  // Default coordinate in Maceió (near Terminal Benedito Bentes / UFAL)
  const [currentLat, setCurrentLat] = useState<number>(-9.5518);
  const [currentLng, setCurrentLng] = useState<number>(-35.7289);
  const [accuracy, setAccuracy] = useState<number>(18);

  // Modals
  const [lostModalOpen, setLostModalOpen] = useState(false);
  const [whereAmIOpen, setWhereAmIOpen] = useState(false);
  const [uberModalOpen, setUberModalOpen] = useState(false);
  const [selectedUberPlace, setSelectedUberPlace] = useState<KnownPlace | null>(null);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [createRouteModalOpen, setCreateRouteModalOpen] = useState(false);
  const [panicPoliceModalOpen, setPanicPoliceModalOpen] = useState(false);

  // Real GPS listener if allowed by device
  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setCurrentLat(pos.coords.latitude);
          setCurrentLng(pos.coords.longitude);
          setAccuracy(pos.coords.accuracy || 20);
        },
        (err) => {
          // Gracefully fallback to Maceió coordinates
          console.log('GPS default in Maceió used:', err.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Sync state changes across devices (Diadema <-> Maceió) via CloudSync + Local Storage
  useEffect(() => {
    const handleStorageChange = () => {
      setActiveJourney(getStoredJourney());
      setTelemetry(getStoredTelemetry());
    };
    window.addEventListener('storage', handleStorageChange);

    // 1. Subscribe to Cloud Real-Time Relay (instant push from Maceió to Diadema)
    const unsubscribeCloud = cloudSync.subscribe((incoming) => {
      if (incoming && typeof incoming === 'object') {
        setTelemetry((prev) => ({ ...prev, ...incoming }));
        if (incoming.activeJourney !== undefined) {
          setActiveJourney(incoming.activeJourney);
          saveStoredJourney(incoming.activeJourney);
        }
      }
    });

    // 2. Fetch latest telemetry state from cloud on boot
    cloudSync.fetchLatestTelemetry();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      unsubscribeCloud();
    };
  }, []);

  // Update telemetry helper
  const updateTelemetryWithJourney = (journey: ActiveJourney | null, sos = false) => {
    const nearest = findNearestKnownPlace(currentLat, currentLng, KNOWN_PLACES);
    const updated: CompanionTelemetry = {
      isSharing: journey ? journey.accompaniedByWelbert : false,
      activeJourney: journey,
      lastKnownLocation: {
        latitude: currentLat,
        longitude: currentLng,
        accuracy,
        updatedAt: new Date().toISOString(),
        nearestPlaceName: nearest ? nearest.place.name : 'Maceió - AL',
        distanceToNearestMeters: nearest ? nearest.distanceMeters : 0
      },
      sosAlert: sos
        ? {
            active: true,
            timestamp: new Date().toISOString(),
            message: 'Tonton acionou o botão ESTOU PERDIDA no aplicativo.',
            locationName: nearest ? nearest.place.name : 'Maceió',
            latitude: currentLat,
            longitude: currentLng
          }
        : telemetry.sosAlert,
      batteryLevel: telemetry.batteryLevel || 85
    };
    setTelemetry(updated);
    saveStoredTelemetry(updated);
  };

  const handleStartTrip = (trip: PresetTrip, accompanied: boolean) => {
    const newJourney: ActiveJourney = {
      id: `journey_${Date.now()}`,
      tripId: trip.id,
      tripName: trip.name,
      originName: trip.originName,
      destinationName: trip.destinationName,
      destinationAddress: '',
      destinationLat: 0,
      destinationLng: 0,
      currentStepIndex: 0,
      totalSteps: trip.steps.length,
      status: 'in_progress',
      safetyStatus: 'normal',
      startedAt: new Date().toISOString(),
      accompaniedByWelbert: accompanied,
      currentLocation: {
        latitude: currentLat,
        longitude: currentLng,
        accuracy,
        timestamp: Date.now()
      },
      lastUpdated: new Date().toISOString()
    };

    setActiveJourney(newJourney);
    saveStoredJourney(newJourney);
    updateTelemetryWithJourney(newJourney);
  };

  const handleAdvanceStep = () => {
    if (!activeJourney) return;
    const currentTrip = PRESET_TRIPS.find(t => t.id === activeJourney.tripId);
    if (!currentTrip) return;

    const nextIndex = activeJourney.currentStepIndex + 1;
    if (nextIndex < activeJourney.totalSteps) {
      // Check if next step is a decision point
      const nextStep = currentTrip.steps[nextIndex];
      const updated: ActiveJourney = {
        ...activeJourney,
        currentStepIndex: nextIndex,
        lastUpdated: new Date().toISOString()
      };
      setActiveJourney(updated);
      saveStoredJourney(updated);
      updateTelemetryWithJourney(updated);

      if (nextStep.type === 'decision') {
        setDecisionModalOpen(true);
      }
    } else {
      handleFinishTrip();
    }
  };

  const handlePreviousStep = () => {
    if (!activeJourney || activeJourney.currentStepIndex <= 0) return;
    const updated: ActiveJourney = {
      ...activeJourney,
      currentStepIndex: activeJourney.currentStepIndex - 1,
      lastUpdated: new Date().toISOString()
    };
    setActiveJourney(updated);
    saveStoredJourney(updated);
    updateTelemetryWithJourney(updated);
  };

  const handleFinishTrip = () => {
    setActiveJourney(null);
    saveStoredJourney(null);
    const updatedTelemetry: CompanionTelemetry = {
      ...telemetry,
      isSharing: false,
      activeJourney: null,
      sosAlert: null
    };
    setTelemetry(updatedTelemetry);
    saveStoredTelemetry(updatedTelemetry);
  };

  const handleToggleAccompanied = () => {
    if (!activeJourney) return;
    const updated: ActiveJourney = {
      ...activeJourney,
      accompaniedByWelbert: !activeJourney.accompaniedByWelbert,
      lastUpdated: new Date().toISOString()
    };
    setActiveJourney(updated);
    saveStoredJourney(updated);
    updateTelemetryWithJourney(updated);
  };

  const handleTriggerSOS = () => {
    if (activeJourney) {
      const updated: ActiveJourney = {
        ...activeJourney,
        safetyStatus: 'sos',
        lastUpdated: new Date().toISOString()
      };
      setActiveJourney(updated);
      saveStoredJourney(updated);
      updateTelemetryWithJourney(updated, true);
    } else {
      updateTelemetryWithJourney(null, true);
    }
  };

  const handleTriggerPolicePanic = () => {
    const nearest = findNearestKnownPlace(currentLat, currentLng, KNOWN_PLACES);
    if (activeJourney) {
      const updated: ActiveJourney = {
        ...activeJourney,
        safetyStatus: 'police_panic',
        lastUpdated: new Date().toISOString()
      };
      setActiveJourney(updated);
      saveStoredJourney(updated);
    }

    const updatedTelemetry: CompanionTelemetry = {
      ...telemetry,
      policePanicAlert: {
        active: true,
        timestamp: new Date().toISOString(),
        locationName: nearest ? nearest.place.name : 'Maceió - AL',
        latitude: currentLat,
        longitude: currentLng
      }
    };
    setTelemetry(updatedTelemetry);
    saveStoredTelemetry(updatedTelemetry);
  };

  // Companion Simulation tools for Welbert
  const handleSimulateStepAdvance = () => {
    if (!activeJourney) {
      // Auto-start first trip to allow testing
      handleStartTrip(PRESET_TRIPS[1], true);
      return;
    }
    handleAdvanceStep();
  };

  const handleSimulateDeviation = () => {
    if (!activeJourney) return;
    const updated: ActiveJourney = {
      ...activeJourney,
      safetyStatus: 'deviation',
      deviationWarning: 'Simulação: Ônibus parece estar seguindo no sentido oposto (indo em direção ao Eustáquio sem passar na UFAL).'
    };
    setActiveJourney(updated);
    saveStoredJourney(updated);
    updateTelemetryWithJourney(updated);
  };

  const handleSimulateSOS = () => {
    handleTriggerSOS();
    setLostModalOpen(true);
  };

  const handleSimulatePolicePanic = () => {
    handleTriggerPolicePanic();
  };

  const handleSimulateReset = () => {
    if (activeJourney) {
      const updated: ActiveJourney = {
        ...activeJourney,
        safetyStatus: 'normal',
        deviationWarning: undefined
      };
      setActiveJourney(updated);
      saveStoredJourney(updated);
      updateTelemetryWithJourney(updated);
    }
    const resetTelemetry: CompanionTelemetry = {
      ...telemetry,
      sosAlert: null,
      policePanicAlert: null
    };
    setTelemetry(resetTelemetry);
    saveStoredTelemetry(resetTelemetry);
  };

  const handleSaveCustomRoute = (newTrip: PresetTrip) => {
    saveCustomTrip(newTrip);
    setAllTrips(getAllTrips());
  };

  const handleDeleteCustomRoute = (tripId: string) => {
    deleteCustomTrip(tripId);
    setAllTrips(getAllTrips());
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        currentRole={role}
        onRoleChange={setRole}
        activeJourney={activeJourney}
        onOpenInstallGuide={() => setInstallModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4">
        {role === 'tonton' ? (
          <TontonView
            activeJourney={activeJourney}
            allTrips={allTrips}
            onStartTrip={handleStartTrip}
            onAdvanceStep={handleAdvanceStep}
            onPreviousStep={handlePreviousStep}
            onFinishTrip={handleFinishTrip}
            onToggleAccompanied={handleToggleAccompanied}
            onOpenLostModal={() => setLostModalOpen(true)}
            onOpenWhereAmI={() => setWhereAmIOpen(true)}
            onOpenPanicModal={() => setPanicPoliceModalOpen(true)}
            onOpenUberModal={(place) => {
              setSelectedUberPlace(place || null);
              setUberModalOpen(true);
            }}
            onOpenDecisionModal={() => setDecisionModalOpen(true)}
            onOpenCreateRoute={() => setCreateRouteModalOpen(true)}
            onDeleteRoute={handleDeleteCustomRoute}
            currentLat={currentLat}
            currentLng={currentLng}
          />
        ) : (
          <WelbertView
            telemetry={telemetry}
            activeJourney={activeJourney}
            onSimulateStepAdvance={handleSimulateStepAdvance}
            onSimulateDeviation={handleSimulateDeviation}
            onSimulateSOS={handleSimulateSOS}
            onSimulatePolicePanic={handleSimulatePolicePanic}
            onSimulateReset={handleSimulateReset}
            onOpenCreateRoute={() => setCreateRouteModalOpen(true)}
            currentLat={currentLat}
            currentLng={currentLng}
          />
        )}
      </main>

      {/* Emergency & Context Modals */}
      <LostModal
        isOpen={lostModalOpen}
        onClose={() => setLostModalOpen(false)}
        activeJourney={activeJourney}
        currentLat={currentLat}
        currentLng={currentLng}
        onTriggerSOSNotification={handleTriggerSOS}
        onSelectAnchorTrip={(place) => {
          const trip = PRESET_TRIPS.find(t => t.destinationId === place.id);
          if (trip) {
            handleStartTrip(trip, true);
          } else {
            setSelectedUberPlace(place);
            setUberModalOpen(true);
          }
        }}
      />

      <WhereAmIModal
        isOpen={whereAmIOpen}
        onClose={() => setWhereAmIOpen(false)}
        activeJourney={activeJourney}
        currentLat={currentLat}
        currentLng={currentLng}
        accuracy={accuracy}
      />

      <UberModal
        isOpen={uberModalOpen}
        onClose={() => setUberModalOpen(false)}
        defaultPlace={selectedUberPlace}
        currentLat={currentLat}
        currentLng={currentLng}
      />

      <DecisionPointModal
        isOpen={decisionModalOpen}
        onClose={() => setDecisionModalOpen(false)}
        onSelectTrip={(trip) => handleStartTrip(trip, true)}
      />

      {/* PWA iPhone 14 Installation Guide */}
      <InstallGuideModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
      />

      {/* Create Custom Route Modal */}
      <CreateRouteModal
        isOpen={createRouteModalOpen}
        onClose={() => setCreateRouteModalOpen(false)}
        onSaveRoute={handleSaveCustomRoute}
      />

      {/* Police 190 Panic Modal */}
      <PanicPoliceModal
        isOpen={panicPoliceModalOpen}
        onClose={() => setPanicPoliceModalOpen(false)}
        currentLat={currentLat}
        currentLng={currentLng}
        onTriggerPoliceAlert={handleTriggerPolicePanic}
      />
    </div>
  );
}
