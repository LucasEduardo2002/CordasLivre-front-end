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

const IconFrequency = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M4 12h2l2-4 2 8 2-6 2 4h2" />
    <path d="M4 20h16" />
  </svg>
);

const IconHarmony = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <circle cx="8" cy="8" r="2" />
    <circle cx="16" cy="8" r="2" />
    <circle cx="12" cy="14" r="2" />
    <path d="M8 10l4 3 4-3" />
  </svg>
);

const IconComfort = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M6 10c0-2 1-3 2-4l2-2" />
    <path d="M18 10c0-2-1-3-2-4l-2-2" />
    <path d="M7 8v10c0 2 2 3 5 3s5-1 5-3V8" />
  </svg>
);

const IconGauge = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M3 12h4" />
    <path d="M17 12h4" />
    <path d="M8 16.2l-2.8 2.8" />
    <path d="M18.8 5.2l2.8 2.8" />
    <circle cx="12" cy="12" r="5" />
    <path d="M12 12l3-3" />
  </svg>
);

const IconMaterial = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M4 6l8-3 8 3v9c0 4-8 5-8 5s-8-1-8-5V6Z" />
    <path d="M12 3v9" />
  </svg>
);

const IconTension = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <path d="M4 6c0-1 2-2 8-2s8 1 8 2" />
    <path d="M12 4v16" />
    <path d="M4 6v10c0 1-2 2-8 2" />
    <path d="M20 6v10c0 1 2 2 8 2" />
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

const IconGuitar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass} aria-hidden="true">
    <circle cx="12" cy="16" r="3" />
    <path d="M12 3v10" />
    <path d="M8 7h8" />
    <path d="M9 11h6" />
    <path d="M10 14h4" />
  </svg>
);

const learningCards: LearningCard[] = [
  {
    eyebrow: 'Material',
    title: 'Bronze 80/20',
    tone: 'amber',
    icon: <IconFrequency />,
    body: (
      <>
        É uma liga com 80% de cobre e 20% de zinco. O resultado costuma ser um som mais brilhante e com ataque claro,
        útil para quem quer definição nas notas e nas palhetadas.
      </>
    ),
  },
  {
    eyebrow: 'Equilíbrio',
    title: 'Phosphor Bronze',
    tone: 'indigo',
    icon: <IconHarmony />,
    body: (
      <>
        Adiciona fósforo à liga e tende a entregar mais calor, sustain e equilíbrio tonal. Em muitos modelos, aparece ao lado de{' '}
        <TermoDicionario termo="0.10" variant="inline">
          0.10
        </TermoDicionario>{' '}
        para indicar um conjunto leve e confortável.
      </>
    ),
  },
  {
    eyebrow: 'Conforto',
    title: 'Tensão e braço do violão',
    tone: 'emerald',
    icon: <IconComfort />,
    body: (
      <>
        Quanto maior a tensão, maior a resistência sentida na mão e no braço do instrumento. Por isso,{' '}
        <TermoDicionario termo="Nylon" variant="inline">
          nylon
        </TermoDicionario>{' '}
        costuma ser mais macio, enquanto cordas de aço exigem mais estrutura e regulagem.
      </>
    ),
  },
];

const anatomyRows: AnatomyRow[] = [
  {
    label: 'Calibre',
    value: '0.10 / 0.11 / 0.12',
    description: 'Define a espessura e muda a sensação de toque.',
    icon: <IconGauge />,
  },
  {
    label: 'Liga',
    value: 'Bronze 80/20 / Phosphor Bronze',
    description: 'Afeta brilho, resposta e duração do timbre.',
    icon: <IconMaterial />,
  },
  {
    label: 'Tensão',
    value: 'Baixa / Média / Alta',
    description: 'Influencia o esforço na mão e no braço do violão.',
    icon: <IconTension />,
  },
];

const quickTips: Tip[] = [
  {
    title: 'Comece pelo seu nível',
    body: 'Iniciante: priorize conforto (calibres leves). Intermediário: experimente tensão média para mais projeção.',
    icon: <IconTarget />,
  },
  {
    title: 'Olhe o estilo musical',
    body: 'Dedilhado e voz pedem equilíbrio; batida forte combina com ataque mais brilhante.',
    icon: <IconMusic />,
  },
  {
    title: 'Considere a manutenção',
    body: 'Suor e umidade aceleram desgaste. Limpeza pós-uso aumenta a vida útil das cordas.',
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
              <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">O que observar no anúncio</h3>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700"
            >
              <IconGuitar />
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
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">Checklist rápido</p>
          <h3 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">Escolha com mais segurança</h3>
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
