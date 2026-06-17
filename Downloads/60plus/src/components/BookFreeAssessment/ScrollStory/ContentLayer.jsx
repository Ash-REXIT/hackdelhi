import React, { useRef, useLayoutEffect } from 'react';
import { useScene } from './SceneController';

export default function ContentLayer() {
  const { timeline } = useScene();
  
  const scene1Ref = useRef(null);
  const scene2Ref = useRef(null);
  const scene3Ref = useRef(null);
  const cascadeRefs = useRef([]);
  const scene4Ref = useRef(null);

  useLayoutEffect(() => {
    if (!timeline) return;

    // SCENE 1 (0-15)
    timeline.to(scene1Ref.current, { opacity: 1, duration: 5 }, 0);
    timeline.to(scene1Ref.current, { opacity: 0, duration: 5 }, 12);

    // SCENE 2 (15-35)
    timeline.to(scene2Ref.current, { opacity: 1, duration: 5 }, 15);
    timeline.to(scene2Ref.current, { opacity: 0, duration: 5 }, 30);

    // SCENE 3 (50-65) - Note: 35-50 is visual discovery, no text
    timeline.to(scene3Ref.current, { opacity: 1, duration: 5 }, 50);
    timeline.to(scene3Ref.current, { opacity: 0, duration: 5 }, 60);

    // CONSEQUENCE (65-80) - Progressive activation
    const cascadeItems = cascadeRefs.current;
    if (cascadeItems.length > 0) {
      timeline.to(cascadeItems[0], { opacity: 1, duration: 2 }, 65); // Fall
      timeline.to(cascadeItems[1], { opacity: 1, duration: 2 }, 68); // Injury
      timeline.to(cascadeItems[2], { opacity: 1, duration: 2 }, 71); // Fracture
      timeline.to(cascadeItems[3], { opacity: 1, duration: 2 }, 74); // Immobility
      timeline.to(cascadeItems[4], { opacity: 1, duration: 2 }, 77); // Loss of Independence
      
      // Fade all out as we stand up
      timeline.to(cascadeItems, { opacity: 0, duration: 3 }, 80);
    }

    // SCENE 4 (80-90)
    timeline.to(scene4Ref.current, { opacity: 1, duration: 5 }, 83);
    timeline.to(scene4Ref.current, { opacity: 0, duration: 3 }, 88);

    // SCENE 5 text is handled in AssessmentFormLayer

  }, [timeline]);

  return (
    <div className="content-layer">
      <div className="content-zone">
        
        {/* Scene 1 */}
        <div ref={scene1Ref} className="content-block">
          <h1 className="cinematic-headline">Are Your Elderly Parents In Chennai Safe?</h1>
          <p className="cinematic-sub">You Think They Are.</p>
        </div>

        {/* Scene 2 */}
        <div ref={scene2Ref} className="content-block">
          <div className="stat-highlight">1 IN 3</div>
          <p className="cinematic-body">
            Elderly Indians falls every year.<br/><br/>
            Not climbing ladders.<br/>
            Not taking risks.<br/>
            Walking to the kitchen.<br/>
            Stepping out of the shower.<br/>
            It happens in the moments they feel safest.
          </p>
        </div>

        {/* Scene 3 */}
        <div ref={scene3Ref} className="content-block">
          <div className="stat-highlight">65%</div>
          <p className="cinematic-body">
            suffer an injury when they fall.<br/><br/>
            The real risk isn't the bruise.<br/>
            It's losing independence.
          </p>
        </div>

        {/* Consequence Cascade */}
        <div className="content-block cascade-block">
          <div ref={el => cascadeRefs.current[0] = el} className="cascade-item">Fall</div>
          <div ref={el => cascadeRefs.current[1] = el} className="cascade-arrow">↓</div>
          <div ref={el => cascadeRefs.current[2] = el} className="cascade-item">Injury</div>
          <div ref={el => cascadeRefs.current[3] = el} className="cascade-arrow">↓</div>
          <div ref={el => cascadeRefs.current[4] = el} className="cascade-item">Loss Of Independence</div>
        </div>

        {/* Scene 4 */}
        <div ref={scene4Ref} className="content-block">
          <h2 className="cinematic-headline-small">Most risks are invisible until someone trained looks for them.</h2>
          <p className="cinematic-body">
            A professional home assessment reveals risks before they become emergencies.
          </p>
        </div>

      </div>

      <style>{`
        .content-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%; /* Take full height */
          z-index: 20;
          pointer-events: none; 
          display: flex;
          align-items: flex-start; /* Start from top to prevent clipping */
          justify-content: center;
          text-align: center;
          padding: 12dvh 2rem 2rem; /* Spacing from top */
        }

        .content-zone {
          position: relative;
          width: 100%;
          max-width: 800px;
          height: 100%;
        }

        .content-block {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          opacity: 0;
        }

        .cinematic-headline {
          font-family: 'Gambarino', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 500;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(0,0,0,0.8);
        }

        .cinematic-headline-small {
          font-family: 'Gambarino', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 500;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 1rem;
          text-shadow: 0 4px 15px rgba(0,0,0,0.8);
        }

        .cinematic-sub {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          color: rgba(255,255,255,0.7);
          font-weight: 300;
          letter-spacing: 1px;
        }

        .cinematic-body {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          color: rgba(255,255,255,0.9);
          line-height: 1.6;
          font-weight: 400;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }

        .stat-highlight {
          font-family: 'Gambarino', serif;
          font-size: clamp(4rem, 8vw, 6rem);
          color: #8235d0;
          line-height: 1;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(130,53,208,0.4);
        }

        .cascade-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .cascade-item {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.2rem, 2vw, 1.5rem);
          font-weight: 600;
          color: #fff;
          opacity: 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }

        .cascade-item:last-child {
          color: #e74c3c;
          font-size: clamp(1.5rem, 2.5vw, 2rem);
        }

        .cascade-arrow {
          color: rgba(255,255,255,0.5);
          font-size: 1.2rem;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
