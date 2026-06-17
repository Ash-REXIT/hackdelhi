import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import useMetaTags from "../hooks/useMetaTags";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ScrollReveal({ children, custom = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div ref={ref} className={className} custom={custom} variants={fadeUpVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

const initialForm = {
  name: "", phone: "", email: "", countryCity: "",
  parentsArea: "", bestTimeToCall: "", biggestConcern: "", lookingFor: "",
};

export default function Enquiry() {
  useMetaTags(
    "Enquiry | Get a Personalised Care Plan | 60 Plus India",
    "Tell us about your parents and we will arrange a free, no-obligation call to discuss how we can help them live safely and happily at home.",
    "elderly care enquiry, senior care Chennai, NRI parents care, enquiry form"
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone / WhatsApp number is required";
    else if (!/^[+]?[\d\s\-]{7,20}$/.test(form.phone)) errs.phone = "Enter a valid phone number with country code";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
    if (!form.countryCity.trim()) errs.countryCity = "Country / city is required";
    if (!form.bestTimeToCall) errs.bestTimeToCall = "Please select a time";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsLoading(false);
    setSubmitted(true);
  };

  const closeModal = () => { setSubmitted(false); setForm(initialForm); setErrors({}); };

  return (
    <section className="enquiry-page">
      <Navbar alwaysWhite />

      <style>{`
        .enquiry-page {
          padding: 0; background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
          font-family: 'Nunito Sans', sans-serif; padding-top: 76px; min-height: 100vh;
        }
        .enquiry-breadcrumb {
          max-width: 1200px; margin: 20px auto 10px; padding: 0 24px;
          font-size: 14px; color: rgba(26,10,46,0.65);
        }
        .enquiry-breadcrumb a { color: #8235d0; text-decoration: none; font-weight: 700; }
        .enquiry-breadcrumb a:hover { text-decoration: underline; }
        .enquiry-breadcrumb span { margin: 0 8px; color: rgba(26,10,46,0.4); }

        .enquiry-hero {
          background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
          padding: 70px 20px 100px; text-align: center; position: relative; overflow: visible;
        }
        .enquiry-hero::after {
          content: ""; position: absolute; bottom: -60px; left: 0; width: 100%; height: 100px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q720,100 1440,0 L1440,0 L0,0 Z' fill='%23faf5ff'/%3E%3C/svg%3E");
          background-size: 100% 100%; background-repeat: no-repeat; z-index: 0; pointer-events: none;
        }
        .enquiry-hero-inner { max-width: 700px; margin: auto; position: relative; z-index: 1; }
        .enquiry-hero h1 {
          font-family: "Gambarino", serif; font-size: clamp(34px, 5vw, 52px); font-weight: 500;
          line-height: 1.2; margin-bottom: 16px; color: #1a0a2e;
        }
        .enquiry-hero p { font-size: 18px; line-height: 1.7; color: rgba(26,10,46,0.7); max-width: 600px; margin: 0 auto; }

        .enquiry-content {
          max-width: 1100px; margin: 0 auto; padding: 60px 24px 80px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px; position: relative; z-index: 1; align-items: start;
        }
        .enquiry-form-card {
          background: #ffffff; border-radius: 24px; padding: 40px 36px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.05);
        }
        .enquiry-form-card h2 {
          font-family: "Gambarino", serif; font-size: 26px; font-weight: 500; color: #1a0a2e; margin-bottom: 6px;
        }
        .enquiry-form-card > p { font-size: 15px; color: rgba(26,10,46,0.65); margin-bottom: 28px; line-height: 1.6; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 18px; }
        .form-group label {
          display: block; font-size: 13px; font-weight: 700; color: #1a0a2e; margin-bottom: 6px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .form-group label .optional { font-weight: 400; text-transform: none; letter-spacing: 0; color: rgba(26,10,46,0.45); font-size: 12px; }
        .form-group input, .form-group textarea {
          width: 100%; padding: 13px 16px; border: 2px solid rgba(26,10,46,0.1); border-radius: 14px;
          font-size: 15px; font-family: 'Nunito Sans', sans-serif; color: #1a0a2e; background: #fafafa;
          transition: all 0.25s ease; box-sizing: border-box; outline: none;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: #8235d0; background: #ffffff; box-shadow: 0 0 0 4px rgba(130,53,208,0.1);
        }
        .form-group input.has-error, .form-group textarea.has-error { border-color: #e53e3e; background: #fff5f5; }
        .form-group input::placeholder, .form-group textarea::placeholder { color: rgba(26,10,46,0.4); }
        .form-group textarea { resize: vertical; min-height: 90px; }
        .form-error-msg { font-size: 12px; color: #e53e3e; margin-top: 4px; font-weight: 600; }
        .radio-group { display: flex; gap: 10px; flex-wrap: wrap; }
        .radio-option { position: relative; }
        .radio-option input[type="radio"] { position: absolute; opacity: 0; width: 0; height: 0; }
        .radio-option label {
          display: inline-block; padding: 10px 20px; border: 2px solid rgba(26,10,46,0.12); border-radius: 12px;
          font-size: 14px; font-weight: 600; color: rgba(26,10,46,0.7); cursor: pointer; transition: all 0.25s ease;
          background: #fafafa; text-transform: none; letter-spacing: 0;
        }
        .radio-option input[type="radio"]:checked + label {
          border-color: #8235d0; background: rgba(130,53,208,0.08); color: #8235d0;
        }
        .radio-option label:hover { border-color: rgba(130,53,208,0.4); }
        .radio-group.has-error .radio-option label { border-color: #e53e3e; }
        .form-submit-btn {
          width: 100%; padding: 16px; border-radius: 14px; background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white; font-weight: 800; font-size: 16px; font-family: 'Nunito Sans', sans-serif;
          border: none; cursor: pointer; transition: all 0.3s ease; margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .form-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(130,53,208,0.25); }
        .form-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .loader {
          width: 18px; height: 18px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid #ffffff;
          border-radius: 50%; animation: spin 0.8s linear infinite; display: inline-block; margin-right: 10px; vertical-align: middle;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .enquiry-info { display: flex; flex-direction: column; gap: 24px; }
        .info-card {
          background: #ffffff; border-radius: 20px; padding: 28px 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease;
        }
        .info-card:hover { box-shadow: 0 8px 28px rgba(130,53,208,0.1); transform: translateY(-4px); }
        .info-card-badge {
          display: inline-block; background: #8235d0; color: white; padding: 5px 14px; border-radius: 999px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 16px;
        }
        .info-card h3 { font-family: "Gambarino", serif; font-size: 20px; font-weight: 500; color: #1a0a2e; margin-bottom: 16px; }
        .steps-list { display: flex; flex-direction: column; gap: 16px; }
        .step-item { display: flex; gap: 14px; align-items: flex-start; }
        .step-num {
          flex-shrink: 0; width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #8235d0, #5f308e); color: white;
          display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800;
        }
        .step-text h4 { font-size: 15px; font-weight: 700; color: #1a0a2e; margin: 0 0 2px; }
        .step-text p { font-size: 13px; color: rgba(26,10,46,0.6); margin: 0; line-height: 1.5; }
        .trust-list { display: flex; flex-direction: column; gap: 12px; }
        .trust-item { display: flex; align-items: center; gap: 12px; }
        .trust-icon {
          flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; background: rgba(130,53,208,0.08);
          display: flex; align-items: center; justify-content: center; color: #8235d0;
        }
        .trust-item p { font-size: 14px; color: #1a0a2e; margin: 0; font-weight: 600; line-height: 1.4; }
        .whatsapp-card {
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          border: 1px solid rgba(34,197,94,0.2); text-align: center; padding: 28px 24px; border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05); transition: all 0.3s ease;
        }
        .whatsapp-card:hover { transform: translateY(-4px); box-shadow: 0 8px 28px rgba(34,197,94,0.15); }
        .whatsapp-card h3 { font-family: "Gambarino", serif; font-size: 20px; font-weight: 500; color: #1a0a2e; margin-bottom: 8px; }
        .whatsapp-card p { font-size: 14px; color: rgba(26,10,46,0.65); margin-bottom: 20px; line-height: 1.5; }
        .whatsapp-link {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 28px;
          background: #25D366; color: white; text-decoration: none; border-radius: 14px; font-weight: 700; font-size: 15px;
          transition: all 0.25s ease; border: none; cursor: pointer;
        }
        .whatsapp-link:hover { background: #128C7E; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.3); }

        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          background: white; border-radius: 20px; padding: 48px; max-width: 480px; width: 90%; text-align: center;
          box-shadow: 0 25px 50px rgba(0,0,0,0.15); position: relative; animation: modalPop 0.3s ease-out;
          border: 1px solid rgba(0,0,0,0.08);
        }
        @keyframes modalPop { from { opacity: 0; transform: scale(0.8) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .modal-icon {
          width: 80px; height: 80px; border-radius: 50%; background: white; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 28px; border: 2px solid #1a0a2e;
        }
        .modal-icon svg { width: 32px; height: 32px; fill: #1a0a2e; }
        .modal-title { font-family: "Gambarino", serif; font-size: 28px; color: #1a0a2e; margin-bottom: 16px; font-weight: 500; }
        .modal-message { font-size: 16px; color: rgba(26,10,46,0.75); line-height: 1.7; margin-bottom: 24px; font-weight: 400; }
        .modal-whatsapp { margin-bottom: 24px; }
        .modal-button {
          background: linear-gradient(94deg, #8235d0, #5f308e); color: white; border: none; padding: 16px 40px;
          border-radius: 12px; font-weight: 700; font-size: 16px; cursor: pointer; transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(130,53,208,0.25);
        }
        .modal-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(130,53,208,0.35); }

        @media (max-width: 768px) {
          .enquiry-content { grid-template-columns: 1fr; gap: 30px; padding: 40px 16px 60px; }
          .enquiry-form-card { padding: 28px 20px; }
          .form-row { grid-template-columns: 1fr; }
          .enquiry-hero { padding: 50px 16px 60px; }
          .enquiry-hero h1 { font-size: 30px; }
          .enquiry-breadcrumb { padding: 0 16px; }
          .modal-content { padding: 32px 24px; margin: 0 16px; }
          .radio-group { flex-direction: column; }
          .radio-option label { width: 100%; text-align: center; }
          .step-item { gap: 10px; }
        }
      `}</style>

      {submitted && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-icon">
              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
            </div>
            <h3 className="modal-title">Enquiry Received!</h3>
            <p className="modal-message">Thank you for reaching out. Our care team will call you at your preferred time to discuss the best care plan for your parents.</p>
            <div className="modal-whatsapp">
              <a href="https://wa.me/919499944939?text=Hi,%20I%20just%20submitted%20an%20enquiry%20on%20your%20website.%20I%20would%20like%20to%20know%20more%20about%20care%20plans%20for%20my%20parents." target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                💬 Chat on WhatsApp
              </a>
            </div>
            <button className="modal-button" onClick={closeModal}>OK, Got it</button>
          </div>
        </div>
      )}

      <div className="enquiry-breadcrumb">
        <Link to="/">Home</Link><span>&gt;</span><span>Enquiry</span>
      </div>

      <section className="enquiry-hero">
        <div className="enquiry-hero-inner">
          <motion.h1 variants={fadeUpVariants} initial="hidden" animate="visible" custom={0}>
            We'd Love to Help Your Parents
          </motion.h1>
          <motion.p variants={fadeUpVariants} initial="hidden" animate="visible" custom={1}>
            Tell us a little about your situation and we'll arrange a free, no-obligation call to discuss how we can help.
          </motion.p>
        </div>
      </section>

      <div className="enquiry-content">
        <ScrollReveal custom={0}>
          <div className="enquiry-form-card">
            <h2>Tell Us About Your Parents</h2>
            <p>Fill in the details below and our care team will reach out at your preferred time.</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name <span style={{color:'#e53e3e'}}>*</span></label>
                  <input type="text" id="name" name="name" placeholder="e.g. Ramesh Kumar" value={form.name} onChange={handleChange} className={errors.name ? "has-error" : ""} />
                  {errors.name && <p className="form-error-msg">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp <span style={{color:'#e53e3e'}}>*</span></label>
                  <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} className={errors.phone ? "has-error" : ""} />
                  {errors.phone && <p className="form-error-msg">{errors.phone}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address <span style={{color:'#e53e3e'}}>*</span></label>
                  <input type="email" id="email" name="email" placeholder="e.g. ramesh@example.com" value={form.email} onChange={handleChange} className={errors.email ? "has-error" : ""} />
                  {errors.email && <p className="form-error-msg">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="countryCity">Country / City <span style={{color:'#e53e3e'}}>*</span></label>
                  <input type="text" id="countryCity" name="countryCity" placeholder="e.g. Singapore / San Francisco" value={form.countryCity} onChange={handleChange} className={errors.countryCity ? "has-error" : ""} />
                  {errors.countryCity && <p className="form-error-msg">{errors.countryCity}</p>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="parentsArea">Which area of Chennai do your parents live in? <span className="optional">(Optional)</span></label>
                <input type="text" id="parentsArea" name="parentsArea" placeholder="e.g. Velachery, T. Nagar, Anna Nagar" value={form.parentsArea} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Best Time to Call You <span style={{color:'#e53e3e'}}>*</span></label>
                <div className={`radio-group ${errors.bestTimeToCall ? "has-error" : ""}`}>
                  {["Morning","Afternoon","Evening"].map(opt => (
                    <div className="radio-option" key={opt}>
                      <input type="radio" id={`time-${opt}`} name="bestTimeToCall" value={opt} checked={form.bestTimeToCall === opt} onChange={e => { setForm(prev => ({...prev, bestTimeToCall: e.target.value})); if(errors.bestTimeToCall) setErrors(p => ({...p, bestTimeToCall:""})); }} />
                      <label htmlFor={`time-${opt}`}>{opt}</label>
                    </div>
                  ))}
                </div>
                {errors.bestTimeToCall && <p className="form-error-msg">{errors.bestTimeToCall}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="biggestConcern">What is your biggest concern about your parents? <span className="optional">(Optional)</span></label>
                <textarea id="biggestConcern" name="biggestConcern" placeholder="e.g. They live alone and I worry about their health and safety..." value={form.biggestConcern} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>What are you looking for? <span className="optional">(Optional)</span></label>
                <div className="radio-group">
                  {[{v:"Full managed care",l:"Full Managed Care"},{v:"Occasional help",l:"Occasional Help"},{v:"Just exploring",l:"Just Exploring"}].map(o => (
                    <div className="radio-option" key={o.v}>
                      <input type="radio" id={`look-${o.v}`} name="lookingFor" value={o.v} checked={form.lookingFor === o.v} onChange={e => setForm(prev => ({...prev, lookingFor: e.target.value}))} />
                      <label htmlFor={`look-${o.v}`}>{o.l}</label>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className="form-submit-btn" disabled={isLoading}>
                {isLoading ? <><span className="loader"></span>Submitting...</> : "Request a Callback"}
              </button>
            </form>
          </div>
        </ScrollReveal>

        <div className="enquiry-info">
          <ScrollReveal custom={1}>
            <div className="info-card">
              <span className="info-card-badge">What Happens Next</span>
              <h3>A Simple 3-Step Process</h3>
              <div className="steps-list">
                <div className="step-item">
                  <div className="step-num">1</div>
                  <div className="step-text"><h4>We Call You</h4><p>Our care team calls you at your preferred time to understand your needs.</p></div>
                </div>
                <div className="step-item">
                  <div className="step-num">2</div>
                  <div className="step-text"><h4>We Understand</h4><p>We learn about your parents' health, daily routine, and what matters most to them.</p></div>
                </div>
                <div className="step-item">
                  <div className="step-num">3</div>
                  <div className="step-text"><h4>We Create a Plan</h4><p>A personalised care plan is designed — no pressure, no obligation.</p></div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal custom={2}>
            <div className="info-card">
              <span className="info-card-badge">Trusted by Families</span>
              <h3>Why NRIs &amp; Families Choose Us</h3>
              <div className="trust-list">
                <div className="trust-item"><div className="trust-icon">🛡️</div><p>Incubated at ITEL — trusted by families</p></div>
                <div className="trust-item"><div className="trust-icon">👨‍⚕️</div><p>21 comprehensive services in one plan</p></div>
                <div className="trust-item"><div className="trust-icon">📋</div><p>Dedicated care manager for your parents</p></div>
                <div className="trust-item"><div className="trust-icon">⏰</div><p>24/7 emergency support, always available</p></div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal custom={3}>
            <div className="whatsapp-card">
              <h3>Prefer WhatsApp?</h3>
              <p>Skip the form and chat with us directly. We respond within minutes.</p>
              <a href="https://wa.me/919499944939?text=Hi,%20I%20would%20like%20to%20enquire%20about%20care%20services%20for%20my%20parents." target="_blank" rel="noopener noreferrer" className="whatsapp-link">
                💬 Chat with Us Now
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
