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

  const selectedTypeLabel = stringTypeOptions.find((option) => option.value === selectedType)?.label ?? 'Violao';
  const topProduct = products.find((product) => product.rank === 1) || products[0];

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

  const formatRating = (rating: number | null) =>
    rating === null ? 'Sem nota' : rating.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const formatRatingCount = (count: number) => `${count.toLocaleString('pt-BR')} ${count === 1 ? 'avaliacao' : 'avaliacoes'}`;

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
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Ranking atualizado</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Top cordas para {selectedTypeLabel.toLowerCase()}</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Veja os produtos mais bem posicionados, compare preco e abra os termos tecnicos no titulo para entender cada item com rapidez.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {stringTypeOptions.map((option) => {
            const active = option.value === selectedType;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedType(option.value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={topProduct?.permalink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
              topProduct?.permalink ? 'bg-amber-500 hover:bg-amber-400' : 'pointer-events-none bg-slate-400'
            }`}
          >
            Comprar Top 1
          </a>
        </div>
      </section>

      {hasError && (
        <section className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Nao foi possivel carregar o ranking agora. Tente novamente em alguns instantes.
        </section>
      )}

      <section className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-4 h-40 rounded-lg bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-full rounded bg-slate-200" />
                <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
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