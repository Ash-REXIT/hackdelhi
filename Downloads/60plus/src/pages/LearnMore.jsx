import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useMetaTags from '../hooks/useMetaTags';
import { colors, fonts, ctaGradient, ctaShadow, whatsappLink } from '../lib/theme';

export default function LearnMore() {
  useMetaTags({
    title: 'The Hidden Risk of Falls | 60 Plus India',
    description: 'Most families don\'t realize how quickly a minor trip can become a life-changing event. Learn about fall risks for elderly Indians.',
    keywords: 'elderly falls, fall prevention, senior safety, hip fracture, independence loss',
  });

  const stats = [
    { value: '65.6%', label: 'Falls result in injury', description: 'Among older adults who fall, more than 6 in 10 sustain an injury that requires medical attention.' },
    { value: '1 in 8', label: 'Falls result in fracture', description: 'A significant portion of falls lead to fractures, with hip fractures being the most devastating.' },
    { value: 'Loss of Independence', label: 'Most devastating consequence', description: 'Many seniors who experience a serious fall never fully regain their ability to live independently.' },
    { value: 'Preventable', label: 'Falls are preventable', description: 'Many fall risks can be identified and mitigated early with professional home safety assessments.' },
  ];

  return (
    <div className="learn-more-page">
      <Navbar />

      {/* Hero Section */}
      <section className="learn-more__hero">
        <div className="learn-more__hero-inner">
          <motion.h1
            className="learn-more__hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            The Hidden Pipeline from a Simple Slip
            <br />to Permanent Decline
          </motion.h1>
          <motion.p
            className="learn-more__hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Most families don't realize how quickly a minor trip can become a life-changing event.
          </motion.p>
        </div>
      </section>

      {/* Statistics Grid */}
      <section className="learn-more__stats">
        <div className="learn-more__stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="learn-more__stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <span className="learn-more__stat-value">{stat.value}</span>
              <h3 className="learn-more__stat-label">{stat.label}</h3>
              <p className="learn-more__stat-desc">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Content */}
      <section className="learn-more__content">
        <div className="learn-more__content-inner">
          <motion.h2
            className="learn-more__section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Understanding Fall Risks in India
          </motion.h2>
          <motion.p
            className="learn-more__text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Falls among older adults in India represent a significant and growing public health concern.
            As the elderly population increases, the number of fall-related injuries continues to rise,
            placing enormous burden on families and the healthcare system.
          </motion.p>
          <motion.p
            className="learn-more__text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Research published in leading medical journals shows that approximately one-third of
            adults aged 60 and above experience at least one fall each year. The consequences extend
            far beyond the immediate injury — affecting mobility, confidence, and the ability to
            perform daily activities independently.
          </motion.p>
          <motion.p
            className="learn-more__text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            For elderly individuals living alone, the risk is compounded by delayed assistance.
            A fall that occurs in the bathroom or on stairs can go unnoticed for hours, turning
            a preventable incident into a medical emergency.
          </motion.p>
          <motion.p
            className="learn-more__text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Hip fractures are among the most serious consequences of falls in the elderly.
            Studies indicate that within a year of a hip fracture, between 20-30% of patients die,
            and many of those who survive never regain their pre-flight level of function.
            The psychological impact — fear of falling again — further reduces activity levels,
            creating a vicious cycle of decline.
          </motion.p>
        </div>
      </section>

      {/* References */}
      <section className="learn-more__references">
        <div className="learn-more__references-inner">
          <motion.h2
            className="learn-more__section-title learn-more__section-title--small"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Research Sources
          </motion.h2>
          <motion.div
            className="learn-more__ref-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="learn-more__ref-author">Biswas, Indranil, et al.</p>
            <p className="learn-more__ref-title">Health Consequences of Falls among Older Adults in India.</p>
            <p className="learn-more__ref-source">Geriatrics, 2023.</p>
          </motion.div>
          <motion.div
            className="learn-more__ref-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="learn-more__ref-author">Sirohi, Anu, et al.</p>
            <p className="learn-more__ref-title">Prevalence and Risk Factors of Falls Among Elderly in Delhi.</p>
            <p className="learn-more__ref-source">Indian Journal of Community Medicine, 2017.</p>
          </motion.div>
          <motion.div
            className="learn-more__ref-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="learn-more__ref-author">World Health Organization</p>
            <p className="learn-more__ref-title">Falls Fact Sheet</p>
            <p className="learn-more__ref-source">WHO, 2024.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="learn-more__cta">
        <div className="learn-more__cta-inner">
          <motion.h2
            className="learn-more__cta-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Protect Their Independence
          </motion.h2>
          <motion.p
            className="learn-more__cta-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ensure your parents are safe by booking a Home Safety Assessment from 60 Plus.
          </motion.p>
          <motion.a
            href="/book-free-senior-home-safety-assessment"
            className="learn-more__cta-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Request Safety Assessment
          </motion.a>
        </div>
      </section>

      <Footer />

      <style>{`
        .learn-more-page {
          background: linear-gradient(180deg, ${colors.lavender1} 0%, ${colors.lavender2} 50%, ${colors.lavender3} 100%);
          min-height: 100vh;
        }

        /* Hero */
        .learn-more__hero {
          padding: 8rem 2rem 4rem;
          text-align: center;
        }
        .learn-more__hero-inner {
          max-width: 800px;
          margin: 0 auto;
        }
        .learn-more__hero-title {
          font-family: ${fonts.heading};
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 500;
          color: ${colors.ink};
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        .learn-more__hero-sub {
          font-family: ${fonts.body};
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: ${colors.mutedText};
          line-height: 1.7;
        }

        /* Stats Grid */
        .learn-more__stats {
          padding: 4rem 2rem;
        }
        .learn-more__stats-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .learn-more__stat-card {
          background: white;
          border-radius: 20px;
          padding: 2rem 1.5rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          border: 1px solid ${colors.subtleBorder};
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .learn-more__stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(130, 53, 208, 0.08);
        }
        .learn-more__stat-value {
          font-family: ${fonts.heading};
          font-size: 2.5rem;
          font-weight: 500;
          background: linear-gradient(135deg, ${colors.ink}, ${colors.purple});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          display: block;
          margin-bottom: 0.5rem;
        }
        .learn-more__stat-label {
          font-family: ${fonts.body};
          font-size: 0.95rem;
          font-weight: 700;
          color: ${colors.ink};
          margin-bottom: 0.5rem;
        }
        .learn-more__stat-desc {
          font-family: ${fonts.body};
          font-size: 0.85rem;
          color: ${colors.mutedText};
          line-height: 1.6;
        }

        /* Content */
        .learn-more__content {
          padding: 4rem 2rem;
        }
        .learn-more__content-inner {
          max-width: 680px;
          margin: 0 auto;
        }
        .learn-more__section-title {
          font-family: ${fonts.heading};
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 500;
          color: ${colors.ink};
          margin-bottom: 1.5rem;
        }
        .learn-more__section-title--small {
          font-size: 1.3rem;
        }
        .learn-more__text {
          font-family: ${fonts.body};
          font-size: 1rem;
          color: ${colors.mutedText};
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }

        /* References */
        .learn-more__references {
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.5);
        }
        .learn-more__references-inner {
          max-width: 680px;
          margin: 0 auto;
        }
        .learn-more__ref-item {
          padding: 1rem 0;
          border-bottom: 1px solid rgba(130, 53, 208, 0.08);
        }
        .learn-more__ref-item:last-child {
          border-bottom: none;
        }
        .learn-more__ref-author {
          font-family: ${fonts.body};
          font-size: 0.9rem;
          font-weight: 700;
          color: ${colors.ink};
          margin-bottom: 0.25rem;
        }
        .learn-more__ref-title {
          font-family: ${fonts.body};
          font-size: 0.9rem;
          color: ${colors.mutedText};
          font-style: italic;
          margin-bottom: 0.15rem;
        }
        .learn-more__ref-source {
          font-family: ${fonts.body};
          font-size: 0.8rem;
          color: rgba(26, 10, 46, 0.4);
        }

        /* CTA */
        .learn-more__cta {
          padding: 5rem 2rem;
          text-align: center;
        }
        .learn-more__cta-inner {
          max-width: 520px;
          margin: 0 auto;
        }
        .learn-more__cta-title {
          font-family: ${fonts.heading};
          font-size: 2rem;
          font-weight: 500;
          color: ${colors.ink};
          margin-bottom: 0.75rem;
        }
        .learn-more__cta-sub {
          font-family: ${fonts.body};
          font-size: 1rem;
          color: ${colors.mutedText};
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .learn-more__cta-button {
          font-family: ${fonts.body};
          font-size: 1rem;
          font-weight: 800;
          color: white;
          background: ${ctaGradient};
          border: none;
          border-radius: 50px;
          padding: 1rem 2rem;
          text-decoration: none;
          display: inline-block;
          box-shadow: ${ctaShadow};
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .learn-more__cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(130, 53, 208, 0.35);
        }

        @media (max-width: 768px) {
          .learn-more__hero {
            padding: 6rem 1.5rem 3rem;
          }
          .learn-more__stats,
          .learn-more__content,
          .learn-more__references,
          .learn-more__cta {
            padding: 3rem 1.5rem;
          }
          .learn-more__stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}