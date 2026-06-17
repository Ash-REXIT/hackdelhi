import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar, Phone, ShieldCheck, Heart, Clock,
  MapPin, Stethoscope, FileText, Pill, Bell,
  ChevronRight, ChevronDown, CheckCircle, Lock, Star, Users
} from 'lucide-react';
import Navbar from '../components/Navbar';
import useMetaTags from '../hooks/useMetaTags';
import PremiumPhone from '../components/PremiumPhone';
import styles from './PremiumLanding.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function PremiumLanding() {
  useMetaTags({
    title: 'Complete Medical Advocacy for NRIs | 60 Plus India',
    description: 'When you can\'t be there, we can. Professional medical advocacy and healthcare support for your parents in Chennai.',
  });

  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const servicesRef = useRef(null);
  const peaceRef = useRef(null);
  
  const [activeNotif, setActiveNotif] = useState(0);
  const [isClimax, setIsClimax] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTrustIndex, setActiveTrustIndex] = useState(0);

  const trustFeatures = [
    { icon: <Star size={24} />, title: "Local Expertise", desc: "Deep understanding of Chennai's healthcare system and best hospitals." },
    { icon: <Users size={24} />, title: "Trusted & Verified Advocates", desc: "Background-verified professionals who treat your parents like their own." },
    { icon: <ShieldCheck size={24} />, title: "Complete Confidentiality", desc: "Your family's information and health details are always safe with us." },
    { icon: <Clock size={24} />, title: "Always Accessible", desc: "We're just a call or message away, whenever you need us." }
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const careJourney = [
    {
      title: "Mom arrives at hospital",
      desc: "We accompany her from the very beginning.",
      img: "/assets/story/scenes/scene_1.png"
    },
    {
      title: "Consultation with Doctor",
      desc: "We ensure she gets the right medical attention.",
      img: "/assets/story/scenes/scene_2.png"
    },
    {
      title: "Prescription Collected",
      desc: "We collect and review the prescription.",
      img: "/assets/story/scenes/scene_3.png"
    },
    {
      title: "Medicines Purchased",
      desc: "We purchase the medicines as prescribed.",
      img: "/assets/story/scenes/scene_4.png"
    },
    {
      title: "Reached Home Safely",
      desc: "We ensure she reaches home safely.",
      img: "/assets/story/scenes/scene_5.png"
    },
    {
      title: "Update Shared With You",
      desc: "You receive real-time updates, wherever you are.",
      img: "/assets/story/scenes/scene_6.png"
    }
  ];

  // --------------------------------------------------------------------------
  // GSAP SCROLL ANIMATIONS
  // --------------------------------------------------------------------------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      

      // --- SECTION SPECIFIC ANIMATIONS ---

      // Trust Section Scroll Spy (Tracks which text block is active)
      trustFeatures.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `#trust-block-${i}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveTrustIndex(i);
          }
        });
      });

      // Trust Section Sticky Image Slow Zoom
      gsap.fromTo(".trustStickyImage", 
        { scale: 1 }, 
        { 
          scale: 1.05, 
          ease: "none",
          scrollTrigger: {
            trigger: "#trust-section-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        }
      );

      // Hero Parallax
      gsap.to(".heroBg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".heroSectionTrigger",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Trust Sequential Reveal
      gsap.from(".trustFeatureCard", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trustSectionTrigger",
          start: "top 60%",
        }
      });

      // Horizontal Services Scroll
      const servicesContent = document.querySelector('.servicesHorizontalContainer');
      gsap.to(servicesContent, {
        x: () => -(servicesContent.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top top",
          end: "+=800", // Reduced scroll distance
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Set initial positions for GSAP (img 0 is at 0, others at 100%)
      for (let i = 1; i < 6; i++) {
        gsap.set(`.peace-img-${i}`, { xPercent: 100 });
      }

      // --- MASTER TIMELINE FOR PEACE SECTION ---
      // Created AFTER the services scroll so GSAP calculates pinning order correctly!
      const peaceTl = gsap.timeline({
        scrollTrigger: {
          trigger: peaceRef.current,
          start: "top top",
          end: "+=5000", // Increased scroll distance for ultra-smooth 6 scenes
          pin: true,
          scrub: 0.5, // Reduced from 1.5 to remove scroll lag
          onUpdate: (self) => {
            const time = self.animation.time();
            let newIndex = 0;
            
            // Map timeline seconds directly to the active scene index
            if (time < 1.5) newIndex = 0;
            else if (time < 3.75) newIndex = 1;
            else if (time < 5.95) newIndex = 2;
            else if (time < 8.15) newIndex = 3;
            else if (time < 10.35) newIndex = 4;
            else newIndex = 5;
            
            setActiveNotif((prev) => prev !== newIndex ? newIndex : prev);
            
            // At 15 seconds, the timeline enters the "outro". 
            // 15.5s is when the phone reaches the center and should switch to video call.
            setIsClimax(time > 15.5); 
          }
        }
      });

      // Intro Fade In
      peaceTl.fromTo(".peaceTitleBlock", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      peaceTl.fromTo(phoneRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "<");
      peaceTl.to({}, { duration: 0.5 }); // Let user read

      // 5 Cinematic Image Transitions
      for (let i = 0; i < 5; i++) {
        peaceTl.to(`.peace-img-${i}`, { xPercent: -100, duration: 1, ease: "none" }, `step${i}`)
               .to(`.peace-text-${i}`, { opacity: 0, x: -20, duration: 0.5 }, `step${i}`)
               .fromTo(`.peace-img-${i+1}`, { xPercent: 100 }, { xPercent: 0, duration: 1, ease: "none" }, `step${i}`)
               .fromTo(`.peace-text-${i+1}`, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 }, `step${i}+=0.3`)
               .to({}, { duration: 1.2 }); // Increased pause to look at scene so it rests smoothly
      }

      // Long pause to let user view the final 6th scene before fading out
      peaceTl.to({}, { duration: 3 });

      // Outro (The 3D Continuous Climax)
      const climaxAnimation = isMobile 
        ? { 
            y: "-20vh", 
            scale: 0.9, 
            rotation: 0, 
            rotateY: 0, 
            rotateX: 5, 
            transformPerspective: 1000,
            boxShadow: '0 40px 80px rgba(0,0,0,0.6)', 
            duration: 1.5, 
            ease: "power2.inOut" 
          }
        : { 
            x: "-25vw", 
            y: "-5vh", 
            scale: 0.9, 
            rotation: -90, 
            rotateY: 0, 
            rotateX: 10, 
            transformPerspective: 1000,
            boxShadow: '0 40px 80px rgba(0,0,0,0.6)', 
            duration: 1.5, 
            ease: "power2.inOut" 
          };

      peaceTl.to(".peaceImagesContainer", { opacity: 0, duration: 1 }, "outro")
             .to(".peaceTextContainer", { opacity: 0, duration: 1 }, "outro")
             .to(".peaceTitleBlock", { opacity: 0, duration: 1 }, "outro")
             .to(".phoneAnimWrapper", climaxAnimation, "outro")
             .fromTo(".peaceExitText", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "outro+=1.2")
             .to({}, { duration: 1.5 }); // Final pause

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={containerRef} className={styles.pageContainer} style={{ position: 'relative' }}>
      <Navbar alwaysWhite={false} autoHide={true} />



      {/* 1. HERO SECTION */}
      <section className={`heroSectionTrigger ${styles.heroSection}`} style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="heroBg" style={{
          position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%',
          backgroundImage: `url('/assets/story/character/hero_section.png')`,
          backgroundSize: 'cover', backgroundPosition: 'top right', zIndex: 0
        }} />
        <div className={styles.heroOverlay} style={{ zIndex: 1 }}></div>
        
        <div className={styles.heroContent} style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.heroText}>
            <div className={styles.heroTitleWrapper}>
              <span className={styles.quoteLeft}>&ldquo;</span>
              <h1 className={styles.heroTitle}>
                When You <br/>Can't Be There,<br />
                <span className={styles.heroTitleGold}>We Can.</span>
              </h1>
              <span className={styles.quoteRight}>&rdquo;</span>
            </div>

            <div className={styles.titleLine}></div>

            <p className={styles.heroSubtitle}>
              Your parents deserve the best care,<br/>
              even when you're far away.
            </p>

            <div className={styles.heroActions}>
              <a href="#assessment" className={styles.primaryBtn}>
                <Calendar size={18} />
                Book a Free Assessment
              </a>
              <a href="tel:+911234567890" className={styles.secondaryBtn}>
                <Phone size={18} />
                Talk to Our Care Team
              </a>
            </div>

            <div className={styles.heroTrustBadge}>
              <ShieldCheck size={32} className={styles.badgeIcon} />
              <div className={styles.badgeText}>
                Trusted by NRIs worldwide.<br />
                Proudly serving families in Chennai.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION (Scrollytelling) */}
      <section id="trust-section-container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', position: 'relative', backgroundColor: '#FBF9F6', color: '#0B1021' }}>
        
        {/* Left Column: 55% Sticky Image */}
        <div style={{ width: isMobile ? '100%' : '55%', padding: isMobile ? '0' : '10vh 2vw 10vh 5vw', position: isMobile ? 'sticky' : 'relative', top: isMobile ? 0 : 'auto', height: isMobile ? '100vh' : 'auto', zIndex: 0 }}>
          <div style={{ width: '100%', position: 'sticky', top: '10vh', height: isMobile ? '100vh' : '80vh', borderRadius: isMobile ? '0' : '24px', overflow: 'hidden', boxShadow: isMobile ? 'none' : '0 20px 40px rgba(0,0,0,0.1)' }}>
            
            <img 
              className="trustStickyImage"
              src="/assets/story/character/second_section.png" 
              alt="Care advocate with elderly parents" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center center' }}
            />

            {/* Gradient Overlay for Mobile Legibility */}
            {isMobile && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,16,33,0.9) 0%, rgba(11,16,33,0.4) 100%)' }}></div>}

            {/* Floating Relationship Card */}
            {!isMobile && (
              <div style={{ position: 'absolute', bottom: '40px', left: '40px', backgroundColor: '#0B1021', padding: '24px 32px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', border: '1px solid #D4AF37', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Users size={24} color="#D4AF37" />
                </div>
                <div>
                  <p style={{ color: 'white', margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>We don't just provide services.</p>
                  <p style={{ color: '#D4AF37', margin: '4px 0 0 0', fontSize: '1.1rem', fontWeight: 500 }}>We build relationships.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 45% Scrolling Content */}
        <div style={{ width: isMobile ? '100%' : '45%', position: 'relative', padding: isMobile ? '0 5vw' : '10vh 5vw 0 4vw', zIndex: 10, marginTop: isMobile ? '-100vh' : 0, display: 'flex' }}>
          
          {/* Sticky Progress Indicator (Left side of right column) */}
          <div style={{ position: 'sticky', top: '10vh', height: '80vh', display: 'flex', flexDirection: 'column', marginRight: '4vw', paddingTop: '20vh' }}>
            
            {/* Absolute Eyebrow to not disrupt block alignment */}
            <div style={{ position: 'absolute', top: 0, left: 0, textTransform: 'uppercase', letterSpacing: '2px', color: isMobile ? '#D4AF37' : '#B89045', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
              Why Families Trust 60 Plus India
            </div>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '40vh', alignItems: 'center' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', backgroundColor: 'rgba(11,16,33,0.1)', transform: 'translateX(-50%)', zIndex: -1 }}></div>
              {trustFeatures.map((_, i) => {
                const isCompleted = i < activeTrustIndex;
                const isActive = i === activeTrustIndex;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '16px', height: '16px', borderRadius: '50%', 
                      backgroundColor: isActive ? '#D4AF37' : isCompleted ? '#D4AF37' : '#FBF9F6', 
                      border: `2px solid ${isActive || isCompleted ? '#D4AF37' : 'rgba(11,16,33,0.2)'}`,
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      transition: 'all 0.4s ease', zIndex: 2,
                      boxShadow: isActive ? '0 0 10px rgba(212,175,55,0.5)' : 'none'
                    }}>
                      {isCompleted && <CheckCircle size={10} color="white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scrolling Text Blocks Container */}
          <div style={{ flex: 1 }}>
            {/* Blocks */}
            <div style={{ paddingBottom: '20vh' }}>
              {trustFeatures.map((f, i) => (
                <div id={`trust-block-${i}`} key={i} style={{ 
                  height: '80vh', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  opacity: activeTrustIndex === i ? 1 : 0.15,
                  transform: `translateY(${activeTrustIndex === i ? 0 : '10px'})`,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  <div style={{ fontFamily: 'Gambarino, serif', fontSize: 'clamp(3rem, 5vw, 5rem)', color: 'rgba(212,175,55,0.4)', lineHeight: 1, letterSpacing: '-2px' }}>
                    0{i+1}
                  </div>
                  <h3 style={{ fontFamily: 'Gambarino, serif', fontSize: 'clamp(2rem, 3vw, 3.5rem)', color: isMobile ? 'white' : '#0B1021', margin: '12px 0 20px 0', lineHeight: 1.1 }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: 'clamp(1rem, 1.1vw, 1.2rem)', color: isMobile ? 'rgba(255,255,255,0.8)' : 'rgba(11,16,33,0.7)', maxWidth: '380px', lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* 3. SERVICES SECTION (Horizontal Scroll) */}
      <section ref={servicesRef} className={`servicesSectionTrigger ${styles.servicesSection}`} style={{ overflow: 'hidden', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: 0 }}>
        <div className={styles.sectionHeader} style={{ position: 'absolute', top: '10%', width: '100%' }}>
          <span className={styles.sectionEyebrow}>Our Services</span>
          <h2 className={styles.sectionTitle}>
            Complete Medical Advocacy.<br />
            <span className={styles.sectionTitleGold}>Handled with Care.</span>
          </h2>
        </div>

        <div className="servicesHorizontalContainer" style={{ display: 'flex', gap: '2rem', marginTop: '15%', padding: '0 10vw', width: 'fit-content' }}>
          {[
            { img: "/assets/story/services/service_1.png", icon: <MapPin size={20} />, title: "Hospital Accompaniment", desc: "We accompany your parents to hospitals, ensuring they are never alone." },
            { img: "/assets/story/services/service_2.png", icon: <Stethoscope size={20} />, title: "Doctor Communication", desc: "We communicate with doctors, understand advice, and ensure nothing is missed." },
            { img: "/assets/story/services/service_3.png", icon: <FileText size={20} />, title: "Prescription Management", desc: "We collect, organize, and manage prescriptions carefully." },
            { img: "/assets/story/services/service_4.png", icon: <Pill size={20} />, title: "Medication Monitoring", desc: "We track routines and ensure timely refills and adherence." },
            { img: "/assets/story/services/service_5.png", icon: <Bell size={20} />, title: "Regular Updates", desc: "You receive timely updates and reports." }
          ].map((service, i) => (
            <div key={i} className={styles.serviceCard} style={{ width: '320px', flexShrink: 0, height: '420px', position: 'relative', overflow: 'hidden', borderRadius: '20px', boxShadow: '0 15px 30px rgba(11,16,33,0.1)', border: 'none', backgroundColor: '#0B1021', padding: 0 }}>
              <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.85 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,16,33,1) 0%, rgba(11,16,33,0.5) 45%, rgba(11,16,33,0) 100%)' }} />
              
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontFamily: 'Gambarino, serif', marginBottom: '0.5rem', lineHeight: 1.2 }}>{service.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.4, margin: 0 }}>{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PEACE OF MIND (Climax Timeline) */}
      <section ref={peaceRef} className={styles.peaceSection} style={{ 
        position: 'relative', height: '100vh', width: '100%', padding: 0, 
        display: 'flex', flexDirection: isMobile ? 'column' : 'row', 
        backgroundColor: '#0B1021', overflow: 'hidden' 
      }}>
        
        {/* Left Side: Cinematic Images */}
        <div className="peaceImagesContainer" style={{ 
          width: isMobile ? '100%' : '50%', 
          height: isMobile ? '45%' : '100%', 
          position: 'relative', overflow: 'hidden' 
        }}>
          
          {/* Images */}
          <div className="peaceImagesContainer" style={{ position: 'absolute', inset: 0 }}>
            {careJourney.map((step, i) => (
              <div 
                key={`img-${i}`}
                className={`peace-img-${i}`}
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url('${step.img}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 10 - i
                }}
              >
                {/* Dark overlay to ensure text readability */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(11,16,33,0.95) 0%, rgba(11,16,33,0.6) 40%, rgba(11,16,33,0.2) 100%)' }} />
              </div>
            ))}
          </div>

          {/* Text Overlay */}
          <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', padding: '8% 10%', zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            <div className="peaceTitleBlock" style={{ marginBottom: '4rem' }}>
              <div style={{ color: '#D4AF37', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={14} /> SCROLL STORY PREVIEW
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', color: 'white', fontFamily: 'Gambarino, serif', lineHeight: 1.1, margin: 0 }}>
                WHAT <br />
                <span style={{ color: '#D4AF37' }}>PEACE OF MIND</span><br />
                LOOKS LIKE
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginTop: '1rem', maxWidth: '80%' }}>
                We stay with your parents, so you stay at peace.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#D4AF37', fontSize: '0.9rem', marginTop: '2rem', opacity: 0.8 }}>
                <ChevronDown size={18} className={styles.bounceIcon} /> Scroll to see the journey
              </div>
            </div>

            {/* Dynamic Step Text */}
            <div className="peaceTextContainer" style={{ position: 'relative', height: '150px' }}>
              {careJourney.map((step, i) => (
                <div 
                  key={`text-${i}`}
                  className={`peace-text-${i}`}
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%',
                    opacity: i === 0 ? 1 : 0,
                    transform: i === 0 ? 'translateX(0)' : 'translateX(20px)'
                  }}
                >
                  <div style={{ color: '#D4AF37', fontSize: '1.5rem', fontWeight: '300', fontFamily: 'Gambarino, serif', marginBottom: '0.25rem' }}>
                    0{i + 1}
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.25rem' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', maxWidth: '80%' }}>{step.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Side: Phone Tracking */}
        <div style={{ 
          width: isMobile ? '100%' : '50%', 
          height: isMobile ? '55%' : '100%', 
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          position: 'relative', zIndex: 30 
        }}>
          <div className="phoneAnimWrapper" style={{ transformOrigin: 'center center', transform: isMobile ? 'scale(0.65)' : 'none' }}>
            <PremiumPhone ref={phoneRef} activeIndex={activeNotif} isClimax={isClimax} isMobile={isMobile} />
          </div>
        </div>

        {/* Emotional Payoff Text (Pinned to the exact bottom of the screen) */}
        <div className="peaceExitText" style={{ 
          position: 'absolute', bottom: '6vh', left: 0, width: '100%', 
          zIndex: 40, pointerEvents: 'none', opacity: 0, 
          textAlign: 'center'
        }}>
          <h3 style={{ fontFamily: 'Gambarino, serif', fontSize: isMobile ? 'clamp(1.5rem, 6vw, 2.5rem)' : 'clamp(2rem, 3.5vw, 3rem)', color: 'white', lineHeight: 1.3, maxWidth: '800px', margin: '0 auto', padding: isMobile ? '0 20px' : 0 }}>
            While you're building your future abroad,<br/>
            <span style={{ color: '#D4AF37' }}>we make sure they're never alone here.</span>
          </h3>
        </div>

      </section>

      {/* 5. ASSESSMENT FORM */}
      <section id="assessment" className={`formSectionTrigger ${styles.formSection}`} style={{ position: 'relative', zIndex: 10, backgroundColor: '#FAF8F3' }}>
        <div className={styles.formContainer}>
          <div className={styles.formContent}>
            <div className={styles.formEyebrow}>
              <Calendar size={16} />
              Book Your
            </div>
            <h2 className={styles.formTitle}>
              Book Your<br />
              <span className={styles.formTitleGold}>Free Consultation</span>
            </h2>
            <p className={styles.formSubtitle}>
              Our care team will call you to understand your requirements and recommend the right premium support.
            </p>
            
            <div className={styles.formTrustBox}>
              <Lock size={32} className={styles.formTrustIcon} />
              <div className={styles.formTrustText}>
                <h4>Your information is safe with us.</h4>
                <p>We maintain complete confidentiality.</p>
              </div>
            </div>
          </div>

          <div className={styles.formWrapper}>
            <div className={styles.formGroupHeader}>
              <div className={styles.formGroupIcon}>
                <Users size={20} />
              </div>
              <h3 className={styles.formGroupTitle}>Contact Information</h3>
            </div>
            
            <form>
              <div className={styles.formGrid}>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Your Name <span>*</span></label>
                  <input type="text" className={styles.formInput} placeholder="Enter your full name" required />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Email Address <span>*</span></label>
                  <input type="email" className={styles.formInput} placeholder="Enter your email address" required />
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>WhatsApp Number <span>*</span></label>
                  <div className={styles.phoneInputWrapper}>
                    <div className={styles.countryCode}>
                      🇮🇳 +91 <ChevronRight size={14} />
                    </div>
                    <input type="tel" className={styles.phoneInput} placeholder="Enter your number" required />
                  </div>
                </div>
                <div className={styles.formField}>
                  <label className={styles.formLabel}>Country <span>*</span></label>
                  <select className={styles.formSelect} required defaultValue="">
                    <option value="" disabled>Select your country</option>
                    <option value="US">USA</option>
                    <option value="UK">UK</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="SG">Singapore</option>
                    <option value="IN">India</option>
                  </select>
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Book My Free Consultation <ChevronRight size={20} />
              </button>
              
              <div className={styles.formFooter}>
                <ShieldCheck size={16} className={styles.formFooterIcon} />
                No cost. No obligation. Just the right guidance.
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
