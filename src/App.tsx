import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { MainNav } from './components/MainNav';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { RankPage } from './pages/RankPage';
import { ToneAssistantPage } from './pages/ToneAssistantPage';

const BRAND_LOGO_FULL = '/branding/logo-full-cropped.png';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={BRAND_LOGO_FULL}
              alt="Logo CordasLivre"
              className="h-10 w-auto max-w-[200px] object-contain md:h-12 md:max-w-[240px]"
              loading="eager"
              decoding="async"
            />
          </NavLink>
          <MainNav />
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/aprenda" element={<LearnPage />} />
        <Route path="/assistente-de-timbre" element={<ToneAssistantPage />} />
        <Route path="/vida-util" element={<MaintenancePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} CordasLivre. Comparação inteligente para compra de encordoamentos.</p>
          <p>Ao clicar em uma oferta, você será redirecionado para o marketplace.</p>
        </div>
      </footer>
    </div>
  );
}