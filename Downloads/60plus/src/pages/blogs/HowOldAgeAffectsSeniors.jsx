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

const problems = [
  {
    n: "01",
    title: "Skyrocketing depression rates",
    desc: "Research indicates that roughly 30% of nursing home residents suffer from clinical depression — more than three times higher than older adults living in their own community setting. The institutional environment, lack of familiar stimuli, and loss of purpose are the primary drivers.",
  },
  {
    n: "02",
    title: "The isolation epidemic",
    desc: "The WHO notes that social isolation and loneliness affect about 1 in 4 older people and serves as a primary trigger for cognitive decline. India's Longitudinal Ageing Study (LASI) found that living arrangements are a predominant predictor of life satisfaction. Uprooting an elder severs ties with their neighborhood, shopkeepers, and familiar routines — and replaces them with a room full of strangers.",
  },
  {
    n: "03",
    title: "Loss of dignity and autonomy",
    desc: "In a facility, elders adapt to an institutional schedule — eating, sleeping, and socializing when the facility dictates. Psychological studies link loss of autonomy directly to feelings of helplessness and diminished self-worth. For a person who has lived independently for six or seven decades, this is not a minor inconvenience. It is a systematic erosion of identity.",
  },
  {
    n: "04",
    title: "Depersonalized, one-to-many care",
    desc: "Even in well-run old age homes, care is structured on a one-to-many ratio. Understaffing is a global issue in elder care, meaning residents often wait for basic assistance. Your parent — a person with decades of stories, preferences, and personality — becomes one of many. That loss of individual recognition has measurable psychological consequences.",
  },
];

const solutions = [
  {
    n: "01",
    title: "Preserving autonomy and dignity",
    desc: "Autonomy is the cornerstone of psychological health in aging. By staying at home, elders maintain control over their daily routines. They eat what they want, when they want, and retain ownership of their space. This continuous sense of independence drastically lowers the risk of clinical depression.",
  },
  {
    n: "02",
    title: "1-on-1 individualized attention",
    desc: "Unlike a facility where a nurse monitors a dozen residents, at-home care provides a 1-to-1 caregiver-to-patient ratio. This ensures immediate response times, personalized companionship, and care plans customized entirely to the elder's specific physical and emotional needs.",
  },
  {
    n: "03",
    title: "Maintaining community connections",
    desc: "Aging in place allows elders to remain tethered to their identity. They receive visits from familiar friends, attend their local temple or church, and sit on the porch they have known for decades. The WHO identifies these familiar social connections as vital for mental health, stress reduction, and ultimately extending lifespan.",
  },
  {
    n: "04",
    title: "Reduced risk of facility-acquired infections",
    desc: "Communal living environments are breeding grounds for infectious diseases due to close quarters. Aging at home significantly limits exposure to hospital-acquired infections and seasonal viruses — a particularly important consideration for seniors with compromised immunity.",
  },
];

const advantages = [
  {
    title: "Free home safety assessment",
    desc: "Our trained experts physically visit the home in Chennai, check every room against a comprehensive safety checklist, and deliver a detailed report to the family. The assessment is completely free and requires no commitment.",
  },
  {
    title: "24/7 emergency support",
    desc: "Our platform provides round-the-clock emergency response — immediate escalation, coordination with local hospitals, and real-time updates to family members anywhere in the world. Your parents are never truly alone.",
  },
  {
    title: "Regular updates for NRI families",
    desc: "NRI families stay informed through consistent updates on their parents' day-to-day wellbeing — without needing to be physically present. We bridge the distance between your love from abroad and their daily reality in Chennai.",
  },
];

