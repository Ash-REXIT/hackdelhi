import React, { useState, useEffect } from 'react';

/**
 * StatsReveal — Large animated typography for statistics.
 * Types: 'oneInThree' shows "1 IN 3", 'sixtyFive' shows "65%"
 */
export default function StatsReveal({ progress = 0, type = 'oneInThree' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (type === 'oneInThree') {
      // "1 IN 3" — reveal the number based on progress
      if (progress >= 0.35 && progress <= 0.55) {
        const localP = (progress - 0.35) / 0.20;
        setDisplayValue(Math.min(3, Math.round(localP * 3)));
      } else if (progress > 0.55) {
        setDisplayValue(3);
      } else {
        setDisplayValue(0);
      }
    } else if (type === 'sixtyFive') {
      // "65%" — counter animation
      if (progress >= 0.55 && progress <= 0.65) {
        const localP = (progress - 0.55) / 0.10;
        setDisplayValue(Math.round(localP * 65));
      } else if (progress > 0.65) {
        setDisplayValue(65);
      } else {
        setDisplayValue(0);
      }
    }
  }, [progress, type]);

  if (type === 'oneInThree') {
    return (
      <div className="stats-reveal stats-reveal--one-in-three">
        <span className="stats-reveal__big">1 IN {displayValue}</span>
        <style>{`
          .stats-reveal {
            text-align: center;
            margin: 1rem 0;
          }
          .stats-reveal__big {
            font-family: 'Gambarino', serif;
            font-size: clamp(4rem, 12vw, 8rem);
            font-weight: 700;
            color: #1a0a2e;
            line-height: 1;
            letter-spacing: -0.03em;
          }
          .stats-reveal--one-in-three .stats-reveal__big {
            background: linear-gradient(135deg, #1a0a2e 0%, #8235d0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="stats-reveal stats-reveal--sixty-five">
      <span className="stats-reveal__big">{displayValue}%</span>
      <style>{`
        .stats-reveal {
          text-align: center;
          margin: 1rem 0;
        }
        .stats-reveal__big {
          font-family: 'Gambarino', serif;
          font-size: clamp(4rem, 12vw, 8rem);
          font-weight: 700;
          color: #1a0a2e;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .stats-reveal--sixty-five .stats-reveal__big {
          background: linear-gradient(135deg, #1a0a2e 0%, #8235d0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
