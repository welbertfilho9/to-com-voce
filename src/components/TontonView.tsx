import React, { useState } from 'react';
import { ActiveJourney, KnownPlace, PresetTrip } from '../types';
import { PRESET_TRIPS, KNOWN_PLACES } from '../data/mockData';
import { getSmartRoutineSuggestion } from '../services/routineEngine';
import {
  AlertOctagon,
  Compass,
  Car,
  CheckCircle2,
  ArrowRight,
  Shield,
  Heart,
  Navigation,
  Clock,
  MapPin,
  ChevronRight,
  Info,
  Sparkles,
  Smartphone,
  Plus,
  Trash2,
  ShieldAlert
} from 'lucide-react';
import { PlacesList } from './PlacesList';

interface TontonViewProps {
  activeJourney: ActiveJourney | null;
  allTrips: PresetTrip[];
  onStartTrip: (trip: PresetTrip, accompanied: boolean) => void;
  onAdvanceStep: () => void;
  onPreviousStep: () => void;
  onFinishTrip: () => void;
  onToggleAccompanied: () => void;
  onOpenLostModal: () => void;
  onOpenWhereAmI: () => void;
  onOpenPanicModal: () => void;
  onOpenUberModal: (place?: KnownPlace) => void;
  onOpenDecisionModal: () => void;
  onOpenCreateRoute: () => void;
  onDeleteRoute: (tripId: string) => void;
  currentLat: number;
  currentLng: number;
}

