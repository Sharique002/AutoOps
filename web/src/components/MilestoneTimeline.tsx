import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, FileText, Wrench } from 'lucide-react';
import { MILESTONES } from '../data/projectData';

export const MilestoneTimeline: React.FC = () => {
  const [expandedMilestones, setExpandedMilestones] = useState<Record<string, boolean>>({
    m01: false,
    m02: false,
    m03: false,
    m04: false,
    m05: false,
    m06: true, // Expand M06 by default
  });

  const toggleExpand = (id: string) => {
    setExpandedMilestones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="milestones" className="section tomorrow-ms-section">
      <div className="container">
        {/* 4-Part Typographic Signature */}
        <div className="section-header">
          <span className="section-eyebrow">PROGRESSION &amp; DELIVERY ARTIFACTS // INCREMENTAL ARCHITECTURE</span>
          <div className="editorial-rule-38" />
          <h2 className="section-title">MILESTONE LIFECYCLE</h2>
          <p className="section-subtitle">
            Every phase was developed incrementally with preflight audits, formal test execution, and audited evidence logs.
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="tomorrow-ms-grid">
          {MILESTONES.map((ms) => {
            const isExpanded = !!expandedMilestones[ms.id];

            return (
              <div key={ms.id} className="tomorrow-ms-card">
                <div className="ms-card-top-bar">
                  <div className="ms-num-pill">
                    <span>M0{ms.number}</span>
                  </div>
                  <div className="ms-badge-state">
                    <CheckCircle size={13} color="var(--accent-orange)" />
                    <span>{ms.status}</span>
                  </div>
                </div>

                <div className="ms-category-kicker">{ms.category}</div>
                <h3 className="ms-title-text">{ms.title}</h3>

                <p className="ms-outcome-copy">{ms.outcome}</p>

                {/* Tool Badges */}
                <div className="ms-tools-wrap">
                  {ms.tools.map((tool, idx) => (
                    <span key={idx} className="ms-tool-pill">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Expandable Deliverables Section */}
                <div className="ms-accordion-box">
                  <button
                    type="button"
                    className="ms-toggle-accordion-btn"
                    onClick={() => toggleExpand(ms.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="ms-acc-label">
                      <Wrench size={13} color="var(--accent-orange)" />
                      <span>Technical Deliverables ({ms.deliverables.length})</span>
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={16} color="var(--ink-primary)" />
                    ) : (
                      <ChevronDown size={16} color="var(--ink-primary)" />
                    )}
                  </button>

                  {isExpanded && (
                    <ul className="ms-deliverables-ul">
                      {ms.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="ms-item-li">
                          <span className="ms-bullet">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Evidence Link Footer */}
                <div className="ms-card-footer">
                  <FileText size={13} color="var(--ink-secondary)" />
                  <code className="ms-evidence-code">{ms.evidencePath}</code>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .tomorrow-ms-section {
          background: transparent;
        }

        .tomorrow-ms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .tomorrow-ms-card {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 24px rgba(48, 1, 58, 0.05);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tomorrow-ms-card:hover {
          border-color: var(--ink-primary);
          transform: translateY(-2px);
        }

        .ms-card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .ms-num-pill {
          font-family: var(--font-display);
          font-size: 1.3rem;
          letter-spacing: 0.04em;
          color: var(--ink-primary);
          padding: 2px 10px;
          border-radius: 9999px;
          background: rgba(242, 93, 23, 0.15);
          border: 1px solid var(--accent-orange);
        }

        .ms-badge-state {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--ink-primary);
        }

        .ms-category-kicker {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-bottom: 6px;
        }

        .ms-title-text {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--ink-primary);
          margin-bottom: 10px;
          line-height: 1.35;
        }

        .ms-outcome-copy {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
          flex: 1;
        }

        .ms-tools-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }

        .ms-tool-pill {
          padding: 3px 10px;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          background: rgba(48, 1, 58, 0.08);
          border: 1px solid var(--border-hairline);
          color: var(--ink-primary);
        }

        .ms-accordion-box {
          border-top: 1px solid var(--border-hairline);
          padding-top: 14px;
          margin-top: auto;
          margin-bottom: 14px;
        }

        .ms-toggle-accordion-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid var(--border-hairline);
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .ms-toggle-accordion-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: var(--ink-primary);
        }

        .ms-acc-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-primary);
        }

        .ms-deliverables-ul {
          list-style: none;
          padding: 12px 6px 4px 6px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ms-item-li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          color: var(--ink-secondary);
          line-height: 1.5;
        }

        .ms-bullet {
          color: var(--accent-orange);
          font-weight: 700;
        }

        .ms-card-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 12px;
          border-top: 1px solid var(--border-hairline);
        }

        .ms-evidence-code {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--ink-muted);
        }

        @media (max-width: 1024px) {
          .tomorrow-ms-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .tomorrow-ms-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
