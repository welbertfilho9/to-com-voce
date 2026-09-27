import React from 'react';
import { KnownPlace, PresetTrip } from '../types';
import { KNOWN_PLACES, PRESET_TRIPS } from '../data/mockData';
import { MapPin, Navigation, Car, ExternalLink, Sparkles } from 'lucide-react';
import { calculateDistanceMeters, formatDistance } from '../services/geolocation';

interface PlacesListProps {
  currentLat: number;
  currentLng: number;
  onStartTripToPlace: (place: KnownPlace) => void;
  onOpenUberForPlace: (place: KnownPlace) => void;
}

export const PlacesList: React.FC<PlacesListProps> = ({
  currentLat,
  currentLng,
  onStartTripToPlace,
  onOpenUberForPlace
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Lugares Conhecidos</h3>
          <p className="text-xs text-slate-500">Sua rede de segurança com destinos familiares em Maceió</p>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
          {KNOWN_PLACES.length} locais
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {KNOWN_PLACES.map((place) => {
          const dist = calculateDistanceMeters(currentLat, currentLng, place.latitude, place.longitude);

          return (
            <div
              key={place.id}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl p-1.5 rounded-xl bg-slate-50 border border-slate-100">{place.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{place.name}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{place.neighborhood}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md shrink-0">
                    {formatDistance(dist)}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2 font-medium">
                  {place.address}
                </p>

                {place.notes && (
                  <p className="text-[11px] text-slate-500 mt-1 italic">
                    💡 {place.notes}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-100">
                <button
                  onClick={() => onStartTripToPlace(place)}
                  className="py-1.5 px-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Rotas
                </button>

                <button
                  onClick={() => onOpenUberForPlace(place)}
                  className="py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Car className="w-3.5 h-3.5" />
                  Uber Seguro
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
