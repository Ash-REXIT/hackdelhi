import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useAutoDetect from '../../hooks/useAutoDetect';

/**
 * StoryForm — CTA form for requesting a safety assessment.
 * Reuses useAutoDetect for country/dial code detection.
 * CTA text: "Request Safety Assessment" (NOT "Book Free Assessment")
 */
export default function StoryForm({ visible = false }) {
  const { detecting, detected } = useAutoDetect();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    parentAddress: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="story-form story-form--success"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="story-form__success-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="#2ecc71" strokeWidth="2" fill="#e8f5e9" />
            <path d="M16 24 L22 30 L34 18" stroke="#2ecc71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="story-form__success-title">Thank You</h3>
        <p className="story-form__success-text">
          We've received your request. Our team will reach out to schedule the assessment.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="story-form"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <h3 className="story-form__heading">Protect Their Independence</h3>
      <p className="story-form__subheading">
        Ensure your parents are safe by booking a Home Safety Assessment from 60 Plus.
      </p>

      <form onSubmit={handleSubmit} className="story-form__form">
        <div className="story-form__field">
          <label className="story-form__label" htmlFor="story-name">Name</label>
          <input
            id="story-name"
            name="name"
            type="text"
            className="story-form__input"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="story-form__field">
          <label className="story-form__label" htmlFor="story-phone">Phone</label>
          <input
            id="story-phone"
            name="phone"
            type="tel"
            className="story-form__input"
            placeholder={detecting ? 'Detecting...' : `${detected.dialCode} XXXXX XXXXX`}
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="story-form__field">
          <label className="story-form__label" htmlFor="story-email">Email</label>
          <input
            id="story-email"
            name="email"
            type="email"
            className="story-form__input"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="story-form__field">
          <label className="story-form__label" htmlFor="story-country">Country</label>
          <input
            id="story-country"
            name="country"
            type="text"
            className="story-form__input"
            placeholder={detecting ? 'Detecting...' : (detected.countryCity || 'India')}
            value={form.country}
            onChange={handleChange}
          />
        </div>

        <div className="story-form__field">
          <label className="story-form__label" htmlFor="story-address">Parent's Address in Chennai</label>
          <textarea
            id="story-address"
            name="parentAddress"
            className="story-form__input story-form__textarea"
            placeholder="Full address where your parents reside"
            value={form.parentAddress}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        <button
          type="submit"
          className="story-form__submit"
          disabled={submitting}
        >
          {submitting ? (
            <span className="story-form__submit-loading">Submitting...</span>
          ) : (
            'Request Safety Assessment'
          )}
        </button>
      </form>

      <style>{`
        .story-form {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          padding: 2.5rem;
          max-width: 480px;
          margin: 0 auto;
          box-shadow: 0 8px 40px rgba(130, 53, 208, 0.08);
          border: 1px solid rgba(130, 53, 208, 0.06);
        }
        .story-form__heading {
          font-family: 'Gambarino', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a0a2e;
          text-align: center;
          margin-bottom: 0.5rem;
        }
        .story-form__subheading {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.95rem;
          color: rgba(26, 10, 46, 0.6);
          text-align: center;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .story-form__form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .story-form__field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .story-form__label {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(26, 10, 46, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .story-form__input {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.95rem;
          padding: 0.85rem 1rem;
          border: 2px solid rgba(26, 10, 46, 0.08);
          border-radius: 14px;
          background: #faf8f5;
          color: #1a0a2e;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .story-form__input:focus {
          border-color: #8235d0;
          box-shadow: 0 0 0 4px rgba(130, 53, 208, 0.1);
        }
        .story-form__input::placeholder {
          color: rgba(26, 10, 46, 0.3);
        }
        .story-form__textarea {
          resize: vertical;
          min-height: 80px;
        }
        .story-form__submit {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          padding: 1rem 2rem;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(130, 53, 208, 0.25);
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 0.5rem;
        }
        .story-form__submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 28px rgba(130, 53, 208, 0.35);
        }
        .story-form__submit:active {
          transform: translateY(0);
        }
        .story-form__submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .story-form__submit-loading {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .story-form--success {
          text-align: center;
          padding: 3rem 2rem;
        }
        .story-form__success-icon {
          margin-bottom: 1rem;
        }
        .story-form__success-title {
          font-family: 'Gambarino', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a0a2e;
          margin-bottom: 0.5rem;
        }
        .story-form__success-text {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.95rem;
          color: rgba(26, 10, 46, 0.6);
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .story-form {
            padding: 1.5rem;
            border-radius: 20px;
          }
          .story-form__heading {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </motion.div>
  );
}
