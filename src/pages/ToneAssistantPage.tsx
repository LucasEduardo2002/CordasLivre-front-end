import { useState } from 'react';
import axios from 'axios';
import { stringTypeOptions, type StringType } from '../constants/instruments';
import { API_BASE_URL } from '../utils/api';

interface ToneAssistantResponse {
  type: StringType;
  instrumentLabel: string;
  levelLabel: string;
  styleLabel: string;
  recommendedGauge: string;
  recommendedMaterial: string;
  recommendedTension: string;
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
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Assistente de timbre</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Escolha a corda com mais segurança</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Responda três perguntas simples e receba uma recomendação didática de calibre, material e tensão.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-indigo-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((currentStep) => (
            <button
              key={currentStep}
              type="button"
              onClick={() => setStep(currentStep as 1 | 2 | 3)}
              className={`h-8 w-8 rounded-full text-xs font-bold ${step === currentStep ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              {currentStep}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-4">
          {step === 1 && (
            <label className="block text-sm font-semibold text-slate-800">
              Qual é o seu instrumento?
              <select value={instrument} onChange={(event) => setInstrument(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option>Violão Clássico</option>
                <option>Guitarra</option>
                <option>Contrabaixo</option>
                <option>Cavaquinho</option>
                <option>Viola Caipira</option>
                <option>Violino</option>
              </select>
            </label>
          )}

          {step === 2 && (
            <label className="block text-sm font-semibold text-slate-800">
              Qual é o seu nível?
              <select value={level} onChange={(event) => setLevel(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option>Iniciante</option>
                <option>Intermediário</option>
              </select>
            </label>
          )}

          {step === 3 && (
            <label className="block text-sm font-semibold text-slate-800">
              Qual estilo você quer tocar?
              <select value={style} onChange={(event) => setStyle(event.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option>Rock</option>
                <option>MPB</option>
                <option>Sertanejo</option>
              </select>
            </label>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : prev))}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Voltar
          </button>
          {step < 3 ? (
            <button type="button" onClick={() => setStep((prev) => (prev < 3 ? ((prev + 1) as 1 | 2 | 3) : prev))} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
              Próximo
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={loading} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-wait disabled:bg-indigo-400">
              {loading ? 'Gerando...' : 'Gerar recomendação'}
            </button>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        {result && (
          <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
            <p className="text-sm font-semibold text-indigo-900">Calibre recomendado: {result.recommendedGauge}</p>
            <p className="text-sm font-semibold text-indigo-900">Material recomendado: {result.recommendedMaterial}</p>
            <p className="text-sm font-semibold text-indigo-900">Tensão recomendada: {result.recommendedTension}</p>
            <p className="mt-2 text-sm text-indigo-900">{result.explanation}</p>
            <p className="mt-2 text-xs text-indigo-700">{result.nextStep}</p>
          </div>
        )}
      </section>
    </main>
  );
}