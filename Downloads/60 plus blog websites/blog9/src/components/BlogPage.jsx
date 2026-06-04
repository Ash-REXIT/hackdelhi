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
            <span className="blg-eyebrow">Cognitive Health</span>
            <h1>When Small Memory Lapses<br />Become a <em>Bigger Concern</em></h1>
            <p className="blg-hero-sub">
              Forgetfulness is often considered a normal part of ageing. Misplacing keys, forgetting a name, or occasionally missing an appointment can happen to anyone. According to the National Institute on Aging (NIA), it is important to distinguish between this normal age-related forgetfulness and true cognitive decline. When memory lapses become more frequent or begin affecting daily life, they may indicate that a senior needs additional support and attention.
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
                  Many families struggle to distinguish between normal age-related forgetfulness and signs that something more significant may be developing. The Alzheimer's Association notes that an estimated 10 to 20 percent of older adults aged 65 and older experience Mild Cognitive Impairment (MCI)—an early stage of noticeable memory loss.
                </p>
                <p>
                  Because these changes often occur gradually, they can easily be overlooked until they start affecting a senior's safety, independence, and quality of life. The World Health Organization (WHO) estimates that more than 55 million people worldwide live with dementia, with nearly 10 million new cases every year, highlighting why these gradual changes in memory should never be ignored. Furthermore, the Longitudinal Ageing Study in India (LASI) reveals that cognitive impairment is a rapidly growing public health concern among the nation's ageing population, making awareness crucial for families.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Warning Signs */}
            <div className="reveal">
              <span className="blg-section-tag">Warning Signs</span>
              <h2>Common Memory-Related Concerns</h2>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">Repeating the Same Questions or Stories</p>
                    <p className="blg-point-desc">
                      Frequently asking the same questions or repeating conversations without remembering previous discussions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Forgetting Important Appointments</p>
                    <p className="blg-point-desc">
                      Missing medical appointments, family events, or scheduled activities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Misplacing Everyday Items</p>
                    <p className="blg-point-desc">
                      Frequently losing keys, wallets, glasses, mobile phones, or medications.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Difficulty Managing Medications</p>
                    <p className="blg-point-desc">
                      Forgetting doses, taking medications twice, or becoming confused about prescriptions. Studies in peer-reviewed medical journals indicate that memory-related forgetfulness is a leading cause of dangerous medication errors among older adults.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Trouble Following Daily Routines</p>
                    <p className="blg-point-desc">
                      Difficulty keeping track of household tasks, schedules, or responsibilities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Getting Confused About Dates or Time</p>
                    <p className="blg-point-desc">
                      Forgetting the day, month, or upcoming commitments.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Changes in Decision-Making</p>
                    <p className="blg-point-desc">
                      Finding it harder to make everyday decisions or manage personal affairs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">08</span>
                  <div>
                    <p className="blg-point-title">Withdrawing from Activities</p>
                    <p className="blg-point-desc">
                      Avoiding hobbies, social events, or activities that were once enjoyable due to frustration or lack of confidence. This is particularly important to watch for, as the Centers for Disease Control and Prevention (CDC) emphasizes that regular social engagement and mental stimulation are strongly linked to better cognitive health.
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
                  Early awareness is one of the most effective ways to support seniors experiencing memory-related challenges. Research consistently shows that early identification and intervention for memory-related concerns can significantly improve care outcomes, allowing families to plan ahead and manage symptoms more effectively. Recognizing changes early allows families to provide the right support while helping seniors maintain independence and confidence.
                </p>
                <p>
                  Families can help by:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Observing Changes</h3>
                  <p className="blg-solution-desc">
                    Observing changes in memory and behaviour over time.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Encouraging Health Checks</h3>
                  <p className="blg-solution-desc">
                    Encouraging regular health check-ups and cognitive assessments.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Creating Structured Routines</h3>
                  <p className="blg-solution-desc">
                    Creating structured daily routines to provide predictability.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Using Reminders</h3>
                  <p className="blg-solution-desc">
                    Using medication reminders and calendars to ensure adherence.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">05</span>
                  <h3>Maintaining Engagement</h3>
                  <p className="blg-solution-desc">
                    Maintaining regular communication and engagement to reduce isolation.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">06</span>
                  <h3>Supporting Mental Stimulation</h3>
                  <p className="blg-solution-desc">
                    Supporting mental stimulation through activities and social interaction.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">07</span>
                  <h3>Seeking Professional Guidance</h3>
                  <p className="blg-solution-desc">
                    Seeking professional guidance when concerns become more frequent.
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
                  <h3>Wellness Monitoring</h3>
                  <p className="blg-advantage-desc">
                    Regular wellness check-ins help identify changes in memory, behaviour, and daily routines that families may not immediately notice. Early observations can help families take proactive steps before challenges become more significant.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Check-Ins</h3>
                  <p className="blg-advantage-desc">
                    Consistent interactions provide opportunities to monitor overall well-being while ensuring seniors remain engaged and connected. These check-ins can help identify emerging concerns that may require additional attention.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Healthcare Coordination</h3>
                  <p className="blg-advantage-desc">
                    When memory-related concerns arise, healthcare support becomes increasingly important. We help coordinate appointments, follow-ups, and communication, ensuring seniors receive the care and guidance they need.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Medication Support</h3>
                  <p className="blg-advantage-desc">
                    Managing medications can become difficult when memory changes occur. Our support services help seniors stay on track with medication schedules and healthcare routines.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Family Communication and Updates</h3>
                  <p className="blg-advantage-desc">
                    For family members who live away, regular updates provide reassurance and help them stay informed about changes in their loved one's well-being.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Personalized Senior Support</h3>
                  <p className="blg-advantage-desc">
                    Every senior experiences ageing differently. Our services are tailored to individual needs, helping families provide appropriate support while respecting independence and dignity.
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