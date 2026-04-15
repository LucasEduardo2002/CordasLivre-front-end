import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Rank de cordas',
    description: 'Veja os produtos mais bem posicionados e compare ofertas na web.',
    path: '/rank',
    tone: 'bg-slate-900 text-white',
  },
  {
    title: 'Aprenda sobre seu instrumento',
    description: 'Entenda calibres, materiais e termos técnicos com linguagem simples.',
    path: '/aprenda',
    tone: 'bg-amber-500 text-slate-950',
  },
  {
    title: 'Assistente de timbre',
    description: 'Receba uma recomendação guiada com base no seu instrumento, nível e estilo.',
    path: '/assistente-de-timbre',
    tone: 'bg-indigo-600 text-white',
  },
  {
    title: 'Vida útil das cordas',
    description: 'Registre a troca, acompanhe o desgaste e receba alertas em português.',
    path: '/vida-util',
    tone: 'bg-emerald-600 text-white',
  },
];

export function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <section className="rounded-3xl bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.14),_transparent_28%),linear-gradient(135deg,_rgba(15,23,42,1),_rgba(30,41,59,1))] p-6 text-white shadow-xl md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-amber-300">CordasLivre</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight md:text-5xl">Escolha cordas com mais clareza, menos ruído e mais confiança.</h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-200 md:text-base">
          Uma experiência simples para comparar ranking, aprender os termos técnicos, descobrir a melhor pegada e acompanhar a vida útil das cordas.
        </p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            className={`rounded-3xl p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${card.tone}`}
          >
            <h2 className="text-xl font-black">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 opacity-90">{card.description}</p>
            <span className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
              Abrir página
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}