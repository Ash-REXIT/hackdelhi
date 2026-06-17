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
  { n: "01", title: "The Constant Worry Factor", desc: "One of the biggest emotional challenges for adult children is the constant concern about their parents' well-being. Questions such as \"Are they eating properly?\", \"Are they taking their medications on time?\", or \"Are they managing daily activities comfortably?\" often remain in the back of a person's mind, creating ongoing stress and uncertainty." },
  { n: "02", title: "Feeling Guilty About Living Away", desc: "Many adult children experience feelings of guilt because they cannot be physically present to support their parents. Even when moving away was necessary for career growth or personal reasons, many people feel they are not doing enough for the people who once cared for them. This emotional burden can be difficult to manage, especially when parents begin facing age-related challenges." },
  { n: "03", title: "Not Knowing What Is Happening Day-to-Day", desc: "Small changes often provide the earliest signs that a parent may need additional support. Changes in eating habits, mobility, energy levels, mood, personal hygiene, or household maintenance can develop gradually. When families live far away, these warning signs may go unnoticed until a larger problem develops. This is particularly concerning given that the National Institute on Aging (NIA) highlights how social isolation and living alone can significantly increase the risks of physical decline and depression among older adults." },
  { n: "04", title: "Being Unable to Help During Unexpected Situations", desc: "Unexpected situations can arise at any time. A fall, sudden illness, home maintenance issue, transportation problem, or medical concern may require immediate attention. The WHO reports that falls are a leading cause of injury among older adults worldwide, and prompt assistance can make a critical difference in recovery. For family members living hundreds or thousands of kilometres away, responding quickly is often impossible." },
  { n: "05", title: "Difficulty Coordinating Care from Afar", desc: "Managing healthcare, appointments, medications, household support, and other needs can become complicated when done remotely. This coordination is vital, as the CDC estimates that nearly 85% of older adults manage at least one chronic health condition, requiring consistent monitoring and regular medical visits. Simple tasks often require multiple phone calls, coordination with different service providers, and constant follow-up." },
  { n: "06", title: "Parents Hiding Problems", desc: "Many seniors value their independence and do not want their children to worry. As a result, they may downplay health concerns, avoid discussing difficulties, or insist that everything is fine even when they need assistance. While these intentions come from a place of love, they can prevent families from recognizing problems early." },
  { n: "07", title: "Lack of Local Support", desc: "Not every senior has relatives, neighbours, or close friends available nearby. Without a reliable local support system, even small challenges can become difficult to manage. Families often worry about who will be there when their parents need assistance, companionship, or emergency support." },
];

const solutions = [
  { n: "01", title: "Communication & Check-ins", desc: "Establish regular communication and wellness check-ins to stay actively involved in their daily routines." },
  { n: "02", title: "Medication Monitoring", desc: "Monitor medications and healthcare needs consistently to prevent any missed doses or complications." },
  { n: "03", title: "Healthcare Coordination", desc: "Arrange dedicated support for doctor visits, follow-up medical appointments, and health check-ups." },
  { n: "04", title: "Social Interaction", desc: "Encourage social interaction and companionship to prevent the feelings of isolation that come with living alone." },
  { n: "05", title: "Emergency Plan", desc: "Create a robust emergency response plan so prompt assistance is available in case of an unexpected event." },
  { n: "06", title: "Support Network", desc: "Build a trusted local support network that perfectly balances their independence with immediate assistance." },
];

const advantages = [
  { title: "Wellness Check-ins", desc: "We conduct regular wellness check-ins to monitor health, safety, and overall well-being." },
  { title: "Family Communication", desc: "We provide transparent updates and consistent communication for family members living far away." },
  { title: "Companionship", desc: "Our team offers dedicated companionship and encourages active social engagement for your parents." },
  { title: "Healthcare Coordination", desc: "We assist with complete healthcare coordination and appointment support for a stress-free experience." },
  { title: "Emergency Assistance", desc: "Our prompt emergency assistance and response coordination provide immediate help when it matters most." },
  { title: "Day-to-Day Support", desc: "We offer active assistance with day-to-day activities, groceries, and errands to relieve the physical burden." },
];

