import React, { useState, useEffect } from 'react';
import { ActiveJourney, KnownPlace, PresetTrip } from '../types';
import { PRESET_TRIPS, KNOWN_PLACES } from '../data/mockData';
import { getSmartRoutineSuggestion } from '../services/routineEngine';
import {
  AlertOctagon,
  Compass,
  Car,
  CheckCircle2,
  ArrowRight,
  Heart,
  Navigation,
  Clock,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  ShieldAlert,
  Bus,
  Footprints,
  Eye
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
  const [activeTab, setActiveTab] = useState<'all' | 'daily' | 'leisure' | 'custom'>('all');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const routine = getSmartRoutineSuggestion();

  const currentTripPreset = activeJourney
    ? PRESET_TRIPS.find(t => t.id === activeJourney.tripId)
    : null;
  const currentStep = currentTripPreset
    ? currentTripPreset.steps[activeJourney!.currentStepIndex]
    : null;

  // Filter trips based on tab
  const filteredTrips = allTrips.filter(trip => {
    const isCustom = trip.id.startsWith('custom_trip');
    if (activeTab === 'custom') return isCustom;
    if (activeTab === 'daily') {
      return (
        trip.id === 'casa_orizon' ||
        trip.id === 'orizon_terminal' ||
        trip.id === 'terminal_ufal' ||
        trip.id === 'terminal_casa'
      );
    }
    if (activeTab === 'leisure') {
      return (
        trip.id === 'ufal_paripueira' ||
        trip.id === 'paripueira_casa'
      );
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Intimate Reassurance Banner */}
      <div className="bg-gradient-to-r from-rose-50/90 via-white to-indigo-50/90 rounded-3xl p-4 border border-rose-200/70 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm border border-rose-200/80 bg-rose-50 flex items-center justify-center">
              <img
                src="/logo.jpg"
                alt="Tô Com Você"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Calma, amor. Tô com você.
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Welbert conectado de Diadema · Maceió {currentTime || 'AL'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-semibold text-emerald-700">GPS Ativo</span>
        </div>
      </div>

      {/* Tactile Control Center (Quick Actions) */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2.5">
          {/* Estou Perdida */}
          <button
            onClick={onOpenLostModal}
            className="group relative p-4 rounded-3xl bg-gradient-to-b from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-[0.98] text-white shadow-md shadow-rose-600/20 flex flex-col items-start justify-between text-left transition-all duration-150 overflow-hidden"
          >
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
              <AlertOctagon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block font-extrabold text-sm tracking-tight leading-snug">
                ESTOU PERDIDA
              </span>
              <span className="block text-[11px] text-rose-100 font-medium mt-0.5">
                Socorro & Ligar pro Welbert
              </span>
            </div>
          </button>

          {/* Onde Estou */}
          <button
            onClick={onOpenWhereAmI}
            className="group relative p-4 rounded-3xl bg-gradient-to-b from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 active:scale-[0.98] text-white shadow-md shadow-indigo-600/20 flex flex-col items-start justify-between text-left transition-all duration-150 overflow-hidden"
          >
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="block font-extrabold text-sm tracking-tight leading-snug">
                ONDE ESTOU?
              </span>
              <span className="block text-[11px] text-indigo-100 font-medium mt-0.5">
                Bairro & Ponto de Referência
              </span>
            </div>
          </button>
        </div>

        {/* Quick Uber / 99 Bar */}
        <button
          onClick={() => onOpenUberModal()}
          className="w-full p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white shadow-md shadow-slate-900/15 flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-left min-w-0">
              <span className="block font-extrabold text-sm">Pedir Uber / 99</span>
              <span className="block text-xs text-slate-400">Origem GPS e destino já configurados</span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            Abrir App ➔
          </span>
        </button>

        {/* Botão do Pânico (Polícia 190) */}
        <button
          onClick={onOpenPanicModal}
          className="w-full py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-extrabold text-xs tracking-wider shadow-md shadow-red-600/25 flex items-center justify-center gap-2 transition-all border border-red-500"
        >
          <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
          <span>🚨 BOTÃO DO PÂNICO: ACIONAR POLÍCIA (190)</span>
        </button>
      </div>

      {/* ================= ACTIVE JOURNEY STEPPER ================= */}
      {activeJourney && currentStep ? (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 border border-indigo-200/80 shadow-md space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                  Viagem em Andamento
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                  <span className="truncate max-w-[130px]">{activeJourney.originName}</span>
                  <span className="text-indigo-400">➔</span>
                  <span className="truncate max-w-[130px]">{activeJourney.destinationName}</span>
                </h2>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  Passo {activeJourney.currentStepIndex + 1} de {activeJourney.totalSteps}
                </span>
              </div>
            </div>

            {/* Progress Track */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((activeJourney.currentStepIndex + 1) / activeJourney.totalSteps) * 100}%`
                }}
              />
            </div>

            {/* WHAT TO DO RIGHT NOW */}
            <div className="bg-indigo-50/70 rounded-2xl p-4 sm:p-5 border border-indigo-200/70 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                    O que fazer agora:
                  </span>
                </div>
                {currentStep.estimatedMinutes && (
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    ~{currentStep.estimatedMinutes} min
                  </span>
                )}
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 leading-snug tracking-tight">
                {currentStep.title}
              </h3>

              <div className="text-base text-slate-800 font-medium leading-relaxed bg-white/95 p-4 rounded-xl border border-indigo-100/80 shadow-xs">
                {currentStep.instruction}
              </div>

              {/* Window Landmark notice */}
              {currentStep.detail && (
                <div className="p-3 rounded-xl bg-indigo-100/60 border border-indigo-200/60 text-indigo-950 text-xs font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span><strong>Olhe pela janela:</strong> {currentStep.detail}</span>
                </div>
              )}

              {/* Warning box if any */}
              {currentStep.warningNote && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300/80 text-amber-900 text-xs font-semibold flex items-start gap-2.5">
                  <span className="text-base">⚠️</span>
                  <span>{currentStep.warningNote}</span>
                </div>
              )}

              {/* Special Decision Button */}
              {currentStep.type === 'decision' && (
                <button
                  onClick={onOpenDecisionModal}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  ESCOLHER PRÓXIMO DESTINO AQUI
                </button>
              )}
            </div>

            {/* Stepper Buttons */}
            <div className="pt-2 space-y-2">
              {activeJourney.currentStepIndex < activeJourney.totalSteps - 1 ? (
                <button
                  onClick={onAdvanceStep}
                  className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-extrabold text-base shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <span>JÁ FIZ ISSO · PRÓXIMO PASSO</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={onFinishTrip}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>CHEGUEI AO DESTINO! ❤️</span>
                </button>
              )}

              <div className="flex items-center justify-between px-1 pt-1">
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
                  Encerrar viagem
                </button>
              </div>
            </div>

            {/* Accompaniment status */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <Heart className={`w-4 h-4 ${activeJourney.accompaniedByWelbert ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
                <span className="font-medium text-slate-600">
                  {activeJourney.accompaniedByWelbert ? 'Welbert acompanhando esta rota' : 'Acompanhamento desligado'}
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

          {/* Quick Safe Uber launcher during active trip */}
          <div className="p-4 rounded-3xl bg-slate-900 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-400/20 flex items-center justify-center text-amber-400">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm">Cansou ou quer um carro?</p>
                <p className="text-[11px] text-slate-400">
                  Pedir Uber direto para {activeJourney.destinationName}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                const dest = KNOWN_PLACES.find(p => p.id === currentTripPreset?.destinationId);
                onOpenUberModal(dest);
              }}
              className="py-2 px-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 active:scale-[0.98] transition-all shrink-0"
            >
              Pedir Uber
            </button>
          </div>
        </div>
      ) : (
        /* ================= IDLE MODE (ROTAS & ROTINA INTELIGENTE) ================= */
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Smart Routine Card */}
          {routine && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-rose-600 text-white shadow-xl shadow-indigo-600/15 relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-xs tracking-wide uppercase">
                    {routine.timeContext}
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>

                <div>
                  <h2 className="text-2xl font-black tracking-tight">{routine.title}</h2>
                  <p className="text-indigo-100 text-sm mt-0.5">{routine.subtitle}</p>
                  <p className="text-indigo-200 text-xs mt-1 italic">{routine.reason}</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onStartTrip(routine.trip, accompaniedChoice)}
                    className="w-full py-4 px-5 rounded-2xl bg-white text-indigo-900 font-extrabold text-base shadow-lg hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>COMEÇAR VIAGEM ({routine.trip.originName} ➔ {routine.trip.destinationName})</span>
                    <ArrowRight className="w-5 h-5 text-indigo-700" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Accompanied trip preference card */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Acompanhamento pelo Welbert</p>
                <p className="text-[11px] text-slate-500">Ele poderá ver seu avanço a cada etapa em Diadema</p>
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

          {/* Rotas e Deslocamentos Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base tracking-tight">Rotas e Deslocamentos</h3>
                <p className="text-xs text-slate-500">Toque em qualquer trajeto para começar</p>
              </div>
              <button
                onClick={onOpenCreateRoute}
                className="py-1.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 active:scale-[0.98] text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-all border border-indigo-200/80 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Criar Rota
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="bg-slate-100/80 p-1 rounded-xl flex items-center gap-1 border border-slate-200/60 overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Todas ({allTrips.length})
              </button>
              <button
                onClick={() => setActiveTab('daily')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'daily'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Diárias (Trabalho/Casa (Clima Bom))
              </button>
              <button
                onClick={() => setActiveTab('leisure')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'leisure'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Shoppings & Lazer
              </button>
              <button
                onClick={() => setActiveTab('custom')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'custom'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Personalizadas ✨
              </button>
            </div>

            {/* Trips List */}
            <div className="space-y-2.5">
              {filteredTrips.map((trip) => {
                const isCustom = trip.id.startsWith('custom_trip');

                return (
                  <div
                    key={trip.id}
                    className={`p-4 rounded-3xl bg-white border transition-all flex items-center justify-between gap-3 group shadow-xs hover:shadow-sm ${
                      isCustom
                        ? 'border-indigo-300 bg-gradient-to-r from-indigo-50/30 via-white to-white'
                        : 'border-slate-200/90 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                          isCustom
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-indigo-50 border border-indigo-100 text-indigo-600'
                        }`}
                      >
                        {trip.id.includes('bus') || trip.steps.some(s => s.busLine) ? (
                          <Bus className="w-5 h-5" />
                        ) : (
                          <Navigation className="w-5 h-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">
                            {trip.name}
                          </h4>
                          {isCustom && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800 shrink-0">
                              Personalizada ✨
                            </span>
                          )}
                        </div>
                        {trip.routineHint && (
                          <p className="text-[11px] text-slate-500 mt-0.5 truncate">{trip.routineHint}</p>
                        )}
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-1">
                          <span className="text-indigo-700 font-semibold">{trip.steps.length} etapas</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            ~{trip.estimatedTotalMinutes} min
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCustom && (
                        <button
                          onClick={() => onDeleteRoute(trip.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Excluir rota personalizada"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => onStartTrip(trip, accompaniedChoice)}
                        className="py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-xs shadow-xs hover:shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                      >
                        <span>Iniciar</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredTrips.length === 0 && (
                <div className="p-8 rounded-3xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-700">Nenhuma rota encontrada nesta categoria.</p>
                  <p className="text-xs text-slate-500">Você pode criar uma rota personalizada agora mesmo!</p>
                  <button
                    onClick={onOpenCreateRoute}
                    className="mt-2 inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" /> Criar Rota
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reference places directory */}
          <PlacesList
            currentLat={currentLat}
            currentLng={currentLng}
            onStartTripToPlace={(place: KnownPlace) => {
              const trip = PRESET_TRIPS.find(t => t.destinationId === place.id);
              if (trip) {
                onStartTrip(trip, accompaniedChoice);
              } else {
                onOpenUberModal(place);
              }
            }}
            onOpenUberForPlace={(place: KnownPlace) => onOpenUberModal(place)}
          />
        </div>
      )}
    </div>
  );
};
