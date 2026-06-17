import React from 'react';

/**
 * HomeEnvironmentSVG — Persistent Chennai upper-middle-class home.
 * Clean, natural, realistic. Not luxury, not poor.
 *
 * Layers:
 * - Base room (always visible)
 * - Furniture (sofa, table, TV unit)
 * - Kitchen area (counter)
 * - Bathroom entrance
 * - Stair area
 * - Hazard overlays (loose rug, dim light, wet floor, exposed wires)
 * - Safety overlays (grab bars, brighter light, anti-slip mat)
 *
 * Lighting controlled via SVG filter for brightness changes.
 */
export default function HomeEnvironmentSVG({ progress = 0, brightness = 1 }) {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <defs>
        {/* Lighting filter — controlled by brightness prop */}
        <filter id="lighting-filter">
          <feColorMatrix type="matrix" values={
            `${brightness} 0 0 0 0
             0 ${brightness} 0 0 0
             0 0 ${brightness} 0 0
             0 0 0 1 0`
          } />
        </filter>

        {/* Soft shadow for depth */}
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#00000015" />
        </filter>

        {/* Wall pattern */}
        <pattern id="wall-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#f5f0e8" />
          <rect width="40" height="1" fill="#ede8e0" />
          <rect width="1" height="40" fill="#ede8e0" />
        </pattern>

        {/* Floor pattern */}
        <pattern id="floor-pattern" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
          <rect width="60" height="30" fill="#d4c8a8" />
          <rect x="0" y="0" width="30" height="15" fill="#d8ccad" />
          <rect x="30" y="15" width="30" height="15" fill="#d8ccad" />
          <rect width="60" height="0.5" fill="#c8bc9a" />
          <rect width="0.5" height="30" fill="#c8bc9a" />
        </pattern>

        {/* Hazard glow */}
        <radialGradient id="hazard-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6b3520" />
          <stop offset="100%" stopColor="#ff6b3500" />
        </radialGradient>

        {/* Safety glow */}
        <radialGradient id="safety-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2ecc7120" />
          <stop offset="100%" stopColor="#2ecc7100" />
        </radialGradient>
      </defs>

      <g id="home-group" filter="url(#lighting-filter)">

        {/* ── WALLS ── */}
        <rect x="0" y="0" width="800" height="350" fill="url(#wall-pattern)" />
        {/* Wall border line */}
        <line x1="0" y1="350" x2="800" y2="350" stroke="#c8bc9a" strokeWidth="2" />

        {/* ── FLOOR ── */}
        <rect x="0" y="350" width="800" height="150" fill="url(#floor-pattern)" />

        {/* ── LIVING ROOM (left side) ── */}

        {/* Window */}
        <rect x="50" y="60" width="120" height="150" rx="4" fill="#e8f0f8" stroke="#b8c8d0" strokeWidth="2" />
        <line x1="110" y1="60" x2="110" y2="210" stroke="#b8c8d0" strokeWidth="1.5" />
        <line x1="50" y1="135" x2="170" y2="135" stroke="#b8c8d0" strokeWidth="1.5" />
        {/* Curtains */}
        <path d="M 45 55 Q 55 130 48 215" stroke="#e0d5c5" strokeWidth="8" fill="none" opacity="0.6" />
        <path d="M 175 55 Q 165 130 172 215" stroke="#e0d5c5" strokeWidth="8" fill="none" opacity="0.6" />

        {/* Sofa — classic Chennai 3-seater */}
        <g id="sofa" filter="url(#soft-shadow)">
          <rect x="240" y="260" width="200" height="80" rx="10" fill="#8B4513" />
          <rect x="235" y="240" width="210" height="30" rx="8" fill="#A0522D" />
          {/* Cushions */}
          <rect x="260" y="270" width="50" height="55" rx="6" fill="#CD853F" opacity="0.4" />
          <rect x="320" y="270" width="50" height="55" rx="6" fill="#CD853F" opacity="0.4" />
          <rect x="380" y="270" width="50" height="55" rx="6" fill="#CD853F" opacity="0.4" />
          {/* Sofa legs */}
          <rect x="250" y="340" width="8" height="12" rx="2" fill="#5a3a1a" />
          <rect x="422" y="340" width="8" height="12" rx="2" fill="#5a3a1a" />
        </g>

        {/* Coffee table */}
        <g id="coffee-table" filter="url(#soft-shadow)">
          <rect x="280" y="320" width="120" height="8" rx="3" fill="#6a4a2a" />
          <rect x="290" y="328" width="6" height="22" fill="#5a3a1a" />
          <rect x="384" y="328" width="6" height="22" fill="#5a3a1a" />
          {/* Puja item on table */}
          <rect x="320" y="312" width="12" height="8" rx="2" fill="#d4a574" opacity="0.7" />
          <circle cx="326" cy="310" r="3" fill="#ff9933" opacity="0.5" />
        </g>

        {/* TV Unit */}
        <g id="tv-unit">
          <rect x="30" y="230" width="140" height="90" rx="4" fill="#3a2a1a" />
          <rect x="40" y="238" width="120" height="68" rx="2" fill="#1a1a2a" />
          {/* TV screen reflection */}
          <rect x="42" y="240" width="116" height="64" rx="1" fill="#2a2a3a" opacity="0.8" />
          {/* TV unit cabinet */}
          <rect x="30" y="320" width="140" height="35" rx="4" fill="#4a3a2a" />
          <circle cx="100" cy="338" r="3" fill="#8a7a6a" />
        </g>

        {/* ── KITCHEN AREA (right side) ── */}
        <g id="kitchen">
          {/* Kitchen counter */}
          <rect x="560" y="240" width="220" height="110" rx="4" fill="#e8e0d0" stroke="#d0c8b8" strokeWidth="1" />
          <rect x="560" y="235" width="220" height="12" rx="2" fill="#d0c8b8" />
          {/* Stove */}
          <rect x="590" y="260" width="50" height="40" rx="4" fill="#444" />
          <circle cx="605" cy="280" r="8" stroke="#666" strokeWidth="1" fill="#333" />
          <circle cx="625" cy="280" r="8" stroke="#666" strokeWidth="1" fill="#333" />
          {/* Kitchen shelf */}
          <rect x="570" y="180" width="200" height="8" rx="2" fill="#b8a888" />
          {/* Utensils on shelf */}
          <rect x="600" y="165" width="15" height="15" rx="2" fill="#c8c0b0" />
          <rect x="640" y="170" width="20" height="10" rx="2" fill="#b0a890" />
          <rect x="700" y="168" width="12" height="12" rx="2" fill="#d0c8b8" />
        </g>

        {/* ── BATHROOM ENTRANCE (far right) ── */}
        <g id="bathroom-entrance">
          {/* Door frame */}
          <rect x="750" y="120" width="50" height="230" fill="#e0d8c8" stroke="#c8c0b0" strokeWidth="1" />
          {/* Door */}
          <rect x="755" y="125" width="45" height="220" rx="2" fill="#f0ebe0" stroke="#d8d0c0" strokeWidth="0.5" />
          {/* Door handle */}
          <circle cx="793" cy="235" r="3" fill="#b0a890" />
          {/* "Bathroom" tile pattern hint */}
          <rect x="758" y="130" width="39" height="30" rx="1" fill="#d8e8e0" opacity="0.3" />
        </g>

        {/* ── STAIR AREA (background, left) ── */}
        <g id="stair-area">
          {/* Stair visible through an opening */}
          <rect x="0" y="200" width="40" height="150" fill="#d0c8b0" />
          {/* Steps */}
          <line x1="0" y1="220" x2="40" y2="220" stroke="#b8b098" strokeWidth="1" />
          <line x1="0" y1="240" x2="40" y2="240" stroke="#b8b098" strokeWidth="1" />
          <line x1="0" y1="260" x2="40" y2="260" stroke="#b8b098" strokeWidth="1" />
          <line x1="0" y1="280" x2="40" y2="280" stroke="#b8b098" strokeWidth="1" />
          <line x1="0" y1="300" x2="40" y2="300" stroke="#b8b098" strokeWidth="1" />
          {/* Handrail */}
          <line x1="5" y1="200" x2="5" y2="350" stroke="#8a7a6a" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* ── CEILING LIGHT ── */}
        <g id="ceiling-light">
          <line x1="400" y1="0" x2="400" y2="25" stroke="#888" strokeWidth="1.5" />
          <ellipse cx="400" cy="30" rx="25" ry="8" fill="#f0e8d0" stroke="#d0c8b0" strokeWidth="1" />
          {/* Light glow */}
          <ellipse cx="400" cy="35" rx="60" ry="30" fill="#fff8e0" opacity="0.15" />
        </g>

        {/* ── HAZARD OVERLAYS (hidden initially, GSAP controls opacity) ── */}

        {/* Loose rug near sofa */}
        <g id="hazard-rug" opacity="0">
          <ellipse cx="360" cy="380" rx="50" ry="15" fill="#c8a878" opacity="0.6" />
          {/* Rug edge slightly curled — subtle tripping hazard */}
          <path d="M 310 380 Q 315 375 320 380" stroke="#a88858" strokeWidth="2" fill="none" />
          {/* Hazard glow */}
          <ellipse cx="360" cy="380" rx="60" ry="25" fill="url(#hazard-glow)" />
        </g>

        {/* Poor lighting indicator */}
        <g id="hazard-lighting" opacity="0">
          <ellipse cx="400" cy="30" rx="40" ry="15" fill="#ff6b3515" />
          {/* Dim overlay on entire room */}
          <rect x="0" y="0" width="800" height="500" fill="#00000008" />
        </g>

        {/* Wet floor near bathroom */}
        <g id="hazard-wet-floor" opacity="0">
          <ellipse cx="770" cy="365" rx="35" ry="12" fill="#88b8d8" opacity="0.3" />
          <ellipse cx="770" cy="365" rx="45" ry="20" fill="url(#hazard-glow)" />
        </g>

        {/* Exposed wires near TV */}
        <g id="hazard-wires" opacity="0">
          <path d="M 170 300 Q 190 310 195 330 Q 200 345 185 350" stroke="#333" strokeWidth="2" fill="none" />
          <ellipse cx="185" cy="350" rx="15" ry="10" fill="url(#hazard-glow)" />
        </g>

        {/* ── SAFETY OVERLAYS (hidden initially, GSAP shows at recovery) ── */}

        {/* Grab bars in bathroom */}
        <g id="safety-grab-bars" opacity="0">
          <line x1="760" y1="180" x2="795" y2="180" stroke="#c0c0c0" strokeWidth="3" strokeLinecap="round" />
          <line x1="760" y1="220" x2="795" y2="220" stroke="#c0c0c0" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Anti-slip mat */}
        <g id="safety-anti-slip" opacity="0">
          <rect x="740" y="358" width="55" height="12" rx="3" fill="#4a9" opacity="0.4" />
        </g>

        {/* Rug removed / flat */}
        <g id="safety-rug-fixed" opacity="0">
          <ellipse cx="360" cy="383" rx="50" ry="8" fill="#c8a878" opacity="0.3" />
        </g>

        {/* Stair handrail reinforced */}
        <g id="safety-handrail" opacity="0">
          <line x1="5" y1="200" x2="5" y2="350" stroke="#e8a020" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="5" cy="350" rx="15" ry="8" fill="url(#safety-glow)" />
        </g>

        {/* Brighter ceiling light */}
        <g id="safety-bright-light" opacity="0">
          <ellipse cx="400" cy="35" rx="100" ry="50" fill="#fff8e0" opacity="0.25" />
        </g>

      </g>
    </svg>
  );
}
