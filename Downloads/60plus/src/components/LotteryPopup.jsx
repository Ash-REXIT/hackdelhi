import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LotteryPopup({ isOpen, onClose }) {
  const navigate = useNavigate();
  // Use UTC to ensure consistent countdown across timezones
  // April 27, 11:59 PM CDT = April 28, 04:59:59 UTC
  const targetDate = new Date(Date.UTC(2026, 3, 28, 4, 59, 59));

  const getTimeLeft = () => {
    const diff = targetDate - new Date();
    const total = Math.max(0, Math.floor(diff / 1000));

    return {
      d: Math.floor(total / 86400),
      h: Math.floor((total % 86400) / 3600),
      m: Math.floor((total % 3600) / 60),
      s: total % 60,
    };
  };

  const [time, setTime] = useState(getTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      setTime(getTimeLeft());
      setIsExpired(diff <= 0);
    }, 1000);

    return () => {
      document.body.style.overflow = "auto";
      clearInterval(timer);
    };
  }, [isOpen]);

  if (!isOpen || isExpired) return null;

  return (
    <div className="lottery-overlay">
      <div className="lottery-modal">
        <button className="lottery-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="lottery-image-container">
          <img src="/images/stand_image.png" alt="Premium Subscription Prize" />
        </div>

        <div className="lottery-content">
          <header>
            <span className="tag">EXCLUSIVE OPPORTUNITY</span>
            <h2>Win 1-Year <span>Premium Subscription</span></h2>
          </header>

          <div className="timer-section">
            <p className="timer-label">PROMOTION ENDS IN</p>
            <div className="timer-grid">
              <div className="timer-unit">
                <div className="unit-box"><strong>{String(time.d).padStart(2, '0')}</strong></div>
                <span>Days</span>
              </div>
              <div className="timer-unit">
                <div className="unit-box"><strong>{String(time.h).padStart(2, '0')}</strong></div>
                <span>Hours</span>
              </div>
              <div className="timer-unit">
                <div className="unit-box"><strong>{String(time.m).padStart(2, '0')}</strong></div>
                <span>Mins</span>
              </div>
              <div className="timer-unit">
                <div className="unit-box"><strong>{String(time.s).padStart(2, '0')}</strong></div>
                <span>Secs</span>
              </div>
            </div>
          </div>

          <p className="desc">
            Participate in our lucky draw for a chance to win smart devices or a full year of premium access for your parents.
          </p>

          <button
            className="lottery-btn"
            onClick={() => {
              navigate("/lottery");
              onClose();
            }}
          >
            Enter Lucky Draw
          </button>
        </div>
      </div>

      <style>{`
        .lottery-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 5, 20, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .lottery-modal {
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.4);
          position: relative;
          animation: modalAppear 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalAppear {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lottery-close {
          position: absolute;
          top: 16px;
          right: 16px;
          border: none;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1a0a2e;
          z-index: 10;
          transition: background 0.2s;
        }

        .lottery-close:hover {
          background: #f0f0f0;
        }

        .lottery-image-container {
          background: radial-gradient(circle at center, #f4efff 0%, #ffffff 100%);
          padding: 40px 20px 20px;
          display: flex;
          justify-content: center;
          border-bottom: 1px solid #f0ebf8;
        }

        .lottery-image-container img {
          width: 200px;
          height: auto;
          filter: drop-shadow(0 10px 15px rgba(130, 53, 208, 0.2));
        }

        .lottery-content {
          padding: 24px 32px 32px;
          text-align: center;
        }

        .tag {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: #8235d0;
          font-weight: 800;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        h2 {
          font-size: 22px;
          line-height: 1.3;
          margin-bottom: 20px;
          color: #1a0a2e;
          font-weight: 700;
        }

        h2 span {
          color: #8235d0;
          display: block;
        }

        .timer-section {
          background: #f9f7ff;
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 20px;
        }

        .timer-label {
          font-size: 10px;
          font-weight: 700;
          color: #a094b0;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }

        .timer-grid {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .timer-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50px;
        }

        .unit-box {
          background: #ffffff;
          width: 100%;
          padding: 8px 0;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          border: 1px solid #eee;
          margin-bottom: 4px;
        }

        .timer-unit strong {
          font-size: 20px;
          font-weight: 800;
          color: #1a0a2e;
        }

        .timer-unit span {
          font-size: 10px;
          color: #888;
          text-transform: uppercase;
          font-weight: 600;
        }

        .desc {
          font-size: 13px;
          line-height: 1.5;
          color: #554d60;
          margin-bottom: 24px;
        }

        .lottery-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #8235d0 0%, #5f308e 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 15px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 10px 20px -5px rgba(130, 53, 208, 0.4);
        }

        .lottery-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -5px rgba(130, 53, 208, 0.5);
        }

        @media (max-width: 400px) {
          .lottery-content {
            padding: 20px 24px 24px;
          }
          .timer-grid {
            gap: 8px;
          }
          .timer-unit {
            width: 45px;
          }
        }
      `}</style>
    </div>
  );
}