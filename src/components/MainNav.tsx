import { NavLink } from 'react-router-dom';

const navBase = 'whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm';

const navItem = ({ isActive }: { isActive: boolean }) =>
  `${navBase} ${isActive ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-200' : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-900'}`;

export function MainNav() {
  return (
    <nav className="flex w-full items-center gap-2 overflow-x-auto rounded-full border border-cyan-100 bg-white/90 p-1 backdrop-blur sm:w-auto sm:flex-wrap sm:overflow-visible">
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