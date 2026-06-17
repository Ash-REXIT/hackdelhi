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
  { n: "01", title: "Loss of Purpose After Retirement", desc: "For many people, work provides structure, routine, goals, and social interaction. Retirement can be rewarding, but it can also create a sense of uncertainty. Some seniors may struggle to replace the sense of purpose they once found in their careers, leaving them feeling less engaged or productive." },
  { n: "02", title: "Reduced Social Interaction", desc: "Life changes such as retirement, children moving away, health limitations, or the loss of social connections can reduce opportunities for regular interaction. The Longitudinal Ageing Study in India (LASI) highlights this growing concern, revealing that nearly 20% of the elderly in India now live alone or solely with a spouse, making them highly vulnerable to social isolation." },
  { n: "03", title: "Loss of Friends or Loved Ones", desc: "Ageing often brings difficult life experiences, including the loss of a spouse, siblings, relatives, or close friends. Grief can have a lasting impact on emotional well-being, especially when seniors have limited opportunities to discuss their feelings and experiences." },
  { n: "04", title: "Feeling Disconnected from Family Life", desc: "Many families stay connected through phone calls and occasional visits, but seniors may still feel disconnected from the everyday lives of their children and grandchildren. This feeling of being left out can affect self-worth and emotional health." },
  { n: "05", title: "Lack of Meaningful Conversations", desc: "Human connection goes beyond simply speaking to someone. Many seniors miss having regular conversations where they can share stories, opinions, concerns, and experiences. A lack of meaningful interaction can contribute to feelings of loneliness even when family members remain in touch." },
  { n: "06", title: "Emotional Stress and Anxiety", desc: "Concerns about health, finances, independence, and the future can create emotional stress. Without a strong support system, these worries may gradually affect a senior's confidence and overall well-being." },
  { n: "07", title: "Reduced Participation in Activities", desc: "Seniors who stop participating in hobbies, community activities, social gatherings, or personal interests may become increasingly isolated. Remaining engaged in enjoyable activities helps maintain emotional health and a sense of purpose." },
  { n: "08", title: "Overlooking Emotional Health", desc: "Families naturally focus on physical care, medical appointments, and healthcare needs. However, emotional health is equally important. The CDC warns that social isolation significantly increases a person's risk of premature death from all causes, a risk that may rival the dangers of smoking, obesity, and physical inactivity." },
];

const solutions = [
  { n: "01", title: "Encourage Social Interaction", desc: "Encouraging regular social interaction and helping seniors stay connected with family and friends helps combat isolation." },
  { n: "02", title: "Spend Quality Time", desc: "Spending quality time together and creating opportunities for meaningful conversations strengthens emotional bonds." },
  { n: "03", title: "Support Hobbies", desc: "Supporting hobbies, personal interests, and promoting participation in community activities fosters a lasting sense of purpose." },
  { n: "04", title: "Prioritize Emotional Health", desc: "Recognizing emotional health as an essential and integral part of overall wellness is the foundation of healthy ageing." },
];

const advantages = [
  { title: "Emotional Companion Services", desc: "Many seniors simply need someone who will listen, understand, and provide emotional support. Our Emotional Companion services help seniors express their thoughts, share experiences, and feel valued through regular interactions that reduce feelings of isolation and loneliness." },
  { title: "Talking Companion Services", desc: "Meaningful conversations can have a positive impact on emotional well-being. Our Talking Companion services provide seniors with regular opportunities to engage in friendly discussions, helping them stay socially connected and emotionally engaged." },
  { title: "Regular Engagement & Wellness", desc: "Consistent interaction helps identify emotional concerns before they become larger issues. Through regular engagement and wellness check-ins, we help seniors maintain social connections while ensuring their overall well-being remains a priority." },
  { title: "Meaningful Conversations", desc: "Having someone to talk to can make a significant difference in a senior's daily life. Our support focuses on creating genuine human connections that encourage emotional expression, companionship, and a greater sense of belonging." },
  { title: "Social Engagement Initiatives", desc: "Remaining socially active is essential for healthy ageing. We encourage participation in activities and interactions that help seniors maintain confidence, stay involved, and continue enjoying meaningful experiences." },
  { title: "Regular Check-Ins", desc: "Routine check-ins provide reassurance for both seniors and their families. These interactions help seniors feel connected, supported, and cared for while allowing families to remain informed about their loved one's well-being." },
];

