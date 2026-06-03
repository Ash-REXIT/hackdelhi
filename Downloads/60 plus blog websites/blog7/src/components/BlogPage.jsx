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
            <span className="blg-eyebrow">Home Safety</span>
            <h1>Why Home Safety Matters More as<br />Parents <em>Grow Older</em></h1>
            <p className="blg-hero-sub">
              When families think about caring for ageing parents, their attention often goes to doctor visits, medications, and medical conditions. While these aspects are important, one equally important factor is often overlooked: the safety of the home itself.
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
                  A house that has been familiar and comfortable for decades may gradually become more challenging to navigate as people age. Changes in vision, balance, mobility, strength, and reaction time can transform everyday household features into potential safety hazards. What once seemed harmless may now increase the risk of falls, injuries, and other accidents.
                </p>
                <p>
                  Creating a safe living environment is not about limiting independence—it is about helping seniors maintain their confidence, comfort, and quality of life while continuing to live safely in familiar surroundings.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Why Home Safety Becomes More Important with Age */}
            <div className="reveal">
              <span className="blg-section-tag">Important Changes</span>
              <h2>Why Home Safety Becomes More Important with Age</h2>
              <div className="blg-prose">
                <p>
                  As people grow older, natural age-related changes can affect how they move around their homes.
                </p>
                <p>
                  Reduced balance, slower reflexes, vision changes, joint stiffness, and mobility limitations can make certain areas of the home more difficult to navigate. The World Health Organization (WHO) reports that falls are the second leading cause of accidental injury deaths worldwide, with adults older than 65 suffering the greatest number of these accidents in their own homes. Even simple daily activities such as climbing stairs, reaching for items, walking in dimly lit areas, or using the bathroom can become more challenging than they once were.
                </p>
                <p>
                  Unfortunately, many safety risks remain unnoticed until an accident occurs.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Common Home Safety Challenges Faced by Seniors */}
            <div className="reveal">
              <span className="blg-section-tag">Key Challenges</span>
              <h2>Common Home Safety Challenges Faced by Seniors</h2>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">Poor Lighting</p>
                    <p className="blg-point-desc">
                      Good visibility is essential for preventing accidents. Dim hallways, poorly lit staircases, shadowed corners, and inadequate lighting near entrances can significantly increase the risk of trips and falls. The National Institute on Aging (NIA) notes that by age 65, individuals generally require up to three times more light to see clearly than they did at age 20, making poor lighting not just an inconvenience, but a primary cause of home accidents. Proper lighting helps seniors move around their homes more safely and confidently.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Slippery Floors and Bathrooms</p>
                    <p className="blg-point-desc">
                      Bathrooms are among the most common locations for household accidents. According to the Centers for Disease Control and Prevention (CDC), nearly 80% of falls in the home occur in the bathroom. Wet floors, smooth tiles, slippery surfaces, and the absence of support rails can drastically increase the likelihood of life-altering injuries. Making bathrooms safer is one of the most effective ways to reduce home-related risks.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Cluttered Walkways</p>
                    <p className="blg-point-desc">
                      Items such as loose rugs, electrical cords, misplaced furniture, and household clutter may seem harmless but can create serious tripping hazards. As mobility and balance change with age, maintaining clear and accessible pathways becomes increasingly important.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Staircase Safety Issues</p>
                    <p className="blg-point-desc">
                      Stairs can become challenging for seniors experiencing reduced strength, balance, or mobility. Poor lighting, missing handrails, uneven steps, or carrying objects while using stairs can increase the risk of accidents. Ensuring staircases remain safe and accessible can significantly reduce fall-related injuries.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Hard-to-Reach Storage Areas</p>
                    <p className="blg-point-desc">
                      Many seniors continue to store household items on high shelves or in difficult-to-access locations. Stretching, climbing on stools, or reaching overhead can increase the risk of losing balance and falling. Frequently used items should be stored within easy reach whenever possible.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Lack of Emergency Preparedness</p>
                    <p className="blg-point-desc">
                      Emergencies can happen unexpectedly. A UNFPA India report highlights that over 50% of elderly individuals lack a structured emergency response plan at home. Many homes are not adequately prepared for situations such as falls, sudden illness, power outages, or other urgent circumstances, leaving seniors highly vulnerable. Missing emergency contact information, inaccessible phones, or the absence of basic emergency supplies can delay assistance when it is needed most.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Mobility Challenges Within the Home</p>
                    <p className="blg-point-desc">
                      As mobility changes with age, certain home layouts may become more difficult to navigate. Narrow hallways, uneven flooring, tight spaces, and inaccessible areas can make moving around the home more challenging and increase the risk of injury.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">08</span>
                  <div>
                    <p className="blg-point-title">Living Alone in an Unsafe Environment</p>
                    <p className="blg-point-desc">
                      Many seniors live independently and may not have someone nearby to identify potential safety concerns. The Longitudinal Ageing Study in India (LASI) indicates that approximately 20% of India's elderly live alone or with only their spouse, a demographic reality that severely limits access to immediate help when an unexpected home emergency occurs. Regular assessments can help identify these concerns before they result in accidents.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Why Home Safety Should Never Be Overlooked */}
            <div className="reveal">
              <span className="blg-section-tag">Proactive Care</span>
              <h2>Why Home Safety Should Never Be Overlooked</h2>
              <div className="blg-prose">
                <p>
                  Many families assume their parents' home remains as safe as it has always been. However, the reality is that both the individual and the environment change over time.
                </p>
                <p>
                  A loose rug, poorly lit staircase, or slippery bathroom floor may not seem dangerous until a fall occurs. By then, the consequences may include injuries, reduced mobility, loss of confidence, and extended recovery periods.
                </p>
                <p>
                  Taking a proactive approach to home safety can help prevent accidents and support healthy ageing. Research by the CDC strongly supports this, showing that making simple home modifications—like installing grab bars, improving lighting, and removing tripping hazards—can reduce the risk of home injuries by up to 30%, making a profound difference in extending independent living.
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
                  Families can actively improve home safety by taking small, structured steps. These include:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Assess Regularly</h3>
                  <p className="blg-solution-desc">
                    Conducting regular home safety assessments helps catch new hazards as they develop.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Improve Visibility</h3>
                  <p className="blg-solution-desc">
                    Improving lighting throughout the home, especially on stairs and in hallways, drastically reduces tripping risks.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Secure Bathrooms</h3>
                  <p className="blg-solution-desc">
                    Ensuring bathrooms are safe by installing grab bars and removing slippery mats is a proven lifesaver.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Prepare for Emergencies</h3>
                  <p className="blg-solution-desc">
                    Reviewing emergency preparedness measures and having plans in place offers peace of mind for everyone.
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
                  Small changes can often make a significant difference in improving safety and comfort. We believe good health involves living confidently in a secure environment. Our services are designed to support seniors not only through practical assistance but also by helping them maintain safety, independence, and a positive outlook.
                </p>
              </div>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Home Safety Assessments</h3>
                  <p className="blg-advantage-desc">
                    Our team helps identify potential safety concerns within the home environment. By evaluating common risk areas and providing practical recommendations, we help families create a safer and more comfortable living space for their ageing parents.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Wellness Check-Ins</h3>
                  <p className="blg-advantage-desc">
                    Regular interactions help us understand how seniors are managing within their home environment. These check-ins can help identify emerging challenges before they become larger safety concerns.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Identification of Concerns</h3>
                  <p className="blg-advantage-desc">
                    Changes in mobility, daily routines, or living conditions may indicate new risks. Through ongoing monitoring and observation, we help families stay informed about potential issues that may require attention.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Emergency Coordination</h3>
                  <p className="blg-advantage-desc">
                    When unexpected situations arise, having a support system in place can make a significant difference. We help coordinate assistance and ensure that seniors receive timely support when needed.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Ongoing Support Services</h3>
                  <p className="blg-advantage-desc">
                    Our services provide continuous support that helps seniors maintain their independence while ensuring their well-being remains a priority. This balanced approach promotes both safety and confidence.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Professional Guidance</h3>
                  <p className="blg-advantage-desc">
                    Many families are unsure where to begin when evaluating home safety. We provide guidance and practical insights that help families make informed decisions about creating safer living environments.
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
                  From comprehensive home safety assessments to regular wellness check-ins, our trained senior care team helps families bridge the distance and ensures your loved ones get the best support.
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
            <h2>Home Safety Starts<br /><em>Today</em></h2>
            <p className="blg-final-sub">
              Knowing that a trusted support system is regularly checking on a loved one provides reassurance for families. Our services help bridge the gap between concern and action, ensuring seniors receive the attention and support they deserve.
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