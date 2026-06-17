import React, { useRef, useLayoutEffect, useState } from 'react';
import { useScene } from './SceneController';

export default function CharacterSystem() {
  const { timeline } = useScene();
  const characterContainerRef = useRef(null);
  const characterSpriteRef = useRef(null);
  const questionMarkRef = useRef(null);
  const [characterState, setCharacterState] = useState('Standing');

  // Map the timeline states to the generated image files
  const getCharacterImageName = (state) => {
    switch(state) {
      case 'Walking': return 'standing'; // Since we didn't generate a separate walking cycle, we use standing and rely on the physical GSAP sway/bounce
      case 'Stumble -> Fall': return 'stumble';
      case 'On Floor': return 'fall';
      case 'Standing Up': return 'stumble'; // Reverse the stumble
      case 'Thumbs Up': return 'thumbsup';
      default: return 'standing';
    }
  };

  useLayoutEffect(() => {
    if (!timeline || !characterContainerRef.current) return;

    // 0-15: Standing (Idle, Question mark appears)
    timeline.add(() => setCharacterState('Standing'), 0);
    timeline.to(questionMarkRef.current, { opacity: 1, y: -10, duration: 5, ease: "power1.out" }, 5);
    timeline.to(questionMarkRef.current, { opacity: 0, duration: 5 }, 12);

    // 15-35: Walking (Moves right, adds body sway and subtle vertical bounce)
    timeline.add(() => setCharacterState('Walking'), 15);
    
    // Main horizontal translation using vw to ensure proper movement across the screen
    timeline.to(characterContainerRef.current, {
      x: '20vw', 
      ease: "none",
      duration: 20
    }, 15);

    // Simulated walking physics (bounce & sway) during 15-35
    // We add multiple small tweens to simulate the rhythm
    for (let i = 15; i < 35; i += 2) {
      timeline.to(characterSpriteRef.current, {
        y: -5,
        rotation: 2,
        duration: 1,
        ease: "power1.out"
      }, i);
      timeline.to(characterSpriteRef.current, {
        y: 0,
        rotation: -2,
        duration: 1,
        ease: "power1.in"
      }, i + 1);
    }
    // Reset rotation after walk
    timeline.to(characterSpriteRef.current, { rotation: 0, y: 0, duration: 0.5 }, 35);

    // 35-50: Continue walking (Hazard Discovery)
    timeline.add(() => setCharacterState('Walking'), 35);
    timeline.to(characterContainerRef.current, {
      x: '35vw',
      ease: "none",
      duration: 15
    }, 35);

    for (let i = 35; i < 50; i += 2) {
      timeline.to(characterSpriteRef.current, { y: -5, rotation: 2, duration: 1, ease: "power1.out" }, i);
      timeline.to(characterSpriteRef.current, { y: 0, rotation: -2, duration: 1, ease: "power1.in" }, i + 1);
    }
    timeline.to(characterSpriteRef.current, { rotation: 0, y: 0, duration: 0.5 }, 50);

    // 50-65: Stumble & Fall
    timeline.add(() => setCharacterState('Stumble -> Fall'), 50);
    timeline.to(characterContainerRef.current, {
      x: '45vw', // Forward momentum
      ease: "power2.out",
      duration: 15
    }, 50);
    timeline.to(characterSpriteRef.current, {
      rotation: 80, // Falling forward
      y: 120, // Hitting the floor
      ease: "bounce.out", // Natural weight impact
      duration: 10
    }, 52);

    // 65-80: On Floor
    timeline.add(() => setCharacterState('On Floor'), 65);
    // Subtle breathing while on floor
    for (let i = 65; i < 80; i += 3) {
      timeline.to(characterSpriteRef.current, { scaleY: 1.05, duration: 1.5, ease: "power1.inOut" }, i);
      timeline.to(characterSpriteRef.current, { scaleY: 1, duration: 1.5, ease: "power1.inOut" }, i + 1.5);
    }

    // 80-90: Standing Up
    timeline.add(() => setCharacterState('Standing Up'), 80);
    timeline.to(characterSpriteRef.current, {
      rotation: 0,
      y: 0,
      ease: "power3.inOut",
      duration: 10
    }, 80);
    timeline.to(characterContainerRef.current, {
      x: '60vw', // Move to the far right for the CTA
      duration: 10
    }, 80);

    // 90-100: Thumbs Up
    timeline.add(() => setCharacterState('Thumbs Up'), 90);
    // Final subtle pose adjustment
    timeline.to(characterSpriteRef.current, {
      scale: 1.05,
      y: -5,
      duration: 2,
      ease: "back.out(1.7)"
    }, 90);

  }, [timeline]);

  return (
    <div className="character-system" style={{ left: '15%', bottom: '25%' }}>
      <div ref={characterContainerRef} className="character-wrapper">
        <div ref={questionMarkRef} className="character-question">?</div>
        
        {/* Character Image Renderer based on state */}
        <div ref={characterSpriteRef} className="character-sprite">
          <img 
            src={`/assets/story/character/char_${getCharacterImageName(characterState)}.png`} 
            alt="Character" 
            className="character-image" 
          />
          <div className="state-label">{characterState}</div>
        </div>
      </div>

      <style>{`
        .character-system {
          position: absolute;
          /* Positioning is relative to the environment layer */
          will-change: transform;
          z-index: 25; /* Keep it above background elements */
        }

        .character-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform;
        }

        .character-question {
          position: absolute;
          top: -60px;
          font-family: serif;
          font-size: 3rem;
          color: #ffcc00;
          opacity: 0;
          font-weight: bold;
          text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }

        .character-sprite {
          width: 150px;
          height: 300px;
          transform-origin: bottom center;
          will-change: transform;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .character-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          /* Blend mode trick to remove solid white background from generated images */
          mix-blend-mode: multiply;
          filter: contrast(1.1) brightness(1.2);
        }

        .state-label {
          position: absolute;
          bottom: -25px;
          font-family: monospace;
          font-size: 0.75rem;
          color: #fff;
          background: rgba(0,0,0,0.5);
          padding: 2px 4px;
          border-radius: 4px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
