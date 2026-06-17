import { motion, useInView } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getWhatsAppUrl } from "../data/whatsappMessages";
import Breadcrumb from "../components/Breadcrumb";
import { useRef, useState, useEffect } from "react";
import useMetaTags from "../hooks/useMetaTags";
import { aboutWhoWeAreSections as sections } from "../data/aboutWhoWeAre";

/* ── Animation variants ── */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeInVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function ScrollReveal({ children, custom = 0, className = "", variants = fadeUpVariants }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      custom={custom}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export default function AboutUs() {
  const navigate = useNavigate();
  const location = useLocation();
  useMetaTags(
    'About 60 Plus India | We Care Like Family',
    'We are a team that helps older people live better lives. We provide health care and emotional support to seniors, acting as a bridge between them and their children.',
    'about 60 plus india, senior support team, caring for parents'
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  return (
    <section className="about-page">
      <Navbar alwaysWhite />

      <style>{`
        .about-page {
          padding: 0;
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
          font-family: 'Nunito Sans', sans-serif;
          padding-top: 76px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }


        /* ── HERO SECTION ── */
        .about-hero {
          background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
          padding: 70px 20px 100px;
          text-align: center;
          position: relative;
          overflow: visible;
        }

        .about-hero::after {
          content: "";
          position: absolute;
          bottom: -60px;
          left: 0;
          width: 100%;
          height: 100px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q720,100 1440,0 L1440,0 L0,0 Z' fill='%23faf5ff'/%3E%3C/svg%3E");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          z-index: 0;
          pointer-events: none;
        }

        .about-hero-inner {
          max-width: 900px;
          margin: auto;
          position: relative;
          z-index: 1;
        }

        .about-hero h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 5vw, 56px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
          color: #1a0a2e;
        }

        .about-hero p {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(26,10,46,0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* ── SINGLE CONSISTENT CONTAINER ── */
        .about-container {
          width: 100%;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 24px;
          box-sizing: border-box;
        }

        /* ── REPRESENTATION IMAGE ── */
        .about-representation {
          margin: -30px 0 80px;
          position: relative;
          z-index: 2;
        }

        .about-representation img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        /* ── CONTENT SECTIONS ── */
        .about-sections {
          margin: 0 auto 100px;
        }

        .about-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 48px 44px;
          margin-bottom: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.05);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }

        .about-card:hover {
          box-shadow: 0 12px 40px rgba(130,53,208,0.08);
          transform: translateY(-2px);
        }

        .about-card-badge {
          display: inline-block;
          background: #8235d0;
          color: white;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .about-card h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 500;
          color: #1a0a2e;
          margin-bottom: 16px;
          line-height: 1.25;
        }

        .about-card p {
          font-size: 17px;
          line-height: 1.75;
          color: rgba(26,10,46,0.7);
          max-width: 800px;
        }

        /* ── FOUNDER SECTION ── */
        .about-founder {
          margin: 0 auto 100px;
        }

        .founder-card {
          background: linear-gradient(135deg, #1a0a2e 0%, #2d1654 100%);
          border-radius: 28px;
          padding: 40px 44px;  /* reduce from 56px */
          color: white;
          position: relative;
          overflow: hidden;
        }

        .new-layout {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 36px;
        }

        .founder-desc {
          font-size: 15px;
          line-height: 1.85;
          color: rgba(255,255,255,0.75);
          max-width: 100%;
          letter-spacing: 0.2px;
          text-align: justify;
        }

        .founder-card::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(130,53,208,0.2);
          filter: blur(60px);
          pointer-events: none;
        }

        .founder-img-wrapper {
          flex-shrink: 0;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(130,53,208,0.6);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          align-self: center;
        }

        .founder-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .founder-text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }

        .founder-label {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
          margin-top: 0;
        }

        .founder-name {
          font-family: "Gambarino", serif;
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 500;
          margin: 0;
          line-height: 1.15;
        }

        .founder-role {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          margin: 0 0 16px;
          font-weight: 600;
        }


        .founder-name-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .founder-linkedin-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.9);
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.3px;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .founder-linkedin-btn:hover {
          background: rgba(255,255,255,0.2);
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
          transform: scale(1.02);
        }

        .founder-linkedin-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          transition: all 0.25s ease;
        }

        .founder-linkedin-icon svg {
          width: 14px;
          height: 14px;
          fill: #0A66C2;
        }

        .founder-linkedin-icon:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }
        }

        /* ── CTA SECTION ── */
        .about-cta {
          margin: 0 auto;
          padding-bottom: 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .about-cta h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 500;
          color: #1a0a2e;
          margin-bottom: 16px;
          line-height: 1.25;
          text-align: center;
        }

        #join-our-journey {
          text-align: center;
        }

      #subscribe-now-btn {
    display: block !important;
    margin: 0 auto 30px !important;
    text-align: center;
}

        .about-cta p {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(26,10,46,0.65);
          max-width: 600px;
          margin: 0 auto 32px;
        }

        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 18px 44px;
          border-radius: 999px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          font-weight: 800;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          text-align: center;
          width: fit-content;
          margin: ;
        }

        .about-cta-btn:hover {
          transform: translateY(2px);
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

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .about-hero {
            padding: 60px 16px 60px;
          }
          .about-hero h1 {
            font-size: 30px;
            line-height: 1.3;
          }
          .about-hero p {
            font-size: 15px;
          }
          .about-representation img {
            height: 240px;
            border-radius: 18px;
          }
          .about-card {
            padding: 32px 24px;
            border-radius: 18px;
          }
          .about-card h2 {
            font-size: 24px;
          }
          .about-card p {
            font-size: 15px;
          }
          .founder-card {
            flex-direction: column;
            text-align: center;
            padding: 40px 28px;
            gap: 28px;
            border-radius: 20px;
          }
          .founder-img-section {
            align-items: center;
          }
          .founder-img-wrapper {
            width: 140px;
            height: 140px;
          }
          .founder-linkedin-btn {
            font-size: 12px;
            padding: 8px 14px;
          }
          .founder-desc {
            max-width: 100%;
          }
          .about-breadcrumb {
            padding: 0 16px;
          }

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

      {/* ── BREADCRUMB ── */}
      <Breadcrumb items={[{ label: "About Us" }]} />

      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <motion.h1
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            About <span style={{ color: '#8235d0', fontWeight: 700 }}>60Plus</span> India <span style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 400, opacity: 0.6 }}>powered by Nura AI Labs</span>
          </motion.h1>
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Dedicated to bringing happiness, safety, and dignity into the
            lives of senior citizens - because they deserve the best.
          </motion.p>
        </div>
      </section>

      {/* ── REPRESENTATION IMAGE ── */}
      <div className="about-container">
        <ScrollReveal className="about-representation">
          {/* TODO: Replace with your representation image */}
          <img
            src="/images/old_person8.jpg"
            alt="Seniors enjoying a happy and fulfilling life"
          />
        </ScrollReveal>
      </div>

      {/* ── CONTENT SECTIONS ── */}
      <div className="about-container">
        <div className="about-sections">
          {sections.map((sec, i) => (
            <ScrollReveal key={sec.badge} custom={i}>
              <div className="about-card">
                <span className="about-card-badge">{sec.badge}</span>
                <h2>{sec.title}</h2>
                <p>{sec.content}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── FOUNDER SECTION ── */}
      <div className="about-container">
        <ScrollReveal className="about-founder">
        <div className="founder-card new-layout">

          {/* LEFT - Profile Image */}
          <div className="founder-img-section">
            <div className="founder-img-wrapper">
              <img
                src="/images/arasi.png"
                alt="Founder of 60Plus India"
              />
            </div>
          </div>

          {/* RIGHT - Name, Role, Description */}
          <div className="founder-text">
            <span className="founder-label">The Story Behind 60Plus</span>
            <div className="founder-name-row">
              <h2 className="founder-name">Arasi Arul</h2>
              <a
                href="https://www.linkedin.com/in/arasiarul"
                target="_blank"
                rel="noopener noreferrer"
                className="founder-linkedin-icon"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6C22.42 7.6 24 10.08 24 14.1V24h-5v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.26 2.2-3.26 4.48V24h-5V8z"/>
                </svg>
              </a>
            </div>
            <p className="founder-role">60Plus India</p>
            <p className="founder-desc">
Arasi Arul is dedicated to improving the lives of senior citizens through 60Plus India. 
Inspired by caregiving challenges during the pandemic, she built a platform focused on healthcare, safety, and daily support for seniors. 
With an engineering background and an MBA from LIBA, she combines empathy with execution to create meaningful impact.
</p>
          </div>

        </div>
      </ScrollReveal>
      </div>


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
    </section>
  );
}
