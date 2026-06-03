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
            <span className="blg-eyebrow">Preventive Healthcare</span>
            <h1>Don't Wait Until It's Serious: Why Regular Health Check-Ups<br />and Timely Medical Care Matter for <em>Seniors</em></h1>
            <p className="blg-hero-sub">
              As we grow older, our bodies often communicate health concerns through small warning signs. A little fatigue, occasional dizziness, joint discomfort, changes in vision, or mild memory lapses may seem insignificant at first. Because these symptoms develop gradually, many seniors assume they are simply a normal part of ageing.
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
                7 min read
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
                  However, what appears to be a minor issue today can sometimes become a serious health condition tomorrow if left unchecked. Regular health check-ups and timely medical care play a crucial role in identifying problems early, improving treatment outcomes, and helping seniors maintain their independence and quality of life.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* The Importance of Preventive Healthcare for Seniors */}
            <div className="reveal">
              <span className="blg-section-tag">Preventive Healthcare</span>
              <h2>The Importance of Preventive Healthcare for Seniors</h2>
              <div className="blg-prose">
                <p>
                  Preventive healthcare focuses on identifying potential health issues before they become serious. According to the World Health Organization (WHO), chronic diseases such as heart disease, diabetes, stroke, and respiratory illnesses account for over 70% of all deaths globally, making them the leading causes of illness and mortality, particularly among older adults. In addition, the United Nations Population Fund (UNFPA) India Ageing Report 2023 projects that India's elderly population will double to reach 347 million by 2050, emphasizing the urgent need for structured, preventive healthcare to support this demographic shift.
                </p>
                <p>
                  Many of these conditions develop slowly and may not show obvious symptoms in their early stages. Routine health screenings, doctor consultations, and regular monitoring help detect concerns before they become difficult to manage.
                </p>
                <p>
                  For seniors, preventive care is not just about treating illness—it is about staying healthier for longer and reducing the risk of complications.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Common Healthcare Challenges Faced by Seniors */}
            <div className="reveal">
              <span className="blg-section-tag">Key Challenges</span>
              <h2>Common Healthcare Challenges Faced by Seniors</h2>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">Ignoring Early Warning Signs</p>
                    <p className="blg-point-desc">
                      Many seniors experience symptoms such as fatigue, dizziness, joint pain, memory changes, vision problems, and sleep disturbances. Because these symptoms often develop gradually, they are frequently dismissed as normal ageing rather than potential warning signs of an underlying condition.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Delaying Doctor Visits</p>
                    <p className="blg-point-desc">
                      Many older adults only seek medical attention when symptoms become severe enough to affect daily life. Reasons may include assuming symptoms are not serious, transportation difficulties, fear of diagnosis, long waiting times, or lack of support during appointments. Unfortunately, delayed medical care can allow manageable health concerns to progress into more serious conditions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Managing Multiple Health Conditions</p>
                    <p className="blg-point-desc">
                      Many seniors live with more than one chronic condition at the same time. In fact, the Longitudinal Ageing Study in India (LASI) reports that nearly 75% of older adults in India suffer from at least one chronic health condition, with roughly 40% managing multiple morbidities simultaneously. Common examples include Diabetes, Hypertension, Arthritis, Heart disease, and Osteoporosis. Managing multiple conditions often requires regular monitoring, medication adjustments, and follow-up appointments.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Difficulty Keeping Track of Medical Information</p>
                    <p className="blg-point-desc">
                      Healthcare management becomes more complex when seniors have multiple prescriptions, diagnostic reports, lab results, follow-up schedules, and specialist consultations. Keeping track of this information can become overwhelming without proper support.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Challenges Attending Appointments</p>
                    <p className="blg-point-desc">
                      Regular check-ups are essential, but attending appointments is not always easy. Many seniors face challenges such as transportation issues, scheduling difficulties, paperwork requirements, long clinic waiting times, and communication challenges during consultations. These barriers often discourage routine healthcare visits.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Lack of Preventive Healthcare Awareness</p>
                    <p className="blg-point-desc">
                      Many people associate healthcare with treating illness after it occurs rather than preventing it. As a result, routine screenings and preventive health assessments are often overlooked until symptoms become impossible to ignore.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Missed Follow-Ups and Health Monitoring</p>
                    <p className="blg-point-desc">
                      A diagnosis is only the first step. Regular follow-up appointments and ongoing health monitoring are essential for tracking progress, adjusting treatments, preventing complications, and maintaining long-term health. Missing follow-ups can reduce the effectiveness of treatment plans. Conversely, research from the National Institute on Aging (NIA) indicates that seniors who maintain consistent doctor visits and strictly adhere to their follow-up care schedules have a 20% lower rate of preventable hospital admissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Why Early Detection Matters Section */}
            <div className="reveal">
              <span className="blg-section-tag">Proactive Care</span>
              <h2>Why Early Detection Matters</h2>
              <div className="blg-prose">
                <p>
                  Many serious health conditions are easier to manage when detected early. Regular health check-ups can help identify:
                </p>
                <ul>
                  <li><strong>High blood pressure before complications occur.</strong> Data from the Ministry of Health & Family Welfare indicates that over 30% of India's elderly population suffers from hypertension—a "silent killer" that often goes completely unnoticed without routine blood pressure screenings.</li>
                  <li><strong>Elevated blood sugar levels before diabetes worsens.</strong> The World Health Organization (WHO) warns that early detection through regular blood sugar testing is critical, as uncontrolled diabetes in seniors rapidly accelerates complications like vision loss and kidney disease.</li>
                  <li><strong>Vision or hearing issues</strong> before they impact daily life.</li>
                  <li><strong>Heart-related concerns before they become emergencies.</strong> The Centers for Disease Control and Prevention (CDC) warns that adults over 65 who miss regular cardiovascular check-ups are at a significantly higher risk of experiencing a sudden, life-threatening stroke or heart attack.</li>
                  <li><strong>Mobility problems</strong> before they lead to falls.</li>
                </ul>
                <p>
                  Early intervention often results in better health outcomes, lower healthcare costs, and improved quality of life.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Solutions Section */}
            <div className="reveal">
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>Practical Steps Families Can Take</h2>
              <div className="blg-prose">
                <p>
                  Families can actively support seniors by implementing structured routines and seeking necessary help. These steps include:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Encourage Screenings</h3>
                  <p className="blg-solution-desc">
                    Encouraging routine health screenings ensures that potential issues are caught long before symptoms appear.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Monitor Health Changes</h3>
                  <p className="blg-solution-desc">
                    Monitoring subtle changes in health and behaviour helps identify warning signs that a senior might ignore.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Maintain Medical Records</h3>
                  <p className="blg-solution-desc">
                    Maintaining organized medical records prevents errors and simplifies consultations with multiple specialists.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Support Appointments</h3>
                  <p className="blg-solution-desc">
                    Supporting appointment scheduling and follow-ups removes logistical barriers that cause seniors to delay care.
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
                  At 60PlusIndia, we believe that proactive healthcare is one of the most effective ways to support healthy ageing. Our services help seniors stay on top of their healthcare needs, completely removing the logistical burden. By helping seniors access timely medical care and ongoing health monitoring, we support healthier, safer, and more independent ageing.
                </p>
              </div>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Wellness Monitoring</h3>
                  <p className="blg-advantage-desc">
                    Regular wellness monitoring and check-ins to catch minor issues before they escalate.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Doctor Visit Support</h3>
                  <p className="blg-advantage-desc">
                    Assistance with doctor visits and appointment scheduling, including transportation and companionship.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Healthcare Coordination</h3>
                  <p className="blg-advantage-desc">
                    Complete healthcare coordination and dedicated follow-up support to track treatment progress.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Medication Management</h3>
                  <p className="blg-advantage-desc">
                    Assistance with medication management to ensure prescriptions are filled and taken consistently.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Home Visit Support</h3>
                  <p className="blg-advantage-desc">
                    Home visit support when required, ensuring safety and comfort without the need to travel.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Family Updates</h3>
                  <p className="blg-advantage-desc">
                    Transparent family updates regarding health and well-being, keeping you informed regardless of distance.
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
                  From wellness check-ins and doctor visits to companionship and emergency response, our trained senior care team helps families bridge the distance and ensures your loved ones get the best support.
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
            <h2>Proactive Care Starts<br /><em>Today</em></h2>
            <p className="blg-final-sub">
              By helping seniors access timely medical care and ongoing health monitoring, we support healthier, safer, and more independent ageing. 60PlusIndia provides wellness monitoring, appointment assistance, and immediate emergency response when you can't be there.
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