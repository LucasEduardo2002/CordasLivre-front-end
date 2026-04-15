import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navBase = 'rounded-full px-4 py-2.5 text-sm font-semibold transition';

const navItem = ({ isActive }: { isActive: boolean }) =>
  `${navBase} ${isActive ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-200' : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-900'}`;

type NavLinkItem = {
  to: string;
  label: string;
  end?: boolean;
};

const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Início', end: true },
  { to: '/rank', label: 'Rank de cordas' },
  { to: '/aprenda', label: 'Aprenda' },
  { to: '/assistente-de-timbre', label: 'Assistente de timbre' },
  { to: '/vida-util', label: 'Vida útil' },
];

export function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-2xl border border-cyan-100 bg-white/95 px-4 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm backdrop-blur sm:hidden"
        aria-expanded={isMobileMenuOpen}
        aria-controls="main-nav-mobile-panel"
      >
        <span className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">≡</span>
          <span>Menu principal</span>
        </span>
        <span className="text-lg leading-none text-cyan-700">{isMobileMenuOpen ? '−' : '+'}</span>
      </button>

      <nav className="hidden flex-wrap items-center gap-2 rounded-full border border-cyan-100 bg-white/90 p-1 backdrop-blur sm:flex">
        {navLinks.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={navItem}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div
        className={`fixed inset-0 z-50 sm:hidden transition-opacity duration-300 ease-out ${
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-slate-950/45"
          aria-label="Fechar menu"
          onClick={() => setIsMobileMenuOpen(false)}
          tabIndex={isMobileMenuOpen ? 0 : -1}
        />

        <aside
          id="main-nav-mobile-panel"
          role="dialog"
          aria-modal="true"
          className={`absolute right-0 top-0 flex h-dvh w-[min(88vw,20rem)] flex-col overflow-y-auto border-l border-cyan-100 bg-white p-4 pb-6 shadow-2xl shadow-slate-300 transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">Navegação</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Escolha uma seção</p>
            </div>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-700 transition hover:bg-slate-200"
              aria-label="Fechar menu"
            >
              ×
            </button>
          </div>

          <div className="mt-4 grid gap-3 pr-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `${navBase} block w-full rounded-2xl px-4 py-3 text-left ${
                    isActive ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-200' : 'bg-cyan-50 text-slate-800 hover:bg-cyan-100 hover:text-cyan-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Acesso rápido</p>
            <p className="mt-1 leading-6">Use o menu lateral para navegar entre as páginas sem perda de espaço na tela.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}