import React, { useState } from 'react';
import { KnownPlace } from '../types';
import { KNOWN_PLACES } from '../data/mockData';
import { Car, CheckCircle2, AlertTriangle, X, ExternalLink } from 'lucide-react';
import { openUberWithVerification } from '../services/uber';

interface UberModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlace?: KnownPlace | null;
}

export const UberModal: React.FC<UberModalProps> = ({
  isOpen,
  onClose,
  defaultPlace
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(
    defaultPlace ? defaultPlace.id : 'casa'
  );
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const currentPlace = KNOWN_PLACES.find(p => p.id === selectedPlaceId) || KNOWN_PLACES[0];

  const handleLaunchUber = () => {
    openUberWithVerification(currentPlace);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-black to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Uber Seguro</h3>
              <p className="text-slate-400 text-xs">Destino pré-configurado sem erro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Select destination */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Escolha para onde você vai:
            </label>
            <select
              value={selectedPlaceId}
              onChange={(e) => {
                setSelectedPlaceId(e.target.value);
                setConfirmed(false);
              }}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-black outline-hidden"
            >
              {KNOWN_PLACES.map(p => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Verification Box (Crucial for preventing wrong address) */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Confira com atenção antes de pedir:
            </div>

            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <span className="text-xs text-slate-500 font-medium">Nome do Local:</span>
              <p className="font-bold text-slate-900 text-base flex items-center gap-1.5">
                <span>{currentPlace.icon}</span> {currentPlace.name}
              </p>

              <span className="text-xs text-slate-500 font-medium mt-2 block">Endereço Exato:</span>
              <p className="font-bold text-indigo-900 text-sm">
                {currentPlace.address}
              </p>
              <p className="text-xs text-slate-600">
                {currentPlace.neighborhood}
              </p>
              {currentPlace.notes && (
                <p className="text-[11px] text-slate-500 mt-1 italic">
                  💡 {currentPlace.notes}
                </p>
              )}
            </div>

            {/* Checkbox confirmation */}
            <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 rounded-md text-black focus:ring-black border-slate-300 cursor-pointer accent-black"
              />
              <span className="text-xs font-semibold text-slate-800">
                Confirmo que este é o endereço correto
              </span>
            </label>
          </div>

          {/* Action Button */}
          <button
            onClick={handleLaunchUber}
            disabled={!confirmed}
            className={`w-full py-4 px-4 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
              confirmed
                ? 'bg-black text-white hover:bg-slate-800 active:scale-[0.98]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Car className="w-5 h-5" />
            ABRIR NO APLICATIVO DO UBER
            <ExternalLink className="w-4 h-4 ml-1" />
          </button>

          <p className="text-[11px] text-center text-slate-500">
            O Uber será aberto diretamente no seu iPhone com o endereço de destino já preenchido.
          </p>
        </div>
      </div>
    </div>
  );
};
