import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getWhatsAppUrl } from "../data/whatsappMessages";
import {
  Stethoscope, PhoneCall, Users, Home, HeartPulse, ShieldCheck,
  FileText, Bell, MessageCircle, Globe, Ear, Pill, Shield,
  Briefcase, Plane, Apple, Zap, Gift, TestTube, Calendar, Activity,
  ChevronRight, CheckCircle2
} from "lucide-react";

const ALL_SERVICES = [
  { slug: "monthly-doctor-visit", cat: "Healthcare & Medical", name: "Monthly Doctor Visit", description: "Regular monthly visits from qualified doctors to monitor your parent's health and address any medical concerns." },
  { slug: "24-7-emergency-call", cat: "Daily Support & Monitoring", name: "24/7 Emergency Call", description: "Round-the-clock emergency support with immediate response when your parents need urgent assistance." },
  { slug: "24-7-companion", cat: "Daily Support & Monitoring", name: "24/7 Companion", description: "Personalized companion services to provide emotional support and assistance with daily activities." },
  { slug: "monthly-care-executive-visit", cat: "Home Care & Safety", name: "Monthly Care Executive Visit", description: "Professional care executive visits to assess living conditions and provide recommendations for safety and comfort." },
  { slug: "integrated-senior-health-index", cat: "Healthcare & Medical", name: "Integrated Senior Health Index", description: "Comprehensive health assessment using our proprietary index to track and improve overall wellness." },
  { slug: "senior-home-safety-assessment", cat: "Home Care & Safety", name: "Senior Home Safety Assessment", description: "Detailed evaluation of home safety to identify potential hazards and recommend improvements." },
  { slug: "digitalization-of-medical-records", cat: "Digital & Records", name: "Digitalization of Medical Records", description: "Secure digitization and organization of medical records for easy access and sharing with healthcare providers." },
  { slug: "voice-reminder-for-parents", cat: "Daily Support & Monitoring", name: "Voice Reminder for Parents", description: "Customizable voice reminders for medications, appointments, and daily tasks to maintain routine." },
  { slug: "daily-updates-to-children", cat: "Daily Support & Monitoring", name: "Daily Updates to Children", description: "Regular updates sent to children about their parents' wellbeing and daily activities." },
  { slug: "free-online-community", cat: "Digital & Records", name: "Free Online Community", description: "Access to our supportive online community where seniors can connect and share experiences." },
  { slug: "audiologist-home-visit", cat: "Healthcare & Medical", name: "Audiologist Home Visit", description: "Specialized hearing assessments and consultations conducted in the comfort of home." },
  { slug: "medicine-delivery", cat: "Daily Support & Monitoring", name: "Medicine Delivery", description: "Reliable medicine delivery service to ensure timely access to prescribed medications." },
  { slug: "senior-citizen-insurance-assessment", cat: "Healthcare & Medical", name: "Senior Citizen Insurance Assessment", description: "Expert evaluation and recommendations for insurance coverage tailored to senior needs." },
  { slug: "velai-consultation", cat: "Lifestyle & Wellness", name: "Velai Consultation", description: "Career and lifestyle consultation services for seniors looking to explore new opportunities." },
  { slug: "trip-consultation", cat: "Lifestyle & Wellness", name: "Trip Consultation", description: "Specialized travel planning and consultation for safe and enjoyable trips for seniors." },
  { slug: "nutrition-consultation", cat: "Lifestyle & Wellness", name: "Nutrition Consultation", description: "Personalized nutrition advice and meal planning tailored to senior health needs." },
  { slug: "on-demand-services", cat: "Daily Support & Monitoring", name: "On Demand Services", description: "Flexible support services available whenever needed for various daily tasks and requirements." },
  { slug: "complimentary-products", cat: "Extras & Benefits", name: "Complimentary Products", description: "Quality products provided complimentary to enhance daily life and comfort." },
  { slug: "blood-test", cat: "Healthcare & Medical", name: "Blood Test", description: "Convenient at-home blood testing services with professional sample collection and analysis." },
  { slug: "offline-events", cat: "Extras & Benefits", name: "Offline Events", description: "Engaging offline events and activities to promote social interaction and community involvement." },
  { slug: "gait-analysis", cat: "Home Care & Safety", name: "Gait Analysis", description: "Professional assessment of walking patterns to identify fall risks and recommend preventive measures." },
];

