import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal, FileText, ExternalLink, Eye, X } from 'lucide-react';
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

  // Handle URL hash or search param for auto-opening doc
  useEffect(() => {
    const checkUrlForDoc = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#doc-')) {
        const docId = hash.substring(1);
        const match = DOCUMENTATION_RESOURCES.find(d => d.id === docId);
        if (match) {
          handleOpenDoc(match);
        }
      }
    };
    checkUrlForDoc();
    window.addEventListener('hashchange', checkUrlForDoc);
    return () => window.removeEventListener('hashchange', checkUrlForDoc);
  }, []);

  return (
    <section id="documentation" className="section tomorrow-doc-section">
      <div id="docs" style={{ position: 'relative', top: '-100px' }} />
      <div className="container">
        {/* 4-Part Typographic Signature */}
        <div className="section-header">
          <span className="section-eyebrow">ACADEMIC REPORTS &amp; LIVE DEMONSTRATION // VIVA GUIDE</span>
          <div className="editorial-rule-38" />
          <h2 className="section-title">PROJECT REPORTS</h2>
          <p className="section-subtitle">
            All engineering decisions, architectural models, security controls, and verification evidence are documented in comprehensive academic markdown reports.
          </p>
        </div>

        {/* Documentation Resource Cards */}
        <div className="tomorrow-doc-grid">
          {DOCUMENTATION_RESOURCES.map((doc) => (
            <div key={doc.id} className="tomorrow-doc-card">
              <div className="doc-card-top-row">
                <span className="badge badge-pass">{doc.category}</span>
                <span className="doc-meta-badge">{doc.sizeOrSections}</span>
              </div>

              <h3 className="doc-title-heading">{doc.title}</h3>
              <p className="doc-desc-body">{doc.description}</p>

              {/* Action buttons */}
              <div className="doc-actions-wrap">
                <button
                  type="button"
                  className="btn-pill-editorial btn-accent doc-btn-sm"
                  onClick={() => handleOpenDoc(doc)}
                  aria-label={`Read ${doc.title} in modal`}
                >
                  <Eye size={13} />
                  <span>READ REPORT</span>
                  <span className="arrow-icon">→</span>
                </button>

                <a
                  href={doc.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-editorial doc-btn-sm"
                  aria-label={`Open raw ${doc.title} in new tab`}
                  title="Open raw markdown file in browser tab"
                >
                  <ExternalLink size={13} />
                  <span>RAW FILE</span>
                </a>
              </div>

              <div className="doc-card-footer-strip">
                <FileText size={13} color="var(--ink-secondary)" />
                <code>{doc.relativePath}</code>
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
                  <span className="badge badge-pass">{activeDoc.category}</span>
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
                    className="btn-pill-editorial doc-btn-sm"
                  >
                    <ExternalLink size={14} />
                    <span>OPEN TAB</span>
                  </a>
                  <button
                    type="button"
                    className="modal-close-btn"
                    onClick={handleCloseModal}
                    aria-label="Close document modal"
                  >
                    <X size={20} color="var(--ink-primary)" strokeWidth={1.5} />
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
                  className="btn-pill-editorial btn-accent modal-btn-close-action"
                  onClick={handleCloseModal}
                >
                  <span>CLOSE VIEWER</span>
                  <span className="arrow-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Viva Demonstration Guide */}
        <div className="tomorrow-demo-panel">
          <div className="demo-header-strip">
            <div className="demo-title-group">
              <div className="demo-eyebrow">
                <Terminal size={14} color="var(--accent-orange)" />
                <span>SAFE OPERATIONAL DEMO</span>
              </div>
              <h3 className="demo-title">Local Demonstration &amp; Viva Inspection Commands</h3>
            </div>
            <p className="demo-sub">
              Execute these safe commands inside Ubuntu 24.04 (WSL2) to verify system state live during examination.
            </p>
          </div>

          <div className="commands-list-wrap">
            {DEMO_COMMANDS.map((cmd) => {
              const isCopied = copiedId === cmd.id;

              return (
                <div key={cmd.id} className="command-card-item">
                  <div className="command-top-row">
                    <div className="cmd-meta-group">
                      <span className="badge badge-pass">{cmd.category}</span>
                      <span className="cmd-label-name">{cmd.label}</span>
                    </div>

                    <button
                      type="button"
                      className="cmd-copy-btn"
                      onClick={() => handleCopy(cmd.id, cmd.command)}
                      title="Copy command to clipboard"
                    >
                      {isCopied ? <Check size={12} /> : <Copy size={12} />}
                      <span>{isCopied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  <p className="cmd-desc">{cmd.description}</p>

                  <div className="cmd-code-box">
                    <Terminal size={14} className="cmd-term-icon" />
                    <code>{cmd.command}</code>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .tomorrow-doc-section {
          background: transparent;
        }

        .tomorrow-doc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 48px;
        }

        .tomorrow-doc-card {
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

        .tomorrow-doc-card:hover {
          border-color: var(--ink-primary);
          transform: translateY(-2px);
        }

        .doc-card-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .doc-meta-badge {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--ink-muted);
        }

        .doc-title-heading {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--ink-primary);
          margin-bottom: 10px;
          line-height: 1.35;
        }

        .doc-desc-body {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          color: var(--ink-secondary);
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
        }

        .doc-actions-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: auto;
          margin-bottom: 16px;
          width: 100%;
        }

        .doc-btn-sm {
          padding: 10px 12px;
          font-size: 0.68rem;
          gap: 6px;
          width: 100%;
          min-height: 38px;
          justify-content: center;
        }

        .doc-card-footer-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 14px;
          border-top: 1px solid var(--border-hairline);
        }

        .doc-card-footer-strip code {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--ink-muted);
        }

        /* Document Modal Styles */
        .doc-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(48, 1, 58, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }

        .doc-modal-content {
          background: linear-gradient(135deg, #E3ABDA 0%, #E0A8D7 100%);
          border: 1.5px solid var(--ink-primary);
          border-radius: 28px;
          width: 100%;
          max-width: 900px;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 64px rgba(48, 1, 58, 0.35);
          overflow: hidden;
          animation: popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1.5px solid var(--ink-primary);
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-title-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--ink-primary);
          margin: 0;
        }

        .modal-meta {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--ink-secondary);
        }

        .modal-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-close-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .modal-close-btn:hover {
          background: var(--ink-primary);
          border-color: var(--ink-primary);
        }

        .modal-close-btn:hover svg {
          stroke: #FFF;
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 28px;
        }

        .modal-loading-box {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--ink-secondary);
          padding: 40px;
          justify-content: center;
        }

        .modal-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid var(--ink-primary);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .modal-error-box {
          background: rgba(144, 12, 63, 0.15);
          border: 1px solid rgba(144, 12, 63, 0.4);
          border-radius: 16px;
          padding: 20px;
          color: #900C3F;
        }

        .modal-markdown-text {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          line-height: 1.65;
          color: var(--ink-on-accent);
          background: var(--bg-code);
          border: 1px solid var(--border-strong);
          border-radius: 18px;
          padding: 24px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          border-top: 1.5px solid var(--ink-primary);
          background: rgba(255, 255, 255, 0.2);
        }

        .modal-footer-note {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          color: var(--ink-secondary);
        }

        /* Demo Panel */
        .tomorrow-demo-panel {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 28px;
          padding: 32px;
          box-shadow: 0 8px 30px rgba(48, 1, 58, 0.06);
        }

        .demo-header-strip {
          margin-bottom: 24px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-hairline);
        }

        .demo-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-secondary);
          margin-bottom: 6px;
        }

        .demo-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--ink-primary);
          margin-bottom: 6px;
        }

        .demo-sub {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          color: var(--ink-secondary);
        }

        .commands-list-wrap {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 16px;
        }

        .command-card-item {
          background: rgba(255, 255, 255, 0.18);
          border: 1px solid var(--border-hairline);
          border-radius: 18px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: all 0.2s ease;
        }

        .command-card-item:hover {
          border-color: var(--ink-primary);
          background: rgba(255, 255, 255, 0.28);
        }

        .command-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cmd-meta-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cmd-label-name {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--ink-primary);
        }

        .cmd-copy-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.2);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--ink-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cmd-copy-btn:hover {
          background: var(--ink-primary);
          color: var(--ink-on-accent);
          border-color: var(--ink-primary);
        }

        .cmd-desc {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          color: var(--ink-secondary);
          line-height: 1.5;
        }

        .cmd-code-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-code);
          border: 1px solid var(--border-strong);
          border-radius: 12px;
          padding: 10px 14px;
        }

        .cmd-term-icon {
          color: var(--accent-orange-bright);
          flex-shrink: 0;
        }

        .cmd-code-box code {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-orange-bright);
          overflow-x: auto;
          white-space: nowrap;
        }

        @keyframes popIn {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};
