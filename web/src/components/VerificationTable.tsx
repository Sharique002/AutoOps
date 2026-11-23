import React, { useState } from 'react';
import { Filter, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { VERIFICATION_TESTS } from '../data/projectData';
import { TestStatus } from '../types';

export const VerificationTable: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | TestStatus>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [copiedCmdId, setCopiedCmdId] = useState<string | null>(null);

  const categories = ['ALL', 'Application', 'Infrastructure', 'Configuration', 'Observability', 'CI / Workflow', 'Security'];

  const handleCopyCmd = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopiedCmdId(id);
      setTimeout(() => setCopiedCmdId(null), 2000);
    });
  };

  const filteredTests = VERIFICATION_TESTS.filter((t) => {
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const passCount = VERIFICATION_TESTS.filter((t) => t.status === 'PASS').length;
  const notRunCount = VERIFICATION_TESTS.filter((t) => t.status === 'NOT RUN').length;

  return (
    <section id="verification" className="section tomorrow-qa-section">
      <div className="container">
        {/* 4-Part Typographic Signature */}
        <div className="section-header">
          <span className="section-eyebrow">QUALITY ASSURANCE &amp; EVIDENCE MATRIX // 16 DETERMINISTIC CHECKS</span>
          <div className="editorial-rule-38" />
          <h2 className="section-title">ACCEPTANCE MATRIX</h2>
          <p className="section-subtitle">
            Deterministic evaluation across all DevOps layers. Remote GitHub Actions is transparently documented as not run.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="tomorrow-controls-bar">
          <div className="status-filter-pills">
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => setStatusFilter('ALL')}
            >
              All Tests ({VERIFICATION_TESTS.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'PASS' ? 'active' : ''}`}
              onClick={() => setStatusFilter('PASS')}
            >
              <CheckCircle2 size={13} color={statusFilter === 'PASS' ? '#FFF' : 'var(--accent-orange)'} />
              <span>PASS ({passCount})</span>
            </button>
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'NOT RUN' ? 'active' : ''}`}
              onClick={() => setStatusFilter('NOT RUN')}
            >
              <AlertCircle size={13} color={statusFilter === 'NOT RUN' ? '#FFF' : 'var(--ink-secondary)'} />
              <span>NOT RUN ({notRunCount})</span>
            </button>
          </div>

          <div className="category-select-wrapper">
            <Filter size={14} color="var(--ink-secondary)" />
            <select
              className="tomorrow-cat-select cat-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'ALL' ? 'All Subsystems' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="tomorrow-table-card">
          <div className="table-responsive">
            <table className="tomorrow-qa-table">
              <thead>
                <tr>
                  <th>CATEGORY</th>
                  <th>ACCEPTANCE CRITERION</th>
                  <th>VERIFICATION COMMAND</th>
                  <th>TARGET RESOURCE</th>
                  <th>STATUS</th>
                  <th>EVIDENCE REFERENCE</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((test) => (
                  <tr key={test.id}>
                    <td>
                      <span className="qa-cat-chip">{test.category}</span>
                    </td>
                    <td>
                      <div className="qa-name">{test.name}</div>
                      <div className="qa-notes">{test.notes}</div>
                    </td>
                    <td>
                      <div className="qa-command-wrapper">
                        <code className="qa-command-code">{test.command}</code>
                        <button
                          type="button"
                          className="qa-copy-cmd-btn"
                          onClick={() => handleCopyCmd(test.id, test.command)}
                          title="Copy test command"
                          aria-label="Copy command"
                        >
                          {copiedCmdId === test.id ? (
                            <Check size={11} color="var(--accent-orange)" />
                          ) : (
                            <Copy size={11} />
                          )}
                        </button>
                      </div>
                    </td>
                    <td>
                      <span className="qa-target">{test.target}</span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          test.status === 'PASS' ? 'badge-pass' : 'badge-notrun'
                        }`}
                      >
                        {test.status}
                      </span>
                    </td>
                    <td>
                      <code className="qa-ev-ref">{test.evidenceRef}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .tomorrow-qa-section {
          background: transparent;
        }

        .tomorrow-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 20px;
          padding: 16px 24px;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .status-filter-pills {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.15);
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-primary);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .filter-btn:hover {
          border-color: var(--ink-primary);
          background: rgba(255, 255, 255, 0.3);
        }

        .filter-btn.active {
          background: var(--accent-orange);
          color: #FFFFFF;
          border-color: var(--accent-orange);
          box-shadow: 0 4px 16px var(--accent-orange-glow);
        }

        .category-select-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.18);
        }

        .category-select-wrapper select.tomorrow-cat-select,
        .category-select-wrapper select.cat-select,
        select.tomorrow-cat-select {
          background: transparent;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink-primary);
          cursor: pointer;
          outline: none;
        }

        .category-select-wrapper select option {
          background: #E3ABDA;
          color: #30013A;
        }

        .qa-command-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          max-width: 100%;
        }

        .qa-copy-cmd-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 3px 5px;
          border-radius: 4px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.25);
          color: var(--ink-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .qa-copy-cmd-btn:hover {
          border-color: var(--ink-primary);
          color: var(--ink-primary);
          background: rgba(255, 255, 255, 0.45);
        }

        /* Table Card */
        .tomorrow-table-card {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 8px 30px rgba(48, 1, 58, 0.06);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .tomorrow-qa-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-sans);
          font-size: 0.8rem;
        }

        .tomorrow-qa-table th {
          text-align: left;
          padding: 12px 14px;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-muted);
          border-bottom: 1.5px solid var(--ink-primary);
        }

        .tomorrow-qa-table td {
          padding: 16px 14px;
          border-bottom: 1px solid var(--border-hairline);
          vertical-align: top;
        }

        .qa-cat-chip {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(48, 1, 58, 0.08);
          color: var(--ink-secondary);
        }

        .qa-name {
          font-weight: 700;
          color: var(--ink-primary);
          margin-bottom: 4px;
          line-height: 1.35;
        }

        .qa-notes {
          font-size: 0.72rem;
          color: var(--ink-muted);
          line-height: 1.4;
        }

        .qa-command-code {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-orange-bright);
          background: var(--bg-code);
          padding: 4px 8px;
          border-radius: 6px;
          display: inline-block;
          max-width: 260px;
          overflow-x: auto;
        }

        .qa-target {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--ink-primary);
        }

        .qa-ev-ref {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--ink-muted);
        }
      `}</style>
    </section>
  );
};
