import { AprendaInstrumento } from '../components/AprendaInstrumento';

export function LearnPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Guia rápido</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">Aprenda sobre seu instrumento</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 md:text-base">
          Entenda os termos mais comuns de encordoamento e tome decisões de compra com mais segurança.
        </p>
      </section>

      <AprendaInstrumento />
    </main>
  );
}