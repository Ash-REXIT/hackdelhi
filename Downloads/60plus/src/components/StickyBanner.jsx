import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const StickyBanner = () => {
  const [visible, setVisible] = useState(false);
  const [hiddenByFooter, setHiddenByFooter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const isAssessmentPage = location.pathname.includes('book-free-senior-home-safety-assessment');

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isAssessmentPage) {
        // On assessment page, show banner only when the "How it works" section is in viewport
        const howItWorks = document.getElementById('bfsa-how-it-works');
        if (howItWorks) {
          const rect = howItWorks.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top < windowHeight) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        }
      } else {
        // On all other pages, show banner after scrolling down 300px
        if (currentScrollY > 300) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }

      // Hide banner when footer is about to come into view
      const footer = document.querySelector('.footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (footerRect.top < windowHeight) {
          setHiddenByFooter(true);
        } else {
          setHiddenByFooter(false);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const shouldShow = visible && !hiddenByFooter;

  // Export banner height to CSS custom property so other fixed elements can adjust
  useEffect(() => {
    document.body.style.setProperty('--sb-h', shouldShow ? '60px' : '0px');
  }, [shouldShow]);

  useEffect(() => () => document.body.style.removeProperty('--sb-h'), []);

  return (
    <div className={`sticky-banner ${shouldShow ? 'sticky-banner--visible' : ''}`}>
      <style>{`
        .sticky-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 998;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 0;
          overflow: hidden;
          transition: height 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.3s ease;
          opacity: 0;
          pointer-events: none;
          font-family: 'Nunito Sans', sans-serif;
        }

        .sticky-banner--visible {
          height: 64px;
          opacity: 1;
          pointer-events: auto;
        }

        .sticky-banner-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          width: 100%;
          background: linear-gradient(94deg, #8235d0 -2.32%, #5f308e 99.71%);
          padding: 10px 40px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 -4px 30px rgba(130, 53, 208, 0.25);
        }

        .sticky-banner-inner::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .sticky-banner-text {
          color: rgba(255, 255, 255, 0.95);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.3px;
          white-space: nowrap;
          text-align: center;
        }

        .sticky-banner-text span {
          color: #fff;
          font-weight: 800;
        }

        .sticky-banner-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.95);
          color: #8235d0;
          border: none;
          border-radius: 999px;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Nunito Sans', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          position: relative;
          z-index: 1;
        }

        .sticky-banner-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .sticky-banner-cta:active {
          transform: translateY(0);
        }

        .sticky-banner-cta svg {
          width: 14px;
          height: 14px;
          transition: transform 0.2s;
        }

        .sticky-banner-cta:hover svg {
          transform: translateX(2px);
        }

        @media (max-width: 640px) {
          .sticky-banner--visible {
            height: 56px;
          }

          .sticky-banner-inner {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            gap: 10px;
          }

          .sticky-banner-text {
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 65%;
          }

          .sticky-banner-cta {
            padding: 6px 14px;
            font-size: 12px;
            flex-shrink: 0;
          }
        }
      `}</style>

      <div className="sticky-banner-inner">
        <p className="sticky-banner-text">
          {location.pathname.includes('book-free-senior-home-safety-assessment')
            ? <>Free <span>home safety check</span> for your parents in Chennai</>
            : <>Get a <span>free home safety assessment</span> for your parents</>
          }
        </p>
        <button
          className="sticky-banner-cta"
          onClick={() => {
            if (location.pathname.includes('book-free-senior-home-safety-assessment')) {
              const el = document.getElementById('bfsa-form-top');
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 90;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            } else {
              navigate('/book-free-senior-home-safety-assessment');
            }
          }}
        >
          {location.pathname.includes('book-free-senior-home-safety-assessment') ? 'Book Now' : 'Book Free'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StickyBanner;
