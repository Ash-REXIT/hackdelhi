import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Ticket,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Zap,
  Calendar,
  Bell,
  Inbox,
  Sparkles,
  ArrowDown,
  ShieldCheck,
  Users,
} from "lucide-react";
import Footer from "../components/Footer";
import useMetaTags from "../hooks/useMetaTags";
import { aboutWhoWeAreSections } from "../data/aboutWhoWeAre";
import { lotteryFaqItems } from "../data/lotteryFaq";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeInVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ScrollReveal({ children, custom = 0, className = "", variants = fadeUpVariants }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-72px 0px" });
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


function pad(value) {
  return String(value).padStart(2, "0");
}

export default function Lottery() {
  useMetaTags(
    "60Plus Lucky Draw | Win Exciting Gifts",
    "Join the 60Plus lucky draw and win exciting gifts for your loved ones back home.",
    "60plus lucky draw, smart glass, smart ring, digital timer, parents care gifts"
  );

  const formRef = useRef(null);
  const lastDateLabel = "April 27, 2026";
  const winnersLabel = "May 3, 2026";

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", countryCode: "+1", city: "" });
  const [formErrors, setFormErrors] = useState({ name: "", phone: "", email: "", city: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [isFormInView, setIsFormInView] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const countryCodes = [
    { label: "US (+1)", value: "+1" },
    { label: "India (+91)", value: "+91" },
    { label: "UK (+44)", value: "+44" },
    { label: "UAE (+971)", value: "+971" }
  ];


  useEffect(() => {
    const element = formRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showTermsModal) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showTermsModal]);

  const timerParts = useMemo(() => {
    const days = Math.floor(remainingSeconds / 86400);
    const hours = Math.floor((remainingSeconds % 86400) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;
    return [pad(days), pad(hours), pad(minutes), pad(seconds)];
  }, [remainingSeconds]);

  const isExpired = true;

  const validateField = (key, rawValue) => {
    const value = rawValue.trim();

    if (key === "city") return ""; // optional

    if (!value) return "This field is required.";

    if (key === "name") {
      if (!/^[a-zA-Z\s'.-]{2,60}$/.test(value))
        return "Enter a valid full name.";
    }

    if (key === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 7 || digits.length > 12)
        return "Enter a valid phone number.";
    }

    if (key === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Enter a valid email address.";
    }

    return "";
  };

  const validateForm = () => {
    const nextErrors = {
      name: validateField("name", form.name),
      phone: validateField("phone", form.phone),
      email: validateField("email", form.email),
      city: validateField("city", form.city),
    };
    setFormErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFormErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isExpired || isSubmitting) return; // Prevent submission if expired or already submitting

    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const parentsCity = form.city.trim();
      const payload = {
        name: form.name,
        email: form.email,
        mobileNumber: `${form.countryCode}${form.phone}`,
        ...(parentsCity ? { parentsCity } : {}),
      };

      const res = await fetch("https://mobile-api.nurahub.com/v1/marketing/60plusIndia/lotteryDallasEvent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setApiError(errorData.message || "Server error. Please try again later.");
        return;
      }

      const data = await res.json();
      if (data.status === "success" && data.data) {
        setShowSuccess(true);
        setForm({ name: "", phone: "", email: "", countryCode: "+1", city: "" });
        setFormErrors({ name: "", phone: "", email: "", city: "" });
      } else {
        setApiError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setApiError("Network error. Please check your connection and try again.");
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccess(false);
    setForm({ name: "", phone: "", email: "", countryCode: "+1", city: "" });
    setFormErrors({ name: "", phone: "", email: "", city: "" });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToProcess = () => {
    document.getElementById("how-heading")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="lottery-page">
      <style>{`
        .lottery-page {
          --paper: #faf8f5;
          --paper-2: #f1ece4;
          --ink: #141118;
          --ink-soft: #3d3848;
          --line: rgba(20, 17, 24, 0.08);
          --accent: #4f2db8;
          --accent-hover: #3d2294;
          --gold: #b8956a;
          --gold-soft: #d4bc94;
          --hero-bg: #0e0c10;
          --footer-bg: #0f0a1f;
          --grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");

          min-height: 100vh;
          font-family: 'Nunito Sans', sans-serif;
          color: var(--ink);
          background: var(--paper);
          overflow-x: hidden;
          padding-top: 48px;
          padding-bottom: 88px;
        }
        @media (min-width: 769px) {
          .lottery-page {
            padding-top: 48px;
            padding-bottom: 0;
          }
        }

        .lottery-topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1100;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0 14px;
          background:
            linear-gradient(90deg, rgba(95, 45, 184, 0.18) 0%, rgba(14, 12, 16, 0.88) 48%, rgba(95, 45, 184, 0.12) 100%),
            var(--hero-bg);
          border-bottom: 1px solid rgba(212, 188, 148, 0.24);
          box-shadow: 0 4px 18px rgba(10, 8, 14, 0.5);
          backdrop-filter: blur(8px);
          color: rgba(245, 242, 235, 0.92);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lottery-topbar svg {
          color: #d4bc94;
          flex-shrink: 0;
        }
        .lottery-topbar-time {
          color: var(--gold-soft);
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .lottery-topbar-mobile-copy {
          display: none;
          color: #f5f2eb;
          font-weight: 700;
          letter-spacing: 0.08em;
        }
        @media (max-width: 900px) {
          .lottery-topbar {
            font-size: 0.7rem;
            letter-spacing: 0.08em;
          }
        }
        @media (max-width: 640px) {
          .lottery-page {
            padding-top: 44px;
          }
          .lottery-topbar {
            height: 44px;
            font-size: 0.66rem;
            gap: 0.35rem;
          }
          .lottery-topbar-desktop-copy {
            display: none;
          }
          .lottery-topbar-mobile-copy {
            display: inline;
          }
          .lottery-topbar-time {
            letter-spacing: 0.04em;
          }
          .hero-kicker-logo {
            width: 48px;
            height: 48px;
          }
          .hero-kicker-logo.itel {
            width: 34px;
            height: 34px;
          }
          .hero-kicker-sep {
            height: 22px;
          }
        }

        .lottery-inner {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 22px;
        }

        .lottery-section {
          padding: 5rem 22px;
        }
        @media (max-width: 768px) {
          .lottery-section { padding: 3.25rem 22px; }
        }

        .section-tight { padding-top: 3rem; padding-bottom: 3rem; }

        .font-display {
          font-family: 'Gambarino', 'Gambarino-Regular', serif !important;
        }

        /* -- Hero -- */
        .lottery-hero {
          background: var(--hero-bg);
          color: #f5f2eb;
          position: relative;
          isolation: isolate;
          padding: 0 22px 4.5rem;
        }
        .lottery-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--grain);
          z-index: 0;
          pointer-events: none;
          opacity: 1;
        }
        .lottery-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 90% 70% at 85% 15%, rgba(95, 45, 184, 0.22), transparent 55%),
            radial-gradient(ellipse 60% 50% at 10% 90%, rgba(184, 149, 106, 0.12), transparent 50%);
          z-index: 0;
          pointer-events: none;
        }

        .hero-grid {
          max-width: 1080px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 2.5rem;
          align-items: center;
          padding-top: 2rem;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; padding-top: 1.5rem; }
        }

        .hero-brand {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1080px;
          margin: 0 auto;
          padding: 1.5rem 22px 0;
          position: relative;
          z-index: 1;
        }
        .hero-logo {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(245, 242, 235, 0.55);
        }
        .hero-logo em {
          font-style: normal;
          color: var(--gold-soft);
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.23em;
          text-transform: uppercase;
          color: var(--gold-soft);
          margin-bottom: 1.25rem;
        }
        .hero-kicker-logos {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          margin-right: 0.6rem;
        }
        .hero-kicker-logo {
          width: 60px;
          height: 60px;
          object-fit: contain;
          display: inline-block;
          vertical-align: middle;
          filter: brightness(0) invert(1) drop-shadow(0 3px 7px rgba(0, 0, 0, 0.22));
        }
        .hero-kicker-sep {
          width: 1px;
          height: 26px;
          background: rgba(245, 242, 235, 0.28);
        }
        .hero-kicker-logo.itel {
          width: 46px;
          height: 46px;
        }

        .hero-title {
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 700;
          font-size: clamp(2.35rem, 5.5vw, 3.65rem);
          line-height: 1.05;
          letter-spacing: -0.012em;
          margin: 0 0 1.25rem;
          color: #faf8f5;
        }
        .hero-title span.accent {
          color: var(--gold-soft);
          font-style: normal;
          font-weight: 700;
        }

        .hero-lede {
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(245, 242, 235, 0.72);
          max-width: 34ch;
          margin: 0 0 2rem;
        }

        .hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1.25rem;

          margin-bottom: 1.5rem;
          padding-top: 1.2rem;   /* 🔥 increase space from line */

          border-top: 1px solid rgba(245, 242, 235, 0.12);
        }
        .hero-stat {
          min-width: 5.5rem;
        }
        .hero-stat strong {
          display: block;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.85rem;
          font-weight: 700;
          color: var(--gold-soft);
          line-height: 1.1;
        }
        .hero-stat span {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(245, 242, 235, 0.45);
        }

        .hero-cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.95rem 1.65rem;
          border-radius: 999px;
          border: 1px solid rgba(212, 188, 148, 0.45);
          cursor: pointer;
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--gold-soft) !important;
          background: linear-gradient(180deg, rgba(18, 15, 25, 0.95), rgba(10, 8, 14, 0.95));
          box-shadow: 0 12px 30px rgba(9, 8, 14, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
          text-decoration: none;
        }
        .btn-primary:hover {
          color: #f5f2eb !important;
          border-color: rgba(212, 188, 148, 0.75);
          background: linear-gradient(180deg, rgba(25, 21, 35, 0.98), rgba(12, 9, 18, 0.98));
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.85rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(245, 242, 235, 0.2);
          background: transparent;
          color: rgba(245, 242, 235, 0.85);
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
        }
        .btn-ghost:hover {
          border-color: rgba(245, 242, 235, 0.4);
          color: #fff;
        }

        .hero-visual {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 1rem;
          min-height: 100%;
        }
        @media (max-width: 900px) {
          .hero-visual { align-items: center; padding-top: 1rem; }
        }
        .hero-frame {
          width: 100%;
          max-width: 1050px;
          display: flex;
          justify-content: center;
          overflow: visible;
        }
        .hero-frame img {
          width: 150%;
          max-width: none;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.45));
          animation: stageFloat 4.1s ease-in-out infinite;
        }

        .hero-sub-note {
          font-size: 0.8rem;
          color: rgba(245,242,235,0.6);
          margin-top: 0.6rem;
          margin-bottom: 1.4rem; /* 🔥 ADD THIS */
        }
        @media (max-width: 768px) {
          .hero-frame img {
            width: 118%;
          }
        }

        /* -- Sections -- */
        .bg-paper { background: var(--paper); }
        .bg-paper-2 { background: var(--paper-2); }
        .bg-ink { background: var(--footer-bg); color: #e8e4dc; }
        .bg-ink .section-eyebrow { color: var(--gold-soft); }
        .bg-ink .section-title { color: #f5f2eb; }
        .bg-ink .section-desc { color: rgba(232, 228, 220, 0.82); }

        .section-head {
          max-width: 38rem;
          margin-bottom: 2.75rem;
        }
        .section-head.center { text-align: center; margin-left: auto; margin-right: auto; }
        .section-eyebrow {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;   /* 🔥 FIXED */
        }
        .section-title {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.75rem, 3.5vw, 2.35rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: 0.015em;
          margin: 0.2rem 0 0.9rem;   /* 🔥 balanced spacing */
          color: var(--ink);
        }
        .section-desc {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.6;
          color: var(--ink-soft);
        }

        /* Steps */
        .steps-track {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
        }
        @media (max-width: 820px) {
          .steps-track { grid-template-columns: 1fr; gap: 1.25rem; }
        }
        .steps-track::before {
          content: '';
          position: absolute;
          top: 2.1rem;
          left: 8%;
          right: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--line), transparent);
          z-index: 0;
        }
        @media (max-width: 820px) {
          .steps-track::before { display: none; }
        }
        .step-card {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 0 0.75rem;
          transition: transform 0.25s ease;
        }
        .step-num {
          width: 4.25rem;
          height: 4.25rem;
          margin: 0 auto 1.25rem;
          border-radius: 50%;
          background: var(--paper);
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--accent);
          box-shadow: 0 8px 24px rgba(20, 17, 24, 0.06);
        }
        .step-title {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0.018em;
          margin: 0 0 0.5rem;
        }
        .step-desc {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.55;
          color: var(--ink-soft);
          max-width: 22ch;
          margin-inline: auto;
        }

        /* Prizes */
        .prize-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .prize-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 500px) {
          .prize-grid {
            grid-template-columns: 1fr;
          }
        }
        .prize-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 1.75rem 1.35rem;
          text-align: center;
          position: relative;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .prize-card:hover {
          border-color: rgba(79, 45, 184, 0.2);
          box-shadow: 0 18px 40px rgba(20, 17, 24, 0.07);
        }
        .prize-img {
          width: 8.75rem;
          height: 8.75rem;
          margin: 0 auto 0.85rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: radial-gradient(circle at 50% 42%, rgba(95, 45, 184, 0.08), rgba(95, 45, 184, 0.02) 72%, transparent 100%);
        }
        .prize-img img {
          width: 120%;
          height: 120%;
          object-fit: contain;
          border-radius: 12px;
          filter: drop-shadow(0 10px 16px rgba(20, 17, 24, 0.18));
        }
        .prize-img img.prize-img-fill {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .prize-card:nth-child(2) .prize-img img {
          width: 104%;
          height: 96%;
        }
        .prize-name {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.2rem;
          font-weight: 600;
          letter-spacing: 0.015em;
          margin: 0 0 0.35rem;
        }
        .prize-worth {
          display: inline-block;
          margin: 0 0 0.7rem;
          padding: 0.22rem 0.65rem;
          border-radius: 999px;
          background: rgba(212, 188, 148, 0.18);
          border: 1px solid rgba(184, 149, 106, 0.35);
          color: #6e5633;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 1.2;
          box-shadow: 0 4px 12px rgba(184, 149, 106, 0.16);
        }
        .prize-sub {
          margin: 0;
          font-size: 0.9rem;
          color: var(--ink-soft);
          line-height: 1.45;
        }

        /* Form */
        .form-shell {
          max-width: 1080px;
          margin: 0 auto;
        }
        .form-highlight {
          background:
            radial-gradient(ellipse 70% 70% at 10% 8%, rgba(184, 149, 106, 0.08), transparent 58%),
            linear-gradient(180deg, #f8f3ea 0%, #f4eee4 100%);
        }
        .form-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 1.4rem;
          align-items: stretch;
        }
        .form-story {
          padding: 0.2rem 0.4rem;
          align-self: center;
        }
        .form-story .lead {
          margin-bottom: 0.7rem;
        }
        .form-story p {
          margin: 0 0 1rem;
        }
        .form-story-points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.55rem;
        }
        .form-story-points li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink-soft);
        }
        .form-story-points li::before {
          content: "•";
          color: var(--gold);
          font-size: 1rem;
          line-height: 1;
        }
        .form-panel {
          width: 100%;
          max-width: 780px;
          box-sizing: border-box;
          background: linear-gradient(180deg, #fff 0%, #fbf8f3 100%);
          border: 1px solid rgba(184, 149, 106, 0.22);
          border-radius: 18px;
          padding: 1.85rem 1.65rem;
          box-shadow: 0 18px 34px rgba(20, 17, 24, 0.08);
        }
        .form-panel h2 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.34rem, 2.2vw, 1.7rem);
          font-weight: 700;
          letter-spacing: 0.015em;
          margin: 0 0 0.4rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--ink);
        }
        .form-panel h2 svg {
          color: #5f4a2d;
          background: rgba(184, 149, 106, 0.1);
          border: 1px solid rgba(184, 149, 106, 0.18);
          border-radius: 999px;
          padding: 6px;
          flex-shrink: 0;
        }
        .form-intro {
          margin: 0 0 1.2rem;
          font-size: 0.95rem;
          color: var(--ink-soft);
          line-height: 1.55;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.9rem 0.95rem;
        }
        .form-group.span-2 {
          grid-column: span 2;
        }
        .form-spacer {
          min-height: 1px;
        }
        .form-group {
          margin-bottom: 0;
        }
        .form-group label {
          display: block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(20, 17, 24, 0.78);
          margin-bottom: 0.42rem;
        }
        .form-control {
          width: 100%;
          box-sizing: border-box;
          padding: 0.92rem 0.95rem;
          border: 1px solid rgba(184, 149, 106, 0.24);
          border-radius: 13px;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.93rem;
          color: var(--ink);
          background: #f8f4ed;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        }
        textarea.form-control {
          min-height: 94px;
          resize: vertical;
          line-height: 1.45;
        }
        .form-control::placeholder {
          color: rgba(61, 56, 72, 0.5);
          font-size: 0.88rem;
        }
        .form-control:focus {
          outline: none;
          border-color: rgba(184, 149, 106, 0.56);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(184, 149, 106, 0.15);
        }
        .form-control:disabled {
          background: #f5f5f5;
          color: #888;
          cursor: not-allowed;
          opacity: 0.7;
        }
        .field-error {
          margin: 0.35rem 0 0 0.12rem;
          color: #ffb4ae;
          font-size: 0.74rem;
          line-height: 1.35;
          font-weight: 600;
        }
        .form-control.is-invalid {
          border-color: rgba(255, 141, 133, 0.72);
          box-shadow: 0 0 0 2px rgba(255, 141, 133, 0.16);
        }
        .form-submit {
          width: 100%;
          margin-top: 0.95rem;
          padding: 1rem 1rem;
          border: 1px solid rgba(212, 188, 148, 0.45);
          border-radius: 13px;
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 0.92rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          color: var(--gold-soft);
          background: linear-gradient(180deg, rgba(18, 15, 25, 0.95), rgba(10, 8, 14, 0.95));
          box-shadow: 0 10px 24px rgba(9, 8, 14, 0.24), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }
        .form-submit:hover {
          color: #f5f2eb;
          border-color: rgba(212, 188, 148, 0.72);
          background: linear-gradient(180deg, rgba(25, 21, 35, 0.98), rgba(12, 9, 18, 0.98));
        }
        .form-trust {
          margin: 0.75rem 0 0.15rem;
          font-size: 0.8rem;
          color: var(--ink-soft);
          line-height: 1.5;
        }

        .form-closed-banner {
          background: rgba(184,149,106,0.12);
          border: 1px solid rgba(184,149,106,0.3);
          padding: 14px;
          border-radius: 12px;
          margin-bottom: 14px;
          text-align: center;
        }

        .form-closed-banner strong {
          display: block;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .loader {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(212, 188, 148, 0.3);
          border-top: 2px solid var(--gold-soft);
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          vertical-align: middle;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .form-foot {
          margin: 0.7rem 0 0;
          font-size: 0.72rem;
          line-height: 1.55;
          color: var(--ink-soft);
          text-align: center;
        }
        .form-foot button {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          color: var(--accent);
          font-weight: 700;
          text-decoration: underline;
          font-family: inherit;
          font-size: inherit;
        }
        .form-foot button:hover { opacity: 0.86; }
        @media (max-width: 768px) {
          .form-shell {
            width: 100%;
            padding-left: 14px;
            padding-right: 14px;
            box-sizing: border-box;
          }
          .form-layout {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .form-story {
            padding: 0;
          }
          .form-story p {
            font-size: 0.88rem;
          }
          .form-panel {
            max-width: 100%;
            padding: 1.35rem 1rem 1.15rem;
            border-radius: 14px;
            box-shadow: 0 14px 28px rgba(20, 17, 24, 0.08);
          }
          .form-panel h2 {
            font-size: 1.24rem;
            gap: 0.4rem;
          }
          .form-intro {
            margin-bottom: 0.95rem;
            font-size: 0.9rem;
          }
          .form-grid {
            grid-template-columns: 1fr;
            gap: 0.82rem;
          }
          .form-group.span-2 {
            grid-column: span 1;
          }
          .form-spacer {
            display: none;
          }
          .form-group {
            margin-bottom: 0;
          }
          .form-group label {
            font-size: 0.68rem;
          }
          .form-control {
            padding: 0.82rem 0.82rem;
            border-radius: 12px;
            font-size: 0.88rem;
          }
          .form-control::placeholder {
            font-size: 0.84rem;
          }
          .field-error {
            font-size: 0.72rem;
          }
          .form-submit {
            margin-top: 0.7rem;
            padding: 0.88rem;
            border-radius: 12px;
            font-size: 0.82rem;
            letter-spacing: 0.06em;
          }
          .form-trust {
            margin-top: 0.68rem;
            font-size: 0.76rem;
          }
          .form-foot {
            margin-top: 0.62rem;
            font-size: 0.68rem;
            text-align: center;
          }
          #lottery-form.lottery-section {
            padding-left: 14px;
            padding-right: 14px;
          }
        }
        @media (max-width: 420px) {
          .form-panel {
            padding: 1.2rem 0.8rem 1.05rem;
          }
          .form-panel h2 {
            font-size: 1.08rem;
          }
          .form-intro {
            font-size: 0.86rem;
          }
        }

        /* Timer */
        .timer-band {
          background: var(--footer-bg);
          color: #e8e4dc;
          padding: 3rem 22px;
          position: relative;
          overflow: hidden;
        }
        .timer-band::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--grain);
          opacity: 0.5;
          pointer-events: none;
        }
        .timer-inner {
          position: relative;
          z-index: 1;
          max-width: 720px;
          margin: 0 auto;
          text-align: center;
        }
        .timer-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          margin: 0 0 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
        }
        .timer-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: baseline;
          gap: 0.35rem 0.5rem;
        }
        .timer-box {
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 600;
          font-size: clamp(2.1rem, 7vw, 3.2rem);
          line-height: 1;
          letter-spacing: 0.02em;
          color: #faf8f5;
          min-width: 2ch;
          padding: 0.35rem 0.15rem;
          animation: timerPulse 1.8s ease-in-out infinite;
        }
        .timer-dot {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.4rem, 4vw, 2rem);
          color: var(--gold-soft);
          opacity: 0.65;
          padding: 0 0.1rem;
        }
        .timer-units {
          display: flex;
          justify-content: center;
          gap: clamp(1.5rem, 8vw, 3.5rem);
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        .timer-unit {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(232, 228, 220, 0.45);
          min-width: 4.5rem;
          text-align: center;
        }

        .timer-ended {
          text-align: center;
          padding: 20px;
        }

        .timer-ended h3 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: #faf8f5;
          margin-bottom: 8px;
        }

        .timer-ended p {
          font-size: 0.95rem;
          color: rgba(232,228,220,0.7);
        }

        /* Showcase (bowl only) */
        .show-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
          gap: 2.5rem;
          align-items: center;
        }
        @media (max-width: 880px) {
          .show-grid { grid-template-columns: 1fr; gap: 2rem; text-align: center; }
        }
        .show-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .show-bowl img {
          width: min(240px, 58vw);
          height: auto;
          animation: bowlFloat 3.6s ease-in-out infinite;
        }
        @media (min-width: 1024px) {
          .show-bowl img {
            width: min(320px, 32vw);
          }
        }
        .show-bowl span {
          display: block;
          text-align: center;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ink-soft);
          margin-top: 0.5rem;
        }
        .show-text .lead {
          font-family: 'Nunito Sans', sans-serif;
          font-size: clamp(1.45rem, 3vw, 1.85rem);
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.02em;
          margin: 0 0 1rem;
        }
        .show-text p {
          margin: 0;
          font-size: 1.02rem;
          line-height: 1.65;
          color: var(--ink-soft);
        }

        /* Who we are */
        .who-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 900px) {
          .who-grid { grid-template-columns: 1fr; }
        }
        .who-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 1.5rem 1.35rem 1.4rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .who-badge {
          display: block;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.19em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.55rem;
        }
        .who-title {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: 0.015em;
          margin: 0 0 0.55rem;
          line-height: 1.25;
        }
        .who-body {
          margin: 0;
          font-size: 0.88rem;
          line-height: 1.58;
          color: var(--ink-soft);
        }
        .who-more {
          text-align: center;
          margin: 1.75rem 0 0;
          font-size: 0.95rem;
        }
        .who-more a {
          color: var(--accent);
          font-weight: 700;
          text-decoration: none;
        }
        .who-more a:hover {
          text-decoration: underline;
        }

        /* FAQ */
        .faq-wrap {
          max-width: 720px;
          margin: 0 auto;
        }
        .faq-item {
          border-bottom: 1px solid var(--line);
          transition: background 0.2s ease;
          border-radius: 12px;
        }
        .faq-item:first-of-type {
          border-top: 1px solid var(--line);
        }
        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 0.9rem;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.012em;
          color: var(--ink);
        }
        .faq-item:hover {
          background: rgba(79, 45, 184, 0.03);
        }
        .faq-q:hover {
          color: var(--accent);
        }
        .faq-a {
          padding: 0 2rem 1.05rem 0.9rem;
          margin: 0;
          font-size: 0.94rem;
          line-height: 1.62;
          color: var(--ink-soft);
        }
        .faq-answer-wrap {
          overflow: hidden;
        }
        .faq-chevron {
          flex-shrink: 0;
          color: var(--accent);
          transition: transform 0.2s ease;
        }
        .faq-chevron.is-open {
          transform: rotate(180deg);
        }
        .bg-ink .faq-item {
          border-bottom-color: rgba(232, 228, 220, 0.18);
        }
        .bg-ink .faq-item:first-of-type {
          border-top-color: rgba(232, 228, 220, 0.18);
        }
        .bg-ink .faq-item:hover {
          background: rgba(232, 228, 220, 0.06);
        }
        .bg-ink .faq-q {
          color: #f5f2eb;
        }
        .bg-ink .faq-q:hover {
          color: var(--gold-soft);
        }
        .bg-ink .faq-a {
          color: rgba(232, 228, 220, 0.86);
        }
        .bg-ink .faq-chevron {
          color: var(--gold-soft);
        }
        .faq-policies {
          text-align: center;
          margin: 1.5rem 0 0;
          font-size: 0.88rem;
        }
        .faq-policies a {
          color: var(--accent);
          font-weight: 700;
          text-decoration: none;
        }
        .faq-policies a:hover {
          text-decoration: underline;
        }
        .faq-policies span {
          color: var(--ink-soft);
          padding: 0 0.35rem;
        }

        /* Info */
        .info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .info-row { grid-template-columns: 1fr; }
        }
        .info-tile {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 1.5rem 1.25rem;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .info-tile svg {
          color: var(--accent);
          margin-bottom: 0.65rem;
        }
        .info-tile h4 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin: 0 0 0.4rem;
          color: var(--ink);
        }
        .info-tile p {
          margin: 0;
          font-size: 0.92rem;
          color: var(--ink-soft);
          line-height: 1.45;
        }

        .page-footer {
          text-align: center;
          padding: 2rem 22px 2.5rem;
          font-size: 0.88rem;
          color: var(--ink-soft);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          border-top: 1px solid var(--line);
        }
        .page-footer svg { color: var(--accent); flex-shrink: 0; }

        .success-message {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          background: rgba(10, 8, 14, 0.55);
          padding: 1rem;
        }
        .success-message-card {
          background: linear-gradient(180deg, #fff 0%, #fbf8f3 100%);
          border: 1px solid rgba(184, 149, 106, 0.24);
          border-radius: 20px;
          padding: 2rem 1.6rem 1.45rem;
          max-width: 92vw;
          width: 27rem;
          text-align: center;
          box-shadow: 0 28px 60px rgba(20, 17, 24, 0.22);
          animation: successModalPop 0.28s ease-out;
        }
        .success-icon-wrap {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          margin: 0 auto 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(184, 149, 106, 0.35);
          background: rgba(184, 149, 106, 0.14);
        }
        .success-message h3 {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 0.018em;
          margin: 0 0 0.45rem;
          color: #1b1527;
        }
        .success-message p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--ink-soft);
        }
        .success-highlight {
          color: #2a2435;
          font-weight: 800;
        }
        .success-message p + p {
          margin-top: 0.45rem;
        }
        .success-close-btn {
          margin-top: 1rem;
          border: 1px solid rgba(184, 149, 106, 0.42);
          background: rgba(184, 149, 106, 0.13);
          color: #6e5633;
          border-radius: 10px;
          padding: 0.45rem 1rem;
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .success-close-btn:hover {
          background: rgba(184, 149, 106, 0.2);
        }
        .terms-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 1200;
          background: rgba(10, 8, 14, 0.64);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .terms-modal-card {
          width: min(900px, 96vw);
          max-height: 88vh;
          overflow: auto;
          background: linear-gradient(180deg, #fff 0%, #fbf8f3 100%);
          border: 1px solid rgba(184, 149, 106, 0.24);
          border-radius: 20px;
          box-shadow: 0 30px 70px rgba(20, 17, 24, 0.28);
          padding: 0;
        }
        .terms-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          position: sticky;
          top: 0;
          z-index: 5;
          background: #fbf8f3;
          padding: 1rem 1.45rem 0.85rem;
          border-bottom: 1px solid rgba(184, 149, 106, 0.2);
          box-shadow: 0 8px 16px rgba(20, 17, 24, 0.05);
        }
        .terms-modal-kicker {
          display: block;
          margin: 0 0 0.25rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.17em;
          text-transform: uppercase;
          color: #8a6b3f;
        }
        .terms-modal-title {
          margin: 0;
          font-size: clamp(1rem, 2.2vw, 1.35rem);
          font-weight: 800;
          color: #1b1527;
          line-height: 1.24;
          letter-spacing: 0.02em;
        }
        .terms-close {
          border: 1px solid rgba(184, 149, 106, 0.35);
          background: rgba(184, 149, 106, 0.12);
          color: #6e5633;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          font-size: 1rem;
          cursor: pointer;
          flex-shrink: 0;
        }
        .terms-close:hover { background: rgba(184, 149, 106, 0.2); }
        .terms-modal-body {
          font-size: 0.93rem;
          line-height: 1.68;
          color: #2a2435;
          padding: 1rem 1.45rem 1.6rem;
        }
        .terms-modal-body strong {
          color: #1d1728;
          font-weight: 900;
        }
        .terms-modal-body h3 {
          margin: 1.1rem 0 0.45rem;
          font-size: 1.02rem;
          letter-spacing: 0.02em;
          color: #141118;
        }
        .terms-modal-body p {
          margin: 0.45rem 0;
        }
        .terms-modal-body ul {
          margin: 0.3rem 0 0.75rem 1.2rem;
          padding: 0;
        }
        .terms-modal-body li {
          margin: 0.22rem 0;
        }
        .terms-copyright {
          text-align: center;
          margin-top: 1rem;
        }
        @keyframes successModalPop {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .sticky-cta {
          display: none;
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          padding: 0.85rem 1rem calc(0.85rem + env(safe-area-inset-bottom));
          background: rgba(250, 248, 245, 0.92);
          backdrop-filter: blur(10px);
          border-top: 1px solid var(--line);
        }
        @media (max-width: 768px) {
          .sticky-cta { display: block; }
        }
        .sticky-cta button {
          width: 100%;
          padding: 0.9rem;
          border: none;
          border-radius: 16px;
          font-family: 'Nunito Sans', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          color: #faf8f5;
          background: var(--ink);
        }

        @keyframes panelGlow {
          0%, 100% { box-shadow: 0 24px 48px rgba(20, 17, 24, 0.06); }
          50% { box-shadow: 0 28px 54px rgba(79, 45, 184, 0.16); }
        }
        @keyframes timerPulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-2px); opacity: 0.86; }
        }
        @keyframes bowlFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes stageFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* 60Plus Section Styles */
        .offer60plus-section .gold {
          color: var(--ink);
          font-weight: 800;
          letter-spacing: 0.01em;
        }

        /* CARD LAYOUT */
        .offer60plus-card {
          display: grid;
          grid-template-columns: 1.1fr 1fr;   /* image slightly bigger */
          gap: 2rem;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(20,17,24,0.08);
        }

        @media (max-width: 900px) {
          .offer60plus-card {
            grid-template-columns: 1fr;
            padding: 1.5rem 1.25rem 1.75rem;
            gap: 1.25rem;
          }

          .offer60plus-card.refined {
            padding: 0;
            gap: 0;
          }

          .offer60plus-card.refined .offer60plus-content {
            padding: 1.5rem 1.5rem 2rem;
          }
        }

        /* VISUAL */
        .offer60plus-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          min-height: 260px;
        }

        .offer60plus-visual img {
          width: 100%;
          max-width: 320px;
          object-fit: contain;
          filter: drop-shadow(0 14px 30px rgba(0,0,0,0.12));
        }

        .offer60plus-visual.refined {
          display: block;
          min-height: 0;
          height: 100%;
          align-self: stretch;
          overflow: hidden;
          border-radius: 20px 0 0 20px;
        }

        .offer60plus-visual.refined img {
          display: block;
          width: 100%;
          height: 100%;
          max-width: none;
          min-height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 0;
          filter: none;
        }

        /* CONTENT */
        .offer60plus-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* BADGE */
        .offer60plus-badge {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.6rem;
        }

        /* TITLE */
        .offer60plus-title {
          font-size: 1.65rem;
          font-weight: 800;
          margin-bottom: 0.6rem;
          background: linear-gradient(135deg, #b8956a 0%, #6e4e2a 60%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.004em;
          line-height: 1.2;
        }

        /* DESC */
        .offer60plus-desc {
          font-size: 0.95rem;
          color: var(--ink-soft);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        /* FEATURES */
        .offer60plus-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem 1rem;
          margin-bottom: 1.2rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink-soft);
        }

        .feature-item svg {
          color: var(--gold);
        }

        /* CTA */
        .offer60plus-cta {
          margin-top: 0.5rem;
        }

        /* NOTE */
        .offer60plus-note {
          font-size: 0.75rem;
          margin-top: 0.6rem;
          color: rgba(20,17,24,0.5);

          text-align: center;     /* ✅ center text */
          width: 100%;            /* ✅ take full width */
        }

        /* Refined Card Styling — no outer padding on image side; image fills its cell */
        .offer60plus-card.refined {
          align-items: stretch;
          gap: 2rem;
          padding: 0;
          overflow: hidden;
        }

        .offer60plus-card.refined .offer60plus-content {
          padding: 2rem 2rem 2rem 0;
          box-sizing: border-box;
        }

        .offer60plus-desc.highlight {
          font-size: 0.98rem;
          font-weight: 600;
          color: #2a2435;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }

        /* SPECIAL CARD */
        .prize-card.special {
          border: 1px solid rgba(184,149,106,0.45);
          box-shadow: 0 18px 40px rgba(184,149,106,0.18);
        }

        /* IMAGE */
        .prize-img.special {
          background: radial-gradient(circle at center, rgba(184,149,106,0.18), transparent 70%);
        }

        /* TEXT */
        .prize-sub.premium {
          font-weight: 600;
          color: #1b1527;
        }

        /* Clean features */
        .offer60plus-features.clean {
          display: grid;
          grid-template-columns: max-content max-content;
          gap: 1rem 2.25rem;
          margin-top: 0.35rem;
          margin-bottom: 0.55rem;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          box-sizing: border-box;
        }

        .offer60plus-more-services {
          grid-column: 1 / -1;
          text-align: center;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--gold);
          margin: 0.45rem 0 0;
          padding-top: 0.3rem;
          letter-spacing: 0.02em;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--ink-soft);
        }

        .feature-item svg {
          color: var(--gold);
          width: 16px;
          height: 16px;
        }

        @media (max-width: 900px) {
          .offer60plus-visual.refined {
            border-radius: 20px 20px 0 0;
            height: auto;
            min-height: 200px;
            max-height: 320px;
          }

          .offer60plus-visual.refined img {
            min-height: 200px;
            max-height: 320px;
            height: 100%;
          }
        }

        /* CTA spacing FIX */
        .offer60plus-cta.spaced {
          margin-top: 0.85rem;
          margin-bottom: 0.6rem;

          display: flex;
          justify-content: center;   /* horizontal center */
          align-items: center;

          width: 100%;
        }
        .offer60plus-cta.spaced > * {
          width: 100%;
          max-width: 320px;
        }
        .offer60plus-cta.spaced .btn-primary {
          min-width: 220px;
          max-width: 320px;
          width: auto;
          justify-content: center;
        }
        @media (max-width: 768px) {
          /* Single horizontal gutter (section only) so the card and copy use full width */
          .offer60plus-section .lottery-inner {
            padding-left: 0;
            padding-right: 0;
          }

          .offer60plus-section.lottery-section {
            padding-left: calc(18px + env(safe-area-inset-left, 0px));
            padding-right: calc(18px + env(safe-area-inset-right, 0px));
          }

          .offer60plus-card.refined .offer60plus-content {
            padding: 1.75rem clamp(1.125rem, 4.5vw, 1.5rem) 2.25rem;
            width: 100%;
            box-sizing: border-box;
          }

          .offer60plus-features.clean {
            grid-template-columns: 1fr;
            width: 100%;
            max-width: none;
            margin-left: 0;
            margin-right: 0;
            gap: 0.85rem;
            padding: 0.75rem 0;
            box-sizing: border-box;
          }

          .offer60plus-features.clean .feature-item {
            justify-content: flex-start;
          }

          .offer60plus-more-services {
            margin-top: 0.45rem;
            padding-top: 0.35rem;
          }

          .offer60plus-cta.spaced {
            margin-top: 0.9rem;
          }

          .offer60plus-cta.spaced > * {
            max-width: 100%;
          }

          .offer60plus-cta.spaced .btn-primary {
            font-size: 0.85rem;
            padding: 1rem 1.25rem;
            letter-spacing: 0.04em;
            border-radius: 999px;
          }

          .offer60plus-note {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
        }

        .offer60plus-content {
          align-items: center;   /* ✅ center everything */
          text-align: center;    /* ✅ align text with CTA */
        }
      `}</style>

      <div className="lottery-topbar" role="status" aria-live="polite">
        {/* <Sparkles size={13} aria-hidden /> */}
        <span className="lottery-topbar-desktop-copy">ENDS APRIL 27 • 11:59 PM CDT</span>
        <span className="lottery-topbar-mobile-copy">ENDS APR 27 • 11:59 PM</span>
        <span className="lottery-topbar-time">
          Entries Closed
        </span>
        <span className="lottery-topbar-mobile-copy">
          {isExpired ? "DRAW CLOSED" : "HURRY UP!!"}
        </span>
        {/* <Sparkles size={13} aria-hidden /> */}
      </div>

      <header className="lottery-hero" aria-label="Lucky draw">
        <div className="hero-grid">
          <ScrollReveal>
            <p className="hero-kicker">
              <span className="hero-kicker-logos" aria-hidden>
                <img className="hero-kicker-logo" src="/logo/60_plus_india.png" alt="" />
                <span className="hero-kicker-sep" />
                <img className="hero-kicker-logo itel" src="/logo/ITEL_LOGO.png" alt="" />
              </span>
            </p>
            <h1 className="hero-title font-display">
              Gifts that cross oceans, <span className="accent">for the people who raised you.</span>
            </h1>
            <p className="hero-lede">
              Enter the draw for a chance to gift your parents a full year of 60Plus Premium Subscription.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>Free</strong>
                <span>Entry</span>
              </div>
              <div className="hero-stat">
                <strong>10+1</strong>
                <span>Total winners</span>
              </div>
              <div className="hero-stat">
                <strong>Multiple</strong>
                <span>Benefits</span>
              </div>
            </div>
            <p className="hero-sub-note">
              10 winners take home smart gadgets. 1 special winner receives 60Plus Premium Subscription for one year.
            </p>
            <div className="hero-cta-row">
              <motion.button type="button" className="btn-primary" onClick={scrollToForm} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Join the draw
                <ChevronRight size={18} aria-hidden />
              </motion.button>
              {/* <motion.button type="button" className="btn-ghost" onClick={scrollToProcess} whileHover={{ y: 2 }} whileTap={{ scale: 0.98 }}>
                {/* <ArrowDown size={16} aria-hidden />
                How it works 
              </motion.button> */} 
            </div>
          </ScrollReveal>
          <div className="hero-visual">
            <ScrollReveal custom={1}>
              <div className="hero-frame">
                <img src="/images/stand_image.png" alt="Lucky draw prize stage" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <section className="lottery-section bg-paper-2 offer60plus-section">
        <div className="lottery-inner">

          {/* HEADER */}
          <ScrollReveal className="section-head center">
            <p className="section-eyebrow">Exclusive Benefit</p>

            <h2 className="section-title font-display">
              Get a chance to win 1-Year 60Plus Premium Subscription
            </h2>

            <p className="section-desc">
              It takes less than a minute to participate and one winner will unlock a full year of care, safety, and support for their parents.
            </p>
          </ScrollReveal>

          {/* MAIN CARD */}
          <ScrollReveal>
            <div className="offer60plus-card refined">

              <div className="offer60plus-visual refined">
                <img src="/images/lottery_page_1_year_free_plan.png" alt="60Plus subscription" />
              </div>

              <div className="offer60plus-content">

                <div className="offer60plus-badge">
                  Part of 10+1 Winner Draw
                </div>

                <h3 className="offer60plus-title">
                  60Plus Subscription
                </h3>

                <p className="offer60plus-desc highlight">
                 Complete Premium care and support for your parents in India, helping them stay safe, healthy, and well cared for every day.</p>

                <div className="offer60plus-features clean">
                  <div className="feature-item">
                    <CheckCircle size={16} />
                    Monthly Doctor Visit
                  </div>

                  <div className="feature-item">
                    <ShieldCheck size={16} />
                    24/7 Emergency Call
                  </div>

                  <div className="feature-item">
                    <Bell size={16} />
                    Daily Updates to Children
                  </div>

                  <div className="feature-item">
                    <Users size={16} />
                    Monthly Care Executive Visit
                  </div>

                  <p className="offer60plus-more-services">
                    +17 more services included
                  </p>
                </div>

                <div className="offer60plus-cta spaced">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link to="/" className="btn-primary">
                      See What You Get
                      <ChevronRight size={18} aria-hidden />
                    </Link>
                  </motion.div>
                </div>

                <p className="offer60plus-note">
                  Eligible only if parents are residing in India.
                </p>

              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <section className="lottery-section bg-paper" aria-labelledby="how-heading">
        <div className="lottery-inner">
          <ScrollReveal className="section-head center">
            <p className="section-eyebrow">Process</p>
            <h2 id="how-heading" className="section-title font-display">
              Simple as one, two, three
            </h2>
            <p className="section-desc">No stress, no confusion - just enter and let luck do its thing.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="steps-track">
              {[
                {
                  n: "01",
                  t: "Enter the draw",
                  d: "Submit your details to participate."
                },
                {
                  n: "02",
                  t: "Get selected",
                  d: "11 participants will be selected randomly."
                },
                {
                  n: "03",
                  t: "Win benefits",
                  d: "10 winners receive gadgets. 1 winner receives a 1-year 60Plus subscription."
                }
              ].map((s, idx) => (
                <motion.div
                  key={s.n}
                  className="step-card"
                  variants={fadeInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={idx}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="step-num">{s.n}</div>
                  <h3 className="step-title font-display">{s.t}</h3>
                  <p className="step-desc">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="lottery-section bg-paper-2" aria-labelledby="prizes-heading">
        <div className="lottery-inner">
          <ScrollReveal className="section-head center">
            <p className="section-eyebrow">Prizes</p>
            <h2 id="prizes-heading" className="section-title font-display">
              What you could win
            </h2>
            <p className="section-desc">
              10 winners will receive smart devices. One special winner receives a 1-year 60Plus Premium Subscription.
            </p>
          </ScrollReveal>
          <div className="prize-grid">
            {[
              { img: "/images/glass.png", title: "Smart glass", sub: "Stay connected without lifting a finger - calls, music, and comfort, all in one." },
              { img: "/images/ring.png", title: "Health ring", sub: "Quietly tracks your health - so you can stay informed without the effort." },
              { img: "/images/digitalclock.png", title: "Digital timer", sub: "Gentle alarms for everyday moments - keeping routines simple and on track." },
            ].map((p, i) => (
              <motion.article
                key={p.title}
                className="prize-card"
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                <div className="prize-img">
                  <img src={p.img} alt="" />
                </div>
                <h3 className="prize-name font-display">{p.title}</h3>
                <p className="prize-sub">{p.sub}</p>
              </motion.article>
            ))}
            <motion.article
              className="prize-card"
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <div className="prize-img">
                <img className="prize-img-fill" src="/images/lotter_page_what_could_you_win.png" alt="60Plus subscription" />
              </div>
              <h3 className="prize-name font-display" style={{color: 'black'}}>60Plus Subscription</h3>
              <p className="prize-sub">Continuous care and everyday support to keep your parents safe, healthy.</p>
            </motion.article>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showTermsModal && (
          <motion.div
            className="terms-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lottery-terms-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="terms-modal-card"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
            <div className="terms-modal-header">
              <h2 id="lottery-terms-title" className="terms-modal-title">
                <span className="terms-modal-kicker">Official Terms</span>
                LUCKY DRAW TERMS &amp; CONDITIONS
              </h2>
              <button type="button" className="terms-close" onClick={() => setShowTermsModal(false)} aria-label="Close terms">✕</button>
            </div>
            <div className="terms-modal-body">
              <p><strong>Promoter:</strong> 60Plus India (A brand of Nura AI Labs Private Limited)</p>
              <p><strong>Effective Date:</strong> April 2026</p>
              <p><strong>Location:</strong> United States (Event-Based Participation)</p>

              <h3>1. ORGANIZER</h3>
              <p>This Lucky Draw ("Contest") is organized and promoted by <strong>60Plus India, operated by Nura AI Labs Private Limited</strong>, a company registered in India, with its registered office at:</p>
              <p>Plot No. 22, Rajalakshmi Nagar,<br />3rd Main Road, Velachery,<br />Chennai – 600 042, India.</p>

              <h3>2. ELIGIBILITY</h3>
              <ul>
                <li>Open only to individuals aged <strong>18 years or above</strong>.</li>
                <li>Intended primarily for <strong>Non-Resident Indians (NRIs)</strong> attending the event.</li>
                <li>Employees, affiliates, partners, and their immediate family members are <strong>not eligible</strong>.</li>
              </ul>

              <h3>3. NO PURCHASE REQUIRED</h3>
              <ul>
                <li>Participation is <strong>completely free</strong>.</li>
                <li>No purchase or payment increases the chance of winning.</li>
              </ul>

              <h3>4. ENTRY REQUIREMENTS</h3>
              <p>To enter the Lucky Draw, participants must:</p>
              <ul>
                <li>Scan the official QR code at the event</li>
                <li>Submit the digital entry form with:
                  <ul>
                    <li>Full Name</li>
                    <li>Valid Phone Number</li>
                    <li>Valid Email Address</li>
                    <li>Parents’ Location in India</li>
                  </ul>
                </li>
              </ul>
              <p><strong>ENTRY LIMIT:</strong> Only <strong>one (1) entry per person</strong> is allowed. Duplicate or fraudulent entries will result in <strong>disqualification</strong>.</p>

              <h3>5. CONTEST PERIOD</h3>
              <p>The lucky draw entry period closes on April 27, 2026 at 11:59 PM CDT.</p>
              <p>Entries submitted after this deadline will not be considered.</p>

              <h3>6. PRIZES</h3>
              <p>A total of <strong>10 winners</strong> will be selected:</p>
              <ul>
                <li>2 × Smart Glasses</li>
                <li>2 × Health Rings</li>
                <li>6 × Digital Clocks</li>
              </ul>
              <p><strong>Conditions:</strong></p>
              <ul>
                <li>Prizes are <strong>non-transferable</strong></li>
                <li>No <strong>cash alternatives</strong></li>
                <li>Organizer reserves the right to substitute prizes with equal or higher value items</li>
              </ul>

              <h3>6A. SPECIAL BENEFIT – 60PLUS SUBSCRIPTION</h3>
              <p>In addition to the 10 prize winners, one (1) separate participant will be selected randomly to receive a complimentary 1-year 60Plus premium subscription.</p>
              <p><strong>Conditions:</strong></p>
              <ul>
                <li>This benefit is independent of the 10 prize winners and will be awarded to a different participant.</li>
                <li>The subscription is applicable only if the participant's parents are residing in India.</li>
                <li>The subscription includes services as per the standard 60Plus premium subscription plan available at the time of activation.</li>
                <li>The benefit is non-transferable and cannot be exchanged for cash or any other service.</li>
                <li>The subscription will be activated only after successful verification of participant details.</li>
                <li>60Plus India reserves the right to modify service coverage based on operational availability in specific locations.</li>
                <li>Misuse, false information, or ineligibility may result in cancellation of the benefit.</li>
              </ul>

              <h3>7. WINNER SELECTION</h3>
              <ul>
                <li>Winners will be selected through a <strong>random computerized draw</strong></li>
                <li>Announcement Date: <strong>May 3, 2026</strong></li>
                <li>Winners will be notified via <strong>Email</strong></li>
              </ul>

              <h3>8. CLAIMING PRIZES</h3>
              <ul>
                <li>Winners must respond within <strong>7 days</strong></li>
                <li>Failure to respond will result in disqualification and selection of an alternate winner</li>
              </ul>

              <h3>9. DATA USAGE &amp; CONSENT (IMPORTANT – FULL COVERAGE)</h3>
              <p>By participating, you <strong>explicitly agree</strong> that:</p>
              <p><strong>Data Collection:</strong> We collect Name, Phone Number, Email Address, and Location.</p>
              <p><strong>Usage:</strong> Your data may be used for lead generation, customer support, service communication, and marketing &amp; promotions.</p>
              <p><strong>Communication Consent:</strong> You agree to be contacted via Email, Phone calls, SMS, and WhatsApp.</p>
              <p><strong>Data Protection:</strong> Your data will <strong>NOT be sold</strong> to third parties. Data is stored securely and used internally.</p>
              <p><strong>Opt-Out:</strong> You may unsubscribe anytime via email (reach@nurahub.com)</p>

              <h3>10. LIMITATION OF LIABILITY (CRITICAL SECTION)</h3>
              <p>By entering this contest, you agree that the organizer provides prizes <strong>“as-is” without warranty</strong>. 60Plus India is <strong>not responsible</strong> for product defects, misuse of prizes, or indirect/consequential damages.</p>
              <p><strong>Full Release:</strong> You release 60Plus India from any claims, losses, damages, and legal disputes.</p>

              <h3>11. TECHNICAL DISCLAIMER</h3>
              <p>The organizer is not responsible for QR code failures, network issues, submission errors, or delayed entries.</p>

              <h3>12. DISQUALIFICATION</h3>
              <p>Participants may be disqualified if they provide false/incomplete data, attempt fraud or manipulation, or violate any terms.</p>

              <h3>13. MODIFICATION RIGHTS</h3>
              <p>60Plus India reserves the right to modify, suspend, or cancel the contest at any time without prior notice due to fraud, technical issues, or external circumstances.</p>

              <h3>14. GOVERNING LAW</h3>
              <ul>
                <li>Governed by <strong>laws of India</strong></li>
                <li>Jurisdiction: <strong>Chennai, Tamil Nadu</strong></li>
              </ul>

              <h3>15. FINAL AGREEMENT</h3>
              <p>By participating, you confirm that:</p>
              <ul>
                <li>You have read and understood these Terms</li>
                <li>You agree to all conditions</li>
                <li>You consent to data usage and communication</li>
              </ul>

              <p className="terms-copyright"><strong>© 2026 60Plus India. All rights reserved.</strong></p>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="timer-band" aria-labelledby="timer-heading">
        <ScrollReveal>
          <div className="timer-inner">
            <p id="timer-heading" className="timer-label">
              <Zap size={14} aria-hidden />
              Draw has ended
              <Zap size={14} aria-hidden />
            </p>
            <div className="timer-ended">
              <h3>Entries are now closed</h3>
              <p>The lucky draw has ended. Winners will be announced on {winnersLabel}.</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="lottery-section bg-paper" aria-labelledby="showcase-heading">
        <div className="lottery-inner">
          <ScrollReveal>
            <div className="show-grid">
              <div className="show-visual">
                <motion.div
                  className="show-bowl"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src="/images/bowl.png" alt="Draw bowl for all entries" />
                  <span>Ten names · one moment</span>
                </motion.div>
              </div>
              <div className="show-text">
                <p className="lead font-display" id="showcase-heading">
                  Made for your parents, even when you're away
                </p>
                <p>
                  These are things that help your parents in their daily life from useful devices to regular care and support. 
                  We help with everyday needs like staying on schedule, tracking health, and getting help when needed.
                  Everything is chosen to keep them safe, comfortable, and well cared for in India.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="lottery-section bg-paper-2" aria-labelledby="who-heading">
        <div className="lottery-inner">
          <ScrollReveal className="section-head center">
            <p className="section-eyebrow">Who we are</p>
            <h2 id="who-heading" className="section-title font-display">
              60Plus India
            </h2>
            <p className="section-desc">
              The same mission, vision, and inspiration you will read on our About page - shared here so you know who
              runs this draw.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="who-grid">
              {aboutWhoWeAreSections.map((sec, idx) => (
                <motion.article
                  key={sec.badge}
                  className="who-card"
                  variants={fadeInVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={idx}
                  whileHover={{ y: -5 }}
                >
                  <span className="who-badge">{sec.badge}</span>
                  <h3 className="who-title font-display">{sec.title}</h3>
                  <p className="who-body">{sec.content}</p>
                </motion.article>
              ))}
            </div>
            <p className="who-more">
              <Link to="/about">Read the full About Us story →</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="lottery-section section-tight bg-ink" aria-label="Important dates">
        <div className="lottery-inner">
          <ScrollReveal>
            <div className="info-row">
              <motion.div className="info-tile" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
                <Calendar size={20} strokeWidth={1.75} aria-hidden />
                <h4 className="font-display">Closed on</h4>
                <p>{lastDateLabel}</p>
              </motion.div>
              <motion.div className="info-tile" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
                <Bell size={20} strokeWidth={1.75} aria-hidden />
                <h4 className="font-display">Announced on</h4>
                <p>{winnersLabel}</p>
              </motion.div>
              <motion.div className="info-tile" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
                <Inbox size={20} strokeWidth={1.75} aria-hidden />
                <h4 className="font-display">We&apos;ll write</h4>
                <p>Winners hear from us by email - check spam folders too.</p>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="lottery-form" ref={formRef} className="lottery-section section-tight bg-paper" aria-labelledby="form-heading">
        <div className="lottery-inner form-shell">
          <ScrollReveal>
            <div className="form-layout">
              <aside className="form-story show-text" aria-label="Why enter">
                <p className="lead font-display">60 seconds today. A better day for them tomorrow.</p>
                <p>
                  Even from miles away, a small step from you can make everyday life easier for your parents. This is
                  a simple chance to bring more comfort, support, and ease into their daily routine, without taking
                  more than a minute of your time.
                </p>
              </aside>
              <div className="form-panel">
                <h2 id="form-heading" className="font-display">
                  <Ticket size={22} aria-hidden />
                  Claim your spot in the draw
                </h2>
                <p className="form-intro">Takes less than a minute. One entry. One chance.</p>

                {isExpired && (
                  <div className="form-closed-banner">
                    <strong>Entries are now closed.</strong>
                    <p>The lucky draw has ended. Winners will be announced on {winnersLabel}.</p>
                  </div>
                )}

                <form onSubmit={onSubmit}>
                  <div className="form-grid">

                    {/* NAME */}
                    <div className="form-group span-2">
                      <label>Participant Name *</label>
                      <input
                        type="text"
                        className={`form-control ${formErrors.name ? "is-invalid" : ""} ${isExpired ? "disabled" : ""}`}
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        disabled={isExpired}
                      />
                      {formErrors.name && <p className="field-error">{formErrors.name}</p>}
                    </div>

                    {/* PHONE WITH PREFIX */}
                    <div className="form-group span-2" style={{ display: "flex", gap: "8px" }}>

                      <div style={{ minWidth: "120px" }}>
                        <label>Code *</label>
                        <select
                          className={`form-control ${isExpired ? "disabled" : ""}`}
                          value={form.countryCode}
                          onChange={(e) => onChange("countryCode", e.target.value)}
                          disabled={isExpired}
                        >
                          {countryCodes.map((c) => (
                            <option key={c.label} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ flex: 1 }}>
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          className={`form-control ${formErrors.phone ? "is-invalid" : ""} ${isExpired ? "disabled" : ""}`}
                          placeholder="Enter phone number"
                          value={form.phone}
                          onChange={(e) => onChange("phone", e.target.value)}
                          inputMode="numeric"
                          disabled={isExpired}
                        />
                        {formErrors.phone && <p className="field-error">{formErrors.phone}</p>}
                      </div>

                    </div>

                    {/* EMAIL */}
                    <div className="form-group span-2">
                      <label>Email ID *</label>
                      <input
                        type="email"
                        className={`form-control ${formErrors.email ? "is-invalid" : ""} ${isExpired ? "disabled" : ""}`}
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => onChange("email", e.target.value.toLowerCase())}
                        disabled={isExpired}
                      />
                      {formErrors.email && <p className="field-error">{formErrors.email}</p>}
                    </div>

                    {/* CITY OPTIONAL */}
                    <div className="form-group span-2">
                      <label>Parent Location (City)</label>
                      <input
                        type="text"
                        className={`form-control ${isExpired ? "disabled" : ""}`}
                        placeholder="Enter city (optional)"
                        value={form.city}
                        onChange={(e) => onChange("city", e.target.value)}
                        disabled={isExpired}
                      />
                    </div>

                  </div>
                  {apiError && <p className="field-error" style={{ textAlign: "center" }}>{apiError}</p>}
                  <motion.button
                    type="submit"
                    className="form-submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isExpired || isSubmitting}
                  >
                    {isExpired ? (
                      "Entries Closed"
                    ) : isSubmitting ? (
                      <>
                        <span className="loader" style={{ width: '16px', height: '16px', borderWidth: '2px', borderRightColor: 'transparent', marginRight: '8px' }}></span>
                        Processing...
                      </>
                    ) : (
                      "Enter the lucky draw →"
                    )}
                  </motion.button>
                  <p className="form-trust">
                    Includes eligibility for 60Plus subscription benefit.
                  </p>
                </form>
                <p className="form-foot">
                  By entering you accept our{" "}
                  <button type="button" onClick={() => setShowTermsModal(true)}>
                    Terms &amp; Conditions
                  </button>
                  .
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="lottery-section bg-paper-2" aria-labelledby="faq-heading">
        <div className="lottery-inner">
          <ScrollReveal className="section-head center">
            <p className="section-eyebrow">FAQ</p>
            <h2 id="faq-heading" className="section-title font-display">
              Questions about the draw
            </h2>
            <p className="section-desc">Quick answers; official policies are linked below.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="faq-wrap">
              {lotteryFaqItems.map((item, i) => {
                const open = faqOpen === i;
                return (
                  <motion.div
                    key={item.question}
                    className="faq-item"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  >
                    <button
                      type="button"
                      className="faq-q"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      onClick={() => setFaqOpen(open ? null : i)}
                    >
                      {item.question}
                      <ChevronDown className={`faq-chevron${open ? " is-open" : ""}`} size={22} aria-hidden />
                    </button>
                    <motion.div
                      className="faq-answer-wrap"
                      initial={false}
                      animate={{
                        height: open ? "auto" : 0,
                        opacity: open ? 1 : 0,
                      }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p
                        className="faq-a"
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        aria-hidden={!open}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
              {/* <p className="faq-policies">
                <Link to="/privacy-policy">Privacy Policy</Link>
                <span aria-hidden>·</span>
                <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
                <span aria-hidden>·</span>
                <Link to="/contact">Contact us</Link>
              </p> */}
            </div>
          </ScrollReveal>
        </div>
      </section>
      <Footer />

      {!isFormInView && (
        <div className="sticky-cta">
          <motion.button type="button" onClick={scrollToForm} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            Join the draw
          </motion.button>
        </div>
      )}

      {showSuccess && (
        <div className="success-message" role="alertdialog" aria-modal="true" aria-labelledby="lottery-success-title">
          <div className="success-message-card">
            <div className="success-icon-wrap">
              <CheckCircle color="#6e5633" size={34} aria-hidden />
            </div>
            <h3 id="lottery-success-title" className="font-display">You&apos;re in</h3>
            <p>
              Thank you for submitting your entry. You will receive a{" "}
              <span className="success-highlight">confirmation email</span> from{" "}
              <span className="success-highlight">60Plus India</span>.
            </p>
            <p>
              Winners will be <span className="success-highlight">notified via email</span> on{" "}
              <span className="success-highlight">{winnersLabel}</span>.
            </p>
            <button type="button" className="success-close-btn" onClick={closeSuccessModal}>
              Got it
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
