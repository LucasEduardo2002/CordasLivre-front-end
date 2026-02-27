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

interface AiReviewData {
  title: string;
  summary: string;
  pros: string[];
  attentionPoints: string[];
  verdict: string;
  confidence: 'baixa' | 'media' | 'alta';
  generatedAt: string;
}

interface AiReviewResponse {
  product: {
    title: string;
    price: number;
    ratingAvg: number | null;
    ratingCount: number;
    type: StringType;
    permalink?: string;
  };
  review: AiReviewData;
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
const BRAND_LOGO_FULL = '/branding/logo-full.png';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedType, setSelectedType] = useState<StringType>('VIOLAO');
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiReviewLoading, setAiReviewLoading] = useState(false);
  const [aiReviewError, setAiReviewError] = useState<string | null>(null);
  const [aiReviewData, setAiReviewData] = useState<AiReviewData | null>(null);
  const [aiReviewProduct, setAiReviewProduct] = useState<Product | null>(null);

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

  const formatAiConfidence = (confidence: AiReviewData['confidence']) => {
    if (confidence === 'alta') return 'Alta';
    if (confidence === 'baixa') return 'Baixa';
    return 'Média';
  };

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

  const handleGenerateAiReview = async (product: Product) => {
    setAiModalOpen(true);
    setAiReviewLoading(true);
    setAiReviewError(null);
    setAiReviewData(null);
    setAiReviewProduct(product);

    try {
      const response = await axios.post<AiReviewResponse>(
        `${API_BASE_URL}/strings/ai-review`,
        {
          title: product.title,
          price: product.price,
          ratingAvg: product.ratingAvg,
          ratingCount: product.ratingCount,
          type: product.type,
          permalink: product.permalink,
        },
        { timeout: 25000 },
      );

      setAiReviewData(response.data.review);
    } catch (error) {
      console.error('Erro ao gerar avaliação IA:', error);
      setAiReviewError('Não foi possível gerar a avaliação IA agora. Tente novamente em instantes.');
    } finally {
      setAiReviewLoading(false);
    }
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
  const selectedTypeLabel = stringTypeOptions.find((option) => option.value === selectedType)?.label ?? 'Violão';
  const hasTopProduct = Boolean(topProduct?.permalink);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <img
              src={BRAND_LOGO_FULL}
              alt="Logo CordasLivre"
              className="h-10 w-auto max-w-[220px] object-contain md:h-12 md:max-w-[300px]"
              loading="eager"
              decoding="async"
            />
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
        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-xl md:p-10">
          <div>
            <img
              src={BRAND_LOGO_FULL}
              alt="Logo CordasLivre"
              className="mb-5 h-16 w-auto max-w-full object-contain md:h-20"
              loading="eager"
              decoding="async"
            />
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              Encontre a melhor corda para seu instrumento.
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-slate-200 md:text-base">
              Veja o Top 10, compare preços e use o botão <strong>Gerar avaliação IA</strong> para analisar cada produto.
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
        </section>

        <section className="mt-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-4 shadow-md md:p-5">
          <div className="mb-4 flex items-start justify-between gap-3 md:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide text-indigo-700">Passo 1</p>
              <h3 className="text-lg font-extrabold text-slate-900 md:text-xl">Selecione seu instrumento</h3>
            </div>
          </div>
          <div className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2">
            {stringTypeOptions.map((option) => {
              const active = option.value === selectedType;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedType(option.value)}
                  className={`snap-start whitespace-nowrap rounded-full border px-4 py-3 text-sm font-bold transition md:py-2.5 ${
                    active
                      ? 'border-indigo-700 bg-indigo-700 text-white shadow-sm'
                      : 'border-indigo-200 bg-white text-indigo-800 hover:border-indigo-300 hover:bg-indigo-100'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs font-medium text-indigo-800">
            O ranking abaixo é atualizado conforme o instrumento selecionado.
          </p>
        </section>

        {hasError && (
          <section className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Não foi possível carregar os produtos agora. Verifique se o back-end está ativo e acessível em {API_BASE_URL}.
          </section>
        )}

        <section id="ranking" className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Top 10 por instrumento</p>
              <h3 className="text-2xl font-extrabold md:text-3xl">Top 10 de cordas para {selectedTypeLabel.toLowerCase()}</h3>
            </div>
            <p className="text-sm font-semibold text-slate-700">Compare e gere avaliação IA em cada item</p>
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
                      {product.rank <= 3 ? 'Top destaque' : 'Produto em destaque'}
                    </p>
                    <h4 className="mt-2 min-h-12 text-sm font-semibold leading-5 text-slate-800">
                      {product.title}
                    </h4>
                    <p className="mt-2 text-xs font-medium text-slate-600">
                      ⭐ {formatRating(product.ratingAvg)} · {formatRatingCount(product.ratingCount)}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-indigo-700">🧠 Avaliação IA disponível</p>
                    {hasExcellentRating(product.ratingAvg) && (
                      <span className="mt-2 inline-flex w-fit items-center rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-800">
                        Nota excelente
                      </span>
                    )}
                    <p className="mt-3 text-2xl font-extrabold text-slate-900">{formatPrice(product.price)}</p>
                    <div className="mt-4 grid grid-cols-1 gap-2">
                      <a
                        href={product.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
                      >
                        Comprar agora
                      </a>
                      <button
                        type="button"
                        onClick={() => handleGenerateAiReview(product)}
                        className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
                      >
                        Gerar avaliação IA
                      </button>
                    </div>
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

      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Avaliação por IA</p>
                <h4 className="mt-1 text-lg font-extrabold text-slate-900 md:text-xl">
                  {aiReviewProduct?.title ?? 'Produto selecionado'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setAiModalOpen(false)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Fechar
              </button>
            </div>

            {aiReviewLoading ? (
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Gerando avaliação inteligente deste produto...
              </div>
            ) : aiReviewError ? (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{aiReviewError}</div>
            ) : aiReviewData ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Resumo</p>
                  <p className="mt-2 text-sm text-slate-800">{aiReviewData.summary}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">Pontos fortes</p>
                    <ul className="mt-2 space-y-1 text-sm text-emerald-900">
                      {aiReviewData.pros.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Pontos de atenção</p>
                    <ul className="mt-2 space-y-1 text-sm text-amber-900">
                      {aiReviewData.attentionPoints.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Veredito</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{aiReviewData.verdict}</p>
                  <p className="mt-3 text-xs text-slate-500">
                    Confiança da análise: <strong>{formatAiConfidence(aiReviewData.confidence)}</strong>
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} CordasLivre. Vitrine inteligente para compras com confiança.</p>
          <p>Ao clicar em uma oferta, você será redirecionado ao marketplace.</p>
        </div>
      </footer>
    </div>
  );
}