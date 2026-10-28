import React, { useState } from 'react';
import { Activity, CheckCircle2, AlertOctagon, RefreshCw, Terminal, Eye } from 'lucide-react';
import { MONITORING_CHECKS, RECOVERY_SEQUENCE_STEPS } from '../data/projectData';

export const MonitoringPanel: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Default to Step 4 (Verified Recovery)

  const activeStep = RECOVERY_SEQUENCE_STEPS[activeStepIndex];

  return (
    <section id="monitoring" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Activity size={14} />
            <span>OBSERVABILITY &amp; FAULT TOLERANCE</span>
          </div>
          <h2 className="section-title">Nagios Core Monitoring &amp; Self-Healing Verification</h2>
          <p className="section-subtitle">
            Active service checks probe the FastAPI application within the isolated Docker bridge network. Failure injection testing validates automatic failure detection and recovery verification.
          </p>
        </div>

        {/* Live Status Policy Banner */}
        <div className="monitoring-status-banner panel">
          <div className="banner-left">
            <span className="banner-env-pill">
              <span className="dot-green" />
              <span>ENVIRONMENT: LOCAL DEVELOPMENT</span>
            </span>
            <span className="banner-network-text">
              Monitored internally via Docker bridge network <code>autoops-network</code>
            </span>
          </div>
          <div className="banner-right">
            <span className="last-verified-label">LAST HISTORICAL VERIFICATION:</span>
            <span className="last-verified-time">2026-10-28 17:02:10 UTC</span>
          </div>
        </div>

        {/* Active Checks Grid */}
        <div className="checks-grid">
          {MONITORING_CHECKS.map((check) => (
            <div key={check.id} className="check-card panel">
              <div className="check-card-top">
                <div className="check-type-row">
                  <span className="badge badge-cyan">{check.type} CHECK</span>
                  <span className="badge badge-pass">STATUS: {check.lastVerifiedStatus}</span>
                </div>
                <h3 className="check-name">{check.name}</h3>
                <div className="check-endpoint-box">
                  <code>{check.endpoint}</code>
                </div>
              </div>

              <div className="check-details">
                <div className="check-detail-row">
                  <span className="cd-label">Polling Frequency:</span>
                  <span className="cd-val">{check.frequency}</span>
                </div>
                <div className="check-detail-row">
                  <span className="cd-label">Expected Contract:</span>
                  <span className="cd-val font-mono">{check.expectedState}</span>
                </div>
                <p className="cd-description">{check.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controlled Failure & Recovery Sequence Walkthrough */}
        <div className="recovery-flow-section panel">
          <div className="rf-header">
            <div className="rf-title-group">
              <div className="rf-eyebrow">
                <RefreshCw size={14} className="text-cyan" />
                <span>EVIDENCE-BASED INTEGRATION TEST</span>
              </div>
              <h3 className="rf-title">Controlled Failure &amp; Recovery Sequence</h3>
            </div>
            <div className="rf-evidence-ref">
              <Terminal size={14} className="text-secondary" />
              <span>docs/evidence/milestone-04-verification.txt</span>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="rf-stepper-tabs">
            {RECOVERY_SEQUENCE_STEPS.map((step, idx) => (
              <button
                key={idx}
                type="button"
                className={`rf-tab-btn ${activeStepIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
              >
                <div className="tab-step-num">PHASE {idx + 1}</div>
                <div className="tab-step-name">{step.step.split(': ')[1]}</div>
                <span className={`badge ${step.badgeClass} tab-badge`}>{step.state}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Display */}
          <div className="rf-step-display">
            <div className="step-display-header">
              <div className="sd-title-row">
                {activeStep.state === 'CRITICAL' ? (
                  <AlertOctagon size={20} className="text-fail" />
                ) : activeStep.state === 'RECOVERY' ? (
                  <RefreshCw size={20} className="text-warn" />
                ) : (
                  <CheckCircle2 size={20} className="text-green" />
                )}
                <h4 className="sd-phase-title">{activeStep.step}</h4>
                <span className={`badge ${activeStep.badgeClass}`}>{activeStep.state}</span>
              </div>
              <div className="sd-timestamp">
                <span>Timestamp: </span>
                <code>{activeStep.timestamp}</code>
              </div>
            </div>

            <p className="sd-description">{activeStep.detail}</p>
          </div>
        </div>

        {/* Live Payload Contract Inspection */}
        <div className="payload-inspect-section panel">
          <div className="payload-header">
            <div className="payload-title-group">
              <Eye size={16} className="text-cyan" />
              <h4 className="payload-title">Application Health Contract (GET /health)</h4>
            </div>
            <span className="badge badge-pass">HTTP 200 OK</span>
          </div>

          <pre className="payload-json-box">
{`{
  "status": "healthy",
  "timestamp": "2026-10-28T18:26:47.123456+00:00",
  "version": "0.1.0"
}`}
          </pre>
          <div className="payload-footer">
            <span className="pf-note">
              Conforms strictly to RFC-3339 UTC ISO 8601 timestamp schema. Verified by <code>tests/test_health.py</code>.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .monitoring-status-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 14px 20px;
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
          gap: 12px;
        }

        .banner-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .banner-env-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-green);
          background: var(--accent-green-bg);
          border: 1px solid rgba(53, 229, 140, 0.25);
          padding: 4px 10px;
          border-radius: var(--radius-pill);
        }

        .dot-green {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-green);
        }

        .banner-network-text {
          font-size: 13px;
          color: var(--text-secondary);
        }

        .banner-network-text code {
          color: var(--accent-cyan);
        }

        .banner-right {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11.5px;
        }

        .last-verified-label {
          color: var(--text-muted);
        }

        .last-verified-time {
          color: var(--text-primary);
          font-weight: 600;
        }

        .checks-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
          margin-bottom: var(--space-8);
        }

        .check-card {
          display: flex;
          flex-direction: column;
          padding: 22px 20px;
        }

        .check-card-top {
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 14px;
        }

        .check-type-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .check-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .check-endpoint-box {
          background: var(--bg-terminal);
          border: 1px solid var(--border-subtle);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--accent-cyan);
          overflow-x: auto;
        }

        .check-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .check-detail-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cd-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .cd-val {
          font-size: 12.5px;
          color: var(--text-secondary);
        }

        .cd-description {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-top: 4px;
        }

        .recovery-flow-section {
          padding: 24px;
          margin-bottom: var(--space-8);
        }

        .rf-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .rf-eyebrow {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--accent-cyan);
          margin-bottom: 4px;
        }

        .rf-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .rf-evidence-ref {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
        }

        .rf-stepper-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }

        .rf-tab-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 12px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          text-align: left;
          transition: all var(--transition-fast);
        }

        .rf-tab-btn:hover {
          border-color: var(--border-hover);
        }

        .rf-tab-btn.active {
          border-color: var(--accent-orange);
          background: var(--bg-surface-elevated);
          box-shadow: 0 0 16px var(--accent-orange-glow);
        }

        .tab-step-num {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .tab-step-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .tab-badge {
          font-size: 10px;
          padding: 2px 6px;
        }

        .rf-step-display {
          background: var(--bg-terminal);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 20px;
        }

        .step-display-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .sd-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sd-phase-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .sd-timestamp {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .sd-timestamp code {
          color: var(--text-secondary);
        }

        .sd-description {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .payload-inspect-section {
          padding: 20px 24px;
          background: var(--bg-panel);
        }

        .payload-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .payload-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .payload-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .payload-json-box {
          background: var(--bg-terminal);
          border: 1px solid var(--border-subtle);
          padding: 14px 18px;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--accent-green);
          overflow-x: auto;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .payload-footer {
          font-size: 12px;
          color: var(--text-muted);
        }

        .payload-footer code {
          color: var(--text-secondary);
        }

        .text-fail { color: var(--status-fail); }
        .text-warn { color: var(--status-warn); }
        .text-green { color: var(--status-pass); }
        .text-cyan { color: var(--accent-cyan); }
        .font-mono { font-family: var(--font-mono); }

        @media (max-width: 992px) {
          .checks-grid {
            grid-template-columns: 1fr;
          }
          .rf-stepper-tabs {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .rf-stepper-tabs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
