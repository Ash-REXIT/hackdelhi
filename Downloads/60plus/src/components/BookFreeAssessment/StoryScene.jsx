import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import CharacterSVG from './CharacterSVG';
import HomeEnvironmentSVG from './HomeEnvironmentSVG';

/**
 * StoryScene — The persistent animation stage.
 * Pinned to the bottom of the viewport.
 * Contains: Home + Character.
 * Progress (0–1) drives all animation via GSAP.
 *
 * Uses gsap.utils.selector to target SVG elements inside child components
 * by their id attributes — no forwardRef complexity needed.
 */
export default function StoryScene({ progress = 0 }) {
  const containerRef = useRef(null);
  const [brightness, setBrightness] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const q = gsap.utils.selector(containerRef.current);

    // Build a paused timeline with all animation states
    const tl = gsap.timeline({ paused: true });

    // ── 0.00–0.15: Standing idle (breathing handled by CharacterSVG CSS) ──
    tl.to({}, { duration: 0.15 });

    // ── 0.15–0.25: Question mark appears above head ──
    tl.to('#question-mark', {
      opacity: 1,
      y: -5,
      duration: 0.10,
      ease: 'power2.out',
    }, 0.15);

    // ── 0.25–0.45: Walking through home + hazards appear ──
    tl.to('#character-group', {
      x: -120,
      duration: 0.20,
      ease: 'none',
    }, 0.25);

    // Arm swing
    tl.to('#left-arm', {
      rotation: -15,
      duration: 0.10,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
    }, 0.25);
    tl.to('#right-arm', {
      rotation: 15,
      duration: 0.10,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
    }, 0.25);

    // Leg cycle
    tl.to('#left-leg', {
      rotation: 10,
      x: -5,
      duration: 0.10,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
    }, 0.25);
    tl.to('#right-leg', {
      rotation: -10,
      x: 5,
      duration: 0.10,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1,
    }, 0.25);

    // ── Hazards fade in ──
    tl.to('#hazard-rug, #hazard-lighting, #hazard-wet-floor, #hazard-wires', {
      opacity: 1,
      duration: 0.15,
      stagger: 0.03,
    }, 0.30);

    // Dim room slightly
    tl.to({}, {
      duration: 0.05,
      onUpdate: function () {
        const p = this.progress() + 0.30;
        setBrightness(Math.max(0.82, 1 - (p * 0.18)));
      },
    }, 0.30);

    // ── 0.45–0.55: Continue walking, question mark fades ──
    tl.to('#question-mark', { opacity: 0, duration: 0.05 }, 0.45);
    tl.to('#character-group', { x: -200, duration: 0.10, ease: 'none' }, 0.45);

    // ── 0.55–0.70: Slip and fall ──
    tl.to('#character-group', {
      rotation: 12,
      x: -210,
      duration: 0.06,
      ease: 'power2.in',
    }, 0.55);

    // Arms flail
    tl.to('#left-arm', { rotation: -40, duration: 0.04 }, 0.57);
    tl.to('#right-arm', { rotation: 40, duration: 0.04 }, 0.57);

    // Fall — body goes down
    tl.to('#character-group', {
      rotation: 75,
      y: 120,
      x: -220,
      duration: 0.09,
      ease: 'power3.in',
    }, 0.61);

    // Settle on ground
    tl.to('#character-group', { rotation: 80, duration: 0.02 }, 0.68);

    // ── 0.70–0.85: On ground, hazards still visible ──
    tl.to({}, { duration: 0.15 });

    // ── 0.85–1.00: Recovery ──
    // Get up
    tl.to('#character-group', {
      rotation: 0,
      y: 0,
      x: -80,
      duration: 0.06,
      ease: 'power2.out',
    }, 0.85);

    // Reset arms and legs
    tl.to('#left-arm, #right-arm', { rotation: 0, duration: 0.04 }, 0.85);
    tl.to('#left-leg, #right-leg', { rotation: 0, x: 0, duration: 0.04 }, 0.85);

    // Hazards fade out
    tl.to('#hazard-rug, #hazard-lighting, #hazard-wet-floor, #hazard-wires', {
      opacity: 0,
      duration: 0.06,
    }, 0.85);

    // Safety items appear
    tl.to('#safety-grab-bars, #safety-anti-slip, #safety-rug-fixed, #safety-handrail, #safety-bright-light', {
      opacity: 1,
      duration: 0.06,
      stagger: 0.02,
    }, 0.87);

    // Brighten room
    tl.to({}, {
      duration: 0.08,
      onUpdate: function () {
        setBrightness(1);
      },
    }, 0.87);

    // Smile and thumbs up
    tl.to('#smile-happy', { opacity: 1, duration: 0.04 }, 0.92);
    tl.to('#thumb', { opacity: 1, duration: 0.04 }, 0.92);
    tl.to('#right-arm', { rotation: -45, duration: 0.04, ease: 'power2.out' }, 0.92);

    // Seek to current progress
    tl.progress(progress);

    return () => {
      tl.kill();
    };
  }, [progress]);

  return (
    <div ref={containerRef} className="story-scene">
      <div className="story-scene__home">
        <HomeEnvironmentSVG brightness={brightness} />
      </div>
      <div className="story-scene__character">
        <CharacterSVG />
      </div>
      <style>{`
        .story-scene {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: linear-gradient(180deg, #f8f5f0 0%, #f0ebe0 100%);
        }
        .story-scene__home {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 85%;
        }
        .story-scene__character {
          position: absolute;
          bottom: 5%;
          left: 45%;
          transform: translateX(-50%);
          width: 90px;
          height: 180px;
          z-index: 10;
        }

        /* Character breathing — always running */
        @keyframes breathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.012); }
        }
        #body {
          animation: breathe 2.5s ease-in-out infinite;
          transform-origin: center bottom;
        }

        /* Hazard pulse animations */
        @keyframes hazard-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .hazard-glow {
          animation: hazard-pulse 2s ease-in-out infinite;
        }

        /* GSAP animated elements need transform-origin hints */
        #character-group {
          transform-origin: center bottom;
        }
        #left-arm {
          transform-origin: 72px 180px;
        }
        #right-arm {
          transform-origin: 128px 180px;
        }
        #left-leg {
          transform-origin: 88px 290px;
        }
        #right-leg {
          transform-origin: 112px 290px;
        }

        @media (max-width: 768px) {
          .story-scene__character {
            width: 65px;
            height: 130px;
            bottom: 8%;
            left: 40%;
          }
          .story-scene__home {
            height: 90%;
          }
        }
      `}</style>
    </div>
  );
}
