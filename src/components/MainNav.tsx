import { NavLink } from 'react-router-dom';

const navBase = 'rounded-full px-4 py-2 text-sm font-semibold transition';

const navItem = ({ isActive }: { isActive: boolean }) =>
  `${navBase} ${isActive ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-200' : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-900'}`;

export function MainNav() {
  return (
    <nav className="flex flex-wrap items-center gap-2 rounded-full border border-cyan-100 bg-white/90 p-1 backdrop-blur">
      <NavLink to="/" end className={navItem}>
        Início
      </NavLink>
      <NavLink to="/rank" className={navItem}>
        Rank de cordas
      </NavLink>
      <NavLink to="/aprenda" className={navItem}>
        Aprenda
      </NavLink>
      <NavLink to="/assistente-de-timbre" className={navItem}>
        Assistente de timbre
      </NavLink>
      <NavLink to="/vida-util" className={navItem}>
        Vida útil
      </NavLink>
    </nav>
  );
}