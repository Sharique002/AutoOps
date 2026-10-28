import React from 'react';

export const ArchitectureSvg: React.FC = () => {
  return (
    <div className="arch-svg-container" aria-label="AutoOps Subsystem Architecture Schematic">
      <svg
        viewBox="0 0 540 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="arch-svg"
      >
        {/* Background Grid Pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#17222E" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38CFF0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#259AB3" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#35E58C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E824C" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <rect width="540" height="400" rx="10" fill="#0E141B" stroke="#263442" strokeWidth="1" />
        <rect width="540" height="400" fill="url(#grid)" opacity="0.6" />

        {/* TOP ROW: Git Workspace & CI Quality Gate */}
        <g transform="translate(24, 20)">
          {/* Dev / Git Node */}
          <rect width="220" height="64" rx="6" fill="#131B24" stroke="#263442" strokeWidth="1" />
          <circle cx="20" cy="24" r="5" fill="#38CFF0" />
          <text x="34" y="27" fill="#E8EEF5" fontSize="12" fontWeight="600" fontFamily="monospace">Git Repository</text>
          <text x="34" y="44" fill="#91A0B2" fontSize="10.5" fontFamily="monospace">branch: main @ da23d13</text>
          <rect x="156" y="16" width="52" height="18" rx="3" fill="#1A2836" stroke="#38CFF0" strokeWidth="0.75" />
          <text x="182" y="28" fill="#38CFF0" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">LOCAL</text>

          {/* GitHub Actions CI Node */}
          <rect x="256" y="0" width="236" height="64" rx="6" fill="#131B24" stroke="#35E58C" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="276" cy="24" r="5" fill="#35E58C" />
          <text x="290" y="27" fill="#E8EEF5" fontSize="12" fontWeight="600" fontFamily="monospace">GitHub Actions CI</text>
          <text x="290" y="44" fill="#91A0B2" fontSize="10.5" fontFamily="monospace">7 Quality Gates • ci.yml</text>
          <rect x="424" y="16" width="56" height="18" rx="3" fill="#142B20" stroke="#35E58C" strokeWidth="0.75" />
          <text x="452" y="28" fill="#35E58C" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="monospace">PASS</text>

          {/* Connector line Git -> CI */}
          <path d="M 220 32 L 256 32" stroke="#38CFF0" strokeWidth="1.5" strokeDasharray="2 2" />
          <polygon points="254,29 259,32 254,35" fill="#38CFF0" />
        </g>

        {/* MAIN RUNTIME BOUNDARY: Docker Compose (autoops-network) */}
        <g transform="translate(24, 102)">
          <rect width="492" height="162" rx="8" fill="#111822" stroke="#2A3C4D" strokeWidth="1.2" />
          
          {/* Boundary Tag */}
          <rect x="14" y="-10" width="220" height="20" rx="4" fill="#172330" stroke="#38CFF0" strokeWidth="0.8" />
          <text x="22" y="4" fill="#38CFF0" fontSize="10" fontWeight="600" fontFamily="monospace">
            Docker Compose • autoops-network (172.28.0.0/16)
          </text>

          {/* Container 1: autoops-app */}
          <g transform="translate(16, 24)">
            <rect width="216" height="120" rx="6" fill="#16222F" stroke="#35E58C" strokeWidth="1.2" />
            <circle cx="18" cy="22" r="5" fill="#35E58C" />
            <text x="32" y="25" fill="#E8EEF5" fontSize="12" fontWeight="700" fontFamily="monospace">autoops-app</text>
            <text x="32" y="42" fill="#35E58C" fontSize="10" fontFamily="monospace">{'0.0.0.0:5000 -> 5000'}</text>
            
            {/* Specs */}
            <line x1="16" y1="52" x2="200" y2="52" stroke="#253545" strokeWidth="1" />
            <text x="18" y="68" fill="#91A0B2" fontSize="9.5" fontFamily="monospace">• User: appuser (UID 10001)</text>
            <text x="18" y="82" fill="#91A0B2" fontSize="9.5" fontFamily="monospace">• Root FS: read_only: true</text>
            <text x="18" y="96" fill="#91A0B2" fontSize="9.5" fontFamily="monospace">• Linux cap_drop: [ALL]</text>
            <text x="18" y="110" fill="#91A0B2" fontSize="9.5" fontFamily="monospace">• Tmpfs: /tmp (64M, noexec)</text>
          </g>

          {/* Active Probe Flow: Nagios -> App */}
          <g transform="translate(232, 70)">
            <path d="M 28 14 L 0 14" stroke="#35E58C" strokeWidth="1.5" strokeDasharray="3 3" />
            <polygon points="4,11 0,14 4,17" fill="#35E58C" />
            <text x="14" y="6" fill="#35E58C" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="monospace">PROBE</text>
            <text x="14" y="28" fill="#91A0B2" fontSize="7.5" textAnchor="middle" fontFamily="monospace">/health</text>
          </g>

          {/* Container 2: autoops-nagios */}
          <g transform="translate(260, 24)">
            <rect width="216" height="120" rx="6" fill="#16222F" stroke="#38CFF0" strokeWidth="1.2" />
            <circle cx="18" cy="22" r="5" fill="#38CFF0" />
            <text x="32" y="25" fill="#E8EEF5" fontSize="12" fontWeight="700" fontFamily="monospace">autoops-nagios</text>
            <text x="32" y="42" fill="#38CFF0" fontSize="10" fontFamily="monospace">{'127.0.0.1:8080 -> 80'}</text>
            
            {/* Specs */}
            <line x1="16" y1="52" x2="200" y2="52" stroke="#253545" strokeWidth="1" />
            <text x="18" y="68" fill="#91A0B2" fontSize="9.5" fontFamily="monospace">• Service: HTTP-Health (60s)</text>
            <text x="18" y="82" fill="#91A0B2" fontSize="9.5" fontFamily="monospace">• Service: HTTP-Root (60s)</text>
            <text x="18" y="96" fill="#91A0B2" fontSize="9.5" fontFamily="monospace">• Service: TCP-Port-5000</text>
            <text x="18" y="110" fill="#91A0B2" fontSize="9.5" fontFamily="monospace">• Self-Healing Cycle Verified</text>
          </g>
        </g>

        {/* BOTTOM ROW: Terraform & Configuration Management */}
        <g transform="translate(24, 282)">
          {/* Terraform Auxiliary Node */}
          <rect width="180" height="96" rx="6" fill="#131B24" stroke="#263442" strokeWidth="1" />
          <circle cx="16" cy="18" r="4" fill="#8873FF" />
          <text x="26" y="21" fill="#E8EEF5" fontSize="11" fontWeight="600" fontFamily="monospace">Terraform Auxiliary</text>
          <text x="16" y="38" fill="#91A0B2" fontSize="9" fontFamily="monospace">Net: autoops-infra-net</text>
          <text x="16" y="52" fill="#91A0B2" fontSize="9" fontFamily="monospace">Subnet: 172.29.0.0/16</text>
          <text x="16" y="66" fill="#91A0B2" fontSize="9" fontFamily="monospace">Vol: autoops-data-storage</text>
          <text x="16" y="80" fill="#35E58C" fontSize="9" fontFamily="monospace">Status: 0 Drift (Verified)</text>

          {/* Puppet Host Policy */}
          <g transform="translate(196, 0)">
            <rect width="144" height="96" rx="6" fill="#131B24" stroke="#263442" strokeWidth="1" />
            <circle cx="16" cy="18" r="4" fill="#FFB84D" />
            <text x="26" y="21" fill="#E8EEF5" fontSize="11" fontWeight="600" fontFamily="monospace">Puppet Policy</text>
            <text x="16" y="38" fill="#91A0B2" fontSize="9" fontFamily="monospace">Host Config: /etc/autoops</text>
            <text x="16" y="52" fill="#91A0B2" fontSize="9" fontFamily="monospace">autoops_policy.conf</text>
            <text x="16" y="66" fill="#91A0B2" fontSize="9" fontFamily="monospace">Permissions: 0644</text>
            <text x="16" y="80" fill="#35E58C" fontSize="9" fontFamily="monospace">Catalog: Idempotent</text>
          </g>

          {/* Ansible Orchestration */}
          <g transform="translate(356, 0)">
            <rect width="136" height="96" rx="6" fill="#131B24" stroke="#263442" strokeWidth="1" />
            <circle cx="16" cy="18" r="4" fill="#FF5A65" />
            <text x="26" y="21" fill="#E8EEF5" fontSize="11" fontWeight="600" fontFamily="monospace">Ansible Core</text>
            <text x="16" y="38" fill="#91A0B2" fontSize="9" fontFamily="monospace">01: Preflight check</text>
            <text x="16" y="52" fill="#91A0B2" fontSize="9" fontFamily="monospace">02: Deploy containers</text>
            <text x="16" y="66" fill="#91A0B2" fontSize="9" fontFamily="monospace">03: Smoke test assert</text>
            <text x="16" y="80" fill="#35E58C" fontSize="9" fontFamily="monospace">04: Verify all passes</text>
          </g>
        </g>
      </svg>

      <style>{`
        .arch-svg-container {
          width: 100%;
          max-width: 580px;
          margin: 0 auto;
        }

        .arch-svg {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4));
        }
      `}</style>
    </div>
  );
};
