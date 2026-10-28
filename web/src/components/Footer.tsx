import React from 'react';
import { Terminal } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="footer-icon">
                <Terminal size={18} className="text-green" />
              </div>
              <span className="footer-title">{PROJECT_METADATA.name}</span>
            </div>
            <p className="footer-tagline">{PROJECT_METADATA.tagline}</p>
            <div className="footer-dev-badge">
              <span>DEVELOPER:</span>
              <strong className="text-primary">{PROJECT_METADATA.developer}</strong>
            </div>
            <p className="footer-academic-note">
              Academic DevOps engineering project engineered for local reproducible execution in Ubuntu 24.04 LTS (WSL2). Zero external paid cloud services required.
            </p>
          </div>

          {/* Quick Nav Col */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
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
            <h4 className="footer-col-title">Technology Stack</h4>
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
        .footer-container {
          background: var(--bg-surface);
          border-top: 1.5px solid var(--border-subtle);
          padding-top: var(--space-16);
          padding-bottom: var(--space-10);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: var(--space-10);
          margin-bottom: var(--space-12);
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
          border-radius: var(--radius-sm);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer-title {
          font-family: var(--font-mono);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .footer-tagline {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin-bottom: 14px;
          max-width: 380px;
        }

        .footer-dev-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          margin-bottom: 14px;
        }

        .footer-academic-note {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.5;
          max-width: 420px;
        }

        .footer-col-title {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent-cyan);
          margin-bottom: 16px;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links-list a {
          font-size: 13px;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
        }

        .footer-links-list a:hover {
          color: var(--text-primary);
        }

        .footer-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 20px;
          font-size: 12.5px;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 12px;
        }

        .f-bottom-right {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
        }

        .f-bottom-right code {
          color: var(--accent-cyan);
        }

        .f-sep {
          color: var(--border-subtle);
        }

        .text-green { color: var(--accent-green); }
        .text-primary { color: var(--text-primary); }

        @media (max-width: 900px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }
        }
      `}</style>
    </footer>
  );
};
