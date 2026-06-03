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
            <h1>When Everyday Tasks Become Harder:<br />A Guide for Seniors Living <em>Independently</em></h1>
            <p className="blg-hero-sub">
              Many older adults value their independence and take pride in managing their daily lives on their own. Living independently can provide a sense of freedom, confidence, and dignity. However, as we age, everyday tasks that once felt simple can gradually become more challenging.
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
                  These changes often happen slowly and may go unnoticed by both seniors and their families. Physical limitations, health conditions, reduced mobility, memory-related concerns, or the absence of nearby support can make daily life more difficult over time.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Signs Section (Problem) */}
            <div className="reveal">
              <span className="blg-section-tag">Key Warning Signs</span>
              <h2>Common Challenges Seniors Face While Living Independently</h2>
              <div className="blg-prose">
                <p>
                  Understanding these changes is the first step toward staying safe, healthy, and connected. Here are the most common challenges:
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
                      Managing multiple medications can become complicated. Seniors may forget to take medicines, miss doses, take them at the wrong time, or struggle to keep track of prescription refills. Even occasional mistakes can impact overall health and wellbeing.
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
                      Routine chores such as cleaning, laundry, cooking, and home maintenance may require more energy and physical effort than before. Tasks that were once completed easily can become tiring or overwhelming.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Grocery Shopping and Running Errands</p>
                    <p className="blg-point-desc">
                      Travelling to stores, carrying groceries, standing in queues, or completing everyday errands can become physically demanding, especially for seniors with mobility issues or chronic health conditions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Attending Medical Appointments Alone</p>
                    <p className="blg-point-desc">
                      Doctor visits often involve transportation arrangements, paperwork, medication reviews, and understanding medical advice. Managing all of these responsibilities independently can be challenging.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Managing Multiple Health Conditions</p>
                    <p className="blg-point-desc">
                      Many seniors live with chronic conditions such as diabetes, hypertension, arthritis, or heart disease. Keeping track of medications, appointments, treatment plans, and lifestyle recommendations can become increasingly complex.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Reduced Mobility and Physical Strength</p>
                    <p className="blg-point-desc">
                      Walking long distances, climbing stairs, lifting objects, or moving safely around the home may become more difficult with age, increasing the risk of falls and injuries.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Forgetfulness and Memory-Related Challenges</p>
                    <p className="blg-point-desc">
                      Missing appointments, forgetting bills, misplacing important items, or struggling to remember daily routines can affect confidence and independence.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">08</span>
                  <div>
                    <p className="blg-point-title">Loneliness and Reduced Social Interaction</p>
                    <p className="blg-point-desc">
                      Living alone can sometimes lead to social isolation. Limited opportunities for conversation, companionship, and community engagement may affect emotional wellbeing and mental health.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">09</span>
                  <div>
                    <p className="blg-point-title">Difficulty Handling Unexpected Situations</p>
                    <p className="blg-point-desc">
                      Emergencies, sudden health concerns, household repairs, or unexpected events can be stressful when immediate assistance is not available.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Solutions Section */}
            <div className="reveal">
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>How Families Can Help</h2>
              <div className="blg-prose">
                <p>
                  Maintaining independence does not mean handling everything alone. Small support systems can make a significant difference while allowing seniors to continue living comfortably and confidently. Families can help by:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Medication & Health Monitoring</h3>
                  <p className="blg-solution-desc">
                    Establishing medication reminder systems and health monitoring routines to prevent skipped doses or unnoticed symptoms.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Daily Tasks & Errands</h3>
                  <p className="blg-solution-desc">
                    Providing assistance with daily tasks, groceries, and errands when the physical demand becomes too high.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Healthcare Coordination</h3>
                  <p className="blg-solution-desc">
                    Offering support for doctor visits, transportation arrangements, and overall healthcare coordination.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Social Interaction & Companionship</h3>
                  <p className="blg-solution-desc">
                    Encouraging regular social interaction and meaningful companionship to combat isolation and loneliness.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">05</span>
                  <h3>Routine Wellness Check-ins</h3>
                  <p className="blg-solution-desc">
                    Conducting routine wellness check-ins to identify any developing concerns early before they escalate.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">06</span>
                  <h3>Reliable Support Network</h3>
                  <p className="blg-solution-desc">
                    Creating a reliable support network that perfectly balances their desire for independence with the right assistance.
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
                  At 60PlusIndia, we believe that seniors deserve to live independently while having access to the support they need when challenges arise.
                </p>
              </div>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Medication Reminders & Monitoring</h3>
                  <p className="blg-advantage-desc">
                    We ensure medications are taken correctly and handle ongoing wellness monitoring for total peace of mind.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Doctor Visit Assistance</h3>
                  <p className="blg-advantage-desc">
                    Our team provides complete doctor visit and appointment assistance, handling transportation and healthcare details.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Companionship & Emotional Support</h3>
                  <p className="blg-advantage-desc">
                    We provide dedicated companionship and emotional support services to combat loneliness and encourage social engagement.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Check-ins</h3>
                  <p className="blg-advantage-desc">
                    Consistent regular check-ins and health monitoring ensure any changes in condition are caught immediately.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Day-to-Day Activity Assistance</h3>
                  <p className="blg-advantage-desc">
                    We offer active assistance with day-to-day activities, groceries, and errands to relieve the physical burden.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Family Updates & Coordination</h3>
                  <p className="blg-advantage-desc">
                    Continuous family updates and care coordination ensure loved ones abroad are always informed and involved.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Senior Support Services</h3>
                  <p className="blg-advantage-desc">
                    Comprehensive senior support services designed specifically to help older adults maintain independence safely and confidently.
                  </p>
                </div>
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="blg-sidebar">
            <div className="reveal">
              <div className="blg-cta-card">
                <h3>Are everyday tasks becoming harder for your loved one?</h3>
                <p className="blg-cta-card-sub">
                  From medication reminders and doctor visits to companionship and wellness check-ins, our trained senior care team helps older adults maintain their independence while receiving the support they need.
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
            <h2>Independent Living Shouldn't Mean<br />Living <em>Alone</em></h2>
            <p className="blg-final-sub">
              As everyday tasks become more challenging, the right support can help seniors continue living safely, confidently, and comfortably in their own homes. 60PlusIndia provides companionship, wellness monitoring, appointment assistance, and day-to-day support when it's needed most.
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