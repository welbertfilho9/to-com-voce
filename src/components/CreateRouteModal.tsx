import React, { useState } from 'react';
import { PresetTrip, JourneyStep, StepType } from '../types';
import { KNOWN_PLACES } from '../data/mockData';
import {
  X,
  Plus,
  Trash2,
  Navigation,
  Compass,
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface CreateRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRoute: (newTrip: PresetTrip) => void;
}

export const CreateRouteModal: React.FC<CreateRouteModalProps> = ({
  isOpen,
  onClose,
  onSaveRoute
}) => {
  const [name, setName] = useState('');
  const [originName, setOriginName] = useState('Casa (Clima Bom)');
  const [destinationName, setDestinationName] = useState('UFAL - Campus A.C. Simões');
  const [routineHint, setRoutineHint] = useState('');
  const [estimatedMinutes, setEstimatedMinutes] = useState(35);

  const [steps, setSteps] = useState<Partial<JourneyStep>[]>([
    {
      stepNumber: 1,
      type: 'walk',
      title: 'Caminhar até o ponto de embarque',
      instruction: 'Saia com calma e caminhe até a parada de costume.',
      warningNote: '',
      estimatedMinutes: 5
    },
    {
      stepNumber: 2,
      type: 'bus',
      title: 'Embarcar no transporte',
      instruction: 'Aguarde o ônibus e confira o letreiro antes de subir.',
      busLine: '',
      warningNote: 'Atenção ao letreiro luminoso e ao sentido da via!',
      estimatedMinutes: 25
    },
    {
      stepNumber: 3,
      type: 'arrive',
      title: 'Chegada ao destino',
      instruction: 'Você chegou com segurança! ❤️',
      estimatedMinutes: 5
    }
  ]);

  if (!isOpen) return null;

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        type: 'bus',
        title: `Etapa ${steps.length + 1}`,
        instruction: 'Descreva o que ela deve fazer neste momento.',
        estimatedMinutes: 10
      }
    ]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) return;
    const updated = steps.filter((_, i) => i !== index);
    setSteps(updated.map((s, idx) => ({ ...s, stepNumber: idx + 1 })));
  };

  const handleUpdateStep = (index: number, field: keyof JourneyStep, value: any) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const handleSave = () => {
    const finalTripName = name.trim() || `${originName} ➔ ${destinationName}`;
    const tripId = `custom_trip_${Date.now()}`;

    const formattedSteps: JourneyStep[] = steps.map((s, i) => ({
      id: `${tripId}_step_${i + 1}`,
      stepNumber: i + 1,
      type: (s.type as StepType) || 'walk',
      title: s.title || `Passo ${i + 1}`,
      instruction: s.instruction || 'Siga a rota indicada com calma.',
      detail: s.detail || '',
      locationName: s.locationName || destinationName,
      warningNote: s.warningNote || undefined,
      busLine: s.busLine || undefined,
      estimatedMinutes: Number(s.estimatedMinutes) || 10
    }));

    const newTrip: PresetTrip = {
      id: tripId,
      name: finalTripName,
      originId: 'custom_origin',
      destinationId: 'custom_dest',
      originName,
      destinationName,
      estimatedTotalMinutes: Number(estimatedMinutes) || 30,
      routineHint: routineHint.trim() || 'Rota Personalizada',
      steps: formattedSteps
    };

    onSaveRoute(newTrip);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-rose-600 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Criar Nova Rota</h3>
              <p className="text-indigo-100 text-xs">Monte um trajeto passo a passo seguro</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Route Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Nome da Rota
            </label>
            <input
              type="text"
              placeholder="Ex: Casa ➔ Shopping Maceió ou UFAL ➔ Estágio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-hidden"
            />
          </div>

          {/* Origin & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ponto de Partida
              </label>
              <input
                type="text"
                value={originName}
                onChange={(e) => setOriginName(e.target.value)}
                placeholder="Ex: Casa (Clima Bom)"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Destino Final
              </label>
              <input
                type="text"
                value={destinationName}
                onChange={(e) => setDestinationName(e.target.value)}
                placeholder="Ex: Maceió Shopping"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-indigo-600 outline-hidden"
              />
            </div>
          </div>

          {/* Quick suggestions from Known Places */}
          <div>
            <span className="text-[11px] text-slate-500 font-semibold block mb-1">
              Preenchimento rápido com locais conhecidos:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {KNOWN_PLACES.slice(0, 6).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setDestinationName(p.name)}
                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-[11px] text-slate-700 font-medium transition-colors"
                >
                  {p.icon} {p.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Time & Routine Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tempo Estimado Total (min)
              </label>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Dica de Rotina (Opcional)
              </label>
              <input
                type="text"
                value={routineHint}
                onChange={(e) => setRoutineHint(e.target.value)}
                placeholder="Ex: Toda quinta às 15h"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 outline-hidden"
              />
            </div>
          </div>

          {/* Step Builder */}
          <div className="pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Etapas da Rota ({steps.length})</h4>
                <p className="text-[11px] text-slate-500">Cada passo será exibido isoladamente na tela dela</p>
              </div>
              <button
                type="button"
                onClick={handleAddStep}
                className="py-1 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Adicionar Passo
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <select
                        value={step.type}
                        onChange={(e) => handleUpdateStep(idx, 'type', e.target.value)}
                        className="p-1 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-800"
                      >
                        <option value="walk">🚶 Caminhar</option>
                        <option value="bus">🚌 Ônibus</option>
                        <option value="van">🚐 Van</option>
                        <option value="decision">📍 Ponto de Decisão</option>
                        <option value="arrive">🎯 Chegada</option>
                      </select>
                    </div>

                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remover passo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Step Title */}
                  <input
                    type="text"
                    value={step.title || ''}
                    onChange={(e) => handleUpdateStep(idx, 'title', e.target.value)}
                    placeholder="Título da etapa (ex: Pegar Linha 0901)"
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-900"
                  />

                  {/* Step Instruction */}
                  <textarea
                    rows={2}
                    value={step.instruction || ''}
                    onChange={(e) => handleUpdateStep(idx, 'instruction', e.target.value)}
                    placeholder="Instrução exata: o que ela tem que fazer agora..."
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 resize-none"
                  />

                  {/* Optional Warning / Letreiro */}
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <input
                      type="text"
                      value={step.warningNote || ''}
                      onChange={(e) => handleUpdateStep(idx, 'warningNote', e.target.value)}
                      placeholder="Aviso especial (ex: conferir letreiro luminoso ou baia)"
                      className="w-full p-1.5 rounded-lg border border-amber-200 bg-amber-50/50 text-[11px] text-amber-900 placeholder-amber-700/50"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Salvar e Disponibilizar Rota
          </button>
        </div>
      </div>
    </div>
  );
};
