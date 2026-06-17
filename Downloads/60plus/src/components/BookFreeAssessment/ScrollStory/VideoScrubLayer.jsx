import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useScene } from './SceneController';

export default function VideoScrubLayer() {
  const { timeline } = useScene();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // UPDATE THIS NUMBER to match the output of extract_frames.js
  const frameCount = 360; 
  
  const currentFrame = { frame: 1 }; // FFmpeg starts at 0001
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const num = i.toString().padStart(4, '0');
      img.src = `/assets/story/frames/frame_${num}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
          renderFrame(1); // Render first frame immediately
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  const renderFrame = (index) => {
    if (!canvasRef.current || !imagesRef.current[index - 1]) return;
    const context = canvasRef.current.getContext('2d');
    const img = imagesRef.current[index - 1];
    
    // Draw image covering the canvas (like object-fit: cover)
    const canvas = canvasRef.current;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;  

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, img.width, img.height,
                      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  // Resize canvas to match screen
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        renderFrame(Math.round(currentFrame.frame));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded]);

  useLayoutEffect(() => {
    if (!timeline || !canvasRef.current) return;

    // The core of the Apple-style scroll experience:
    // Scrub the frame number perfectly mapped to the 0-100 timeline
    timeline.to(currentFrame, {
      frame: frameCount,
      snap: "frame", // Ensure whole numbers
      ease: "none",
      duration: 100, // Stretch across the entire 100-duration master timeline
      onUpdate: () => renderFrame(currentFrame.frame)
    }, 0);

  }, [timeline, loaded]);

  return (
    <div ref={containerRef} className="video-scrub-layer">
      {!loaded && (
        <div className="loading-overlay">
          Loading Cinematic Experience...
        </div>
      )}
      <canvas ref={canvasRef} className="story-canvas" />
      <style>{`
        .video-scrub-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1; /* Lowest layer, background */
          background: #000;
        }
        .story-canvas {
          display: block;
          width: 100%;
          height: 100%;
        }
        .loading-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 1.2rem;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
