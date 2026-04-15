import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { TermoDicionario } from '../components/TermoDicionario';
import { stringTypeOptions, type StringType } from '../constants/instruments';
import { API_BASE_URL } from '../utils/api';
import { splitTextByDictionaryTerms } from '../utils/dictionary';

interface Product {
  id: string;
  mlId: string;
  type: StringType;
  title: string;
  price: number;
  rank: number;
  ratingAvg: number | null;
  ratingCount: number;
  thumbnail: string;
  permalink: string;
}

interface WebSearchItem {
  id: string;
  title: string;
  price: number | null;
  source: string;
  permalink: string;
  thumbnail: string | null;
}

interface WebSearchResponse {
  query: string;
  cached: boolean;
  providers: string[];
  total: number;
  results: WebSearchItem[];
}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const fetchProductsWithRetry = async (type: StringType, retries = 5, delayMs = 1800): Promise<Product[]> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const response = await axios.get<Product[]>(`${API_BASE_URL}/strings`, {
        timeout: 25000,
        params: { type },
      });
      return response.data;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await wait(delayMs);
      }
    }
  }

  throw lastError;
};

export function RankPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedType, setSelectedType] = useState<StringType>('VIOLAO');
  const [isWebPanelOpen, setIsWebPanelOpen] = useState(false);
  const [webSearchQuery, setWebSearchQuery] = useState('encordoamento violao');
  const [webSearchLoading, setWebSearchLoading] = useState(false);
  const [webSearchError, setWebSearchError] = useState<string | null>(null);
  const [webSearchData, setWebSearchData] = useState<WebSearchResponse | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProductsWithRetry(selectedType)
      .then((data) => {
        setProducts(data);
        setHasError(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar ranking:', error);
        setHasError(true);
      })
      .finally(() => setLoading(false));
  }, [selectedType]);

  useEffect(() => {
    const label = stringTypeOptions.find((option) => option.value === selectedType)?.label ?? 'Violão';
    setWebSearchQuery(`encordoamento ${label.toLowerCase()}`);
    setWebSearchData(null);
    setWebSearchError(null);
  }, [selectedType]);

  const selectedTypeLabel = stringTypeOptions.find((option) => option.value === selectedType)?.label ?? 'Violão';
  const topProduct = products.find((product) => product.rank === 1) || products[0];

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

  const formatRating = (rating: number | null) =>
    rating === null ? 'Sem nota' : rating.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const formatWebPrice = (price: number | null) => {
    if (price === null) {
      return 'Preço indisponível';
    }

    return formatPrice(price);
  };

  const formatRatingCount = (count: number) => `${count.toLocaleString('pt-BR')} ${count === 1 ? 'avaliação' : 'avaliações'}`;

  const handleWebSearch = async () => {
    const normalizedQuery = webSearchQuery.trim();

    if (normalizedQuery.length < 3) {
      setWebSearchError('Digite pelo menos 3 caracteres para buscar na web.');
      return;
    }

    setWebSearchLoading(true);
    setWebSearchError(null);

    try {
      const response = await axios.get<WebSearchResponse>(`${API_BASE_URL}/strings/web-search`, {
        timeout: 25000,
        params: {
          q: normalizedQuery,
          type: selectedType,
          limit: 12,
        },
      });

      setWebSearchData(response.data);
    } catch (error) {
      console.error('Erro ao buscar na web:', error);
      setWebSearchError('Não foi possível buscar ofertas na web agora.');
    } finally {
      setWebSearchLoading(false);
    }
  };

  const renderTitleWithDictionaryTerms = (title: string): ReactNode => {
    const segments = splitTextByDictionaryTerms(title);

    return segments.map((segment, index) => {
      if (!segment.term) {
        return <span key={`${segment.text}-${index}`}>{segment.text}</span>;
      }

      return (
        <TermoDicionario key={`${segment.term}-${index}`} termo={segment.term} variant="inline">
          {segment.text}
        </TermoDicionario>
      );
    });
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <section className="cl-fade-up relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-[linear-gradient(125deg,_rgba(11,18,40,1),_rgba(31,42,82,1),_rgba(6,78,125,1))] p-6 text-white shadow-xl md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />
        <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Ranking atualizado</p>
        <h1 className="cl-text-balance relative z-10 mt-2 text-3xl font-black md:text-4xl">Top cordas para {selectedTypeLabel.toLowerCase()}</h1>
        <p className="cl-text-balance relative z-10 mt-3 max-w-3xl text-sm leading-6 text-cyan-50 md:text-base md:leading-7">
          Veja os produtos mais bem posicionados, compare preços e abra os termos técnicos no título para entender cada item com rapidez.
        </p>

        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {stringTypeOptions.map((option) => {
            const active = option.value === selectedType;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedType(option.value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'border-cyan-200 bg-cyan-500 text-white'
                    : 'border-white/40 bg-white/15 text-white hover:border-white/70 hover:bg-white/25'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="relative z-10 mt-5 flex flex-wrap gap-3">
          <a
            href={topProduct?.permalink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
              topProduct?.permalink ? 'bg-amber-500 hover:bg-amber-400' : 'pointer-events-none bg-white/30'
            }`}
          >
            Comprar Top 1
          </a>
        </div>
      </section>

      {hasError && (
        <section className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Não foi possível carregar o ranking agora. Tente novamente em alguns instantes.
        </section>
      )}

      <section className="cl-fade-up cl-delay-1 mt-6 rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 shadow-sm md:p-5">
        <button
          type="button"
          onClick={() => setIsWebPanelOpen((current) => !current)}
          className="flex w-full items-center justify-between rounded-xl bg-white/70 px-3 py-3 text-left transition hover:bg-white"
          aria-expanded={isWebPanelOpen}
          aria-controls="painel-busca-web"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Pesquisa web</p>
            <h2 className="cl-text-balance mt-1 text-lg font-bold text-slate-900">Buscar melhores preços na web</h2>
          </div>
          <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-700">
            {isWebPanelOpen ? '−' : '+'}
          </span>
        </button>

        {!isWebPanelOpen && (
          <p className="mt-3 text-sm text-cyan-900">
            Painel recolhido. Clique para abrir a busca de ofertas e comparar preços na web.
          </p>
        )}

        {isWebPanelOpen && (
          <div id="painel-busca-web" className="mt-3">
            <div className="grid gap-2 md:grid-cols-[1fr_auto]">
              <input
                type="text"
                value={webSearchQuery}
                onChange={(event) => setWebSearchQuery(event.target.value)}
                placeholder="Ex.: encordoamento violão 0.10"
                className="rounded-lg border border-cyan-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={handleWebSearch}
                disabled={webSearchLoading}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
                  webSearchLoading ? 'cursor-wait bg-cyan-400' : 'bg-cyan-600 hover:bg-cyan-500'
                }`}
              >
                {webSearchLoading ? 'Buscando...' : 'Buscar na web'}
              </button>
            </div>

            {webSearchError && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{webSearchError}</div>
            )}

            {webSearchData && (
              <div className="mt-4">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-cyan-800">
                  <span className="rounded-full bg-cyan-100 px-2.5 py-1">{webSearchData.total} ofertas</span>
                  <span className="rounded-full bg-cyan-100 px-2.5 py-1">Fontes: {webSearchData.providers.join(', ')}</span>
                  <span className="rounded-full bg-cyan-100 px-2.5 py-1">{webSearchData.cached ? 'Cache' : 'Tempo real'}</span>
                </div>

                {webSearchData.results.length === 0 ? (
                  <div className="rounded-lg border border-cyan-200 bg-white p-3 text-sm text-cyan-900">
                    Nenhuma oferta encontrada para esta busca.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {webSearchData.results.map((item) => (
                      <article key={item.id} className="rounded-xl border border-cyan-200 bg-white p-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={item.thumbnail || '/branding/logo-mark.svg'}
                            alt={item.title}
                            className="h-16 w-16 rounded-lg bg-slate-50 p-1 object-contain"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="mt-1 text-xs font-medium text-slate-600">{item.source}</p>
                            <p className="mt-1 text-lg font-extrabold text-cyan-700">{formatWebPrice(item.price)}</p>
                          </div>
                        </div>
                        <a
                          href={item.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-cyan-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
                        >
                          Ver oferta
                        </a>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      <section className="cl-fade-up cl-delay-2 mt-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-4 h-40 rounded-lg bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-full rounded bg-slate-200" />
                <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
            Sem resultados para <strong>{selectedTypeLabel}</strong> no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className={`group flex h-full flex-col rounded-2xl border bg-white transition hover:-translate-y-0.5 hover:shadow-lg ${
                  product.rank <= 3 ? 'border-amber-200 ring-1 ring-amber-100' : 'border-slate-200'
                }`}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white ${product.rank <= 3 ? 'bg-amber-500' : 'bg-slate-900'}`}>
                    #{product.rank}
                  </span>
                  <img src={product.thumbnail} alt={product.title} className="h-44 w-full bg-slate-50 p-4 object-contain sm:h-48" loading="lazy" />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h2 className="mt-1 min-h-12 text-sm font-semibold leading-5 text-slate-800">{renderTitleWithDictionaryTerms(product.title)}</h2>
                  <p className="mt-2 text-xs font-medium text-slate-600">
                    {formatRating(product.ratingAvg)} · {formatRatingCount(product.ratingCount)}
                  </p>
                  <p className="mt-3 text-2xl font-extrabold text-slate-900">{formatPrice(product.price)}</p>
                  <a
                    href={product.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Ver oferta
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}