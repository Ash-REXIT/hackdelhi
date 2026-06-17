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
  { n: "01", title: "Ignoring Early Warning Signs", desc: "Many seniors experience symptoms such as fatigue, dizziness, joint pain, memory changes, vision problems, and sleep disturbances. Because these symptoms often develop gradually, they are frequently dismissed as normal ageing rather than potential warning signs of an underlying condition." },
  { n: "02", title: "Delaying Doctor Visits", desc: "Many older adults only seek medical attention when symptoms become severe enough to affect daily life. Reasons may include assuming symptoms are not serious, transportation difficulties, fear of diagnosis, long waiting times, or lack of support during appointments. Unfortunately, delayed medical care can allow manageable health concerns to progress into more serious conditions." },
  { n: "03", title: "Managing Multiple Health Conditions", desc: "Many seniors live with more than one chronic condition at the same time. In fact, the Longitudinal Ageing Study in India (LASI) reports that nearly 75% of older adults in India suffer from at least one chronic health condition, with roughly 40% managing multiple morbidities simultaneously. Common examples include diabetes, hypertension, arthritis, heart disease, and osteoporosis." },
  { n: "04", title: "Difficulty Keeping Track of Medical Information", desc: "Healthcare management becomes more complex when seniors have multiple prescriptions, diagnostic reports, lab results, follow-up schedules, and specialist consultations. Keeping track of this information can become overwhelming without proper support." },
  { n: "05", title: "Challenges Attending Appointments", desc: "Regular check-ups are essential, but attending appointments is not always easy. Many seniors face challenges such as transportation issues, scheduling difficulties, paperwork requirements, long clinic waiting times, and communication challenges during consultations." },
  { n: "06", title: "Lack of Preventive Healthcare Awareness", desc: "Many people associate healthcare with treating illness after it occurs rather than preventing it. As a result, routine screenings and preventive health assessments are often overlooked until symptoms become impossible to ignore." },
  { n: "07", title: "Missed Follow-Ups and Health Monitoring", desc: "A diagnosis is only the first step. Regular follow-up appointments and ongoing health monitoring are essential for tracking progress, adjusting treatments, and maintaining long-term health. Research from the National Institute on Aging (NIA) indicates that seniors who maintain consistent doctor visits have a 20% lower rate of preventable hospital admissions." },
];

const solutions = [
  { n: "01", title: "Encourage Screenings", desc: "Encouraging routine health screenings ensures that potential issues are caught long before symptoms appear." },
  { n: "02", title: "Monitor Health Changes", desc: "Monitoring subtle changes in health and behaviour helps identify warning signs that a senior might ignore." },
  { n: "03", title: "Maintain Medical Records", desc: "Maintaining organized medical records prevents errors and simplifies consultations with multiple specialists." },
  { n: "04", title: "Support Appointments", desc: "Supporting appointment scheduling and follow-ups removes logistical barriers that cause seniors to delay care." },
];

const advantages = [
  { title: "Wellness Monitoring", desc: "Regular wellness monitoring and check-ins to catch minor issues before they escalate." },
  { title: "Doctor Visit Support", desc: "Assistance with doctor visits and appointment scheduling, including transportation and companionship." },
  { title: "Healthcare Coordination", desc: "Complete healthcare coordination and dedicated follow-up support to track treatment progress." },
  { title: "Medication Management", desc: "Assistance with medication management to ensure prescriptions are filled and taken consistently." },
  { title: "Home Visit Support", desc: "Home visit support when required, ensuring safety and comfort without the need to travel." },
  { title: "Family Updates", desc: "Transparent family updates regarding health and well-being, keeping you informed regardless of distance." },
];

