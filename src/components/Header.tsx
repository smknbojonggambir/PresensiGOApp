import React from 'react';
import { ActiveTab, VisualScreenTab } from '../types';
import { PresensiLogo } from './PresensiLogo';
import { 
  Sparkles, 
  Smartphone, 
  Code2, 
  BookOpen, 
  ExternalLink,
  Layers,
  Home,
  Sun,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  visualTab: VisualScreenTab;
  setVisualTab: (vTab: VisualScreenTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  visualTab,
  setVisualTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('visual_assets')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center p-0.5">
                <PresensiLogo size={34} showDetails={true} id="header-logo" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-slate-900 text-lg tracking-tight leading-none">
                  Presensi<span className="text-blue-600">GO</span>
                </h1>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-200">
                  Native Android
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-tight">
                SMKN Bojonggambir • Portal Kehadiran Digital
              </p>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60">
            <button
              id="tab-visual-assets"
              onClick={() => setActiveTab('visual_assets')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'visual_assets'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              Desain Visual &amp; UI/UX
            </button>

            <button
              id="tab-simulator"
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-600" />
              Simulator WebView &amp; GPS
            </button>

            <button
              id="tab-native-code"
              onClick={() => setActiveTab('native_code')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'native_code'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Code2 className="w-4 h-4 text-indigo-600" />
              Kode Native Android
            </button>

            <button
              id="tab-guide"
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-600" />
              Panduan Rilis
            </button>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <a
              href="https://presensigo.smknbojonggambir.sch.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-xs"
            >
              <span className="hidden sm:inline">Kunjungi</span> Portal Web
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Sub-Navigation for Visual Assets Tab (Layar I, Layar II, Layar III) */}
        {activeTab === 'visual_assets' && (
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 border-t border-slate-100 scrollbar-none text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1 pr-2">
              Pilihan Layar:
            </span>
            <button
              onClick={() => setVisualTab('playstore_icon')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                visualTab === 'playstore_icon'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Layar I: Play Store Icon (512x512)
            </button>

            <button
              onClick={() => setVisualTab('home_screen')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                visualTab === 'home_screen'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Layar II: Home Screen Adaptive Icon
            </button>

            <button
              onClick={() => setVisualTab('splash_screen')}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                visualTab === 'splash_screen'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Layar III: Splash Screen (Flash Burst)
            </button>
          </div>
        )}

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('visual_assets')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeTab === 'visual_assets' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            <Sparkles className="w-4 h-4 mb-0.5" />
            <span>Visual UI</span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeTab === 'simulator' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            <Smartphone className="w-4 h-4 mb-0.5" />
            <span>Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('native_code')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeTab === 'native_code' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            <Code2 className="w-4 h-4 mb-0.5" />
            <span>Kode Java</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center py-1 px-2 rounded-lg ${
              activeTab === 'guide' ? 'text-blue-600 font-bold' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>Panduan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
