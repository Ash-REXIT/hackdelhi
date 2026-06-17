import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import useMetaTags from "../../hooks/useMetaTags";
import { blogPosts } from "../../data/blogs";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const categoryColors = {
  "Senior Care Research": "#8235d0",
  "Senior Care Insights": "#6366f1",
  "Preventive Healthcare": "#0ea5e9",
  "Emotional Well-Being": "#ec4899",
  "Home Safety": "#f59e0b",
  "Family Awareness": "#10b981",
};

export default function BlogIndex() {
  const navigate = useNavigate();

  useMetaTags(
    "Senior Care Blog | Expert Advice on Elder Care, Ageing & Safety | 60Plus India",
    "Expert articles on senior care, elder safety, emotional well-being, and ageing in place. Practical advice for NRI families caring for ageing parents in Chennai, India.",
    "senior care blog, elder care advice, ageing in place India, NRI parent care blog, senior safety tips, elderly home care Chennai"
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar alwaysWhite />
      <div className="blg">
        <style>{`
          .blg {
            font-family: 'Nunito Sans', sans-serif;
            background: #ffffff;
            padding-top: 76px;
          }

          /* ─── HERO ─── */
          .blg-hero {
            background: linear-gradient(160deg, #0d0822 0%, #1a0a2e 100%);
            padding: 72px clamp(24px, 5vw, 80px) 80px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          .blg-hero::before {
            content: '';
            position: absolute;
            top: -20%; left: 10%;
            width: 80%; height: 140%;
            background: radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.1), transparent 60%);
            pointer-events: none;
          }
          .blg-hero-inner {
            position: relative; z-index: 1;
            max-width: 720px; margin: 0 auto;
          }
          .blg-eyebrow {
            display: inline-flex;
            font-size: 11px; font-weight: 800;
            letter-spacing: 1.5px; text-transform: uppercase;
            color: #8b5cf6;
            background: rgba(139,92,246,0.12);
            padding: 6px 16px; border-radius: 999px;
            margin-bottom: 24px;
          }
          .blg-hero h1 {
            font-family: "Gambarino", serif;
            font-size: clamp(34px, 5vw, 58px);
            font-weight: 500; color: #ffffff;
            line-height: 1.15; margin-bottom: 20px;
          }
          .blg-hero h1 em {
            font-style: normal; color: #8b5cf6;
          }
          .blg-hero-sub {
            font-size: 17px; color: #c4b5d4;
            line-height: 1.75; max-width: 560px; margin: 0 auto;
          }
          .blg-hero-accent {
            width: 48px; height: 3px;
            background: linear-gradient(90deg, #8b5cf6, #6366f1);
            border-radius: 999px;
            margin: 28px auto 0;
          }

          /* ─── BLOG GRID ─── */
          .blg-grid-section {
            padding: 96px clamp(24px, 4vw, 80px);
            background: #F8F5FB;
          }
          .blg-grid-inner {
            max-width: 1100px; margin: 0 auto;
          }
          .blg-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            align-items: stretch;
          }

          /* ─── BLOG CARD ─── */
          .blg-card {
            background: #ffffff;
            border-radius: 12px;
            border: 1px solid rgba(26,10,46,0.07);
            padding: 28px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
          }
          .blg-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 36px rgba(130,53,208,0.08);
            border-color: rgba(130,53,208,0.18);
          }
          .blg-card-dot {
            display: inline-block;
            width: 6px; height: 6px;
            border-radius: 50%;
            flex-shrink: 0;
            margin-top: 8px;
            margin-right: 10px;
          }
          .blg-card h2 {
            font-family: "Gambarino", serif;
            font-size: 20px; font-weight: 500;
            color: #1a0a2e; line-height: 1.3;
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
          }
          .blg-card-excerpt {
            font-size: 14px; color: rgba(26,10,46,0.6);
            line-height: 1.7;
            flex: 1;
          }
          .blg-card-footer {
            margin-top: 24px;
          }
          .blg-card-read {
            display: inline-flex; align-items: center; gap: 5px;
            font-size: 13px; font-weight: 700; color: #8235d0;
            font-family: 'Nunito Sans', sans-serif;
            text-decoration: none;
            transition: gap 0.2s;
          }
          .blg-card:hover .blg-card-read {
            gap: 8px;
          }

          /* ─── RESPONSIVE ─── */
          @media (max-width: 1024px) {
            .blg-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 768px) {
            .blg-hero { padding: 60px 20px 72px; }
            .blg-grid-section { padding: 72px 20px; }
            .blg-grid { grid-template-columns: 1fr; gap: 20px; }
          }
        `}</style>

        {/* ══════ HERO ══════ */}
        <section className="blg-hero">
          <div className="blg-hero-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              
              <h1>
                Insights & Resources for<br />
                <em>Senior Care</em>
              </h1>
              <p className="blg-hero-sub">
                Expert articles on elder care, safety, emotional well-being, and ageing in place — written for families who want the best for their parents.
              </p>
            
            </motion.div>
          </div>
        </section>

        {/* ══════ BLOG GRID ══════ */}
        <section className="blg-grid-section">
          <div className="blg-grid-inner">
            <div className="blg-grid">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  className="blg-card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-72px 0px" }}
                  custom={i}
                  onClick={() => navigate(`/blogs/${post.slug}`)}
                >
                  <h2>
                    {post.title}
                  </h2>
                  <p className="blg-card-excerpt">{post.excerpt}</p>
                  <div className="blg-card-footer">
                    <span className="blg-card-read">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
