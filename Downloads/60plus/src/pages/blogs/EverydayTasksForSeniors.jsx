import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Lock, Clock, Calendar } from "lucide-react";
import Navbar from "../../components/Navbar";
import useMetaTags from "../../hooks/useMetaTags";
import "./blog.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Reveal({ children, className = "", custom = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div ref={ref} className={className} custom={custom}
      variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

const points = [
  {
    n: "01",
    title: "Forgetting Medications",
    desc: "Missing doses or taking the wrong medication at the wrong time can have serious health consequences. As the number of prescriptions increases with age, managing a complex medication schedule becomes a significant daily challenge for many seniors.",
  },
  {
    n: "02",
    title: "Difficulty Managing Household Tasks",
    desc: "Cleaning, cooking, laundry, and maintaining a home require physical energy and mobility. Tasks that were once routine — sweeping floors, changing bed sheets, or cooking a full meal — can become exhausting or even hazardous for seniors with reduced strength or balance issues.",
  },
  {
    n: "03",
    title: "Grocery Shopping and Running Errands",
    desc: "Carrying heavy bags, navigating crowded stores, driving in traffic, or standing in long queues can be physically demanding. Many seniors gradually start skipping grocery trips or rely on whatever is available nearby, which can affect their nutrition and overall health.",
  },
  {
    n: "04",
    title: "Attending Medical Appointments Alone",
    desc: "Regular check-ups, diagnostic tests, and follow-up visits are essential for managing chronic conditions. However, getting to appointments, understanding medical advice, remembering instructions, and coordinating between multiple specialists can overwhelm seniors who live alone.",
  },
  {
    n: "05",
    title: "Managing Multiple Health Conditions",
    desc: "Many older adults live with two or more chronic conditions such as diabetes, hypertension, arthritis, or heart disease. Coordinating treatments, monitoring symptoms, and communicating effectively with different doctors requires significant effort and organization.",
  },
  {
    n: "06",
    title: "Reduced Mobility and Physical Strength",
    desc: "Age-related muscle loss, joint stiffness, and balance issues can make everyday movements — climbing stairs, getting in and out of bed, or reaching for items on high shelves — progressively more difficult and potentially dangerous.",
  },
  {
    n: "07",
    title: "Forgetfulness and Memory Challenges",
    desc: "Mild memory changes are a normal part of aging, but they can lead to real-world difficulties — forgetting to turn off the stove, leaving doors unlocked, missing bill payments, or losing track of important dates and commitments.",
  },
  {
    n: "08",
    title: "Loneliness and Reduced Social Interaction",
    desc: "Living alone without regular social contact can lead to emotional isolation. The loss of a spouse, friends moving away, or children living in different cities can leave seniors without meaningful daily interaction, which takes a serious toll on mental health.",
  },
  {
    n: "09",
    title: "Difficulty Handling Unexpected Situations",
    desc: "A sudden power outage, a plumbing issue, a fall in the bathroom, or an unexpected medical emergency — situations that a younger person might handle quickly can become major crises for a senior living alone without immediate support.",
  },
];

const solutions = [
  {
    n: "01",
    title: "Medication & Health Monitoring",
    desc: "Set up pill organizers, alarm reminders, or automated medication dispensers. Regular check-ins from a family member or caregiver can ensure medications are being taken correctly. Pharmacies can also synchronize multiple prescriptions for easier pick-up.",
  },
  {
    n: "02",
    title: "Daily Tasks & Errands",
    desc: "Arrange for help with household chores, grocery shopping, and errands. This could be a family member, a trusted neighbor, or a professional home care service. Even part-time assistance with cooking and cleaning can significantly reduce daily strain.",
  },
  {
    n: "03",
    title: "Healthcare Coordination",
    desc: "Help your loved one maintain a health file — a simple folder or digital document that tracks all doctors, prescriptions, test results, and upcoming appointments. Accompany them to visits when possible, or arrange for someone to go in your place.",
  },
  {
    n: "04",
    title: "Social Interaction & Companionship",
    desc: "Loneliness is as harmful to health as smoking 15 cigarettes a day, according to research. Encourage participation in community activities, senior groups, or hobby clubs. Regular phone calls, video chats, and in-person visits from family provide essential emotional connection.",
  },
  {
    n: "05",
    title: "Routine Wellness Check-ins",
    desc: "Establish a consistent schedule of check-ins — whether daily phone calls, weekly visits, or scheduled video calls. These check-ins serve a dual purpose: they catch emerging issues early and provide your loved one with something reliable to look forward to.",
  },
  {
    n: "06",
    title: "Reliable Support Network",
    desc: "Build a network of people your loved one can rely on — neighbors, nearby family members, community volunteers, or a professional elder care service. Having multiple points of contact ensures that help is always within reach, even when you cannot be there.",
  },
];

