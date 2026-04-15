import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { LearnPage } from './pages/LearnPage';
import { RankPage } from './pages/RankPage';

const BRAND_LOGO_FULL = '/branding/logo-full-cropped.png';

export default function App() {
  const navBase = 'rounded-full px-4 py-2 text-sm font-semibold transition';
  const navItem = ({ isActive }: { isActive: boolean }) =>
    `${navBase} ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <img
              src={BRAND_LOGO_FULL}
              alt="Logo CordasLivre"
              className="h-10 w-auto max-w-[200px] object-contain md:h-12 md:max-w-[240px]"
              loading="eager"
              decoding="async"
            />
          </div>
          <nav className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1">
            <NavLink to="/rank" className={navItem}>
              Rank de cordas
            </NavLink>
            <NavLink to="/aprenda" className={navItem}>
              Aprenda
            </NavLink>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to="/rank" replace />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/aprenda" element={<LearnPage />} />
      </Routes>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} CordasLivre. Comparacao inteligente para compra de encordoamentos.</p>
          <p>Ao clicar em uma oferta, voce sera redirecionado para o marketplace.</p>
        </div>
      </footer>
    </div>
  );
}