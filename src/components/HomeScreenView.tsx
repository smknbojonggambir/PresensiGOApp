import React, { useState, useEffect } from 'react';
import { PresensiLogo } from './PresensiLogo';
import { AdaptiveShape } from '../types';
import { 
  Sparkles, 
  Wifi, 
  BatteryMedium, 
  Search, 
  Mic, 
  Camera, 
  Phone, 
  MessageSquare, 
  Compass, 
  CloudSun, 
  Bell, 
  CheckCircle2, 
  Smartphone,
  ExternalLink,
  ChevronRight,
  MapPin,
  Clock,
  Sparkle
} from 'lucide-react';

interface HomeScreenViewProps {
  onLaunchApp: () => void;
}

export const HomeScreenView: React.FC<HomeScreenViewProps> = ({ onLaunchApp }) => {
  const [adaptiveShape, setAdaptiveShape] = useState<AdaptiveShape>('squircle');
  const [timeStr, setTimeStr] = useState('07:15');
  const [dateStr, setDateStr] = useState('Senin, 18 Agustus');
  const [showShortcutMenu, setShowShortcutMenu] = useState(false);
  const [activeWallpaper, setActiveWallpaper] = useState<'gradient' | 'minimal' | 'mountain'>('gradient');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const getShapeStyle = (shape: AdaptiveShape) => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'squircle':
        return 'rounded-[22%]';
      case 'rounded':
        return 'rounded-2xl';
      case 'teardrop':
        return 'rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-none';
      default:
        return 'rounded-[22%]';
    }
  };

  const getWallpaperClass = () => {
    switch (activeWallpaper) {
      case 'gradient':
        return 'bg-gradient-to-b from-slate-900 via-indigo-950 to-blue-950';
      case 'minimal':
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900';
      case 'mountain':
        return 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black';
      default:
        return 'bg-gradient-to-b from-slate-900 via-indigo-950 to-blue-950';
    }
  };

  return (
    <div id="home-screen-section" className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Layar II: Simulasi Layar Beranda (Home Screen) Setelah Diinstal
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Tampilan Adaptive Icon pada Launcher Android
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              Simulasi tampilan ikon <strong className="text-blue-600 font-semibold">PresensiGO</strong> di layar utama smartphone pengguna. 
              Mendukung sistem <span className="font-semibold text-slate-800">Android Adaptive Icons</span> (Squircle, Circle, Rounded, Teardrop) sesuai antarmuka OEM (Google Pixel, Samsung One UI, Xiaomi HyperOS).
            </p>
          </div>

          <button
            onClick={onLaunchApp}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            Buka Aplikasi PresensiGO
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Device Simulator Shell */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[360px] bg-slate-950 rounded-[44px] p-3.5 ring-12 ring-slate-800 shadow-2xl shadow-slate-900/50 border border-slate-700">
            {/* Phone Screen Canvas */}
            <div
              className={`relative w-full aspect-[9/19.5] rounded-[36px] overflow-hidden flex flex-col justify-between p-4 select-none ${getWallpaperClass()} text-white`}
            >
              {/* Subtle Wallpaper glow pattern */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Status Bar */}
              <div className="relative z-10 flex items-center justify-between px-2 pt-1 text-xs font-medium text-slate-200">
                <span className="font-semibold tracking-wide">{timeStr}</span>
                {/* Punch hole camera */}
                <div className="w-4 h-4 bg-black rounded-full ring-1 ring-slate-800" />
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[10px] font-bold">5G</span>
                  <Wifi className="w-3.5 h-3.5" />
                  <BatteryMedium className="w-4 h-4" />
                </div>
              </div>

              {/* Top Widget: Clock & Weather at SMKN Bojonggambir */}
              <div className="relative z-10 mt-6 px-3">
                <div className="text-4xl font-extralight tracking-tight text-white/95">
                  {timeStr}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
                  <span>{dateStr}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <CloudSun className="w-3.5 h-3.5" />
                    27°C Bojonggambir
                  </span>
                </div>
              </div>

              {/* Search Bar Widget */}
              <div className="relative z-10 mt-4 px-1">
                <div className="w-full bg-white/10 backdrop-blur-md rounded-full px-4 py-2.5 flex items-center justify-between border border-white/15 text-slate-300 text-xs shadow-sm">
                  <div className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-400">Telusuri presensi atau web...</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mic className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                    <Camera className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Apps Grid */}
              <div className="relative z-10 grid grid-cols-4 gap-y-6 gap-x-2 my-auto px-1 py-4">
                {/* 1. PresensiGO (Highlighted Hero App) */}
                <div className="relative flex flex-col items-center group">
                  <div
                    onClick={onLaunchApp}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setShowShortcutMenu(!showShortcutMenu);
                    }}
                    className={`relative w-14 h-14 bg-white p-1.5 flex items-center justify-center cursor-pointer transition-all duration-200 transform group-hover:scale-105 group-active:scale-95 shadow-lg shadow-blue-900/40 ring-2 ring-blue-400/80 ${getShapeStyle(
                      adaptiveShape
                    )}`}
                  >
                    <PresensiLogo size={44} showDetails={true} id="home-screen-logo-badge" />

                    {/* Notification Badge */}
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-slate-900 shadow-sm animate-pulse">
                      1
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-slate-100 mt-1.5 tracking-tight group-hover:text-blue-300">
                    PresensiGO
                  </span>

                  {/* Android Long-press Quick Shortcut Popup */}
                  {showShortcutMenu && (
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-xl p-1.5 shadow-2xl z-30 text-xs space-y-1 text-slate-200 animate-in fade-in zoom-in-95">
                      <button
                        onClick={onLaunchApp}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white flex items-center gap-2 cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-blue-400" />
                        <span>Presensi Selfie Cepat</span>
                      </button>
                      <button
                        onClick={onLaunchApp}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-600 hover:text-white flex items-center gap-2 cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Cek Geofence Sekolah</span>
                      </button>
                      <div className="h-px bg-slate-700 my-0.5" />
                      <button
                        onClick={() => setShowShortcutMenu(false)}
                        className="w-full text-left px-2.5 py-1 rounded text-[10px] text-slate-400 hover:text-slate-200"
                      >
                        Tutup Menu
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Galeri */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 bg-gradient-to-tr from-amber-500 to-pink-500 flex items-center justify-center shadow-md ${getShapeStyle(
                      adaptiveShape
                    )}`}
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 mt-1.5">Galeri</span>
                </div>

                {/* 3. Pengaturan */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 bg-gradient-to-tr from-slate-600 to-slate-700 flex items-center justify-center shadow-md ${getShapeStyle(
                      adaptiveShape
                    )}`}
                  >
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 mt-1.5">Setelan</span>
                </div>

                {/* 4. Notifikasi */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-md ${getShapeStyle(
                      adaptiveShape
                    )}`}
                  >
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 mt-1.5">Pesan Info</span>
                </div>
              </div>

              {/* Bottom Dock */}
              <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-2.5 border border-white/15">
                <div className="grid grid-cols-4 gap-2">
                  <div className="flex justify-center">
                    <div
                      className={`w-12 h-12 bg-emerald-500 flex items-center justify-center shadow-md ${getShapeStyle(
                        adaptiveShape
                      )}`}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div
                      className={`w-12 h-12 bg-blue-500 flex items-center justify-center shadow-md ${getShapeStyle(
                        adaptiveShape
                      )}`}
                    >
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div
                      onClick={onLaunchApp}
                      className={`w-12 h-12 bg-white p-1 flex items-center justify-center cursor-pointer ring-2 ring-blue-400 shadow-md ${getShapeStyle(
                        adaptiveShape
                      )}`}
                    >
                      <PresensiLogo size={36} showDetails={false} id="dock-mini-logo" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-tr from-red-500 via-amber-500 to-green-500 flex items-center justify-center shadow-md ${getShapeStyle(
                        adaptiveShape
                      )}`}
                    >
                      <Compass className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Home Navigation Indicator Bar */}
              <div className="w-28 h-1 bg-white/60 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>

        {/* Right: Customization Controls & Adaptive Specs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Controls Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              Kustomisasi Bentuk Adaptive Icon (OEM Masking)
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Pilih Masking Bentuk Android:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['squircle', 'circle', 'rounded', 'teardrop'] as AdaptiveShape[]).map((shape) => (
                    <button
                      key={shape}
                      type="button"
                      onClick={() => setAdaptiveShape(shape)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        adaptiveShape === shape
                          ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm ring-1 ring-blue-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 bg-blue-600 ${getShapeStyle(shape)}`}
                      />
                      <span className="capitalize">{shape}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">
                  Pilih Wallpaper Smartphone:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveWallpaper('gradient')}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                      activeWallpaper === 'gradient'
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Deep Indigo
                  </button>
                  <button
                    onClick={() => setActiveWallpaper('minimal')}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                      activeWallpaper === 'minimal'
                        ? 'bg-slate-200 border-slate-400 text-slate-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Dark Slate
                  </button>
                  <button
                    onClick={() => setActiveWallpaper('mountain')}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border cursor-pointer ${
                      activeWallpaper === 'mountain'
                        ? 'bg-blue-50 border-blue-400 text-blue-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Radial Midnight
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tap Prompt */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkle className="w-4 h-4 text-amber-300 animate-spin" />
              Interaksi Langsung
            </div>
            <h4 className="text-lg font-bold">
              Klik Ikon "PresensiGO" Pada Layar HP di Kiri
            </h4>
            <p className="text-blue-100 text-xs leading-relaxed">
              Tekan atau klik ikon PresensiGO di dalam simulator HP untuk membuka transisi 
              <strong> Splash Screen (Layar III)</strong> dan meluncurkan portal presensi WebView secara interaktif.
            </p>
            <button
              onClick={onLaunchApp}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-700 text-xs font-bold rounded-lg shadow hover:bg-blue-50 transition-all cursor-pointer"
            >
              Uji Coba Peluncuran Sekarang
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Android Adaptive XML Guide */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[11px] border-b border-slate-800 pb-2">
              <span>res/mipmap-anydpi-v26/ic_launcher.xml</span>
              <span className="text-emerald-400">Android 8.0+ Ready</span>
            </div>
            <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto p-2 bg-slate-950 rounded-lg">
{`<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
    <monochrome android:drawable="@drawable/ic_launcher_monochrome" />
</adaptive-icon>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
