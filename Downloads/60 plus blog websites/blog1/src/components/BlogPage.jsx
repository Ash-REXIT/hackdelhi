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
            <span className="blg-eyebrow">Senior Care Insights</span>
            <h1>When Living Alone Becomes Difficult:<br />Signs Seniors Should <em>Not Ignore</em></h1>
            <p className="blg-hero-sub">
              Independent living is a cherished goal — but as age quietly brings new challenges,
              it helps to recognise the signs early. Understanding these changes is the first step toward staying safe, healthy, and connected.
            </p>
            <div className="blg-meta">
              <span className="blg-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
                </svg>
                May 28, 2026
              </span>
              <span className="blg-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>
                </svg>
                8 min read
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
                  Meera aunty, 72, has lived in the same Hyderabad apartment for over thirty years. She knows every
                  crack in the ceiling, every neighbour by name, and the exact spot in her kitchen where the morning
                  sunlight falls on the spice rack. Her children call every weekend, but between those calls, Meera aunty navigates her days alone.
                </p>
                <p>
                  Last month, she forgot to take her blood pressure medication for three consecutive days without realising it. 
                  The week before, she skipped her annual eye check-up because the auto-rickshaw queue was too long. 
                  Last week, she ate dal and rice for four meals in a row because going to the market felt like too much effort.
                </p>
                <p>
                  Across India, millions of seniors are living through similar experiences quietly. The challenges are real, 
                  gradual, and often invisible — until something happens that forces everyone to pay attention.
                </p>
              </div>
            </div>

            {/* Statistics Strip */}
            <div className="reveal">
              <div className="blg-stats-strip">
                <div className="blg-stat">
                  <span className="blg-stat-num">319M</span>
                  <span className="blg-stat-label">Indians aged 60+ projected by 2050 (UNFPA)</span>
                </div>
                <div className="blg-stat">
                  <span className="blg-stat-num">30%</span>
                  <span className="blg-stat-label">Seniors living alone or with only a spouse (LASI Survey)</span>
                </div>
                <div className="blg-stat">
                  <span className="blg-stat-num">50%</span>
                  <span className="blg-stat-label">Patients who do not take medications as prescribed (WHO)</span>
                </div>
              </div>
            </div>

            {/* Signs Section (Problem) */}
            <div className="reveal">
              <span className="blg-section-tag">Key Warning Signs</span>
              <h2>Signs That Independent Living May Be Becoming Difficult</h2>
              <div className="blg-prose">
                <p>
                  The following challenges develop gradually. A senior may not notice them — and may not want to admit
                  them. But for families, understanding what to look for can make all the difference.
                </p>
              </div>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">Forgetting to Take Medications</p>
                    <p className="blg-point-desc">
                      Managing multiple prescriptions is a major challenge. 
                      Missed doses can lead to poorly managed chronic conditions such as diabetes or hypertension. 
                      Without someone nearby to notice a skipped dose, small lapses can quietly develop into bigger health concerns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Difficulty Managing Household Tasks</p>
                    <p className="blg-point-desc">
                      Reduced grip strength, joint pain, and limited stamina can make simple chores like cooking or cleaning feel exhausting. 
                      Many seniors begin to let household maintenance slide — not because they don't care, but because their bodies simply cannot keep up.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Missing Medical Appointments</p>
                    <p className="blg-point-desc">
                      Getting to an appointment involves arranging transportation, navigating traffic, and waiting at the facility. 
                      When mobility is limited, seniors might skip these critical check-ups, putting them at higher risk for undiagnosed conditions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Reduced Mobility and Increased Fall Risk</p>
                    <p className="blg-point-desc">
                      Falls are a leading cause of injury-related hospitalisation among older adults. 
                      A simple slip in a bathroom without grab bars can result in long-term disability, especially when living alone without immediate help.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Loneliness and Social Isolation</p>
                    <p className="blg-point-desc">
                      A senior may eat well and take their medications, yet still suffer emotional decline from shrinking social circles. 
                      Chronic loneliness is associated with higher rates of depression and cognitive decline.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Solutions Section */}
            <div className="reveal">
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>How to Support Independent Living Safely</h2>
              <div className="blg-prose">
                <p>
                  Independent living can remain safe, comfortable, and fulfilling with the right support system in place. 
                  These solutions do not require a senior to give up their independence; they simply build a safety net around them.
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Medication Reminder Systems</h3>
                  <p className="blg-solution-desc">
                    Simple pill organisers, phone alarms, or caregiver-assisted reminders help ensure medications are taken correctly and on time.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Wellness Monitoring</h3>
                  <p className="blg-solution-desc">
                    Regular check-ins and health tracking help catch changes in blood pressure, blood sugar, weight, and overall vitality before they become serious.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Home Safety Improvements</h3>
                  <p className="blg-solution-desc">
                    Installing grab bars, non-slip mats, better lighting, and emergency call buttons can significantly reduce the risk of falls and accidents.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Healthcare Coordination</h3>
                  <p className="blg-solution-desc">
                    Having someone help schedule appointments, arrange transportation, and ensure follow-up care removes the burden of managing healthcare alone.
                  </p>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* How 60PlusIndia Helps (Advantages) */}
            <div className="reveal">
              <span className="blg-section-tag">The 60Plus India Approach</span>
              <h2>How We Help Seniors Live Independently with Confidence</h2>
              <div className="blg-prose">
                <p>
                  At 60PlusIndia, we understand that independence should never mean facing challenges alone. 
                  Our services are designed to address the real, everyday difficulties that seniors experience while preserving their dignity and comfort.
                </p>
              </div>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Wellness Check-ins</h3>
                  <p className="blg-advantage-desc">
                    Whether it is a daily phone call or a scheduled in-person visit, our check-ins ensure that seniors have someone looking in on them consistently to track vital signs and overall wellbeing.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Companionship Services</h3>
                  <p className="blg-advantage-desc">
                    Meaningful conversation and genuine human connection are at the heart of what we do. Our companions spend time with seniors — talking, listening, and simply being present.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Emergency Assistance</h3>
                  <p className="blg-advantage-desc">
                    Our emergency support system ensures that when something goes wrong, help is never far away. We coordinate with families, healthcare providers, and emergency services for rapid response.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Senior Assistance Services</h3>
                  <p className="blg-advantage-desc">
                    Beyond health and emergencies, we help with the everyday aspects of living independently — from grocery shopping and household support to healthcare coordination.
                  </p>
                </div>
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="blg-sidebar">
            <div className="reveal">
              <div className="blg-cta-card">
                <h3>Is your parents' home safe to age in?</h3>
                <p className="blg-cta-card-sub">
                  Our trained expert visits their home in Chennai, checks every room for safety risks, and sends you a complete report. Completely free.
                </p>
                <button className="blg-cta-card-btn">
                  Book Free Assessment
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                <p className="blg-cta-card-note">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Free. No payment info needed.
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
            <h2>Your parents deserve to age<br />at home, with <em>dignity.</em></h2>
            <p className="blg-final-sub">
              Living independently is a beautiful and achievable goal. Independence doesn't mean facing difficulties alone. 
              We make it possible — even from the other side of the world.
            </p>
            <button className="blg-final-btn">
              Book a Free Home Safety Assessment
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