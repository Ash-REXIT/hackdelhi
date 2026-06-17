import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Pause, Play, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const testimonialData = [
  {
    id: 1,
    name: "Premila Srinivasan",
    city: "Anna Nagar, Chennai",
    childrenIn: "Chennai",
    text: "My children live here in Chennai, yet I never felt this cared for before. 60Plus brought us closer as a family - through their platform, I found new friendships, meaningful activities, and a sense of purpose I had forgotten.",
    video: "videos/testimonial_1.mp4"
  },
  {
    id: 2,
    name: "Suresh",
    city: "Chennai",
    childrenIn: null,
    text: "I was under so much stress - constant worry, no peace of mind. 60Plus introduced me to their events and activity sessions. I started attending, met people my age, and slowly that stress just began to lift.",
    video: "videos/testimonial_2.mp4"
  },
  {
    id: 3,
    name: "Vijay",
    city: "Chennai",
    childrenIn: null,
    text: "Having a doctor come home every month has changed everything for me. Early on, the doctor caught something my family had all missed. That one visit made all the difference.",
    video: "videos/testimonial_3.mp4"
  },
  {
    id: 4,
    name: "Kala",
    city: "Chennai",
    childrenIn: "California & Canada",
    text: "My son is in California and my daughter is in Canada, but I never feel alone. The singing sessions are my favourite - the moment they announce one, I am the first to join.",
    video: "videos/testimonial_4.mp4"
  },
  {
    id: 5,
    name: "Elderly couple",
    city: "Chennai",
    childrenIn: null,
    text: "We never imagined that after 60, life could feel this full of joy. What started as just attending a few sessions has now become six years of beautiful memories.",
    video: "videos/testimonial_5.mp4"
  },
];

export default function Testimonials() {
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isMuted, setIsMuted] = useState(true); // all videos start MUTED
  const isMutedRef = useRef(false);
  const manuallyPausedRef = useRef({});

  // Keep ref in sync with state
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);
  const [progress, setProgress] = useState(testimonialData.map(() => 0));
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [fullscreenIdx, setFullscreenIdx] = useState(null);
  const modalVideoRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const isAnimating = useRef(false);
  const isControlActive = useRef(false);
  const isTouchingControl = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Effect to handle video visibility and play/pause based on scroll
  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as root
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        if (video) {
          const videoIndex = parseInt(video.dataset.index);
          if (entry.isIntersecting) {
            // Video is in view - play it if it's the active one AND not manually paused
            if (videoIndex === activeIndex && !manuallyPausedRef.current[videoIndex]) {
              video.muted = isMutedRef.current;
              video.play().then(() => {
                setPlayingIndex(videoIndex);
                manuallyPausedRef.current[videoIndex] = false; // Reset manual pause state
              }).catch(() => {});
            }
          } else {
            // Video is out of view - pause it
            video.pause();
            if (playingIndex === videoIndex) {
              setPlayingIndex(null);
            }
          }
        }
      });
    }, observerOptions);

    // Wait for the DOM to be ready before observing
    const setupObserver = () => {
      const videoWrappers = document.querySelectorAll('.t-video-wrap');
      videoWrappers.forEach(wrapper => {
        observer.observe(wrapper);
      });
    };

    // Setup observer after a small delay to ensure DOM is ready
    const timer = setTimeout(setupObserver, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeIndex, playingIndex]);

  // Auto-play the first video when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      const video = videoRefs.current[0];
      if (video) {
        video.muted = true; // Ensure it starts muted
        video.play().then(() => setPlayingIndex(0)).catch(() => {});
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (v && idx !== activeIndex) {
        v.pause();
        v.muted = true;
      }
    });
  }, [activeIndex]);

  const goTo = useCallback((index) => {
    if (isAnimating.current || isControlActive.current) return;
    isAnimating.current = true;
    setTimeout(() => { isAnimating.current = false; }, 600);

    const total = testimonialData.length;
    const next = ((index % total) + total) % total;

    // pause all videos
    videoRefs.current.forEach((v, i) => {
      if (v && i !== next) {
        v.pause();
        v.currentTime = 0;
      }
    });

    setPlayingIndex(null);
    setActiveIndex(next);

    // autoplay the center video after transition
    setTimeout(() => {
      const video = videoRefs.current[next];
      if (video) {
        video.muted = isMutedRef.current;
        video.play().then(() => setPlayingIndex(next)).catch(() => {});
      }
    }, 500);
  }, []);

  const startAutoplay = useCallback(() => {
    // Don't start playing automatically - only play when scrolled into view
  }, []);

  const pauseAutoplay = useCallback(() => {
    clearInterval(autoplayTimerRef.current);
  }, []);

  const handleUserInteraction = useCallback(() => {
    pauseAutoplay();
  }, [pauseAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => {
      clearInterval(autoplayTimerRef.current);
    };
  }, [startAutoplay]);

  const handleArrow = (dir) => {
    handleUserInteraction();
    goTo(activeIndex + dir);
  };

  const handleDot = (i) => {
    handleUserInteraction();
    goTo(i);
  };

  const togglePlay = (index) => {
    isControlActive.current = true;
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      // Currently playing, so pause it
      video.pause();
      setPlayingIndex(null);
      manuallyPausedRef.current[index] = true; // Mark as manually paused
    } else {
      // Currently paused, so play it
      videoRefs.current.forEach((v, i) => { if (v && i !== index) v.pause(); });
      video.muted = isMutedRef.current;
      video.play().then(() => {
        setPlayingIndex(index);
        manuallyPausedRef.current[index] = false; // Reset manual pause state
      }).catch(() => {});
    }
    setTimeout(() => (isControlActive.current = false), 300);
  };

  const openFullscreen = (i, e) => {
    e.stopPropagation();
    isControlActive.current = true;
    const video = videoRefs.current[i];
    if (video) video.pause();
    setPlayingIndex(null);
    setFullscreenIdx(i);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    const mv = modalVideoRef.current;
    if (mv) { mv.pause(); mv.currentTime = 0; }
    setFullscreenIdx(null);
    document.body.style.overflow = "";
    isControlActive.current = false;
    setTimeout(() => {
      const v = videoRefs.current[activeIndex];
      if (v) {
        v.muted = isMutedRef.current;
        v.play().catch(() => {});
      }
    }, 200);
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeFullscreen(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex]);

  const getCardStyle = (i) => {
    const total = testimonialData.length;
    let offset = i - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    // Positions - mimic reference image fan layout
    const xMap = isMobile
      ? { "-2": -150, "-1": -95, "0": 0, "1": 95, "2": 150 }
      : { "-2": -560, "-1": -300, "0": 0, "1": 300, "2": 560 };
    const scaleMap = isMobile
      ? { 0: 1, 1: 0.9, 2: 0.78 }
      : { 0: 1, 1: 0.82, 2: 0.68 };
    const zMap = { 0: 10, 1: 6, 2: 2 };
    const opacityMap = { 0: 1, 1: 0.72, 2: 0.45 };
    const yMap = isMobile
      ? { 0: 0, 1: 10, 2: 22 }
      : { 0: 0, 1: 30, 2: 55 };

    if (absOffset > 2) return { display: "none" };

    return {
      transform: `translateX(${xMap[offset] ?? offset * 300}px) translateY(${yMap[absOffset] ?? 60}px) scale(${scaleMap[absOffset] ?? 0.5})`,
      zIndex: zMap[absOffset] ?? 0,
      opacity: opacityMap[absOffset] ?? 0,
      filter: isCenter ? "none" : `brightness(${1 - absOffset * 0.08})`,
      transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), filter 0.65s ease",
      pointerEvents: "auto",
      cursor: isCenter ? "default" : "pointer",
    };
  };

  return (
    <section className="testimonials" id="testimonials">
      <style>{`
        .testimonials {
          padding: 80px 0 120px;
          background: #ffffff;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          overflow: hidden;
          position: relative;
        }

        .header-container {
          max-width: 900px;
          margin: 0 auto 64px;
          padding: 0 20px;
          text-align: center;
        }

        .header-container::after {
          content: "";
          display: block;
          width: 80px;
          height: 2px;
          margin: 28px auto 0;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          border-radius: 2px;
        }

        .tag {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2.5px;
          color: #8235d0;
          margin-bottom: 16px;
          display: inline-block;
          text-transform: uppercase;
        }

        .testimonials h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 4.5vw, 50px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.4px;
          margin: 0 0 4px;
        }

        .testimonials h2 span {
          color: #8235d0;
          display: block;
        }

        .sub {
          max-width: 600px;
          margin: 18px auto 0;
          font-size: 16px;
          line-height: 1.8;
          color: rgba(26,10,46,0.55);
        }

        /* ── CAROUSEL ── */
        .carousel-outer {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .carousel-stage {
          position: relative;
          height: 560px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
          padding: 0 20px;
          touch-action: pan-y;
        }

        /* ── CARD ── */
        .t-card {
          position: absolute;
          width: 268px;
          border-radius: 24px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: box-shadow 0.5s ease, border-color 0.5s ease;
        }

        .t-card.center-card {
          box-shadow: 0 16px 48px rgba(130,53,208,0.14), 0 4px 16px rgba(0,0,0,0.06);
          border-color: rgba(130,53,208,0.15);
          cursor: default;
        }

        .t-card.center-card.playing-glow {
          animation: card-glow 3s ease-in-out infinite;
        }

        @keyframes card-glow {
          0%, 100% { box-shadow: 0 16px 48px rgba(130,53,208,0.14), 0 4px 16px rgba(0,0,0,0.06); }
          50% { box-shadow: 0 20px 56px rgba(130,53,208,0.25), 0 8px 24px rgba(0,0,0,0.08); }
        }

        /* ── VIDEO ── */
        .t-video-wrap {
          width: 100%;
          aspect-ratio: 9/16;
          background: #111;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: pan-y;
        }

        .center-play,
        .mute-btn,
        .fullscreen-btn {
          touch-action: manipulation;
        }

        .t-card {
          touch-action: pan-y;
        }

        .t-video-wrap::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(0,0,0,0.35), transparent);
          pointer-events: none;
          z-index: 5;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .t-card.center-card:hover .t-video-wrap::after {
          opacity: 1;
        }

        .t-video-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255,255,255,0.18);
          z-index: 10;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8235d0, #c084fc);
          border-radius: 0 2px 2px 0;
          transition: width 0.1s linear;
        }

        .center-play {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 8;
          transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, color 0.3s ease;
        }

        .center-play.paused {
          background: rgba(255,255,255,0.92);
          color: #8235d0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          animation: play-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .center-play.playing {
          background: rgba(0,0,0,0.45);
          color: #fff;
          backdrop-filter: blur(4px);
          opacity: 1; /* Always visible */
        }

        .center-play.playing:hover {
          opacity: 1;
        }

        .center-play:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }

        @keyframes play-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 0 rgba(130,53,208,0.4); }
          50% { box-shadow: 0 4px 20px rgba(0,0,0,0.15), 0 0 0 14px rgba(130,53,208,0); }
        }

        .mute-btn {
          position: absolute;
          bottom: 12px;
          left: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9;
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
        }

        .fullscreen-btn {
          position: absolute;
          bottom: 12px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9;
          backdrop-filter: blur(6px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.25s ease;
        }

        .fullscreen-btn:hover {
          background: rgba(255,255,255,1);
          transform: scale(1.12);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .mute-btn:hover {
          background: rgba(255,255,255,1);
          transform: scale(1.12);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        /* ── INFO ── */
        .t-info {
          padding: 16px 18px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .t-name {
          font-family: "Gambarino", serif;
          font-size: 17px;
          font-weight: 600;
          color: #1a0a2e;
          margin: 0;
        }

        .t-city {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #8235d0;
          text-transform: uppercase;
          margin: 0;
        }

        .t-children-location {
          font-size: 11px;
          font-weight: 600;
          color: rgba(130,53,208,0.7);
          margin: 0;
        }

        .t-divider {
          height: 1px;
          background: rgba(0,0,0,0.06);
        }

        .t-text {
          font-size: 13px;
          line-height: 1.65;
          color: rgba(26,10,46,0.65);
          font-style: italic;
          margin: 0;
        }

        .t-text.collapsed {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .t-text.expanded { display: block; }

        .read-more-btn {
          background: none;
          border: none;
          color: #8235d0;
          font-size: 12px;
          font-weight: 800;
          font-family: 'Nunito Sans', sans-serif;
          cursor: pointer;
          padding: 4px 0 0;
          letter-spacing: 0.3px;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
        }

        .read-more-btn:hover { color: #5f308e; }

        /* ── PLAYING INDICATOR ── */
        .playing-indicator {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 9;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .playing-indicator.visible { opacity: 1; }

        .playing-indicator span {
          display: block;
          width: 3px;
          height: 12px;
          background: #fff;
          border-radius: 2px;
          animation: eq-bar 0.8s ease-in-out infinite;
        }

        .playing-indicator span:nth-child(2) { animation-delay: 0.15s; height: 8px; }
        .playing-indicator span:nth-child(3) { animation-delay: 0.3s; height: 14px; }

        @keyframes eq-bar {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }

        /* ── ARROWS ── */
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(130,53,208,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }

        .carousel-arrow:hover {
          background: rgba(130,53,208,0.08);
          border-color: rgba(130,53,208,0.5);
          transform: translateY(-50%) scale(1.08);
        }

        .carousel-arrow.left { left: 16px; }
        .carousel-arrow.right { right: 16px; }

        /* ── DOTS ── */
        .carousel-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 28px;
        }

        .dot {
          height: 8px;
          border-radius: 10px;
          background: rgba(130,53,208,0.2);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          width: 8px;
        }

        .dot.active {
          width: 24px;
          background: #8235d0;
        }

        .carousel-stage {
          max-width: 900px;
          margin: 0 auto;
        }

        /* ── FULLSCREEN MODAL ── */
        .fs-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fs-inner {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 480px;
          background: #000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .fs-inner video {
          flex: 1;
          width: 100%;
          object-fit: contain;
          background: #000;
        }

        .fs-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          backdrop-filter: blur(8px);
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .fs-close:hover { background: rgba(255,255,255,0.2); transform: scale(1.08); }

        .fs-info {
          padding: 20px 24px;
          background: #111;
          color: #fff;
          flex-shrink: 0;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .fs-name {
          font-family: "Gambarino", serif;
          font-size: 22px;
          margin: 0 0 4px;
          color: #fff;
        }

        .fs-city {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: #c084fc;
          text-transform: uppercase;
          margin: 0 0 10px;
        }

        .fs-text {
          font-size: 14px;
          line-height: 1.72;
          color: rgba(255,255,255,0.68);
          font-style: italic;
          margin: 0;
        }

        @media (max-width: 768px) {
          .carousel-stage { height: 460px; padding: 0 10px; }

          .t-card { width: 220px; }

          .carousel-arrow.left { left: 6px; }
          .carousel-arrow.right { right: 6px; }
          .fs-inner { max-width: 100%; }
          .fs-close { top: 10px; right: 10px; width: 36px; height: 36px; }
          .fs-info { padding: 14px 16px; }
          .fs-name { font-size: 18px; }
          .fs-city { font-size: 10px; }
          .fs-text { font-size: 13px; }
        }
      `}</style>

      {/* HEADER */}
      <div className="header-container">
        <motion.span
          className="tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Testimonials
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Stories of trust.
          <span>From families like yours.</span>
        </motion.h2>

        <motion.p
          className="sub"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Real stories from families across Tamil Nadu who trust 60Plus
          to care for their loved ones with compassion, consistency, and dignity.
        </motion.p>
      </div>

      {/* CAROUSEL */}
      <div className="carousel-outer">
        <button className="carousel-arrow left" onClick={() => handleArrow(-1)} aria-label="Previous">
          <ChevronLeft size={22} />
        </button>

        <div className="carousel-stage">
          {testimonialData.map((item, i) => {
            const isCenter = i === activeIndex;
            const style = getCardStyle(i);

            if (style.display === "none") return null;

            return (
              <div
                key={item.id}
                className={`t-card${isCenter ? " center-card" : ""}${isCenter && playingIndex === i ? " playing-glow" : ""}`}
                style={style}
                onTouchStart={(e) => {
                  if (e.target.closest('.center-play') ||
                      e.target.closest('.mute-btn') ||
                      e.target.closest('.fullscreen-btn')) {
                    isTouchingControl.current = true;
                    return;
                  }
                  isTouchingControl.current = false;
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchMove={(e) => {
                  if (isTouchingControl.current) return;
                  touchEndX.current = e.touches[0].clientX;
                }}
                onTouchEnd={() => {
                  if (isTouchingControl.current) {
                    isTouchingControl.current = false;
                    return;
                  }
                  const diff = touchStartX.current - touchEndX.current;
                  if (Math.abs(diff) < 50) return;
                  handleUserInteraction();
                  if (diff > 0) {
                    goTo(activeIndex + 1);
                  } else {
                    goTo(activeIndex - 1);
                  }
                }}
                onClick={() => {
                  if (i !== activeIndex) {
                    handleUserInteraction();
                    goTo(i);
                  }
                }}
              >
                <div className="t-video-wrap">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress[i]}%` }} />
                  </div>

                  <video
                    ref={el => (videoRefs.current[i] = el)}
                    data-index={i}
                    src={item.video}
                    playsInline
                    preload="metadata"
                    muted={isMuted}
                    onPlay={() => setPlayingIndex(i)}
                    onPause={() => setPlayingIndex(prev => prev === i ? null : prev)}
                    onTimeUpdate={e => {
                      const pct = (e.target.currentTime / e.target.duration) * 100 || 0;
                      setProgress(prev => { const u = [...prev]; u[i] = pct; return u; });
                    }}
                    onEnded={() => {
                      setPlayingIndex(null);
                      // Play full video then advance to next
                      goTo(activeIndex + 1);
                    }}
                  />

                  {isCenter && (
                    <>
                      {/* Playing indicator */}
                      <div className={`playing-indicator${playingIndex === i ? " visible" : ""}`}>
                        <span /><span /><span />
                      </div>

                      {/* Play/Pause - always visible */}
                      <button
                        className={`center-play ${playingIndex === i ? "playing" : "paused"}`}
                        onClick={e => { e.stopPropagation(); togglePlay(i); }}
                      >
                        {playingIndex === i ? <Pause size={24} /> : <Play size={24} />}
                      </button>

                      {/* Global mute button */}
                      <button
                        className="mute-btn"
                        onClick={e => {
                          e.stopPropagation();
                          isControlActive.current = true;
                          const next = !isMuted;
                          setIsMuted(next);
                          videoRefs.current.forEach(v => { if (v) v.muted = next; });
                          setTimeout(() => (isControlActive.current = false), 300);
                        }}
                      >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      </button>

                      <button
                        className="fullscreen-btn"
                        onClick={(e) => openFullscreen(i, e)}
                        aria-label="Watch full video"
                      >
                        <Maximize2 size={14} />
                      </button>
                    </>
                  )}
                </div>

                <div className="t-info">
                  <div>
                    <p className="t-name">{item.name}</p>
                    <p className="t-city">{item.city}</p>
                    {item.childrenIn && (
                      <p className="t-children-location">✈ Children in {item.childrenIn}</p>
                    )}
                  </div>
                  <div className="t-divider" />
                  <div className="t-text-wrap">
                    <p className={`t-text ${expandedIndex === i ? "expanded" : "collapsed"}`}>
                      "{item.text}"
                    </p>
                    {isCenter && (
                      <button
                        className="read-more-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedIndex(expandedIndex === i ? null : i);
                        }}
                      >
                        {expandedIndex === i ? "Show less ↑" : "Read more ↓"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="carousel-arrow right" onClick={() => handleArrow(1)} aria-label="Next">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* DOTS */}
      <div className="carousel-dots">
        {testimonialData.map((_, i) => (
          <span
            key={i}
            className={`dot${i === activeIndex ? " active" : ""}`}
            onClick={() => handleDot(i)}
          />
        ))}
      </div>

      {/* FULLSCREEN MODAL */}
      {fullscreenIdx !== null && (
        <div className="fs-overlay" onClick={closeFullscreen}>
          <div className="fs-inner" onClick={e => e.stopPropagation()}>
            <button className="fs-close" onClick={closeFullscreen}><X size={16} /></button>
            <video
              ref={modalVideoRef}
              src={testimonialData[fullscreenIdx].video}
              controls
              playsInline
              autoPlay
            />
            <div className="fs-info">
              <p className="fs-name">{testimonialData[fullscreenIdx].name}</p>
              <p className="fs-city">{testimonialData[fullscreenIdx].city}</p>
              <p className="fs-text">"{testimonialData[fullscreenIdx].text}"</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

