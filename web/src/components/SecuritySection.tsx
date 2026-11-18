import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  Lock,
  HardDrive,
  ShieldAlert,
  Shield,
  Cpu,
  Radio,
  Key,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { SECURITY_CONTROLS } from '../data/projectData';

export const SecuritySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck size={20} color="var(--accent-orange)" />;
      case 'Lock':
        return <Lock size={20} color="var(--accent-orange)" />;
      case 'HardDrive':
        return <HardDrive size={20} color="var(--accent-orange)" />;
      case 'ShieldAlert':
        return <ShieldAlert size={20} color="var(--accent-orange)" />;
      case 'Shield':
        return <Shield size={20} color="var(--accent-orange)" />;
      case 'Cpu':
        return <Cpu size={20} color="var(--accent-orange)" />;
      case 'Radio':
        return <Radio size={20} color="var(--accent-orange)" />;
      case 'Key':
        return <Key size={20} color="var(--accent-orange)" />;
      case 'AlertTriangle':
        return <AlertTriangle size={20} color="var(--accent-orange-deep)" />;
      default:
        return <ShieldCheck size={20} color="var(--accent-orange)" />;
    }
  };

  return (
    <section id="security" className="section tomorrow-sec-section">
      <div className="container">
        {/* 4-Part Typographic Signature */}
        <div className="section-header">
          <span className="section-eyebrow">CONTAINER HARDENING &amp; RISK AUDIT // DEFENSE IN DEPTH</span>
          <div className="editorial-rule-38" />
          <h2 className="section-title">CONTAINER SECURITY</h2>
          <p className="section-subtitle">
            IMMUTABLE ROOT FILESYSTEMS, DROPPED KERNEL CAPABILITIES, NON-ROOT EXECUTION, AND RIGOROUS SECRET SCANNING AUDIT.
          </p>
        </div>

        {/* Security Controls Grid */}
        <div className="tomorrow-sec-grid">
          {SECURITY_CONTROLS.map((control) => {
            const isLimitation = control.status === 'DISCLOSED_LIMITATION';

            return (
              <div
                key={control.id}
                className={`tomorrow-sec-card ${isLimitation ? 'card-limitation' : ''}`}
              >
                <div className="sec-card-top">
                  <div className="sec-icon-box">{getIcon(control.iconName)}</div>
                  <span
                    className={`badge ${
                      isLimitation ? 'badge-warn' : 'badge-pass'
                    }`}
                  >
                    {isLimitation ? 'DISCLOSED LIMITATION' : 'ENFORCED'}
                  </span>
                </div>

                <h3 className="sec-title">{control.title}</h3>

                <div className="sec-directive-box">
                  <code>{control.directive}</code>
                </div>

                <p className="sec-summary">{control.summary}</p>

                <div className="sec-evidence-row">
                  <span className="sec-ev-label">VERIFICATION:</span>
                  <div className="sec-ev-text">
                    {isLimitation ? (
                      <AlertTriangle size={13} color="var(--accent-orange-deep)" />
                    ) : (
                      <CheckCircle size={13} color="var(--accent-orange)" />
                    )}
                    <span>{control.verificationEvidence}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .tomorrow-sec-section {
          background: transparent;
        }

        .tomorrow-sec-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .tomorrow-sec-card {
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

        .tomorrow-sec-card:hover {
          border-color: var(--ink-primary);
          transform: translateY(-2px);
        }

        .tomorrow-sec-card.card-limitation {
          border-left: 3px solid var(--accent-orange-deep);
        }

        .sec-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .sec-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(242, 93, 23, 0.12);
          border: 1px solid rgba(242, 93, 23, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sec-title {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ink-primary);
          margin-bottom: 12px;
          line-height: 1.35;
        }

        .sec-directive-box {
          margin-bottom: 12px;
        }

        .sec-directive-box code {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-orange-bright);
          background: var(--bg-code);
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-block;
          max-width: 100%;
          overflow-x: auto;
        }

        .sec-summary {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin-bottom: 18px;
          flex: 1;
        }

        .sec-evidence-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding-top: 14px;
          border-top: 1px solid var(--border-hairline);
        }

        .sec-ev-label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--ink-muted);
        }

        .sec-ev-text {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--ink-primary);
        }

        @media (max-width: 1024px) {
          .tomorrow-sec-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .tomorrow-sec-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
