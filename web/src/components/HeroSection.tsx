import React from 'react';
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, Server, RefreshCw } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';
import { ArchitectureSvg } from './ArchitectureSvg';
import { ColorPaletteShowcase } from './ColorPaletteShowcase';

export const HeroSection: React.FC = () => {
  return (
    <section id="overview" className="hero-section">
      <div className="container">
        <div className="hero-container">
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
                <CheckCircle2 size={16} className="text-orange" />
                <span>Six Development Milestones</span>
              </div>
              <div className="meta-badge">
                <Server size={16} className="text-orange" />
                <span>Local Docker Infrastructure</span>
              </div>
              <div className="meta-badge">
                <ShieldCheck size={16} className="text-orange" />
                <span>Automated Quality Gates</span>
              </div>
              <div className="meta-badge">
                <RefreshCw size={16} className="text-orange" />
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

        {/* Color Palette Showcase Banner directly matching user photo */}
        <ColorPaletteShowcase />
      </div>

      <style>{`
        .hero-section {
          padding-top: var(--space-12);
          padding-bottom: var(--space-12);
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: var(--space-10);
          align-items: center;
          margin-bottom: var(--space-6);
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
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--accent-orange);
          margin-bottom: var(--space-4);
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-orange);
          box-shadow: 0 0 10px var(--accent-orange);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 46px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin-bottom: var(--space-5);
          text-transform: uppercase;
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
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-6);
          box-shadow: var(--shadow-subtle);
        }

        .meta-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-primary);
          font-weight: 600;
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
          font-weight: 600;
        }

        .context-value {
          color: var(--text-primary);
          font-weight: 700;
        }

        .context-hash {
          color: var(--accent-orange);
          background: var(--accent-orange-bg);
          padding: 2px 7px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          font-weight: 700;
        }

        .context-sep {
          color: var(--border-subtle);
        }

        .text-orange { color: var(--accent-orange); }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }

          .hero-title {
            font-size: 38px;
          }

          .hero-visual {
            order: -1;
            max-width: 500px;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 30px;
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
