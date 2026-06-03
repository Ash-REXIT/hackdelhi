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
            <h1>Who Will Help in an Emergency?<br />Why Every Senior Needs a <em>Reliable Support System</em></h1>
            <p className="blg-hero-sub">
              Growing older often means adapting to changing health needs and new challenges. While many seniors continue to live active and independent lives, emergencies can happen without warning. A simple fall, sudden dizziness, chest pain, or an unexpected medical complication can quickly become a serious situation if help is not available nearby.
            </p>
            <div className="blg-meta">
              <span className="blg-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
                </svg>
                June 02, 2026
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
                  For families, especially those whose parents live alone, one of the biggest concerns is knowing who will be there when an emergency occurs. While regular phone calls and visits provide comfort, they cannot replace immediate assistance during a critical moment.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            <div className="reveal">
              <span className="blg-section-tag">The Reality</span>
              <h2>The Growing Importance of Emergency Support for Seniors</h2>
              <div className="blg-prose">
                <p>
                  Medical emergencies become more common as people age. According to the World Health Organization (WHO), falls are one of the leading causes of injury-related hospitalization among older adults worldwide. In addition, chronic conditions such as diabetes, hypertension, heart disease, and respiratory illnesses can sometimes worsen unexpectedly and require urgent medical attention.
                </p>
                <p>
                  The challenge becomes even greater for seniors who live alone or whose family members live far away. In many situations, the difference between a quick recovery and a serious health outcome depends on how quickly help arrives.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Signs Section (Problem) */}
            <div className="reveal">
              <span className="blg-section-tag">Key Warning Signs</span>
              <h2>Common Emergency Situations Seniors May Face</h2>
              <div className="blg-prose">
                <p>
                  Emergencies can take many forms, and being aware of the most common risks is the first step in preparation.
                </p>
              </div>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">Falls and Slips at Home</p>
                    <p className="blg-point-desc">
                      Falls are among the most common emergencies affecting older adults. Bathrooms, staircases, uneven flooring, and poor lighting can increase the risk of accidents. Even a minor fall can result in fractures, reduced mobility, long recovery periods, and a loss of confidence in performing everyday activities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Sudden Health Emergencies</p>
                    <p className="blg-point-desc">
                      Medical emergencies such as heart attacks, strokes, chest pain, breathing difficulties, and sudden weakness can occur without warning. In many cases, receiving immediate medical attention can significantly improve outcomes and reduce complications.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Dizziness and Fainting Episodes</p>
                    <p className="blg-point-desc">
                      Dizziness may occur due to medication side effects, dehydration, low blood pressure, or underlying health conditions. When a senior loses balance or faints while alone, the risk of injury and delayed assistance increases considerably.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Medication-Related Emergencies</p>
                    <p className="blg-point-desc">
                      Many seniors take multiple medications to manage ongoing health conditions. Missing doses, taking the wrong medication, or experiencing adverse drug reactions can sometimes lead to medical emergencies that require immediate attention.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Existing Health Conditions Becoming Worse</p>
                    <p className="blg-point-desc">
                      Conditions such as diabetes, high blood pressure, arthritis, and heart disease often require continuous monitoring. Without proper observation and timely intervention, these conditions may suddenly worsen and create serious health risks.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Difficulty Reaching Help During Emergencies</p>
                    <p className="blg-point-desc">
                      One of the biggest concerns during an emergency is the inability to contact someone for help. A senior experiencing a fall, illness, or medical complication may not always be able to reach a phone, call family members, or contact emergency services quickly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Family Living Far Away</p>
                    <p className="blg-point-desc">
                      Many adult children live in different cities or countries due to work and personal commitments. Although they care deeply about their parents, distance often makes it impossible to respond immediately during emergencies, creating additional stress and concern.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            <div className="reveal">
              <span className="blg-section-tag">Family Concerns</span>
              <h2>Why These Situations Should Not Be Ignored</h2>
              <div className="blg-prose">
                <p>
                  Emergencies rarely happen according to a schedule. Many seniors appear healthy and independent until an unexpected incident occurs.
                </p>
                <p>
                  A fall, missed medication, sudden illness, or worsening health condition may seem manageable initially, but delays in receiving assistance can increase the severity of the situation. For families, the uncertainty of not knowing whether their parents are safe can create ongoing anxiety and emotional stress.
                </p>
                <p>
                  Recognizing these risks early allows families to prepare before an emergency occurs rather than reacting after the fact.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Solutions Section */}
            <div className="reveal">
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>Practical Solutions for Seniors and Families</h2>
              <div className="blg-prose">
                <p>
                  The good news is that many emergency-related risks can be reduced through proper planning and support. Some practical measures include:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Health Monitoring & Check-ins</h3>
                  <p className="blg-solution-desc">
                    Scheduling regular wellness check-ins and monitoring ongoing health conditions can prevent sudden complications.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Emergency Response Plan</h3>
                  <p className="blg-solution-desc">
                    Maintaining updated emergency contact information and creating a solid response plan ensures quick action when needed.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Medication Management</h3>
                  <p className="blg-solution-desc">
                    Ensuring that daily medications are taken correctly prevents adverse reactions or worsening of chronic illnesses.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Trusted Support Network</h3>
                  <p className="blg-solution-desc">
                    Building a reliable local support network and encouraging regular communication bridges the gap for families living far away.
                  </p>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* How 60PlusIndia Helps (Advantages) */}
            <div className="reveal">
              <span className="blg-section-tag">The 60Plus India Approach</span>
              <h2>How 60PlusIndia Helps</h2>
              <div className="blg-prose">
                <p>
                  At 60PlusIndia, we understand that emergencies are not just medical situations—they are moments when timely support can make a significant difference.
                </p>
              </div>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Wellness & Health Tracking</h3>
                  <p className="blg-advantage-desc">
                    We provide regular wellness monitoring and medication tracking support to identify concerns before they become critical.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Emergency Assistance Coordination</h3>
                  <p className="blg-advantage-desc">
                    We ensure seniors have rapid access to local support and assistance exactly when they need it most.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Caregiver & Family Communication</h3>
                  <p className="blg-advantage-desc">
                    By keeping families informed and involved, we bring peace of mind to adult children living far away.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Ongoing Senior Support</h3>
                  <p className="blg-advantage-desc">
                    Consistent check-ins and support help older adults continue living safely and confidently in their own homes.
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