const advantages = [
  {
    title: "Medication Reminders & Monitoring",
    desc: "Our care executives provide timely medication reminders and monitor adherence, ensuring your loved one never misses a dose. We track medication schedules and flag any concerns to the family immediately.",
  },
  {
    title: "Doctor Visit Assistance",
    desc: "We accompany seniors to medical appointments, help them understand doctor's instructions, and ensure follow-up actions are completed. Families receive a summary of every visit so they stay informed.",
  },
  {
    title: "Companionship & Emotional Support",
    desc: "Regular companionship visits from our trained care executives help combat loneliness and keep seniors socially engaged. Meaningful conversation and emotional connection are at the heart of what we do.",
  },
  {
    title: "Regular Check-ins",
    desc: "Scheduled check-ins — both in-person and over the phone — give families peace of mind that their loved one is safe, healthy, and doing well. Any changes in condition or behavior are communicated promptly.",
  },
  {
    title: "Day-to-Day Activity Assistance",
    desc: "From grocery shopping and meal preparation to household chores and running errands, our team assists with the daily tasks that become harder with age — helping seniors maintain their routine and independence.",
  },
  {
    title: "Family Updates & Coordination",
    desc: "Families, especially those living abroad, receive regular updates on their loved one's wellbeing. We act as your eyes and ears on the ground, coordinating care and keeping everyone informed.",
  },
  {
    title: "Senior Support Services",
    desc: "Beyond daily care, we offer a comprehensive range of elder care services — including emergency support, home safety assessments, and wellness programs — all designed to help seniors live independently and safely at home.",
  },
];

