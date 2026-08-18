import React, { useState, useEffect } from 'react';
import { PresensiLogo } from './PresensiLogo';
import { 
  Sparkles, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Wifi, 
  ChevronRight,
  Maximize2,
  Smartphone
} from 'lucide-react';

interface SplashScreenViewProps {
  onComplete?: () => void;
  standalone?: boolean;
}

export const SplashScreenView: React.FC<SplashScreenViewProps> = ({ 
  onComplete,
  standalone = true 
}) => {
  const [duration, setDuration] = useState<number>(2.5); // 2.5 seconds
  const [progress, setProgress] = useState<number>(0);
  const [statusStep, setStatusStep] = useState<string>('Menginisialisasi modul WebView & Hardware...');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    if (!isPlaying) return;

    setProgress(0);
    setStatusStep('Menginisialisasi modul WebView & Hardware...');

    const startTime = Date.now();
    const totalMs = duration * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusStep('Menginisialisasi modul WebView & Hardware...');
      } else if (pct < 65) {
        setStatusStep('Memverifikasi sertifikat SSL HTTPS SMKN Bojonggambir...');
      } else if (pct < 90) {
        setStatusStep('Menyiapkan izin Geolocation GPS & Akses Kamera...');
      } else {
        setStatusStep('Membuka Portal PresensiGO...');
      }

      if (elapsed >= totalMs) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying, duration, key]);

  const restartSplash = () => {
    setKey((prev) => prev + 1);
    setIsPlaying(true);
  };

  return (
    <div id="splash-screen-section" className="space-y-8">
      {/* Header Description */}
      {standalone && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Layar III: Splash Screen (Layar Flash Memuat Data 2-3 Detik)
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Efek Ledakan Cahaya (Flash Light Burst) &amp; Identitas Sekolah
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
                Halaman transisi pembuka saat aplikasi pertama kali dieksekusi. Dilengkapi efek 
                <span className="font-semibold text-slate-800"> radial light burst berkilau</span>, 
                logo monogram <strong className="text-blue-600 font-semibold">PresensiGO</strong>, identitas resmi 
                <strong className="text-slate-900 font-semibold"> SMKN Bojonggambir</strong>, dan indikator pemuat data real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="restart-splash-btn"
                onClick={restartSplash}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Putar Ulang Splash Screen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Interactive Splash Screen View Inside Mobile Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[360px] bg-slate-950 rounded-[44px] p-3.5 ring-12 ring-slate-800 shadow-2xl shadow-blue-950/40 border border-slate-700">
            {/* Phone Screen Canvas */}
            <div
              key={key}
              className="relative w-full aspect-[9/19.5] rounded-[36px] overflow-hidden flex flex-col justify-between p-6 select-none bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white"
            >
              {/* Dynamic Flash Light Burst Background Effects */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                {/* 1. Core Glowing Sunburst */}
                <div className="w-72 h-72 bg-blue-500/25 rounded-full blur-2xl animate-pulse" />

                {/* 2. Rotating Light Rays Burst */}
                <div
                  className="absolute w-[500px] h-[500px] opacity-25 animate-spin"
                  style={{ animationDuration: '24s' }}
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <radialGradient id="ray-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    {[...Array(12)].map((_, i) => (
                      <polygon
                        key={i}
                        points="100,100 92,0 108,0"
                        fill="url(#ray-grad)"
                        transform={`rotate(${i * 30} 100 100)`}
                      />
                    ))}
                  </svg>
                </div>

                {/* 3. Expanding Ripple Flash Waves */}
                <div className="absolute w-44 h-44 rounded-full border border-blue-400/40 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute w-64 h-64 rounded-full border border-teal-400/30 animate-pulse" style={{ animationDuration: '2s' }} />
              </div>

              {/* Top Security & School Verification Header */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>HTTPS Secure</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Wifi className="w-3.5 h-3.5 text-blue-400" />
                  <span>v2.4.0 Native</span>
                </div>
              </div>

              {/* Center: Monogram Logo with Burst and School Identity */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-5 text-center">
                {/* Logo Container with 3D Float Shadow */}
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-teal-400 to-indigo-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse" />
                  
                  <div className="relative w-28 h-28 bg-white/95 rounded-[26px] p-2.5 shadow-2xl flex items-center justify-center border border-white/40">
                    <PresensiLogo size={88} showDetails={true} id="splash-center-logo" />
                  </div>
                </div>

                {/* Title and Branding */}
                <div className="space-y-1">
                  <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-md">
                    Presensi<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">GO</span>
                  </h1>
                  <p className="text-xs font-semibold text-blue-200 tracking-wider uppercase">
                    SMKN BOJONGGAMBIR
                  </p>
                  <p className="text-[10px] text-slate-300 max-w-[200px] mx-auto">
                    Kabupaten Tasikmalaya • Jawa Barat
                  </p>
                </div>
              </div>

              {/* Bottom: Loading Indicator & Real-time Progress */}
              <div className="relative z-10 space-y-3 pb-2">
                <div className="space-y-1.5 text-center">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-300 px-1">
                    <span className="truncate pr-2">{statusStep}</span>
                    <span className="font-mono text-cyan-300 font-bold">{progress}%</span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="w-full h-2 bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-400">
                  Sistem Presensi &amp; Kehadiran Berbasis Lokasi &amp; Kamera
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Technical Parameters & Native Android Implementation */}
        <div className="lg:col-span-6 space-y-6">
          {/* Controls Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Pengaturan Simulasi Splash Screen
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Durasi Tampilan Flash Screen: {duration} Detik
                </label>
                <div className="flex gap-2">
                  {[1.5, 2.5, 3.5, 5.0].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setDuration(d);
                        restartSplash();
                      }}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        duration === d
                          ? 'bg-blue-50 border-blue-400 text-blue-700 ring-1 ring-blue-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {d} Detik
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={restartSplash}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  Mulai Ulang Animasi Ledakan Cahaya
                </button>
              </div>
            </div>
          </div>

          {/* Android 12+ SplashScreen API Architecture */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] border-b border-slate-800 pb-2">
              <span>Modern Android 12+ SplashScreen API</span>
              <span className="text-emerald-400">androidx.core:core-splashscreen</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Menerapkan standar modern Android 12 (API level 31) menggunakan 
              <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">SplashScreen.installSplashScreen(this)</code> 
              sehingga splash screen muncul instan tanpa jank saat sistem menginisialisasi proses JVM dan render engine WebView.
            </p>
            <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto p-2.5 bg-slate-950 rounded-lg">
{`// res/values/themes.xml
<style name="Theme.App.Starting" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">@color/splash_bg_dark</item>
    <item name="windowSplashScreenAnimatedIcon">@drawable/splash_logo_burst</item>
    <item name="windowSplashScreenAnimationDuration">2500</item>
    <item name="postSplashScreenTheme">@style/Theme.PresensiGO</item>
</style>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
