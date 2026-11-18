import React from 'react';
import { Terminal } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

export const Footer: React.FC = () => {
  return (
    <footer className="tomorrow-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-icon">
                <Terminal size={18} color="var(--accent-orange)" />
              </div>
              <span className="footer-title">{PROJECT_METADATA.name}</span>
              <span className="footer-edition-tag">TOMORROW</span>
            </div>
            <p className="footer-tagline">{PROJECT_METADATA.tagline}</p>
            <div className="footer-dev-badge">
              <span>DEVELOPER:</span>
              <strong>{PROJECT_METADATA.developer}</strong>
            </div>
            <p className="footer-academic-note">
              Academic DevOps engineering platform engineered for reproducible execution in Ubuntu 24.04 LTS (WSL2). Zero external paid cloud services required.
            </p>
          </div>

          {/* Quick Nav Col */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <div className="editorial-rule-38" style={{ margin: '8px 0 16px 0' }} />
            <ul className="footer-links-list">
              <li><a href="#overview">Overview &amp; Baseline</a></li>
              <li><a href="#architecture">Architecture &amp; Topology</a></li>
              <li><a href="#pipeline">CI/CD Pipeline Flow</a></li>
              <li><a href="#monitoring">Nagios Observability</a></li>
              <li><a href="#security">Container Hardening</a></li>
              <li><a href="#milestones">Six-Milestone Lifecycle</a></li>
              <li><a href="#verification">Acceptance Matrix</a></li>
              <li><a href="#documentation">Documentation &amp; Demo</a></li>
            </ul>
          </div>

          {/* Technology Summary Col */}
          <div className="footer-tech-col">
            <h4 className="footer-col-title">TECHNOLOGY SUITE</h4>
            <div className="editorial-rule-38" style={{ margin: '8px 0 16px 0' }} />
            <div className="footer-tech-chips">
              <span className="tech-chip">FastAPI 0.115</span>
              <span className="tech-chip">Python 3.12</span>
              <span className="tech-chip">Docker 29.1</span>
              <span className="tech-chip">Compose 2.40</span>
              <span className="tech-chip">Terraform 1.9</span>
              <span className="tech-chip">Puppet 8.4</span>
              <span className="tech-chip">Ansible 2.16</span>
              <span className="tech-chip">Nagios Core 4.4</span>
              <span className="tech-chip">Pytest 8.4</span>
              <span className="tech-chip">GitHub Actions</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="f-bottom-left">
            <span>© 2026 AutoOps DevOps Platform. Developed by <strong>{PROJECT_METADATA.developer}</strong>.</span>
          </div>
          <div className="f-bottom-right">
            <span className="f-meta-item">Latest Commit: <code>{PROJECT_METADATA.latestCommit}</code></span>
            <span className="f-sep">•</span>
            <span className="f-meta-item">Verified on {PROJECT_METADATA.lastVerifiedDate}</span>
          </div>
        </div>
      </div>

      <style>{`
        .tomorrow-footer {
          border-top: 1.5px solid var(--ink-primary);
          padding-top: 64px;
          padding-bottom: 40px;
          background: rgba(255, 255, 255, 0.15);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .footer-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--ink-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.04em;
          color: var(--ink-primary);
        }

        .footer-edition-tag {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--accent-orange-deep);
          padding: 2px 8px;
          border-radius: 9999px;
          background: rgba(242, 93, 23, 0.12);
          border: 1px solid var(--accent-orange);
        }

        .footer-tagline {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--ink-secondary);
          margin-bottom: 16px;
        }

        .footer-dev-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px;
          border-radius: 9999px;
          background: rgba(48, 1, 58, 0.08);
          border: 1px solid var(--border-hairline);
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .footer-dev-badge strong {
          color: var(--ink-primary);
        }

        .footer-academic-note {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--ink-muted);
          line-height: 1.6;
          max-width: 380px;
        }

        .footer-col-title {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-primary);
          margin-bottom: 4px;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links-list a {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--ink-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links-list a:hover {
          color: var(--accent-orange);
        }

        .footer-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-chip {
          padding: 4px 10px;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid var(--border-hairline);
          color: var(--ink-primary);
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--border-hairline);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--ink-muted);
          flex-wrap: wrap;
          gap: 12px;
        }

        .f-meta-item code {
          font-family: var(--font-mono);
          color: var(--accent-orange-deep);
        }

        .f-sep {
          margin: 0 6px;
        }

        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </footer>
  );
};
