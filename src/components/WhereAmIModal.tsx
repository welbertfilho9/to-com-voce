import React, { useState } from 'react';
import { ActiveJourney } from '../types';
import { MapPin, Navigation, Compass, Share2, Check, X, ExternalLink } from 'lucide-react';
import { findNearestKnownPlace } from '../services/geolocation';
import { KNOWN_PLACES } from '../data/mockData';
import { getWelbertWhatsAppLink, CONTACTS_CONFIG } from '../config/contacts';

interface WhereAmIModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeJourney: ActiveJourney | null;
  currentLat: number;
  currentLng: number;
  accuracy: number;
}

export const WhereAmIModal: React.FC<WhereAmIModalProps> = ({
  isOpen,
  onClose,
  activeJourney,
  currentLat,
  currentLng,
  accuracy
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const nearest = findNearestKnownPlace(currentLat, currentLng, KNOWN_PLACES);

  const handleShareToWelbert = () => {
    const text =
      `📍 Onde estou agora:\n` +
      `${nearest ? `Perto de: ${nearest.place.name} (~${nearest.distanceMeters}m).\n` : ''}` +
      `${activeJourney ? `Viagem: ${activeJourney.originName} ➔ ${activeJourney.destinationName} (Passo ${activeJourney.currentStepIndex + 1}/${activeJourney.totalSteps})\n` : ''}` +
      `Coordenadas: https://maps.google.com/?q=${currentLat},${currentLng}`;

    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    const waUrl = getWelbertWhatsAppLink(text);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Onde estou?</h3>
              <p className="text-indigo-200 text-xs">Localização aproximada em tempo real</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Main location card */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                  Local conhecido mais próximo:
                </span>
                {nearest ? (
                  <>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                      {nearest.place.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Aproximadamente <strong className="text-slate-800">{nearest.distanceMeters} metros</strong> de distância.
                    </p>
                    <p className="text-xs text-slate-600">
                      Direção: <strong className="text-slate-800">{nearest.directionLabel}</strong>
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-slate-700">Maceió - AL</p>
                )}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-indigo-100/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>Precisão do GPS: ±{Math.round(accuracy)}m</span>
              <a
                href={`https://maps.google.com/?q=${currentLat},${currentLng}`}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 font-medium hover:underline flex items-center gap-1"
              >
                Ver mapa <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>

          {/* Active trip context */}
          {activeJourney && (
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs space-y-1">
              <span className="font-semibold text-slate-700 block">Viagem Atual:</span>
              <p className="text-slate-900 font-medium">
                {activeJourney.originName} ➔ {activeJourney.destinationName}
              </p>
              <p className="text-indigo-700 font-medium">
                Etapa {activeJourney.currentStepIndex + 1} de {activeJourney.totalSteps}
              </p>
            </div>
          )}

          {/* Share button */}
          <button
            onClick={handleShareToWelbert}
            className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                Copiado & Abrindo WhatsApp!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Mandar Situação pro Welbert no WhatsApp
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-xs transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
