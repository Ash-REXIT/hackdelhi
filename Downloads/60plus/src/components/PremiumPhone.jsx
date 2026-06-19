import React, { forwardRef, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PremiumPhone.module.css';

import { CheckCircle2 } from 'lucide-react';

const PremiumPhone = forwardRef(({ activeIndex = -1, isMobile = false, className = '', style = {} }, ref) => {
  const scrollRef = useRef(null);
  
  const notifications = [
    { time: "8:30 AM", title: "Mom arrived at hospital" },
    { time: "10:15 AM", title: "Consultation completed" },
    { time: "10:40 AM", title: "Prescription collected" },
    { time: "11:20 AM", title: "Medicines purchased" },
    { time: "12:05 PM", title: "Reached home safely" },
    { time: "12:06 PM", title: "Update sent to you" }
  ];

  // No auto-scroll needed: all 6 notifications fit seamlessly on a single screen

  // Only show notifications up to the active index
  const visibleNotifications = activeIndex >= 0 ? notifications.slice(0, activeIndex + 1) : [];

  return (
    <div ref={ref} className={`${styles.phoneWrapper} ${className}`} style={style}>
      {/* 3D Hardware Overlays for perfect edge masking and realism */}
      <div className={styles.hardwareOverlay}></div>
      <div className={styles.glare}></div>

      <div className={styles.phoneScreen}>
        {/* Dynamic Island */}
        <div className={styles.dynamicIsland}>
          <div className={styles.camera}></div>
          <div className={styles.sensor}></div>
        </div>

        {/* App Content */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          {/* App Header */}
          <div className={styles.appHeader}>
            <h3 className={styles.appTitle}>60 Plus India</h3>
            <p className={styles.appSubtitle}>Live Care Updates</p>
          </div>

          {/* Screen Content - App Timeline UI */}
          <div className={styles.screenContent} ref={scrollRef}>
            <div className={styles.timelineWrapper}>
              <AnimatePresence initial={false}>
                {visibleNotifications.map((notif, idx) => (
                  <motion.div 
                    key={idx} 
                    className={styles.timelineItem}
                    layout
                    initial={{ opacity: 0, y: 20, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto', marginBottom: 12 }}
                    exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0, scale: 0.9, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  >
                    <div className={styles.timelineDot}>
                      <CheckCircle2 size={12} color="#FFF" />
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTime}>{notif.time}</div>
                      <div className={styles.timelineTitle}>{notif.title}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Physical spacer */}
            <div style={{ height: '20px', flexShrink: 0 }} />
          </div>
        </div>

        {/* Bottom Home Indicator */}
        <div className={styles.homeBar}></div>
      </div>
    </div>
  );
});

PremiumPhone.displayName = 'PremiumPhone';

export default PremiumPhone;
