import React, { useState } from 'react';
import { ActiveJourney, KnownPlace } from '../types';
import { Phone, MessageCircle, Navigation, MapPin, Heart, X, Check, ExternalLink } from 'lucide-react';
import { findNearestKnownPlace } from '../services/geolocation';
import { KNOWN_PLACES } from '../data/mockData';
import { CONTACTS_CONFIG, getWelbertCallLink, getWelbertWhatsAppLink, getWelbertSmsLink } from '../config/contacts';

interface LostModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeJourney: ActiveJourney | null;
  currentLat: number;
  currentLng: number;
  onTriggerSOSNotification: () => void;
  onSelectAnchorTrip: (place: KnownPlace) => void;
}

export const LostModal: React.FC<LostModalProps> = ({
  isOpen,
  onClose,
  activeJourney,
  currentLat,
  currentLng,
  onTriggerSOSNotification,
  onSelectAnchorTrip
}) => {
  const [sosSent, setSosSent] = useState(false);

  if (!isOpen) return null;

  const nearest = findNearestKnownPlace(currentLat, currentLng, KNOWN_PLACES);

  const formatSosMessage = () => {
    const nearestText = nearest
      ? `Estou perto de: ${nearest.place.name} (~${nearest.distanceMeters}m).`
      : '';
    const journeyText = activeJourney
      ? `Viagem: ${activeJourney.originName} -> ${activeJourney.destinationName} (Passo ${activeJourney.currentStepIndex + 1}/${activeJourney.totalSteps}).`
      : 'Sem viagem ativa.';

    return (
      `❤️ Oi amor, apertei o botão "Estou Perdida".\n` +
      `📍 Minha localização aproximada: https://maps.google.com/?q=${currentLat},${currentLng}\n` +
      `📌 ${nearestText}\n` +
      `🎯 ${journeyText}\n` +
      `Pode me ajudar por favor?`
    );
  };

  const handleSendWhatsApp = () => {
    onTriggerSOSNotification();
    setSosSent(true);
    window.open(getWelbertWhatsAppLink(formatSosMessage()), '_blank');
  };

  const handleCallWelbert = () => {
    onTriggerSOSNotification();
    window.location.href = getWelbertCallLink();
  };

  const handleSendSms = () => {
    onTriggerSOSNotification();
    window.location.href = getWelbertSmsLink(formatSosMessage());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-rose-200 flex flex-col">
        {/* Calming Top Banner */}
        <div className="bg-gradient-to-br from-rose-500 via-rose-600 to-indigo-600 p-6 text-white text-center relative rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-3 backdrop-blur-xs">
            <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Calma. Tô com você.</h2>
          <p className="text-rose-100 text-sm mt-1">
            Respire fundo. Vamos resolver isso passo a passo com calma.
          </p>
        </div>

        <div className="p-5 space-y-4">
          {/* Situation Snapshot */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Você está perto de um local conhecido:
                </span>
                {nearest ? (
                  <p className="text-base font-bold text-slate-900">
                    {nearest.place.name} ({nearest.distanceMeters}m de distância)
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-slate-900">Maceió - AL</p>
                )}
                {nearest && (
                  <p className="text-xs text-slate-600 mt-0.5">
                    Direção aproximada: <strong className="text-slate-800">{nearest.directionLabel}</strong>
                  </p>
                )}
              </div>
            </div>

            {activeJourney && (
              <div className="pt-2 border-t border-slate-200/70 text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Viagem em andamento: </span>
                {activeJourney.originName} ➔ <strong className="text-slate-900">{activeJourney.destinationName}</strong>
                <p className="mt-1 text-indigo-700 font-medium">
                  Passo {activeJourney.currentStepIndex + 1} de {activeJourney.totalSteps}
                </p>
              </div>
            )}
          </div>

          {/* Quick SOS Actions */}
          <div className="space-y-2.5">
            {/* Call Welbert */}
            <button
              onClick={handleCallWelbert}
              className="w-full py-4 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-base shadow-lg shadow-rose-600/25 flex items-center justify-center gap-3 transition-transform active:scale-[0.98]"
            >
              <Phone className="w-6 h-6 animate-bounce" />
              LIGAR PARA O WELBERT ({CONTACTS_CONFIG.welbert.phoneFormatted})
            </button>

            {/* WhatsApp with context */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2.5 transition-transform active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              {sosSent ? 'Mensagem Pronta! Abrir WhatsApp' : 'Avisar Welbert no WhatsApp com Minha Localização'}
            </button>

            {/* SMS / iMessage Native Fallback */}
            <button
              onClick={handleSendSms}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              💬 Enviar por Mensagem SMS / iMessage
            </button>
          </div>

          {/* Safe Anchor Recovery */}
          {nearest && (
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Rede de Segurança:
              </span>
              <button
                onClick={() => {
                  onSelectAnchorTrip(nearest.place);
                  onClose();
                }}
                className="w-full p-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-left flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-indigo-200 flex items-center justify-center text-lg">
                    {nearest.place.icon}
                  </div>
                  <div>
                    <p className="text-xs text-indigo-700 font-semibold">Ir para local conhecido mais próximo:</p>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-900">
                      {nearest.place.name}
                    </p>
                  </div>
                </div>
                <Navigation className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* External Map Fallback */}
          <div className="pt-1 text-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${currentLat},${currentLng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 underline decoration-slate-300"
            >
              Abrir ponto exato no Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-sm transition-colors"
          >
            Já me orientei, voltar para a viagem
          </button>
        </div>
      </div>
    </div>
  );
};
