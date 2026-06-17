import React, { useEffect, useState } from 'react';

export default function StoryDebugMode() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleProgress = (e) => setProgress(e.detail);
    window.addEventListener('storyProgress', handleProgress);
    return () => window.removeEventListener('storyProgress', handleProgress);
  }, []);

  const getSceneName = (p) => {
    if (p < 0.15) return 'Scene 1: Setup';
    if (p < 0.35) return 'Scene 2: Walk & Stats';
    if (p < 0.50) return 'Scene 2.5: Hazard Discovery';
    if (p < 0.65) return 'Scene 3: The Fall';
    if (p < 0.80) return 'Scene 3.5: Consequence';
    if (p < 0.90) return 'Scene 4: Realization';
    return 'Scene 5: Confidence & Solution';
  };

  return (
    <div className="story-debug-hud">
      <h4>Story Debug Mode</h4>
      <div className="debug-row">
        <span>Progress:</span>
        <strong>{Math.round(progress * 100)}%</strong>
      </div>
      <div className="debug-row">
        <span>Scene:</span>
        <strong>{getSceneName(progress)}</strong>
      </div>
      <div className="debug-note">
        (Press <code>Ctrl + D</code> to toggle)
      </div>

      <style>{`
        .story-debug-hud {
          position: fixed;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid #8235d0;
          color: #00ffcc;
          padding: 1rem;
          border-radius: 8px;
          font-family: monospace;
          z-index: 9999;
          pointer-events: none;
          min-width: 250px;
        }
        .story-debug-hud h4 {
          margin: 0 0 10px 0;
          color: #fff;
          border-bottom: 1px solid #333;
          padding-bottom: 5px;
        }
        .debug-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .debug-note {
          margin-top: 10px;
          font-size: 0.8rem;
          color: #888;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
