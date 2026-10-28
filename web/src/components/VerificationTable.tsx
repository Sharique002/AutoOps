import React, { useState } from 'react';
import { CheckSquare, Filter, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { VERIFICATION_TESTS } from '../data/projectData';
import { TestStatus } from '../types';

export const VerificationTable: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | TestStatus>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const categories = ['ALL', 'Application', 'Infrastructure', 'Configuration', 'Observability', 'CI / Workflow', 'Security'];

  const filteredTests = VERIFICATION_TESTS.filter((t) => {
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const passCount = VERIFICATION_TESTS.filter((t) => t.status === 'PASS').length;
  const notRunCount = VERIFICATION_TESTS.filter((t) => t.status === 'NOT RUN').length;

  return (
    <section id="verification" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <CheckSquare size={14} />
            <span>QUALITY ASSURANCE &amp; EVIDENCE MATRIX</span>
          </div>
          <h2 className="section-title">Verified Acceptance Test Suite</h2>
          <p className="section-subtitle">
            Every layer of the AutoOps platform is evaluated against deterministic acceptance criteria. Remote GitHub Actions is explicitly classified as NOT RUN due to no upstream origin configured.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="table-controls-bar panel">
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
              <CheckCircle2 size={13} className="text-green" />
              <span>PASS ({passCount})</span>
            </button>
            <button
              type="button"
              className={`filter-btn ${statusFilter === 'NOT RUN' ? 'active' : ''}`}
              onClick={() => setStatusFilter('NOT RUN')}
            >
              <AlertCircle size={13} className="text-muted" />
              <span>NOT RUN ({notRunCount})</span>
            </button>
          </div>

          <div className="category-select-wrapper">
            <Filter size={14} className="text-secondary" />
            <select
              className="cat-select"
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
        <div className="table-wrapper panel">
          <div className="table-responsive">
            <table className="qa-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Acceptance Criterion</th>
                  <th>Verification Command</th>
                  <th>Target Resource</th>
                  <th>Status</th>
                  <th>Evidence Reference</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((test) => (
                  <tr key={test.id}>
                    <td>
                      <span className="cat-chip">{test.category}</span>
                    </td>
                    <td>
                      <div className="test-name-cell">
                        <span className="test-name">{test.name}</span>
                        <span className="test-notes">{test.notes}</span>
                      </div>
                    </td>
                    <td>
                      <div className="test-cmd-box">
                        <Terminal size={12} className="cmd-icon" />
                        <code>{test.command}</code>
                      </div>
                    </td>
                    <td className="test-target font-mono">{test.target}</td>
                    <td>
                      <span
                        className={`badge ${
                          test.status === 'PASS'
                            ? 'badge-pass'
                            : test.status === 'NOT RUN'
                            ? 'badge-notrun'
                            : 'badge-fail'
                        }`}
                      >
                        {test.status}
                      </span>
                    </td>
                    <td className="evidence-ref-cell">
                      <code>{test.evidenceRef}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .table-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
          gap: 12px;
          background: var(--bg-surface);
        }

        .status-filter-pills {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          border-color: var(--border-hover);
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: var(--bg-surface-elevated);
          border-color: var(--accent-cyan);
          color: var(--text-primary);
        }

        .category-select-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cat-select {
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 12px;
          outline: none;
          cursor: pointer;
        }

        .cat-select:focus {
          border-color: var(--accent-cyan);
        }

        .table-wrapper {
          padding: 0;
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .qa-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13px;
        }

        .qa-table th {
          background: var(--bg-surface);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-subtle);
          white-space: nowrap;
        }

        .qa-table td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          vertical-align: top;
        }

        .qa-table tr:last-child td {
          border-bottom: none;
        }

        .cat-chip {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--accent-cyan);
          background: rgba(56, 207, 240, 0.08);
          border: 1px solid rgba(56, 207, 240, 0.2);
          padding: 2px 7px;
          border-radius: var(--radius-sm);
          white-space: nowrap;
        }

        .test-name-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 220px;
        }

        .test-name {
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .test-notes {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .test-cmd-box {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-terminal);
          border: 1px solid var(--border-subtle);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 11.5px;
          color: var(--text-primary);
          max-width: 280px;
          overflow-x: auto;
          white-space: nowrap;
        }

        .cmd-icon {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .test-target {
          font-size: 12px;
          color: var(--text-secondary);
          max-width: 160px;
          word-break: break-all;
        }

        .evidence-ref-cell code {
          font-size: 11px;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .text-green { color: var(--accent-green); }
        .text-muted { color: var(--text-muted); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
};
