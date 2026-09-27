import React from 'react';
import { PRESET_TRIPS } from '../data/mockData';
import { PresetTrip } from '../types';
import { HelpCircle, ArrowRight, X } from 'lucide-react';

interface DecisionPointModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrip: (trip: PresetTrip) => void;
  currentStepTitle?: string;
}

export const DecisionPointModal: React.FC<DecisionPointModalProps> = ({
  isOpen,
  onClose,
  onSelectTrip,
  currentStepTitle
}) => {
  if (!isOpen) return null;

  const choices = [
    {
      tripId: 'terminal_ufal',
      title: 'Ir para a UFAL',
      subtitle: 'Linha 0901 ou 0903 (Plataforma Oeste)',
      icon: '🎓',
      bgClass: 'bg-indigo-50 border-indigo-200 text-indigo-900 hover:bg-indigo-100'
    },
    {
      tripId: 'terminal_casa',
      title: 'Voltar para Casa',
      subtitle: 'Rua Quinze, 101, Clima Bom',
      icon: '🏠',
      bgClass: 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
    },
    {
      tripId: 'casa_orizon', // placeholder or quick alternate
      title: 'Outro Destino / Uber',
      subtitle: 'Shopping Pátio ou pedir Uber seguro',
      icon: '🛍️',
      bgClass: 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Ponto de Decisão</h3>
              <p className="text-amber-100 text-xs">Você chegou ao Terminal Integrado</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question */}
        <div className="p-5 space-y-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              {currentStepTitle || 'Terminal Benedito Bentes'}
            </p>
            <h4 className="text-xl font-bold text-slate-900 mt-1">
              Para onde você vai agora?
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Toque no seu destino para carregar as orientações específicas da próxima etapa.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {choices.map((choice) => (
              <button
                key={choice.tripId}
                onClick={() => {
                  const targetTrip = PRESET_TRIPS.find(t => t.id === choice.tripId);
                  if (targetTrip) {
                    onSelectTrip(targetTrip);
                  }
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.98] ${choice.bgClass}`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">{choice.icon}</span>
                  <div>
                    <h5 className="font-bold text-base leading-tight">{choice.title}</h5>
                    <p className="text-xs opacity-80 mt-0.5">{choice.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0 opacity-70" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium text-xs transition-colors"
          >
            Decidir depois
          </button>
        </div>
      </div>
    </div>
  );
};
