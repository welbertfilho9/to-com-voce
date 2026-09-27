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
  Battery,
  AlertOctagon,
  ExternalLink,
  Sliders,
  Plus,
  Sparkles,
  ShieldAlert,
  ArrowUpRight,
  UserCheck
} from 'lucide-react';
import { findNearestKnownPlace } from '../services/geolocation';
import { KNOWN_PLACES } from '../data/mockData';
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-white font-extrabold text-xs animate-bounce shadow-lg shadow-red-600/30">
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>PÂNICO POLICIAL 190 ATIVO!</span>
          </div>
        );
      case 'sos':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-600 text-white font-bold text-xs animate-pulse shadow-sm shadow-rose-600/30">
            <AlertOctagon className="w-4 h-4" />
            <span>PEDIU AJUDA (SOS ATIVO)</span>
          </div>
        );
      case 'deviation':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500 text-white font-bold text-xs">
            <AlertTriangle className="w-4 h-4" />
            <span>POSSÍVEL DESVIO DE ROTA</span>
          </div>
        );
      case 'delay':
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500 text-slate-950 font-bold text-xs">
            <Clock className="w-4 h-4" />
            <span>POSSÍVEL PARADA / ATRASO</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ROTA NORMAL</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Welbert Telemetry Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-indigo-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">Painel do Welbert</h2>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono">
                  SP ↔ AL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Acompanhando <strong className="text-slate-200">{CONTACTS_CONFIG.antonella.name}</strong> em Maceió
              </p>
            </div>
          </div>

          <div className="self-start sm:self-auto">
            {getStatusBadge()}
          </div>
        </div>

        {/* POLICE PANIC 190 CRITICAL ALERT BOX */}
        {safetyStatus === 'police_panic' && (
          <div className="p-4 rounded-2xl bg-red-950/90 border-2 border-red-500 text-red-100 space-y-3 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-red-300 font-black text-sm">
              <ShieldAlert className="w-6 h-6 text-red-500 animate-bounce" />
              ALERTA CRÍTICO: PÂNICO POLICIAL ACIONADO POR ANTONELLA (190)
            </div>
            <p className="text-xs text-red-200 leading-relaxed font-medium">
              Antonella acionou o Botão de Pânico da Polícia Militar (190) em Maceió. Ela pode estar em perigo iminente.
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              <a
                href={getAntonellaCallLink()}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Phone className="w-4 h-4" /> Ligar para Antonella ({CONTACTS_CONFIG.antonella.phoneFormatted})
              </a>
              <a
                href={`https://maps.google.com/?q=${currentLat},${currentLng}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-white font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                <MapPin className="w-4 h-4 text-red-400" /> Ver Localização no Maps
              </a>
            </div>
          </div>
        )}

        {/* SOS Emergency Callout if triggered */}
        {safetyStatus === 'sos' && (
          <div className="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-100 space-y-3 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
              <AlertOctagon className="w-5 h-5 text-rose-500 animate-bounce" />
              ALERTA DE PEDIDO DE AJUDA DE ANTONELLA
            </div>
            <p className="text-xs text-rose-200 leading-relaxed">
              {telemetry.sosAlert?.message || 'Antonella tocou no botão de socorro "ESTOU PERDIDA" no aplicativo em Maceió.'}
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              <a
                href={getAntonellaCallLink()}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <Phone className="w-4 h-4" /> Ligar ({CONTACTS_CONFIG.antonella.phoneFormatted})
              </a>
              <a
                href={getAntonellaWhatsAppLink('Oi meu amor, vi seu alerta. Está tudo bem? Onde você está?')}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" /> Conversar no WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Active Journey Snapshot */}
        {activeJourney ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Trip details */}
              <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                    Viagem Atual
                  </span>
                  <span className="text-xs text-indigo-300 font-semibold">
                    Etapa {activeJourney.currentStepIndex + 1} de {activeJourney.totalSteps}
                  </span>
                </div>
                <p className="text-sm font-bold text-white">
                  {activeJourney.originName} ➔ {activeJourney.destinationName}
                </p>
                <p className="text-xs text-slate-400">
                  Início: {new Date(activeJourney.startedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* Location details */}
              <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 space-y-2">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Posição Conhecida
                </span>
                {nearest ? (
                  <>
                    <p className="text-sm font-bold text-white truncate">
                      Perto de: {nearest.place.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Distância: ~{nearest.distanceMeters}m · Rumo: {nearest.directionLabel}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-slate-400">Aguardando sinal GPS...</p>
                )}

                <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1.5">
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
            <div className="bg-indigo-950/30 border border-indigo-500/20 p-4 rounded-2xl space-y-1">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">
                O que ela está fazendo agora:
              </span>
              <p className="text-sm font-semibold text-slate-200">
                {activeJourney.destinationName} · Em deslocamento
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-800 text-center space-y-2">
            <UserCheck className="w-7 h-7 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-slate-200 text-sm">Nenhuma viagem em andamento</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Tonton está em repouso. O sistema respeita a privacidade dela e não realiza rastreamento quando não há viagem ativa.
            </p>
          </div>
        )}

        {/* Quick Contact Bar */}
        <div className="pt-2 grid grid-cols-2 gap-3">
          <a
            href={getAntonellaCallLink()}
            className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Ligar ({CONTACTS_CONFIG.antonella.phoneFormatted})</span>
          </a>
          <a
            href={getAntonellaWhatsAppLink('Oi amor! Como você está?')}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm shadow-emerald-900/30"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Route Builder Trigger for Welbert */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-white to-rose-50/90 rounded-3xl p-5 border border-indigo-200/70 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm tracking-tight">Criar Nova Rota para Antonella</h3>
            <p className="text-xs text-slate-500">Adicione pontos de ônibus, vans ou referências visuais</p>
          </div>
        </div>
        <button
          onClick={onOpenCreateRoute}
          className="py-2.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" /> Nova Rota
        </button>
      </div>

      {/* Test / Simulation Section for Welbert to evaluate UX & Scenarios */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
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

        <p className="text-xs text-slate-500 leading-relaxed">
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
      <div className="p-4 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-800 flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Privacidade & Respeito à Autonomia:</p>
          <p className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed">
            O compartilhamento de telemetria só acontece quando Tonton opta expressamente por iniciar uma viagem acompanhada ou aciona o botão de ajuda. Nenhuma coordenada é gravada em histórico permanente ou repassada a terceiros.
          </p>
        </div>
      </div>
    </div>
  );
};
