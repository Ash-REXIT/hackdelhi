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
  { n: "01", title: "Poor Lighting", desc: "Good visibility is essential for preventing accidents. Dim hallways, poorly lit staircases, shadowed corners, and inadequate lighting near entrances can significantly increase the risk of trips and falls. The National Institute on Aging (NIA) notes that by age 65, individuals generally require up to three times more light to see clearly than they did at age 20, making poor lighting a primary cause of home accidents." },
  { n: "02", title: "Slippery Floors and Bathrooms", desc: "Bathrooms are among the most common locations for household accidents. According to the Centers for Disease Control and Prevention (CDC), nearly 80% of falls in the home occur in the bathroom. Wet floors, smooth tiles, slippery surfaces, and the absence of support rails can drastically increase the likelihood of life-altering injuries." },
  { n: "03", title: "Cluttered Walkways", desc: "Items such as loose rugs, electrical cords, misplaced furniture, and household clutter may seem harmless but can create serious tripping hazards. As mobility and balance change with age, maintaining clear and accessible pathways becomes increasingly important." },
  { n: "04", title: "Staircase Safety Issues", desc: "Stairs can become challenging for seniors experiencing reduced strength, balance, or mobility. Poor lighting, missing handrails, uneven steps, or carrying objects while using stairs can increase the risk of accidents." },
  { n: "05", title: "Hard-to-Reach Storage Areas", desc: "Many seniors continue to store household items on high shelves or in difficult-to-access locations. Stretching, climbing on stools, or reaching overhead can increase the risk of losing balance and falling." },
  { n: "06", title: "Lack of Emergency Preparedness", desc: "A UNFPA India report highlights that over 50% of elderly individuals lack a structured emergency response plan at home. Missing emergency contact information, inaccessible phones, or the absence of basic emergency supplies can delay assistance when it is needed most." },
  { n: "07", title: "Mobility Challenges Within the Home", desc: "As mobility changes with age, certain home layouts may become more difficult to navigate. Narrow hallways, uneven flooring, tight spaces, and inaccessible areas can make moving around the home more challenging and increase the risk of injury." },
  { n: "08", title: "Living Alone in an Unsafe Environment", desc: "Many seniors live independently and may not have someone nearby to identify potential safety concerns. The LASI indicates that approximately 20% of India's elderly live alone or with only their spouse, severely limiting access to immediate help when an unexpected home emergency occurs." },
];

const solutions = [
  { n: "01", title: "Assess Regularly", desc: "Conducting regular home safety assessments helps catch new hazards as they develop." },
  { n: "02", title: "Improve Visibility", desc: "Improving lighting throughout the home, especially on stairs and in hallways, drastically reduces tripping risks." },
  { n: "03", title: "Secure Bathrooms", desc: "Ensuring bathrooms are safe by installing grab bars and removing slippery mats is a proven lifesaver." },
  { n: "04", title: "Prepare for Emergencies", desc: "Reviewing emergency preparedness measures and having plans in place offers peace of mind for everyone." },
];

const advantages = [
  { title: "Home Safety Assessments", desc: "Our team helps identify potential safety concerns within the home environment. By evaluating common risk areas and providing practical recommendations, we help families create a safer and more comfortable living space." },
  { title: "Regular Wellness Check-Ins", desc: "Regular interactions help us understand how seniors are managing within their home environment. These check-ins can help identify emerging challenges before they become larger safety concerns." },
  { title: "Identification of Concerns", desc: "Changes in mobility, daily routines, or living conditions may indicate new risks. Through ongoing monitoring and observation, we help families stay informed about potential issues." },
  { title: "Emergency Coordination", desc: "When unexpected situations arise, having a support system in place can make a significant difference. We help coordinate assistance and ensure that seniors receive timely support." },
  { title: "Ongoing Support Services", desc: "Our services provide continuous support that helps seniors maintain their independence while ensuring their well-being remains a priority." },
  { title: "Professional Guidance", desc: "Many families are unsure where to begin when evaluating home safety. We provide guidance and practical insights that help families make informed decisions about creating safer living environments." },
];

