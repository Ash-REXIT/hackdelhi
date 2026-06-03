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
            <span className="blg-eyebrow">Emotional Well-Being</span>
            <h1>Good Health Isn't Just Physical: Why Seniors Need<br />Social and <em>Emotional Support</em></h1>
            <p className="blg-hero-sub">
              As people grow older, conversations about health often focus on doctor visits, medications, medical tests, and physical fitness. While these aspects are important, good health involves much more than the absence of illness. Emotional well-being, social connections, and a sense of belonging play an equally important role in helping seniors lead fulfilling and meaningful lives.
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
                  Many older adults may appear physically healthy but quietly struggle with loneliness, emotional stress, or a lack of meaningful interaction. These challenges often go unnoticed because they are not as visible as physical health problems. However, emotional and social well-being can significantly influence a senior's overall quality of life, confidence, happiness, and even physical health.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* The Often Overlooked Side of Healthy Ageing */}
            <div className="reveal">
              <span className="blg-section-tag">Healthy Ageing</span>
              <h2>The Often Overlooked Side of Healthy Ageing</h2>
              <div className="blg-prose">
                <p>
                  Research from the World Health Organization (WHO) highlights that social isolation and loneliness are significant public health concerns among older adults, estimating that approximately 15% of adults aged 60 and over suffer from a mental disorder, with depression and anxiety being the most common. Studies have shown that loneliness can severely affect both mental and physical health. In fact, the National Institute on Aging (NIA) indicates that prolonged social isolation is associated with a staggering 50% increased risk of developing dementia and cognitive decline, along with reduced overall well-being.
                </p>
                <p>
                  As families become busier and social circles become smaller with age, many seniors find themselves spending more time alone and having fewer meaningful conversations than they once did.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Emotional and Social Challenges Faced by Seniors */}
            <div className="reveal">
              <span className="blg-section-tag">Key Challenges</span>
              <h2>Emotional and Social Challenges Faced by Seniors</h2>
            </div>

            <div className="blg-points">
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">01</span>
                  <div>
                    <p className="blg-point-title">Loss of Purpose After Retirement</p>
                    <p className="blg-point-desc">
                      For many people, work provides structure, routine, goals, and social interaction. Retirement can be rewarding, but it can also create a sense of uncertainty. Some seniors may struggle to replace the sense of purpose they once found in their careers, leaving them feeling less engaged or productive.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">02</span>
                  <div>
                    <p className="blg-point-title">Reduced Social Interaction</p>
                    <p className="blg-point-desc">
                      Life changes such as retirement, children moving away, health limitations, or the loss of social connections can reduce opportunities for regular interaction. The Longitudinal Ageing Study in India (LASI) highlights this growing concern, revealing that nearly 20% of the elderly in India now live alone or solely with a spouse, making them highly vulnerable to social isolation as mobility decreases. Over time, fewer conversations and social activities can contribute to profound feelings of isolation and loneliness.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">03</span>
                  <div>
                    <p className="blg-point-title">Loss of Friends or Loved Ones</p>
                    <p className="blg-point-desc">
                      Ageing often brings difficult life experiences, including the loss of a spouse, siblings, relatives, or close friends. Grief can have a lasting impact on emotional well-being, especially when seniors have limited opportunities to discuss their feelings and experiences.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">04</span>
                  <div>
                    <p className="blg-point-title">Feeling Disconnected from Family Life</p>
                    <p className="blg-point-desc">
                      Many families stay connected through phone calls and occasional visits, but seniors may still feel disconnected from the everyday lives of their children and grandchildren. This feeling of being left out can affect self-worth and emotional health.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">05</span>
                  <div>
                    <p className="blg-point-title">Lack of Meaningful Conversations</p>
                    <p className="blg-point-desc">
                      Human connection goes beyond simply speaking to someone. Many seniors miss having regular conversations where they can share stories, opinions, concerns, and experiences. A lack of meaningful interaction can contribute to feelings of loneliness even when family members remain in touch.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">06</span>
                  <div>
                    <p className="blg-point-title">Emotional Stress and Anxiety</p>
                    <p className="blg-point-desc">
                      Concerns about health, finances, independence, and the future can create emotional stress. Without a strong support system, these worries may gradually affect a senior's confidence and overall well-being.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">07</span>
                  <div>
                    <p className="blg-point-title">Reduced Participation in Activities</p>
                    <p className="blg-point-desc">
                      Seniors who stop participating in hobbies, community activities, social gatherings, or personal interests may become increasingly isolated. Remaining engaged in enjoyable activities helps maintain emotional health and a sense of purpose.
                    </p>
                  </div>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-point">
                  <span className="blg-point-num">08</span>
                  <div>
                    <p className="blg-point-title">Overlooking Emotional Health</p>
                    <p className="blg-point-desc">
                      Families naturally focus on physical care, medical appointments, and healthcare needs. However, emotional health is equally important. Ignoring emotional well-being can drastically affect happiness, confidence, and overall quality of life. The Centers for Disease Control and Prevention (CDC) warns that social isolation significantly increases a person’s risk of premature death from all causes, a risk that may rival the dangers of smoking, obesity, and physical inactivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Why Emotional Well-Being Matters Section */}
            <div className="reveal">
              <span className="blg-section-tag">Emotional Wellness</span>
              <h2>Why Emotional Well-Being Matters</h2>
              <div className="blg-prose">
                <p>
                  Emotional and social health are closely connected to healthy ageing. A UNFPA India report underscores this, suggesting that seniors who actively participate in community and social activities report significantly higher life satisfaction and lower rates of chronic illness compared to those who remain isolated. Seniors who maintain strong relationships, engage in meaningful activities, and feel emotionally supported often experience:
                </p>
                <ul>
                  <li>Greater happiness and life satisfaction.</li>
                  <li>Improved confidence and self-esteem.</li>
                  <li>Better mental well-being.</li>
                  <li>Stronger social connections.</li>
                  <li>A higher quality of life.</li>
                </ul>
                <p>
                  Healthy ageing is not only about living longer—it is about living well.
                </p>
              </div>
            </div>

            <hr className="blg-divider" />

            {/* Solutions Section */}
            <div className="reveal">
              <span className="blg-section-tag">Practical Solutions</span>
              <h2>Practical Ways to Support Emotional Well-Being</h2>
              <div className="blg-prose">
                <p>
                  Families can play an active role in nurturing emotional and social health. Steps to help include:
                </p>
              </div>
            </div>

            <div className="blg-solutions">
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">01</span>
                  <h3>Encourage Social Interaction</h3>
                  <p className="blg-solution-desc">
                    Encouraging regular social interaction and helping seniors stay connected with family and friends helps combat isolation.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">02</span>
                  <h3>Spend Quality Time</h3>
                  <p className="blg-solution-desc">
                    Spending quality time together and creating opportunities for meaningful conversations strengthens emotional bonds.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">03</span>
                  <h3>Support Hobbies</h3>
                  <p className="blg-solution-desc">
                    Supporting hobbies, personal interests, and promoting participation in community activities fosters a lasting sense of purpose.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div>
                  <span className="blg-solution-num">04</span>
                  <h3>Prioritize Emotional Health</h3>
                  <p className="blg-solution-desc">
                    Recognizing emotional health as an essential and integral part of overall wellness is the foundation of healthy ageing.
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
                  We believe good health involves both physical and emotional well-being. Our services are designed to support seniors not only through practical assistance but also by helping them maintain meaningful relationships, emotional resilience, and a positive outlook on life.
                </p>
              </div>
            </div>

            <div className="blg-advantages">
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Emotional Companion Services</h3>
                  <p className="blg-advantage-desc">
                    Many seniors simply need someone who will listen, understand, and provide emotional support. Our Emotional Companion services help seniors express their thoughts, share experiences, and feel valued through regular interactions that reduce feelings of isolation and loneliness.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Talking Companion Services</h3>
                  <p className="blg-advantage-desc">
                    Meaningful conversations can have a positive impact on emotional well-being. Our Talking Companion services provide seniors with regular opportunities to engage in friendly discussions, helping them stay socially connected and emotionally engaged.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Engagement & Wellness</h3>
                  <p className="blg-advantage-desc">
                    Consistent interaction helps identify emotional concerns before they become larger issues. Through regular engagement and wellness check-ins, we help seniors maintain social connections while ensuring their overall well-being remains a priority.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Meaningful Conversations</h3>
                  <p className="blg-advantage-desc">
                    Having someone to talk to can make a significant difference in a senior's daily life. Our support focuses on creating genuine human connections that encourage emotional expression, companionship, and a greater sense of belonging.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Social Engagement Initiatives</h3>
                  <p className="blg-advantage-desc">
                    Remaining socially active is essential for healthy ageing. We encourage participation in activities and interactions that help seniors maintain confidence, stay involved, and continue enjoying meaningful experiences.
                  </p>
                </div>
              </div>
              <div className="reveal">
                <div className="blg-advantage">
                  <h3>Regular Check-Ins</h3>
                  <p className="blg-advantage-desc">
                    Routine check-ins provide reassurance for both seniors and their families. These interactions help seniors feel connected, supported, and cared for while allowing families to remain informed about their loved one's well-being.
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
                  From emotional companionship and meaningful conversations to wellness check-ins, our trained senior care team helps families bridge the distance and ensures your loved ones get the best support.
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
            <h2>Emotional Support Matters<br /><em>Reach Out Today</em></h2>
            <p className="blg-final-sub">
              By helping seniors maintain meaningful relationships and emotional resilience, we support healthier, safer, and more independent ageing. 60PlusIndia provides emotional companionship and immediate support when you can't be there.
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