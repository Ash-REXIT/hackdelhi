import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar, Phone, ShieldCheck, Heart, Clock,
  MapPin, Stethoscope, FileText, Pill, Bell,
  ChevronRight, ChevronDown, CheckCircle, Check, Lock, Star, Users
} from 'lucide-react';
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
  const problemRef = useRef(null);
  const peaceRef = useRef(null);
  const cinematicRef = useRef(null);
  const phoneRef = useRef(null);
  const servicesRef = useRef(null);
  
  const [activeNotif, setActiveNotif] = useState(0);
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

      // Trust Section Timeline and Pinner
      let trustDirection = 1;
      gsap.timeline({
        scrollTrigger: {
          trigger: "#trust-section-container",
          start: "top top",
          end: "+=1200", // Shortened so one scroll feels like one discrete step
          pin: true,
          scrub: 1, // Smooth interpolation
          snap: {
            snapTo: (progress) => {
              const points = [0, 0.3333, 0.6666, 1];
              if (trustDirection === 1) {
                return points.find(p => p > progress + 0.005) ?? 1;
              } else {
                return [...points].reverse().find(p => p < progress - 0.005) ?? 0;
              }
            },
            duration: { min: 0.2, max: 0.5 },
            delay: 0, // Snap immediately when scrolling stops
            ease: "power2.inOut"
          },
          onUpdate: (self) => {
            trustDirection = self.direction || 1;
            const progress = self.progress;
            let index = 0;
            if (progress < 0.16) index = 0;
            else if (progress < 0.5) index = 1;
            else if (progress < 0.83) index = 2;
            else index = 3;
            
            setActiveTrustIndex((prev) => prev !== index ? index : prev);
          }
        }
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

      // Premium Card Overlay Entrance Animation
      gsap.fromTo(".premiumCardOverlay",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out", // Almost identical to cubic-bezier(0.22,1,0.36,1)
          scrollTrigger: {
            trigger: "#trust-section-container",
            start: "top 75%"
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
          end: "+=4500", // Increased scroll distance to ensure 1 scroll = 1 image
          pin: true,
          scrub: 1.0, // Buttery smooth interpolation
          snap: {
            snapTo: "labelsDirectional", // Snaps to next label in direction of scroll
            duration: { min: 0.2, max: 0.6 },
            delay: 0,
            ease: "power2.inOut"
          },
          onUpdate: (self) => {
            const time = self.animation.time();
            let newIndex = 0;
            
            // Map timeline seconds directly to the active scene index
            if (time < 1.2) newIndex = 0;
            else if (time < 3.4) newIndex = 1;
            else if (time < 5.6) newIndex = 2;
            else if (time < 7.8) newIndex = 3;
            else if (time < 10.0) newIndex = 4;
            else newIndex = 5;
            
            setActiveNotif((prev) => prev !== newIndex ? newIndex : prev);
          }
        }
      });

      // Intro Fade In
      peaceTl.fromTo(".peaceTitleBlock", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      peaceTl.fromTo(phoneRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "<");
      peaceTl.to({}, { duration: 0.5 }); // Let user read

      // Set initial positions for GSAP
      gsap.set(`.peace-img-0`, { xPercent: 0, opacity: 1, scale: 1.03 });
      for (let i = 1; i < 6; i++) {
        gsap.set(`.peace-img-${i}`, { xPercent: 10, opacity: 0, scale: 1.08 });
      }

      // 5 Cinematic Image Transitions
      for (let i = 0; i < 5; i++) {
        const tDuration = 1.2;
        const easeType = "power3.out"; // Close approximation to [0.22, 1, 0.36, 1]

        // Outgoing Image
        peaceTl.to(`.peace-img-${i}`, { 
                  xPercent: -5, 
                  opacity: 0, 
                  scale: 1.0, 
                  duration: tDuration, 
                  ease: easeType 
               }, `step${i}`)
               .to(`.peace-text-${i}`, { 
                  opacity: 0, 
                  x: -20, 
                  duration: tDuration * 0.8,
                  ease: easeType
               }, `step${i}`)
               
        // Incoming Image
        peaceTl.to(`.peace-img-${i+1}`, { 
                  xPercent: 0, 
                  opacity: 1, 
                  scale: 1.03, 
                  duration: tDuration, 
                  ease: easeType 
               }, `step${i}`)
               .fromTo(`.peace-text-${i+1}`, 
                  { opacity: 0, x: 20 }, 
                  { opacity: 1, x: 0, duration: tDuration * 0.8, ease: easeType }, 
                  `step${i}+=0.2`
               )
               
        // Phone floats upward 8px then settles
        peaceTl.to(phoneRef.current, { y: -8, duration: tDuration * 0.4, ease: "power2.out" }, `step${i}`)
               .to(phoneRef.current, { y: 0, duration: tDuration * 0.6, ease: "power2.inOut" }, `step${i}+=${tDuration * 0.4}`);

        // Active Lingering: Image slowly scales/pans during the pause so scrolling never feels "dead" or laggy
        peaceTl.to(`.peace-img-${i+1}`, { scale: 1.0, xPercent: -2, duration: 1.0, ease: "none" }, `step${i}+=${tDuration}`);
      }

      // Long pause to let user view the final 6th scene before the section ends
      peaceTl.addLabel("step5") 
             .to({}, { duration: 2 });
             
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // --- CINEMATIC REVEAL ANIMATION ---
  useLayoutEffect(() => {
    if (!cinematicRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cinematicRef.current,
          start: "top top",
          end: "+=1200", 
          scrub: 1,
          pin: true
        }
      });

      // Perfect mathematically calculated radius.
      // 55vw radius from the right edge means it stops exactly at 45vw from the left edge.
      const clipStart = isMobile ? "circle(0vh at 50% 100%)" : "circle(0vw at 100% 50%)";
      const clipEnd = isMobile ? "circle(60vh at 50% 100%)" : "circle(55vw at 100% 50%)";

      tl.fromTo(".cinematicCircle", 
          { clipPath: clipStart }, 
          { clipPath: clipEnd, duration: 1.5, ease: "power2.inOut" }
        )
        // Subtle premium image scale-down
        .fromTo(".cinematicImage", 
          { scale: 1.08 }, 
          { scale: 1.0, duration: 1.5, ease: "power2.out" }, 
          "<" 
        )
        // Text slides in gracefully
        .fromTo(".cinematicText > *", 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }, 
          "-=1.0" 
        );
        
    }, cinematicRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={containerRef} className={styles.pageContainer} style={{ position: 'relative' }}>



      {/* 1. HERO SECTION */}
      <section className={`heroSectionTrigger ${styles.heroSection}`} style={{ position: 'relative', overflow: 'hidden' }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0
          }}
        >
          <source src="/assets/story/character/hero.mp4" type="video/mp4" />
        </video>
        
        <div className={styles.heroOverlay} style={{ zIndex: 1 }}></div>
        
        <div className={styles.heroContent}>

          <div className={styles.heroText} style={{ width: '100%', paddingRight: '80px', boxSizing: 'border-box' }}>
            
            <h1 className={styles.heroTitle}>
              WHEN YOU CAN'T BE THERE,<br />
              <span className={styles.heroTitleGold}>WE CAN.</span>
            </h1>



          </div>
          
          <div style={{ position: 'absolute', bottom: '20px', left: '80px', color: 'white', fontSize: '9px', letterSpacing: '4px', textTransform: 'uppercase', opacity: 0.7, fontFamily: 'var(--font-body)', fontWeight: 500 }}>
            SCROLL TO SEE THE JOURNEY
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION (Scrollytelling) */}
      <section id="trust-section-container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', height: '100vh', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', overflow: 'hidden' }}>
        
        {/* Left Column: Image */}
        <div style={{ width: isMobile ? '100%' : '55%', height: isMobile ? '50%' : '100%', position: 'relative', padding: isMobile ? '0' : '0 2vw 0 6vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className={styles.premiumImageContainer} style={{ width: '100%', height: isMobile ? '100%' : '75%', maxHeight: '550px', position: 'relative', boxShadow: isMobile ? 'none' : '0 50px 120px rgba(0,0,0,0.15)', borderRadius: isMobile ? '0' : '32px', overflow: 'hidden' }}>
            
            <img 
              className="trustStickyImage"
              src="/assets/story/character/second section.png" 
              alt="Care advocate with elderly parents" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center center', borderRadius: isMobile ? '0' : '32px', filter: 'contrast(1.02) saturate(1.05) brightness(1.01)' }}
            />

            {/* Vignette Overlay for Image */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: isMobile ? '0' : '32px', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.3)', pointerEvents: 'none' }}></div>

            {/* Gradient Overlay for Mobile Legibility */}
            {isMobile && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.4) 100%)', borderRadius: isMobile ? '0' : '32px' }}></div>}

            {/* Compact Editorial Badge */}
            {!isMobile && (
              <div className="premiumCardOverlay" style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'brightness(1.1) blur(4px)',
                WebkitBackdropFilter: 'brightness(1.1) blur(4px)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: 'auto',
                border: '1px solid var(--accent-yellow)'
              }}>
                <ShieldCheck size={16} color="var(--accent-yellow)" />
                <div style={{ fontFamily: "'var(--font-body)', 'var(--font-body)', sans-serif", fontSize: '14px', fontWeight: 400, letterSpacing: '0.5px' }}>
                  Trusted Family Advocacy
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Scrolling Content Container */}
        <div style={{ width: isMobile ? '100%' : '45%', height: isMobile ? '50%' : '100%', position: 'relative', padding: isMobile ? '5vh 5vw' : '0 5vw 0 2vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Inner constraint to exactly match Left Image height */}
          <div style={{ width: '100%', height: isMobile ? '100%' : '75%', maxHeight: '550px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            {/* Top Eyebrow */}
            <div>
              <div style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-yellow)', fontSize: '0.75rem', fontWeight: 600 }}>
                Why Families Trust 60 Plus India
              </div>
              {!isMobile && <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent-yellow)', marginTop: '12px' }}></div>}
            </div>

            {/* Center Content (Progress + Text Blocks) */}
            <div style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
              
              {/* Timeline with Numbers */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: isMobile ? '30vh' : '30vh', position: 'relative', marginRight: '6vw' }}>
                <div style={{ position: 'absolute', top: '15px', bottom: '15px', left: '7px', width: '1px', backgroundColor: 'rgba(17,17,17,0.15)', zIndex: -1 }}></div>
              {trustFeatures.map((_, i) => {
                const isCompleted = i <= activeTrustIndex;
                const isActive = i === activeTrustIndex;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '15px', height: '15px', borderRadius: '50%', 
                      backgroundColor: isActive || isCompleted ? 'var(--accent-yellow)' : 'var(--bg-secondary)', 
                      border: `1.5px solid ${isActive || isCompleted ? 'var(--accent-yellow)' : 'rgba(17,17,17,0.3)'}`,
                      transition: 'all 0.4s ease'
                    }}></div>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.1rem', color: isActive ? 'var(--text-primary)' : 'rgba(17,17,17,0.5)', fontWeight: isActive ? 600 : 400, transition: 'all 0.4s ease' }}>
                      0{i+1}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Text Blocks */}
            <div style={{ flex: 1, position: 'relative', height: isMobile ? '30vh' : '30vh' }}>
              {trustFeatures.map((f, i) => (
                <div id={`trust-block-${i}`} key={i} style={{ 
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  opacity: activeTrustIndex === i ? 1 : 0,
                  pointerEvents: activeTrustIndex === i ? 'auto' : 'none',
                  transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3.5rem, 5vw, 5.5rem)', color: 'rgba(214, 166, 58,0.6)', lineHeight: 0.9, letterSpacing: '-2px' }}>
                    0{i+1}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3vw, 3rem)', color: 'var(--text-primary)', margin: '12px 0 16px 0', lineHeight: 1.1 }}>
                    {f.title}
                  </h3>
                  <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent-yellow)', marginBottom: '20px' }}></div>
                  <p style={{ fontSize: 'clamp(1rem, 1.1vw, 1.15rem)', color: 'rgba(17,17,17,0.7)', maxWidth: '400px', lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Area (Desktop only for spacing) */}
          {!isMobile && (
            <div>
              <div style={{ borderTop: '1px solid rgba(17,17,17,0.1)', paddingTop: '16px', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(214, 166, 58,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Users size={16} color="var(--accent-yellow)" />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.3 }}>Trusted & Verified<br/>Advocates</span>
                  </div>
                  
                  <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(17,17,17,0.1)' }}></div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(214, 166, 58,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ShieldCheck size={16} color="var(--accent-yellow)" />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.3 }}>Complete<br/>Confidentiality</span>
                  </div>
                  
                  <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(17,17,17,0.1)' }}></div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(214, 166, 58,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Clock size={16} color="var(--accent-yellow)" />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.3 }}>Always<br/>Accessible</span>
                  </div>

                </div>
              </div>

              {/* Scroll explore */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <ChevronDown size={16} color="var(--accent-yellow)" />
                <span style={{ fontSize: '0.8rem', color: 'rgba(17,17,17,0.6)', fontWeight: 500 }}>Scroll to explore more</span>
              </div>
            </div>
          )}

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
            <div key={i} className={styles.serviceCard} style={{ width: '320px', flexShrink: 0, height: '420px', position: 'relative', overflow: 'hidden', borderRadius: '20px', boxShadow: '0 15px 30px rgba(17,17,17,0.1)', border: 'none', backgroundColor: 'var(--text-primary)', padding: 0 }}>
              <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.3) 30%, transparent 50%)' }} />
              
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', lineHeight: 1.2 }}>{service.title}</h3>
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
        backgroundColor: 'var(--accent-yellow)', overflow: 'hidden' 
      }}>
        
        {/* Left Side: Cinematic Images */}
        <div className="peaceImagesContainer" style={{ 
          width: isMobile ? '100%' : 'calc(100% - 450px)', 
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
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.6) 40%, rgba(17,17,17,0.2) 100%)' }} />
              </div>
            ))}
          </div>

          {/* Text Overlay */}
          <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', padding: '8% 10%', zIndex: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            
            <div className="peaceTitleBlock" style={{ marginBottom: '4rem' }}>
              <div style={{ color: 'var(--accent-yellow)', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={14} /> SCROLL STORY PREVIEW
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', color: 'white', fontFamily: 'var(--font-heading)', lineHeight: 1.1, margin: 0 }}>
                WHAT <br />
                <span style={{ color: 'var(--accent-yellow)' }}>PEACE OF MIND</span><br />
                LOOKS LIKE
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginTop: '1rem', maxWidth: '80%' }}>
                We stay with your parents, so you stay at peace.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-yellow)', fontSize: '0.9rem', marginTop: '2rem', opacity: 0.8 }}>
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
                  <div style={{ color: 'var(--accent-yellow)', fontSize: '1.5rem', fontWeight: '300', fontFamily: 'var(--font-heading)', marginBottom: '0.25rem' }}>
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
          width: isMobile ? '100%' : '450px', 
          height: isMobile ? '55%' : '100%', 
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          position: 'relative', zIndex: 30 
        }}>
          <div className="phoneAnimWrapper" style={{ transformOrigin: 'center center' }}>
            <PremiumPhone ref={phoneRef} activeIndex={activeNotif} isMobile={isMobile} />
          </div>
        </div>
      </section>

      {/* 4.5 CINEMATIC REVEAL (Emotional Finale) */}
      <section ref={cinematicRef} className="cinematicSection" style={{ 
        position: 'relative', height: '100vh', width: '100%', 
        backgroundColor: '#FAF8F3', overflow: 'hidden',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center'
      }}>
        
        {/* Left Text Block */}
        <div className="cinematicText" style={{ 
          flex: '0 0 45%', padding: isMobile ? '12% 8%' : '0 8% 0 8%', 
          position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          height: '100%', maxWidth: '800px'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.5rem)' : 'clamp(2.5rem, 4vw, 4rem)', 
            color: '#111827', lineHeight: 1.15, margin: 0, 
            letterSpacing: '-0.5px' 
          }}>
            WHILE YOU'RE<br/>BUILDING<br/>YOUR FUTURE<br/>ABROAD,<br/>
            <span style={{ color: 'var(--accent-yellow)', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>WE MAKE SURE<br/>THEY'RE NEVER<br/>ALONE HERE.</span>
          </h2>
          <p style={{ 
            fontSize: '1.1rem', color: '#4B5563', marginTop: '2.5rem', 
            maxWidth: '450px', lineHeight: 1.6 
          }}>
            Your parents are in the best hands. So you can focus on your dreams, without worry.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-yellow)', fontSize: '0.85rem', marginTop: '3.5rem', fontWeight: 600, letterSpacing: '1px' }}>
            <ChevronDown size={18} className={styles.bounceIcon} /> SCROLL TO FILL THE FORM
          </div>
        </div>

        {/* Right Yellow Circle & Masked Image */}
        <div className="cinematicCircle" style={{ 
          position: 'absolute', top: 0, right: 0, width: '100%', 
          height: '100%', zIndex: 5, pointerEvents: 'none',
          clipPath: isMobile ? 'circle(0vh at 50% 100%)' : 'circle(0vw at 100% 50%)' // Initial state
        }}>
          {/* Solid Yellow Background */}
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            backgroundColor: 'var(--accent-yellow)' 
          }}></div>

          {/* Perfectly scaled and anchored image */}
          <div className="cinematicImageWrapper" style={{
              position: 'absolute',
              bottom: 0,
              right: isMobile ? '0' : '2vw',
              width: isMobile ? '100%' : 'auto',
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-end'
          }}>
            <img 
              src="/images/5th section.png" 
              alt="Elderly couple smiling" 
              className="cinematicImage"
              style={{ 
                height: isMobile ? '45vh' : '85vh', 
                width: 'auto', 
                objectFit: 'contain',
                transformOrigin: isMobile ? 'bottom center' : 'bottom right'
              }} 
            />
          </div>
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
