import React, { useState } from 'react';
import { BookOpen, Copy, Check, Terminal, FileText } from 'lucide-react';
import { DOCUMENTATION_RESOURCES, DEMO_COMMANDS } from '../data/projectData';

export const DocumentationGrid: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      // Fallback for environments where clipboard API is restricted
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section id="documentation" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <BookOpen size={14} />
            <span>ACADEMIC REPORTS &amp; LIVE DEMONSTRATION</span>
          </div>
          <h2 className="section-title">Project Documentation &amp; Evaluation Guide</h2>
          <p className="section-subtitle">
            All engineering decisions, architectural models, security controls, and verification outputs are documented in comprehensive academic markdown reports in the repository.
          </p>
        </div>

        {/* Documentation Resource Cards */}
        <div className="doc-cards-grid">
          {DOCUMENTATION_RESOURCES.map((doc) => (
            <div key={doc.id} className="doc-card panel">
              <div className="doc-card-top">
                <span className="badge badge-cyan">{doc.category}</span>
                <span className="doc-meta-badge">{doc.sizeOrSections}</span>
              </div>

              <h3 className="doc-title">{doc.title}</h3>
              <p className="doc-desc">{doc.description}</p>

              <div className="doc-card-footer">
                <div className="doc-path-box">
                  <FileText size={13} className="text-secondary" />
                  <code>{doc.relativePath}</code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Viva Demonstration Guide */}
        <div className="demo-guide-wrapper panel">
          <div className="demo-header">
            <div className="demo-title-group">
              <div className="demo-eyebrow">
                <Terminal size={14} className="text-green" />
                <span>SAFE OPERATIONAL DEMO</span>
              </div>
              <h3 className="demo-title">Local Demonstration &amp; Viva Inspection Commands</h3>
            </div>
            <p className="demo-sub">
              Execute these safe commands inside Ubuntu 24.04 (WSL2) to verify system state live during examination.
            </p>
          </div>

          <div className="commands-list">
            {DEMO_COMMANDS.map((cmd) => {
              const isCopied = copiedId === cmd.id;

              return (
                <div key={cmd.id} className="command-item panel">
                  <div className="cmd-item-header">
                    <div className="cmd-meta">
                      <span className="cmd-category">{cmd.category}</span>
                      <h4 className="cmd-label">{cmd.label}</h4>
                    </div>

                    <button
                      type="button"
                      className={`copy-btn ${isCopied ? 'copied' : ''}`}
                      onClick={() => handleCopy(cmd.id, cmd.command)}
                      aria-label={`Copy command: ${cmd.label}`}
                    >
                      {isCopied ? (
                        <>
                          <Check size={14} className="text-green" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="cmd-desc">{cmd.description}</p>

                  <div className="cmd-terminal-box">
                    <span className="terminal-prompt">$</span>
                    <code className="cmd-code">{cmd.command}</code>
                  </div>

                  <div className="cmd-expected-box">
                    <span className="expected-label">Expected Output:</span>
                    <pre className="expected-pre">{cmd.expectedOutputPreview}</pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .doc-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
          margin-bottom: var(--space-10);
        }

        .doc-card {
          display: flex;
          flex-direction: column;
          padding: 22px 20px;
          border-left: 2px solid var(--accent-cyan);
        }

        .doc-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .doc-meta-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }

        .doc-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.35;
          margin-bottom: 8px;
        }

        .doc-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .doc-card-footer {
          border-top: 1px solid var(--border-subtle);
          padding-top: 12px;
        }

        .doc-path-box {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
        }

        .doc-path-box code {
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .demo-guide-wrapper {
          padding: 24px;
          background: var(--bg-surface);
        }

        .demo-header {
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 16px;
        }

        .demo-eyebrow {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--accent-green);
          margin-bottom: 4px;
        }

        .demo-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .demo-sub {
          font-size: 13.5px;
          color: var(--text-secondary);
        }

        .commands-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
        }

        .command-item {
          display: flex;
          flex-direction: column;
          padding: 18px;
          background: var(--bg-panel);
        }

        .cmd-item-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 6px;
          gap: 12px;
        }

        .cmd-category {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--accent-cyan);
        }

        .cmd-label {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .cmd-desc {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .cmd-terminal-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-terminal);
          border: 1px solid var(--border-subtle);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          margin-bottom: 10px;
          overflow-x: auto;
        }

        .terminal-prompt {
          color: var(--accent-green);
          font-family: var(--font-mono);
          font-weight: 700;
          user-select: none;
        }

        .cmd-code {
          color: var(--text-primary);
          font-size: 12px;
          white-space: nowrap;
        }

        .cmd-expected-box {
          background: rgba(0, 0, 0, 0.25);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 8px 10px;
        }

        .expected-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .expected-pre {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 11.5px;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .copy-btn:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .copy-btn.copied {
          border-color: var(--accent-green);
          color: var(--accent-green);
          background: var(--accent-green-bg);
        }

        .text-green { color: var(--accent-green); }
        .text-cyan { color: var(--accent-cyan); }

        @media (max-width: 1024px) {
          .doc-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .commands-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .doc-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
