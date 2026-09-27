import React, { useState } from 'react';
import { ActiveJourney, CompanionTelemetry } from '../types';
import {
  Heart,
  ShieldCheck,
  AlertTriangle,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Compass,
  Battery,
  AlertOctagon,
  RefreshCw,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Plus,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { findNearestKnownPlace } from '../services/geolocation';
import { KNOWN_PLACES, PRESET_TRIPS } from '../data/mockData';
import { CONTACTS_CONFIG, getAntonellaCallLink, getAntonellaWhatsAppLink } from '../config/contacts';

interface WelbertViewProps {
  telemetry: CompanionTelemetry;
  activeJourney: ActiveJourney | null;
  onSimulateStepAdvance: () => void;
  onSimulateDeviation: () => void;
  onSimulateSOS: () => void;
  onSimulatePolicePanic: () => void;
  onSimulateReset: () => void;
  onOpenCreateRoute: () => void;
  currentLat: number;
  currentLng: number;
}

export const WelbertView: React.FC<WelbertViewProps> = ({
  telemetry,
  activeJourney,
  onSimulateStepAdvance,
  onSimulateDeviation,
  onSimulateSOS,
  onSimulatePolicePanic,
  onSimulateReset,
  onOpenCreateRoute,
  currentLat,
  currentLng
}) => {
  const [showSimControls, setShowSimControls] = useState(false);
  const nearest = findNearestKnownPlace(currentLat, currentLng, KNOWN_PLACES);

  // Status mapping
  const safetyStatus = activeJourney?.safetyStatus || (telemetry.sosAlert?.active ? 'sos' : 'normal');

  const getStatusBadge = () => {
    switch (safetyStatus) {
      case 'police_panic':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white font-black text-xs animate-bounce shadow-lg shadow-red-600/40">
            <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
            🚨 PÂNICO POLICIAL 190 ATIVO!
          </div>
        );
      case 'sos':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-600 text-white font-bold text-xs animate-pulse">
            <AlertOctagon className="w-4 h-4" />
            🔴 PEDIU AJUDA (SOS ATIVO)
          </div>
        );
      case 'deviation':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500 text-white font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            🟠 POSSÍVEL DESVIO DE ROTA
          </div>
        );
      case 'delay':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500 text-slate-900 font-bold text-xs">
            <Clock className="w-4 h-4" />
            🟡 POSSÍVEL PARADA / ATRASO
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-600 text-white font-bold text-xs">
            <ShieldCheck className="w-4 h-4" />
            🟢 DENTRO DA ROTA NORMAL
          </div>
        );
    }
  };

  return (
    <div className="space-y-5 pb-16">
      {/* Top Welbert Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">Painel do Welbert</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  SP ↔ AL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Acompanhando deslocamento de <strong className="text-slate-200">{CONTACTS_CONFIG.antonella.name} ({CONTACTS_CONFIG.antonella.nickname})</strong> em Maceió
              </p>
            </div>
          </div>

          <div className="text-right">
            {getStatusBadge()}
          </div>
        </div>

        {/* POLICE PANIC 190 CRITICAL ALERT BOX */}
        {safetyStatus === 'police_panic' && (
          <div className="mt-4 p-4 rounded-2xl bg-red-950 border-2 border-red-500 text-red-100 space-y-2 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-red-400 font-black text-sm">
              <ShieldAlert className="w-6 h-6 text-red-500 animate-bounce" />
              ALERTA CRÍTICO: PÂNICO POLICIAL ACIONADO POR ANTONELLA (190)
            </div>
            <p className="text-xs text-red-200 font-medium">
              Antonella acionou o Botão de Pânico da Polícia Militar (190) em Maceió. Ela pode estar em perigo ou ameaça iminente.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={getAntonellaCallLink()}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Phone className="w-4 h-4" /> Ligar para Antonella ({CONTACTS_CONFIG.antonella.phoneFormatted})
              </a>
              <a
                href={`https://maps.google.com/?q=${currentLat},${currentLng}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <MapPin className="w-4 h-4 text-red-400" /> Ver Localização no Maps
              </a>
            </div>
          </div>
        )}

        {/* SOS Emergency Callout if triggered */}
        {safetyStatus === 'sos' && (
          <div className="mt-4 p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-100 space-y-2 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertOctagon className="w-5 h-5 text-rose-500 animate-bounce" />
              ALERTA DE PEDIDO DE AJUDA DE ANTONELLA
            </div>
            <p className="text-xs text-rose-200">
              {telemetry.sosAlert?.message || 'Antonella tocou no botão de socorro "ESTOU PERDIDA" no aplicativo.'}
            </p>
            <div className="pt-2 flex gap-2">
              <a
                href={getAntonellaCallLink()}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <Phone className="w-4 h-4" /> Ligar ({CONTACTS_CONFIG.antonella.phoneFormatted})
              </a>
              <a
                href={getAntonellaWhatsAppLink('Oi meu amor, vi seu alerta. Está tudo bem? Onde você está?')}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Active Journey Snapshot */}
        {activeJourney ? (
          <div className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Trip details */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  Viagem Atual
                </span>
                <p className="text-base font-bold text-white">
                  {activeJourney.originName} ➔ {activeJourney.destinationName}
                </p>
                <p className="text-xs text-indigo-300 mt-1 font-medium">
                  Etapa {activeJourney.currentStepIndex + 1} de {activeJourney.totalSteps}
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Início: {new Date(activeJourney.startedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* Location details */}
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Posição Conhecida
                </span>
                {nearest ? (
                  <>
                    <p className="text-sm font-bold text-white">
                      Perto de: {nearest.place.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Distância estimada: ~{nearest.distanceMeters}m
                    </p>
                    <p className="text-xs text-slate-400">
                      Rumo: {nearest.directionLabel}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-400">Aguardando sinal GPS</p>
                )}

                <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                    iPhone ~{telemetry.batteryLevel || 85}%
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${currentLat},${currentLng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
                  >
                    Ver no Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Current Step Plain Text */}
            <div className="bg-indigo-950/40 border border-indigo-500/30 p-4 rounded-2xl">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide block mb-1">
                O que ela está fazendo agora:
              </span>
              <p className="text-sm font-semibold text-slate-200">
                {PRESET_TRIPS.find(t => t.id === activeJourney.tripId)?.steps[activeJourney.currentStepIndex]?.title || 'Em deslocamento'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {PRESET_TRIPS.find(t => t.id === activeJourney.tripId)?.steps[activeJourney.currentStepIndex]?.instruction}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 p-6 rounded-2xl bg-slate-800/50 border border-slate-800 text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="font-bold text-slate-300 text-sm">Nenhuma viagem em andamento</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tonton não iniciou um trajeto neste momento. O sistema respeita a privacidade dela e não realiza rastreamento quando ela está em repouso.
            </p>
          </div>
        )}

        {/* Quick Contact Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
          <a
            href={getAntonellaCallLink()}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            Ligar para Antonella ({CONTACTS_CONFIG.antonella.phoneFormatted})
          </a>
          <a
            href={getAntonellaWhatsAppLink('Oi amor! Como você está?')}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            Conversar no WhatsApp
          </a>
        </div>
      </div>

      {/* Route Builder Trigger for Welbert */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-rose-50 rounded-3xl p-5 border border-indigo-200 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Criar Rota para Antonella</h3>
            <p className="text-xs text-slate-600">Configure um trajeto passo a passo com ônibus, vans ou caminhada</p>
          </div>
        </div>
        <button
          onClick={onOpenCreateRoute}
          className="py-2 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Nova Rota
        </button>
      </div>

      {/* Test / Simulation Section for Welbert to evaluate UX & Scenarios */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Simulador de Cenários em Maceió</h3>
          </div>
          <button
            onClick={() => setShowSimControls(!showSimControls)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            {showSimControls ? 'Ocultar' : 'Exibir Controles'}
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Use estes botões para testar o comportamento do copiloto, alertas de desvio e pedido de socorro como se Tonton estivesse se deslocando em Maceió.
        </p>

        {showSimControls && (
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-5 gap-2 animate-in fade-in duration-150">
            <button
              onClick={onSimulateStepAdvance}
              className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-200 text-center transition-colors"
            >
              ⏭️ Avançar Etapa
            </button>
            <button
              onClick={onSimulateDeviation}
              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 text-center transition-colors"
            >
              ⚠️ Simular Desvio
            </button>
            <button
              onClick={onSimulateSOS}
              className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 text-center transition-colors"
            >
              🆘 Simular SOS
            </button>
            <button
              onClick={onSimulatePolicePanic}
              className="p-2.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-900 font-bold text-xs border border-red-300 text-center transition-colors"
            >
              🚨 Simular 190
            </button>
            <button
              onClick={onSimulateReset}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 text-center transition-colors"
            >
              🔄 Resetar
            </button>
          </div>
        )}
      </div>

      {/* Privacy Guarantee Note */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Política de Privacidade & Respeito à Autonomia:</p>
          <p className="text-[11px] text-emerald-700 mt-0.5">
            O compartilhamento de telemetria só acontece quando Tonton opta expressamente por iniciar uma viagem acompanhada ou aciona o botão de ajuda. Nenhuma coordenada é gravada em histórico permanente ou repassada a terceiros.
          </p>
        </div>
      </div>
    </div>
  );
};
