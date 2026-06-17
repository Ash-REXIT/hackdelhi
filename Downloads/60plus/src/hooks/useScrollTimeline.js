import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a GSAP ScrollTrigger instance that pins a container and
 * returns scroll progress (0–1) and direction (1 = down, -1 = up).
 *
 * @param {Object} options
 * @param {string|Element} options.trigger - CSS selector or element for the trigger
 * @param {string|Element} options.pin - CSS selector or element to pin
 * @param {number} options.end - Scroll distance in px (e.g. '+=3000') or string
 * @param {number} options.scroller - Optional scroller element
 * @returns {{ progress: number, direction: number, triggerRef: React.MutableRefObject }}
 */
export default function useScrollTimeline({ trigger, pin, end = '+=4000' } = {}) {
  const triggerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: 'top top',
      end: end,
      pin: pin || false,
      scrub: 1,
      onUpdate: (self) => {
        setProgress(self.progress);
        setDirection(self.direction);
      },
    });

    return () => {
      st.kill();
    };
  }, [trigger, pin, end]);

  return { progress, direction, triggerRef };
}
