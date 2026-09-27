import React from 'react';
import { X, Share, PlusSquare, Smartphone, CheckCircle2, ShieldCheck, HardDrive } from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-rose-600 to-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-white/30 bg-white shrink-0 shadow-sm">
              <img
                src="/logo.jpg"
                alt="Tô Com Você"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Instalar Tô Com Você no iPhone</h3>
              <p className="text-rose-100 text-xs">Sem App Store • Ocupa menos de 1 MB</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Step Tutorial */}
        <div className="p-5 space-y-4">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-2.5 text-xs text-indigo-900">
            <HardDrive className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              Perfeito para celulares sem espaço: o app roda direto no navegador e consome <strong>0 MB da App Store</strong>.
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {/* Step 1 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  Abra o link no Safari
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Certifique-se de que está usando o navegador <strong>Safari</strong> do iPhone (não abra dentro do navegador embutido do Instagram ou WhatsApp).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  Toque em Compartilhar <Share className="w-4 h-4 text-indigo-600" />
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Na barra inferior do Safari, toque no ícone de <strong>Compartilhar</strong> (o quadrado com uma seta para cima).
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  "Adicionar à Tela de Início" <PlusSquare className="w-4 h-4 text-emerald-600" />
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Role a lista para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>, depois toque em <strong>"Adicionar"</strong> no canto superior direito.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Pronto! O ícone ❤️ <strong>Tô Com Você</strong> aparecerá na tela do celular como qualquer aplicativo, abrindo em tela cheia e funcionando mesmo com sinal fraco.
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs transition-colors"
          >
            Entendi, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
