import React from 'react';
import { UserRole, ActiveJourney } from '../types';
import { Compass, ShieldCheck, Heart, FileText, Smartphone, Laptop, HardDrive } from 'lucide-react';
import { getLocalStorageFootprintKB } from '../services/storage';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeJourney: ActiveJourney | null;
  onOpenDoc: () => void;
  onOpenInstallGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeJourney,
  onOpenDoc,
  onOpenInstallGuide
}) => {
  const footprint = getLocalStorageFootprintKB();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-xs">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-semibold text-slate-900 text-sm sm:text-base leading-tight">
                Tô Com Você
              </h1>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </div>
            <p className="text-[11px] text-slate-700">Copiloto Maceió</p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2">
          {/* Active trip indicator */}
          {activeJourney && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Viagem ativa
            </span>
          )}

          {/* Role switcher toggle */}
          <div className="bg-slate-100 p-0.5 rounded-lg flex items-center border border-slate-200">
            <button
              onClick={() => onRoleChange('tonton')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                currentRole === 'tonton'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Interface simplificada para Tonton"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Modo</span> Tonton
            </button>
            <button
              onClick={() => onRoleChange('welbert')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                currentRole === 'welbert'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Painel do Welbert com telemetria e acompanhamento"
            >
              <Laptop className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Painel</span> Welbert
            </button>
          </div>

          {/* Install Guide Button */}
          <button
            onClick={onOpenInstallGuide}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            title="Como instalar na Tela de Início do iPhone 14"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Instalar no iPhone</span>
          </button>

          {/* Architecture & Document button */}
          <button
            onClick={onOpenDoc}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 hover:text-indigo-700 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-lg transition-colors"
            title="Ver análise completa de produto e arquitetura (34 tópicos)"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Plano & Arquitetura</span>
          </button>
        </div>
      </div>

      {/* Low storage banner for iPhone 14 awareness */}
      <div className="bg-gradient-to-r from-slate-100 via-indigo-50/50 to-slate-100 px-4 py-1 text-[11px] text-slate-500 border-t border-slate-200/50 flex items-center justify-between max-w-3xl mx-auto">
        <span className="flex items-center gap-1.5 text-slate-600">
          <HardDrive className="w-3 h-3 text-indigo-500" />
          PWA ultraleve para iPhone 14: <strong className="text-slate-700 font-semibold">{footprint} KB</strong> em cache
        </span>
        <span className="text-slate-600 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          Sem rastreamento 24h
        </span>
      </div>
    </header>
  );
};
