import { NavLink } from 'react-router-dom';

const navBase = 'rounded-full px-4 py-2 text-sm font-semibold transition';

const navItem = ({ isActive }: { isActive: boolean }) =>
  `${navBase} ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`;

export function MainNav() {
  return (
    <nav className="flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white p-1">
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