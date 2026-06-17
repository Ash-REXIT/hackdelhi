import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import useMetaTags from "../hooks/useMetaTags";

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

function ScrollReveal({ children, custom = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      custom={custom}
      variants={fadeUpVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export default function ContactUs() {
  useMetaTags(
    'Contact Us | Get Help for Your Parents | 60 Plus India',
    'Have a question? Call or message us. We are here to help you find the best care and health services for your parents living in India.',
    'contact 60 plus india, help for parents, elder care support'
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,}$/.test(form.phone)) {
      errs.phone = "Enter a valid phone number";
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    setApiError("");
    try {
      const message = form.message.trim();
      const body = {
        name: form.name,
        email: form.email,
        phoneNumber: form.phone,
        ...(message ? { message } : {}),
      };
      const res = await fetch("https://mobile-api.nurahub.com/v1/marketing/60plusIndia/contactus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setApiError("Server error. Please try again later.");
        return;
      }
      const data = await res.json();
      if (data.status === "success" && data.data) {
        setSubmitted(true);
      } else {
        setApiError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSubmitted(false);
    setApiError("");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="contact-page">
      <Navbar alwaysWhite />

      <style>{`
        .contact-page {
          padding: 0;
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
          font-family: 'Nunito Sans', sans-serif;
          padding-top: 76px;
          min-height: 100vh;
        }


        .contact-hero {
          background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
          padding: 70px 20px 40px;
          text-align: center;
          position: relative;
          overflow: visible;
        }

        .contact-hero::after {
          content: "";
          position: absolute;
          bottom: -40px;
          left: 0;
          width: 100%;
          height: 80px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100' preserveAspectRatio='none'%3E%3Cpath d='M0,0 Q720,100 1440,0 L1440,0 L0,0 Z' fill='%23faf5ff'/%3E%3C/svg%3E");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          z-index: 0;
          pointer-events: none;
        }

        .contact-hero-inner {
          max-width: 700px;
          margin: auto;
          position: relative;
          z-index: 1;
        }

        .contact-hero h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 500;
          line-height: 1.2;
          margin-bottom: 16px;
          color: #1a0a2e;
        }

        .contact-hero p {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(26,10,46,0.7);
        }

        .contact-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 24px 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          position: relative;
          z-index: 1;
          align-items: stretch;
        }

        .contact-form-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.05);
          height: 100%; /* fill the grid cell height */
          display: flex;
          flex-direction: column;
          justify-content: center; /* center content vertically */
        }

       

        .contact-form-content {
          display: flex;
          flex-direction: column;
        }

        .contact-content > div:first-child {
          display: flex;
          flex-direction: column;
        }

        .contact-form-card {
          display: flex;
          flex-direction: column;
        }

        .contact-form-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .contact-form-card {
          display: flex;
          flex-direction: column;
        }

        .contact-form-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .contact-form-card h2 {
          font-family: "Gambarino", serif;
          font-size: 26px;
          font-weight: 500;
          color: #1a0a2e;
          margin-bottom: 8px;
        }

        .contact-form-card > p {
          font-size: 15px;
          color: rgba(26,10,46,0.65);
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #1a0a2e;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid rgba(26,10,46,0.1);
          border-radius: 14px;
          font-size: 15px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          background: #fafafa;
          transition: all 0.25s ease;
          box-sizing: border-box;
          outline: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #8235d0;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(130,53,208,0.1);
        }

        .form-group input.has-error,
        .form-group textarea.has-error {
          border-color: #e53e3e;
          background: #fff5f5;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-error-msg {
          font-size: 12px;
          color: #e53e3e;
          margin-top: 6px;
          font-weight: 600;
        }

        .form-submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          font-weight: 800;
          font-size: 16px;
          font-family: 'Nunito Sans', sans-serif;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        .form-submit-btn:hover {
          transform: translateY(-2px);
        }

        .form-success {
          text-align: center;
          padding: 40px 20px;
        }

        .form-success-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8235d0, #5f308e);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }

        .form-success-icon svg {
          width: 36px;
          height: 36px;
          fill: white;
        }

        .form-success h3 {
          font-family: "Gambarino", serif;
          font-size: 26px;
          color: #1a0a2e;
          margin-bottom: 12px;
        }

        .form-success p {
          font-size: 16px;
          color: rgba(26,10,46,0.65);
          line-height: 1.6;
        }

        .contact-info-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%;          /* fill the full grid cell height */
        }

        .info-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 28px 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          transition: all 0.3s ease;
          flex: 1;               /* each card takes equal share of height */
          justify-content: center; /* center content vertically within each card */
        }

        .contact-info-card > div {   /* targets the ScrollReveal motion.div children */
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .info-card-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .info-card-wrapper .info-card {
          flex: 1;
          justify-content: center;
        }

        .info-card:hover {
          box-shadow: 0 8px 28px rgba(130,53,208,0.1);
          transform: translateY(-4px);
        }

        .info-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8235d0, #5f308e);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-card-icon svg {
          width: 22px;
          height: 22px;
          fill: #fff;
        }

        .info-card h3 {
          font-family: "Gambarino", serif;
          font-size: 16px;
          font-weight: 500;
          color: #1a0a2e;
          margin: 0;
        }

        .info-card a {
          font-size: 14px;
          font-weight: 600;
          color: #8235d0;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .info-card a:hover {
          opacity: 0.7;
        }

        .info-card p {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(26,10,46,0.65);
          margin: 0;
        }

        .info-card .itel-inline {
          color: #8235d0;
          font-weight: 600;
          font-size: 12px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 48px;
          max-width: 480px;
          width: 90%;
          text-align: center;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          position: relative;
          animation: modalPop 0.3s ease-out;
          border: 1px solid rgba(0,0,0,0.08);
        }

        @keyframes modalPop {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
          border: 2px solid #1a0a2e;
        }

        .modal-icon svg {
          width: 32px;
          height: 32px;
          fill: #1a0a2e;
        }

        .modal-title {
          font-family: "Gambarino", serif;
          font-size: 28px;
          color: #1a0a2e;
          margin-bottom: 16px;
          font-weight: 500;
        }

        .modal-message {
          font-size: 16px;
          color: rgba(26,10,46,0.75);
          line-height: 1.7;
          margin-bottom: 32px;
          font-weight: 400;
        }

        .modal-button {
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(130, 53, 208, 0.25);
        }

        .modal-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(130, 53, 208, 0.35);
        }

        /* Loader Styles */
        .loader {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-right: 12px;
          vertical-align: middle;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 40px 16px 60px;
          }
          .contact-form-card {
            padding: 32px 24px;
          }
          .contact-breadcrumb {
            padding: 0 16px;
          }
          .contact-hero {
            padding: 50px 16px 30px;
          }
          .contact-hero h1 {
            font-size: 30px;
          }

          .modal-content {
            padding: 32px 24px;
            margin: 0 16px;
          }

          .info-block {
            padding: 28px 20px;  /* reduce from 40px */
          }

          .contact-info-card {
            flex-direction: column;
          }

          .info-card {
            flex-direction: column;
            gap: 10px;
            padding: 24px 20px;
          }

          .info-card-icon {
            width: 42px;
            height: 42px;
          }

          .info-card-icon svg {
            width: 18px;
            height: 18px;
          }
      `}</style>


      <Breadcrumb items={[{ label: "Contact Us" }]} />

      <section className="contact-hero">
        <div className="contact-hero-inner">
          <motion.h1
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            We would love to hear from you. Whether you have a question, need
            support, or want to learn more - we are just a message away.
          </motion.p>
        </div>
      </section>

      <div className="contact-content">
        <ScrollReveal custom={0}>
          <div className="contact-form-card">
            <div className="contact-form-content">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we will get back to you shortly.</p>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Ramesh Kumar"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? "has-error" : ""}
                  />
                  {errors.name && <p className="form-error-msg">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. ramesh@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? "has-error" : ""}
                  />
                  {errors.email && <p className="form-error-msg">{errors.email}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="e.g. +91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    className={errors.phone ? "has-error" : ""}
                  />
                  {errors.phone && <p className="form-error-msg">{errors.phone}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {apiError && <p className="form-error-msg" style={{ textAlign: "center" }}>{apiError}</p>}

                <button type="submit" className="form-submit-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="loader"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>

        {/* Success Modal Popup */}
        {submitted && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h3 className="modal-title">Message Sent!</h3>
              <p className="modal-message">
                Thank you for reaching out. Our team will get back to you within 24 hours.
              </p>
              <button className="modal-button" onClick={closeModal}>
                OK
              </button>
            </div>
          </div>
        )}

        <div className="contact-info-card">
          <ScrollReveal custom={1} className="info-card-wrapper">
            {/* PHONE */}
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <h3>Phone</h3>
              <a href="tel:+919499944939">+91 94999 44939</a>
            </div>
          </ScrollReveal>

          <ScrollReveal custom={2} className="info-card-wrapper">
            {/* EMAIL */}
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <h3>Email</h3>
              <a href="mailto:reach@nurahub.com">reach@nurahub.com</a>
            </div>
          </ScrollReveal>

          <ScrollReveal custom={3} className="info-card-wrapper">
            {/* ADDRESS */}
            <div className="info-card">
              <div className="info-card-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3>Office Address</h3>
              <p>
              Nura AI Labs (Incubated at ITEL), Plot No. 22, Rajalakshmi Nagar, 3rd Main Road, Velachery, Chennai – 600 042, Tamil Nadu, India.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}