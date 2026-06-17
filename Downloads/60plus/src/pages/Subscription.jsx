import { motion, useInView, useAnimation } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Breadcrumb from "../components/Breadcrumb";
import { getWhatsAppUrl } from "../data/whatsappMessages";
import { useState, useEffect, useRef } from "react";
import { ALL_SERVICES } from "./ServiceDetail";
import useMetaTags from "../hooks/useMetaTags";

import {
  Stethoscope, Phone, Users, Home, HeartPulse, ShieldCheck,
  FileText, Bell, MessageCircle, Globe, Ear, Pill, Shield,
  Briefcase, Plane, Apple, Zap, Gift, TestTube, Calendar,
  Activity, Car
} from "lucide-react";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const fadeInVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
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

export default function Subscription() {
  useMetaTags(
    'Premium Elder Care Services for NRIs in India | 60Plus India',
    'Give your parents in India the care they deserve from anywhere in the world. 60Plus Global\'s Premium Plan includes 21 services, 24/7 emergency support, and monthly doctor visits for $2400/year. Trusted by global families.',
    'premium elder care India, NRI parent care services, 60Plus Global subscription, senior care plans for NRIs, elderly care ecosystem India, professional parent care from abroad, annual senior care membership, geriatric care management India, 24/7 emergency support for parents India, monthly doctor home visits, senior health index India, home safety assessment for seniors, managed elderly care services'
  );

  useEffect(() => {
    const scriptId = 'subscription-jsonld';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "60Plus Premium Plan",
      "image": "https://www.60plusindia.com/logo/60_plus_india.png",
      "description": "A complete elder care ecosystem for parents in India, featuring 21 premium services including monthly doctor visits, 24/7 emergency support, and a dedicated care manager.",
      "brand": { "@type": "Brand", "name": "60Plus India" },
      "offers": {
        "@type": "Offer",
        "url": "https://www.60plusindia.com/subscription",
        "priceCurrency": "USD",
        "price": "1200.00",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "description": "Annual membership exclusive of GST"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "50000"
      }
    });
    document.head.appendChild(script);
    return () => { document.getElementById(scriptId)?.remove(); };
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.hash === '#pricing') {
      setTimeout(() => {
        const el = document.getElementById('pricing');
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [location.hash]);

  const [showAll, setShowAll] = useState(false);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const leftImgRef = useRef(null);
  const rightImgRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  const handleClosePopup = () => setShowSubscribeForm(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const move = window.scrollY * 0.12;
        if (leftImgRef.current)  leftImgRef.current.style.transform  = `rotate(-4deg) translateY(${move}px)`;
        if (rightImgRef.current) rightImgRef.current.style.transform = `rotate(4deg) translateY(${move}px)`;
        if (leftTextRef.current)  leftTextRef.current.style.transform  = `translateY(${move}px)`;
        if (rightTextRef.current) rightTextRef.current.style.transform = `translateY(${move}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = ALL_SERVICES;

  return (
    <section className="subscription">
      <Navbar alwaysWhite />
      <Breadcrumb items={[{ label: "Subscription" }]} />
      <style>{`
        body {
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
        }

        .subscription {
          padding: 0;
          background: linear-gradient(180deg, #ffffff 0%, #f6f2ff 100%);
          font-family: 'Nunito Sans', sans-serif;
          padding-top: 76px;
        }

        /* ── HERO ── */
        .sub-hero {
          padding: 70px 20px 100px;
          text-align: center;
          background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
          position: relative;
          overflow: visible;
        }

        .sub-hero-inner {
          max-width: 900px;
          margin: auto;
        }

        .sub-hero h1 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 5vw, 56px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
          color: #1a0a2e;
        }

        .sub-hero p {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(26,10,46,0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* ── HERO VISUAL ── */
        .hero-visual-wrapper {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          gap: 48px;
          max-width: 1200px;
          margin: -40px auto 80px;
          padding: 0 40px;
          position: relative;
          z-index: 2;
        }

        .hero-visual-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 700px 400px at center, rgba(130,53,208,0.10), transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Side columns ── */
        .side-col {
          width: 190px;
          flex-shrink: 0;
          position: relative;
          height: 330px;
          z-index: 1;
        }

        .side-img-main {
          position: absolute;
          width: 170px;
          height: 230px;
          object-fit: cover;
          border-radius: 20px;
          opacity: 0.95;
          filter: contrast(1.05) saturate(1.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          transform-origin: center;
          z-index: 2;
          top: 0;
        }

        .side-img-back {
          position: absolute;
          width: 150px;
          height: 210px;
          object-fit: cover;
          border-radius: 20px;
          opacity: 0.45;
          box-shadow: 0 12px 28px rgba(0,0,0,0.10);
          z-index: 1;
          top: 20px;
        }

        .side-col-left .side-img-main  { right: 0;    transform: rotate(-4deg); }
        .side-col-left .side-img-back  { right: -14px; transform: rotate(6deg);  }
        .side-col-right .side-img-main { left: 0;     transform: rotate(4deg);  }
        .side-col-right .side-img-back { left: -14px;  transform: rotate(-6deg); }

        .side-label {
          position: absolute;
          top: 252px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 3;
          white-space: nowrap;
        }

        .side-col-left .side-label  { right: 0; }
        .side-col-right .side-label { left: 0;  }

        .side-label .icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #8235d0;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .side-label strong {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.2px;
          color: #1a0a2e;
          display: block;
        }

        .side-label p {
          margin: 0;
          font-size: 12px;
          color: rgba(26,10,46,0.65);
          font-weight: 600;
        }

        /* ────────────────────────────
           MATURE PREMIUM PRICING CARD
        ──────────────────────────── */
        .pricing-card-premium {
          flex: 0 0 520px;
          max-width: 520px;
          background: #ffffff;
          border-radius: 32px;
          padding: 64px 48px 48px;
          text-align: center;
          box-shadow: 0 40px 100px rgba(26, 10, 46, 0.06), 0 10px 30px rgba(26, 10, 46, 0.04);
          position: relative;
          z-index: 2;
          overflow: hidden;
          border: 1px solid rgba(130, 53, 208, 0.1);
          backdrop-filter: blur(6px);
        }

        /* Ribbon: Sleeker, Professional Gold */
        .premium-ribbon {
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 200px;
          overflow: hidden;
          z-index: 5;
        }

        .premium-ribbon span {
          position: absolute;
          width: 280px;
          padding: 10px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            45deg,
            #caa63d 0%,
            #f7e58a 20%,
            #e0c15a 40%,
            #fff2a6 50%,
            #e0c15a 60%,
            #b8962e 80%,
            #f7e58a 100%
          );
          color: #1a0a2e;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          text-align: center;
          right: -70px;
          top: 45px;
          transform: rotate(45deg);
          white-space: nowrap;
        }

        .premium-ribbon span::after {
          content: "";
          position: absolute;
          top: 0;
          left: -40%;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255,255,255,0.6),
            transparent
          );
          transform: skewX(-20deg);
          pointer-events: none;
        }

        .card-header { margin-bottom: 32px; }

        .status-badge {
          display: inline-block;
          background: linear-gradient(135deg, #8235d0, #6d28d9);
          color: #fff;
          padding: 6px 16px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .plan-main {
          font-family: "Gambarino", serif;
          font-size: 34px;
          font-weight: 500;
          color: #1a0a2e;
          margin: 10px 0 0;
          letter-spacing: -0.4px;
        }

        .plan-sub {
          font-size: 15px;
          color: rgba(26,10,46,0.5);
          font-weight: 600;
        }

        .annual-sub {
          display: none;
        }

        .limited-offer {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(26, 10, 46, 0.55);

  margin-top: 20px;   /* ↓ reduced from 20px */
}

        /* ── PRICE STACK ── */
        .price-section {
          margin: 16px 0 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .price-flow {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 18px;
          margin: 18px 0 10px;
        }

        .price-old {
          font-family: "Gambarino", serif;
          font-size: 54px;
          font-weight: 500;
          color: rgba(26, 10, 46, 0.7);
          position: relative;
          letter-spacing: -2px;
          line-height: 1;
        }

        .price-old::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 52%;
          height: 2px;
          background: rgba(26, 10, 46, 0.6);
        }

        .price-arrow {
          font-size: 22px;
          color: rgba(26, 10, 46, 0.4);
        }

        .price-new {
          display: flex;
          align-items: baseline;
          justify-content: center;
          color: #1a0a2e;
        }

        .price-new .currency {
          font-family: "Gambarino", serif;
          font-size: 32px;
          margin-right: 4px;
          font-weight: 400;
        }

        .price-new .amount {
          font-family: "Gambarino", serif;
          font-size: 80px;
          font-weight: 500;
          letter-spacing: -3px;
          line-height: 1;
        }

        .price-new .period {
          font-size: 18px;
          color: rgba(26, 10, 46, 0.5);
          margin-left: 8px;
          font-weight: 600;
        }

        .price-subtext {
          font-size: 14px;
          color: rgba(26, 10, 46, 0.6);
          margin-top: 10px;
          font-weight: 600;
          text-align: center;
        }

        .neat-divider {
          border: none;
          border-top: 1px solid rgba(26, 10, 46, 0.08);
          margin: 32px 0;
        }

        /* Features */
        .premium-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
          list-style: none;
          padding: 0;
          margin: 0 0 40px;
          text-align: left;
        }

        .premium-features-grid li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #1a0a2e;
        }

        .check-icon {
          color: #8235d0;
          flex-shrink: 0;
        }

        .btn-subscribe-premium {
          width: 100%;
          padding: 20px;
          border-radius: 999px;
          background: linear-gradient(94deg, #8235d0 -2.32%, #5f308e 99.71%);
          color: #fff;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: 0.4px;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 30px rgba(130, 53, 208, 0.25);
          transition: all 0.25s ease;
        }

        .btn-subscribe-premium:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 40px rgba(130, 53, 208, 0.35);
        }

        .price-note {
          margin-top: 16px;
          font-size: 12px;
          color: rgba(26,10,46,0.4);
          font-weight: 600;
        }

        /* ── MOBILE: card takes full width, side cols hide ── */
        @media (max-width: 860px) {
          .hero-visual-wrapper {
            flex-direction: column;
            align-items: center;
            margin: -20px auto 60px;
            padding: 0 20px;
            gap: 0;
          }
          .side-col { display: none; }
          .pricing-card-premium {
            flex: 0 0 auto;
            width: 100%;
            max-width: 500px;
            padding: 48px 36px 36px;
            border-radius: 24px;
          }
          .premium-features-grid { grid-template-columns: 1fr 1fr; gap: 11px 12px; }
        }

        @media (max-width: 600px) {
          .pricing-card-premium { padding: 48px 24px 32px; }
          .price-new .amount { font-size: 64px; }
          .price-old { font-size: 40px; }
          .premium-features-grid { grid-template-columns: 1fr; }
        }

        /* ── IMAGE MARQUEE ── */
        .marquee-caption {
          text-align: center;
          margin-bottom: 24px;
          font-size: 14px;
          color: rgba(26,10,46,0.65);
          font-weight: 500;
          letter-spacing: 0.3px;
          position: relative;
        }

        .marquee-caption::after {
          content: "";
          display: block;
          width: 120px;
          height: 1px;
          margin: 10px auto 0;
          background: linear-gradient(to right, transparent, rgba(130,53,208,0.4), transparent);
        }

        .image-marquee {
          overflow: hidden;
          margin: 30px 0 40px;
          padding: 0 20px;
        }

        .track {
          display: flex;
          gap: 20px;
          animation: scroll 30s linear infinite;
          width: max-content;
        }

        .track img {
          width: 160px;
          height: 200px;
          object-fit: cover;
          border-radius: 16px;
          flex-shrink: 0;
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── SERVICES SECTION ── */
        .services-section {
          background: #ffffff;
          border-radius: 32px;
          margin: 0 auto 140px;
          padding: 60px 30px 60px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          max-width: 1200px;
        }

        .services-header {
          text-align: center;
          margin-bottom: 50px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .badge {
          background: #8235d0;
          color: white;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          display: inline-block;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .services-header h2 {
          font-family: "Gambarino", serif;
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: -0.4px;
          margin-bottom: 10px;
          color: #1a0a2e;
        }

        .services-header p {
          font-size: 16px;
          color: rgba(26,10,46,0.65);
          line-height: 1.6;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }

        @media(max-width: 1000px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .subscription::after { display: none; }
        .services-grid > div { display: contents; }

        .service-card {
          background: #fff;
          border-radius: 18px;
          padding: 30px;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
          height: 100%;
          box-sizing: border-box;
        }

        .service-card:hover {
          border-color: rgba(130,53,208,0.2);
          box-shadow: 0 25px 50px rgba(130,53,208,0.10);
        }

        .service-icon {
          color: #8235d0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: rgba(130,53,208,0.08);
          margin-bottom: 0;
        }

        .service-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          height: 100%;
        }

        .service-title {
          font-family: "Gambarino", serif;
          font-size: 18px;
          margin-bottom: 12px;
          color: #1a0a2e;
          text-align: left;
        }

        .link {
          color: #8235d0;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
        }

        .link:hover {
          color: #5f308e;
          transform: translateX(4px);
        }

        /* ── VIEW ALL ── */
        .view-all {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 10px;
          margin-bottom: 0;
        }

        .view-btn {
          padding: 16px 36px;
          border-radius: 999px;
          border: 1px solid #8235d0;
          background: rgba(130,53,208,0.05);
          color: #8235d0;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: #8235d0;
          color: white;
          transform: translateY(-2px);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .sub-hero { padding: 60px 16px 40px; }
          .sub-hero h1 { font-size: 30px; line-height: 1.3; }
          .sub-hero p { font-size: 15px; margin-bottom: 30px; }
          .track img { width: 120px; height: 160px; }
          .services-section { padding: 40px 16px 80px; border-radius: 20px; }
          .services-grid { grid-template-columns: 1fr; gap: 16px; }
          .service-card { padding: 18px; }
          .service-title { font-size: 16px; }
          .view-btn { width: 100%; max-width: 280px; text-align: center; }
          .breadcrumb { padding: 0 16px 0; }
        }

        /* ── POPUP ── */
        .popup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .popup-content-premium {
          background: white;
          border-radius: 24px;
          padding: 48px 36px 40px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18);
          position: relative;
        }

        .popup-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3eeff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8235d0;
          font-weight: bold;
          font-size: 18px;
          line-height: 1;
          transition: all 0.2s ease;
        }

        .popup-close:hover {
          background: #8235d0;
          color: white;
        }

        .popup-title {
          font-family: 'Gambarino', serif;
          font-size: 26px;
          font-weight: 500;
          color: #1a0a2e;
          margin: 0 0 12px;
          letter-spacing: -0.3px;
        }

        .popup-desc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(26, 10, 46, 0.58);
          margin: 0 0 32px;
          max-width: 300px;
          margin-left: auto;
          margin-right: auto;
        }

        .popup-cta {
          display: inline-block;
          padding: 15px 32px;
          background: linear-gradient(135deg, #25D366, #1ebe5d);
          color: #fff;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.25s ease;
          letter-spacing: 0.1px;
        }

        .popup-cta:hover { transform: translateY(-2px); }

        .popup-note {
          margin-top: 18px;
          font-size: 13px;
          color: rgba(26, 10, 46, 0.38);
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .popup-content-premium { padding: 40px 24px 32px; border-radius: 20px; }
          .popup-title { font-size: 22px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="sub-hero">
        <div className="sub-hero-inner">
          <motion.h1 variants={fadeUpVariants} initial="hidden" animate="visible" custom={0}>
            60Plus - Premium Elder Care Services
            <br /> for Your Parents in India
          </motion.h1>
          <motion.p variants={fadeUpVariants} initial="hidden" animate="visible" custom={1}>
            Give your parents the love, care, and attention they deserve - even from miles away.
            With 60Plus India's comprehensive care plans, your loved ones stay healthy, happy,
            and truly cared for - just like you would if you were there.
          </motion.p>
        </div>
      </section>

      {/* ── HERO VISUAL ── */}
      <div className="hero-visual-wrapper">

        {/* LEFT COLUMN */}
        <motion.div
          className="side-col side-col-left"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <img
            ref={leftImgRef}
            src="images/hand_in_hand.jpg"
            className="side-img-main"
            alt="Elderly person receiving care"
          />
          <img
            src="images/old_person_3.jpg"
            className="side-img-back"
            alt="Elderly person smiling"
          />
          <div ref={leftTextRef} className="side-label">
            <div className="icon"><ShieldCheck size={16} /></div>
            <div>
              <strong>Trusted Care</strong>
              <p>Every step of the way</p>
            </div>
          </div>
        </motion.div>

        {/* ── CENTER: NEAT PREMIUM PRICING CARD ── */}
        <motion.div
          className="pricing-card-premium"
          id="pricing"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {/* Ribbon */}
          <div className="premium-ribbon">
            <span>50% OFF &bull; UNTIL MAY 15</span>
          </div>

          <div className="card-header">
            <div className="status-badge">MOST POPULAR</div>
            <h2 className="plan-main">60Plus Premium Plan</h2>
            <div className="limited-offer">LIMITED TIME OFFER</div>
          </div>

          {/* ── PRICE STACK ── */}
          <div className="price-section">
            <div className="price-flow">
              <div className="price-old">$2,400</div>
              <div className="price-arrow">→</div>
              <div className="price-new">
                <span className="currency">$</span>
                <span className="amount">1,200</span>
                <span className="period">/ year</span>
              </div>
            </div>
            <p className="price-subtext">+ Accessories included</p>
          </div>

          <hr className="neat-divider" />

          <ul className="premium-features-grid">
            <li><ShieldCheck size={18} className="check-icon" /> 21 Premium Services</li>
            <li><ShieldCheck size={18} className="check-icon" /> Monthly Monitoring</li>
            <li><ShieldCheck size={18} className="check-icon" /> 24/7 Emergency Support</li>
            <li><ShieldCheck size={18} className="check-icon" /> Updates for Family</li>
            <li><ShieldCheck size={18} className="check-icon" /> Dedicated Care Manager</li>
            <li><ShieldCheck size={18} className="check-icon" /> No Hidden Costs</li>
          </ul>

          <button className="btn-subscribe-premium" onClick={() => setShowSubscribeForm(true)}>
            Subscribe Now →
          </button>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          className="side-col side-col-right"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <img
            ref={rightImgRef}
            src="images/old_person_3.jpg"
            className="side-img-main"
            alt="Elderly person smiling"
          />
          <img
            src="images/hand_in_hand.jpg"
            className="side-img-back"
            alt="Elderly person receiving care"
          />
          <div ref={rightTextRef} className="side-label">
            <div className="icon"><HeartPulse size={16} /></div>
            <div>
              <strong>Safety. Health.</strong>
              <p>Happiness. Always.</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── MARQUEE ── */}
      <ScrollReveal>
        <div className="marquee-caption">Caring moments that matter</div>
      </ScrollReveal>
      <div className="image-marquee">
        <div className="track">
          {[...Array(2)].map((_, loop) =>
            [1,2,3,4,5,6,7,8].map((n) => (
              <img key={`${loop}-${n}`} src={`/images/img${n}.jpg`} alt={`Elderly care image ${n}`} />
            ))
          )}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div className="services-section">
        <ScrollReveal className="services-header">
          <span className="badge">21 SERVICES INCLUDED</span>
          <h2>Everything Your Parents Need - In One Plan</h2>
          <p>
            A complete ecosystem of healthcare, daily support, and lifestyle services
            designed for comfort, dignity, and peace of mind.
          </p>
        </ScrollReveal>

        <div className="services-grid">
          {(showAll ? services : services.slice(0, 12)).map((service, index) => (
            <ScrollReveal key={service.slug} custom={index % 4} variants={fadeInVariants}>
              <motion.div
                className="service-card"
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="service-icon">{service.icon}</div>
                <div className="service-content">
                  <div className="service-title">{service.name}</div>
                  <Link to={`/services/${service.slug}`} className="link">Learn more →</Link>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal custom={0}>
          <div className="view-all">
            <button onClick={() => setShowAll(!showAll)} className="view-btn">
              {showAll ? "Show Less ↑" : "View all 21 services →"}
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* ── POPUP ── */}
      {showSubscribeForm && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content-premium" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={handleClosePopup}>×</button>
            <h2 className="popup-title">Complete your subscription</h2>
            <p className="popup-desc">
              Our team will assist you personally with the next steps to get started.
            </p>
            <a
              href={getWhatsAppUrl(location.pathname)}
              target="_blank"
              rel="noopener noreferrer"
              className="popup-cta"
            >
              Continue on WhatsApp →
            </a>
            <p className="popup-note">You'll be guided step by step by our team</p>
          </div>
        </div>
      )}
    </section>
  );
}