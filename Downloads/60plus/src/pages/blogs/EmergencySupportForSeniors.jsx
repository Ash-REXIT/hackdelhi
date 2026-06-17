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
  { n: "01", title: "Falls and Slips at Home", desc: "Falls are among the most common emergencies affecting older adults. Bathrooms, staircases, uneven flooring, and poor lighting can increase the risk of accidents. Even a minor fall can result in fractures, reduced mobility, long recovery periods, and a loss of confidence in performing everyday activities." },
  { n: "02", title: "Sudden Health Emergencies", desc: "Medical emergencies such as heart attacks, strokes, chest pain, breathing difficulties, and sudden weakness can occur without warning. In many cases, receiving immediate medical attention can significantly improve outcomes and reduce complications." },
  { n: "03", title: "Dizziness and Fainting Episodes", desc: "Dizziness may occur due to medication side effects, dehydration, low blood pressure, or underlying health conditions. When a senior loses balance or faints while alone, the risk of injury and delayed assistance increases considerably." },
  { n: "04", title: "Medication-Related Emergencies", desc: "Many seniors take multiple medications to manage ongoing health conditions. Missing doses, taking the wrong medication, or experiencing adverse drug reactions can sometimes lead to medical emergencies that require immediate attention." },
  { n: "05", title: "Existing Health Conditions Becoming Worse", desc: "Conditions such as diabetes, high blood pressure, arthritis, and heart disease often require continuous monitoring. Without proper observation and timely intervention, these conditions may suddenly worsen and create serious health risks." },
  { n: "06", title: "Difficulty Reaching Help During Emergencies", desc: "One of the biggest concerns during an emergency is the inability to contact someone for help. A senior experiencing a fall, illness, or medical complication may not always be able to reach a phone, call family members, or contact emergency services quickly." },
  { n: "07", title: "Family Living Far Away", desc: "Many adult children live in different cities or countries due to work and personal commitments. Although they care deeply about their parents, distance often makes it impossible to respond immediately during emergencies, creating additional stress and concern." },
];

const solutions = [
  { n: "01", title: "Health Monitoring & Check-ins", desc: "Scheduling regular wellness check-ins and monitoring ongoing health conditions can prevent sudden complications." },
  { n: "02", title: "Emergency Response Plan", desc: "Maintaining updated emergency contact information and creating a solid response plan ensures quick action when needed." },
  { n: "03", title: "Medication Management", desc: "Ensuring that daily medications are taken correctly prevents adverse reactions or worsening of chronic illnesses." },
  { n: "04", title: "Trusted Support Network", desc: "Building a reliable local support network and encouraging regular communication bridges the gap for families living far away." },
];

const advantages = [
  { title: "Wellness & Health Tracking", desc: "We provide regular wellness monitoring and medication tracking support to identify concerns before they become critical." },
  { title: "Emergency Assistance Coordination", desc: "We ensure seniors have rapid access to local support and assistance exactly when they need it most." },
  { title: "Caregiver & Family Communication", desc: "By keeping families informed and involved, we bring peace of mind to adult children living far away." },
  { title: "Ongoing Senior Support", desc: "Consistent check-ins and support help older adults continue living safely and confidently in their own homes." },
];

