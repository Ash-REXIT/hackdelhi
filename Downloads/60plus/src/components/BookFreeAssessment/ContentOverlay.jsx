import React from 'react';
import { motion } from 'framer-motion';
import StatsReveal from './StatsReveal';
import ReferencesSection from './ReferencesSection';

/**
 * ContentOverlay — Scroll-driven text sections in top 35% of viewport.
 * Sections fade in/out based on scroll progress using Framer Motion.
 */
export default function ContentOverlay({ progress = 0 }) {
  const sections = [
    {
      id: 'headline',
      range: [0.00, 0.20],
      content: (
        <div className="content-overlay__section content-overlay__section--hero">
          <h1 className="content-overlay__headline">
            Are Your Elderly Parents
            <br />in Chennai Safe?
          </h1>
        </div>
      ),
    },
    {
      id: 'question',
      range: [0.15, 0.30],
      content: (
        <div className="content-overlay__section">
          <p className="content-overlay__secondary">
            You think they are.
          </p>
        </div>
      ),
    },
    {
      id: 'stat-1in3',
      range: [0.35, 0.55],
      content: (
        <div className="content-overlay__section">
          <StatsReveal progress={progress} type="oneInThree" />
          <p className="content-overlay__supporting">
            About 1 in 3 elderly Indians falls each year. Most falls happen
            during ordinary daily activities — not while doing dangerous things.
            Just walking. Using the bathroom. Getting out of bed. Climbing stairs.
          </p>
        </div>
      ),
    },
    {
      id: 'stat-65',
      range: [0.55, 0.75],
      content: (
        <div className="content-overlay__section">
          <StatsReveal progress={progress} type="sixtyFive" />
          <p className="content-overlay__supporting">
            When older adults fall, the likelihood of injury is approximately 65%.
            These accidents happen exactly when people feel safest.
          </p>
        </div>
      ),
    },
    {
      id: 'independence',
      range: [0.70, 0.88],
      content: (
        <div className="content-overlay__section">
          <h2 className="content-overlay__impact-headline">
            The real risk isn't the bruise.
          </h2>
          <h2 className="content-overlay__impact-headline content-overlay__impact-headline--bold">
            It's losing independence.
          </h2>
          <p className="content-overlay__supporting">
            A simple slip often leads to a fracture. For older adults, a hip
            fracture can permanently reduce independence. Some seniors never
            fully regain the ability to live comfortably on their own.
          </p>
          <ReferencesSection />
        </div>
      ),
    },
  ];

  return (
    <div className="content-overlay">
      {sections.map(({ id, range, content }) => {
        const [start, end] = range;
        let opacity = 0;
        let y = 30;

        if (progress >= start && progress <= end) {
          const localProgress = (progress - start) / (end - start);
          // Fade in during first 30%, full during middle, fade out during last 30%
          if (localProgress < 0.3) {
            opacity = localProgress / 0.3;
            y = 30 * (1 - localProgress / 0.3);
          } else if (localProgress > 0.7) {
            opacity = (1 - localProgress) / 0.3;
            y = 30 * ((localProgress - 0.7) / 0.3);
          } else {
            opacity = 1;
            y = 0;
          }
        }

        return (
          <motion.div
            key={id}
            className={`content-overlay__panel content-overlay__panel--${id}`}
            style={{ opacity, y }}
          >
            {content}
          </motion.div>
        );
      })}

      <style>{`
        .content-overlay {
          position: relative;
          width: 100%;
          min-height: 100%;
          padding: 2rem;
        }
        .content-overlay__section {
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .content-overlay__panel {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          pointer-events: none;
        }
        .content-overlay__panel--hero .content-overlay__section {
          padding-top: 0;
        }

        .content-overlay__headline {
          font-family: 'Gambarino', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: #1a0a2e;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .content-overlay__secondary {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          color: rgba(26, 10, 46, 0.7);
          font-weight: 400;
          line-height: 1.6;
        }

        .content-overlay__impact-headline {
          font-family: 'Gambarino', serif;
          font-size: clamp(1.5rem, 3.5vw, 2.5rem);
          font-weight: 400;
          color: #1a0a2e;
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }
        .content-overlay__impact-headline--bold {
          font-weight: 700;
          color: #8235d0;
        }

        .content-overlay__supporting {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(0.9rem, 1.8vw, 1.1rem);
          color: rgba(26, 10, 46, 0.65);
          line-height: 1.7;
          margin-top: 1rem;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 768px) {
          .content-overlay {
            padding: 1rem;
          }
          .content-overlay__section {
            padding: 1rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
