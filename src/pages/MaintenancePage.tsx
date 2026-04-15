import { useEffect, useState } from 'react';
import axios from 'axios';
import { stringTypeOptions, type StringType } from '../constants/instruments';
import { API_BASE_URL } from '../utils/api';

interface MaintenanceProfileResponse {
  id: string;
  userEmail: string;
  type: StringType;
  lastChangeDate: string;
  studyHoursPerWeek: number;
  estimatedLifeDays: number;
  nextAlertDate: string;
  alertLevel: 'OK' | 'SOON' | 'DUE' | 'OVERDUE';
  alertMessage: string | null;
  affiliateUrl: string | null;
}

interface MaintenanceAlertResponse extends MaintenanceProfileResponse {
  computedAlert: {
    code: 'OK' | 'SOON' | 'DUE' | 'OVERDUE';
    label: string;
    tone: 'success' | 'warning' | 'danger';
    message: string;
  };
}

export function MaintenancePage() {
  const [email, setEmail] = useState('');
  const [instrument, setInstrument] = useState<StringType>('VIOLAO');
  const [lastChangeDate, setLastChangeDate] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<MaintenanceProfileResponse | null>(null);
  const [alerts, setAlerts] = useState<MaintenanceAlertResponse[]>([]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const saveMaintenance = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<{ profile: MaintenanceProfileResponse }>(`${API_BASE_URL}/strings/maintenance/register`, {
        email,
        instrument,
        lastChangeDate,
        studyHoursPerWeek: hoursPerWeek,
      });

      setSaved(response.data.profile);
    } catch (requestError) {
      console.error('Erro ao salvar monitoramento:', requestError);
      setError('Não foi possível salvar o monitoramento agora.');
    } finally {
      setLoading(false);
    }
  };

  const loadAlerts = async () => {
    if (!email.trim()) {
      setError('Informe um e-mail para consultar os alertas.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<MaintenanceAlertResponse[]>(`${API_BASE_URL}/strings/maintenance/alerts`, {
        params: { email },
      });

      setAlerts(response.data);
    } catch (requestError) {
      console.error('Erro ao carregar alertas:', requestError);
      setError('Não foi possível carregar os alertas agora.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (saved?.userEmail) {
      setEmail(saved.userEmail);
    }
  }, [saved]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <section className="cl-fade-up relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-[linear-gradient(125deg,_rgba(11,18,40,1),_rgba(31,42,82,1),_rgba(6,78,125,1))] p-5 text-white shadow-xl sm:p-6 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />
        <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Vida útil das cordas</p>
        <h1 className="cl-text-balance relative z-10 mt-2 text-3xl font-black md:text-4xl">Acompanhe o desgaste e receba alertas</h1>
        <p className="cl-text-balance relative z-10 mt-3 max-w-3xl text-sm leading-6 text-cyan-50 md:text-base md:leading-7">
          Registre a troca, informe suas horas de estudo e veja quando as cordas começam a perder resposta e brilho.
        </p>
      </section>

      <section className="cl-fade-up cl-delay-1 mt-6 rounded-2xl border border-cyan-200 bg-white p-4 shadow-sm sm:p-5 md:p-6">
        <div className="grid gap-3">
          <label className="text-sm font-semibold text-slate-800">
            E-mail
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500"
              placeholder="seuemail@dominio.com"
            />
          </label>

          <label className="text-sm font-semibold text-slate-800">
            Instrumento
            <select
              value={instrument}
              onChange={(event) => setInstrument(event.target.value as StringType)}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500"
            >
              {stringTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-slate-800">
            Data da última troca
            <input
              value={lastChangeDate}
              onChange={(event) => setLastChangeDate(event.target.value)}
              type="date"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500"
            />
          </label>

          <label className="text-sm font-semibold text-slate-800">
            Horas por semana
            <input
              value={hoursPerWeek}
              onChange={(event) => setHoursPerWeek(Number(event.target.value))}
              type="number"
              min={1}
              max={60}
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-cyan-500"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={saveMaintenance}
            disabled={loading}
            className="w-full rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-wait disabled:bg-cyan-400 sm:w-auto"
          >
            {loading ? 'Salvando...' : 'Salvar monitoramento'}
          </button>
          <button
            type="button"
            onClick={loadAlerts}
            disabled={loading}
            className="w-full rounded-xl border border-cyan-300 px-4 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-50 disabled:cursor-wait sm:w-auto"
          >
            Ver alertas
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

        {saved && (
          <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-cyan-900 shadow-sm">
            <p className="font-semibold">Monitoramento salvo com sucesso.</p>
            <p>Vida útil estimada: {saved.estimatedLifeDays} dias.</p>
            <p>Próximo alerta: {formatDate(saved.nextAlertDate)}.</p>
            {saved.alertMessage && <p className="mt-1">{saved.alertMessage}</p>}
          </div>
        )}

        {alerts.length > 0 && (
          <div className="mt-5 grid gap-3">
            {alerts.map((item) => (
              <div key={item.id} className="rounded-xl border border-cyan-100 bg-slate-50/70 p-4 text-sm text-slate-800 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      item.computedAlert.tone === 'success' ? 'bg-cyan-700 text-white' : item.computedAlert.tone === 'warning' ? 'bg-amber-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {item.computedAlert.label}
                  </span>
                  <span className="font-semibold text-slate-800">{item.type}</span>
                </div>
                <div
                  className={`mt-2 rounded-lg border p-3 ${
                    item.computedAlert.tone === 'success' ? 'border-cyan-200 bg-cyan-50' : item.computedAlert.tone === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-red-200 bg-red-50'
                  }`}
                >
                  <p>{item.computedAlert.message}</p>
                </div>
                <p className="mt-2 text-xs text-slate-500">Próxima troca estimada: {formatDate(item.nextAlertDate)}</p>
                {item.affiliateUrl && (
                  <a
                    href={item.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex rounded-lg bg-cyan-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Ver set recomendado
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}