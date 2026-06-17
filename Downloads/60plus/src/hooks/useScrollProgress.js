import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

/**
 * Returns a 0→1 progress value representing how far the user has scrolled
 * through the document (or a given ref). Uses Framer Motion's useScroll
 * so it's framework-consistent and doesn't need GSAP.
 */
export default function useScrollProgress({ target, offset } = {}) {
  const { scrollYProgress } = useScroll({
    target,
    offset: offset || ['start start', 'end end'],
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setProgress(v);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return progress;
}
