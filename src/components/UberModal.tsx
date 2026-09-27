import React, { useState } from 'react';
import { KnownPlace } from '../types';
import { KNOWN_PLACES } from '../data/mockData';
import {
  Car,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  MapPin,
  Navigation,
  Copy,
  Check,
  Compass
} from 'lucide-react';
import {
  buildUberDeepLink,
  buildUberNativeSchemeLink,
  build99DeepLink,
  buildGoogleMapsRouteLink
} from '../services/uber';
import { findNearestKnownPlace } from '../services/geolocation';

interface UberModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlace?: KnownPlace | null;
  currentLat?: number;
  currentLng?: number;
}

export const UberModal: React.FC<UberModalProps> = ({
  isOpen,
  onClose,
  defaultPlace,
  currentLat = -9.5518,
  currentLng = -35.7289
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(
    defaultPlace ? defaultPlace.id : 'casa'
  );
  const [copied, setCopied] = useState(false);

  // Sync selectedPlaceId if defaultPlace changes
  React.useEffect(() => {
    if (defaultPlace) {
      setSelectedPlaceId(defaultPlace.id);
    }
  }, [defaultPlace]);

  if (!isOpen) return null;

  const currentPlace = KNOWN_PLACES.find((p) => p.id === selectedPlaceId) || KNOWN_PLACES[0];
  const nearestOrigin = findNearestKnownPlace(currentLat, currentLng, KNOWN_PLACES);

  const uberUniversalLink = buildUberDeepLink(currentPlace, currentLat, currentLng);
  const uberNativeScheme = buildUberNativeSchemeLink(currentPlace, currentLat, currentLng);
  const app99Link = build99DeepLink(currentPlace, currentLat, currentLng);
  const gmapsLink = buildGoogleMapsRouteLink(currentPlace, currentLat, currentLng);

  const handleCopyAddress = () => {
    const text = `${currentPlace.name} - ${currentPlace.address}, ${currentPlace.neighborhood}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-black via-slate-900 to-indigo-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Pedir Uber</h3>
              <p className="text-slate-300 text-xs">Origem GPS & Destino automático</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Automatic Origin Detection */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" />
                Ponto de Partida (Origem Automática):
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                GPS Ativo 📍
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900">
              Sua localização exata agora
            </p>
            <p className="text-[11px] text-slate-600">
              {nearestOrigin
                ? `Próximo a: ${nearestOrigin.place.name} (${nearestOrigin.place.neighborhood})`
                : 'Maceió - AL'}
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Coordenadas: {currentLat.toFixed(5)}, {currentLng.toFixed(5)}
            </p>
          </div>

          {/* Select Destination */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Escolha para onde você vai:
            </label>
            <select
              value={selectedPlaceId}
              onChange={(e) => setSelectedPlaceId(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-sm focus:ring-2 focus:ring-black outline-hidden"
            >
              {KNOWN_PLACES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Destination Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Destino Confirmado:
              </span>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="text-[11px] text-indigo-700 font-bold hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar Endereço'}
              </button>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <p className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                <span>{currentPlace.icon}</span> {currentPlace.name}
              </p>
              <p className="text-xs font-bold text-indigo-950">
                {currentPlace.address}
              </p>
              <p className="text-[11px] text-slate-600">
                {currentPlace.neighborhood}
              </p>
              {currentPlace.notes && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg mt-1 border border-amber-200">
                  💡 {currentPlace.notes}
                </p>
              )}
            </div>
          </div>

          {/* PRIMARY ACTION: DIRECT <a> TAG FOR NATIVE UBER ON IOS SAFARI */}
          <div className="space-y-2 pt-1">
            <a
              href={uberUniversalLink}
              target="_top"
              onClick={() => {
                setTimeout(onClose, 1000);
              }}
              className="w-full py-4 px-4 rounded-2xl bg-black hover:bg-slate-800 text-white font-black text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Car className="w-5 h-5 text-white" />
              ABRIR UBER COM ENDEREÇO PRONTO
              <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Native Scheme Fallback */}
              <a
                href={uberNativeScheme}
                target="_top"
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 text-center transition-colors"
              >
                App Direto (uber://)
              </a>

              {/* 99 App Fallback */}
              <a
                href={app99Link}
                target="_top"
                className="py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs flex items-center justify-center gap-1 text-center transition-colors"
              >
                🚕 Tentar no 99
              </a>
            </div>

            {/* Google Maps Route */}
            <a
              href={gmapsLink}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-indigo-200"
            >
              <Navigation className="w-3.5 h-3.5 text-indigo-600" />
              Ver trajeto no Google Maps
            </a>
          </div>

          <p className="text-[11px] text-center text-slate-500 leading-relaxed">
            Ao tocar no botão preto, o Uber abrirá automaticamente no seu celular com o seu ponto de partida e o endereço de destino já preenchidos.
          </p>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 py-1 px-4"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