const iconMap = {
  "Monthly Doctor Visit": <Stethoscope size={20} />,
  "24/7 Emergency Call": <PhoneCall size={20} />,
  "24/7 Companion": <Users size={20} />,
  "Monthly Care Executive Visit": <Home size={20} />,
  "Integrated Senior Health Index": <HeartPulse size={20} />,
  "Senior Home Safety Assessment": <ShieldCheck size={20} />,
  "Digitalization of Medical Records": <FileText size={20} />,
  "Voice Reminder for Parents": <Bell size={20} />,
  "Daily Updates to Children": <MessageCircle size={20} />,
  "Free Online Community": <Globe size={20} />,
  "Audiologist Home Visit": <Ear size={20} />,
  "Medicine Delivery": <Pill size={20} />,
  "Senior Citizen Insurance Assessment": <Shield size={20} />,
  "Velai Consultation": <Briefcase size={20} />,
  "Trip Consultation": <Plane size={20} />,
  "Nutrition Consultation": <Apple size={20} />,
  "On Demand Services": <Zap size={20} />,
  "Complimentary Products": <Gift size={20} />,
  "Blood Test": <TestTube size={20} />,
  "Offline Events": <Calendar size={20} />,
  "Gait Analysis": <Activity size={20} />,
};

// ─── Infinite Marquee Row ────────────────────────────────────────────────────
function MarqueeRow({ items, direction = "left", speed = 40, globalIndex }) {
  const trackRef = useRef(null);
  const animFrameRef = useRef(null);
  const posRef = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const isPausedRef = useRef(false);
  const singleSetWidthRef = useRef(0);
  const navigate = useNavigate();

  const SETS = 4;
  const repeated = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const raf = requestAnimationFrame(() => {
      singleSetWidthRef.current = track.scrollWidth / SETS;
      posRef.current = singleSetWidthRef.current;

      const animate = () => {
        if (!isPausedRef.current) {
          const delta = direction === "left" ? -speed / 75 : speed / 75;
          posRef.current += delta;

          const sw = singleSetWidthRef.current;
          if (posRef.current <= 0) posRef.current += sw;
          if (posRef.current >= sw * 2) posRef.current -= sw;

          track.style.transform = `translateX(${-posRef.current}px)`;
        }
        animFrameRef.current = requestAnimationFrame(animate);
      };

      animFrameRef.current = requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [direction, speed]);

  const onMouseEnter = () => { if (!isDragging.current) isPausedRef.current = true; };
  const onMouseLeave = () => { isDragging.current = false; isPausedRef.current = false; };

  const onPointerDown = (e) => {
    isDragging.current = true;
    isPausedRef.current = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    singleSetWidthRef.current = trackRef.current ? trackRef.current.scrollWidth / SETS : singleSetWidthRef.current;
    trackRef.current?.parentElement?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const delta = dragStartX.current - e.clientX;
    const track = trackRef.current;
    if (!track) return;
    const sw = singleSetWidthRef.current;
    let next = dragStartPos.current + delta;
    if (next <= 0) next += sw;
    if (next >= sw * 2) next -= sw;
    posRef.current = next;
    track.style.transform = `translateX(${-next}px)`;
  };

  const onPointerUp = () => { isDragging.current = false; isPausedRef.current = true; };

  const onTouchStart = (e) => {
    isDragging.current = true;
    isPausedRef.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartPos.current = posRef.current;
    singleSetWidthRef.current = trackRef.current ? trackRef.current.scrollWidth / SETS : singleSetWidthRef.current;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const delta = dragStartX.current - e.touches[0].clientX;
    const track = trackRef.current;
    if (!track) return;
    const sw = singleSetWidthRef.current;
    let next = dragStartPos.current + delta;
    if (next <= 0) next += sw;
    if (next >= sw * 2) next -= sw;
    posRef.current = next;
    track.style.transform = `translateX(${-next}px)`;
  };

  const onTouchEnd = () => { isDragging.current = false; isPausedRef.current = false; };

  return (
    <div
      className="marquee-mask"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ cursor: "grab", userSelect: "none", overflow: "hidden", position: "relative", touchAction: "pan-y" }}
    >
      <div className="marquee-edge-fade" />
      <div ref={trackRef} className="marquee-track" style={{ willChange: "transform" }}>
        {repeated.map((s, i) => {
          const originalIndex = i % items.length;
          const cardNum = globalIndex * 7 + originalIndex + 1;
          return (
            <div className="marquee-card" key={`${globalIndex}-${i}`}>
              <div className="top-row">
                <span className="num">{String(cardNum).padStart(2, "0")}</span>
                <span className="icon">{iconMap[s.name]}</span>
              </div>
              <div className="name">{s.name}</div>
              <button
                className="link"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => navigate(`/services/${s.slug}`)}
                aria-label={`Learn more about ${s.name}`}
              >
                Learn more →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Services() {
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.mobile.trim()) {
      alert('Please fill in both name and mobile number');
      return;
    }
    const mobileRegex = /^[0-9]{10,15}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert('Please enter a valid mobile number');
      return;
    }
    setFormSubmitted(true);
  };

  const handleClosePopup = () => {
    setShowSubscribeForm(false);
    setFormSubmitted(false);
    setFormData({ name: '', mobile: '' });
  };

  const rows = [
    ALL_SERVICES.slice(0, 7),
    ALL_SERVICES.slice(7, 14),
    ALL_SERVICES.slice(14, 21),
  ];

  return (
    <section className="services" id="services">
      <style>{`
        .services {
          position: relative;
          background: linear-gradient(180deg, #ffffff 0%, #faf7ff 50%, #f3ecff 100%);
          padding: 120px 0 60px;
          font-family: 'Nunito Sans', sans-serif;
          color: #1a0a2e;
          overflow: hidden;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

        /* ── HEAD LAYOUT ── */
        .services-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 80px;
          align-items: flex-start;
        }

        .tag {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #8235d0;
          margin-bottom: 24px;
          display: inline-block;
          text-transform: uppercase;
        }

        .services h2 {
          font-family: "Gambarino", serif !important;
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 500;
          line-height: 1.15;
          margin-bottom: 32px;
          color: #1a0a2e;
        }

        /* ── TWO-LINE EQUAL PRICING ── */
        .combined-pricing-block {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .joining-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(26, 10, 46, 0.5);
          margin-right: 8px;
        }

        .pricing-main-line.equal-flow {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .price-flow {
          display: flex;
          align-items: baseline;
          gap: 12px;
          font-family: 'Gambarino', serif;
        }

        .price-old,
        .price-new {
          font-size: 64px;
          font-weight: 600;
          letter-spacing: -2px;
          color: #1a0a2e;
        }

        .price-old {
          text-decoration: line-through;
          text-decoration-thickness: 3px;
          color: rgba(26, 10, 46, 0.55);
        }

        .flow-arrow {
          font-size: 32px;
          color: rgba(26, 10, 46, 0.3);
          transform: translateY(-6px);
          animation: pulseArrow 2s ease-in-out infinite;
        }

        @keyframes pulseArrow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .p-mo {
          font-size: 18px;
          font-weight: 600;
          color: rgba(26, 10, 46, 0.4);
          margin-left: 4px;
        }

        .save-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid rgba(130, 53, 208, 0.25);
          background: rgba(130, 53, 208, 0.04);
          line-height: 1;
          margin-left: 8px;
        }

        .badge-top {
          font-size: 12px;
          font-weight: 800;
          color: #8235d0;
        }

        .badge-bottom {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.8px;
          color: rgba(130, 53, 208, 0.7);
        }

        .meta-info-inline {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(26, 10, 46, 0.65);
        }

        .meta-item.highlight {
          color: #1a0a2e;
          font-weight: 600;
        }

        .meta-dot {
          margin: 0 6px;
          color: rgba(26, 10, 46, 0.25);
        }

        .meta-date {
          color: #1a0a2e;
          font-weight: 700;
        }

        /* ── LEFT COLUMN ── */
        .left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* ── RIGHT COLUMN ── */
        .right-col {
          padding-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .right-col p {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(26,10,46,0.7);
          margin-bottom: 24px;
          max-width: 480px;
        }

        /* CTA pushed to the right column, bottom-aligned */
        .right-col-cta {
          margin-top: auto;
          padding-top: 12px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 44px;
          border-radius: 50px;
          background: linear-gradient(94deg, #8235d0, #5f308e);
          color: white;
          text-decoration: none;
          font-weight: 800;
          font-size: 16px;
          font-family: 'Nunito Sans', sans-serif;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(130, 53, 208, 0.15);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(130, 53, 208, 0.25);
        }

        /* ── MARQUEE ── */
        .marquee-full { width: 100%; overflow: hidden; padding: 0; background: #faf7ff; }
        .marquee-wrapper { display: flex; flex-direction: column; gap: 24px; width: 100%; padding-top: 20px; }

        .marquee-card { width: 220px; height: 180px; flex-shrink: 0; background: #ffffff; border-radius: 18px; padding: 20px; color: inherit; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 20px rgba(0,0,0,0.02); transition: all 0.3s cubic-bezier(0.2,0,0,1); }
        .marquee-card:hover { transform: translateY(-8px); border-color: rgba(130,53,208,0.2); box-shadow: 0 20px 40px rgba(130,53,208,0.08); }

        .top-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
        .num { font-size: 14px; font-weight: 800; color: #8235d0; opacity: 0.7; }
        .icon { color: #8235d0; display: flex; align-items: center; justify-content: center; }
        .name { font-family: "Gambarino", serif !important; font-size: 20px; line-height: 1.3; margin-bottom: 16px; color: #1a0a2e; }

        .link { color: #8235d0; font-weight: 700; text-decoration: none; font-size: 14px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; background: none; border: none; padding: 0; outline: none; }
        .link:hover { text-decoration: underline; }

        /* ── CTA SCROLL ── */
        .services-cta-scroll { margin-top: 60px; overflow: hidden; display: flex; align-items: center; gap: 40px; }

        .cta-marquee { position: relative; overflow: hidden; flex: 1; }
        .cta-marquee::before, .cta-marquee::after { content: ""; position: absolute; top: 0; width: 80px; height: 100%; z-index: 2; pointer-events: none; }
        .cta-marquee::before { left: 0; background: linear-gradient(to right, #f3ecff, transparent); }
        .cta-marquee::after { right: 0; background: linear-gradient(to left, #f3ecff, transparent); }
        .cta-marquee:hover .cta-track { animation-play-state: paused; }
        .cta-track { display: flex; gap: 80px; width: max-content; animation: cta-scroll 22s linear infinite; }
        .cta-track span { font-size: 17px; font-weight: 500; color: rgba(26,10,46,0.7); white-space: nowrap; }
        .cta-track span:not(:last-child)::after { content: ""; width: 6px; height: 6px; background: rgba(130,53,208,0.3); border-radius: 50%; display: inline-block; margin: 0 18px; vertical-align: middle; }
        @keyframes cta-scroll { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }

        .cta-btn-wrap { flex-shrink: 0; }
        .cta-btn { display: inline-block; padding: 16px 44px; border-radius: 50px; background: linear-gradient(94deg, #8235d0, #5f308e); color: #fff; font-weight: 700; font-family: 'Nunito Sans', sans-serif; text-decoration: none; transition: all 0.25s ease; border: none; cursor: pointer; white-space: nowrap; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(130, 53, 208, 0.2); }

        /* ── MARQUEE EDGE FADE ── */
        .marquee-edge-fade {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(to right, #faf7ff 0%, transparent 80px, transparent calc(100% - 80px), #faf7ff 100%);
        }

        .marquee-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding-left: 40px;
          padding-right: 40px;
        }

        /* ── RESPONSIVE ── */
        @media(max-width:900px) {
          .services-head { grid-template-columns: 1fr; gap: 32px; margin-bottom: 40px; }
          .services { padding: 60px 0 40px; }
          .container { padding: 0 20px; }

          .services h2 { font-size: clamp(28px, 7vw, 36px); margin-bottom: 20px; }

          .pricing-main-line.equal-flow { flex-wrap: wrap; gap: 12px; }
          .price-old, .price-new { font-size: 48px; }
          .flow-arrow { font-size: 24px; }
          .meta-info-inline { width: 100%; }

          .btn-primary { padding: 14px 32px; font-size: 15px; }

          .right-col p { font-size: 15px; line-height: 1.7; margin-bottom: 16px; max-width: 100%; }

          .marquee-card { width: 180px; height: 160px; padding: 16px; }
          .name { font-size: 17px; }

          .marquee-edge-fade { display: none; }

          .marquee-track { padding-left: 8px; padding-right: 8px; gap: 12px; }

          .marquee-wrapper { gap: 16px; }

          .services-cta-scroll { margin-top: 40px; flex-direction: column; align-items: stretch; gap: 16px; }
          .cta-btn-wrap { text-align: center; }
          .cta-btn { padding: 14px 32px; font-size: 15px; }
        }

        @media(max-width: 480px) {
          .services h2 { font-size: 26px; }
          .pricing-main-line.equal-flow { flex-direction: column; align-items: flex-start; gap: 12px; }
          .price-old, .price-new { font-size: 40px; }
          .flow-arrow { font-size: 20px; }
          .meta-info-inline { flex-direction: column; align-items: flex-start; gap: 8px; }
          .meta-dot { display: none; }
          .marquee-card { width: 160px; height: 155px; padding: 14px; }
          .name { font-size: 15px; }
        }

        /* ── SUBSCRIPTION POPUP ── */
        .popup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
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
          top: 12px; right: 12px;
          width: 32px; height: 32px;
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
        .popup-close:hover { background: #8235d0; color: white; }

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

        .form-group { margin-bottom: 20px; position: relative; }

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

        .form-group input::placeholder { color: rgba(26,10,46,0.4); }

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

        .form-actions { display: flex; gap: 12px; margin-top: 4px; }

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

        .submit-btn { background: linear-gradient(94deg, #8235d0, #5f308e); color: white; }
        .submit-btn:hover { background: linear-gradient(94deg, #7a2bc4, #562aa0); }

        .cancel-btn { background: #f8f5ff; color: #8235d0; border: 2px solid rgba(130, 53, 208, 0.2); }
        .cancel-btn:hover { background: #f0e6ff; }

        .success-content { text-align: center; padding-top: 6px; }

        .success-content .success-icon {
          width: 50px; height: 50px;
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

        .whatsapp-support { margin: 24px 0; }

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
        .whatsapp-btn:hover { background: #128C7E; }

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
        .close-btn:hover { background: #7a2bc4; }

        @media (max-width: 768px) {
          .popup-content { margin: 20px; padding: 28px 20px; }
          .form-actions { flex-direction: column; }
          .whatsapp-btn { width: 100%; }
        }
      `}</style>

      <div className="container">
        <motion.div
          className="services-head"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* LEFT - tag + heading + pricing */}
          <div className="left-col">
            <span className="tag">OUR SERVICES</span>
            <h2>Complete care for your parents, designed for peace of mind.</h2>

            {/* ── Two-Line Premium Pricing ── */}
            <div className="combined-pricing-block">
              <div className="pricing-main-line equal-flow">
                <div className="price-flow">
                  <span className="price-old">$200</span>
                  <span className="flow-arrow">→</span>
                  <span className="price-new">$100</span>
                  <span className="p-mo">/month</span>
                </div>

                <span className="save-badge">
                  <span className="badge-top">50% OFF</span>
                  <span className="badge-bottom">JOINING OFFER</span>
                </span>
              </div>

              <div className="meta-info-inline">
                <span className="meta-item highlight">
                  + Accessories included
                </span>

                <span className="meta-dot">•</span>

                <span className="meta-item">
                  Valid until <strong className="meta-date">May 15</strong>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT - description + CTA */}
          <div className="right-col">
            <p>Your trusted companion for elderly care in Tamil Nadu. We provide personalised support ensuring your parents' well-being while you're away.</p>
            <p>From regular health check-ups and home safety to daily monitoring and emergency support, every aspect of care is managed by our experienced team.</p>
            <p>A complete system of <strong>21 carefully designed services</strong>, covering healthcare, safety, and daily support.</p>

            <div className="right-col-cta">
              <button onClick={() => navigate('/subscription#pricing')} className="btn-primary">
                Subscribe Now →
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FULL WIDTH MARQUEE */}
      <div className="marquee-full" id="services-cards">
        <div className="marquee-wrapper">
          {rows.map((row, rowIndex) => (
            <MarqueeRow
              key={rowIndex}
              items={row}
              direction={rowIndex % 2 === 0 ? "left" : "right"}
              speed={rowIndex === 1 ? 4 : 5}
              globalIndex={rowIndex}
            />
          ))}
        </div>
      </div>

      {/* CTA ROW - scrolling text left, button right */}
      <div className="container">
        <div className="services-cta-scroll">
          <div className="cta-marquee">
            <div className="cta-track">
              {[...Array(3)].map((_, i) => [
                <span key={`serv-${i}`}>21 essential services</span>,
                <span key={`care-${i}`}>Complete care system</span>,
                <span key={`health-${i}`}>Health &amp; safety</span>,
                <span key={`daily-${i}`}>Daily support &amp; monitoring</span>,
                <span key={`indepen-${i}`}>Independence for your parents</span>
              ])}
            </div>
          </div>
          <div className="cta-btn-wrap">
            <button onClick={() => navigate('/subscription#pricing')} className="cta-btn">Subscribe Now</button>
          </div>
        </div>
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