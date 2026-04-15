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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.1),_transparent_40%),linear-gradient(to_bottom,_rgb(241,245,249),_rgb(248,250,252),_rgb(255,255,255))] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-cyan-100 bg-white/90 backdrop-blur">
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

      <footer className="border-t border-cyan-100 bg-white/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-slate-600 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} CordasLivre. Comparação inteligente para compra de encordoamentos.</p>
          <p>Ao clicar em uma oferta, você será redirecionado para o marketplace.</p>
        </div>
      </footer>
    </div>
  );
}