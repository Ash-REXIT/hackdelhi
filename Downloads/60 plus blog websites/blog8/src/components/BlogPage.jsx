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
            <span className="blg-eyebrow">Family Awareness</span>
            <h1>Your Parents Say They're Fine—But<br />Are They <em>Really?</em></h1>
            <p className="blg-hero-sub">
              Many ageing parents take pride in being independent and self-reliant. Even when they face difficulties, they often reassure their children by saying, "I'm fine, don't worry." While these words are comforting, they do not always reflect the reality of what is happening in their daily lives.
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
                  Parents may avoid discussing challenges because they do not want to burden their children, especially when they live far away. Research from the National Institute on Aging (NIA) supports this, showing that older adults frequently downplay or hide health concerns to maintain their sense of independence. As a result, small problems can remain hidden until they become more serious concerns affecting health, safety, and overall well-being.
                </p>
                <p>
                  This blog will focus on the subtle, often overlooked signs that families need to watch out for.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Overlooked Signs */}
            <div className="reveal">
              <span className="blg-section-tag">Warning Signs</span>
              <h2>Signs That Families May Overlook</h2>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">Changes in Personal Hygiene</p>
                    <p className="blg-point-desc">
                      Reduced attention to grooming, cleanliness, or appearance can be a subtle indicator that a senior is struggling physically or emotionally.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Unexplained Weight Loss or Poor Eating Habits</p>
                    <p className="blg-point-desc">
                      Skipping meals, reduced appetite, or finding it difficult to prepare food can be an early sign of physical decline or cognitive changes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Increasing Forgetfulness</p>
                    <p className="blg-point-desc">
                      Missing medications, forgetting appointments, or repeating conversations. The CDC reports that over 50% of older adults struggle with medication adherence, a hidden issue that can quickly lead to serious health complications if left unmonitored.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Reduced Mobility and Activity Levels</p>
                    <p className="blg-point-desc">
                      Spending more time indoors, avoiding stairs, or skipping activities they once genuinely enjoyed can signal pain or a fear of falling.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Changes in Mood or Behaviour</p>
                    <p className="blg-point-desc">
                      Irritability, sudden withdrawal, sadness, or an uncharacteristic loss of interest in hobbies.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Home Maintenance Being Neglected</p>
                    <p className="blg-point-desc">
                      Household chores, repairs, and basic cleaning becoming noticeably difficult for them to manage independently.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Avoiding Discussions About Health</p>
                    <p className="blg-point-desc">
                      Actively downplaying symptoms or outright avoiding conversations about upcoming medical concerns.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">08</span>
                  <div>
                    <p className="blg-point-title">Reluctance to Ask for Help</p>
                    <p className="blg-point-desc">
                      Wanting to remain independent at all costs, even when it is overwhelmingly clear that support is needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* The Hidden Factor Section */}
            <div className="reveal">
              <span className="blg-section-tag">The Hidden Factor</span>
              <h2>Why Seniors Hide Their Struggles</h2>
              <div className="blg-prose">
                <p>
                  Why do parents hide these struggles? Often, it stems from isolation. The World Health Organization (WHO) reports that around 1 in 4 older people are socially isolated and around 1 in 10 experience severe loneliness. When living alone with poor social support, the risk of related health challenges skyrockets.
                </p>
                <p>
                  In India, the Longitudinal Ageing Study in India (LASI) highlights that nearly 20% of the elderly live alone or solely with a spouse. Studies across India have found loneliness to be a significant concern, reporting rates around 40% in surveyed elderly populations. Research clearly shows this social isolation and loneliness can significantly affect physical health, mental health, and overall quality of life.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Solutions Section */}
            <div className="reveal">
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>How Families Can Look Beyond Reassurances</h2>
              <div className="blg-prose">
                <p>
                  Families should look beyond simple reassurances and stay actively involved in their parents' lives. Early awareness allows families to provide support before small issues affect a parent's independence. Practical steps include:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Engage in Meaningful Conversations</h3>
                  <p className="blg-solution-desc">
                    Having regular and meaningful conversations to gauge their true emotional state.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Observe Routines</h3>
                  <p className="blg-solution-desc">
                    Paying close attention to unexplained changes in behaviour, hygiene, and daily routines.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Schedule Wellness Check-Ins</h3>
                  <p className="blg-solution-desc">
                    Scheduling regular wellness check-ins to monitor medication and healthcare needs.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Build a Local Support System</h3>
                  <p className="blg-solution-desc">
                    Addressing concerns early and building a trusted local support network before larger problems arise.
                  </p>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* How 60PlusIndia Helps */}
            <div className="reveal">
              <span className="blg-section-tag">The 60Plus India Approach</span>
              <h2>How 60PlusIndia Helps</h2>
              <div className="blg-prose">
                <p>
                  Every senior's needs are different. Our services are designed to provide the right balance of support, independence, dignity, and care based on each individual's unique circumstances.
                </p>
              </div>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Wellness Check-Ins</h3>
                  <p className="blg-advantage-desc">
                    Our wellness check-ins provide a clearer picture of how seniors are doing beyond occasional phone calls. Regular interactions help identify small changes in health, behaviour, and daily routines that families may not otherwise notice.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Ongoing Observation and Support</h3>
                  <p className="blg-advantage-desc">
                    Many age-related challenges develop gradually. Through consistent engagement, we help identify potential concerns early, allowing families to take proactive steps before situations become more serious.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Companionship and Interaction</h3>
                  <p className="blg-advantage-desc">
                    Regular conversations create opportunities for seniors to share concerns, discuss challenges, and stay emotionally connected. This helps reduce isolation while improving overall well-being.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Health Monitoring</h3>
                  <p className="blg-advantage-desc">
                    Changes in mobility, eating habits, medication routines, or general health can indicate that additional support is needed. We help families stay informed through ongoing monitoring and observation.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Family Updates</h3>
                  <p className="blg-advantage-desc">
                    For children living away from their parents, regular updates provide reassurance and peace of mind. We help families remain informed about their loved one's well-being and daily life.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Personalized Senior Support</h3>
                  <p className="blg-advantage-desc">
                    We adapt to your parents' needs. By addressing concerns early, our personalized care plans ensure that small issues do not escalate into emergencies.
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
            <h2>Look Beyond "I'm Fine"<br /><em>Reach Out Today</em></h2>
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