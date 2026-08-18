import React, { useState } from 'react';
import { ActiveTab, VisualScreenTab } from './types';
import { Header } from './components/Header';
import { PlayStoreIconView } from './components/PlayStoreIconView';
import { HomeScreenView } from './components/HomeScreenView';
import { SplashScreenView } from './components/SplashScreenView';
import { WebViewSimulator } from './components/WebViewSimulator';
import { CodeProjectExplorer } from './components/CodeProjectExplorer';
import { GuideDocumentation } from './components/GuideDocumentation';
import { PresensiLogo } from './components/PresensiLogo';
import { 
  ShieldCheck, 
  MapPin, 
  Camera, 
  Mic, 
  Smartphone, 
  Download, 
  ExternalLink,
  Sparkles,
  School,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('visual_assets');
  const [visualTab, setVisualTab] = useState<VisualScreenTab>('playstore_icon');

  // Interactive app launch pipeline: Home Screen -> Splash Screen -> Simulator
  const handleLaunchAppFromHome = () => {
    setActiveTab('visual_assets');
    setVisualTab('splash_screen');
  };

  const handleSplashComplete = () => {
    // When splash finishes, smoothly transition to the live WebView simulator
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        visualTab={visualTab}
        setVisualTab={setVisualTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatePresence mode="wait">
          {activeTab === 'visual_assets' && (
            <motion.div
              key={`visual-${visualTab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {visualTab === 'playstore_icon' && <PlayStoreIconView />}
              {visualTab === 'home_screen' && (
                <HomeScreenView onLaunchApp={handleLaunchAppFromHome} />
              )}
              {visualTab === 'splash_screen' && (
                <SplashScreenView onComplete={handleSplashComplete} standalone={true} />
              )}
            </motion.div>
          )}

          {activeTab === 'simulator' && (
            <motion.div
              key="simulator"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <WebViewSimulator />
            </motion.div>
          )}

          {activeTab === 'native_code' && (
            <motion.div
              key="native_code"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <CodeProjectExplorer />
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <GuideDocumentation />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
            {/* Col 1: Identity */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 p-0.5 flex items-center justify-center text-white">
                  <PresensiLogo size={24} showDetails={false} id="footer-logo" />
                </div>
                <span className="font-bold text-slate-900 text-base">
                  PresensiGO • SMKN Bojonggambir
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                Aplikasi Android WebView Native resmi untuk portal presensi online SMKN Bojonggambir. 
                Mengintegrasikan izin hardware kamera selfie, pengenalan audio, dan validasi radius GPS sekolah secara aman dan terenkripsi.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  Strict HTTPS SSL
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  WebChromeClient Bridge
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  Radius Geofence 150m
                </span>
              </div>
            </div>

            {/* Col 2: Spesifikasi Visual UI/UX */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Aset Visual UI/UX
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('visual_assets');
                      setVisualTab('playstore_icon');
                    }}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Layar I: Play Store Icon (512x512 px)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('visual_assets');
                      setVisualTab('home_screen');
                    }}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Layar II: Home Screen Adaptive Icon
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('visual_assets');
                      setVisualTab('splash_screen');
                    }}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Layar III: Splash Screen Flash Burst
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('simulator')}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    Simulator WebView &amp; Face Camera
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Informasi Lembaga */}
            <div className="space-y-2.5 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                SMKN Bojonggambir
              </h4>
              <p className="text-slate-500 leading-relaxed">
                Kecamatan Bojonggambir, Kabupaten Tasikmalaya, Jawa Barat 46475
              </p>
              <a
                href="https://presensigo.smknbojonggambir.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"
              >
                <span>presensigo.smknbojonggambir.sch.id</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              &copy; {new Date().getFullYear()} PresensiGO SMKN Bojonggambir. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Android MinSDK 23 / TargetSDK 34</span>
              <span>•</span>
              <span>Java 17 / Kotlin DSL</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
