import React from 'react';

/**
 * ReferencesSection — Small, subtle research citations.
 * Appears after Scene 2 content and on LearnMore page.
 */
export default function ReferencesSection() {
  return (
    <div className="references-section">
      <p className="references-section__item">
        Kaur et al., <em>National Medical Journal of India</em>
      </p>
      <p className="references-section__item">
        Biswas et al., <em>University of Nottingham Meta-analysis</em>
      </p>
      <style>{`
        .references-section {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(26, 10, 46, 0.08);
        }
        .references-section__item {
          font-family: 'Nunito Sans', sans-serif;
          font-size: 0.75rem;
          color: rgba(26, 10, 46, 0.4);
          line-height: 1.6;
          margin: 0.25rem 0;
        }
      `}</style>
    </div>
  );
}
