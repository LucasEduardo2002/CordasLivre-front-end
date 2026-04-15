import type { ReactNode } from 'react';
import { TermoDicionario } from './TermoDicionario';

type LearningCard = {
  eyebrow: string;
  title: string;
  body: ReactNode;
  tone: 'amber' | 'indigo' | 'emerald';
  icon: ReactNode;
};

type AnatomyRow = {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
};

type Tip = {
  title: string;
  body: string;
  icon: ReactNode;
};

const iconClass = 'h-4 w-4';

const IconGauge = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M4 14a8 8 0 1 1 16 0" />
    <path d="m12 12 4-3" />
  </svg>
);

const IconDrop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M12 3c3 4 6 7 6 10a6 6 0 1 1-12 0c0-3 3-6 6-10Z" />
  </svg>
);

const IconHand = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M7 12V7a1 1 0 1 1 2 0v4" />
    <path d="M9 11V6a1 1 0 1 1 2 0v5" />
    <path d="M11 11V5a1 1 0 1 1 2 0v6" />
    <path d="M13 11V7a1 1 0 1 1 2 0v6c0 3-2 6-5 6S5 17 5 14v-2a1 1 0 1 1 2 0Z" />
  </svg>
);

const IconRuler = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="m4 14 6 6L20 10l-6-6Z" />
    <path d="m11 7 6 6" />
  </svg>
);

const IconLab = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M10 3v5l-4 7a3 3 0 0 0 3 4h6a3 3 0 0 0 3-4l-4-7V3" />
    <path d="M9 8h6" />
  </svg>
);

const IconBalance = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M12 4v15" />
    <path d="M7 8h10" />
    <path d="m7 8-3 5h6Z" />
    <path d="m17 8-3 5h6Z" />
  </svg>
);

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconMusic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M9 17a2 2 0 1 1-2-2c1.1 0 2 .9 2 2Z" />
    <path d="M17 15a2 2 0 1 1-2-2c1.1 0 2 .9 2 2Z" />
    <path d="M9 17V6l8-2v11" />
  </svg>
);

const IconTool = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="m14 6 4 4" />
    <path d="m5 19 7-7 2 2-7 7H5Z" />
    <path d="M13 5a3 3 0 0 1 4 4" />
  </svg>
);

const IconCompass = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
    <path d="m10 10 6-2-2 6-6 2 2-6Z" />
  </svg>
);

const learningCards: LearningCard[] = [
  {
    eyebrow: 'Material',
    title: 'Bronze 80/20',
    tone: 'amber',
    icon: <IconGauge />,
    body: (
      <>
        E uma liga com 80% de cobre e 20% de zinco. O resultado costuma ser um som mais brilhante e com ataque claro,
        util para quem quer definicao nas notas e nas palhetadas.
      </>
    ),
  },
  {
    eyebrow: 'Equilibrio',
    title: 'Phosphor Bronze',
    tone: 'indigo',
    icon: <IconDrop />,
    body: (
      <>
        Adiciona fosforo a liga e tende a entregar mais calor, sustain e equilibrio tonal. Em muitos modelos, aparece ao lado de{' '}
        <TermoDicionario termo="0.10" variant="inline">
          0.10
        </TermoDicionario>{' '}
        para indicar um conjunto leve e confortavel.
      </>
    ),
  },
  {
    eyebrow: 'Conforto',
    title: 'Tensao e braco do violao',
    tone: 'emerald',
    icon: <IconHand />,
    body: (
      <>
        Quanto maior a tensao, maior a resistencia sentida na mao e no braco do instrumento. Por isso,{' '}
        <TermoDicionario termo="Nylon" variant="inline">
          nylon
        </TermoDicionario>{' '}
        costuma ser mais macio, enquanto cordas de aco exigem mais estrutura e regulagem.
      </>
    ),
  },
];

const anatomyRows: AnatomyRow[] = [
  {
    label: 'Calibre',
    value: '0.10 / 0.11 / 0.12',
    description: 'Define a espessura e muda a sensacao de toque.',
    icon: <IconRuler />,
  },
  {
    label: 'Liga',
    value: 'Bronze 80/20 / Phosphor Bronze',
    description: 'Afeta brilho, resposta e duracao do timbre.',
    icon: <IconLab />,
  },
  {
    label: 'Tensao',
    value: 'Baixa / Media / Alta',
    description: 'Influencia o esforco na mao e no braco do violao.',
    icon: <IconBalance />,
  },
];

const quickTips: Tip[] = [
  {
    title: 'Comece pelo seu nivel',
    body: 'Iniciante: priorize conforto (calibres leves). Intermediario: experimente tensao media para mais projecao.',
    icon: <IconTarget />,
  },
  {
    title: 'Olhe o estilo musical',
    body: 'Dedilhado e voz pedem equilibrio; batida forte combina com ataque mais brilhante.',
    icon: <IconMusic />,
  },
  {
    title: 'Considere a manutencao',
    body: 'Suor e umidade aceleram desgaste. Limpeza pos-uso aumenta a vida util das cordas.',
    icon: <IconTool />,
  },
];

const toneClasses = {
  amber: 'border-cyan-200 bg-cyan-50/70 text-slate-900',
  indigo: 'border-cyan-200 bg-cyan-50/70 text-slate-900',
  emerald: 'border-cyan-200 bg-cyan-50/70 text-slate-900',
};

const toneBadgeClasses = {
  amber: 'bg-cyan-700 text-white',
  indigo: 'bg-cyan-700 text-white',
  emerald: 'bg-cyan-700 text-white',
};

export function AprendaInstrumento() {
  return (
    <section
      id="aprenda"
      className="cl-fade-up cl-delay-1 mt-6 overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)]"
    >
      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:p-8">
        <div className="rounded-3xl border border-cyan-100 bg-slate-50 p-4 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">Anatomia da corda</p>
              <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">O que observar no anuncio</h3>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700"
            >
              <IconCompass />
            </span>
          </div>

          <div className="mt-5 space-y-3">
            {anatomyRows.map((row) => (
              <div key={row.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700"
                  >
                    {row.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900">{row.label}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{row.value}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{row.description}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-cyan-100 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">Checklist rapido</p>
          <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">Escolha com mais seguranca</h3>
          <div className="mt-5 grid gap-3">
            {quickTips.map((tip) => (
              <article key={tip.title} className="rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700"
                  >
                    {tip.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{tip.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-700">{tip.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>

      <div className="grid gap-3 border-t border-cyan-100 bg-slate-50 p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-3 lg:p-8">
        {learningCards.map((card) => (
          <article
            key={card.title}
            className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${toneClasses[card.tone]}`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">{card.eyebrow}</p>
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-cyan-700"
              >
                {card.icon}
              </span>
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <h4 className="text-lg font-black leading-tight text-slate-900">{card.title}</h4>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${toneBadgeClasses[card.tone]}`}
              >
                {card.eyebrow}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
