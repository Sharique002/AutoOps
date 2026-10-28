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
          <pattern id="archGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(231, 176, 222, 0.08)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5A0A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D44600" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="orchidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E7B0DE" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C790BD" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Deep Eggplant Violet Canvas */}
        <rect width="540" height="400" rx="14" fill="#400849" stroke="rgba(64, 8, 73, 0.4)" strokeWidth="2" />
        <rect width="540" height="400" rx="14" fill="url(#archGrid)" opacity="0.8" />

        {/* TOP ROW: Git Workspace & CI Quality Gate */}
        <g transform="translate(24, 20)">
          {/* Dev / Git Node */}
          <rect width="220" height="64" rx="8" fill="#520E5D" stroke="#E7B0DE" strokeWidth="1.2" />
          <circle cx="20" cy="24" r="5" fill="#FF5A0A" />
          <text x="34" y="27" fill="#FAF0F8" fontSize="12" fontWeight="700" fontFamily="monospace">Git Repository</text>
          <text x="34" y="44" fill="#E7B0DE" fontSize="10.5" fontFamily="monospace">branch: main @ da23d13</text>
          <rect x="156" y="16" width="52" height="18" rx="4" fill="#400849" stroke="#FF5A0A" strokeWidth="1" />
          <text x="182" y="28" fill="#FF5A0A" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="monospace">LOCAL</text>

          {/* GitHub Actions CI Node */}
          <rect x="256" y="0" width="236" height="64" rx="8" fill="#520E5D" stroke="#FF5A0A" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="276" cy="24" r="5" fill="#FF5A0A" />
          <text x="290" y="27" fill="#FAF0F8" fontSize="12" fontWeight="700" fontFamily="monospace">GitHub Actions CI</text>
          <text x="290" y="44" fill="#E7B0DE" fontSize="10.5" fontFamily="monospace">7 Quality Gates • ci.yml</text>
          <rect x="424" y="16" width="56" height="18" rx="4" fill="#FF5A0A" />
          <text x="452" y="28" fill="#FFFFFF" fontSize="9" fontWeight="800" textAnchor="middle" fontFamily="monospace">PASS</text>

          {/* Connector line Git -> CI */}
          <path d="M 220 32 L 256 32" stroke="#FF5A0A" strokeWidth="1.5" strokeDasharray="2 2" />
          <polygon points="254,29 259,32 254,35" fill="#FF5A0A" />
        </g>

        {/* MAIN RUNTIME BOUNDARY: Docker Compose (autoops-network) */}
        <g transform="translate(24, 102)">
          <rect width="492" height="162" rx="10" fill="#300537" stroke="#E7B0DE" strokeWidth="1.2" strokeOpacity="0.4" />
          
          {/* Boundary Tag */}
          <rect x="14" y="-10" width="236" height="20" rx="4" fill="#FF5A0A" />
          <text x="22" y="4" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="monospace">
            Docker Compose • autoops-network (172.28)
          </text>

          {/* Container 1: autoops-app */}
          <g transform="translate(16, 24)">
            <rect width="216" height="120" rx="8" fill="#520E5D" stroke="#FF5A0A" strokeWidth="1.5" />
            <circle cx="18" cy="22" r="5" fill="#FF5A0A" />
            <text x="32" y="25" fill="#FAF0F8" fontSize="12" fontWeight="800" fontFamily="monospace">autoops-app</text>
            <text x="32" y="42" fill="#FF5A0A" fontSize="10" fontWeight="700" fontFamily="monospace">{'0.0.0.0:5000 -> 5000'}</text>
            
            {/* Specs */}
            <line x1="16" y1="52" x2="200" y2="52" stroke="rgba(231, 176, 222, 0.2)" strokeWidth="1" />
            <text x="18" y="68" fill="#E7B0DE" fontSize="9.5" fontFamily="monospace">• User: appuser (UID 10001)</text>
            <text x="18" y="82" fill="#E7B0DE" fontSize="9.5" fontFamily="monospace">• Root FS: read_only: true</text>
            <text x="18" y="96" fill="#E7B0DE" fontSize="9.5" fontFamily="monospace">• Linux cap_drop: [ALL]</text>
            <text x="18" y="110" fill="#E7B0DE" fontSize="9.5" fontFamily="monospace">• Tmpfs: /tmp (64M, noexec)</text>
          </g>

          {/* Active Probe Flow: Nagios -> App */}
          <g transform="translate(232, 70)">
            <path d="M 28 14 L 0 14" stroke="#FF5A0A" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="4,10 0,14 4,18" fill="#FF5A0A" />
            <text x="14" y="6" fill="#FF5A0A" fontSize="8.5" fontWeight="700" textAnchor="middle" fontFamily="monospace">PROBE</text>
            <text x="14" y="28" fill="#E7B0DE" fontSize="7.5" textAnchor="middle" fontFamily="monospace">/health</text>
          </g>

          {/* Container 2: autoops-nagios */}
          <g transform="translate(260, 24)">
            <rect width="216" height="120" rx="8" fill="#520E5D" stroke="#E7B0DE" strokeWidth="1.5" />
            <circle cx="18" cy="22" r="5" fill="#E7B0DE" />
            <text x="32" y="25" fill="#FAF0F8" fontSize="12" fontWeight="800" fontFamily="monospace">autoops-nagios</text>
            <text x="32" y="42" fill="#E7B0DE" fontSize="10" fontWeight="700" fontFamily="monospace">{'127.0.0.1:8080 -> 80'}</text>
            
            {/* Specs */}
            <line x1="16" y1="52" x2="200" y2="52" stroke="rgba(231, 176, 222, 0.2)" strokeWidth="1" />
            <text x="18" y="68" fill="#E7B0DE" fontSize="9.5" fontFamily="monospace">• Service: HTTP-Health (60s)</text>
            <text x="18" y="82" fill="#E7B0DE" fontSize="9.5" fontFamily="monospace">• Service: HTTP-Root (60s)</text>
            <text x="18" y="96" fill="#E7B0DE" fontSize="9.5" fontFamily="monospace">• Service: TCP-Port-5000</text>
            <text x="18" y="110" fill="#E7B0DE" fontSize="9.5" fontFamily="monospace">• Self-Healing Cycle Verified</text>
          </g>
        </g>

        {/* BOTTOM ROW: Terraform & Configuration Management */}
        <g transform="translate(24, 282)">
          {/* Terraform Auxiliary Node */}
          <rect width="180" height="96" rx="8" fill="#520E5D" stroke="rgba(231, 176, 222, 0.3)" strokeWidth="1" />
          <circle cx="16" cy="18" r="4" fill="#FF5A0A" />
          <text x="26" y="21" fill="#FAF0F8" fontSize="11" fontWeight="700" fontFamily="monospace">Terraform Auxiliary</text>
          <text x="16" y="38" fill="#E7B0DE" fontSize="9" fontFamily="monospace">Net: autoops-infra-net</text>
          <text x="16" y="52" fill="#E7B0DE" fontSize="9" fontFamily="monospace">Subnet: 172.29.0.0/16</text>
          <text x="16" y="66" fill="#E7B0DE" fontSize="9" fontFamily="monospace">Vol: autoops-data-storage</text>
          <text x="16" y="80" fill="#FF5A0A" fontSize="9" fontWeight="700" fontFamily="monospace">Status: 0 Drift (Verified)</text>

          {/* Puppet Host Policy */}
          <g transform="translate(196, 0)">
            <rect width="144" height="96" rx="8" fill="#520E5D" stroke="rgba(231, 176, 222, 0.3)" strokeWidth="1" />
            <circle cx="16" cy="18" r="4" fill="#E7B0DE" />
            <text x="26" y="21" fill="#FAF0F8" fontSize="11" fontWeight="700" fontFamily="monospace">Puppet Policy</text>
            <text x="16" y="38" fill="#E7B0DE" fontSize="9" fontFamily="monospace">Host: /etc/autoops</text>
            <text x="16" y="52" fill="#E7B0DE" fontSize="9" fontFamily="monospace">autoops_policy.conf</text>
            <text x="16" y="66" fill="#E7B0DE" fontSize="9" fontFamily="monospace">Permissions: 0644</text>
            <text x="16" y="80" fill="#FF5A0A" fontSize="9" fontWeight="700" fontFamily="monospace">Catalog: Idempotent</text>
          </g>

          {/* Ansible Orchestration */}
          <g transform="translate(356, 0)">
            <rect width="136" height="96" rx="8" fill="#520E5D" stroke="rgba(231, 176, 222, 0.3)" strokeWidth="1" />
            <circle cx="16" cy="18" r="4" fill="#FF5A0A" />
            <text x="26" y="21" fill="#FAF0F8" fontSize="11" fontWeight="700" fontFamily="monospace">Ansible Core</text>
            <text x="16" y="38" fill="#E7B0DE" fontSize="9" fontFamily="monospace">01: Preflight check</text>
            <text x="16" y="52" fill="#E7B0DE" fontSize="9" fontFamily="monospace">02: Deploy containers</text>
            <text x="16" y="66" fill="#E7B0DE" fontSize="9" fontFamily="monospace">03: Smoke test assert</text>
            <text x="16" y="80" fill="#FF5A0A" fontSize="9" fontWeight="700" fontFamily="monospace">04: Verify all passes</text>
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
          filter: drop-shadow(0 10px 30px rgba(64, 8, 73, 0.25));
        }
      `}</style>
    </div>
  );
};
