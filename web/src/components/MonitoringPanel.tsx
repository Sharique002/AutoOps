import React, { useState } from 'react';
import { CheckCircle2, AlertOctagon, RefreshCw, Terminal, Eye } from 'lucide-react';
import { MONITORING_CHECKS, RECOVERY_SEQUENCE_STEPS } from '../data/projectData';

export const MonitoringPanel: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // Default to Step 4 (Verified Recovery)

  const activeStep = RECOVERY_SEQUENCE_STEPS[activeStepIndex];

  return (
    <section id="monitoring" className="section tomorrow-monitoring-section">
      <div className="container">
        {/* 4-Part Typographic Signature */}
        <div className="section-header">
          <span className="section-eyebrow">OBSERVABILITY &amp; ACTIVE FAULT TOLERANCE // PROACTIVE TELEMETRY</span>
          <div className="editorial-rule-38" />
          <h2 className="section-title">NAGIOS MONITORING</h2>
          <p className="section-subtitle">
            Active service checks probe FastAPI within isolated Docker bridge networks with real-time failure injection and recovery.
          </p>
        </div>

        {/* Live Status Policy Banner */}
        <div className="monitoring-status-banner">
          <div className="banner-left">
            <span className="banner-env-pill">
              <span className="dot-orange" />
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
        <div className="checks-grid-3">
          {MONITORING_CHECKS.map((check) => (
            <div key={check.id} className="tomorrow-check-card">
              <div className="check-card-top">
                <div className="check-type-row">
                  <span className="badge badge-pass">{check.type} CHECK</span>
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
        <div className="tomorrow-recovery-card">
          <div className="rf-header">
            <div className="rf-title-group">
              <div className="rf-eyebrow">
                <RefreshCw size={14} color="var(--accent-orange)" />
                <span>EVIDENCE-BASED INTEGRATION TEST</span>
              </div>
              <h3 className="rf-title">Controlled Failure &amp; Recovery Sequence</h3>
            </div>
            <div className="rf-evidence-ref">
              <Terminal size={14} color="var(--ink-secondary)" />
              <code>docs/evidence/milestone-04-verification.txt</code>
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
                  <AlertOctagon size={20} color="#900C3F" />
                ) : activeStep.state === 'RECOVERY' ? (
                  <RefreshCw size={20} color="var(--accent-orange)" />
                ) : (
                  <CheckCircle2 size={20} color="var(--ink-primary)" />
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
        <div className="tomorrow-payload-card">
          <div className="payload-header">
            <div className="payload-title-group">
              <Eye size={16} color="var(--accent-orange)" />
              <h4 className="payload-title">Application Health Contract (GET /health)</h4>
            </div>
            <span className="badge badge-pass">HTTP 200 OK</span>
          </div>

          <pre className="tomorrow-code-box">
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
        .tomorrow-monitoring-section {
          background: transparent;
        }

        .monitoring-status-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 20px;
          padding: 16px 24px;
          margin-bottom: 32px;
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
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--ink-primary);
          background: rgba(242, 93, 23, 0.15);
          border: 1px solid var(--accent-orange);
          padding: 4px 12px;
          border-radius: 9999px;
        }

        .dot-orange {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-orange);
          box-shadow: 0 0 8px var(--accent-orange-bright);
        }

        .banner-network-text {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--ink-secondary);
        }

        .banner-network-text code {
          color: var(--accent-orange-deep);
          font-weight: 700;
        }

        .banner-right {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
        }

        .last-verified-label {
          color: var(--ink-muted);
        }

        .last-verified-time {
          color: var(--ink-primary);
          font-weight: 700;
        }

        /* Checks Grid */
        .checks-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }

        .tomorrow-check-card {
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
        }

        .tomorrow-check-card:hover {
          border-color: var(--ink-primary);
          transform: translateY(-2px);
        }

        .check-card-top {
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-hairline);
          padding-bottom: 14px;
        }

        .check-type-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .check-name {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ink-primary);
          margin-bottom: 8px;
        }

        .check-endpoint-box code {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-orange-bright);
          background: var(--bg-code);
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-block;
        }

        .check-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .check-detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-sans);
          font-size: 0.75rem;
        }

        .cd-label {
          color: var(--ink-muted);
        }

        .cd-val {
          font-weight: 600;
          color: var(--ink-primary);
        }

        .cd-description {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--ink-secondary);
          line-height: 1.5;
          margin-top: auto;
          padding-top: 8px;
        }

        /* Recovery Card */
        .tomorrow-recovery-card {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 28px;
          margin-bottom: 36px;
          box-shadow: 0 8px 30px rgba(48, 1, 58, 0.06);
        }

        .rf-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-hairline);
        }

        .rf-eyebrow {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-secondary);
          margin-bottom: 4px;
        }

        .rf-title {
          font-family: var(--font-display);
          font-size: 1.6rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--ink-primary);
          margin: 0;
        }

        .rf-evidence-ref {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--ink-secondary);
        }

        .rf-stepper-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        .rf-tab-btn {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 14px;
          border-radius: 18px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.16);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .rf-tab-btn:hover {
          border-color: var(--ink-primary);
          background: rgba(255, 255, 255, 0.28);
        }

        .rf-tab-btn.active {
          background: var(--accent-orange);
          border-color: var(--accent-orange);
          box-shadow: 0 6px 20px var(--accent-orange-glow);
        }

        .rf-tab-btn.active .tab-step-num,
        .rf-tab-btn.active .tab-step-name {
          color: #FFFFFF;
        }

        .tab-step-num {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--ink-muted);
        }

        .tab-step-name {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--ink-primary);
        }

        .tab-badge {
          font-size: 10px;
          padding: 2px 8px;
          max-width: fit-content;
        }

        .rf-step-display {
          background: rgba(48, 1, 58, 0.08);
          border-radius: 18px;
          padding: 20px;
          border: 1px solid var(--border-hairline);
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
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--ink-primary);
        }

        .sd-timestamp {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--ink-muted);
        }

        .sd-description {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          color: var(--ink-secondary);
          line-height: 1.6;
        }

        /* Payload Card */
        .tomorrow-payload-card {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 24px;
        }

        .payload-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .payload-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .payload-title {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ink-primary);
        }

        .tomorrow-code-box {
          background: var(--bg-code);
          color: var(--accent-orange-bright);
          border: 1px solid var(--border-strong);
          border-radius: 16px;
          padding: 18px 24px;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          line-height: 1.6;
          overflow-x: auto;
          margin-bottom: 12px;
        }

        .payload-footer {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          color: var(--ink-muted);
        }

        .pf-note code {
          color: var(--accent-orange-deep);
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .checks-grid-3 {
            grid-template-columns: 1fr;
          }
          .rf-stepper-tabs {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
};
