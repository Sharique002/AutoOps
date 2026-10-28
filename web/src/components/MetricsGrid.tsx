import React from 'react';
import { METRIC_CARDS } from '../data/projectData';

export const MetricsGrid: React.FC = () => {
  return (
    <section className="metrics-section">
      <div className="container">
        <div className="metrics-grid">
          {METRIC_CARDS.map((metric) => (
            <div key={metric.id} className="metric-card panel">
              <div className="metric-header">
                <span
                  className={`badge ${
                    metric.status === 'pass'
                      ? 'badge-pass'
                      : metric.status === 'notrun'
                      ? 'badge-notrun'
                      : 'badge-cyan'
                  }`}
                >
                  {metric.badgeText}
                </span>
              </div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
              <div className="metric-desc">{metric.description}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .metrics-section {
          padding-top: var(--space-8);
          padding-bottom: var(--space-8);
          border-bottom: 1.5px solid var(--border-subtle);
          background: var(--bg-surface);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-5);
        }

        .metric-card {
          display: flex;
          flex-direction: column;
          padding: 24px 22px;
          border-top: 3px solid var(--accent-orange);
          background: var(--bg-panel);
          box-shadow: var(--shadow-panel);
        }

        .metric-header {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 14px;
        }

        .metric-value {
          font-family: var(--font-display);
          font-size: 38px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }

        .metric-label {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .metric-desc {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