export default function SocialEmotionalSupportForSeniors() {
  const navigate = useNavigate();

  useMetaTags(
    "Good Health Isn't Just Physical: Why Seniors Need Social and Emotional Support | 60Plus India",
    "WHO reports 15% of adults 60+ suffer from mental disorders. Loneliness increases dementia risk by 50%. Learn why emotional and social well-being is essential for healthy ageing.",
    "senior emotional support, elderly loneliness, social isolation seniors, companion services India, emotional well-being elderly, senior companionship Chennai"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org", "@type": "Article",
      headline: "Good Health Isn't Just Physical: Why Seniors Need Social and Emotional Support",
      description: "Loneliness increases dementia risk by 50%. Learn why emotional and social well-being is essential for healthy ageing.",
      author: { "@type": "Organization", name: "60Plus India" },
      publisher: { "@type": "Organization", name: "60Plus India", logo: { "@type": "ImageObject", url: "https://www.60plusindia.com/logo/60_plus_india.png" } },
      datePublished: "2026-06-04", dateModified: "2026-06-04",
      url: "https://www.60plusindia.com/blogs/social-emotional-support-for-seniors",
      mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.60plusindia.com/blogs/social-emotional-support-for-seniors" },
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
            <span className="blg-eyebrow">Emotional Well-Being</span>
            <h1>Good Health Isn't Just Physical: Why Seniors Need<br />Social and <em>Emotional Support</em></h1>
            <p className="blg-hero-sub">As people grow older, conversations about health often focus on doctor visits, medications, medical tests, and physical fitness. While these aspects are important, good health involves much more than the absence of illness. Emotional well-being, social connections, and a sense of belonging play an equally important role in helping seniors lead fulfilling and meaningful lives.</p>
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
                <p>Many older adults may appear physically healthy but quietly struggle with loneliness, emotional stress, or a lack of meaningful interaction. These challenges often go unnoticed because they are not as visible as physical health problems. However, emotional and social well-being can significantly influence a senior's overall quality of life, confidence, happiness, and even physical health.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Healthy Ageing</span>
              <h2>The Often Overlooked Side of Healthy Ageing</h2>
              <div className="blg-prose">
                <p>Research from the World Health Organization (WHO) highlights that social isolation and loneliness are significant public health concerns among older adults, estimating that approximately 15% of adults aged 60 and over suffer from a mental disorder, with depression and anxiety being the most common. Studies have shown that loneliness can severely affect both mental and physical health. The National Institute on Aging (NIA) indicates that prolonged social isolation is associated with a staggering 50% increased risk of developing dementia and cognitive decline.</p>
                <p>As families become busier and social circles become smaller with age, many seniors find themselves spending more time alone and having fewer meaningful conversations than they once did.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Key Challenges</span>
              <h2>Emotional and Social Challenges Faced by Seniors</h2>
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
              <span className="blg-section-tag">Emotional Wellness</span>
              <h2>Why Emotional Well-Being Matters</h2>
              <div className="blg-prose">
                <p>Emotional and social health are closely connected to healthy ageing. A UNFPA India report underscores this, suggesting that seniors who actively participate in community and social activities report significantly higher life satisfaction and lower rates of chronic illness compared to those who remain isolated. Seniors who maintain strong relationships, engage in meaningful activities, and feel emotionally supported often experience:</p>
                <ul>
                  <li>Greater happiness and life satisfaction.</li>
                  <li>Improved confidence and self-esteem.</li>
                  <li>Better mental well-being.</li>
                  <li>Stronger social connections.</li>
                  <li>A higher quality of life.</li>
                </ul>
                <p>Healthy ageing is not only about living longer — it is about living well.</p>
              </div>
            </Reveal>

            <hr className="blg-divider" />

            <Reveal>
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>Practical Ways to Support Emotional Well-Being</h2>
              <div className="blg-prose">
                <p>Families can play an active role in nurturing emotional and social health. Steps to help include:</p>
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
                <p>We believe good health involves both physical and emotional well-being. Our services are designed to support seniors not only through practical assistance but also by helping them maintain meaningful relationships, emotional resilience, and a positive outlook on life.</p>
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
                <p className="blg-cta-card-sub">From emotional companionship and meaningful conversations to wellness check-ins, our trained senior care team helps families bridge the distance and ensures your loved ones get the best support.</p>
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
            <h2>Emotional Support Matters<br /><em>Reach Out Today</em></h2>
            <p className="blg-final-sub">By helping seniors maintain meaningful relationships and emotional resilience, we support healthier, safer, and more independent ageing. 60PlusIndia provides emotional companionship and immediate support when you can't be there.</p>
            <button className="blg-final-btn" onClick={goToAssessment}>Get Started with 60PlusIndia <ArrowRight size={16} /></button>
            <p className="blg-final-note"><Lock size={11} /> Completely free. For NRI families worldwide.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
