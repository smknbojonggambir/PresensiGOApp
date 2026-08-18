import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ShieldAlert, 
  Terminal, 
  UploadCloud, 
  Smartphone, 
  MapPin, 
  Camera, 
  Lock, 
  FileCheck,
  Server
} from 'lucide-react';

export const GuideDocumentation: React.FC = () => {
  return (
    <div id="guide-section" className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Panduan Teknis &amp; Dokumentasi Distribusi
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Panduan Rilis Aplikasi PresensiGO SMKN Bojonggambir
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
            Petunjuk komprehensif mulai dari impor proyek ke Android Studio, kompilasi file APK / AAB (Android App Bundle), 
            pengujian hardware di lapangan, hingga publikasi ke Google Play Store.
          </p>
        </div>
      </div>

      {/* Step by Step Cards */}
      {/* Step 0: GitHub Actions CI/CD (Auto-Build APK) */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-indigo-500/30 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-md">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-lg">
                  Otomatis Menjadi File APK via GitHub Actions (CI/CD)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  Direkomendasikan
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">
                Tidak perlu instal Android Studio di laptop! Server cloud GitHub yang akan melakukan kompilasi file <code>.apk</code> secara otomatis.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Steps Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold text-xs">1</span>
              <UploadCloud className="w-4 h-4 text-indigo-400" />
            </div>
            <strong className="text-white block font-semibold">Upload / Push ke GitHub</strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Ekspor dari menu AI Studio atau jalankan <code>git push origin main</code> dari laptop Anda.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-blue-500/30 text-blue-300 flex items-center justify-center font-bold text-xs">2</span>
              <Terminal className="w-4 h-4 text-blue-400" />
            </div>
            <strong className="text-white block font-semibold">Buka Tab "Actions"</strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Buka repositori GitHub Anda di browser, lalu klik tab menu <strong className="text-white">Actions</strong> di bagian atas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-xs">3</span>
              <Server className="w-4 h-4 text-amber-400" />
            </div>
            <strong className="text-white block font-semibold">GitHub Membangun APK</strong>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Server GitHub menjalankan workflow <code>build-apk.yml</code> dengan JDK 17 &amp; Gradle (±2 menit hingga centang hijau ✅).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-6 h-6 rounded-full bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs">4</span>
              <Smartphone className="w-4 h-4 text-emerald-400" />
            </div>
            <strong className="text-emerald-300 block font-semibold">Download File APK</strong>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Klik nama build yang selesai, gulir ke bagian <strong className="text-white">Artifacts</strong>, lalu klik <strong>PresensiGO-APK</strong> untuk diunduh langsung ke HP siswa/guru!
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-indigo-900/40 rounded-xl border border-indigo-700/40 text-xs text-indigo-200 flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            File konfigurasi otomatis <code>.github/workflows/build-apk.yml</code> sudah aktif dan sudah otomatis disertakan di dalam paket unduhan ZIP maupun saat di-push ke GitHub.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Step 1: Android Studio Setup */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              1
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Impor &amp; Konfigurasi Android Studio</h3>
              <p className="text-xs text-slate-500">Android Studio Iguana / Ladybug / Koala</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              1. Unduh paket proyek <strong className="text-slate-900">PresensiGO (.zip)</strong> dari tab <em>Kode Native Android</em>.
            </p>
            <p>
              2. Ekstrak file ZIP di komputer Anda.
            </p>
            <p>
              3. Buka Android Studio, pilih menu <strong className="text-slate-900">File &gt; Open</strong>, dan arahkan ke folder yang diekstrak.
            </p>
            <p>
              4. Biarkan Gradle menyelesaikan proses <em>Sync Project with Gradle Files</em> secara otomatis.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700">
            Min SDK: 23 (Android 6.0 Marshmallow)<br />
            Target SDK: 34 (Android 14 / 15)<br />
            Java Version: 17 LTS
          </div>
        </div>

        {/* Step 2: Build APK & AAB */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              2
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Generate Signed APK &amp; AAB</h3>
              <p className="text-xs text-slate-500">Build untuk Distribusi Internal &amp; Play Store</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              1. Pilih menu <strong className="text-slate-900">Build &gt; Generate Signed Bundle / APK</strong>.
            </p>
            <p>
              2. Pilih <strong className="text-blue-600 font-semibold">Android App Bundle (.aab)</strong> untuk rilis Google Play, atau <strong className="text-slate-800">APK</strong> untuk instalasi langsung via WhatsApp / Flashdisk.
            </p>
            <p>
              3. Buat KeyStore baru (contoh: <code>presensigo_smkn_key.jks</code>) dan simpan password dengan aman.
            </p>
            <p>
              4. Centang <em>release build variant</em> dan klik <strong>Finish</strong>.
            </p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
            <strong>Lokasi File Hasil Kompilasi:</strong><br />
            <code>app/release/app-release.aab</code>
          </div>
        </div>

        {/* Step 3: Hardware Verification Check */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              3
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Pengujian Hardware Lapangan</h3>
              <p className="text-xs text-slate-500">Verifikasi Kamera Selfie &amp; Geofence Sekolah</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-start gap-2">
              <Camera className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Kamera Depan:</strong> Pastikan WebRTC camera capture pada form presensi terbuka tanpa delay dan hasil foto tajam.</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>GPS Geolocation:</strong> Uji di area gerbang &amp; lapangan SMKN Bojonggambir untuk memastikan kalkulasi jarak di bawah radius 150m.</span>
            </div>
            <div className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>HTTPS Security:</strong> Pastikan domain <code>presensigo.smknbojonggambir.sch.id</code> memiliki sertifikat SSL aktif.</span>
            </div>
          </div>
        </div>

        {/* Step 4: Play Store Publishing Checklist */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              4
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Checklist Google Play Console</h3>
              <p className="text-xs text-slate-500">Persyaratan Kelayakan Aplikasi Edukasi</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Ikon 512x512 px 32-bit PNG (Unduh dari Layar I)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Feature Graphic 1024x500 px</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Deklarasi Kebijakan Privasi (Data Lokasi &amp; Foto Presensi)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Data Safety: Pengumpulan Data Lokasi untuk Validasi Presensi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Server Recommendations */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
          <Server className="w-5 h-5 text-blue-400" />
          Rekomendasi Konfigurasi Server Web Portal
        </h3>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Agar WebView Android dapat memanfaatkan seluruh fitur hardware (Kamera WebRTC, Geolocation HTML5, dan Push Notifications), 
          pastikan server web <code className="text-cyan-300">presensigo.smknbojonggambir.sch.id</code> memenuhi kriteria berikut:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
            <strong className="text-white block font-semibold">1. Header HTTPS HSTS</strong>
            <p className="text-slate-400 text-[11px]">
              Terapkan <code>Strict-Transport-Security: max-age=31536000</code> pada Nginx/Apache.
            </p>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
            <strong className="text-white block font-semibold">2. Feature-Policy / Permissions-Policy</strong>
            <p className="text-slate-400 text-[11px]">
              Izinkan <code>camera=(self), geolocation=(self), microphone=(self)</code>.
            </p>
          </div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
            <strong className="text-white block font-semibold">3. Progressive Web App (PWA) Cache</strong>
            <p className="text-slate-400 text-[11px]">
              Sediakan ServiceWorker agar aset CSS &amp; JavaScript ter-cache optimal di perangkat siswa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
