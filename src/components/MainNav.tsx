import { useState } from 'react';
import { NavLink } from 'react-router-dom';

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

  return (
    <div className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setIsMobileMenuOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-2xl border border-cyan-100 bg-white/95 px-4 py-3 text-left text-sm font-semibold text-slate-800 shadow-sm backdrop-blur sm:hidden"
        aria-expanded={isMobileMenuOpen}
        aria-controls="main-nav-mobile-panel"
      >
        <span>Menu</span>
        <span className="text-lg leading-none text-cyan-700">{isMobileMenuOpen ? '−' : '+'}</span>
      </button>

      <nav className="hidden flex-wrap items-center gap-2 rounded-full border border-cyan-100 bg-white/90 p-1 backdrop-blur sm:flex">
        {navLinks.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={navItem}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {isMobileMenuOpen && (
        <div
          id="main-nav-mobile-panel"
          className="absolute right-0 top-full z-30 mt-3 w-[min(92vw,24rem)] rounded-3xl border border-cyan-100 bg-white p-3 shadow-2xl shadow-slate-200 sm:hidden"
        >
          <div className="grid gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `${navBase} block w-full text-center ${
                    isActive ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-200' : 'bg-cyan-50 text-slate-800 hover:bg-cyan-100 hover:text-cyan-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}