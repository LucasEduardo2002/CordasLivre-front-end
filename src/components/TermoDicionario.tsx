import { useState } from 'react';
import type { ReactNode } from 'react';

interface TermoDicionarioProps {
  termo: string;
  children: ReactNode;
  variant?: 'inline' | 'pill';
}

interface TermoDados {
  category: string;
  shortDesc: string;
}

const DEFAULT_API_URL = 'https://cordaslivre-back-end.onrender.com';

const resolveApiBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim();

  if (!envUrl) {
    return DEFAULT_API_URL;
  }

  const normalized = envUrl.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const isLocalHost = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
    const envPointsToLocal = /localhost|127\.0\.0\.1/i.test(normalized);

    if (!isLocalHost && envPointsToLocal) {
      return DEFAULT_API_URL;
    }
  }

  return normalized;
};

const API_BASE_URL = resolveApiBaseUrl();

export function TermoDicionario({ termo, children, variant = 'pill' }: TermoDicionarioProps) {
  const [dados, setDados] = useState<TermoDados | null>(null);
  const [visivel, setVisivel] = useState(false);
  const [aCarregar, setACarregar] = useState(false);

  const mostrarTooltip = async () => {
    setVisivel(true);

    if (!dados && !aCarregar) {
      setACarregar(true);

      try {
        const response = await fetch(`${API_BASE_URL}/dictionary/${encodeURIComponent(termo)}`);

        if (response.ok) {
          const resultado = (await response.json()) as TermoDados | null;
          setDados(resultado);
        }
      } catch (error) {
        console.error('Erro ao procurar o termo no dicionário:', error);
      } finally {
        setACarregar(false);
      }
    }
  };

  const esconderTooltip = () => {
    setVisivel(false);
  };

  return (
    <span className="relative inline-flex" onMouseEnter={mostrarTooltip} onMouseLeave={esconderTooltip}>
      {variant === 'inline' ? (
        <span className="inline-flex cursor-help items-center gap-1 rounded-md border-b border-dashed border-amber-300 px-0.5 font-semibold text-amber-700 transition hover:border-amber-400 hover:text-amber-900">
          <span>{children}</span>
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold leading-none text-white">
            ?
          </span>
        </span>
      ) : (
        <span className="inline-flex cursor-help items-center rounded-full border border-dashed border-amber-300 bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-800 transition hover:border-amber-400 hover:bg-amber-100">
          {children}
        </span>
      )}

      {visivel && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 text-left text-sm shadow-xl">
          <div className="absolute top-full left-1/2 -mt-px -translate-x-1/2 border-4 border-transparent border-t-white" />
          <div className="absolute top-full left-1/2 -z-10 mt-px -translate-x-1/2 border-4 border-transparent border-t-slate-200" />

          {aCarregar ? (
            <span className="text-slate-400 animate-pulse">A procurar no dicionário...</span>
          ) : dados ? (
            <>
              <span className="mb-1 inline-block rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {dados.category}
              </span>
              <p className="leading-tight text-slate-700">{dados.shortDesc}</p>
            </>
          ) : (
            <span className="text-slate-500">Termo não encontrado no dicionário.</span>
          )}
        </div>
      )}
    </span>
  );
}