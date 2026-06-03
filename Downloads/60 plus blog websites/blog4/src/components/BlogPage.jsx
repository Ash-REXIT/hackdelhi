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
            <h1>When Your Parents Need Help,<br />But You Live <em>Miles Away</em></h1>
            <p className="blg-hero-sub">
              Modern life often takes families in different directions. Children move to other cities for work, settle abroad for better opportunities, or build their own lives far from where they grew up. While technology has made communication easier than ever, many adult children still face a difficult question every day: "How do I take care of my ageing parents when I am not there?"
            </p>
            <div className="blg-meta">
              <span className="blg-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
                </svg>
                June 03, 2026
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
                  For many families, distance creates a unique challenge. Parents may appear independent and self-sufficient, but it can be difficult to know what is really happening in their daily lives. A missed meal, a forgotten medication, a minor health issue, or even feelings of loneliness can easily go unnoticed when families live miles apart.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* The Growing Reality Section */}
            <div className="reveal">
              <span className="blg-section-tag">Growing Reality</span>
              <h2>The Growing Reality of Long-Distance Caregiving</h2>
              <div className="blg-prose">
                <p>
                  Long-distance caregiving has become increasingly common in today's world. As families become more geographically dispersed, many adult children find themselves responsible for ageing parents from another city, state, or even country.
                </p>
                <p>
                  This shift is reflected in changing family structures. According to the Longitudinal Ageing Study in India (LASI), approximately 20% of elderly individuals in India now live either alone or only with their spouse, a number that is steadily increasing as younger generations migrate for work.
                </p>
                <p>
                  While regular phone calls and video chats help maintain connections, they cannot always provide a complete picture of a parent's well-being. Many seniors prefer not to share their difficulties because they do not want to burden their children or cause unnecessary worry.
                </p>
                <p>
                  As a result, families often find themselves constantly wondering whether their parents are truly doing well.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Challenges Section */}
            <div className="reveal">
              <span className="blg-section-tag">Key Challenges</span>
              <h2>Challenges Faced by Families Living Far Away</h2>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">The Constant Worry Factor</p>
                    <p className="blg-point-desc">
                      One of the biggest emotional challenges for adult children is the constant concern about their parents' well-being. Questions such as "Are they eating properly?", "Are they taking their medications on time?", or "Are they managing daily activities comfortably?" often remain in the back of a person's mind, creating ongoing stress and uncertainty.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Feeling Guilty About Living Away</p>
                    <p className="blg-point-desc">
                      Many adult children experience feelings of guilt because they cannot be physically present to support their parents. Even when moving away was necessary for career growth or personal reasons, many people feel they are not doing enough for the people who once cared for them. This emotional burden can be difficult to manage, especially when parents begin facing age-related challenges.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Not Knowing What Is Happening Day-to-Day</p>
                    <p className="blg-point-desc">
                      Small changes often provide the earliest signs that a parent may need additional support. Changes in eating habits, mobility, energy levels, mood, personal hygiene, or household maintenance can develop gradually. When families live far away, these warning signs may go unnoticed until a larger problem develops. This is particularly concerning given that the National Institute on Aging (NIA) highlights how social isolation and living alone can significantly increase the risks of physical decline and depression among older adults, conditions that are easily missed over a brief phone call.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Being Unable to Help During Unexpected Situations</p>
                    <p className="blg-point-desc">
                      Unexpected situations can arise at any time. A fall, sudden illness, home maintenance issue, transportation problem, or medical concern may require immediate attention. The risk of such sudden events is substantial; the World Health Organization (WHO) reports that falls are a leading cause of injury among older adults worldwide, and prompt assistance can make a critical difference in recovery. For family members living hundreds or thousands of kilometres away, responding quickly is often impossible.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Difficulty Coordinating Care from A Far</p>
                    <p className="blg-point-desc">
                      Managing healthcare, appointments, medications, household support, and other needs can become complicated when done remotely. This coordination is vital, as the Centers for Disease Control and Prevention (CDC) estimates that nearly 85% of older adults manage at least one chronic health condition, requiring consistent monitoring and regular medical visits. Simple tasks often require multiple phone calls, coordination with different service providers, and constant follow-up.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Parents Hiding Problems</p>
                    <p className="blg-point-desc">
                      Many seniors value their independence and do not want their children to worry. As a result, they may downplay health concerns, avoid discussing difficulties, or insist that everything is fine even when they need assistance. While these intentions come from a place of love, they can prevent families from recognizing problems early.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Lack of Local Support</p>
                    <p className="blg-point-desc">
                      Not every senior has relatives, neighbours, or close friends available nearby. Without a reliable local support system, even small challenges can become difficult to manage. Families often worry about who will be there when their parents need assistance, companionship, or emergency support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Why Distance Should Not Mean Disconnection */}
            <div className="reveal">
              <span className="blg-section-tag">Staying Connected</span>
              <h2>Why Distance Should Not Mean Disconnection</h2>
              <div className="blg-prose">
                <p>
                  Living far away does not mean children care any less about their parents. In fact, many long-distance caregivers spend significant time and energy trying to stay informed and involved in their parents' lives.
                </p>
                <p>
                  With the India Ageing Report 2023 by UNFPA projecting that the elderly population in India will double by 2050, finding effective ways to provide care from a distance is becoming a necessary reality for more families than ever before.
                </p>
                <p>
                  The key is to create a support system that helps bridge the gap between physical distance and daily care needs. When the right support network is in place, families can remain connected, informed, and reassured even when they cannot be physically present.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Solutions Section */}
            <div className="reveal">
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>How Families Can Help From A Far</h2>
              <div className="blg-prose">
                <p>
                  There are several ways families can better support ageing parents from a far. These proactive steps can help reduce uncertainty while improving safety and quality of life for seniors:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Communication & Check-ins</h3>
                  <p className="blg-solution-desc">
                    Establish regular communication and wellness check-ins to stay actively involved in their daily routines.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Medication Monitoring</h3>
                  <p className="blg-solution-desc">
                    Monitor medications and healthcare needs consistently to prevent any missed doses or complications.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Healthcare Coordination</h3>
                  <p className="blg-solution-desc">
                    Arrange dedicated support for doctor visits, follow-up medical appointments, and health check-ups.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Social Interaction</h3>
                  <p className="blg-solution-desc">
                    Encourage social interaction and companionship to prevent the feelings of isolation that come with living alone.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">05</span>
                  <h3>Emergency Plan</h3>
                  <p className="blg-solution-desc">
                    Create a robust emergency response plan so prompt assistance is available in case of an unexpected event.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">06</span>
                  <h3>Support Network</h3>
                  <p className="blg-solution-desc">
                    Build a trusted local support network that perfectly balances their independence with immediate assistance.
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
                  At 60PlusIndia, we understand the challenges faced by families whose parents live far away. Our services help bridge the distance gap by providing reliable local support and regular monitoring. By acting as a trusted support partner, we help families stay informed, stay connected, and gain peace of mind knowing their loved ones are receiving the care and attention they deserve.
                </p>
              </div>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Wellness Check-ins</h3>
                  <p className="blg-advantage-desc">
                    We conduct regular wellness check-ins to monitor health, safety, and overall well-being.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Family Communication</h3>
                  <p className="blg-advantage-desc">
                    We provide transparent updates and consistent communication for family members living far away.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Companionship</h3>
                  <p className="blg-advantage-desc">
                    Our team offers dedicated companionship and encourages active social engagement for your parents.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Healthcare Coordination</h3>
                  <p className="blg-advantage-desc">
                    We assist with complete healthcare coordination and appointment support for a stress-free experience.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Emergency Assistance</h3>
                  <p className="blg-advantage-desc">
                    Our prompt emergency assistance and response coordination provide immediate help when it matters most.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Day-to-Day Support</h3>
                  <p className="blg-advantage-desc">
                    We offer active assistance with day-to-day activities, groceries, and errands to relieve the physical burden.
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
            <h2>Distance Shouldn't Mean<br /><em>Disconnection</em></h2>
            <p className="blg-final-sub">
              As parents age, the right support network can help them continue living safely and comfortably, bridging the gap between physical distance and daily care needs. 60PlusIndia provides wellness monitoring, appointment assistance, and immediate emergency response when you can't be there.
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