import React, { useRef, useLayoutEffect } from 'react';
import { useScene } from './SceneController';
import EnvironmentLayer from './EnvironmentLayer';
import CharacterSystem from './CharacterSystem';

export default function CameraRig() {
  const { timeline } = useScene();
  const rigRef = useRef(null);

  useLayoutEffect(() => {
    if (!timeline || !rigRef.current) return;

    // The entire timeline is conceptually 100 duration (0 to 100%).
    // We add absolute time tweens to map to the scroll progress exactly.

    // Scene 1 (0-15): Focus left
    timeline.set(rigRef.current, { scale: 1.1, xPercent: 5, yPercent: 0 }, 0);

    // Scene 2 (15-35): Follow character walking right
    timeline.to(rigRef.current, {
      xPercent: -5,
      ease: "power1.inOut",
      duration: 20
    }, 15);

    // Scene 3 (35-50-65): Zoom into the fall. 
    // Fall happens 50-65. So zoom starts around 45 and peaks at 65.
    timeline.to(rigRef.current, {
      scale: 1.25,
      xPercent: -8,
      yPercent: -5,
      ease: "power2.out",
      duration: 20
    }, 45);

    // Scene 4 (80-90): Pull back to reveal hazards
    timeline.to(rigRef.current, {
      scale: 1.05,
      xPercent: 0,
      yPercent: 0,
      ease: "power2.inOut",
      duration: 10
    }, 80);

    // Scene 5 (90-100): Settle on final wide composition
    timeline.to(rigRef.current, {
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      ease: "power1.out",
      duration: 10
    }, 90);

  }, [timeline]);

  return (
    <div ref={rigRef} className="camera-rig">
      <EnvironmentLayer />
      <CharacterSystem />
      <style>{`
        .camera-rig {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform-origin: center center;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