export default function EverydayTasksForSeniors() {
  const navigate = useNavigate();

  useMetaTags(
    "When Everyday Tasks Become Harder: A Guide for Seniors Living Independently | 60Plus India",
    "As we age, everyday tasks can become challenging. From medication management to grocery shopping, learn how to support seniors living independently with practical solutions.",
    "seniors living independently, daily tasks elderly, elder care support, senior medication management, grocery help seniors, companion services Chennai"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "When Everyday Tasks Become Harder: A Guide for Seniors Living Independently",
      description:
        "As we age, everyday tasks can become challenging. From medication management to grocery shopping, learn how to support seniors living independently with practical solutions.",
      author: { "@type": "Organization", name: "60Plus India" },
      publisher: {
        "@type": "Organization",
        name: "60Plus India",
        logo: { "@type": "ImageObject", url: "https://www.60plusindia.com/logo/60_plus_india.png" },
      },
      datePublished: "2026-06-02",
      dateModified: "2026-06-02",
      url: "https://www.60plusindia.com/blogs/everyday-tasks-for-seniors",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.60plusindia.com/blogs/everyday-tasks-for-seniors",
      },
      keywords: "seniors living independently, daily tasks elderly, elder care support, senior medication management",
    });
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch (_) {} };
  }, []);

  const goToAssessment = () => navigate("/book-free-senior-home-safety-assessment");

  return (
    <div className="blg">
      <Navbar alwaysWhite />

      {/* ══════ HERO ══════ */}
      <section className="blg-hero">
        <div className="blg-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <span className="blg-eyebrow">Senior Care Insights</span>
            <h1>
              When Everyday Tasks Become Harder:<br />
              A Guide for Seniors Living <em>Independently</em>
            </h1>
            <p className="blg-hero-sub">
              Many older adults value their independence and take pride in managing their daily lives on their own. Living independently can provide a sense of freedom, confidence, and dignity. However, as we age, everyday tasks that once felt simple can gradually become more challenging.
            </p>
            <div className="blg-meta">
              <span className="blg-meta-item"><Calendar size={13} /> June 02, 2026</span>
              <span className="blg-meta-item"><Clock size={13} /> 8 min read</span>
              <span className="blg-meta-item">By 60Plus India</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════ BODY ══════ */}
      <div className="blg-body">
        <div className="blg-layout">

          {/* ─── ARTICLE ─── */}
          <article className="blg-article">

            {/* Intro */}
            <Reveal>
              <div className="blg-prose">
                <p>
                  These changes often happen slowly and may go unnoticed by both seniors and their families. Physical limitations, health conditions, reduced mobility, memory-related concerns, or the absence of nearby support can make daily life more difficult over time.
                </p>
              </div>
            </Reveal>

            {/* Section 1: Key Warning Signs */}
            <Reveal>
              <span className="blg-section-tag">Key Warning Signs</span>
              <h2>Common Challenges Seniors Face While Living Independently</h2>
              <div className="blg-prose">
                <p>
                  Recognizing these challenges early can help families take proactive steps before a minor difficulty becomes a serious safety concern. Here are the most common warning signs to watch for.
                </p>
              </div>
            </Reveal>

            <div className="blg-points">
              {points.map((pt, i) => (
                <Reveal key={pt.n} custom={i}>
                  <div className="blg-point">
                    <span className="blg-point-num">{pt.n}</span>
                    <div>
                      <p className="blg-point-title">{pt.title}</p>
                      <p className="blg-point-desc">{pt.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Inline CTA */}
            <Reveal>
              <div className="blg-inline-cta">
                <div>
                  <p className="blg-inline-cta-text">Not sure if your loved one needs extra support?</p>
                  <span className="blg-inline-cta-sub">Our free home safety assessment identifies risks and recommends solutions — tailored to your family's situation.</span>
                </div>
                <button className="blg-inline-btn" onClick={goToAssessment}>
                  Book Free Assessment <ArrowRight size={15} />
                </button>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            {/* Section 2: Practical Solutions */}
            <Reveal>
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>How Families Can Help</h2>
              <div className="blg-prose">
                <p>
                  The good news is that many of these challenges can be addressed with simple, practical steps. Whether you live nearby or far away, there are meaningful ways to support your loved one's independence while ensuring their safety and wellbeing.
                </p>
              </div>
            </Reveal>

            <div className="blg-solutions">
              {solutions.map((s, i) => (
                <Reveal key={s.n} custom={i}>
                  <div>
                    <span className="blg-solution-num">{s.n}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a0a2e', marginBottom: 10, lineHeight: 1.3 }}>
                      {s.title}
                    </h3>
                    <p className="blg-solution-desc">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <hr className="blg-divider" />

            {/* Section 3: 60Plus India Approach */}
            <Reveal>
              <span className="blg-section-tag">The 60Plus India Approach</span>
              <h2>How 60PlusIndia Helps</h2>
              <div className="blg-prose">
                <p>
                  For families who cannot be physically present every day — especially those living abroad or in different cities — professional elder care support can bridge the gap between your concern and your loved one's daily reality.
                </p>
                <p>
                  <strong>60Plus India</strong> provides on-the-ground care services designed specifically for seniors who want to continue living independently at home, with the right support to do so safely and comfortably.
                </p>
              </div>
            </Reveal>

            <div className="blg-advantages">
              {advantages.map((a, i) => (
                <Reveal key={a.title} custom={i}>
                  <div className="blg-advantage">
                    <h3>{a.title}</h3>
                    <p className="blg-advantage-desc">{a.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </article>

          {/* ─── SIDEBAR ─── */}
          <aside className="blg-sidebar">
            <Reveal>
              <div className="blg-cta-card">
                <h3>Are everyday tasks becoming harder for your loved one?</h3>
                <p className="blg-cta-card-sub">
                  From medication reminders to doctor visit assistance, 60Plus India provides the daily support your loved one needs to live safely and independently at home.
                </p>
                <button className="blg-cta-card-btn" onClick={goToAssessment}>
                  Book a Free Consultation <ArrowRight size={15} />
                </button>
                <p className="blg-cta-card-note">
                  <Lock size={11} /> Free senior care guidance. No obligation.
                </p>
              </div>
            </Reveal>
            <Reveal custom={1}>
              <div className="blg-sidebar-context">
                <p>
                  <strong>60Plus India</strong> operates on the ground in Chennai with trained care executives, 24/7 emergency support, and 21+ elder care services — built for NRI families worldwide.
                </p>
              </div>
            </Reveal>
          </aside>

        </div>
      </div>

      {/* ══════ FINAL CTA ══════ */}
      <section className="blg-final-cta">
        <Reveal>
          <div className="blg-final-cta-inner">
            <span className="blg-final-pre">You don't have to do this alone</span>
            <h2>
              Independent Living Shouldn't<br />
              Mean Living <em>Alone</em>
            </h2>
            <p className="blg-final-sub">
              With the right support, seniors can continue to live independently at home — safely, comfortably, and with dignity. Let us help you give your loved one the care they deserve.
            </p>
            <button className="blg-final-btn" onClick={goToAssessment}>
              Book a Free Home Safety Assessment <ArrowRight size={16} />
            </button>
            <p className="blg-final-note">
              <Lock size={11} /> Completely free. For NRI families worldwide.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
