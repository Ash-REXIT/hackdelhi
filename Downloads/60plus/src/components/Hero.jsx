import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { getWhatsAppUrl } from "../data/whatsappMessages";
import {
  Users,
  MapPin,
  Stethoscope,
  HeartPulse,
  PhoneCall,
  ShieldCheck,
  Volume2,
  VolumeX
} from "lucide-react";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const location = useLocation();
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert('Please fill in both name and mobile number');
      return;
    }

    // Basic mobile number validation
    const mobileRegex = /^[0-9]{10,15}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert('Please enter a valid mobile number');
      return;
    }

    // Submit the form
    setFormSubmitted(true);
  };

  const handleClosePopup = () => {
    setShowSubscribeForm(false);
    setFormSubmitted(false);
    setFormData({ name: '', mobile: '' });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle scrolling to section when arriving from footer link
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTo');
    if (!target) return;

    sessionStorage.removeItem('scrollTo');

    // Small delay ensures the page has painted before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 76;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700;800&display=swap');

        .hero-view {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(
            180deg,
            #f4edff 0%,
            #f9f6ff 60%,
            #f3ecff 100%
          );
          display: flex;
          flex-direction: column;
          font-family: 'Nunito Sans', sans-serif;
          padding-top: 80px;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        /* Subtle Purple Wash BG with Parallax */
        .hero-bg-wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 85% 15%, rgba(130,53,208,0.10), transparent 40%),
            radial-gradient(circle at 60% 40%, rgba(130,53,208,0.05), transparent 60%),
            linear-gradient(180deg, #f6f0ff 0%, #ffffff 70%);
          z-index: 0;
          pointer-events: none;

          transform: translateY(0); /* needed for animation */
          transition: transform 0.1s linear;
          opacity: 0.9;
        }

        .hero-main-area {
          flex: 1; 
          display: flex;
          align-items: center;
          z-index: 1;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          align-items: center;
          max-width: 1300px;
          margin: 0 auto;
          width: 100%;
          padding: 0 40px;
          gap: 60px;
        }

        /* Text Styles */
        .hero-content h1 {
          font-family: 'Gambarino', serif;
          font-size: clamp(34px, 4.5vw, 60px);
          line-height: 1.1;
          color: #1a0a2e;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .hero-content h1 span { color: #8235d0; }

        .hero-content p {
          font-size: clamp(16px, 1.2vw, 18px);
          line-height: 1.6;
          color: rgba(26, 10, 46, 0.6);
          margin-bottom: 32px;
          max-width: 500px;
        }

        .btn-cta {
          display: inline-block;
          padding: 16px 44px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          border-radius: 50px;
          font-weight: 800;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 10px 20px rgba(130, 53, 208, 0.2);
        }

        /* Video Styles */
        .video-card {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 28px;
          background: linear-gradient(135deg, rgba(130,53,208,0.18), rgba(130,53,208,0.05));
          padding: 2px;
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.08),
            0 4px 12px rgba(130, 53, 208, 0.08);
          overflow: hidden;
        }

        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 26px;
        }

        /* Hide all native controls */
        .hero-video::-webkit-media-controls { display: none !important; }
        .hero-video::-webkit-media-controls-enclosure { display: none !important; }

        .mute-toggle {
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #1a0a2e;
          z-index: 10;
        }

        /* Features/Stats Bar */
        .features-bar {
          width: 100%;
          max-width: 1300px;
          margin: 40px auto;
          padding: 0 40px;
          z-index: 2;
        }

        .features-inner {
          background: #ffffff;
          border-radius: 24px;
          padding: 30px 20px;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }

        .feat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          padding: 10px 0;
          border-radius: 12px;
        }

        .features-inner > .feat-item:not(:last-child)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 20%;
          height: 60%;
          width: 1px;
          background: rgba(0, 0, 0, 0.06);
        }

        .feat-icon {
          color: #8235d0;
          margin-bottom: 10px;
          background: rgba(130, 53, 208, 0.08);
          padding: 12px;
          border-radius: 12px;
          transition: transform 0.2s ease;
        }

        .feat-item:hover .feat-icon {
          transform: scale(1.1);
        }

        .feat-val { font-weight: 800; font-size: 15px; color: #1a0a2e; }
        .feat-label { font-size: 11px; color: rgba(26, 10, 46, 0.5); font-weight: 700; text-transform: uppercase; }

        /* MOBILE FIXES */
        @media (max-width: 768px) {
          .hero-view { padding-top: 70px; }

          .hero-container {
            grid-template-columns: 1fr;
            padding: 0; /* Remove container padding for full width video */
            gap: 30px;
          }

          .hero-content {
            padding: 0 20px;
            text-align: center;
          }

          .hero-content p { margin: 0 auto 24px; }

          /* Video full-width on mobile */
          .hero-visual {
            width: 100%;
            padding: 0;
          }

          .video-card {
            border-radius: 0;
            padding: 2px;
            box-shadow: none;
          }

          /* Neat horizontal 3-column grid for cards */
          .features-bar {
            padding: 0;
            margin-top: 20px;
            display: flex;
            justify-content: center; /* KEY */
          }

          .features-inner {
            width: calc(100% - 24px); /* equal side spacing */
            margin: 0 auto; /* center */
            grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
            gap: 20px 5px;
            padding: 24px 10px;
            border-radius: 16px;
          }

          .feat-icon {
            padding: 8px;
            margin-bottom: 6px;
          }

          .features-inner > .feat-item::after {
            display: none;
          }

          .features-inner {
            border-top: 1px solid rgba(0,0,0,0.05);
          }

          .feat-item {
            border-bottom: 1px solid rgba(0,0,0,0.05);
            padding-bottom: 10px;
          }

          .feat-val { font-size: 13px; }
          .feat-label { font-size: 9px; letter-spacing: 0; }
        }

        /* SUBSCRIPTION POPUP */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .popup-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f8f5ff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .popup-close:hover {
          background: #8235d0;
          color: white;
        }

        .subscribe-form h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 4px;
          text-align: center;
          font-weight: 500;
        }

        .subscribe-form .subtitle {
          text-align: center;
          color: rgba(26, 10, 46, 0.6);
          font-size: 14px;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #1a0a2e;
          margin-bottom: 8px;
        }

        .form-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #8235d0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-group input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          border: 2px solid rgba(26,10,46,0.1);
          border-radius: 12px;
          font-size: 15px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          box-sizing: border-box;
          transition: all 0.2s ease;
          background: #fafafa;
        }

        .form-group input:focus {
          outline: none;
          border-color: #8235d0;
          background: white;
        }

        .form-group input::placeholder {
          color: rgba(26,10,46,0.4);
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .submit-btn, .cancel-btn {
          flex: 1;
          padding: 14px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          border: none;
          font-family: 'Nunito Sans', sans-serif;
          transition: all 0.2s ease;
        }

        .submit-btn {
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
        }

        .submit-btn:hover {
          background: linear-gradient(94deg, #7a2bc4, #562aa0);
        }

        .cancel-btn {
          background: #f8f5ff;
          color: #8235d0;
          border: 2px solid rgba(130, 53, 208, 0.2);
        }

        .cancel-btn:hover {
          background: #f0e6ff;
        }

        .success-content {
          text-align: center;
          padding-top: 6px;
        }

        .success-content .success-icon {
          width: 50px;
          height: 50px;
          background: #e8f5e9;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: #4caf50;
        }

        .success-content h3 {
          font-family: "Gambarino", serif;
          font-size: 24px;
          color: #1a0a2e;
          margin: 0 0 10px;
          font-weight: 500;
        }

        .success-content p {
          font-size: 15px;
          color: #1a0a2e;
          margin: 0 0 24px;
          line-height: 1.5;
          font-weight: 500;
        }

        .whatsapp-support {
          margin: 24px 0;
        }

        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          background: #25D366;
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 15px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .whatsapp-btn:hover {
          background: #128C7E;
        }

        .payment-note {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #666;
          margin: 24px 0;
          font-style: italic;
          border: 1px solid #e0e0e0;
        }

        .close-btn {
          padding: 12px 28px;
          background: #8235d0;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          cursor: pointer;
          margin-top: 12px;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: #7a2bc4;
        }

        @media (max-width: 768px) {
          .popup-content {
            margin: 20px;
            padding: 28px 20px;
          }

          .form-actions {
            flex-direction: column;
          }

          .whatsapp-btn {
            width: 100%;
          }
        }
      `}</style>

      <div id="home" className="hero-view">
        <div className="hero-bg-wash" />

        <div className="hero-main-area">
          <div className="hero-container">
            {/* TEXT AREA */}
            <motion.div 
              className="hero-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>
                Care for your parents, even when <span>you're away.</span>
              </h1>
              <p>
                Trusted support, regular check-ins, and a caring community - 
                ensuring your parents stay safe, active, and independent at home.
              </p>
              <button onClick={() => navigate('/book-free-senior-home-safety-assessment')} className="btn-cta">
                Book Free Assessment
              </button>
            </motion.div>

            {/* VIDEO AREA - Full Width on Mobile */}
            <motion.div 
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="video-card">
                <video
                  ref={videoRef}
                  className="hero-video"
                  src="/videos/hero_video_ta.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  controlsList="nodownload nofullscreen noremoteplayback"
                />
                <button className="mute-toggle" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FEATURES BAR - Neatly Horizontal 3x2 Grid on Mobile */}
        <motion.div
          className="features-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="features-inner">
            <div className="feat-item">
              <div className="feat-icon"><Users size={24} /></div>
              <span className="feat-val">50K+</span>
              <span className="feat-label">Families</span>
            </div>
            <div className="feat-item">
              <div className="feat-icon"><MapPin size={24} /></div>
              <span className="feat-val">Tamil Nadu</span>
              <span className="feat-label">Based</span>
            </div>
            <div className="feat-item">
              <div className="feat-icon"><Stethoscope size={24} /></div>
              <span className="feat-val">21+ Premium</span>
              <span className="feat-label">Services</span>
            </div>
            <div className="feat-item">
              <div className="feat-icon"><HeartPulse size={24} /></div>
              <span className="feat-val">Monthly</span>
              <span className="feat-label">Checks</span>
            </div>
            <div className="feat-item">
              <div className="feat-icon"><PhoneCall size={24} /></div>
              <span className="feat-val">24/7 Call</span>
              <span className="feat-label">Response</span>
            </div>
            <div className="feat-item">
              <div className="feat-icon"><ShieldCheck size={24} /></div>
              <span className="feat-val">Dedicated</span>
              <span className="feat-label">Manager</span>
            </div>
          </div>
        </motion.div>

        {/* Subscription Form Popup */}
        {showSubscribeForm && (
          <div className="popup-overlay" onClick={handleClosePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={handleClosePopup}>×</button>
              {!formSubmitted ? (
                <div className="subscribe-form">
                  <h3>Subscribe to Our Service</h3>
                  <p className="subtitle">Fill in your details and our team will contact you shortly</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <div style={{ position: 'relative' }}>
                        <svg className="form-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Mobile Number</label>
                      <div style={{ position: 'relative' }}>
                        <svg className="form-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                          <path d="M12 18h.01"></path>
                        </svg>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter your mobile number"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="submit-btn">Submit</button>
                      <button type="button" className="cancel-btn" onClick={handleClosePopup}>Cancel</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="success-content">
                  <div className="success-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                  </div>
                  <h3>Thank You!</h3>
                  <p>Our team will contact you within 24 hours.</p>

                  <div className="whatsapp-support">
                    <a
                      href={getWhatsAppUrl(location.pathname)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-btn"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.386"/>
                      </svg>
                      Contact us for 24/7 Support
                    </a>
                  </div>

                  <div className="payment-note">
                    We're working on the payment process
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}