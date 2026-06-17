import React, { useRef, useLayoutEffect, useState } from 'react';
import { useScene } from './SceneController';
import { submitLead } from '../../../lib/submitLead';

export default function AssessmentFormLayer() {
  const { timeline } = useScene();
  const formWrapperRef = useRef(null);
  const speechBubbleRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    if (!timeline || !formWrapperRef.current || !speechBubbleRef.current) return;

    // Scene 4 (75-85): Form begins entering subtly (opacity/translate)
    timeline.fromTo(formWrapperRef.current, 
      { opacity: 0, xPercent: -20 },
      { opacity: 0.3, xPercent: -10, duration: 10, ease: "power1.inOut" },
      75
    );

    // Scene 5 (85-90): Form fully visible on left, Speech bubble appears
    timeline.to(formWrapperRef.current, {
      opacity: 1,
      xPercent: 0,
      duration: 5,
      ease: "power2.out"
    }, 85);

    timeline.fromTo(speechBubbleRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 5, ease: "back.out(1.5)" },
      87
    );

  }, [timeline]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    try {
      await submitLead(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-layer pointer-events-auto">
      
      {/* Form on the left side */}
      <div ref={formWrapperRef} className="form-wrapper">
        {submitted ? (
          <div className="success-state">
            <h3>Thank You!</h3>
            <p>Our safety expert will contact you within 24 hours.</p>
          </div>
        ) : (
          <>
            <h2 className="form-headline">Protect Their Independence</h2>
            <p className="form-sub">Book a Home Safety Assessment and help your parents stay safe.</p>
            
            <form onSubmit={handleSubmit} className="assessment-form">
              <input 
                type="text" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                required
              />
              <button type="submit" className="submit-btn">Book Assessment</button>
            </form>
          </>
        )}
      </div>

      {/* Speech bubble on the right side near the character */}
      <div ref={speechBubbleRef} className="speech-bubble">
        "Safer with 60 Plus."
      </div>

      <style>{`
        .form-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none; /* Let scroll events pass through */
          display: flex;
          align-items: center;
          padding: 0 5%;
          z-index: 30; /* Ensure it is on top of CameraRig and ContentLayer */
        }

        .form-wrapper {
          pointer-events: auto; /* Enable clicks inside form */
          background: rgba(20, 10, 30, 0.85);
          backdrop-filter: blur(10px);
          padding: 2.5rem;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: 100%;
          max-width: 400px;
          opacity: 0;
          /* GSAP will handle transform */
        }

        .form-headline {
          font-family: 'Gambarino', serif;
          font-size: 2rem;
          color: #fff;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .form-sub {
          font-family: 'Outfit', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          font-size: 1rem;
          line-height: 1.5;
        }

        .assessment-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .assessment-form input {
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(0,0,0,0.5);
          color: #fff;
          font-family: 'Outfit', sans-serif;
        }

        .submit-btn {
          padding: 1rem;
          background: linear-gradient(135deg, #8235d0, #5c18a6);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
        }

        .success-state {
          text-align: center;
          color: #fff;
          font-family: 'Outfit', sans-serif;
        }

        .speech-bubble {
          position: absolute;
          right: 25%;
          bottom: 55%;
          background: #fff;
          color: #1a0a2e;
          padding: 1rem 1.5rem;
          border-radius: 20px;
          border-bottom-right-radius: 0;
          font-family: 'Gambarino', serif;
          font-size: 1.2rem;
          font-weight: 500;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          opacity: 0;
        }

        @media (max-width: 768px) {
          .form-layer {
            flex-direction: column;
            justify-content: center; /* Center to avoid mobile UI clipping at bottom */
            padding-bottom: 0;
            padding-top: 15dvh;
          }
          .form-wrapper {
            margin: 0 auto;
          }
          .speech-bubble {
            right: 10%;
            bottom: 35%; /* Adjust for new layout */
          }
        }
      `}</style>
    </div>
  );
}