export const TontonView: React.FC<TontonViewProps> = ({
  activeJourney,
  allTrips,
  onStartTrip,
  onAdvanceStep,
  onPreviousStep,
  onFinishTrip,
  onToggleAccompanied,
  onOpenLostModal,
  onOpenWhereAmI,
  onOpenPanicModal,
  onOpenUberModal,
  onOpenDecisionModal,
  onOpenCreateRoute,
  onDeleteRoute,
  currentLat,
  currentLng
}) => {
  const [accompaniedChoice, setAccompaniedChoice] = useState(true);
  const routine = getSmartRoutineSuggestion();

  const currentTripPreset = activeJourney
    ? PRESET_TRIPS.find(t => t.id === activeJourney.tripId)
    : null;
  const currentStep = currentTripPreset
    ? currentTripPreset.steps[activeJourney!.currentStepIndex]
    : null;

  return (
    <div className="space-y-4 pb-16">
      {/* Top Emergency & Context Buttons */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onOpenLostModal}
            className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-md shadow-rose-600/25 flex flex-col items-center justify-center text-center transition-transform active:scale-[0.97]"
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-1">
              <AlertOctagon className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-wide">ESTOU PERDIDA</span>
            <span className="text-[10px] text-rose-100 font-medium">Avisar Welbert 🆘</span>
          </button>

          <button
            onClick={onOpenWhereAmI}
            className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-md shadow-indigo-600/25 flex flex-col items-center justify-center text-center transition-transform active:scale-[0.97]"
          >
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-1">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-sm tracking-wide">ONDE ESTOU?</span>
            <span className="text-[10px] text-indigo-100 font-medium">Bairro & Ponto 📍</span>
          </button>
        </div>

        {/* Botão do Pânico (Polícia 190) */}
        <button
          onClick={onOpenPanicModal}
          className="w-full py-2.5 px-4 rounded-2xl bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-extrabold text-xs tracking-wider shadow-md shadow-red-700/30 flex items-center justify-center gap-2 border border-red-500 transition-transform active:scale-[0.98]"
        >
          <ShieldAlert className="w-4 h-4 text-red-200 animate-pulse" />
          <span>🚨 BOTÃO DO PÂNICO: ACIONAR POLÍCIA (190)</span>
        </button>
      </div>

      {/* ================= ACTIVE JOURNEY MODE ================= */}
      {activeJourney && currentStep ? (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Top Active Trip Card */}
          <div className="bg-white rounded-3xl p-5 border border-indigo-200 shadow-md">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Viagem em Andamento
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                  {activeJourney.originName} ➔ {activeJourney.destinationName}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                Passo {activeJourney.currentStepIndex + 1} de {activeJourney.totalSteps}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden my-4">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((activeJourney.currentStepIndex + 1) / activeJourney.totalSteps) * 100}%`
                }}
              />
            </div>

            {/* WHAT TO DO RIGHT NOW (O QUE FAZER AGORA) */}
            <div className="bg-indigo-50/80 rounded-2xl p-5 border border-indigo-200/80 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-bold text-xs uppercase tracking-wide">
                  O que fazer agora:
                </span>
                {currentStep.estimatedMinutes && (
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    ~{currentStep.estimatedMinutes} min
                  </span>
                )}
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                {currentStep.title}
              </h3>

              <p className="text-base text-slate-800 font-medium leading-relaxed bg-white/90 p-4 rounded-xl border border-indigo-100">
                {currentStep.instruction}
              </p>

              {currentStep.warningNote && (
                <div className="p-3.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold flex items-start gap-2.5">
                  <span className="text-base">⚠️</span>
                  <span>{currentStep.warningNote}</span>
                </div>
              )}

              {currentStep.detail && (
                <p className="text-xs text-slate-600 italic">
                  💡 {currentStep.detail}
                </p>
              )}

              {/* Special Decision Button if step is a decision point */}
              {currentStep.type === 'decision' && (
                <button
                  onClick={onOpenDecisionModal}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  ESCOLHER PRÓXIMO DESTINO AQUI
                </button>
              )}
            </div>

            {/* Step Controls */}
            <div className="pt-4 space-y-2.5">
              {activeJourney.currentStepIndex < activeJourney.totalSteps - 1 ? (
                <button
                  onClick={onAdvanceStep}
                  className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-base shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                >
                  JÁ FIZ ISSO / PRÓXIMO PASSO
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={onFinishTrip}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  CHEGUEI AO DESTINO! ❤️
                </button>
              )}

              <div className="flex items-center justify-between pt-1">
                {activeJourney.currentStepIndex > 0 ? (
                  <button
                    onClick={onPreviousStep}
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium py-1 px-2"
                  >
                    ← Voltar passo anterior
                  </button>
                ) : <span />}

                <button
                  onClick={onFinishTrip}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold py-1 px-2"
                >
                  Cancelar viagem
                </button>
              </div>
            </div>

            {/* Accompany status toggle */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Heart className={`w-4 h-4 ${activeJourney.accompaniedByWelbert ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
                <span className="font-medium text-slate-700">
                  {activeJourney.accompaniedByWelbert ? 'Welbert acompanhando esta viagem' : 'Acompanhamento desligado'}
                </span>
              </div>
              <button
                onClick={onToggleAccompanied}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                {activeJourney.accompaniedByWelbert ? 'Desativar' : 'Ativar'}
              </button>
            </div>
          </div>

          {/* Quick Safe Uber launcher during trip */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="w-5 h-5 text-amber-400" />
              <div>
                <p className="font-bold text-sm">Cansou do ônibus?</p>
                <p className="text-xs text-slate-400">Peça um Uber seguro direto para o destino</p>
              </div>
            </div>
            <button
              onClick={() => onOpenUberModal()}
              className="py-2 px-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Pedir Uber
            </button>
          </div>
        </div>
      ) : (
        /* ================= IDLE MODE (ESCOLHER OU COMEÇAR VIAGEM) ================= */
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Smart Routine Card */}
          {routine && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-rose-600 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-xs tracking-wide uppercase">
                    {routine.timeContext}
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>

                <div>
                  <h2 className="text-2xl font-black">{routine.title}</h2>
                  <p className="text-indigo-100 text-sm mt-0.5">{routine.subtitle}</p>
                  <p className="text-indigo-200 text-xs mt-1 italic">{routine.reason}</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onStartTrip(routine.trip, accompaniedChoice)}
                    className="w-full py-4 px-5 rounded-2xl bg-white text-indigo-900 font-extrabold text-base shadow-lg hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    COMEÇAR VIAGEM ({routine.trip.originName} ➔ {routine.trip.destinationName})
                    <ArrowRight className="w-5 h-5 text-indigo-700" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Accompanied trip checkbox preference */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Modo Acompanhada</p>
                <p className="text-[11px] text-slate-500">Welbert poderá ver as etapas da viagem</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={accompaniedChoice}
                onChange={(e) => setAccompaniedChoice(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
          </div>

          {/* Frequent & Custom Journeys List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Rotas e Deslocamentos</h3>
                <p className="text-xs text-slate-500">Rotinas diárias e trajetos personalizados</p>
              </div>
              <button
                onClick={onOpenCreateRoute}
                className="py-1.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-indigo-200"
              >
                <Plus className="w-3.5 h-3.5" /> Criar Rota
              </button>
            </div>

            <div className="space-y-2.5">
              {allTrips.map((trip) => {
                const isCustom = trip.id.startsWith('custom_trip');

                return (
                  <div
                    key={trip.id}
                    className={`p-4 rounded-2xl bg-white border transition-all flex items-center justify-between gap-3 group ${
                      isCustom
                        ? 'border-indigo-300 bg-gradient-to-r from-indigo-50/40 via-white to-white shadow-xs'
                        : 'border-slate-200 hover:border-indigo-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isCustom
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
                        }`}
                      >
                        <Navigation className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                            {trip.name}
                          </h4>
                          {isCustom && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800">
                              Personalizada ✨
                            </span>
                          )}
                        </div>
                        {trip.routineHint && (
                          <p className="text-[11px] text-slate-500 mt-0.5">{trip.routineHint}</p>
                        )}
                        <p className="text-[11px] text-indigo-700 font-medium">
                          {trip.steps.length} etapas • ~{trip.estimatedTotalMinutes} min
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCustom && (
                        <button
                          onClick={() => onDeleteRoute(trip.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Excluir rota personalizada"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => onStartTrip(trip, accompaniedChoice)}
                        className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 shadow-xs flex items-center gap-1 active:scale-95 transition-all"
                      >
                        Iniciar
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Uber Direct Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Pedir Uber sem errar endereço</p>
                <p className="text-xs text-slate-400">Endereço confirmado e travado</p>
              </div>
            </div>
            <button
              onClick={() => onOpenUberModal()}
              className="py-2.5 px-4 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Abrir
            </button>
          </div>

          {/* Known Places Section */}
          <PlacesList
            currentLat={currentLat}
            currentLng={currentLng}
            onStartTripToPlace={(place) => {
              // Find trip with this destination or open uber
              const matchingTrip = PRESET_TRIPS.find(t => t.destinationId === place.id);
              if (matchingTrip) {
                onStartTrip(matchingTrip, accompaniedChoice);
              } else {
                onOpenUberModal(place);
              }
            }}
            onOpenUberForPlace={(place) => onOpenUberModal(place)}
          />

          {/* Apple Check In (Chegou Bem) Helpful Tip */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800">Dica nativa do seu iPhone 14:</p>
              <p className="mt-0.5 text-slate-600">
                Nas mensagens com o Welbert pelo iMessage, você pode usar o recurso nativo <strong>"Chegou Bem" (Check In)</strong>. Ele avisa automaticamente quando você chegar em casa sem gastar bateria!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
