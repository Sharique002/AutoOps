import React, { useState } from 'react';
import {
  CheckCircle2,
  Activity,
  Copy,
  Check,
  Layers,
  GitBranch,
  Radio,
  Shield,
  FileCheck,
  FileText,
} from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';
import { ArchitectureSvg } from './ArchitectureSvg';

export const HeroSection: React.FC = () => {
  const [copiedCommit, setCopiedCommit] = useState(false);

  const handleCopyCommit = () => {
    navigator.clipboard.writeText(PROJECT_METADATA.latestCommit).then(() => {
      setCopiedCommit(true);
      setTimeout(() => setCopiedCommit(false), 2000);
    });
  };

  const quickLinks = [
    { label: 'Architecture', href: '#architecture', icon: Layers },
    { label: 'Pipeline', href: '#pipeline', icon: GitBranch },
    { label: 'Monitoring', href: '#monitoring', icon: Radio },
    { label: 'Security', href: '#security', icon: Shield },
    { label: 'Milestones', href: '#milestones', icon: FileCheck },
    { label: 'QA Matrix', href: '#verification', icon: CheckCircle2 },
    { label: 'Docs', href: '#documentation', icon: FileText },
  ];

  return (
    <section id="overview" className="tomorrow-hero">
      <div className="container">
        <div className="hero-grid-12">
          {/* Left Column: 7 Columns Editorial Typography Stack */}
          <div className="hero-left-col">
            {/* 1. Top Kicker (3-line or compact micro-copy) */}
            <div className="hero-kicker-stack">
              <span>DEVOPS ENGINEERING PLATFORM // VERIFIED MILESTONES 01—06</span>
              <span>LOCAL REPRODUCIBILITY • ZERO CLOUD COST • WSL2 UBUNTU 24.04</span>
            </div>

            {/* 2. Short Editorial Rule: 38px x 1.5px */}
            <div className="hero-editorial-rule-38" />

            {/* 3. Monumental Condensed Display Title */}
            <h1 className="hero-display-title">
              AUTOOPS
              <span className="title-break">TOMORROW</span>
            </h1>

            {/* 4. Readable Subcopy Block (User-Friendly Sentence Case) */}
            <p className="hero-subcopy-block">
              An end-to-end reproducible infrastructure platform bringing Docker containerization,
              Terraform infrastructure, Puppet policy enforcement, Ansible deployments, and continuous
              active observability into one cohesive system.
            </p>

            {/* 5. Pill Outline CTA Buttons */}
            <div className="hero-cta-group">
              <a href="#architecture" className="btn-pill-editorial btn-accent">
                <span>EXPLORE ARCHITECTURE</span>
                <span className="arrow-icon">→</span>
              </a>

              <a href="#documentation" className="btn-pill-editorial">
                <span>VIEW PROJECT REPORTS</span>
                <span className="arrow-icon">→</span>
              </a>
            </div>

            {/* 6. Quick Jump Pills for Fast Usability */}
            <div className="hero-quick-jump">
              <span className="quick-jump-label">QUICK JUMP:</span>
              <div className="quick-jump-list">
                {quickLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.href} href={item.href} className="quick-jump-pill">
                      <Icon size={12} color="var(--accent-orange)" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Context Attribution Strip */}
            <div className="hero-attribution-strip">
              <span className="attr-item">
                <strong>ENGINEER:</strong> {PROJECT_METADATA.developer}
              </span>
              <span className="attr-sep">/</span>
              <span className="attr-item">
                <strong>RUNTIME:</strong> DOCKER + TERRAFORM + NAGIOS
              </span>
              <span className="attr-sep">/</span>
              <span className="attr-item">
                <strong>BASELINE:</strong>
                <button
                  type="button"
                  className="commit-copy-pill"
                  onClick={handleCopyCommit}
                  title="Copy commit hash"
                >
                  <code>{PROJECT_METADATA.latestCommit}</code>
                  {copiedCommit ? (
                    <Check size={11} color="var(--accent-orange)" />
                  ) : (
                    <Copy size={11} />
                  )}
                  {copiedCommit && <span className="copy-hint">COPIED</span>}
                </button>
              </span>
            </div>
          </div>

          {/* Right Column: 5 Columns High-Impact Visual / Focal Showcase */}
          <div className="hero-right-col">
            <div className="hero-showcase-glass-card">
              {/* Glossy Electric Orange Accent Badge */}
              <div className="showcase-top-bar">
                <div className="showcase-badge-pill">
                  <span className="pulsing-orange-dot" />
                  <span>SYSTEM RUNTIME STATUS: VERIFIED</span>
                </div>
                <span className="showcase-edition">2026 EDITION</span>
              </div>

              {/* Dynamic Technical Vector Visualization */}
              <div className="showcase-vector-wrapper">
                <ArchitectureSvg />
              </div>

              {/* Floating Key Metrics Sub-Panel */}
              <div className="showcase-metrics-float">
                <div className="float-metric-item">
                  <div className="metric-tag">
                    <CheckCircle2 size={13} color="var(--accent-orange)" />
                    <span>MILESTONES</span>
                  </div>
                  <div className="metric-num">6 / 6</div>
                  <div className="metric-sub">100% PASSING EVIDENCE</div>
                </div>

                <div className="float-divider" />

                <div className="float-metric-item">
                  <div className="metric-tag">
                    <Activity size={13} color="var(--accent-orange)" />
                    <span>OBSERVABILITY</span>
                  </div>
                  <div className="metric-num">PROACTIVE</div>
                  <div className="metric-sub">NAGIOS FAULT RECOVERY</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tomorrow-hero {
          padding-top: 130px;
          padding-bottom: 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-grid-12 {
          display: grid;
          grid-template-columns: 1.18fr 0.82fr;
          gap: 4vw;
          align-items: center;
        }

        /* Left Column */
        .hero-left-col {
          display: flex;
          flex-direction: column;
        }

        /* 1. Kicker */
        .hero-kicker-stack {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          line-height: 1.65;
          text-transform: uppercase;
          color: var(--ink-secondary);
        }

        /* 2. 38px Rule */
        .hero-editorial-rule-38 {
          width: 38px;
          height: 1.5px;
          background-color: var(--ink-primary);
          margin: 18px 0 22px 0;
        }

        /* 3. Monumental Display Title */
        .hero-display-title {
          font-family: var(--font-display);
          font-size: clamp(4.2rem, 9.5vw, 8.5rem);
          text-transform: uppercase;
          letter-spacing: -0.015em;
          line-height: 0.88;
          color: var(--ink-primary);
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .title-break {
          color: var(--accent-orange);
          display: block;
        }

        /* 4. Readable Subcopy Block */
        .hero-subcopy-block {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          text-transform: none;
          letter-spacing: 0.01em;
          line-height: 1.65;
          color: var(--ink-secondary);
          max-width: 540px;
          margin-top: 22px;
          margin-bottom: 28px;
        }

        /* 5. Pill Outline Buttons */
        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        /* 6. Quick Jump Navigation */
        .hero-quick-jump {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }

        .quick-jump-label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-muted);
          margin-right: 4px;
        }

        .quick-jump-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }

        .quick-jump-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.22);
          border: 1px solid var(--border-hairline);
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--ink-primary);
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .quick-jump-pill:hover {
          background: rgba(255, 255, 255, 0.45);
          border-color: var(--ink-primary);
          color: var(--ink-primary);
          transform: translateY(-1px);
        }

        /* Attribution Strip */
        .hero-attribution-strip {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--ink-secondary);
          padding-top: 20px;
          border-top: 1px solid var(--border-hairline);
        }

        .commit-copy-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-left: 6px;
          padding: 2px 8px;
          border-radius: 6px;
          background: rgba(48, 1, 58, 0.08);
          border: 1px solid var(--border-hairline);
          cursor: pointer;
          color: var(--ink-primary);
          transition: all 0.2s ease;
        }

        .commit-copy-pill:hover {
          background: rgba(255, 255, 255, 0.35);
          border-color: var(--ink-primary);
        }

        .commit-copy-pill code {
          font-size: 0.72rem;
          font-weight: 700;
        }

        .copy-hint {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--accent-orange-deep);
        }

        .attr-item strong {
          color: var(--ink-primary);
          font-weight: 700;
        }

        .attr-sep {
          color: rgba(48, 1, 58, 0.3);
        }

        /* Right Column Showcase */
        .hero-right-col {
          display: flex;
          flex-direction: column;
        }

        .hero-showcase-glass-card {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1.5px solid var(--border-hairline);
          border-radius: 28px;
          padding: 28px;
          box-shadow: 0 16px 48px rgba(48, 1, 58, 0.08);
          position: relative;
          transition: border-color 0.3s ease;
        }

        .hero-showcase-glass-card:hover {
          border-color: var(--ink-primary);
        }

        .showcase-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-hairline);
        }

        .showcase-badge-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(242, 93, 23, 0.15);
          border: 1px solid rgba(242, 93, 23, 0.4);
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-primary);
        }

        .pulsing-orange-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-orange);
          box-shadow: 0 0 8px var(--accent-orange-bright);
        }

        .showcase-edition {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--ink-muted);
        }

        .showcase-vector-wrapper {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          border: 1px solid var(--border-hairline);
          padding: 16px;
          margin-bottom: 20px;
        }

        /* Floating Metrics */
        .showcase-metrics-float {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 16px;
          align-items: center;
          background: var(--ink-primary);
          color: var(--ink-on-accent);
          padding: 18px 24px;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(48, 1, 58, 0.2);
        }

        .float-metric-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-orange-bright);
        }

        .metric-num {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.02em;
          line-height: 1;
          color: #FFF;
        }

        .metric-sub {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.7);
        }

        .float-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.15);
        }

        /* Responsive */
        @media (max-width: 992px) {
          .hero-grid-12 {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-display-title {
            font-size: clamp(3.5rem, 12vw, 6rem);
          }
        }

        @media (max-width: 600px) {
          .tomorrow-hero {
            padding-top: 104px;
          }
          .hero-cta-group {
            flex-direction: column;
          }
          .btn-pill-editorial {
            width: 100%;
          }
          .showcase-metrics-float {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .float-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
