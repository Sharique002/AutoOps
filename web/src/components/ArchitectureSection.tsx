import React, { useState } from 'react';
import { Layers, Network, ShieldCheck, Box, Server, CheckCircle2 } from 'lucide-react';
import { ARCHITECTURE_COMPONENTS, RESOURCE_OWNERSHIP_MATRIX } from '../data/projectData';

export const ArchitectureSection: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>(ARCHITECTURE_COMPONENTS[0].id);

  const selectedComp = ARCHITECTURE_COMPONENTS.find((c) => c.id === selectedCompId) || ARCHITECTURE_COMPONENTS[0];

  return (
    <section id="architecture" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Layers size={14} />
            <span>SUBSYSTEM ARCHITECTURE &amp; BOUNDARIES</span>
          </div>
          <h2 className="section-title">Strict Resource Ownership &amp; Dual-Layer Infrastructure</h2>
          <p className="section-subtitle">
            AutoOps enforces explicit resource boundaries across orchestration, declarative infrastructure, host configuration management, and service monitoring to eliminate configuration drift.
          </p>
        </div>

        {/* Dual Network Architecture Callout */}
        <div className="network-topology-banner panel">
          <div className="network-col">
            <div className="network-tag">
              <Network size={14} className="text-cyan" />
              <span>COMPOSE APPLICATION RUNTIME</span>
            </div>
            <div className="network-name">autoops-network</div>
            <div className="network-spec">Bridge Driver • Compose-Managed (Default IPAM)</div>
            <div className="network-services">
              <span className="svc-chip">autoops-app (:5000)</span>
              <span className="svc-chip">autoops-nagios (:8080)</span>
            </div>
          </div>
          <div className="network-divider" />
          <div className="network-col">
            <div className="network-tag">
              <Box size={14} className="text-green" />
              <span>TERRAFORM AUXILIARY INFRASTRUCTURE</span>
            </div>
            <div className="network-name">autoops-infra-net</div>
            <div className="network-spec">Bridge Driver • Subnet: 172.29.0.0/16 (Isolated)</div>
            <div className="network-services">
              <span className="svc-chip">autoops-data-storage (Volume)</span>
              <span className="svc-chip">autoops-infra-sandbox (Aux Container)</span>
            </div>
          </div>
        </div>

        {/* Interactive Component Explorer */}
        <div className="arch-interactive-wrapper">
          <div className="arch-nav-tabs" role="tablist" aria-label="Architecture Subsystems">
            {ARCHITECTURE_COMPONENTS.map((comp) => {
              const isSelected = comp.id === selectedCompId;
              return (
                <button
                  key={comp.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`arch-nav-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedCompId(comp.id)}
                >
                  <span className="arch-btn-tool">{comp.tool.split(' ')[0]}</span>
                  <span className="arch-btn-name">{comp.name}</span>
                </button>
              );
            })}
          </div>

          {/* Component Details Card */}
          <div className="arch-detail-card panel" role="tabpanel">
            <div className="detail-header">
              <div className="detail-title-group">
                <span className="badge badge-cyan">{selectedComp.ownership}</span>
                <h3 className="detail-title">{selectedComp.name}</h3>
                <span className="detail-tool-tag">{selectedComp.tool}</span>
              </div>
            </div>

            <p className="detail-description">{selectedComp.description}</p>

            <div className="detail-specs-grid">
              <div className="spec-item">
                <span className="spec-label">Managed Resources</span>
                <div className="spec-pill-list">
                  {selectedComp.resources.map((res, i) => (
                    <span key={i} className="spec-pill">
                      <CheckCircle2 size={12} className="text-green" />
                      <code>{res}</code>
                    </span>
                  ))}
                </div>
              </div>

              {selectedComp.network && (
                <div className="spec-item">
                  <span className="spec-label">Network Topology</span>
                  <div className="spec-value-box">
                    <Network size={14} className="text-cyan" />
                    <code>{selectedComp.network}</code>
                  </div>
                </div>
              )}

              {selectedComp.ports && (
                <div className="spec-item">
                  <span className="spec-label">Host Port Binding</span>
                  <div className="spec-value-box">
                    <Server size={14} className="text-green" />
                    <code>{selectedComp.ports}</code>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resource Ownership Matrix Table */}
        <div className="ownership-matrix-wrapper">
          <div className="matrix-title-row">
            <ShieldCheck size={16} className="text-green" />
            <h3 className="matrix-title">Formal Resource Ownership Matrix</h3>
          </div>
          <div className="table-responsive">
            <table className="ownership-table">
              <thead>
                <tr>
                  <th>Subsystem</th>
                  <th>Authoritative Tool</th>
                  <th>Managed Resources</th>
                  <th>Boundary Scope</th>
                  <th>Non-Interference Rule</th>
                </tr>
              </thead>
              <tbody>
                {RESOURCE_OWNERSHIP_MATRIX.map((row, idx) => (
                  <tr key={idx}>
                    <td className="font-semibold text-primary">{row.subsystem}</td>
                    <td>
                      <span className="tool-chip">{row.tool}</span>
                    </td>
                    <td>
                      <ul className="resource-list">
                        {row.managedResources.map((res, rIdx) => (
                          <li key={rIdx}>
                            <code>{res}</code>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="text-secondary font-mono-sm">{row.boundaryScope}</td>
                    <td className="text-secondary text-sm">{row.nonInterferenceRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .network-topology-banner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: var(--space-6);
          align-items: center;
          margin-bottom: var(--space-8);
          background: var(--bg-surface);
        }

        .network-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .network-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .network-name {
          font-family: var(--font-mono);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .network-spec {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .network-services {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .svc-chip {
          font-family: var(--font-mono);
          font-size: 11.5px;
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          padding: 3px 8px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
        }

        .network-divider {
          width: 1px;
          height: 100%;
          min-height: 80px;
          background: var(--border-subtle);
        }

        .arch-interactive-wrapper {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: var(--space-6);
          margin-bottom: var(--space-10);
        }

        .arch-nav-tabs {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .arch-nav-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 12px 14px;
          border-radius: var(--radius-md);
          background: var(--bg-panel);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-fast);
        }

        .arch-nav-btn:hover {
          border-color: var(--border-hover);
          background: var(--bg-surface);
        }

        .arch-nav-btn.active {
          border-color: var(--accent-orange);
          background: var(--bg-surface-elevated);
          box-shadow: 0 0 16px var(--accent-orange-glow);
        }

        .arch-btn-tool {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          color: var(--accent-orange);
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .arch-btn-name {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .arch-detail-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
        }

        .detail-title-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 14px;
        }

        .detail-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .detail-tool-tag {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-secondary);
        }

        .detail-description {
          font-size: 14.5px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .detail-specs-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .spec-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .spec-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .spec-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 12px;
        }

        .spec-value-box {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-sm);
          font-size: 12.5px;
          align-self: flex-start;
        }

        .ownership-matrix-wrapper {
          margin-top: var(--space-8);
        }

        .matrix-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: var(--space-4);
        }

        .matrix-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .table-responsive {
          overflow-x: auto;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          background: var(--bg-panel);
        }

        .ownership-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13.5px;
        }

        .ownership-table th {
          background: var(--bg-surface);
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .ownership-table td {
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          vertical-align: top;
        }

        .ownership-table tr:last-child td {
          border-bottom: none;
        }

        .tool-chip {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          color: var(--accent-cyan);
          background: var(--accent-cyan-bg);
          border: 1px solid rgba(56, 207, 240, 0.2);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
        }

        .resource-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .font-semibold { font-weight: 600; }
        .text-primary { color: var(--text-primary); }
        .text-secondary { color: var(--text-secondary); }
        .text-sm { font-size: 12.5px; }
        .font-mono-sm { font-family: var(--font-mono); font-size: 12px; }
        .text-green { color: var(--accent-green); }
        .text-cyan { color: var(--accent-cyan); }

        @media (max-width: 900px) {
          .network-topology-banner {
            grid-template-columns: 1fr;
          }
          .network-divider {
            display: none;
          }
          .arch-interactive-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};
