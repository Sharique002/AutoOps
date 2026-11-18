import React, { useState } from 'react';
import { Network, Box, CheckCircle2 } from 'lucide-react';
import { ARCHITECTURE_COMPONENTS, RESOURCE_OWNERSHIP_MATRIX } from '../data/projectData';

export const ArchitectureSection: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>(ARCHITECTURE_COMPONENTS[0].id);

  const selectedComp = ARCHITECTURE_COMPONENTS.find((c) => c.id === selectedCompId) || ARCHITECTURE_COMPONENTS[0];

  return (
    <section id="architecture" className="section tomorrow-arch-section">
      <div className="container">
        {/* 4-Part Typographic Signature */}
        <div className="section-header">
          <span className="section-eyebrow">SUBSYSTEM ARCHITECTURE &amp; BOUNDARIES // DUAL TOPOLOGY</span>
          <div className="editorial-rule-38" />
          <h2 className="section-title">RESOURCE TOPOLOGY</h2>
          <p className="section-subtitle">
            STRICT RESOURCE BOUNDARIES PARTITION RUNTIME DOCKER COMPOSE ORCHESTRATION FROM ISOLATED TERRAFORM INFRASTRUCTURE AND HOST CONFIGURATION.
          </p>
        </div>

        {/* Dual Network Architecture Callout */}
        <div className="network-topology-banner">
          <div className="network-col">
            <div className="network-tag">
              <Network size={14} color="var(--accent-orange)" />
              <span>COMPOSE APPLICATION RUNTIME</span>
            </div>
            <div className="network-name">autoops-network</div>
            <div className="network-spec">Bridge Driver • Compose-Managed (Default IPAM)</div>
            <div className="network-services">
              <span className="svc-chip">autoops-app (:5000)</span>
              <span className="svc-chip">autoops-nagios (:8080)</span>
            </div>
          </div>

          <div className="network-divider-bar" />

          <div className="network-col">
            <div className="network-tag">
              <Box size={14} color="var(--accent-orange)" />
              <span>TERRAFORM AUXILIARY INFRASTRUCTURE</span>
            </div>
            <div className="network-name">autoops-infra-net</div>
            <div className="network-spec">Bridge Driver • Subnet: 172.29.0.0/16 (Isolated)</div>
            <div className="network-services">
              <span className="svc-chip">autoops-data-storage (Volume)</span>
              <span className="svc-chip">autoops-infra-sandbox (Validator)</span>
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
          <div className="arch-detail-card" role="tabpanel">
            <div className="detail-header">
              <div className="detail-title-group">
                <span className="badge badge-pass">{selectedComp.ownership}</span>
                <h3 className="detail-title">{selectedComp.name}</h3>
                <span className="detail-tool-tag">{selectedComp.tool}</span>
              </div>
            </div>

            <p className="detail-description">{selectedComp.description}</p>

            <div className="detail-specs-grid">
              <div className="spec-item">
                <span className="spec-label">MANAGED RESOURCES</span>
                <div className="spec-pill-list">
                  {selectedComp.resources.map((res, i) => (
                    <span key={i} className="spec-pill">
                      <CheckCircle2 size={12} color="var(--accent-orange)" />
                      <code>{res}</code>
                    </span>
                  ))}
                </div>
              </div>

              {selectedComp.network && (
                <div className="spec-item">
                  <span className="spec-label">NETWORK BINDING</span>
                  <code className="spec-code-highlight">{selectedComp.network}</code>
                </div>
              )}

              {selectedComp.ports && (
                <div className="spec-item">
                  <span className="spec-label">EXPOSED PORTS</span>
                  <code className="spec-code-highlight">{selectedComp.ports}</code>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resource Ownership Matrix Table */}
        <div className="matrix-wrapper">
          <div className="matrix-header-strip">
            <span className="matrix-title">RESOURCE OWNERSHIP MATRIX</span>
            <span className="matrix-sub">DETERMINISTIC LIFECYCLE MANAGEMENT</span>
          </div>

          <div className="matrix-table-scroll">
            <table className="tomorrow-table">
              <thead>
                <tr>
                  <th>SUBSYSTEM</th>
                  <th>AUTHORITATIVE TOOL</th>
                  <th>MANAGED RESOURCES</th>
                  <th>BOUNDARY SCOPE</th>
                  <th>NON-INTERFERENCE RULE</th>
                </tr>
              </thead>
              <tbody>
                {RESOURCE_OWNERSHIP_MATRIX.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="matrix-type-badge">{row.subsystem}</span>
                    </td>
                    <td>
                      <span className="matrix-tool-name">{row.tool}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {row.managedResources.map((res, rIdx) => (
                          <code key={rIdx} className="matrix-res-code">{res}</code>
                        ))}
                      </div>
                    </td>
                    <td>
                      <code className="matrix-file-code">{row.boundaryScope}</code>
                    </td>
                    <td className="matrix-purpose-cell">{row.nonInterferenceRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .tomorrow-arch-section {
          background: transparent;
        }

        /* Dual Network Topology Banner */
        .network-topology-banner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 24px;
          align-items: center;
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 28px;
          margin-bottom: 36px;
        }

        .network-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .network-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-secondary);
        }

        .network-name {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--ink-primary);
        }

        .network-spec {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--ink-muted);
        }

        .network-services {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
        }

        .svc-chip {
          padding: 3px 10px;
          border-radius: 9999px;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          background: rgba(48, 1, 58, 0.08);
          border: 1px solid var(--border-hairline);
          color: var(--ink-primary);
        }

        .network-divider-bar {
          width: 1px;
          height: 60px;
          background: var(--border-hairline);
        }

        /* Interactive Explorer */
        .arch-interactive-wrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .arch-nav-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .arch-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.15);
          color: var(--ink-primary);
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .arch-nav-btn:hover {
          border-color: var(--ink-primary);
          background: rgba(255, 255, 255, 0.3);
        }

        .arch-nav-btn.active {
          background: var(--accent-orange);
          color: #FFFFFF;
          border-color: var(--accent-orange);
          box-shadow: 0 4px 16px var(--accent-orange-glow);
        }

        .arch-nav-btn.active .arch-btn-tool {
          color: #FFF;
          opacity: 0.9;
        }

        .arch-btn-tool {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--accent-orange-deep);
          font-weight: 700;
        }

        .arch-detail-card {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 8px 28px rgba(48, 1, 58, 0.06);
        }

        .detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .detail-title-group {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .detail-title {
          font-family: var(--font-display);
          font-size: 1.7rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--ink-primary);
          margin: 0;
        }

        .detail-tool-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          padding: 2px 8px;
          border-radius: 6px;
          background: rgba(48, 1, 58, 0.08);
          color: var(--ink-secondary);
        }

        .detail-description {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--ink-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .detail-specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-hairline);
        }

        .spec-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .spec-label {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ink-muted);
        }

        .spec-pill-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .spec-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--ink-primary);
        }

        .spec-code-highlight {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          padding: 6px 12px;
          border-radius: 8px;
          background: var(--bg-code);
          color: var(--accent-orange-bright);
          display: inline-block;
          max-width: fit-content;
        }

        /* Matrix Table */
        .matrix-wrapper {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 8px 28px rgba(48, 1, 58, 0.06);
        }

        .matrix-header-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-hairline);
        }

        .matrix-title {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ink-primary);
        }

        .matrix-sub {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--ink-muted);
          letter-spacing: 0.12em;
        }

        .matrix-table-scroll {
          overflow-x: auto;
        }

        .tomorrow-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-sans);
          font-size: 0.8rem;
        }

        .tomorrow-table th {
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

        .tomorrow-table td {
          padding: 14px;
          border-bottom: 1px solid var(--border-hairline);
          color: var(--ink-primary);
        }

        .matrix-res-code {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--ink-primary);
        }

        .matrix-type-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 9999px;
          font-size: 0.68rem;
          font-weight: 600;
          background: rgba(48, 1, 58, 0.08);
          color: var(--ink-secondary);
        }

        .matrix-tool-name {
          font-weight: 700;
          color: var(--ink-primary);
        }

        .matrix-file-code {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-orange-deep);
        }

        .matrix-purpose-cell {
          font-size: 0.75rem;
          color: var(--ink-secondary);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .network-topology-banner {
            grid-template-columns: 1fr;
          }
          .network-divider-bar {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
