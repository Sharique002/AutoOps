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
        return <UserCheck size={20} className="text-green" />;
      case 'Lock':
        return <Lock size={20} className="text-green" />;
      case 'HardDrive':
        return <HardDrive size={20} className="text-cyan" />;
      case 'ShieldAlert':
        return <ShieldAlert size={20} className="text-green" />;
      case 'Shield':
        return <Shield size={20} className="text-green" />;
      case 'Cpu':
        return <Cpu size={20} className="text-cyan" />;
      case 'Radio':
        return <Radio size={20} className="text-cyan" />;
      case 'Key':
        return <Key size={20} className="text-green" />;
      case 'AlertTriangle':
        return <AlertTriangle size={20} className="text-warn" />;
      default:
        return <ShieldCheck size={20} className="text-green" />;
    }
  };

  return (
    <section id="security" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <ShieldCheck size={14} />
            <span>CONTAINER HARDENING &amp; RISK AUDIT</span>
          </div>
          <h2 className="section-title">Defense-in-Depth Container Security</h2>
          <p className="section-subtitle">
            Container isolation adheres to CIS Docker benchmark principles. Privilege boundaries, kernel capability restrictions, and secret scanning are actively enforced with transparent residual risk disclosure.
          </p>
        </div>

        {/* Security Controls Grid */}
        <div className="security-grid">
          {SECURITY_CONTROLS.map((control) => {
            const isLimitation = control.status === 'DISCLOSED_LIMITATION';

            return (
              <div
                key={control.id}
                className={`sec-card panel ${isLimitation ? 'card-limitation' : ''}`}
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
                  <span className="sec-ev-label">Verification Evidence:</span>
                  <div className="sec-ev-text">
                    {isLimitation ? (
                      <AlertTriangle size={13} className="text-warn inline-icon" />
                    ) : (
                      <CheckCircle size={13} className="text-green inline-icon" />
                    )}
                    <span>{control.verificationEvidence}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Assessment Footer Callout */}
        <div className="sec-audit-banner panel">
          <div className="audit-col">
            <h4 className="audit-heading">Zero-Secret Git Repository Policy</h4>
            <p className="audit-text">
              Active container secrets and sensitive dashboard passwords reside strictly in uncommitted <code>.env</code> files. Automated continuous integration executes <code>scripts/check_secrets.sh</code> to reject any commits containing AWS tokens, private keys, or credentials.
            </p>
          </div>
          <div className="audit-badge-box">
            <ShieldCheck size={28} className="text-green" />
            <div className="audit-status-text">
              <span className="ast-title">CI SECRET SCAN</span>
              <span className="ast-val">PASSED (0 LEAKS)</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .security-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
          margin-bottom: var(--space-8);
        }

        .sec-card {
          display: flex;
          flex-direction: column;
          padding: 22px 20px;
          border-top: 2px solid var(--accent-green);
        }

        .sec-card.card-limitation {
          border-top: 2px solid var(--status-warn);
          background: rgba(255, 184, 77, 0.03);
        }

        .sec-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .sec-icon-box {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sec-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .sec-directive-box {
          background: var(--bg-terminal);
          border: 1px solid var(--border-subtle);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 11.5px;
          color: var(--accent-cyan);
          margin-bottom: 12px;
          overflow-x: auto;
        }

        .sec-summary {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .sec-evidence-row {
          border-top: 1px solid var(--border-subtle);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sec-ev-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .sec-ev-text {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }

        .inline-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        .sec-audit-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-surface);
          padding: 20px 24px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .audit-col {
          max-width: 760px;
        }

        .audit-heading {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .audit-text {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .audit-text code {
          color: var(--accent-cyan);
        }

        .audit-badge-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          padding: 10px 18px;
          border-radius: var(--radius-md);
        }

        .audit-status-text {
          display: flex;
          flex-direction: column;
        }

        .ast-title {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .ast-val {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 700;
          color: var(--accent-green);
        }

        .text-green { color: var(--accent-green); }
        .text-cyan { color: var(--accent-cyan); }
        .text-warn { color: var(--status-warn); }

        @media (max-width: 1024px) {
          .security-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .security-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
