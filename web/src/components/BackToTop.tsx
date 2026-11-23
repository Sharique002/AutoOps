import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-to-top-btn"
      onClick={scrollToTop}
      title="Scroll back to top"
      aria-label="Scroll back to top of page"
    >
      <ArrowUp size={18} strokeWidth={2} />
      <span className="btt-text">TOP</span>

      <style>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 99;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 9999px;
          background: var(--ink-primary);
          color: var(--ink-on-accent);
          border: 1.5px solid var(--accent-orange);
          box-shadow: 0 8px 24px rgba(48, 1, 58, 0.25);
          cursor: pointer;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          animation: bttFadeIn 0.25s ease-out;
        }

        @keyframes bttFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .back-to-top-btn:hover {
          background: var(--accent-orange);
          color: #FFFFFF;
          border-color: var(--accent-orange-bright);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px var(--accent-orange-glow);
        }

        .btt-text {
          font-size: 0.68rem;
          font-weight: 800;
        }

        @media (max-width: 600px) {
          .back-to-top-btn {
            bottom: 20px;
            right: 20px;
            padding: 10px 12px;
          }
          .btt-text {
            display: none;
          }
        }
      `}</style>
    </button>
  );
};