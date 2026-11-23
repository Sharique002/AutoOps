import React from 'react';
import { METRIC_CARDS } from '../data/projectData';

export const MetricsGrid: React.FC = () => {
  return (
    <section className="tomorrow-metrics-strip">
      <div className="container">
        <div className="metrics-grid-4">
          {METRIC_CARDS.map((metric) => (
            <div key={metric.id} className="tomorrow-metric-card">
              <div className="metric-card-top">
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
                <span className="metric-card-kicker">VERIFIED 2026</span>
              </div>

              <div className="metric-huge-value">{metric.value}</div>
              <div className="metric-title-label">{metric.label}</div>
              <p className="metric-narrative">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .tomorrow-metrics-strip {
          padding-top: 48px;
          padding-bottom: 48px;
          border-bottom: 1.5px solid var(--border-hairline);
        }

        .metrics-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .tomorrow-metric-card {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 8px 24px rgba(48, 1, 58, 0.05);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          border-top: 3px solid var(--accent-orange);
        }

        .tomorrow-metric-card:hover {
          transform: translateY(-2px);
          border-color: var(--ink-primary);
          box-shadow: 0 12px 32px rgba(48, 1, 58, 0.1);
        }

        .metric-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .metric-card-kicker {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--ink-muted);
        }

        .metric-huge-value {
          font-family: var(--font-display);
          font-size: 3.4rem;
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: var(--ink-primary);
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .metric-title-label {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-primary);
          margin-bottom: 8px;
        }

        .metric-narrative {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.01em;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin-top: auto;
        }

        @media (max-width: 1024px) {
          .metrics-grid-4 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .metrics-grid-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
