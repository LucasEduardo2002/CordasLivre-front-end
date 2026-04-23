import { useState } from 'react';
import axios from 'axios';
import type { StringType } from '../constants/instruments';
import { API_BASE_URL } from '../utils/api';

type IconProps = {
  className?: string;
};

function SparkIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 3v4M12 17v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M3 12h4M17 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GaugeIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 13a8 8 0 1 1 16 0v4H4v-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m12 13 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

interface ToneAssistantResponse {
  type: StringType;
  instrumentLabel: string;
  levelLabel: string;
  styleLabel: string;
  compatibilityScore: number;
  compatibilityLabel: 'Excelente' | 'Boa' | 'Ajustável';
  compatibilityTone: 'success' | 'warning';
  recommendedGauge: string;
  recommendedMaterial: string;
  recommendedTension: string;
  confidence: 'alta' | 'media';
  decisionFactors: string[];
  referenceSources: Array<{
    name: string;
    url: string;
    note: string;
  }>;
  explanation: string;
  nextStep: string;
  products: Array<{
    id: number;
    title: string;
    price: number;
    ratingAvg: number | null;
    ratingCount: number;
    permalink: string;
    thumbnail: string;
    rank: number;
  }>;
}

export function ToneAssistantPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [instrument, setInstrument] = useState('Violão Clássico');
  const [level, setLevel] = useState('Iniciante');
  const [style, setStyle] = useState('MPB');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ToneAssistantResponse | null>(null);

  const compatibilityToneClasses = {
    success: {
      badge: 'bg-emerald-600 text-white',
      track: 'bg-emerald-100',
      fill: 'bg-emerald-600',
      text: 'text-emerald-800',
    },
    warning: {
      badge: 'bg-amber-600 text-white',
      track: 'bg-amber-100',
      fill: 'bg-amber-600',
      text: 'text-amber-800',
    },
  } as const;

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<ToneAssistantResponse>(`${API_BASE_URL}/strings/tone-assistant`, {
        instrument,
        level,
        style,
      });
      setResult(response.data);
    } catch (requestError) {
      console.error('Erro ao gerar recomendação:', requestError);
      setError('Não foi possível gerar a recomendação agora.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <section className="cl-fade-up relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-[linear-gradient(125deg,_rgba(11,18,40,1),_rgba(31,42,82,1),_rgba(6,78,125,1))] p-5 text-white shadow-xl sm:p-6 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />
        <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Assistente de timbre</p>
        <h1 className="cl-text-balance relative z-10 mt-2 max-w-3xl text-3xl font-black md:text-4xl">Recomendação mais assertiva para o seu som</h1>
        <p className="cl-text-balance relative z-10 mt-3 max-w-3xl text-sm leading-6 text-cyan-50 md:text-base md:leading-7">
          Baseado em perfil de instrumento, nível e estilo, com critérios técnicos de tensão e faixas de calibre usadas no mercado.
        </p>
      </section>

      <section className="cl-fade-up cl-delay-1 mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {[1, 2, 3].map((currentStep) => (
            <button
              key={currentStep}
              type="button"
              onClick={() => setStep(currentStep as 1 | 2 | 3)}
              className={`h-9 w-9 rounded-full text-xs font-bold transition ${
                step === currentStep ? 'bg-cyan-600 text-white shadow-md shadow-cyan-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {currentStep}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          {step === 1 && (
            <label className="block text-sm font-semibold text-slate-800">
              Qual é o seu instrumento?
              <select value={instrument} onChange={(event) => setInstrument(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500">
                <option>Violão Clássico</option>
                <option>Guitarra</option>
                <option>Contrabaixo</option>
                <option>Cavaquinho</option>
                <option>Ukulele</option>
                <option>Viola Caipira</option>
                <option>Violino</option>
              </select>
            </label>
          )}

          {step === 2 && (
            <label className="block text-sm font-semibold text-slate-800">
              Qual é o seu nível?
              <select value={level} onChange={(event) => setLevel(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500">
                <option>Iniciante</option>
                <option>Intermediário</option>
                <option>Avançado</option>
              </select>
            </label>
          )}

          {step === 3 && (
            <label className="block text-sm font-semibold text-slate-800">
              Qual estilo você quer tocar?
              <select value={style} onChange={(event) => setStyle(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500">
                <option>Rock</option>
                <option>MPB</option>
                <option>Sertanejo</option>
                <option>Jazz</option>
                <option>Pop</option>
              </select>
            </label>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev))}
            className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            Voltar
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev))}
              className="w-full rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 sm:w-auto"
            >
              Próximo
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-wait disabled:bg-cyan-400 sm:w-auto"
            >
              <SparkIcon className="h-4 w-4" />
              {loading ? 'Gerando...' : 'Gerar recomendação'}
            </button>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        {result && (
          <div className="cl-fade-up cl-delay-2 mt-6 space-y-4 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cyan-700 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">{result.instrumentLabel}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-cyan-900">Nível: {result.levelLabel}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-cyan-900">Estilo: {result.styleLabel}</span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-cyan-900">
                Confiança: {result.confidence === 'alta' ? 'Alta' : 'Média'}
              </span>
            </div>

            <div className="rounded-xl border border-cyan-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-cyan-900">Compatibilidade da recomendação</p>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${compatibilityToneClasses[result.compatibilityTone].badge}`}>
                  {result.compatibilityLabel}
                </span>
              </div>
              <div className={`mt-3 h-2 w-full overflow-hidden rounded-full ${compatibilityToneClasses[result.compatibilityTone].track}`}>
                <div
                  className={`h-full rounded-full ${compatibilityToneClasses[result.compatibilityTone].fill}`}
                  style={{ width: `${Math.max(5, Math.min(100, result.compatibilityScore))}%` }}
                />
              </div>
              <p className={`mt-2 text-xs font-semibold ${compatibilityToneClasses[result.compatibilityTone].text}`}>
                Pontuação de compatibilidade: {result.compatibilityScore}/100
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              <article className="rounded-xl border border-cyan-200 bg-white p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Calibre</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{result.recommendedGauge}</p>
              </article>
              <article className="rounded-xl border border-cyan-200 bg-white p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Material</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{result.recommendedMaterial}</p>
              </article>
              <article className="rounded-xl border border-cyan-200 bg-white p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Tensão</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{result.recommendedTension}</p>
              </article>
            </div>

            <div className="rounded-xl border border-cyan-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-cyan-900">Resumo da recomendação</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{result.explanation}</p>
              <p className="mt-2 text-xs font-medium text-cyan-800">{result.nextStep}</p>
            </div>

            <div className="rounded-xl border border-cyan-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-cyan-900">Fatores usados na decisão</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                {result.decisionFactors.map((factor) => (
                  <li key={factor} className="flex items-start gap-2">
                    <GaugeIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-700" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-cyan-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-cyan-900">Referências técnicas utilizadas</p>
                <div className="mt-2 space-y-2">
                {result.referenceSources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-slate-200 px-3 py-2 text-sm transition hover:border-cyan-300 hover:bg-cyan-50"
                  >
                    <p className="font-semibold text-slate-900">{source.name}</p>
                    <p className="text-slate-600">{source.note}</p>
                  </a>
                ))}
              </div>
            </div>

            {result.products.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-semibold text-cyan-900">Produtos alinhados ao perfil recomendado</p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {result.products.map((product) => (
                    <article key={product.id} className="rounded-xl border border-cyan-200 bg-white p-3">
                      <div className="flex items-start gap-3">
                        <img src={product.thumbnail} alt={product.title} className="h-16 w-16 rounded-lg bg-slate-50 p-1 object-contain" loading="lazy" />
                        <div className="min-w-0">
                          <p className="line-clamp-2 text-sm font-semibold text-slate-900">{product.title}</p>
                          <p className="mt-1 text-xs text-slate-600">Rank #{product.rank}</p>
                          <p className="mt-1 text-sm font-extrabold text-cyan-800">
                            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </p>
                        </div>
                      </div>
                      <a
                        href={product.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
                      >
                        Ver oferta
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}