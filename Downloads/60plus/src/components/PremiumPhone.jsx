import React, { forwardRef, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PremiumPhone.module.css';

import { CheckCircle2 } from 'lucide-react';

const PremiumPhone = forwardRef(({ activeIndex = -1, isClimax = false, isMobile = false, className = '', style = {} }, ref) => {
  const scrollRef = useRef(null);
  
  const notifications = [
    { time: "8:30 AM", title: "Mom arrived at hospital" },
    { time: "10:15 AM", title: "Consultation completed" },
    { time: "10:40 AM", title: "Prescription collected" },
    { time: "11:20 AM", title: "Medicines purchased" },
    { time: "12:05 PM", title: "Reached home safely" },
    { time: "12:06 PM", title: "Update sent to you" }
  ];

  // Auto-scroll to bottom when new items appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // Only show notifications up to the active index
  const visibleNotifications = activeIndex >= 0 ? notifications.slice(0, activeIndex + 1) : [];

  return (
    <div ref={ref} className={`${styles.phoneWrapper} ${className}`} style={style}>
      <div className={styles.phoneScreen}>
        {/* Dynamic Island */}
        <div className={styles.dynamicIsland}>
          <div className={styles.sensor}></div>
          <div className={styles.camera}></div>
        </div>

        {/* Screen State Toggle (Notifications vs Video Call) */}
        <AnimatePresence mode="wait">
          {!isClimax ? (
            <motion.div 
              key="notifications"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(5px)', transition: { duration: 0.8 } }}
              style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
            >
              {/* App Header */}
              <div className={styles.appHeader}>
                <h3 className={styles.appTitle}>60 Plus India</h3>
                <p className={styles.appSubtitle}>Live Care Updates</p>
              </div>

              {/* Screen Content - Notifications Stacking */}
              <div className={styles.screenContent} ref={scrollRef}>
                <AnimatePresence initial={false}>
                  {visibleNotifications.map((notif, idx) => (
                    <motion.div 
                      key={idx} 
                      className={styles.notification}
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <div className={styles.notifTime}>{notif.time}</div>
                        <CheckCircle2 size={14} color="#D4AF37" />
                      </div>
                      <div className={styles.notifTitle} style={{ marginBottom: 0 }}>{notif.title}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="videocall"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5 } }}
              style={{ position: 'absolute', inset: 0, zIndex: 10, overflow: 'hidden', borderRadius: '40px' }}
            >
              {isMobile ? (
                // Mobile Portrait Climax
                <div style={{ position: 'absolute', inset: 0 }}>
                  <img 
                    src="/assets/story/scenes/video_call_ui.png" 
                    alt="Video Call" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  
                  {/* Floating Video Call Controls Overlay */}
                  <div style={{ position: 'absolute', bottom: '30px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: '24px', zIndex: 20 }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                    </div>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                    </div>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FF3B30', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-5px', boxShadow: '0 8px 16px rgba(255,59,48,0.4)' }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(135deg)' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                  </div>
                </div>
              ) : (
                // Desktop Landscape Climax
                <div style={{ position: 'absolute', top: '50%', left: '50%', width: '680px', height: '340px', transform: 'translate(-50%, -50%) rotate(90deg)' }}>
                  <img 
                    src="/assets/story/scenes/video_call_landscape.png" 
                    alt="Video Call" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  
                  {/* Floating Video Call Controls Overlay */}
                  <div style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', display: 'flex', justifyContent: 'center', gap: '24px', zIndex: 20 }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                    </div>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                    </div>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#FF3B30', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-5px', boxShadow: '0 8px 16px rgba(255,59,48,0.4)' }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(135deg)' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Home Indicator */}
        <div className={styles.homeBar}></div>
      </div>
    </div>
  );
});

PremiumPhone.displayName = 'PremiumPhone';

export default PremiumPhone;
