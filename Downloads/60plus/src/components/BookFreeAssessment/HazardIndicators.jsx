import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * HazardIndicators — Soft pulsing glow dots positioned over hazard spots.
 * Opacity controlled by GSAP based on timeline progress.
 */
export default function HazardIndicators({ progress = 0 }) {
  const rugRef = useRef(null);
  const lightingRef = useRef(null);
  const wetFloorRef = useRef(null);
  const wiresRef = useRef(null);

  useEffect(() => {
    const els = [rugRef, lightingRef, wetFloorRef, wiresRef]
      .map(r => r.current)
      .filter(Boolean);

    if (!els.length) return;

    // Hazards fade in during 0.25–0.45, stay during 0.45–0.70, fade out during 0.70–0.85
    const hazardOpacity = (() => {
      if (progress < 0.20) return 0;
      if (progress < 0.45) return (progress - 0.20) / 0.25;
      if (progress < 0.70) return 1;
      if (progress < 0.85) return 1 - ((progress - 0.70) / 0.15);
      return 0;
    })();

    els.forEach(el => {
      gsap.to(el, { opacity: hazardOpacity, duration: 0.1, ease: 'none' });
    });
  }, [progress]);

  return (
    <g>
      {/* Rug hazard pulse */}
      <circle ref={rugRef} cx="360" cy="380" r="8" fill="#ff6b3530" opacity="0">
        <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Lighting hazard pulse */}
      <circle ref={lightingRef} cx="400" cy="30" r="6" fill="#ff6b3530" opacity="0">
        <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
      </circle>

      {/* Wet floor hazard pulse */}
      <circle ref={wetFloorRef} cx="770" cy="365" r="7" fill="#ff6b3530" opacity="0">
        <animate attributeName="r" values="7;11;7" dur="2.2s" repeatCount="indefinite" />
      </circle>

      {/* Wires hazard pulse */}
      <circle ref={wiresRef} cx="190" cy="340" r="6" fill="#ff6b3530" opacity="0">
        <animate attributeName="r" values="6;9;6" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}
