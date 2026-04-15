import { Link } from 'react-router-dom';

type IconProps = {
  className?: string;
};

function RankIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 5v14M10 11v8M15 8v11M20 4v15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LearnIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7.5L12 4l8 3.5L12 11 4 7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 9.5V15c0 1.7 2.24 3 5 3s5-1.3 5-3V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ToneIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M10 5v10.5a3.5 3.5 0 1 1-2-3.15V7.1L19 5v8.5a3.5 3.5 0 1 1-2-3.15V3.9L10 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MaintenanceIcon({ className = 'h-6 w-6' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M8 3v3M16 3v3M4 10h16M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9 14 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cards = [
  {
    title: 'Rank de cordas',
    description: 'Veja os produtos mais bem posicionados e compare ofertas na web.',
    path: '/rank',
    tone: 'from-slate-900 to-slate-700 text-white',
    badge: 'Comparação rápida',
    icon: RankIcon,
  },
  {
    title: 'Aprenda sobre seu instrumento',
    description: 'Entenda calibres, materiais e termos técnicos com linguagem simples.',
    path: '/aprenda',
    tone: 'from-amber-400 to-orange-400 text-slate-950',
    badge: 'Conteúdo didático',
    icon: LearnIcon,
  },
  {
    title: 'Assistente de timbre',
    description: 'Receba uma recomendação guiada com base no seu instrumento, nível e estilo.',
    path: '/assistente-de-timbre',
    tone: 'from-indigo-700 to-blue-600 text-white',
    badge: 'Recomendação inteligente',
    icon: ToneIcon,
  },
  {
    title: 'Vida útil das cordas',
    description: 'Registre a troca, acompanhe o desgaste e receba alertas em português.',
    path: '/vida-util',
    tone: 'from-emerald-700 to-teal-600 text-white',
    badge: 'Alertas e histórico',
    icon: MaintenanceIcon,
  },
];

const quickFlow = [
  'Escolha o seu instrumento e veja o ranking recomendado.',
  'Entenda os termos técnicos com explicações objetivas.',
  'Receba sugestão de timbre e acompanhe a vida útil das cordas.',
];

export function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <section className="cl-fade-up relative overflow-hidden rounded-3xl border border-slate-700/20 bg-[linear-gradient(125deg,_rgba(7,18,37,1),_rgba(24,37,67,1),_rgba(9,53,88,1))] p-5 text-white shadow-xl sm:p-6 md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

        <p className="relative z-10 text-xs font-bold uppercase tracking-[0.32em] text-amber-300">CordasLivre</p>
        <h1 className="cl-text-balance relative z-10 mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
          Compre encordoamento com mais precisão e menos incerteza.
        </h1>
        <p className="cl-text-balance relative z-10 mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-[15px] md:text-base md:leading-7">
          Plataforma pensada para quem quer decidir rápido: ranking claro, explicações objetivas, recomendação de timbre e monitoramento da vida útil.
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card, index) => (
          <Link
            key={card.title}
            to={card.path}
            className={`cl-fade-up ${index === 0 ? 'cl-delay-1' : index === 1 ? 'cl-delay-2' : 'cl-delay-3'} group relative overflow-hidden rounded-3xl bg-gradient-to-br p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 ${card.tone}`}
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 transition duration-300 group-hover:scale-110" />
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                <card.icon className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide">{card.badge}</span>
            </div>
            <h2 className="cl-text-balance relative z-10 mt-4 text-xl font-black">{card.title}</h2>
            <p className="cl-text-balance relative z-10 mt-2 text-sm leading-6 opacity-95">{card.description}</p>
            <span className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
              Abrir página
              <ArrowIcon className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>

      <section className="cl-fade-up cl-delay-2 mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">Como funciona</p>
        <h2 className="cl-text-balance mt-2 text-2xl font-black text-slate-900 md:text-3xl">Comece em menos de 2 minutos</h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {quickFlow.map((item, index) => (
            <article key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white">
              <p className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{index + 1}</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}