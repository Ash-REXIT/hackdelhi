import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getWhatsAppUrl } from "../data/whatsappMessages";

const NAV_LINKS = ["Home", "Services", "Testimonials", "Blog", "About Us", "Contact Us"];

export default function Navbar({ alwaysWhite = false, autoHide = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToAssessment = () => {
    navigate('/book-free-senior-home-safety-assessment');
    setMenuOpen(false);
  };

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
    setMenuOpen(false); // Close mobile menu when popup closes
  };

  useEffect(() => {
    const fn = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      if (autoHide) {
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        
        // Show at top
        if (currentScrollY < 100) {
          setHidden(false);
        } 
        // Show at bottom (near footer)
        else if (currentScrollY + winHeight >= docHeight - 100) {
          setHidden(false);
        } 
        // Hide in the middle (during the story)
        else {
          setHidden(true);
        }
      }
    };
    
    window.addEventListener("scroll", fn);
    // Initial check
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [autoHide]);

  const scrollToSection = (sectionId) => {
    const targetId = sectionId === "services" ? "services-cards" : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      navigate("/");
      sessionStorage.setItem("scrollTo", targetId);
    }
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        :root {
          --cta: linear-gradient(94deg, #8235d0 -2.32%, #5f308e 99.71%);
          --purple: #8235d0;
          --nav-h: 76px;
          --fb: 'Nunito Sans', sans-serif;
        }

        .nav {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 1000;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          padding: 0 clamp(18px, 5vw, 72px);
          transition: background 0.4s, box-shadow 0.4s;
          box-sizing: border-box;
        }
        .nav.top { background: transparent; }
        .nav.scrolled {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 1px 0 rgba(130,53,208,0.14);
        }

        .nav-inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .nav-logo-img {
          height: 40px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .nav-logo-sep {
          width: 1px;
          height: 28px;
          background: rgba(255,255,255,0.45);
          flex-shrink: 0;
          transition: background 0.3s;
        }
        .nav.scrolled .nav-logo-sep,
        .nav.always-white .nav-logo-sep {
          background: rgba(130,53,208,0.2);
        }

        .nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-links a {
          font-family: var(--fb);
          font-size: 15px;
          font-weight: 700;
          color: #1a0a2e;
          text-decoration: none;
          letter-spacing: 0.2px;
          position: relative;
          transition: color 0.2s;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--cta);
          border-radius: 2px;
          transition: width 0.26s ease;
        }
        .nav-links a:hover::after { width: 100%; }

        .btn-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 26px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-family: var(--fb);
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.4px;
          color: #fff !important;
          -webkit-text-fill-color: #fff !important;
          background: var(--cta) !important;
          text-decoration: none;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s;
          box-sizing: border-box;
        }
        .btn-cta:hover { transform: translateY(-2px); }
        .btn-cta:active { transform: translateY(0); }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          background: none;
          border: none;
          flex-shrink: 0;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #1a0a2e;
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        .nav.scrolled .hamburger span,
        .nav.always-white .hamburger span { background: #2d1060; }

        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile drawer ── */
        .mob-menu {
          position: fixed;
          top: var(--nav-h);
          left: 0;
          right: 0;
          box-sizing: border-box;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 999;
          padding: 20px 20px 28px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          border-bottom: 1px solid rgba(130,53,208,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
        }
        .mob-menu a {
          font-family: var(--fb);
          font-size: 17px;
          font-weight: 700;
          color: #2d1060;
          text-decoration: none;
          padding: 12px 4px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: color 0.2s;
          display: block;
          box-sizing: border-box;
          width: 100%;
        }
        .mob-menu a:hover { color: var(--purple); }

        /* Dedicated mobile Subscribe button - separate from .btn-cta to avoid conflicts */
        .mob-sub-btn {
          margin-top: 14px;
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 14px 20px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-family: var(--fb);
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.4px;
          color: #fff !important;
          -webkit-text-fill-color: #fff !important;
          background: linear-gradient(94deg, #8235d0 -2.32%, #5f308e 99.71%);
          text-decoration: none;
          text-align: center;
          transition: transform 0.2s;
        }
        .mob-sub-btn:hover { transform: translateY(-2px); }

        /* ── Breakpoints ── */
        @media (max-width: 768px) {
          .nav-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .nav-links    { display: none !important; }
          .nav-cta-desk { display: none !important; }
          .hamburger    { display: flex !important; }
        }

        @media (min-width: 769px) {
          .hamburger    { display: none !important; }
          .nav-links    { display: flex !important; }
          .nav-cta-desk { display: inline-flex !important; }
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

      <motion.nav
        className={`nav ${(scrolled || alwaysWhite) ? "scrolled" : "top"}${alwaysWhite ? " always-white" : ""}`}
        initial={{ y: -76, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-inner">
          <a href="/" className="nav-logo" aria-label="ITEL and 60 Plus">
            <img src="/logo/60_plus_india.png" alt="60 Plus" className="nav-logo-img" />
            <span className="nav-logo-sep" />
            <img src="/logo/ITEL_LOGO.png" alt="ITEL" className="nav-logo-img" />
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map(l => (
              <li key={l}>
                {l === "About Us" ? (
                  <Link to="/about" onClick={() => setMenuOpen(false)}>
                    {l}
                  </Link>
                ) : l === "Contact Us" ? (
                  <Link to="/contact" onClick={() => setMenuOpen(false)}>
                    {l}
                  </Link>
                ) : l === "Blog" ? (
                  <Link to="/blogs" onClick={() => setMenuOpen(false)}>
                    {l}
                  </Link>
                ) : (
                  <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(l.toLowerCase()); }}>
                    {l}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {!location.pathname.includes('book-free-senior-home-safety-assessment') && (
            <button onClick={goToAssessment} className="btn-cta nav-cta-desk">
              Book Free Assessment
            </button>
          )}

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mob-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
          >
            {NAV_LINKS.map(l => (
              l === "About Us" ? (
                <Link
                  key={l}
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                >
                  {l}
                </Link>
              ) : l === "Contact Us" ? (
                <Link
                  key={l}
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                >
                  {l}
                </Link>
              ) : l === "Blog" ? (
                <Link
                  key={l}
                  to="/blogs"
                  onClick={() => setMenuOpen(false)}
                >
                  {l}
                </Link>
              ) : (
                <a
                  key={l}
                  href="#"
                  onClick={(e) => { e.preventDefault(); scrollToSection(l.toLowerCase()); }}
                >
                  {l}
                </a>
              )
            ))}
            {!location.pathname.includes('book-free-senior-home-safety-assessment') && (
              <button
                className="mob-sub-btn"
                onClick={goToAssessment}
              >
                Book Free Assessment
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
}