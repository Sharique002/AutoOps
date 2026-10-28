import React, { useState, useEffect } from 'react';
import { BookOpen, Copy, Check, Terminal, FileText, ExternalLink, Eye, X } from 'lucide-react';
import { DOCUMENTATION_RESOURCES, DEMO_COMMANDS } from '../data/projectData';
import { DocResource } from '../types';

export const DocumentationGrid: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeDoc, setActiveDoc] = useState<DocResource | null>(null);
  const [docContent, setDocContent] = useState<string>('');
  const [loadingDoc, setLoadingDoc] = useState<boolean>(false);
  const [docError, setDocError] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Open modal and fetch markdown content
  const handleOpenDoc = async (doc: DocResource) => {
    setActiveDoc(doc);
    setLoadingDoc(true);
    setDocError(null);
    setDocContent('');

    try {
      const response = await fetch(doc.publicUrl);
      if (!response.ok) {
        throw new Error(`Failed to load document: HTTP ${response.status}`);
      }
      const text = await response.text();
      setDocContent(text);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error reading document.';
      setDocError(`${msg} — You can view this file directly at '${doc.relativePath}' in the repository.`);
    } finally {
      setLoadingDoc(false);
    }
  };

  const handleCloseModal = () => {
    setActiveDoc(null);
    setDocContent('');
    setDocError(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeDoc) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDoc]);

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

              {/* Action buttons */}
              <div className="doc-actions-row">
                <button
                  type="button"
                  className="btn-doc-read"
                  onClick={() => handleOpenDoc(doc)}
                  aria-label={`Read ${doc.title} in modal`}
                >
                  <Eye size={13} />
                  <span>Read Report</span>
                </button>

                <a
                  href={doc.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-doc-link"
                  aria-label={`Open raw ${doc.title} in new tab`}
                  title="Open raw markdown file in browser tab"
                >
                  <ExternalLink size={13} />
                  <span>Raw File</span>
                </a>
              </div>

              <div className="doc-card-footer">
                <div className="doc-path-box">
                  <FileText size={13} className="text-secondary inline-icon" />
                  <code>{doc.relativePath}</code>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Document Modal Viewer */}
        {activeDoc && (
          <div
            className="doc-modal-backdrop"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-doc-title"
          >
            <div className="doc-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title-group">
                  <span className="badge badge-cyan">{activeDoc.category}</span>
                  <h3 id="modal-doc-title" className="modal-title">{activeDoc.title}</h3>
                  <div className="modal-meta">
                    <code>{activeDoc.relativePath}</code> • <span>{activeDoc.sizeOrSections}</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <a
                    href={activeDoc.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-raw-btn"
                  >
                    <ExternalLink size={14} />
                    <span>Open in Tab</span>
                  </a>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={handleCloseModal}
                    aria-label="Close document modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="modal-body">
                {loadingDoc && (
                  <div className="modal-loading-box">
                    <span className="modal-spinner" />
                    <span>Loading report contents from static assets...</span>
                  </div>
                )}

                {docError && (
                  <div className="modal-error-box">
                    <p className="modal-error-text">{docError}</p>
                    <div className="modal-error-cmd">
                      <Terminal size={14} />
                      <code>cat {activeDoc.relativePath}</code>
                    </div>
                  </div>
                )}

                {!loadingDoc && !docError && docContent && (
                  <pre className="modal-markdown-text">{docContent}</pre>
                )}
              </div>

              <div className="modal-footer">
                <span className="modal-footer-note">
                  Static artifact verified from repository source.
                </span>
                <button
                  type="button"
                  className="btn btn-secondary modal-btn-close-action"
                  onClick={handleCloseModal}
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}

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
          border-left: 3px solid var(--accent-cyan);
          transition: border-color var(--transition-fast), transform var(--transition-fast);
        }

        .doc-card:hover {
          border-left-color: var(--accent-green);
          transform: translateY(-2px);
        }

        [data-theme="orchid"] .doc-card {
          border-left-color: var(--accent-orange);
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

        .doc-actions-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .btn-doc-read {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .btn-doc-read:hover {
          background: var(--bg-surface-elevated);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        [data-theme="orchid"] .btn-doc-read:hover {
          border-color: var(--accent-orange);
          color: var(--accent-orange);
        }

        .btn-doc-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 6px 10px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 500;
          transition: all var(--transition-fast);
        }

        .btn-doc-link:hover {
          color: var(--text-primary);
          border-color: var(--border-hover);
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

        .inline-icon {
          flex-shrink: 0;
        }

        .doc-path-box code {
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Document Modal Styles */
        .doc-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(7, 10, 14, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .doc-modal-content {
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 920px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          gap: 16px;
        }

        .modal-title-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .modal-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .modal-meta {
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .modal-meta code {
          color: var(--accent-cyan);
        }

        .modal-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-raw-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .modal-raw-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-cyan);
        }

        .modal-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
          border-color: var(--status-fail);
          background: var(--status-fail-bg);
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          flex-grow: 1;
        }

        .modal-markdown-text {
          font-family: var(--font-mono);
          font-size: 12.5px;
          line-height: 1.6;
          color: var(--text-primary);
          white-space: pre-wrap;
          word-break: break-word;
          background: var(--bg-terminal);
          padding: 18px 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .modal-loading-box {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-secondary);
          font-size: 13.5px;
          padding: 40px 0;
          justify-content: center;
        }

        .modal-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-subtle);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .modal-error-box {
          background: var(--status-fail-bg);
          border: 1px solid var(--status-fail-border);
          padding: 18px;
          border-radius: var(--radius-md);
        }

        .modal-error-text {
          font-size: 13.5px;
          color: var(--status-fail);
          margin-bottom: 10px;
        }

        .modal-error-cmd {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-primary);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          border-top: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          font-size: 12px;
          color: var(--text-muted);
        }

        .modal-btn-close-action {
          padding: 6px 14px;
          font-size: 12px;
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
          display: inline-flex;
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
