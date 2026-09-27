import React from 'react';
import {
  ShieldAlert,
  Phone,
  MapPin,
  X,
  AlertTriangle,
  ExternalLink,
  Share2,
  Check
} from 'lucide-react';
import { findNearestKnownPlace } from '../services/geolocation';
import { KNOWN_PLACES } from '../data/mockData';
import { CONTACTS_CONFIG } from '../config/contacts';

interface PanicPoliceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLat: number;
  currentLng: number;
  onTriggerPoliceAlert: () => void;
}

export const PanicPoliceModal: React.FC<PanicPoliceModalProps> = ({
  isOpen,
  onClose,
  currentLat,
  currentLng,
  onTriggerPoliceAlert
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const nearest = findNearestKnownPlace(currentLat, currentLng, KNOWN_PLACES);

  const handleCall190 = () => {
    onTriggerPoliceAlert();
    window.location.href = 'tel:190';
  };

  const handleCall180 = () => {
    onTriggerPoliceAlert();
    window.location.href = 'tel:180';
  };

  const emergencyMessage =
    `🚨 EMERGÊNCIA POLICIAL (MACEIÓ):\n` +
    `Estou em perigo e preciso de socorro imediato.\n` +
    `📍 Localização exata: https://maps.google.com/?q=${currentLat},${currentLng}\n` +
    `${nearest ? `Ponto de referência: Próximo a ${nearest.place.name} (~${nearest.distanceMeters}m).\n` : ''}` +
    `Coordenadas: ${currentLat.toFixed(5)}, ${currentLng.toFixed(5)}`;

  const handleCopyLocation = () => {
    navigator.clipboard?.writeText(emergencyMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-red-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border-2 border-red-500 overflow-hidden flex flex-col">
        {/* Urgent Emergency Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center animate-pulse">
              <ShieldAlert className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-black text-xl tracking-tight leading-tight">BOTÃO DE PÂNICO</h3>
              <p className="text-red-100 text-xs font-semibold">Acionamento Policial de Emergência</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Warning Banner */}
          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs font-semibold text-red-900">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <span>
              Use esta função se estiver em perigo imediato, ameaça ou emergência de segurança pública.
            </span>
          </div>

          {/* Primary Action: LIGAR 190 POLÍCIA MILITAR */}
          <button
            onClick={handleCall190}
            className="w-full py-4 px-5 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-lg shadow-xl shadow-red-600/35 flex items-center justify-center gap-3 transition-transform active:scale-[0.98] animate-bounce-subtle"
          >
            <Phone className="w-6 h-6 animate-pulse" />
            LIGAR 190 (POLÍCIA MILITAR)
          </button>

          {/* Secondary Action: 180 Central da Mulher */}
          <button
            onClick={handleCall180}
            className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Phone className="w-4 h-4" />
            LIGAR 180 (Central da Mulher / Ameaça)
          </button>

          {/* Location Script to Read to the Operator */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 space-y-2">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
              Diga ao atendente do 190:
            </span>

            <div className="bg-white p-3 rounded-xl border border-slate-200 text-slate-900 text-xs space-y-1 font-medium">
              <p>
                "Estou em Maceió, na região de <strong className="text-slate-950 font-bold">{nearest ? nearest.place.neighborhood : 'Maceió - AL'}</strong>."
              </p>
              {nearest && (
                <p>
                  "Ponto de referência mais próximo: <strong className="text-indigo-900 font-bold">{nearest.place.name}</strong> a cerca de {nearest.distanceMeters} metros."
                </p>
              )}
              <p className="text-[11px] text-slate-500 pt-1 font-mono">
                Coordenadas: {currentLat.toFixed(5)}, {currentLng.toFixed(5)}
              </p>
            </div>

            <button
              onClick={handleCopyLocation}
              className="w-full py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              {copied ? 'Endereço Copiado para Envio!' : 'Copiar Texto de Emergência com Coordenadas'}
            </button>
          </div>

          <p className="text-[11px] text-center text-slate-500">
            O discador nativo do seu iPhone será aberto imediatamente no 190. O Welbert também será notificado no painel dele de que o pânico policial foi acionado.
          </p>
        </div>

        {/* Cancel Button */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
          >
            Cancelar / Falso Alarme
          </button>
        </div>
      </div>
    </div>
  );
};
