import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * CharacterSVG — One persistent elderly Indian character.
 * Upper-middle-class Chennai elder: simple veshti/shirt for male,
 * tidy hair, glasses (optional), confident posture.
 *
 * SVG is layered with <g> groups for GSAP control:
 * - head, body, leftArm, rightArm, leftLeg, rightLeg
 * - questionMark (hidden initially)
 *
 * All parts have refs for GSAP animation.
 */
export default function CharacterSVG({ progress = 0 }) {
  const characterRef = useRef(null);
  const headRef = useRef(null);
  const bodyRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const leftLegRef = useRef(null);
  const rightLegRef = useRef(null);
  const questionMarkRef = useRef(null);
  const faceRef = useRef(null);

  // Breathing animation — always running, subtle
  useEffect(() => {
    if (!bodyRef.current) return;
    const breathe = gsap.to(bodyRef.current, {
      scaleY: 1.015,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      transformOrigin: 'center bottom',
    });
    return () => { breathe.kill(); };
  }, []);

  return (
    <svg
      ref={characterRef}
      viewBox="0 0 200 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        {/* Skin tone */}
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#c49464" />
        </linearGradient>
        {/* Shirt gradient */}
        <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f0" />
          <stop offset="100%" stopColor="#e8e8e0" />
        </linearGradient>
        {/* Veshti gradient */}
        <linearGradient id="veshtiGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffef8" />
          <stop offset="100%" stopColor="#f0efe6" />
        </linearGradient>
      </defs>

      {/* Character group — translated by GSAP for walking */}
      <g id="character-group">

        {/* Question Mark — hidden initially, GSAP fades in */}
        <g ref={questionMarkRef} opacity="0" id="question-mark">
          <text
            x="105" y="45"
            fontFamily="Gambarino, serif"
            fontSize="42"
            fill="#8235d0"
            textAnchor="middle"
            font-weight="bold"
          >?</text>
        </g>

        {/* Left Leg */}
        <g ref={leftLegRef} id="left-leg">
          <path
            d="M 88 290 Q 85 320 82 360 Q 80 370 85 375"
            stroke="url(#skinGrad)" strokeWidth="18" fill="none" strokeLinecap="round"
          />
          {/* Slipper */}
          <ellipse cx="87" cy="378" rx="14" ry="6" fill="#5a4a3a" />
        </g>

        {/* Right Leg */}
        <g ref={rightLegRef} id="right-leg">
          <path
            d="M 112 290 Q 115 320 118 360 Q 120 370 115 375"
            stroke="url(#skinGrad)" strokeWidth="18" fill="none" strokeLinecap="round"
          />
          {/* Slipper */}
          <ellipse cx="113" cy="378" rx="14" ry="6" fill="#5a4a3a" />
        </g>

        {/* Veshti / Lower garment */}
        <path
          d="M 75 240 Q 70 270 65 300 L 135 300 Q 130 270 125 240 Z"
          fill="url(#veshtiGrad)" stroke="#d8d8c8" strokeWidth="0.5"
        />

        {/* Body / Shirt */}
        <g ref={bodyRef} id="body">
          <path
            d="M 72 175 Q 65 200 68 245 L 132 245 Q 135 200 128 175 Z"
            fill="url(#shirtGrad)" stroke="#d0d0c0" strokeWidth="0.5"
          />
          {/* Shirt buttons */}
          <circle cx="100" cy="195" r="2" fill="#bbb" />
          <circle cx="100" cy="210" r="2" fill="#bbb" />
          <circle cx="100" cy="225" r="2" fill="#bbb" />
        </g>

        {/* Left Arm */}
        <g ref={leftArmRef} id="left-arm" style={{ transformOrigin: '72px 180px' }}>
          <path
            d="M 72 180 Q 55 210 50 250"
            stroke="url(#skinGrad)" strokeWidth="14" fill="none" strokeLinecap="round"
          />
          {/* Hand */}
          <circle cx="50" cy="252" r="8" fill="#d4a574" />
        </g>

        {/* Right Arm */}
        <g ref={rightArmRef} id="right-arm" style={{ transformOrigin: '128px 180px' }}>
          <path
            d="M 128 180 Q 145 210 150 250"
            stroke="url(#skinGrad)" strokeWidth="14" fill="none" strokeLinecap="round"
          />
          {/* Hand */}
          <circle cx="150" cy="252" r="8" fill="#d4a574" />
          {/* Thumb (for thumbs up state) */}
          <g id="thumb" opacity="0">
            <path
              d="M 150 244 Q 155 230 152 220"
              stroke="#d4a574" strokeWidth="7" fill="none" strokeLinecap="round"
            />
          </g>
        </g>

        {/* Neck */}
        <rect x="92" y="160" width="16" height="18" rx="8" fill="#d4a574" />

        {/* Head */}
        <g ref={headRef} id="head">
          {/* Face */}
          <ellipse cx="100" cy="140" rx="30" ry="32" fill="url(#skinGrad)" />

          {/* Hair — grey, neatly combed back (Chennai elder) */}
          <path
            d="M 70 135 Q 70 100 100 95 Q 130 100 130 135"
            fill="#a0a0a0" stroke="none"
          />
          <path
            d="M 72 132 Q 75 105 100 100 Q 125 105 128 132"
            fill="#b0b0b0" stroke="none"
          />

          {/* Glasses */}
          <g id="glasses">
            <circle cx="90" cy="140" r="8" stroke="#666" strokeWidth="1.5" fill="none" />
            <circle cx="110" cy="140" r="8" stroke="#666" strokeWidth="1.5" fill="none" />
            <line x1="98" y1="140" x2="102" y2="140" stroke="#666" strokeWidth="1.5" />
            <line x1="82" y1="138" x2="74" y2="136" stroke="#666" strokeWidth="1.5" />
            <line x1="118" y1="138" x2="126" y2="136" stroke="#666" strokeWidth="1.5" />
          </g>

          {/* Face features */}
          <g ref={faceRef} id="face">
            {/* Eyes */}
            <ellipse cx="90" cy="140" rx="3" ry="2.5" fill="#2a1a0a" />
            <ellipse cx="110" cy="140" rx="3" ry="2.5" fill="#2a1a0a" />

            {/* Eyebrows */}
            <path d="M 84 133 Q 90 130 96 133" stroke="#888" strokeWidth="1.2" fill="none" />
            <path d="M 104 133 Q 110 130 116 133" stroke="#888" strokeWidth="1.2" fill="none" />

            {/* Nose */}
            <path d="M 100 143 Q 98 150 100 152 Q 102 150 100 152" stroke="#b08060" strokeWidth="1" fill="none" />

            {/* Mouth — calm, neutral */}
            <path d="M 92 158 Q 100 162 108 158" stroke="#c49464" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Smile overlay — hidden, GSAP shows for thumbs up */}
            <path id="smile-happy" d="M 90 157 Q 100 166 110 157" stroke="#c49464" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0" />
          </g>

          {/* Tilak / vibhuti — subtle */}
          <circle cx="100" cy="120" r="3" fill="#e8ddd0" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}
