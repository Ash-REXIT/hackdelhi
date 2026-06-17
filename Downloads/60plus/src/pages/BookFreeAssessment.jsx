import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import useMetaTags from '../hooks/useMetaTags';
import SceneController from '../components/BookFreeAssessment/ScrollStory/SceneController';
import StoryDebugMode from '../components/BookFreeAssessment/ScrollStory/StoryDebugMode';

export default function BookFreeAssessment() {
  useMetaTags({
    title: 'Free Senior Home Safety Assessment in Chennai | 60Plus India',
    description: 'Are your elderly parents in Chennai safe? Book a free home safety assessment and get a complete report on risks in their home.',
    keywords: 'elderly safety, home safety assessment, Chennai, senior care, fall prevention',
    ogImage: '/images/story-step-visit-new.png',
  });

  const [scrollDistance, setScrollDistance] = useState('6000px'); // Default desktop
  const [isDebugMode, setIsDebugMode] = useState(false); // Toggle with 'd' key

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScrollDistance('3000px'); // Mobile
      } else if (width < 1024) {
        setScrollDistance('4500px'); // Tablet
      } else {
        setScrollDistance('6000px'); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Toggle debug mode
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'd' && e.ctrlKey) {
        setIsDebugMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="bfsa-page">
      <Navbar autoHide={true} />

      {/* The cinematic scroll experience */}
      <main className="story-container" style={{ height: scrollDistance }}>
        <div className="story-viewport">
          <SceneController isDebugMode={isDebugMode} />
          {isDebugMode && <StoryDebugMode />}
        </div>
      </main>

      <style>{`
        .bfsa-page {
          background-color: #0d0614; /* Deep cinematic dark base */
          color: #ffffff;
        }

        .story-container {
          position: relative;
          width: 100%;
          /* Height is set dynamically to control the scrub length */
        }

        .story-viewport {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 100dvh; /* Use dvh to fix mobile cropping */
          overflow: hidden;
          background: #000;
        }
      `}</style>
    </div>
  );
}