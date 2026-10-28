import React, { useState } from 'react';
import { Menu, X, Shield, Terminal, Palette, Moon } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
            <Terminal size={18} className="brand-terminal-icon" />
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
          {/* Theme Switcher Button */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'orchid' ? 'Switch to Dark Charcoal Theme' : 'Switch to Orchid & Violet Theme'}
            aria-label="Toggle visual theme"
          >
            {theme === 'orchid' ? (
              <>
                <Moon size={15} />
                <span className="theme-toggle-label">DARK MODE</span>
              </>
            ) : (
              <>
                <Palette size={15} />
                <span className="theme-toggle-label">ORCHID THEME</span>
              </>
            )}
          </button>

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

            <div className="mobile-theme-row">
              <button
                type="button"
                className="btn btn-secondary mobile-theme-btn"
                onClick={toggleTheme}
              >
                {theme === 'orchid' ? (
                  <>
                    <Moon size={16} />
                    <span>Switch to Charcoal Dark</span>
                  </>
                ) : (
                  <>
                    <Palette size={16} />
                    <span>Switch to Orchid &amp; Violet Theme</span>
                  </>
                )}
              </button>
            </div>

            <div className="mobile-status-row">
              <Shield size={14} className="text-orange" />
              <span>Hardened Container Topology Verified</span>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--header-bg);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-subtle);
          height: var(--header-height);
          transition: background-color var(--transition-normal);
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
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color var(--transition-fast);
        }

        .navbar-brand:hover .brand-icon {
          border-color: var(--accent-orange);
        }

        .brand-terminal-icon {
          color: var(--accent-orange);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .brand-subtitle {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 700;
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
          font-weight: 600;
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
          gap: 12px;
        }

        .theme-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          padding: 6px 12px;
          border-radius: var(--radius-pill);
          color: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          border-color: var(--accent-orange);
          background: var(--accent-orange-bg);
          color: var(--accent-orange);
        }

        .status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          padding: 6px 14px;
          border-radius: var(--radius-pill);
        }

        .pulsing-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-orange);
          box-shadow: 0 0 10px var(--accent-orange);
        }

        .status-text {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
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
          border-bottom: 1.5px solid var(--border-subtle);
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
          font-weight: 600;
          color: var(--text-secondary);
          padding: 8px 0;
          border-bottom: 1px solid var(--border-subtle);
        }

        .mobile-nav-link:hover {
          color: var(--text-primary);
        }

        .mobile-theme-row {
          padding-top: 8px;
        }

        .mobile-theme-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .mobile-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          padding-top: 8px;
        }

        .text-orange { color: var(--accent-orange); }

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
          .theme-toggle-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