export default function RegularHealthCheckupsForSeniors() {
  const navigate = useNavigate();

  useMetaTags(
    "Don't Wait Until It's Serious: Why Regular Health Check-Ups Matter for Seniors | 60Plus India",
    "As we grow older, our bodies communicate health concerns through small warning signs. What appears minor today can become serious tomorrow if left unchecked. Learn the importance of preventive healthcare.",
    "senior health checkups, preventive healthcare India, elderly doctor visits, medication management seniors, senior wellness monitoring, elder care Chennai"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: "Don't Wait Until It's Serious: Why Regular Health Check-Ups and Timely Medical Care Matter for Seniors",
      description: "What appears minor today can become serious tomorrow. Learn the importance of preventive healthcare for seniors.",
      author: { "@type": "Organization", name: "60Plus India" },
      publisher: { "@type": "Organization", name: "60Plus India", logo: { "@type": "ImageObject", url: "https://www.60plusindia.com/logo/60_plus_india.png" } },
      datePublished: "2026-06-04", dateModified: "2026-06-04",
      url: "https://www.60plusindia.com/blogs/regular-health-checkups-for-seniors",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.60plusindia.com/blogs/regular-health-checkups-for-seniors" },
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
            <span className="blg-eyebrow">Preventive Healthcare</span>
            <h1>Don't Wait Until It's Serious: Why Regular Health Check-Ups<br />and Timely Medical Care Matter for <em>Seniors</em></h1>
            <p className="blg-hero-sub">As we grow older, our bodies often communicate health concerns through small warning signs. A little fatigue, occasional dizziness, joint discomfort, changes in vision, or mild memory lapses may seem insignificant at first. Because these symptoms develop gradually, many seniors assume they are simply a normal part of ageing.</p>
            <div className="blg-meta">
              <span className="blg-meta-item"><Calendar size={13} /> June 04, 2026</span>
              <span className="blg-meta-item"><Clock size={13} /> 7 min read</span>
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
                <p>However, what appears to be a minor issue today can sometimes become a serious health condition tomorrow if left unchecked. Regular health check-ups and timely medical care play a crucial role in identifying problems early, improving treatment outcomes, and helping seniors maintain their independence and quality of life.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Preventive Healthcare</span>
              <h2>The Importance of Preventive Healthcare for Seniors</h2>
              <div className="blg-prose">
                <p>Preventive healthcare focuses on identifying potential health issues before they become serious. According to the World Health Organization (WHO), chronic diseases such as heart disease, diabetes, stroke, and respiratory illnesses account for over 70% of all deaths globally, making them the leading causes of illness and mortality, particularly among older adults. The United Nations Population Fund (UNFPA) India Ageing Report 2023 projects that India's elderly population will double to reach 347 million by 2050.</p>
                <p>Many of these conditions develop slowly and may not show obvious symptoms in their early stages. Routine health screenings, doctor consultations, and regular monitoring help detect concerns before they become difficult to manage.</p>
                <p>For seniors, preventive care is not just about treating illness — it is about staying healthier for longer and reducing the risk of complications.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Key Challenges</span>
              <h2>Common Healthcare Challenges Faced by Seniors</h2>
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
              <span className="blg-section-tag">Proactive Care</span>
              <h2>Why Early Detection Matters</h2>
              <div className="blg-prose">
                <p>Many serious health conditions are easier to manage when detected early. Regular health check-ups can help identify:</p>
                <ul>
                  <li><strong>High blood pressure before complications occur.</strong> Data from the Ministry of Health & Family Welfare indicates that over 30% of India's elderly population suffers from hypertension — a "silent killer" that often goes completely unnoticed without routine blood pressure screenings.</li>
                  <li><strong>Elevated blood sugar levels before diabetes worsens.</strong> The WHO warns that early detection through regular blood sugar testing is critical, as uncontrolled diabetes in seniors rapidly accelerates complications like vision loss and kidney disease.</li>
                  <li><strong>Vision or hearing issues</strong> before they impact daily life.</li>
                  <li><strong>Heart-related concerns before they become emergencies.</strong> The CDC warns that adults over 65 who miss regular cardiovascular check-ups are at a significantly higher risk of experiencing a sudden, life-threatening stroke or heart attack.</li>
                  <li><strong>Mobility problems</strong> before they lead to falls.</li>
                </ul>
                <p>Early intervention often results in better health outcomes, lower healthcare costs, and improved quality of life.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>Practical Steps Families Can Take</h2>
              <div className="blg-prose">
                <p>Families can actively support seniors by implementing structured routines and seeking necessary help. These steps include:</p>
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
                <p>At 60PlusIndia, we believe that proactive healthcare is one of the most effective ways to support healthy ageing. Our services help seniors stay on top of their healthcare needs, completely removing the logistical burden. By helping seniors access timely medical care and ongoing health monitoring, we support healthier, safer, and more independent ageing.</p>
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
                <p className="blg-cta-card-sub">From wellness check-ins and doctor visits to companionship and emergency response, our trained senior care team helps families bridge the distance and ensures your loved ones get the best support.</p>
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
            <h2>Proactive Care Starts<br /><em>Today</em></h2>
            <p className="blg-final-sub">By helping seniors access timely medical care and ongoing health monitoring, we support healthier, safer, and more independent ageing. 60PlusIndia provides wellness monitoring, appointment assistance, and immediate emergency response when you can't be there.</p>
            <button className="blg-final-btn" onClick={goToAssessment}>Get Started with 60PlusIndia <ArrowRight size={16} /></button>
            <p className="blg-final-note"><Lock size={11} /> Completely free. For NRI families worldwide.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
