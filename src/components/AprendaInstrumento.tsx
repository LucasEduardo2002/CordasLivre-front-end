import type { ReactNode } from 'react';
import { TermoDicionario } from './TermoDicionario';

type LearningCard = {
  eyebrow: string;
  title: string;
  body: ReactNode;
  tone: 'amber' | 'indigo' | 'emerald';
};

const learningCards: LearningCard[] = [
  {
    eyebrow: 'Material',
    title: 'Bronze 80/20',
    tone: 'amber',
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
    body: (
      <>
        Adiciona fósforo à liga e tende a entregar mais calor, sustain e equilíbrio tonal. Em muitos modelos, aparece ao lado de
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
    body: (
      <>
        Quanto maior a tensão, maior a resistência sentida na mão e no braço do instrumento. Por isso,
        <TermoDicionario termo="Nylon" variant="inline">
          nylon
        </TermoDicionario>{' '}
        costuma ser mais macio, enquanto cordas de aço exigem mais estrutura e regulagem.
      </>
    ),
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

const anatomyRows = [
  {
    label: 'Calibre',
    value: '0.10 • 0.11 • 0.12',
    description: 'Define a espessura e muda a sensação de toque.',
  },
  {
    label: 'Liga',
    value: 'Bronze 80/20 / Phosphor Bronze',
    description: 'Afeta brilho, resposta e duração do timbre.',
  },
  {
    label: 'Tensão',
    value: 'Baixa • Média • Alta',
    description: 'Influencia o esforço na mão e no braço do violão.',
  },
];

export function AprendaInstrumento() {
  return (
    <section
      id="aprenda"
      className="cl-fade-up cl-delay-1 mt-6 overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)]"
    >
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.2),_transparent_36%),linear-gradient(135deg,_rgba(11,18,40,1),_rgba(31,42,82,1))] p-6 text-white md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">Guia Rápido</p>
          <h3 className="mt-3 text-2xl font-black leading-tight md:text-4xl">Aprenda sobre seu instrumento</h3>
          <p className="mt-4 max-w-2xl text-sm text-slate-200 md:text-base">
            Antes de comprar, você pode entender o que significam os termos do anúncio sem sair da tela. Passe o mouse nos
            destaques para ver a definição do dicionário em tempo real.
          </p>
        </div>

        <div className="bg-slate-50 p-6 md:p-8">
          <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">Anatomia da corda</p>
            <div className="mt-4 space-y-4">
              {anatomyRows.map((row) => (
                <div key={row.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-cyan-700 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      {row.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{row.value}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{row.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-t border-cyan-100 p-6 md:grid-cols-3 md:p-8">
        {learningCards.map((card) => (
          <article key={card.title} className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${toneClasses[card.tone]}`}>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">{card.eyebrow}</p>
            <div className="mt-3 flex items-start justify-between gap-3">
              <h4 className="text-lg font-black leading-tight">{card.title}</h4>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${toneBadgeClasses[card.tone]}`}>
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