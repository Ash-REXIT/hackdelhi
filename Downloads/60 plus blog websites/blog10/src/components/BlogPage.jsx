import React from 'react';
import './BlogPage.css';
import useScrollReveal from '../hooks/useScrollReveal';

const BlogPage = () => {
  useScrollReveal();

  return (
    <div className="blg">
      {/* ===== HERO SECTION ===== */}
      <section className="blg-hero">
        <div className="blg-hero-inner">
          <div className="reveal">
            <span className="blg-eyebrow">Nutrition & Ageing</span>
            <h1>The Hidden Health Risks of Skipping Meals in <em>Older Adults</em></h1>
            <p className="blg-hero-sub">
              As people grow older, changes in appetite, lifestyle, health conditions, and daily routines can affect eating habits. Many seniors begin eating smaller portions, skipping meals, or eating less frequently than they should. While this may seem harmless at first, poor nutrition can gradually affect physical health, energy levels, immunity, and overall well-being.
            </p>
            <div className="blg-meta">
              <span className="blg-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
                </svg>
                June 04, 2026
              </span>
              <span className="blg-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
                </svg>
                6 min read
              </span>
              <span className="blg-meta-item">
                By 60Plus India Care Team
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="blg-body">
        <div className="blg-layout">

          <article className="blg-article">
            {/* Introduction */}
            <div className="reveal">
              <div className="blg-prose">
                <p>
                  According to the World Health Organization (WHO), malnutrition affects millions of older adults globally and is closely associated with reduced immunity, increased frailty, and a higher risk of hospitalization. In many cases, family members may not even realize that their parents are eating less regularly, especially when they live alone. 
                </p>
                <p>
                  What starts as an occasional missed meal can eventually lead to nutritional deficiencies, weight loss, weakness, and other health concerns. In India, findings from the Longitudinal Ageing Study in India (LASI) highlight that poor nutrition and undereating are widespread issues among the elderly, often exacerbating existing health conditions and reducing their quality of life.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Warning Signs */}
            <div className="reveal">
              <span className="blg-section-tag">Common Challenges</span>
              <h2>Nutrition-Related Challenges</h2>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">Loss of Appetite</p>
                    <p className="blg-point-desc">
                      Age-related changes, medications, health conditions, or reduced physical activity may decrease appetite.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Eating Alone</p>
                    <p className="blg-point-desc">
                      Seniors who live alone may lose interest in preparing meals or eating regularly without companionship. Studies from the National Institute on Aging (NIA) reveal that seniors who eat alone are significantly more likely to consume fewer calories and skip meals, highlighting the critical role of social connection in maintaining a healthy diet.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Poor Nutrition</p>
                    <p className="blg-point-desc">
                      Skipping meals can result in inadequate intake of essential nutrients needed for healthy ageing. Evidence from the National Institute of Nutrition (India) shows that inadequate protein and nutrient intake directly accelerates frailty and weakens the immune system, making it much harder for seniors to recover from illnesses.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Unintentional Weight Loss</p>
                    <p className="blg-point-desc">
                      Reduced food intake may lead to unhealthy weight loss and muscle weakness. Research published in peer-reviewed medical journals warns that unintended weight loss is a critical red flag in older adults, often preceding a rapid decline in muscle mass, mobility, and overall independence.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Low Energy and Fatigue</p>
                    <p className="blg-point-desc">
                      Missing meals can affect energy levels and make daily activities more difficult.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Medication Taken Without Food</p>
                    <p className="blg-point-desc">
                      Some medications are more effective or safer when taken with food, making regular meals important. The Centers for Disease Control and Prevention (CDC) notes that proper nutrition is not only essential for managing chronic diseases but also critical for medication safety, as taking certain prescriptions on an empty stomach can reduce their effectiveness or cause harmful side effects.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Difficulty Preparing Meals</p>
                    <p className="blg-point-desc">
                      Physical limitations, mobility issues, or lack of motivation can make cooking challenging.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">08</span>
                  <div>
                    <p className="blg-point-title">Increased Health Risks</p>
                    <p className="blg-point-desc">
                      Poor nutrition can contribute to weakened immunity, slower recovery from illness, and increased health complications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Solutions Section */}
            <div className="reveal">
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>How Families Can Provide Support</h2>
              <div className="blg-prose">
                <p>
                  Maintaining healthy eating habits is an important part of healthy ageing. Early attention to eating habits can help prevent many nutrition-related health problems before they become serious.
                </p>
                <p>
                  Families can support seniors by:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Encouraging Regular Schedules</h3>
                  <p className="blg-solution-desc">
                    Encouraging regular meal schedules to build a healthy routine.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Monitoring Appetite</h3>
                  <p className="blg-solution-desc">
                    Monitoring changes in appetite and eating habits consistently.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Ensuring Balanced Meals</h3>
                  <p className="blg-solution-desc">
                    Ensuring balanced and nutritious meals are easily available.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Supporting Preparation</h3>
                  <p className="blg-solution-desc">
                    Supporting grocery shopping and meal preparation when mobility is an issue.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">05</span>
                  <h3>Encouraging Social Meals</h3>
                  <p className="blg-solution-desc">
                    Encouraging social meals and companionship to increase food intake naturally.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">06</span>
                  <h3>Monitoring Weight</h3>
                  <p className="blg-solution-desc">
                    Monitoring weight changes and overall health to catch concerns early.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">07</span>
                  <h3>Seeking Professional Guidance</h3>
                  <p className="blg-solution-desc">
                    Discussing nutrition concerns with healthcare professionals when necessary.
                  </p>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* How 60PlusIndia Helps */}
            <div className="reveal">
              <span className="blg-section-tag">The 60Plus India Approach</span>
              <h2>How 60PlusIndia Helps</h2>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Wellness Monitoring</h3>
                  <p className="blg-advantage-desc">
                    Changes in appetite, eating habits, and energy levels are often early indicators of underlying health concerns. Our wellness monitoring services help identify these changes early so that families can take appropriate action.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Check-Ins</h3>
                  <p className="blg-advantage-desc">
                    Consistent interactions allow us to better understand a senior's daily routines, including meal patterns and overall well-being. These check-ins help ensure that concerns do not go unnoticed.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Family Updates and Communication</h3>
                  <p className="blg-advantage-desc">
                    Families living away from their parents may not always know whether meals are being skipped or eating habits are changing. We help keep families informed about important observations related to health and daily living.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Observation of Daily Well-Being</h3>
                  <p className="blg-advantage-desc">
                    Nutrition affects many aspects of a senior's health, including energy, mobility, mood, and overall wellness. Through regular engagement, we help identify changes that may require attention.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Companionship and Social Engagement</h3>
                  <p className="blg-advantage-desc">
                    Many seniors enjoy meals more when they feel socially connected. Regular interaction and companionship can help reduce isolation and encourage healthier daily routines.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Personalized Senior Support</h3>
                  <p className="blg-advantage-desc">
                    Every senior has unique needs and challenges. Our services are designed to provide personalized support that promotes healthy ageing, independence, and overall well-being.
                  </p>
                </div>
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="blg-sidebar">
            <div className="reveal">
              <div className="blg-cta-card">
                <h3>Are you constantly worried about your parents back home?</h3>
                <p className="blg-cta-card-sub">
                  From regular wellness check-ins to health monitoring and emotional companionship, our trained senior care team helps families bridge the distance and ensures your loved ones are truly supported.
                </p>
                <button className="blg-cta-card-btn">
                  Book a Free Consultation
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                <p className="blg-cta-card-note">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Free senior care guidance. No obligation.
                </p>
              </div>
            </div>

            <div className="reveal">
              <div className="blg-sidebar-context">
                <p>
                  <strong>60Plus India</strong> operates on the ground in Chennai with trained care executives, 24/7 emergency support, and 21+ elder care services — built for NRI families worldwide.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <section className="blg-final-cta">
        <div className="reveal">
          <div className="blg-final-cta-inner">
            <span className="blg-final-pre">Take the first step</span>
            <h2>Ensure They Get the Right Support<br /><em>Reach Out Today</em></h2>
            <p className="blg-final-sub">
              By helping seniors stay connected and monitored through our trusted wellness check-ins, we support healthier, safer, and more transparent ageing. We provide ongoing observation and immediate support when you can't be there.
            </p>
            <button className="blg-final-btn">
              Get Started with 60PlusIndia
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
            <p className="blg-final-note">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Completely free. For NRI families worldwide.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogPage;