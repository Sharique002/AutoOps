import React, { useState } from 'react';
import { Menu, X, Shield, Terminal } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Pipeline', href: '#pipeline' },
    { label: 'Monitoring', href: '#monitoring' },
    { label: 'Security', href: '#security' },
    { label: 'Milestones', href: '#milestones' },
    { label: 'Verification', href: '#verification' },
    { label: 'Docs', href: '#documentation' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand */}
        <a href="#overview" className="navbar-brand">
          <div className="brand-icon">
            <Terminal size={18} className="text-green" />
          </div>
          <div className="brand-text">
            <span className="brand-title">{PROJECT_METADATA.name}</span>
            <span className="brand-subtitle">DEVOPS PLATFORM</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Status Pill & Actions */}
        <div className="navbar-right">
          <div className="status-pill" title="Local evaluation environment with 6 completed milestones">
            <span className="pulsing-dot" />
            <span className="status-text">LOCAL DEV • 6/6 MILESTONES</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <nav className="mobile-nav" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-status-row">
              <Shield size={14} className="text-cyan" />
              <span>Hardened Container Topology</span>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(11, 15, 20, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border-subtle);
          height: var(--header-height);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .brand-icon {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color var(--transition-fast);
        }

        .navbar-brand:hover .brand-icon {
          border-color: var(--accent-green);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-mono);
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .brand-subtitle {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--text-secondary);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-secondary);
          transition: color var(--transition-fast);
          padding: 6px 2px;
          position: relative;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 5px 12px;
          border-radius: var(--radius-pill);
        }

        .pulsing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-green);
          box-shadow: 0 0 8px var(--accent-green);
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }

        .mobile-menu-toggle {
          display: none;
          color: var(--text-primary);
          padding: 6px;
        }

        .mobile-drawer {
          position: absolute;
          top: var(--header-height);
          left: 0;
          right: 0;
          background: var(--bg-panel);
          border-bottom: 1px solid var(--border-subtle);
          padding: 20px 24px;
          box-shadow: var(--shadow-panel);
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mobile-nav-link {
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .mobile-nav-link:hover {
          color: var(--text-primary);
        }

        .mobile-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          padding-top: 8px;
        }

        .text-green { color: var(--accent-green); }
        .text-cyan { color: var(--accent-cyan); }

        @media (max-width: 992px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-toggle {
            display: flex;
          }
          .status-pill {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
