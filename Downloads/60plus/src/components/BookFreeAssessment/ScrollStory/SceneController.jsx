import React, { createContext, useContext, useLayoutEffect, useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CameraRig from './CameraRig';
import EnvironmentLayer from './EnvironmentLayer';
import CharacterSystem from './CharacterSystem';
import ContentLayer from './ContentLayer';
import AssessmentFormLayer from './AssessmentFormLayer';

gsap.registerPlugin(ScrollTrigger);

const SceneContext = createContext({ timeline: null, progress: 0, isDebugMode: false });
export const useScene = () => useContext(SceneContext);

export default function SceneController({ isDebugMode }) {
  const [timeline, setTimeline] = useState(null);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Create the Master Timeline. We treat the timeline as 100 units (seconds) long,
      // representing 0% to 100% of the scroll progress.
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: '.story-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // Cinematic smoothing
          onUpdate: (self) => {
            setProgress(self.progress);
          }
        }
      });
      
      setTimeline(tl);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <SceneContext.Provider value={{ timeline, progress, isDebugMode }}>
      <div ref={containerRef} className="scene-controller">
        {timeline && (
          <>
            <CameraRig />
            <EnvironmentLayer />
            <CharacterSystem />
            <ContentLayer />
            <AssessmentFormLayer />
          </>
        )}
      </div>
      <style>{`
        .scene-controller {
          position: absolute;
          inset: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          background: #0d0614;
        }
      `}</style>
    </SceneContext.Provider>
  );
}
