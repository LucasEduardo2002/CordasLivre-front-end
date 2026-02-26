import { useEffect, useState } from 'react';
import axios from 'axios';

type StringType = 'VIOLAO' | 'GUITARRA' | 'CONTRABAIXO' | 'CAVAQUINHO' | 'VIOLA_CAIPIRA' | 'VIOLINO';

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

const stringTypeOptions: Array<{ value: StringType; label: string }> = [
  { value: 'VIOLAO', label: 'Violão' },
  { value: 'GUITARRA', label: 'Guitarra' },
  { value: 'CONTRABAIXO', label: 'Contrabaixo' },
  { value: 'CAVAQUINHO', label: 'Cavaquinho' },
  { value: 'VIOLA_CAIPIRA', label: 'Viola Caipira' },
  { value: 'VIOLINO', label: 'Violino' },
];

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

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedType, setSelectedType] = useState<StringType>('VIOLAO');

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

  const formatRating = (rating: number | null) =>
    rating === null ? 'Sem nota' : rating.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const hasExcellentRating = (rating: number | null) => rating !== null && rating >= 4.8;

  const formatRatingCount = (count: number) =>
    `${count.toLocaleString('pt-BR')} ${count === 1 ? 'avaliação' : 'avaliações'}`;

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchProductsWithRetry = async (type: StringType, retries = 5, delayMs = 2000): Promise<Product[]> => {
    let lastError: unknown;

    for (let attempt = 1; attempt <= retries; attempt++) {
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

  useEffect(() => {
    setLoading(true);
    fetchProductsWithRetry(selectedType)
      .then((data) => {
        setProducts(data);
        setHasError(false);
      })
      .catch((err) => {
        setHasError(true);
        console.error('Erro ao conectar com o Back-end após tentativas:', err);
      })
      .finally(() => setLoading(false));
  }, [selectedType]);

  const topProduct = products.find((product) => product.rank === 1) || products[0];
  const lowestPrice = products.length ? Math.min(...products.map((product) => product.price)) : 0;
  const highestPrice = products.length ? Math.max(...products.map((product) => product.price)) : 0;
  const selectedTypeLabel = stringTypeOptions.find((option) => option.value === selectedType)?.label ?? 'Violão';
  const hasTopProduct = Boolean(topProduct?.permalink);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-lg text-white">🎸</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Top 10 por instrumento</p>
              <h1 className="text-lg font-bold md:text-xl">CordasLivre</h1>
            </div>
          </div>
          <a
            href={hasTopProduct ? topProduct?.permalink : '#ranking'}
            target={hasTopProduct ? '_blank' : undefined}
            rel={hasTopProduct ? 'noopener noreferrer' : undefined}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
              hasTopProduct ? 'bg-slate-900 hover:bg-slate-700' : 'cursor-not-allowed bg-slate-500'
            }`}
          >
            Comprar melhor oferta
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
        <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-xl md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div>
            <p className="mb-3 inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
              Ofertas quentes atualizadas automaticamente
            </p>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              Compre as cordas mais vendidas e bem avaliadas.
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-200 md:text-base">
              Selecione seu instrumento e vá direto para o Top 10 com maior potencial de compra agora.
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-amber-200">
              Estoques e preços podem mudar rapidamente.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#ranking"
                className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Ver Top 10 agora
              </a>
              <a
                href={hasTopProduct ? topProduct?.permalink : '#ranking'}
                target={hasTopProduct ? '_blank' : undefined}
                rel={hasTopProduct ? 'noopener noreferrer' : undefined}
                className={`rounded-lg border px-5 py-2.5 text-sm font-semibold text-white transition ${
                  hasTopProduct ? 'border-white/40 hover:bg-white/10' : 'cursor-not-allowed border-white/20 text-white/70'
                }`}
              >
                  Comprar Top 1 agora
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-end">
            <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20">
              <p className="text-xs uppercase tracking-wide text-slate-200">Produtos no ranking</p>
              <p className="mt-2 text-3xl font-extrabold">10</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20">
              <p className="text-xs uppercase tracking-wide text-slate-200">Atualização</p>
              <p className="mt-2 text-xl font-bold md:text-2xl">Automática</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20">
              <p className="text-xs uppercase tracking-wide text-slate-200">Marketplace</p>
              <p className="mt-2 text-lg font-bold">Mercado Livre</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20">
              <p className="text-xs uppercase tracking-wide text-slate-200">Faixa de preço</p>
              <p className="mt-2 text-sm font-bold md:text-base">
                {products.length ? `${formatPrice(lowestPrice)} a ${formatPrice(highestPrice)}` : 'Carregando...'}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 md:grid-cols-3 md:text-sm">
          <p className="rounded-lg bg-slate-50 px-3 py-2 font-medium">Top 10 segmentado para você comprar rápido, sem perder tempo pesquisando.</p>
          <p className="rounded-lg bg-slate-50 px-3 py-2 font-medium">Produtos ranqueados por nota e volume real de avaliações.</p>
          <p className="rounded-lg bg-slate-50 px-3 py-2 font-medium">Clique e vá direto para a oferta com maior chance de acerto.</p>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Filtrar tipo de corda</p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {stringTypeOptions.map((option) => {
              const active = option.value === selectedType;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedType(option.value)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        {hasError && (
          <section className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Não foi possível carregar os produtos agora. Verifique se o back-end está ativo e acessível em {API_BASE_URL}.
          </section>
        )}

        <section id="ranking" className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ranking de conversão</p>
              <h3 className="text-2xl font-extrabold md:text-3xl">Top 10 de cordas para {selectedTypeLabel.toLowerCase()}</h3>
            </div>
            <p className="text-sm font-semibold text-slate-700">Pronto para comprar em 1 clique</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="mb-4 h-40 rounded-lg bg-slate-200" />
                  <div className="h-3 w-16 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
                  <div className="mt-4 h-10 rounded-lg bg-slate-200" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600">
              Não encontramos itens suficientes para <strong>{selectedTypeLabel}</strong> neste momento.
              Tente outra categoria ou atualize novamente em instantes.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-0.5 hover:shadow-xl ${
                    product.rank <= 3
                      ? 'border-amber-200 ring-1 ring-amber-100 hover:border-amber-300'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="relative">
                    <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white ${product.rank <= 3 ? 'bg-amber-500' : 'bg-slate-900'}`}>
                      #{product.rank}
                    </span>
                    {product.rank <= 3 && (
                      <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                        Top {product.rank}
                      </span>
                    )}
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-44 w-full bg-slate-50 p-4 object-contain sm:h-48"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {product.rank <= 3 ? 'Alta conversão' : 'Produto em destaque'}
                    </p>
                    <h4 className="mt-2 min-h-12 text-sm font-semibold leading-5 text-slate-800">
                      {product.title}
                    </h4>
                    <p className="mt-2 text-xs font-medium text-slate-600">
                      ⭐ {formatRating(product.ratingAvg)} · {formatRatingCount(product.ratingCount)}
                    </p>
                    {hasExcellentRating(product.ratingAvg) && (
                      <span className="mt-2 inline-flex w-fit items-center rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                        Nota excelente
                      </span>
                    )}
                    <p className="mt-3 text-2xl font-extrabold text-slate-900">{formatPrice(product.price)}</p>
                    <a
                      href={product.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
                    >
                      Comprar agora
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h3 className="text-xl font-extrabold md:text-2xl">Escolha mais rápido. Compre melhor.</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
            <p className="rounded-lg bg-slate-50 p-4">Veja primeiro os produtos com melhor prova social para reduzir risco na compra.</p>
            <p className="rounded-lg bg-slate-50 p-4">Filtre por instrumento e encontre a melhor corda para seu perfil em segundos.</p>
            <p className="rounded-lg bg-slate-50 p-4">Acesse a oferta e finalize no Mercado Livre com total segurança.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} CordasLivre. Vitrine inteligente para compras com confiança.</p>
          <p>Ao clicar em uma oferta, você será redirecionado ao marketplace.</p>
        </div>
      </footer>
    </div>
  );
}