export default function EmergencySupportForSeniors() {
  const navigate = useNavigate();

  useMetaTags(
    "Emergency Support for Seniors: Why Every Senior Needs a Reliable Support System | 60Plus India",
    "Falls, heart attacks, and sudden dizziness — emergencies can happen without warning. Learn why every senior needs an emergency support plan and how 60Plus India helps.",
    "senior emergency support, emergency response elderly, senior safety Chennai, elder care emergencies, fall prevention seniors, NRI parent care"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Who Will Help in an Emergency? Why Every Senior Needs a Reliable Support System",
      description: "Emergencies can happen without warning. Learn why every senior needs an emergency support plan and how 60Plus India helps.",
      author: { "@type": "Organization", name: "60Plus India" },
      publisher: { "@type": "Organization", name: "60Plus India", logo: { "@type": "ImageObject", url: "https://www.60plusindia.com/logo/60_plus_india.png" } },
      datePublished: "2026-06-02", dateModified: "2026-06-02",
      url: "https://www.60plusindia.com/blogs/emergency-support-for-seniors",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.60plusindia.com/blogs/emergency-support-for-seniors" },
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
            <span className="blg-eyebrow">Senior Care Insights</span>
            <h1>Who Will Help in an Emergency?<br />Why Every Senior Needs a <em>Reliable Support System</em></h1>
            <p className="blg-hero-sub">Growing older often means adapting to changing health needs and new challenges. While many seniors continue to live active and independent lives, emergencies can happen without warning. A simple fall, sudden dizziness, chest pain, or an unexpected medical complication can quickly become a serious situation if help is not available nearby.</p>
            <div className="blg-meta">
              <span className="blg-meta-item"><Calendar size={13} /> June 02, 2026</span>
              <span className="blg-meta-item"><Clock size={13} /> 8 min read</span>
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
                <p>For families, especially those whose parents live alone, one of the biggest concerns is knowing who will be there when an emergency occurs. While regular phone calls and visits provide comfort, they cannot replace immediate assistance during a critical moment.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">The Reality</span>
              <h2>The Growing Importance of Emergency Support for Seniors</h2>
              <div className="blg-prose">
                <p>Medical emergencies become more common as people age. According to the World Health Organization (WHO), falls are one of the leading causes of injury-related hospitalization among older adults worldwide. In addition, chronic conditions such as diabetes, hypertension, heart disease, and respiratory illnesses can sometimes worsen unexpectedly and require urgent medical attention.</p>
                <p>The challenge becomes even greater for seniors who live alone or whose family members live far away. In many situations, the difference between a quick recovery and a serious health outcome depends on how quickly help arrives.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Key Warning Signs</span>
              <h2>Common Emergency Situations Seniors May Face</h2>
              <div className="blg-prose">
                <p>Emergencies can take many forms, and being aware of the most common risks is the first step in preparation.</p>
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

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Family Concerns</span>
              <h2>Why These Situations Should Not Be Ignored</h2>
              <div className="blg-prose">
                <p>Emergencies rarely happen according to a schedule. Many seniors appear healthy and independent until an unexpected incident occurs.</p>
                <p>A fall, missed medication, sudden illness, or worsening health condition may seem manageable initially, but delays in receiving assistance can increase the severity of the situation. For families, the uncertainty of not knowing whether their parents are safe can create ongoing anxiety and emotional stress.</p>
                <p>Recognizing these risks early allows families to prepare before an emergency occurs rather than reacting after the fact.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>Practical Solutions for Seniors and Families</h2>
              <div className="blg-prose">
                <p>The good news is that many emergency-related risks can be reduced through proper planning and support. Some practical measures include:</p>
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
                <p>At 60PlusIndia, we understand that emergencies are not just medical situations — they are moments when timely support can make a significant difference.</p>
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
                <h3>Is your parents' home safe to age in?</h3>
                <p className="blg-cta-card-sub">Our trained expert visits their home in Chennai, checks every room for safety risks, and sends you a complete report. Completely free.</p>
                <button className="blg-cta-card-btn" onClick={goToAssessment}>Book Free Assessment <ArrowRight size={15} /></button>
                <p className="blg-cta-card-note"><Lock size={11} /> Free. No payment info needed.</p>
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
            <h2>Your parents deserve to age<br />at home, with <em>dignity.</em></h2>
            <p className="blg-final-sub">Living independently is a beautiful and achievable goal. Independence doesn't mean facing difficulties alone. We make it possible — even from the other side of the world.</p>
            <button className="blg-final-btn" onClick={goToAssessment}>Book a Free Home Safety Assessment <ArrowRight size={16} /></button>
            <p className="blg-final-note"><Lock size={11} /> Completely free. For NRI families worldwide.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
