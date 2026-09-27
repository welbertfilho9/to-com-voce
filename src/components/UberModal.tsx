import React, { useState } from 'react';
import { KnownPlace } from '../types';
import { KNOWN_PLACES } from '../data/mockData';
import {
  Car,
  X,
  ExternalLink,
  MapPin,
  Navigation,
  Copy,
  Check,
  Compass,
  ArrowUpDown,
  Smartphone
} from 'lucide-react';
import {
  buildUberDeepLink,
  buildUberNativeSchemeLink,
  build99DeepLink,
  buildGoogleMapsRouteLink,
  buildWazeLink,
  getCleanFullAddress,
  getCleanPlaceTitle
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
  currentLat = -9.5772,
  currentLng = -35.7725
}) => {
  // Origin can be GPS location or a known place
  const [originMode, setOriginMode] = useState<'gps' | string>('gps');
  
  // Destination
  const [selectedDestId, setSelectedDestId] = useState<string>(
    defaultPlace ? defaultPlace.id : 'orizon'
  );
  
  const [copiedDest, setCopiedDest] = useState(false);
  const [copiedFor99, setCopiedFor99] = useState(false);

  // Sync selected destination if defaultPlace changes
  React.useEffect(() => {
    if (defaultPlace) {
      setSelectedDestId(defaultPlace.id);
    }
  }, [defaultPlace]);

  if (!isOpen) return null;

  const destinationPlace = KNOWN_PLACES.find((p) => p.id === selectedDestId) || KNOWN_PLACES[1];
  const originPlace = originMode === 'gps' ? null : KNOWN_PLACES.find((p) => p.id === originMode) || null;
  const nearestPlace = findNearestKnownPlace(currentLat, currentLng, KNOWN_PLACES);

  // Clean full addresses for the ride apps
  const destCleanAddress = getCleanFullAddress(destinationPlace);
  const destCleanTitle = getCleanPlaceTitle(destinationPlace);
  
  const originCleanAddress = originPlace 
    ? getCleanFullAddress(originPlace) 
    : (nearestPlace ? `${nearestPlace.place.address}, ${nearestPlace.place.neighborhood}` : 'Maceió - AL');

  // Deep links
  const uberUniversalLink = buildUberDeepLink(destinationPlace, originPlace, currentLat, currentLng);
  const uberNativeScheme = buildUberNativeSchemeLink(destinationPlace, originPlace, currentLat, currentLng);
  const app99Link = build99DeepLink(destinationPlace, currentLat, currentLng);
  const gmapsLink = buildGoogleMapsRouteLink(destinationPlace, originPlace, currentLat, currentLng);
  const wazeLink = buildWazeLink(destinationPlace);

  const handleCopyDestAddress = () => {
    navigator.clipboard?.writeText(destCleanAddress);
    setCopiedDest(true);
    setTimeout(() => setCopiedDest(false), 3000);
  };

  const handleOpen99 = () => {
    // 1. Copy exact destination address to clipboard so she can paste in 99 effortlessly
    navigator.clipboard?.writeText(destCleanAddress);
    setCopiedFor99(true);
    setTimeout(() => setCopiedFor99(false), 5000);

    // 2. Try to launch 99 app
    window.location.href = app99Link;
  };

  const handleSwapOriginDest = () => {
    if (originPlace) {
      const oldOrig = originPlace.id;
      const oldDest = destinationPlace.id;
      setSelectedDestId(oldOrig);
      setOriginMode(oldDest);
    } else {
      // Swapping GPS with Destination
      setOriginMode(destinationPlace.id);
      if (nearestPlace) {
        setSelectedDestId(nearestPlace.place.id);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-black via-slate-900 to-indigo-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shadow-inner">
              <Car className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Pedir Uber / 99</h3>
              <p className="text-slate-300 text-xs">Com endereço exato de rua e CEP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* ORIGIN & DESTINATION CARD */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200/90 space-y-3 relative">
            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwapOriginDest}
              title="Inverter origem e destino"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-slate-300 shadow-md flex items-center justify-center text-slate-700 hover:text-black hover:bg-slate-50 active:scale-95 transition-all z-10"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>

            {/* ORIGIN (PARTIDA) */}
            <div className="pr-10 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Ponto de Partida (Origem):
                </span>
              </div>
              <select
                value={originMode}
                onChange={(e) => setOriginMode(e.target.value)}
                className="w-full text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-black outline-hidden"
              >
                <option value="gps">📍 Minha Localização Atual (GPS Automático)</option>
                {KNOWN_PLACES.map((p) => (
                  <option key={`orig_${p.id}`} value={p.id}>
                    {p.icon} {p.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-600 truncate pl-1">
                {originCleanAddress}
              </p>
            </div>

            <div className="border-t border-slate-200 my-1"></div>

            {/* DESTINATION (CHEGADA) */}
            <div className="pr-10 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-4 ring-rose-100"></span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Para onde você vai (Destino):
                </span>
              </div>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-black outline-hidden"
              >
                {KNOWN_PLACES.map((p) => (
                  <option key={`dest_${p.id}`} value={p.id}>
                    {p.icon} {p.name}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-indigo-950 font-semibold truncate pl-1">
                {destCleanAddress}
              </p>
            </div>
          </div>

          {/* VERIFIED ADDRESS BOX */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                Endereço Oficial enviado ao Motorista:
              </span>
              <button
                type="button"
                onClick={handleCopyDestAddress}
                className="text-[11px] text-indigo-700 font-bold hover:underline flex items-center gap-1"
              >
                {copiedDest ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedDest ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <p className="text-xs font-extrabold text-slate-900">
              {destCleanTitle}
            </p>
            <p className="text-xs text-slate-700 font-medium">
              {destCleanAddress}
            </p>
          </div>

          {/* 99 COPIED ALERT */}
          {copiedFor99 && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold animate-in fade-in">
              📋 <strong>Endereço copiado para a área de transferência!</strong> Abrindo o app da 99... Se o 99 solicitar o destino, basta tocar em colar!
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="space-y-2.5 pt-1">
            {/* UBER PRIMARY (UNIVERSAL LINK) */}
            <a
              href={uberUniversalLink}
              target="_top"
              onClick={() => setTimeout(onClose, 1000)}
              className="w-full py-4 px-4 rounded-2xl bg-black hover:bg-slate-800 text-white font-black text-sm shadow-xl shadow-black/25 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Car className="w-5 h-5 text-white" />
              <span>ABRIR NO UBER</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
            </a>

            {/* 99 APP SMART BUTTON */}
            <button
              type="button"
              onClick={handleOpen99}
              className="w-full py-3.5 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Smartphone className="w-4 h-4 text-amber-950" />
              <span>CHAMAR NO 99 (COPIA ENDEREÇO & ABRE APP)</span>
            </button>

            {/* MAPS & WAZE FALLBACKS */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={gmapsLink}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-indigo-200"
              >
                <Navigation className="w-3.5 h-3.5 text-indigo-600" />
                Google Maps
              </a>

              <a
                href={wazeLink}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-sky-200"
              >
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                Abrir no Waze
              </a>
            </div>
          </div>

          <p className="text-[11px] text-center text-slate-500 leading-relaxed">
            Os dados são enviados com coordenadas de alta precisão e número da rua para evitar erros de trajeto.
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