export default function HowOldAgeAffectsSeniors() {
  const navigate = useNavigate();

  useMetaTags(
    "Why Old Age Homes Harm Your Parents More Than You Think | 60Plus India",
    "Research shows 30% of old age home residents suffer from depression — 3× higher than at-home seniors. See how in-home elder care in Chennai preserves your parents' dignity and mental health.",
    "old age homes Chennai, old age home effects, nursing home India, elder care at home Chennai, aging in place India, NRI parent care, senior home safety Chennai"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Why Old Age Homes Affect Your Parents Psychologically — What the Data Shows",
      description:
        "Research shows 30% of nursing home residents suffer from depression — 3× higher than seniors aging in place. A data-driven look at institutional care vs at-home elder care.",
      author: { "@type": "Organization", name: "60Plus India" },
      publisher: {
        "@type": "Organization",
        name: "60Plus India",
        logo: { "@type": "ImageObject", url: "https://www.60plusindia.com/logo/60_plus_india.png" },
      },
      datePublished: "2026-05-31",
      dateModified: "2026-05-31",
      url: "https://www.60plusindia.com/blogs/how-old-age-affects-seniors",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.60plusindia.com/blogs/how-old-age-affects-seniors",
      },
      keywords: "old age homes, elder care Chennai, nursing home India, aging in place",
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
            <span className="blg-eyebrow">Senior Care Research</span>
            <h1>
              Why Old Age Homes Affect<br />
              Your Parents More Than <em>You Think</em>
            </h1>
            <p className="blg-hero-sub">
              A data-driven look at how institutional care impacts elder mental health, dignity, and identity — and how aging in place at home changes everything.
            </p>
            <div className="blg-meta">
              <span className="blg-meta-item"><Calendar size={13} /> May 2026</span>
              <span className="blg-meta-item"><Clock size={13} /> 6 min read</span>
              <span className="blg-meta-item">By 60Plus India Research Team</span>
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
                  Deciding how to care for aging parents is one of the most emotionally heavy choices a family can make. Your goal — keeping them safe while preserving their happiness — is exactly what the data supports.
                </p>
                <p>
                  The research paints a stark contrast between the psychological outcomes of institutionalized care in old age homes and aging in place. When elders are removed from their familiar environments, the impact on their mental health, dignity, and sense of identity can be severe and lasting.
                </p>
              </div>
            </Reveal>

            {/* Stats strip */}
            <Reveal>
              <div className="blg-stats-strip">
                <div className="blg-stat">
                  <span className="blg-stat-num">30%</span>
                  <span className="blg-stat-label">of nursing home residents suffer from clinical depression</span>
                </div>
                <div className="blg-stat">
                  <span className="blg-stat-num">3×</span>
                  <span className="blg-stat-label">higher depression rates in institutional care vs community living</span>
                </div>
                <div className="blg-stat">
                  <span className="blg-stat-num">1 in 4</span>
                  <span className="blg-stat-label">older adults affected by isolation, per WHO — a leading cause of cognitive decline</span>
                </div>
              </div>
            </Reveal>

            {/* Section 1: Problems */}
            <Reveal>
              <span className="blg-section-tag">The research</span>
              <h2>The Reality of Institutional Care</h2>
              <div className="blg-prose">
                <p>
                  While old age homes provide physical safety, the institutional model often inadvertently compromises an elder's psychological well-being. Here is what the research actually shows.
                </p>
              </div>
            </Reveal>

            <div className="blg-points">
              {problems.map((pt, i) => (
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
                  <p className="blg-inline-cta-text">Is your parents' home in Chennai safe enough to age in?</p>
                  <span className="blg-inline-cta-sub">Our expert visits their home, checks every room, and sends you a complete safety report — for free.</span>
                </div>
                <button className="blg-inline-btn" onClick={goToAssessment}>
                  Book Free Assessment <ArrowRight size={15} />
                </button>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            {/* Section 2: Solutions */}
            <Reveal>
              <span className="blg-section-tag">The solution</span>
              <h2>How At-Home Care Prevents Cognitive and Emotional Decline</h2>
              <div className="blg-prose">
                <p>
                  Providing the medical and structural benefits of an old age home inside the elder's actual home — which is the core mission of <strong>60plusindia.com</strong> — directly counteracts these negative outcomes. Here is how each dimension of the problem is addressed.
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

            {/* Section 3: 60Plus Advantage */}
            <Reveal>
              <span className="blg-section-tag">The 60Plus India approach</span>
              <h2>Bringing Professional Care Into the Home</h2>
              <div className="blg-prose">
                <p>
                  Many families default to old age homes because they fear they cannot manage their parents' medical emergencies or daily physical needs alone. This is the exact gap that services like 60Plus India are built to fill.
                </p>
                <p>
                  By bringing professional caregiving, medical monitoring, and emergency response infrastructure directly into the home, families can give their parents the best of both worlds — the safety and professionalism of institutional care, with the dignity and warmth of being home.
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
                <h3>Is your parents' home safe to age in?</h3>
                <p className="blg-cta-card-sub">
                  Our trained expert visits their home in Chennai, checks every room for safety risks, and sends you a complete report. Completely free.
                </p>
                <button className="blg-cta-card-btn" onClick={goToAssessment}>
                  Book Free Assessment <ArrowRight size={15} />
                </button>
                <p className="blg-cta-card-note">
                  <Lock size={11} /> Free. No payment info needed.
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
            <span className="blg-final-pre">Take the first step</span>
            <h2>
              Your parents deserve to age<br />
              at home, with <em>dignity.</em>
            </h2>
            <p className="blg-final-sub">
              The research is clear: aging in place is far better for your parents' mental health, dignity, and well-being. We make it possible — even from the other side of the world.
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
