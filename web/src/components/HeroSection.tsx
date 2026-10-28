import React from 'react';
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, Server, RefreshCw } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';
import { ArchitectureSvg } from './ArchitectureSvg';

export const HeroSection: React.FC = () => {
  return (
    <section id="overview" className="hero-section">
      <div className="container hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            <span>INFRASTRUCTURE AUTOMATION • CI/CD • OBSERVABILITY</span>
          </div>

          <h1 className="hero-title">
            From infrastructure provisioning to automated recovery.
          </h1>

          <p className="hero-description">
            AutoOps brings infrastructure as code, configuration management, application deployment, continuous integration, and service monitoring into one reproducible local DevOps platform.
          </p>

          <div className="hero-actions">
            <a href="#architecture" className="btn btn-primary">
              <span>Explore Architecture</span>
              <ArrowRight size={16} />
            </a>
            <a href="#documentation" className="btn btn-secondary">
              <FileText size={16} />
              <span>View Project Report</span>
            </a>
          </div>

          {/* Metadata badges row */}
          <div className="hero-metadata-grid">
            <div className="meta-badge">
              <CheckCircle2 size={15} className="text-green" />
              <span>Six Development Milestones</span>
            </div>
            <div className="meta-badge">
              <Server size={15} className="text-cyan" />
              <span>Local Docker Infrastructure</span>
            </div>
            <div className="meta-badge">
              <ShieldCheck size={15} className="text-green" />
              <span>Automated Quality Gates</span>
            </div>
            <div className="meta-badge">
              <RefreshCw size={15} className="text-cyan" />
              <span>Monitoring &amp; Recovery</span>
            </div>
          </div>

          {/* Dev context banner */}
          <div className="hero-context-strip">
            <span className="context-label">ENGINEER:</span>
            <span className="context-value">{PROJECT_METADATA.developer}</span>
            <span className="context-sep">•</span>
            <span className="context-label">ENVIRONMENT:</span>
            <span className="context-value">{PROJECT_METADATA.primaryEnvironment}</span>
            <span className="context-sep">•</span>
            <span className="context-label">COMMIT:</span>
            <span className="context-hash">{PROJECT_METADATA.latestCommit}</span>
          </div>
        </div>

        {/* Right Column: Technical Illustration */}
        <div className="hero-visual">
          <ArchitectureSvg />
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: var(--space-12);
          padding-bottom: var(--space-16);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
          background: radial-gradient(circle at 80% 20%, rgba(56, 207, 240, 0.05) 0%, transparent 60%);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: var(--space-10);
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--accent-cyan);
          margin-bottom: var(--space-4);
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-cyan);
        }

        .hero-title {
          font-size: 40px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.18;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-5);
        }

        .hero-description {
          font-size: 16.5px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: var(--space-8);
          max-width: 580px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: var(--space-8);
        }

        .hero-metadata-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px 16px;
          padding: 16px 20px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          margin-bottom: var(--space-6);
        }

        .meta-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-primary);
          font-weight: 500;
        }

        .hero-context-strip {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .context-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .context-value {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .context-hash {
          color: var(--accent-cyan);
          background: rgba(56, 207, 240, 0.08);
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid rgba(56, 207, 240, 0.2);
        }

        .context-sep {
          color: var(--border-subtle);
        }

        .text-green { color: var(--accent-green); }
        .text-cyan { color: var(--accent-cyan); }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }

          .hero-title {
            font-size: 32px;
          }

          .hero-visual {
            order: -1;
            max-width: 480px;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 27px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-metadata-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
