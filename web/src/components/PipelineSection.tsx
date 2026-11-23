import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { PIPELINE_STAGES } from '../data/projectData';

export const PipelineSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(PIPELINE_STAGES[1].id);

  const activeStage = PIPELINE_STAGES.find((s) => s.id === activeStageId) || PIPELINE_STAGES[0];

  return (
    <section id="pipeline" className="section tomorrow-pipeline-section">
      <div className="container">
        {/* 4-Part Typographic Signature */}
        <div className="section-header">
          <span className="section-eyebrow">CONTINUOUS AUTOMATION &amp; WORKFLOW // 7 VERIFIED STAGES</span>
          <div className="editorial-rule-38" />
          <h2 className="section-title">AUTOMATION PIPELINE</h2>
          <p className="section-subtitle">
            Automated CI quality gates in GitHub Actions partitioned from local Docker and Ansible operational runtime.
          </p>
        </div>

        {/* Boundary Legend */}
        <div className="tomorrow-pipeline-legend">
          <div className="legend-box">
            <span className="legend-tag tag-ci">AUTOMATED CI QUALITY GATE</span>
            <span className="legend-desc">Runs in GitHub Actions on push &amp; PR (no cloud infra deployed)</span>
          </div>
          <div className="legend-box">
            <span className="legend-tag tag-local">LOCAL RUNTIME ORCHESTRATION</span>
            <span className="legend-desc">Runs inside local Ubuntu 24.04 (WSL2) with Docker daemon</span>
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
                      <Check size={12} color={isActive ? '#FFF' : 'var(--accent-orange)'} />
                      <span>{stage.status}</span>
                    </div>
                  </button>
                  {idx < PIPELINE_STAGES.length - 1 && (
                    <div className="pipeline-step-connector">
                      <ChevronRight size={16} color="var(--ink-primary)" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Active Stage Inspector Panel */}
        <div className="pipeline-inspector">
          <div className="inspector-header">
            <div className="inspector-title-group">
              <span className="badge badge-pass">
                {activeStage.category === 'ci' ? 'AUTOMATED CI VALIDATION' : 'LOCAL ORCHESTRATION LAYER'}
              </span>
              <h3 className="inspector-title">
                Stage {activeStage.number}: {activeStage.name}
              </h3>
            </div>
            <div className="inspector-status-badge">
              <CheckCircle2 size={16} color="var(--accent-orange)" />
              <span>VERIFIED IN EVIDENCE</span>
            </div>
          </div>

          <div className="inspector-body-grid">
            <div className="inspector-field">
              <span className="field-label">AUTHORITATIVE TOOLING</span>
              <span className="field-val-tool">{activeStage.tool}</span>
            </div>

            <div className="inspector-field">
              <span className="field-label">STAGE EXECUTION SCOPE</span>
              <span className="field-val">{activeStage.category.toUpperCase()}</span>
            </div>

            <div className="inspector-field">
              <span className="field-label">IMPLEMENTATION TARGET</span>
              <code className="field-code-path">{activeStage.evidencePath}</code>
            </div>

            <div className="inspector-field span-2">
              <span className="field-label">FUNCTIONAL PURPOSE</span>
              <p className="field-desc-text">{activeStage.purpose}</p>
            </div>

            <div className="inspector-field span-2">
              <span className="field-label">VERIFIED QUALITY CHECK</span>
              <p className="field-desc-text">{activeStage.validation}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tomorrow-pipeline-section {
          background: transparent;
        }

        .tomorrow-pipeline-legend {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 28px;
        }

        .legend-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid var(--border-hairline);
        }

        .legend-tag {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          padding: 3px 10px;
          border-radius: 9999px;
          text-transform: uppercase;
        }

        .tag-ci {
          background: rgba(242, 93, 23, 0.15);
          color: var(--accent-orange-deep);
          border: 1px solid var(--accent-orange);
        }

        .tag-local {
          background: rgba(48, 1, 58, 0.12);
          color: var(--ink-primary);
          border: 1px solid var(--ink-primary);
        }

        .legend-desc {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          color: var(--ink-secondary);
        }

        /* Progress Stepper */
        .pipeline-stepper-scroll {
          overflow-x: auto;
          padding-bottom: 16px;
          margin-bottom: 28px;
        }

        .pipeline-stepper {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 900px;
        }

        .pipeline-step-node {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 16px 14px;
          border-radius: 20px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          text-align: left;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pipeline-step-node:hover {
          border-color: var(--ink-primary);
          background: rgba(255, 255, 255, 0.3);
        }

        .pipeline-step-node.active {
          background: var(--accent-orange);
          border-color: var(--accent-orange);
          box-shadow: 0 8px 24px var(--accent-orange-glow);
        }

        .pipeline-step-node.active .node-name,
        .pipeline-step-node.active .node-num,
        .pipeline-step-node.active .node-status span {
          color: #FFFFFF;
        }

        .pipeline-step-node.active .node-tool {
          color: rgba(255, 255, 255, 0.85);
        }

        .node-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .node-cat-pill {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 2px 6px;
          border-radius: 9999px;
          text-transform: uppercase;
        }

        .pill-ci {
          background: rgba(242, 93, 23, 0.15);
          color: var(--accent-orange-deep);
        }

        .pill-local {
          background: rgba(48, 1, 58, 0.1);
          color: var(--ink-primary);
        }

        .node-num {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--ink-muted);
        }

        .node-name {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--ink-primary);
          line-height: 1.3;
        }

        .node-tool {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--ink-muted);
        }

        .node-status {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--ink-primary);
          margin-top: 4px;
        }

        .pipeline-step-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.6;
        }

        /* Inspector */
        .pipeline-inspector {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 8px 30px rgba(48, 1, 58, 0.06);
        }

        .inspector-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-hairline);
        }

        .inspector-title-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .inspector-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--ink-primary);
          margin: 0;
        }

        .inspector-status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-primary);
          padding: 6px 14px;
          border-radius: 9999px;
          background: rgba(242, 93, 23, 0.12);
          border: 1px solid var(--accent-orange);
        }

        .inspector-body-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .inspector-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .inspector-field.span-2 {
          grid-column: span 3;
        }

        .field-label {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        .field-val-tool {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--ink-primary);
        }

        .field-val {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--ink-secondary);
        }

        .field-code-path {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent-orange-bright);
          background: var(--bg-code);
          padding: 6px 12px;
          border-radius: 8px;
          max-width: fit-content;
        }

        .field-desc-text {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          color: var(--ink-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .tomorrow-pipeline-legend {
            grid-template-columns: 1fr;
          }
          .inspector-body-grid {
            grid-template-columns: 1fr;
          }
          .inspector-field.span-2 {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
};