export default function HomeSafetyForSeniors() {
  const navigate = useNavigate();

  useMetaTags(
    "Why Home Safety Matters More as Parents Grow Older | 60Plus India",
    "WHO reports falls are the 2nd leading cause of accidental injury deaths. CDC says 80% of home falls happen in the bathroom. Learn why home safety matters more as parents grow older.",
    "home safety seniors, elderly fall prevention, bathroom safety elderly, senior home assessment Chennai, grab bars installation, elder home safety India"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: "Why Home Safety Matters More as Parents Grow Older",
      description: "CDC says 80% of home falls happen in the bathroom. Learn why home safety matters more as parents grow older.",
      author: { "@type": "Organization", name: "60Plus India" },
      publisher: { "@type": "Organization", name: "60Plus India", logo: { "@type": "ImageObject", url: "https://www.60plusindia.com/logo/60_plus_india.png" } },
      datePublished: "2026-06-04", dateModified: "2026-06-04",
      url: "https://www.60plusindia.com/blogs/home-safety-for-seniors",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.60plusindia.com/blogs/home-safety-for-seniors" },
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
            <span className="blg-eyebrow">Home Safety</span>
            <h1>Why Home Safety Matters More as<br />Parents <em>Grow Older</em></h1>
            <p className="blg-hero-sub">When families think about caring for ageing parents, their attention often goes to doctor visits, medications, and medical conditions. While these aspects are important, one equally important factor is often overlooked: the safety of the home itself.</p>
            <div className="blg-meta">
              <span className="blg-meta-item"><Calendar size={13} /> June 04, 2026</span>
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
                <p>A house that has been familiar and comfortable for decades may gradually become more challenging to navigate as people age. Changes in vision, balance, mobility, strength, and reaction time can transform everyday household features into potential safety hazards. What once seemed harmless may now increase the risk of falls, injuries, and other accidents.</p>
                <p>Creating a safe living environment is not about limiting independence — it is about helping seniors maintain their confidence, comfort, and quality of life while continuing to live safely in familiar surroundings.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Important Changes</span>
              <h2>Why Home Safety Becomes More Important with Age</h2>
              <div className="blg-prose">
                <p>As people grow older, natural age-related changes can affect how they move around their homes.</p>
                <p>Reduced balance, slower reflexes, vision changes, joint stiffness, and mobility limitations can make certain areas of the home more difficult to navigate. The World Health Organization (WHO) reports that falls are the second leading cause of accidental injury deaths worldwide, with adults older than 65 suffering the greatest number of these accidents in their own homes.</p>
                <p>Unfortunately, many safety risks remain unnoticed until an accident occurs.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Key Challenges</span>
              <h2>Common Home Safety Challenges Faced by Seniors</h2>
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
              <h2>Why Home Safety Should Never Be Overlooked</h2>
              <div className="blg-prose">
                <p>Many families assume their parents' home remains as safe as it has always been. However, the reality is that both the individual and the environment change over time.</p>
                <p>A loose rug, poorly lit staircase, or slippery bathroom floor may not seem dangerous until a fall occurs. By then, the consequences may include injuries, reduced mobility, loss of confidence, and extended recovery periods.</p>
                <p>Research by the CDC strongly supports this, showing that making simple home modifications — like installing grab bars, improving lighting, and removing tripping hazards — can reduce the risk of home injuries by up to 30%.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>Practical Steps Families Can Take</h2>
              <div className="blg-prose">
                <p>Families can actively improve home safety by taking small, structured steps. These include:</p>
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
                <p>Small changes can often make a significant difference in improving safety and comfort. We believe good health involves living confidently in a secure environment. Our services are designed to support seniors not only through practical assistance but also by helping them maintain safety, independence, and a positive outlook.</p>
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
                <p className="blg-cta-card-sub">From comprehensive home safety assessments to regular wellness check-ins, our trained senior care team helps families bridge the distance and ensures your loved ones get the best support.</p>
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
            <h2>Home Safety Starts<br /><em>Today</em></h2>
            <p className="blg-final-sub">Knowing that a trusted support system is regularly checking on a loved one provides reassurance for families. Our services help bridge the gap between concern and action, ensuring seniors receive the attention and support they deserve.</p>
            <button className="blg-final-btn" onClick={goToAssessment}>Get Started with 60PlusIndia <ArrowRight size={16} /></button>
            <p className="blg-final-note"><Lock size={11} /> Completely free. For NRI families worldwide.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
