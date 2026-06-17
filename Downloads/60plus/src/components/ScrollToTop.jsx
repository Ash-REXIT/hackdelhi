import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="scroll-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <style>{`
            .scroll-top {
              position: fixed;
              bottom: calc(100px + var(--sb-h, 0px));
              right: 24px;
              width: 56px;
              height: 56px;
              border-radius: 50%;
              background: linear-gradient(135deg, #8235d0, #5f308e);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              z-index: 999;
              transition: bottom 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            }

            .scroll-top:hover {
              transform: translateY(-4px) scale(1.08);
            }

            .scroll-top svg {
              width: 22px;
              height: 22px;
              fill: white;
            }

            @media (max-width: 768px) {
              .scroll-top {
                right: 16px;
                bottom: calc(100px + var(--sb-h, 0px));
                width: 56px;
                height: 56px;
              }
            }
          `}</style>

          {/* Arrow Icon */}
          <svg viewBox="0 0 24 24">
            <path d="M12 4l-8 8h5v8h6v-8h5z" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}