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
  { n: "01", title: "Changes in Personal Hygiene", desc: "Reduced attention to grooming, cleanliness, or appearance can be a subtle indicator that a senior is struggling physically or emotionally." },
  { n: "02", title: "Unexplained Weight Loss or Poor Eating Habits", desc: "Skipping meals, reduced appetite, or finding it difficult to prepare food can be an early sign of physical decline or cognitive changes." },
  { n: "03", title: "Increasing Forgetfulness", desc: "Missing medications, forgetting appointments, or repeating conversations. The CDC reports that over 50% of older adults struggle with medication adherence, a hidden issue that can quickly lead to serious health complications if left unmonitored." },
  { n: "04", title: "Reduced Mobility and Activity Levels", desc: "Spending more time indoors, avoiding stairs, or skipping activities they once genuinely enjoyed can signal pain or a fear of falling." },
  { n: "05", title: "Changes in Mood or Behaviour", desc: "Irritability, sudden withdrawal, sadness, or an uncharacteristic loss of interest in hobbies." },
  { n: "06", title: "Home Maintenance Being Neglected", desc: "Household chores, repairs, and basic cleaning becoming noticeably difficult for them to manage independently." },
  { n: "07", title: "Avoiding Discussions About Health", desc: "Actively downplaying symptoms or outright avoiding conversations about upcoming medical concerns." },
  { n: "08", title: "Reluctance to Ask for Help", desc: "Wanting to remain independent at all costs, even when it is overwhelmingly clear that support is needed." },
];

const solutions = [
  { n: "01", title: "Engage in Meaningful Conversations", desc: "Having regular and meaningful conversations to gauge their true emotional state." },
  { n: "02", title: "Observe Routines", desc: "Paying close attention to unexplained changes in behaviour, hygiene, and daily routines." },
  { n: "03", title: "Schedule Wellness Check-Ins", desc: "Scheduling regular wellness check-ins to monitor medication and healthcare needs." },
  { n: "04", title: "Build a Local Support System", desc: "Addressing concerns early and building a trusted local support network before larger problems arise." },
];

const advantages = [
  { title: "Regular Wellness Check-Ins", desc: "Our wellness check-ins provide a clearer picture of how seniors are doing beyond occasional phone calls. Regular interactions help identify small changes in health, behaviour, and daily routines that families may not otherwise notice." },
  { title: "Ongoing Observation and Support", desc: "Many age-related challenges develop gradually. Through consistent engagement, we help identify potential concerns early, allowing families to take proactive steps before situations become more serious." },
  { title: "Companionship and Interaction", desc: "Regular conversations create opportunities for seniors to share concerns, discuss challenges, and stay emotionally connected. This helps reduce isolation while improving overall well-being." },
  { title: "Health Monitoring", desc: "Changes in mobility, eating habits, medication routines, or general health can indicate that additional support is needed. We help families stay informed through ongoing monitoring and observation." },
  { title: "Family Updates", desc: "For children living away from their parents, regular updates provide reassurance and peace of mind. We help families remain informed about their loved one's well-being and daily life." },
  { title: "Personalized Senior Support", desc: "We adapt to your parents' needs. By addressing concerns early, our personalized care plans ensure that small issues do not escalate into emergencies." },
];

