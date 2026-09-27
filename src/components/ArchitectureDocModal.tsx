import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Download, Search } from 'lucide-react';
import { FULL_ARCHITECTURE_DOCUMENT } from '../data/architectureDoc';

interface ArchitectureDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureDocModal: React.FC<ArchitectureDocModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleCopyMarkdown = () => {
    navigator.clipboard?.writeText(FULL_ARCHITECTURE_DOCUMENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([FULL_ARCHITECTURE_DOCUMENT], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ARQUITETURA_COPILOTO_DESLOCAMENTO.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Dossiê de Engenharia & Arquitetura</h3>
              <p className="text-xs text-slate-400">Análise Completa em 34 Tópicos para Portfólio & Produção</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar Markdown'}
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="hidden sm:flex py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Baixar .MD
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="text"
            placeholder="Filtrar tópicos (ex: iPhone, Uber, PWA, LGPD, MVP, DMTT)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs bg-transparent border-none outline-hidden text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-800 text-sm leading-relaxed prose prose-indigo max-w-none">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-xs text-indigo-900 mb-6">
            <strong>Nota de Engenharia:</strong> Este documento contém a especificação técnica integral dos 34 tópicos solicitados no seu briefing. Você pode copiar o Markdown completo para o seu repositório no GitHub ou consultar diretamente aqui enquanto testa a aplicação.
          </div>

          <div className="whitespace-pre-line font-sans">
            {FULL_ARCHITECTURE_DOCUMENT}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">34 Tópicos • Engenharia de Software UFABC / Maceió</span>
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs transition-colors"
          >
            Fechar Dossiê
          </button>
        </div>
      </div>
    </div>
  );
};
