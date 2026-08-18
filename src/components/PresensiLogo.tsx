import React from 'react';

interface PresensiLogoProps {
  size?: number;
  className?: string;
  variant?: 'full' | 'icon-only' | 'badge' | 'monochrome' | 'dark-mode' | '3d';
  showDetails?: boolean;
  withGlow?: boolean;
  id?: string;
}

export const PresensiLogo: React.FC<PresensiLogoProps> = ({
  size = 120,
  className = '',
  variant = 'full',
  showDetails = true,
  withGlow = false,
  id = 'presensi-logo',
}) => {
  const gradientId = `pg-grad-${id}`;
  const tealGradId = `teal-grad-${id}`;
  const accentGradId = `accent-grad-${id}`;
  const glowFilterId = `glow-${id}`;

  return (
    <div
      id={id}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 512 512"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-sm transition-all duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main P-G Monogram Gradient */}
          <linearGradient id={gradientId} x1="60" y1="60" x2="450" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>

          {/* Emerald / Teal Geolocation & Audio Wave Gradient */}
          <linearGradient id={tealGradId} x1="120" y1="40" x2="400" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="45%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* High-visibility Camera & GPS Marker Gradient */}
          <linearGradient id={accentGradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          {/* Optional Ambient Glow Filter */}
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {withGlow && (
          <circle
            cx="256"
            cy="256"
            r="190"
            fill={`url(#${gradientId})`}
            opacity="0.25"
            filter={`url(#${glowFilterId})`}
          />
        )}

        {/* Dynamic Monogram Base: Interlocking 'P' and 'G' Streamlines */}

        {/* --- Back Arc of 'G' (Arrow / Dynamic Loop) --- */}
        <path
          d="M370 180 C370 120 320 80 256 80 C160 80 88 155 88 256 C88 357 160 432 260 432 C345 432 410 375 420 290 L345 290 C336 330 300 362 258 362 C198 362 158 316 158 256 C158 196 198 150 256 150 C290 150 318 168 332 196 Z"
          fill={`url(#${tealGradId})`}
          fillRule="evenodd"
        />

        {/* --- Forward Bold 'P' Monogram Stem and Loop --- */}
        <path
          d="M130 110 H275 C345 110 395 155 395 225 C395 295 345 340 275 340 H195 V430 H130 V110 Z M195 175 V275 H265 C298 275 325 255 325 225 C325 195 298 175 265 175 H195 Z"
          fill={`url(#${gradientId})`}
          fillRule="evenodd"
        />

        {/* --- Integrated Micro-Icon 1: Camera Lens / Shutter in 'P' Loop --- */}
        {showDetails && (
          <g transform="translate(260, 225)">
            {/* Camera outer circle */}
            <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="#F8FAFC" strokeWidth="4" />
            {/* Shutter aperture ring */}
            <circle cx="0" cy="0" r="18" fill="#3B82F6" opacity="0.8" />
            <circle cx="0" cy="0" r="8" fill="#F8FAFC" />
            <circle cx="5" cy="-5" r="3" fill="#60A5FA" />
            {/* Small camera flash dot */}
            <circle cx="-16" cy="-16" r="3" fill="#F59E0B" />
          </g>
        )}

        {/* --- Integrated Micro-Icon 2: GPS Location Pin with Beacon at G's base/inner bar --- */}
        {showDetails && (
          <g transform="translate(375, 275)">
            {/* Pin body */}
            <path
              d="M0 -34 C-14 -34 -24 -24 -24 -10 C-24 10 0 34 0 34 C0 34 24 10 24 -10 C24 -24 14 -34 0 -34 Z"
              fill={`url(#${accentGradId})`}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
            />
            {/* Pin inner center target */}
            <circle cx="0" cy="-12" r="7" fill="#FFFFFF" />
            {/* GPS pulse ripple */}
            <circle cx="0" cy="-12" r="12" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" strokeDasharray="3 2" />
          </g>
        )}

        {/* --- Integrated Micro-Icon 3: Audio / Sound Wave bars across the P stem --- */}
        {showDetails && (
          <g transform="translate(162, 225)">
            <rect x="-16" y="-8" width="4" height="16" rx="2" fill="#38BDF8" />
            <rect x="-8" y="-18" width="4" height="36" rx="2" fill="#67E8F9" />
            <rect x="0" y="-28" width="4" height="56" rx="2" fill="#A7F3D0" />
            <rect x="8" y="-18" width="4" height="36" rx="2" fill="#67E8F9" />
            <rect x="16" y="-8" width="4" height="16" rx="2" fill="#38BDF8" />
          </g>
        )}

        {/* Top subtle gloss highlight */}
        <path
          d="M140 120 Q 256 80 370 120 Q 260 140 140 120 Z"
          fill="#FFFFFF"
          opacity="0.35"
        />
      </svg>
    </div>
  );
};
