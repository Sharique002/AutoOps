import React, { useState } from 'react';
import { GitBranch, CheckCircle2, ChevronRight, FileCode, Check } from 'lucide-react';
import { PIPELINE_STAGES } from '../data/projectData';

export const PipelineSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(PIPELINE_STAGES[1].id);

  const activeStage = PIPELINE_STAGES.find((s) => s.id === activeStageId) || PIPELINE_STAGES[0];

  return (
    <section id="pipeline" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <GitBranch size={14} />
            <span>CONTINUOUS AUTOMATION &amp; WORKFLOW</span>
          </div>
          <h2 className="section-title">End-to-End Automation Pipeline</h2>
          <p className="section-subtitle">
            From local commit verification to automated quality gates and zero-drift deployment. Automated CI validation runs in GitHub Actions while live container orchestration runs in local WSL2.
          </p>
        </div>

        {/* Boundary Legend */}
        <div className="pipeline-legend">
          <div className="legend-item">
            <span className="legend-badge legend-ci">AUTOMATED CI QUALITY GATE</span>
            <span className="legend-text">Executes in GitHub Actions on push &amp; PR (no cloud infra deployed)</span>
          </div>
          <div className="legend-item">
            <span className="legend-badge legend-local">LOCAL RUNTIME STEP</span>
            <span className="legend-text">Executes inside local Ubuntu 24.04 (WSL2) with Docker daemon</span>
          </div>
        </div>

        {/* Workflow Horizontal Progress Stepper */}
        <div className="pipeline-stepper-scroll">
          <div className="pipeline-stepper">
            {PIPELINE_STAGES.map((stage, idx) => {
              const isActive = stage.id === activeStageId;
              const isCI = stage.category === 'ci';

              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    className={`pipeline-step-node ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStageId(stage.id)}
                  >
                    <div className="node-top-bar">
                      <span className={`node-cat-pill ${isCI ? 'pill-ci' : 'pill-local'}`}>
                        {isCI ? 'CI GATE' : 'LOCAL'}
                      </span>
                      <span className="node-num">0{stage.number}</span>
                    </div>
                    <div className="node-name">{stage.name}</div>
                    <div className="node-tool">{stage.tool.split(' ')[0]}</div>
                    <div className="node-status">
                      <Check size={12} className="text-green" />
                      <span>{stage.status}</span>
                    </div>
                  </button>
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <div className="pipeline-step-connector">
                      <ChevronRight size={16} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Active Stage Inspector Panel */}
        <div className="pipeline-inspector panel">
          <div className="inspector-header">
            <div className="inspector-title-group">
              <span
                className={`badge ${
                  activeStage.category === 'ci' ? 'badge-cyan' : 'badge-pass'
                }`}
              >
                {activeStage.category === 'ci'
                  ? 'AUTOMATED CI VALIDATION'
                  : 'LOCAL ORCHESTRATION LAYER'}
              </span>
              <h3 className="inspector-title">
                Stage {activeStage.number}: {activeStage.name}
              </h3>
            </div>
            <div className="inspector-status-badge">
              <CheckCircle2 size={16} className="text-green" />
              <span>VERIFIED IN EVIDENCE</span>
            </div>
          </div>

          <div className="inspector-body-grid">
            <div className="inspector-field">
              <span className="field-label">Authoritative Tooling</span>
              <span className="field-val-tool">{activeStage.tool}</span>
            </div>

            <div className="inspector-field">
              <span className="field-label">Functional Purpose</span>
              <p className="field-val-text">{activeStage.purpose}</p>
            </div>

            <div className="inspector-field">
              <span className="field-label">Automated Validation Performed</span>
              <div className="field-val-code-box">
                <code>{activeStage.validation}</code>
              </div>
            </div>

            <div className="inspector-field">
              <span className="field-label">Repository Implementation Reference</span>
              <div className="field-val-ref">
                <FileCode size={14} className="text-cyan" />
                <code>{activeStage.evidencePath}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pipeline-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: var(--space-6);
          padding: 12px 18px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legend-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 3px 8px;
          border-radius: var(--radius-sm);
        }

        .legend-ci {
          background: var(--accent-cyan-bg);
          color: var(--accent-cyan);
          border: 1px solid rgba(56, 207, 240, 0.3);
        }

        .legend-local {
          background: var(--accent-green-bg);
          color: var(--accent-green);
          border: 1px solid rgba(53, 229, 140, 0.3);
        }

        .legend-text {
          font-size: 12.5px;
          color: var(--text-secondary);
        }

        .pipeline-stepper-scroll {
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: var(--space-8);
        }

        .pipeline-stepper {
          display: flex;
          align-items: center;
          min-width: 980px;
          gap: 8px;
        }

        .pipeline-step-node {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 14px 12px;
          text-align: left;
          transition: all var(--transition-fast);
        }

        .pipeline-step-node:hover {
          border-color: var(--border-hover);
          background: var(--bg-surface);
        }

        .pipeline-step-node.active {
          border-color: var(--accent-cyan);
          background: var(--bg-surface-elevated);
          box-shadow: 0 0 14px rgba(56, 207, 240, 0.12);
        }

        .node-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .node-cat-pill {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .pill-ci {
          background: rgba(56, 207, 240, 0.12);
          color: var(--accent-cyan);
        }

        .pill-local {
          background: rgba(53, 229, 140, 0.12);
          color: var(--accent-green);
        }

        .node-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }

        .node-name {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 4px;
          min-height: 32px;
        }

        .node-tool {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .node-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent-green);
          font-weight: 600;
        }

        .pipeline-step-connector {
          color: var(--border-hover);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pipeline-inspector {
          padding: 24px;
        }

        .inspector-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .inspector-title-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .inspector-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .inspector-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          color: var(--accent-green);
          background: var(--accent-green-bg);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(53, 229, 140, 0.25);
        }

        .inspector-body-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .inspector-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .field-val-tool {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 600;
          color: var(--accent-cyan);
        }

        .field-val-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .field-val-code-box {
          background: var(--bg-terminal);
          border: 1px solid var(--border-subtle);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 12.5px;
          color: var(--text-primary);
        }

        .field-val-ref {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 12.5px;
        }

        .text-green { color: var(--accent-green); }
        .text-cyan { color: var(--accent-cyan); }

        @media (max-width: 768px) {
          .inspector-body-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
