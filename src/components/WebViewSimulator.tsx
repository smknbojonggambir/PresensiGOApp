import React, { useState, useEffect, useRef } from 'react';
import { PermissionState, AttendanceRecord } from '../types';
import { PresensiLogo } from './PresensiLogo';
import { 
  Camera, 
  MapPin, 
  Mic, 
  ShieldCheck, 
  Lock, 
  RotateCw, 
  ArrowLeft, 
  Home, 
  Square, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  UserCheck, 
  ExternalLink,
  Wifi,
  BatteryCharging,
  Sliders,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Coordinates of SMKN Bojonggambir, Tasikmalaya
const SCHOOL_LAT = -7.6369;
const SCHOOL_LNG = 108.1368;
const GEOFENCE_RADIUS_METERS = 150;

export const WebViewSimulator: React.FC = () => {
  const [activeUrl] = useState('https://presensigo.smknbojonggambir.sch.id/');
  const [viewMode, setViewMode] = useState<'portal_app' | 'raw_webview'>('portal_app');
  
  // Permission state
  const [permissions, setPermissions] = useState<PermissionState>({
    camera: 'prompt',
    location: 'prompt',
    audio: 'prompt',
  });
  
  // Active permission modal
  const [activePrompt, setActivePrompt] = useState<'camera' | 'location' | 'audio' | null>(null);

  // User state
  const [userName, setUserName] = useState('Dede Mulyana, S.Pd.');
  const [userRole, setUserRole] = useState<'Guru' | 'Tenaga Kependidikan' | 'Siswa'>('Guru');
  const [userNIP, setUserNIP] = useState('198805122019031008');

  // GPS state
  const [simulatedLoc, setSimulatedLoc] = useState<{ lat: number; lng: number; isSchool: boolean }>({
    lat: -7.63692,
    lng: 108.13684,
    isSchool: true,
  });
  const [distance, setDistance] = useState<number>(12); // meters

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Audio test state
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioVerified, setAudioVerified] = useState(true);

  // Attendance history
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [lastSubmission, setLastSubmission] = useState<AttendanceRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Clock
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Distance calculation helper
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  };

  const handleSetLocationPreset = (preset: 'school' | 'outside') => {
    if (preset === 'school') {
      const lat = SCHOOL_LAT + (Math.random() - 0.5) * 0.0003;
      const lng = SCHOOL_LNG + (Math.random() - 0.5) * 0.0003;
      const d = calculateDistance(lat, lng, SCHOOL_LAT, SCHOOL_LNG);
      setSimulatedLoc({ lat, lng, isSchool: true });
      setDistance(d);
    } else {
      const lat = SCHOOL_LAT + 0.015; // ~1.6km away
      const lng = SCHOOL_LNG + 0.012;
      const d = calculateDistance(lat, lng, SCHOOL_LAT, SCHOOL_LNG);
      setSimulatedLoc({ lat, lng, isSchool: false });
      setDistance(d);
    }
  };

  // Real Geolocation
  const handleUseRealGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const d = calculateDistance(lat, lng, SCHOOL_LAT, SCHOOL_LNG);
          setSimulatedLoc({ lat, lng, isSchool: d <= GEOFENCE_RADIUS_METERS });
          setDistance(d);
          setPermissions((prev) => ({ ...prev, location: 'granted' }));
        },
        (err) => {
          console.warn(err);
          setPermissions((prev) => ({ ...prev, location: 'denied' }));
        }
      );
    }
  };

  // Real Camera capture
  const handleStartCamera = async () => {
    if (permissions.camera === 'prompt') {
      setActivePrompt('camera');
      return;
    }
    if (permissions.camera === 'denied') {
      alert('Izin kamera ditolak. Silakan aktifkan izin kamera pada simulator.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (e) {
      console.warn('Camera failed, fallback to simulated photo capture', e);
      setIsCameraActive(true);
    }
  };

  const handleTakeSelfie = () => {
    if (videoRef.current && streamRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 480;
      canvas.height = videoRef.current.videoHeight || 640;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedPhoto(dataUrl);
      }
      // stop stream
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    } else {
      // simulated face selfie
      setCapturedPhoto('simulated');
      setIsCameraActive(false);
    }
  };

  const handlePermissionRespond = (type: 'camera' | 'location' | 'audio', grant: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [type]: grant ? 'granted' : 'denied',
    }));
    setActivePrompt(null);

    if (type === 'camera' && grant) {
      setTimeout(() => handleStartCamera(), 300);
    }
  };

  const handleSubmitAttendance = (type: 'masuk' | 'pulang') => {
    if (permissions.location === 'prompt') {
      setActivePrompt('location');
      return;
    }
    if (permissions.camera === 'prompt' && !capturedPhoto) {
      setActivePrompt('camera');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const inRadius = distance <= GEOFENCE_RADIUS_METERS;
      const record: AttendanceRecord = {
        id: `PRES-${Date.now().toString().slice(-6)}`,
        timestamp: new Date().toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }) + ' ' + currentTime,
        type,
        userName,
        userRole,
        userNIP,
        latitude: simulatedLoc.lat,
        longitude: simulatedLoc.lng,
        distanceMeter: distance,
        inSchoolRadius: inRadius,
        photoUrl: capturedPhoto,
        audioVerified: true,
        status: inRadius ? 'valid' : 'warning',
      };

      setHistory((prev) => [record, ...prev]);
      setLastSubmission(record);
      setSubmitting(false);

      if (inRadius) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    }, 900);
  };

  return (
    <div id="webview-simulator-section" className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Simulator Native Android WebView &amp; Hardware Bridge
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Portal PresensiGO SMKN Bojonggambir
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              Simulator interaktif menjalankan logika <code>WebChromeClient</code>, auto-grant hardware permission, 
              validasi Geolocation GPS ke koordinat SMKN Bojonggambir, kamera selfie, dan pengiriman presensi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              <span>Buka Web Asli</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Device Simulator on Left, Controls & Live Inspection on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Android Device Shell */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[390px] bg-slate-950 rounded-[48px] p-3.5 ring-12 ring-slate-800 shadow-2xl shadow-slate-950/60 border border-slate-700">
            {/* Phone Screen */}
            <div className="relative w-full aspect-[9/18.5] rounded-[38px] overflow-hidden flex flex-col bg-slate-900 text-slate-900 select-none">
              
              {/* Android Native Status Bar */}
              <div className="bg-slate-950 text-slate-300 px-5 py-2 flex items-center justify-between text-xs font-medium border-b border-slate-800/80 shrink-0">
                <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-200">
                  {currentTime || '07:15:00'}
                </span>
                {/* Punch Hole */}
                <div className="w-3.5 h-3.5 bg-black rounded-full ring-1 ring-slate-800" />
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <BatteryCharging className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              {/* WebView Top App Bar / Address Bar */}
              <div className="bg-slate-900 text-white px-3 py-2 flex items-center justify-between border-b border-slate-800 shrink-0 shadow-sm">
                <div className="flex items-center gap-2 flex-1 min-w-0 bg-slate-800/90 rounded-full px-3 py-1 text-xs border border-slate-700">
                  <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate text-[11px] text-slate-200 font-mono">
                    presensigo.smknbojonggambir.sch.id
                  </span>
                </div>
                <button
                  onClick={() => setLastSubmission(null)}
                  title="Reload WebView"
                  className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 ml-1 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Active Native Android Permission Dialog (Modal Simulation) */}
              {activePrompt && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-5 animate-in fade-in">
                  <div className="bg-white rounded-2xl p-5 shadow-2xl space-y-4 max-w-[280px] w-full text-center border border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                      {activePrompt === 'camera' && <Camera className="w-6 h-6" />}
                      {activePrompt === 'location' && <MapPin className="w-6 h-6" />}
                      {activePrompt === 'audio' && <Mic className="w-6 h-6" />}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">
                        {activePrompt === 'camera' && 'Izinkan Akses Kamera?'}
                        {activePrompt === 'location' && 'Izinkan Akses Lokasi GPS?'}
                        {activePrompt === 'audio' && 'Izinkan Akses Mikrofon?'}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {activePrompt === 'camera' &&
                          'Aplikasi PresensiGO memerlukan akses kamera untuk verifikasi foto selfie saat melakukan presensi.'}
                        {activePrompt === 'location' &&
                          'Aplikasi memerlukan akses lokasi presisi untuk memastikan Anda berada di wilayah SMKN Bojonggambir.'}
                        {activePrompt === 'audio' &&
                          'Aplikasi memerlukan mikrofon untuk fitur verifikasi suara dan pengumuman interaktif.'}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={() => handlePermissionRespond(activePrompt, true)}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-sm cursor-pointer"
                      >
                        Saat Aplikasi Digunakan (Izinkan)
                      </button>
                      <button
                        onClick={() => handlePermissionRespond(activePrompt, false)}
                        className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Jangan Izinkan (Tolak)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* WebView Scrollable Content Container */}
              <div className="flex-1 bg-slate-50 overflow-y-auto p-4 space-y-4">
                {/* School Header Banner inside Portal */}
                <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white rounded-2xl p-4 shadow-md space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-white rounded-xl p-1 shadow">
                        <PresensiLogo size={28} showDetails={false} id="portal-top-logo" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm leading-tight">PresensiGO</h3>
                        <p className="text-[10px] text-blue-200">SMKN Bojonggambir</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold rounded-full border border-emerald-400/30">
                      Aktif Masuk
                    </span>
                  </div>

                  <div className="pt-2 border-t border-blue-600/60 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-blue-200 block text-[9px]">Pengguna Terdaftar</span>
                      <span className="font-semibold">{userName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-200 block text-[9px]">Role</span>
                      <span className="font-medium bg-blue-800/80 px-1.5 py-0.5 rounded text-[10px]">
                        {userRole}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Geolocation Status Card */}
                <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      Status Radius Geofence GPS
                    </span>
                    {distance <= GEOFENCE_RADIUS_METERS ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Dalam Radius ({distance}m)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        Di Luar Kampus ({distance}m)
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Geofence:</span>
                      <span className="font-semibold text-slate-700">SMKN Bojonggambir</span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px]">
                      <span className="text-slate-400">Koordinat:</span>
                      <span>{simulatedLoc.lat.toFixed(5)}, {simulatedLoc.lng.toFixed(5)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Batas Maksimal:</span>
                      <span>{GEOFENCE_RADIUS_METERS} meter</span>
                    </div>
                  </div>
                </div>

                {/* Selfie Camera Verification Box */}
                <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-indigo-600" />
                      Foto Selfie Kehadiran
                    </span>
                    {capturedPhoto ? (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Foto Siap
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-600 font-semibold">Wajib Ambil</span>
                    )}
                  </div>

                  {isCameraActive ? (
                    <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex flex-col items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                      {/* Face Target Oval */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-32 border-2 border-emerald-400 border-dashed rounded-[50%] animate-pulse" />
                      </div>
                      <button
                        onClick={handleTakeSelfie}
                        className="absolute bottom-2 px-4 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-full shadow-lg hover:bg-slate-100 cursor-pointer"
                      >
                        Ambil Foto Sekarang
                      </button>
                    </div>
                  ) : capturedPhoto ? (
                    <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center">
                      {capturedPhoto === 'simulated' ? (
                        <div className="text-center p-3 text-white space-y-1">
                          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto font-bold text-sm">
                            DM
                          </div>
                          <p className="text-xs font-semibold">Foto Selfie Terverifikasi</p>
                          <p className="text-[9px] text-slate-300">Biometrik Wajah Valid (99.4%)</p>
                        </div>
                      ) : (
                        <img
                          src={capturedPhoto}
                          alt="Selfie"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <button
                        onClick={handleStartCamera}
                        className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 hover:bg-black text-white text-[10px] rounded-lg cursor-pointer backdrop-blur"
                      >
                        Ulangi Foto
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleStartCamera}
                      className="w-full py-6 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center gap-1.5 text-slate-600 hover:text-blue-600 bg-slate-50 transition cursor-pointer"
                    >
                      <Camera className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-semibold">Klik Untuk Buka Kamera Selfie</span>
                      <span className="text-[10px] text-slate-400">Pastikan wajah terlihat jelas</span>
                    </button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => handleSubmitAttendance('masuk')}
                    disabled={submitting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {submitting ? 'Memproses...' : 'Presensi MASUK'}
                  </button>
                  <button
                    onClick={() => handleSubmitAttendance('pulang')}
                    disabled={submitting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <UserCheck className="w-4 h-4" />
                    {submitting ? 'Memproses...' : 'Presensi PULANG'}
                  </button>
                </div>

                {/* Success Receipt Modal / Toast inside Portal */}
                {lastSubmission && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-emerald-950 space-y-2 animate-in zoom-in-95">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">
                          Presensi {lastSubmission.type.toUpperCase()} Berhasil!
                        </h4>
                        <span className="text-[10px] text-emerald-700">{lastSubmission.timestamp}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-emerald-800 bg-white/80 p-2 rounded-lg font-mono">
                      <div>ID: {lastSubmission.id}</div>
                      <div>Status GPS: {lastSubmission.inSchoolRadius ? 'SAH (Dalam Radius SMKN)' : 'Peringatan Luar Radius'}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Android Native Navigation Bar (Pill / 3 Buttons) */}
              <div className="bg-slate-950 py-2.5 px-8 flex items-center justify-between text-slate-400 border-t border-slate-800/80 shrink-0">
                <button
                  onClick={() => setLastSubmission(null)}
                  className="p-1 hover:text-white cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLastSubmission(null)}
                  className="p-1 hover:text-white cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {}}
                  className="p-1 hover:text-white cursor-pointer"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Hardware Simulator Control Board */}
        <div className="lg:col-span-6 space-y-6">
          {/* Hardware Permissions Control Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                Panel Izin Hardware (WebChromeClient Hook)
              </h3>
              <span className="text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold">
                Android 6.0 - 15
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Camera Permission Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">android.permission.CAMERA</span>
                    <span className="text-[10px] text-slate-500">Izin kamera untuk selfie biometrik</span>
                  </div>
                </div>
                <select
                  value={permissions.camera}
                  onChange={(e) =>
                    setPermissions((prev) => ({ ...prev, camera: e.target.value as any }))
                  }
                  className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800"
                >
                  <option value="granted">Granted (Diizinkan)</option>
                  <option value="prompt">Prompt (Minta Konfirmasi)</option>
                  <option value="denied">Denied (Ditolak)</option>
                </select>
              </div>

              {/* GPS Permission Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">ACCESS_FINE_LOCATION</span>
                    <span className="text-[10px] text-slate-500">Izin GPS Geolocation presisi</span>
                  </div>
                </div>
                <select
                  value={permissions.location}
                  onChange={(e) =>
                    setPermissions((prev) => ({ ...prev, location: e.target.value as any }))
                  }
                  className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800"
                >
                  <option value="granted">Granted (Diizinkan)</option>
                  <option value="prompt">Prompt (Minta Konfirmasi)</option>
                  <option value="denied">Denied (Ditolak)</option>
                </select>
              </div>

              {/* Microphone Permission Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-700 flex items-center justify-center">
                    <Mic className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">RECORD_AUDIO</span>
                    <span className="text-[10px] text-slate-500">Izin audio &amp; pengenalan suara</span>
                  </div>
                </div>
                <select
                  value={permissions.audio}
                  onChange={(e) =>
                    setPermissions((prev) => ({ ...prev, audio: e.target.value as any }))
                  }
                  className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800"
                >
                  <option value="granted">Granted (Diizinkan)</option>
                  <option value="prompt">Prompt (Minta Konfirmasi)</option>
                  <option value="denied">Denied (Ditolak)</option>
                </select>
              </div>
            </div>
          </div>

          {/* GPS Location Spoofer / Tester */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Uji Coba Geofence SMKN Bojonggambir
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSetLocationPreset('school')}
                  className={`p-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-left ${
                    simulatedLoc.isSchool
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-1 ring-emerald-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Dalam Kampus
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Jarak ~12 meter (Valid)</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleSetLocationPreset('outside')}
                  className={`p-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-left ${
                    !simulatedLoc.isSchool
                      ? 'bg-red-50 border-red-400 text-red-800 ring-1 ring-red-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                    Luar Kampus
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Jarak ~1.6 km (Warning)</div>
                </button>
              </div>

              <button
                type="button"
                onClick={handleUseRealGPS}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Gunakan Koordinat GPS Asli Browser Saya
              </button>
            </div>
          </div>

          {/* User Profile Switcher for Testing */}
          <div className="bg-slate-900 text-slate-200 rounded-2xl p-5 border border-slate-800 space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">
              Ganti Akun Penguji Portal Presensi:
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setUserName('Dede Mulyana, S.Pd.');
                  setUserRole('Guru');
                  setUserNIP('198805122019031008');
                }}
                className={`p-2 rounded-lg border text-left cursor-pointer ${
                  userRole === 'Guru'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <div className="font-bold">Guru</div>
                <div className="text-[10px] text-slate-400 truncate">Dede Mulyana</div>
              </button>

              <button
                onClick={() => {
                  setUserName('Rina Herlina, S.Kom.');
                  setUserRole('Tenaga Kependidikan');
                  setUserNIP('199203152022012015');
                }}
                className={`p-2 rounded-lg border text-left cursor-pointer ${
                  userRole === 'Tenaga Kependidikan'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <div className="font-bold">Staf TU</div>
                <div className="text-[10px] text-slate-400 truncate">Rina Herlina</div>
              </button>

              <button
                onClick={() => {
                  setUserName('Ahmad Fauzan (XII RPL 1)');
                  setUserRole('Siswa');
                  setUserNIP('NISN. 0067823912');
                }}
                className={`p-2 rounded-lg border text-left cursor-pointer ${
                  userRole === 'Siswa'
                    ? 'bg-blue-600/30 border-blue-500 text-blue-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <div className="font-bold">Siswa</div>
                <div className="text-[10px] text-slate-400 truncate">Ahmad Fauzan</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