export default function ParentsNeedHelpMilesAway() {
  const navigate = useNavigate();

  useMetaTags(
    "When Your Parents Need Help But You Live Miles Away | 60Plus India",
    "NRI families face unique challenges caring for ageing parents from afar. Learn how to bridge the distance with wellness check-ins, healthcare coordination, and emergency support.",
    "NRI parent care, long-distance caregiving India, senior care from abroad, elderly parents Chennai, remote elder care, NRI senior support"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: "When Your Parents Need Help, But You Live Miles Away",
      description: "NRI families face unique challenges caring for ageing parents from afar. Learn how to bridge the distance.",
      author: { "@type": "Organization", name: "60Plus India" },
      publisher: { "@type": "Organization", name: "60Plus India", logo: { "@type": "ImageObject", url: "https://www.60plusindia.com/logo/60_plus_india.png" } },
      datePublished: "2026-06-03", dateModified: "2026-06-03",
      url: "https://www.60plusindia.com/blogs/parents-need-help-miles-away",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.60plusindia.com/blogs/parents-need-help-miles-away" },
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
            <h1>When Your Parents Need Help,<br />But You Live <em>Miles Away</em></h1>
            <p className="blg-hero-sub">Modern life often takes families in different directions. Children move to other cities for work, settle abroad for better opportunities, or build their own lives far from where they grew up. While technology has made communication easier than ever, many adult children still face a difficult question every day: "How do I take care of my ageing parents when I am not there?"</p>
            <div className="blg-meta">
              <span className="blg-meta-item"><Calendar size={13} /> June 03, 2026</span>
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
                <p>For many families, distance creates a unique challenge. Parents may appear independent and self-sufficient, but it can be difficult to know what is really happening in their daily lives. A missed meal, a forgotten medication, a minor health issue, or even feelings of loneliness can easily go unnoticed when families live miles apart.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Growing Reality</span>
              <h2>The Growing Reality of Long-Distance Caregiving</h2>
              <div className="blg-prose">
                <p>Long-distance caregiving has become increasingly common in today's world. As families become more geographically dispersed, many adult children find themselves responsible for ageing parents from another city, state, or even country.</p>
                <p>This shift is reflected in changing family structures. According to the Longitudinal Ageing Study in India (LASI), approximately 20% of elderly individuals in India now live either alone or only with their spouse, a number that is steadily increasing as younger generations migrate for work.</p>
                <p>While regular phone calls and video chats help maintain connections, they cannot always provide a complete picture of a parent's well-being. Many seniors prefer not to share their difficulties because they do not want to burden their children or cause unnecessary worry.</p>
                <p>As a result, families often find themselves constantly wondering whether their parents are truly doing well.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Key Challenges</span>
              <h2>Challenges Faced by Families Living Far Away</h2>
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
              <span className="blg-section-tag">Staying Connected</span>
              <h2>Why Distance Should Not Mean Disconnection</h2>
              <div className="blg-prose">
                <p>Living far away does not mean children care any less about their parents. In fact, many long-distance caregivers spend significant time and energy trying to stay informed and involved in their parents' lives.</p>
                <p>With the India Ageing Report 2023 by UNFPA projecting that the elderly population in India will double by 2050, finding effective ways to provide care from a distance is becoming a necessary reality for more families than ever before.</p>
                <p>The key is to create a support system that helps bridge the gap between physical distance and daily care needs. When the right support network is in place, families can remain connected, informed, and reassured even when they cannot be physically present.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>How Families Can Help From Afar</h2>
              <div className="blg-prose">
                <p>There are several ways families can better support ageing parents from afar. These proactive steps can help reduce uncertainty while improving safety and quality of life for seniors:</p>
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
                <p>At 60PlusIndia, we understand the challenges faced by families whose parents live far away. Our services help bridge the distance gap by providing reliable local support and regular monitoring. By acting as a trusted support partner, we help families stay informed, stay connected, and gain peace of mind knowing their loved ones are receiving the care and attention they deserve.</p>
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
            <h2>Distance Shouldn't Mean<br /><em>Disconnection</em></h2>
            <p className="blg-final-sub">As parents age, the right support network can help them continue living safely and comfortably, bridging the gap between physical distance and daily care needs. 60PlusIndia provides wellness monitoring, appointment assistance, and immediate emergency response when you can't be there.</p>
            <button className="blg-final-btn" onClick={goToAssessment}>Get Started with 60PlusIndia <ArrowRight size={16} /></button>
            <p className="blg-final-note"><Lock size={11} /> Completely free. For NRI families worldwide.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