export default function ParentsSayTheyreFine() {
  const navigate = useNavigate();

  useMetaTags(
    "Your Parents Say They're Fine — But Are They Really? | 60Plus India",
    "NIA research shows older adults frequently downplay health concerns. Learn the subtle, often overlooked signs that your parents may need help — from changes in hygiene to hidden loneliness.",
    "parents hiding health issues, senior warning signs, elderly living alone, NRI parent care, senior wellness check-ins, elder care Chennai"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: "Your Parents Say They're Fine — But Are They Really?",
      description: "Learn the subtle signs that your ageing parents may need help, even when they say they're fine.",
      author: { "@type": "Organization", name: "60Plus India" },
      publisher: { "@type": "Organization", name: "60Plus India", logo: { "@type": "ImageObject", url: "https://www.60plusindia.com/logo/60_plus_india.png" } },
      datePublished: "2026-06-04", dateModified: "2026-06-04",
      url: "https://www.60plusindia.com/blogs/parents-say-theyre-fine",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.60plusindia.com/blogs/parents-say-theyre-fine" },
    });
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch (_) {} };
  }, []);

  const goToAssessment = () => navigate("/book-free-senior-home-safety-assessment");

  return (
    <div className="blg">
      <Navbar alwaysWhite />

      <section className="blg-hero">
        <div className="blg-hero-inner">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <span className="blg-eyebrow">Family Awareness</span>
            <h1>Your Parents Say They're Fine—But<br />Are They <em>Really?</em></h1>
            <p className="blg-hero-sub">Many ageing parents take pride in being independent and self-reliant. Even when they face difficulties, they often reassure their children by saying, "I'm fine, don't worry." While these words are comforting, they do not always reflect the reality of what is happening in their daily lives.</p>
            <div className="blg-meta">
              <span className="blg-meta-item"><Calendar size={13} /> June 04, 2026</span>
              <span className="blg-meta-item"><Clock size={13} /> 6 min read</span>
              <span className="blg-meta-item">By 60Plus India Care Team</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="blg-body">
        <div className="blg-layout">
          <article className="blg-article">
            <Reveal>
              <div className="blg-prose">
                <p>Parents may avoid discussing challenges because they do not want to burden their children, especially when they live far away. Research from the National Institute on Aging (NIA) supports this, showing that older adults frequently downplay or hide health concerns to maintain their sense of independence. As a result, small problems can remain hidden until they become more serious concerns affecting health, safety, and overall well-being.</p>
                <p>This blog will focus on the subtle, often overlooked signs that families need to watch out for.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Warning Signs</span>
              <h2>Signs That Families May Overlook</h2>
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

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">The Hidden Factor</span>
              <h2>Why Seniors Hide Their Struggles</h2>
              <div className="blg-prose">
                <p>Why do parents hide these struggles? Often, it stems from isolation. The World Health Organization (WHO) reports that around 1 in 4 older people are socially isolated and around 1 in 10 experience severe loneliness. When living alone with poor social support, the risk of related health challenges skyrockets.</p>
                <p>In India, the Longitudinal Ageing Study in India (LASI) highlights that nearly 20% of the elderly live alone or solely with a spouse. Studies across India have found loneliness to be a significant concern, reporting rates around 40% in surveyed elderly populations. Research clearly shows this social isolation and loneliness can significantly affect physical health, mental health, and overall quality of life.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>How Families Can Look Beyond Reassurances</h2>
              <div className="blg-prose">
                <p>Families should look beyond simple reassurances and stay actively involved in their parents' lives. Early awareness allows families to provide support before small issues affect a parent's independence. Practical steps include:</p>
              </div>
            </Reveal>

            <div className="blg-solutions">
              {solutions.map((s, i) => (
                <Reveal key={s.n} custom={i}>
                  <div>
                    <span className="blg-solution-num">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p className="blg-solution-desc">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">The 60Plus India Approach</span>
              <h2>How 60PlusIndia Helps</h2>
              <div className="blg-prose">
                <p>Every senior's needs are different. Our services are designed to provide the right balance of support, independence, dignity, and care based on each individual's unique circumstances.</p>
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

          <aside className="blg-sidebar">
            <Reveal>
              <div className="blg-cta-card">
                <h3>Are you constantly worried about your parents back home?</h3>
                <p className="blg-cta-card-sub">From regular wellness check-ins to health monitoring and emotional companionship, our trained senior care team helps families bridge the distance and ensures your loved ones are truly supported.</p>
                <button className="blg-cta-card-btn" onClick={goToAssessment}>Book a Free Consultation <ArrowRight size={15} /></button>
                <p className="blg-cta-card-note"><Lock size={11} /> Free senior care guidance. No obligation.</p>
              </div>
            </Reveal>
            <Reveal custom={1}>
              <div className="blg-sidebar-context">
                <p><strong>60Plus India</strong> operates on the ground in Chennai with trained care executives, 24/7 emergency support, and 21+ elder care services — built for NRI families worldwide.</p>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      <section className="blg-final-cta">
        <Reveal>
          <div className="blg-final-cta-inner">
            <span className="blg-final-pre">Take the first step</span>
            <h2>Look Beyond "I'm Fine"<br /><em>Reach Out Today</em></h2>
            <p className="blg-final-sub">By helping seniors stay connected and monitored through our trusted wellness check-ins, we support healthier, safer, and more transparent ageing. We provide ongoing observation and immediate support when you can't be there.</p>
            <button className="blg-final-btn" onClick={goToAssessment}>Get Started with 60PlusIndia <ArrowRight size={16} /></button>
            <p className="blg-final-note"><Lock size={11} /> Completely free. For NRI families worldwide.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
