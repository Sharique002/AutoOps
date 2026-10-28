import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, CheckCircle, FileText, Wrench } from 'lucide-react';
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
    <section id="milestones" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Calendar size={14} />
            <span>PROGRESSION &amp; DELIVERY ARTIFACTS</span>
          </div>
          <h2 className="section-title">Six-Milestone Implementation Lifecycle</h2>
          <p className="section-subtitle">
            Every phase was developed incrementally with formal preflight inspections, automated test executions, explicit acceptance criteria, and persistent evidence logs.
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="milestones-grid">
          {MILESTONES.map((ms) => {
            const isExpanded = !!expandedMilestones[ms.id];

            return (
              <div key={ms.id} className="milestone-card panel">
                <div className="ms-header">
                  <div className="ms-num-badge">
                    <span>M{ms.number}</span>
                  </div>
                  <div className="ms-status-badge">
                    <CheckCircle size={13} className="text-green" />
                    <span>{ms.status}</span>
                  </div>
                </div>

                <div className="ms-cat-tag">{ms.category}</div>
                <h3 className="ms-title">{ms.title}</h3>

                <p className="ms-outcome">{ms.outcome}</p>

                {/* Tool Badges */}
                <div className="ms-tools-row">
                  {ms.tools.map((tool, idx) => (
                    <span key={idx} className="ms-tool-chip">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Expandable Deliverables Section */}
                <div className="ms-deliverables-wrapper">
                  <button
                    type="button"
                    className="ms-expand-toggle"
                    onClick={() => toggleExpand(ms.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="ms-toggle-label">
                      <Wrench size={12} className="text-cyan" />
                      <span>Technical Deliverables ({ms.deliverables.length})</span>
                    </span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <ul className="ms-deliverables-list">
                      {ms.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="ms-deliverable-item">
                          <span className="d-bullet">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Evidence Link Footer */}
                <div className="ms-footer">
                  <FileText size={13} className="text-secondary" />
                  <code className="ms-evidence-path">{ms.evidencePath}</code>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .milestones-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        .milestone-card {
          display: flex;
          flex-direction: column;
          padding: 22px 20px;
          border-top: 2px solid var(--border-hover);
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }

        .milestone-card:hover {
          border-top-color: var(--accent-orange);
        }

        .ms-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .ms-num-badge {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 700;
          color: var(--accent-orange);
          background: var(--accent-orange-bg);
          border: 1px solid var(--border-subtle);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }

        .ms-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--accent-green);
          background: var(--accent-green-bg);
          padding: 3px 8px;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(53, 229, 140, 0.25);
        }

        .ms-cat-tag {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .ms-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 10px;
        }

        .ms-outcome {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .ms-tools-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }

        .ms-tool-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 2px 7px;
          border-radius: var(--radius-sm);
        }

        .ms-deliverables-wrapper {
          border-top: 1px solid var(--border-subtle);
          padding-top: 12px;
          margin-bottom: 14px;
        }

        .ms-expand-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          padding: 4px 0;
          transition: color var(--transition-fast);
        }

        .ms-expand-toggle:hover {
          color: var(--text-primary);
        }

        .ms-toggle-label {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ms-deliverables-list {
          list-style: none;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-left: 2px;
        }

        .ms-deliverable-item {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        .d-bullet {
          color: var(--accent-cyan);
          font-weight: bold;
        }

        .ms-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ms-evidence-path {
          font-size: 11px;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .text-green { color: var(--accent-green); }
        .text-cyan { color: var(--accent-cyan); }

        @media (max-width: 1100px) {
          .milestones-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .milestones-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
