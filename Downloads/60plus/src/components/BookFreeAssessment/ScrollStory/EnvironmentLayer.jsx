import React, { useRef, useLayoutEffect } from 'react';
import { useScene } from './SceneController';

export default function EnvironmentLayer() {
  const { timeline } = useScene();
  
  // Base Refs
  const overlayRef = useRef(null);
  const vignetteRef = useRef(null);
  const blurRef = useRef(null);

  // Scene 1: Ambient Elements
  const fanRef = useRef(null);
  const clockHandsRef = useRef(null);
  const curtainRef = useRef(null);
  const lightRaysRef = useRef(null);

  // Scene 2 & 4: Hazards
  const rugRef = useRef(null);
  const bathroomRef = useRef(null);
  const stairShadowsRef = useRef(null);

  // Scene 4: Highlights
  const hazardHighlightRef = useRef(null);

  // Scene 5: Solutions
  const grabBarsRef = useRef(null);

  useLayoutEffect(() => {
    if (!timeline) return;

    /* =========================================
       CONTINUOUS SCROLL-LINKED WORLD PHYSICS
       ========================================= */
    // The world only moves when you scroll. Everything reverses perfectly.
    
    // Ceiling Fan Rotation (rotates multiple times across the 100-duration scroll)
    timeline.to(fanRef.current, { rotation: 1080, ease: "none", duration: 100 }, 0);
    
    // Clock Ticking (spins forward as time passes)
    timeline.to(clockHandsRef.current, { rotation: 360, ease: "none", duration: 100 }, 0);
    
    // Curtain Sway (subtle back and forth linked to scroll)
    for (let i = 0; i < 100; i += 10) {
      timeline.to(curtainRef.current, { rotation: 2, ease: "power1.inOut", duration: 5 }, i);
      timeline.to(curtainRef.current, { rotation: -2, ease: "power1.inOut", duration: 5 }, i + 5);
    }


    /* =========================================
       SCENE 1: WARMTH (0 - 15)
       ========================================= */
    // Warm light rays enter and gently shift
    timeline.fromTo(lightRaysRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 0.6, x: 0, duration: 15, ease: "power2.out" }, 
      0
    );


    /* =========================================
       SCENE 2: GROWING RISKS (15 - 35)
       ========================================= */
    // Rug subtly curls up (Scale/Skew mapping)
    timeline.to(rugRef.current, { 
      borderTopRightRadius: "30%", 
      transform: "translateY(-5px) skewY(-5deg)", 
      boxShadow: "5px 5px 15px rgba(0,0,0,0.5)",
      duration: 20 
    }, 15);

    // Bathroom floor reflection slowly appears (wet floor)
    timeline.to(bathroomRef.current, { opacity: 0.7, duration: 20 }, 15);

    // Stair shadows deepen
    timeline.to(stairShadowsRef.current, { opacity: 0.8, duration: 20 }, 15);


    /* =========================================
       SCENE 3: THE FOCUS / THE FALL (35 - 65)
       ========================================= */
    // Vignette darkens dramatically to tunnel vision on the character
    timeline.to(vignetteRef.current, { opacity: 0.9, duration: 20, ease: "power2.in" }, 35);
    
    // Environmental focus shift (Background blurs slightly behind character)
    timeline.to(blurRef.current, { backdropFilter: "blur(4px)", duration: 15 }, 45);
    
    // Overall room dims
    timeline.to(overlayRef.current, { opacity: 0.6, backgroundColor: "#0a0514", duration: 20 }, 35);


    /* =========================================
       SCENE 4: HAZARD REVEAL (65 - 85)
       ========================================= */
    // Red/warning highlights pulse on the hazards as the text cascades
    timeline.to(hazardHighlightRef.current, { opacity: 1, duration: 10 }, 70);
    // Vignette lifts slightly to reveal the room's dangers
    timeline.to(vignetteRef.current, { opacity: 0.5, duration: 10 }, 75);


    /* =========================================
       SCENE 5: RESOLUTION (85 - 100)
       ========================================= */
    // Lighting completely improves
    timeline.to(overlayRef.current, { opacity: 0, duration: 10 }, 85);
    timeline.to(blurRef.current, { backdropFilter: "blur(0px)", duration: 10 }, 85);
    timeline.to(vignetteRef.current, { opacity: 0, duration: 10 }, 85);
    timeline.to(hazardHighlightRef.current, { opacity: 0, duration: 5 }, 85);

    // Grab bars smoothly fade in
    timeline.to(grabBarsRef.current, { opacity: 1, y: 0, duration: 10, ease: "back.out(1.2)" }, 85);

    // Rug flattens out perfectly
    timeline.to(rugRef.current, { 
      borderTopRightRadius: "0%", 
      transform: "translateY(0px) skewY(0deg)", 
      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
      duration: 10 
    }, 85);

    // Bathroom dries (reflection fades)
    timeline.to(bathroomRef.current, { opacity: 0, duration: 10 }, 85);

    // Light rays become brighter and warmer
    timeline.to(lightRaysRef.current, { opacity: 0.8, x: 20, duration: 15 }, 85);

  }, [timeline]);

  return (
    <div className="environment-layer">
      
      {/* 1. Base Room Layer */}
      <div className="layer-base room-background">
        <img src="/assets/story/bg_home.png" alt="High-Res Indian Home" className="base-image" />
      </div>

      {/* 2. Interactive Environmental Elements */}
      <div ref={blurRef} className="layer-blur-filter">
        
        {/* Ambient Assets */}
        <div ref={lightRaysRef} className="asset light-rays">[Warm Light Rays]</div>
        <div ref={curtainRef} className="asset curtain">[Curtain]</div>
        <div ref={fanRef} className="asset ceiling-fan">[Ceiling Fan]</div>
        <div ref={clockHandsRef} className="asset clock-hands">[Clock Hands]</div>

        {/* Hazard Assets */}
        <div ref={stairShadowsRef} className="asset stair-shadows">[Stair Shadows]</div>
        <div ref={bathroomRef} className="asset bathroom-puddle">[Wet Floor Reflection]</div>
        <div ref={rugRef} className="asset loose-rug">[Loose Rug]</div>

        {/* Solution Assets */}
        <div ref={grabBarsRef} className="asset grab-bars">[Installed Grab Bars]</div>

      </div>

      {/* 3. Global Cinematic Lighting Overlays */}
      <div ref={overlayRef} className="layer-lighting-overlay" />
      <div ref={vignetteRef} className="layer-vignette" />
      <div ref={hazardHighlightRef} className="layer-hazard-highlight">
        <div className="highlight-circle rug-spot"></div>
        <div className="highlight-circle bath-spot"></div>
      </div>

      <style>{`
        .environment-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #111;
        }

        .layer-base, .layer-blur-filter, .layer-lighting-overlay, .layer-vignette, .layer-hazard-highlight {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* The Base Image */
        .room-background {
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .base-image {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Ensures the image fills the screen */
        }

        /* Abstract Asset Positioning (to be replaced by absolute PNG positioning) */
        .asset {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: monospace;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.8);
          border: 1px dashed rgba(255,255,255,0.3);
          background: rgba(0,0,0,0.2);
        }

        /* Scene 1: Ambient Elements */
        .ceiling-fan { top: 5%; left: 45%; width: 10%; height: 10px; transform-origin: center; }
        .clock-hands { top: 20%; left: 65%; width: 2px; height: 30px; background: #fff; transform-origin: bottom center; }
        .curtain { top: 10%; left: 5%; width: 80px; height: 300px; transform-origin: top center; }
        .light-rays { top: 0; left: -10%; width: 50%; height: 100%; background: linear-gradient(105deg, rgba(255,230,150,0.15) 0%, transparent 60%); border: none; opacity: 0; }

        /* Scene 2 & 4: Hazards */
        .loose-rug { bottom: 15%; left: 35%; width: 150px; height: 40px; background: #6b4c3a; transform-origin: bottom left; transition: none; }
        .bathroom-puddle { bottom: 20%; right: 20%; width: 100px; height: 30px; background: rgba(150,200,255,0.2); border-radius: 50%; filter: blur(4px); opacity: 0; }
        .stair-shadows { top: 30%; right: 5%; width: 150px; height: 200px; background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8)); opacity: 0; border: none; }

        /* Scene 5: Solutions */
        .grab-bars { bottom: 25%; right: 18%; width: 80px; height: 10px; background: silver; border-radius: 10px; opacity: 0; transform: translateY(-10px); border: none; box-shadow: 0 5px 10px rgba(0,0,0,0.3); }

        /* Cinematic Filters */
        .layer-lighting-overlay {
          background-color: #000;
          opacity: 0;
          mix-blend-mode: multiply;
        }

        .layer-vignette {
          background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.95) 100%);
          opacity: 0;
        }

        .layer-hazard-highlight {
          opacity: 0;
        }

        .highlight-circle {
          position: absolute;
          width: 200px;
          height: 100px;
          border-radius: 50%;
          box-shadow: 0 0 40px 10px rgba(255, 50, 50, 0.4);
          background: radial-gradient(circle, rgba(255,50,50,0.2) 0%, transparent 70%);
        }

        .rug-spot { bottom: 12%; left: 33%; }
        .bath-spot { bottom: 17%; right: 17%; }

      `}</style>
    </div>
  );
}
