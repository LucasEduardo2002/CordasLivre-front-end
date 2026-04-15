import { AprendaInstrumento } from '../components/AprendaInstrumento';

export function LearnPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-5 md:px-6 md:py-10">
      <section className="cl-fade-up relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-[linear-gradient(125deg,_rgba(11,18,40,1),_rgba(31,42,82,1),_rgba(6,78,125,1))] p-5 text-white shadow-xl sm:p-6 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-amber-300/20 blur-3xl" />

        <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Guia rápido</p>
        <h1 className="relative z-10 mt-2 text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
          Aprenda sobre seu instrumento
        </h1>
        <p className="relative z-10 mt-3 max-w-3xl text-sm leading-6 text-cyan-50 md:text-base">
          Antes de comprar, você pode entender os termos do anúncio sem sair da tela. Toque ou passe o mouse nos destaques
          para ver a definição do dicionário em tempo real.
        </p>
      </section>

      <AprendaInstrumento />
    </main>
  );
}
