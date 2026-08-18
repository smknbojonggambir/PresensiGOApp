import React, { useState, useRef } from 'react';
import { PresensiLogo } from './PresensiLogo';
import { 
  Download, 
  Layers, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  Camera, 
  Mic, 
  MapPin, 
  Sliders, 
  RotateCcw,
  Maximize2
} from 'lucide-react';

export const PlayStoreIconView: React.FC = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [iconStyle, setIconStyle] = useState<'modern3d' | 'flat' | 'dark' | 'gradient'>('modern3d');
  const [cornerRoundness, setCornerRoundness] = useState<number>(20); // 20% is standard Play Store squircle
  const [elevation, setElevation] = useState<'soft' | 'pronounced' | 'flat'>('pronounced');
  const [exporting, setExporting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleExportPNG = () => {
    setExporting(true);
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    const radius = (512 * cornerRoundness) / 100;
    ctx.beginPath();
    ctx.roundRect(0, 0, 512, 512, radius);
    
    if (iconStyle === 'dark') {
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#0F172A');
      grad.addColorStop(1, '#1E293B');
      ctx.fillStyle = grad;
    } else if (iconStyle === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#1E40AF');
      grad.addColorStop(1, '#065F46');
      ctx.fillStyle = grad;
    } else {
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(1, '#F1F5F9');
      ctx.fillStyle = grad;
    }
    ctx.fill();

    // Draw SVG representation onto canvas
    const svgElement = document.getElementById('playstore-logo-svg');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement.querySelector('svg')!);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const blobURL = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 32, 32, 448, 448);
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'presensigo_playstore_512x512.png';
        downloadLink.href = pngUrl;
        downloadLink.click();
        URL.revokeObjectURL(blobURL);
        setExporting(false);
      };
      img.src = blobURL;
    } else {
      setExporting(false);
    }
  };

  const handleExportSVG = () => {
    const svgElement = document.getElementById('playstore-logo-svg');
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement.querySelector('svg')!);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presensigo_icon_vector.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="playstore-icon-section" className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Layar I: Google Play Store Asset Spesifikasi 512 x 512 px
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Ikon Aplikasi PresensiGO (Resolusi Tinggi)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              Desain visual ikon resolusi tinggi 512x512 px siap publikasi di Google Play Console &amp; App Store. 
              Mengintegrasikan inisial monogram <strong className="text-blue-600 font-semibold">P + G</strong> dengan aksen mikro 
              kamera selfie, gelombang suara/audio, dan pin GPS SMKN Bojonggambir.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="export-png-btn"
              onClick={handleExportPNG}
              disabled={exporting}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Mengenerate...' : 'Download PNG 512px'}
            </button>
            <button
              id="export-svg-btn"
              onClick={handleExportSVG}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              Download Vector SVG
            </button>
          </div>
        </div>
      </div>

      {/* Main Visual Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 512x512 Stage & Interactive Controls */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              Pratinjau Kanvas 512 x 512 px (Play Store Standard)
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              32-bit PNG | 512x512 | Squircle 20%
            </div>
          </div>

          {/* Canvas Box */}
          <div className="relative flex items-center justify-center p-8 sm:p-12 bg-radial from-slate-100 to-slate-200/80 rounded-2xl border border-slate-200 min-h-[420px] overflow-hidden">
            {/* Background Studio Grid */}
            <div className="absolute inset-0 opacity-25 pointer-events-none bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Play Store Keyline Guide Overlay */}
            {showGrid && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="w-[340px] h-[340px] border border-blue-400/60 rounded-full border-dashed" />
                <div className="absolute w-[340px] h-[340px] border border-blue-400/40" />
                <div className="absolute w-[384px] h-[384px] border border-blue-500/60 rounded-[76px] border-dashed" />
                <div className="absolute inset-x-0 h-px bg-blue-400/40" />
                <div className="absolute inset-y-0 w-px bg-blue-400/40" />
                <span className="absolute bottom-4 right-4 bg-blue-600/90 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  Google Play Keylines Active
                </span>
              </div>
            )}

            {/* The 512x512 Container Mockup */}
            <div
              id="playstore-logo-svg"
              className={`relative z-10 transition-all duration-300 flex items-center justify-center ${
                elevation === 'pronounced'
                  ? 'shadow-[0_25px_60px_-15px_rgba(37,99,235,0.3),0_10px_25px_-5px_rgba(0,0,0,0.1)]'
                  : elevation === 'soft'
                  ? 'shadow-lg'
                  : 'shadow-none'
              }`}
              style={{
                width: '320px',
                height: '320px',
                borderRadius: `${cornerRoundness}%`,
                background:
                  iconStyle === 'dark'
                    ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)'
                    : iconStyle === 'gradient'
                    ? 'linear-gradient(145deg, #1e40af 0%, #0d9488 100%)'
                    : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                border: iconStyle === 'dark' ? '1px solid #334155' : '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              <PresensiLogo
                size={270}
                showDetails={true}
                withGlow={iconStyle === 'dark' || iconStyle === 'gradient'}
                id="playstore-master-logo"
              />
            </div>
          </div>

          {/* Interactive Styling Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600" />
                Gaya Tema Ikon
              </label>
              <select
                value={iconStyle}
                onChange={(e) => setIconStyle(e.target.value as any)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="modern3d">Modern Light (Play Store Default)</option>
                <option value="dark">Dark Sapphire (AMOLED Edition)</option>
                <option value="gradient">Full Vibrant Brand (Cyan/Teal)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span>Kelengkungan Sudut: {cornerRoundness}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={cornerRoundness}
                onChange={(e) => setCornerRoundness(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Persegi (0%)</span>
                <span className="font-semibold text-blue-600">Play Store (20%)</span>
                <span>Lingkaran (50%)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Panduan Play Store Grid</label>
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  showGrid
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                {showGrid ? 'Sembunyikan Keyline' : 'Tampilkan Keyline Grid'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Detailed Anatomy & Icon Specifications */}
        <div className="lg:col-span-5 space-y-6">
          {/* Monogram Meaning Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Filosofi &amp; Anatomi Monogram PresensiGO
            </h3>

            <div className="space-y-3.5">
              {/* Item 1: Monogram P & G */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                  PG
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold block text-sm">Monogram "P" &amp; "G" Interlocking</strong>
                  Peleburan inisial <em>Presensi</em> dan <em>GO</em> dalam kurva aerodinamis modern yang merepresentasikan kecepatan dan kedisiplinan.
                </div>
              </div>

              {/* Item 2: Camera Accent */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold block text-sm">Aksen Lensa Kamera (Face Selfie)</strong>
                  Ditempatkan di dalam lekukan huruf "P", menandakan validasi presensi selfie dan pengenalan wajah siswa/guru.
                </div>
              </div>

              {/* Item 3: Audio Frequency Accent */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Mic className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold block text-sm">Gelombang Audio / Sound Wave</strong>
                  Batang spektrum vertikal pada tulang monogram, mengisyaratkan fitur verifikasi suara dan input suara presensi cerdas.
                </div>
              </div>

              {/* Item 4: GPS Geotag Beacon */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold block text-sm">Pin Lokasi GPS SMKN Bojonggambir</strong>
                  Titik penanda koordinat lokasi akurat untuk memastikan presensi hanya sah dalam radius resmi sekolah.
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs Card */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Kesesuaian Standar Google Play Store
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Format File</span>
                <span className="font-semibold text-white">32-bit PNG (No Alpha on root)</span>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Dimensi</span>
                <span className="font-semibold text-white">512 px x 512 px</span>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Ukuran Maksimal</span>
                <span className="font-semibold text-emerald-400">&lt; 1024 KB (Ready)</span>
              </div>
              <div className="p-2.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
                <span className="text-slate-400 block text-[11px]">Ruang Warna</span>
                <span className="font-semibold text-white">sRGB Standard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
