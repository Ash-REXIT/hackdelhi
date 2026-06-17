import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar alwaysWhite />

      <style>{`
        .not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 120px 24px 60px;
          font-family: 'Nunito Sans', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
        }

        .nf-badge {
          font-size: 12px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: rgba(130,53,208,0.7);
          font-weight: 700;
          margin-bottom: 12px;
        }

        .not-found-code {
          font-family: 'Gambarino', serif;
          font-size: clamp(72px, 12vw, 140px);
          font-weight: 500;
          line-height: 1;
          color: #8235d0;
          margin-bottom: 10px;
        }

        .not-found-title {
          font-family: 'Gambarino', serif;
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 500;
          color: #1a0a2e;
          margin-bottom: 14px;
        }

        .not-found-desc {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(26, 10, 46, 0.6);
          max-width: 440px;
          margin-bottom: 36px;
        }

        .not-found-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 12px 28px rgba(130, 53, 208, 0.25);
          transition: all 0.25s ease;
        }

        .not-found-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(130, 53, 208, 0.3);
        }

        .nf-footer-note {
          margin-top: 28px;
          font-size: 13px;
          color: rgba(26,10,46,0.45);
        }

        @media (max-width: 480px) {
          .not-found {
            padding-top: 100px;
          }
        }
      `}</style>

      <div className="not-found">
        <div className="nf-badge">60Plus India</div>

        <div className="not-found-code">404</div>

        <h1 className="not-found-title">
          This page isn’t available
        </h1>

        <p className="not-found-desc">
          It seems the page you’re looking for doesn’t exist or may have been moved.  
          Let’s take you back to a place where you can continue caring for your parents.
        </p>

        <Link to="/" className="not-found-cta">
          Return to Home
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </Link>

        <div className="nf-footer-note">
          If you believe this is an error, feel free to reach out to our team.
        </div>
      </div>
    </>
  );
}