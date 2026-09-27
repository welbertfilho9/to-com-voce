import React from 'react';
import { UserRole, ActiveJourney } from '../types';
import { Compass, Heart, Smartphone, Laptop, Download } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeJourney: ActiveJourney | null;
  onOpenInstallGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeJourney,
  onOpenInstallGuide
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-sm border border-rose-200/60 bg-amber-50 shrink-0">
            <img
              src="/logo.jpg"
              alt="Tô Com Você"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-slate-900 text-sm tracking-tight">
                Tô Com Você
              </h1>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Maceió · Diadema</p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Active trip pulse badge */}
          {activeJourney && (
            <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Viagem ativa
            </div>
          )}

          {/* Segmented Role Switcher */}
          <div className="bg-slate-100/90 p-0.5 rounded-xl flex items-center border border-slate-200/80">
            <button
              onClick={() => onRoleChange('tonton')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'tonton'
                  ? 'bg-white text-indigo-700 shadow-sm shadow-slate-900/5'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Tonton</span>
            </button>
            <button
              onClick={() => onRoleChange('welbert')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'welbert'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Welbert</span>
            </button>
          </div>

          {/* Install on iPhone Button */}
          <button
            onClick={onOpenInstallGuide}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/60 rounded-xl transition-all shadow-xs"
            title="Como instalar no iPhone"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Instalar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
