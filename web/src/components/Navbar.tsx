import React, { useState, useEffect } from 'react';
import { Search, X, Command } from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';
import { QuickSearchModal } from './QuickSearchModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'OVERVIEW', href: '#overview' },
    { label: 'ARCHITECTURE', href: '#architecture' },
    { label: 'PIPELINE', href: '#pipeline' },
    { label: 'MONITORING', href: '#monitoring' },
    { label: 'SECURITY', href: '#security' },
    { label: 'MILESTONES', href: '#milestones' },
    { label: 'VERIFICATION', href: '#verification' },
    { label: 'DOCS', href: '#documentation' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section spy
      const sections = navLinks.map(l => l.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveSection(href.substring(1));
    setMobileMenuOpen(false);
  };

  return (
    <header className={`tomorrow-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Left Zone: Hamburger trigger + Minimal Brand */}
        <div className="navbar-zone-left">
          <button
            type="button"
            className="hamburger-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X size={22} color="var(--ink-primary)" strokeWidth={1.5} />
            ) : (
              <div className="thin-hamburger-icon">
                <span className="line" />
                <span className="line" />
                <span className="line" />
              </div>
            )}
          </button>

          <a href="#overview" className="brand-mark" onClick={() => handleLinkClick('#overview')}>
            <span className="brand-dot" />
            <span className="brand-text">{PROJECT_METADATA.name}</span>
            <span className="brand-badge">EDITION</span>
          </a>
        </div>

        {/* Center Zone: Horizontally Centered Links */}
        <nav className="navbar-zone-center" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                onClick={() => handleLinkClick(link.href)}
              >
                <span>{link.label}</span>
                {isActive && <span className="active-dot" />}
              </a>
            );
          })}
        </nav>

        {/* Right Zone: Search trigger + Status Pill */}
        <div className="navbar-zone-right">
          <button
            type="button"
            className="btn-search-trigger"
            title="Search Platform Documentation & Resources (Cmd+K)"
            aria-label="Search Platform"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={16} strokeWidth={1.5} color="var(--ink-primary)" />
            <span className="search-cmd-pill">
              <Command size={10} strokeWidth={1.5} /> K
            </span>
          </button>

          <div className="tomorrow-status-pill">
            <span className="status-dot-pulse" />
            <span className="status-label">6/6 MILESTONES VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="drawer-title">NAVIGATION</span>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation drawer"
              >
                <X size={24} color="var(--ink-primary)" strokeWidth={1.5} />
              </button>
            </div>

            <div className="drawer-search-box">
              <button
                type="button"
                className="drawer-search-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
              >
                <Search size={15} color="var(--accent-orange)" />
                <span>Search sections &amp; reports...</span>
                <kbd>Cmd+K</kbd>
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              {navLinks.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="mobile-drawer-link"
                  onClick={() => handleLinkClick(link.href)}
                >
                  <span className="drawer-link-num">0{idx + 1}</span>
                  <span className="drawer-link-text">{link.label}</span>
                  <span className="drawer-arrow">→</span>
                </a>
              ))}
            </nav>

            <div className="drawer-footer">
              <div className="drawer-meta-kicker">AUTOOPS DEVOPS PLATFORM</div>
              <div className="drawer-meta-author">DEVELOPER: {PROJECT_METADATA.developer}</div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quick Search Modal */}
      <QuickSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenDoc={(docId) => {
          window.location.hash = `#doc-${docId}`;
        }}
      />

      <style>{`
        .tomorrow-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 84px;
          z-index: 1000;
          display: flex;
          align-items: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
        }

        .tomorrow-navbar.is-scrolled {
          background: rgba(227, 171, 218, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border-hairline);
          box-shadow: 0 4px 20px rgba(48, 1, 58, 0.04);
        }

        .navbar-inner {
          width: 100%;
          padding: 0 4vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        /* Left Zone */
        .navbar-zone-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .hamburger-trigger {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .thin-hamburger-icon {
          width: 24px;
          height: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .thin-hamburger-icon .line {
          width: 100%;
          height: 1.5px;
          background-color: var(--ink-primary);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .brand-mark {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }

        .brand-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-orange);
          box-shadow: 0 0 8px var(--accent-orange-bright);
        }

        .brand-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.04em;
          color: var(--ink-primary);
          line-height: 1;
        }

        .brand-badge {
          font-family: var(--font-sans);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: var(--ink-secondary);
          padding: 2px 6px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
        }

        /* Center Zone */
        .navbar-zone-center {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-link-item {
          position: relative;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          color: var(--ink-primary);
          padding: 6px 0;
          transition: color 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .nav-link-item:hover {
          color: var(--accent-orange);
        }

        .nav-link-item .active-dot {
          position: absolute;
          bottom: -4px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--accent-orange);
        }

        /* Right Zone */
        .navbar-zone-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .btn-search-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.15);
          transition: all 0.2s ease;
        }

        .btn-search-trigger:hover {
          border-color: var(--ink-primary);
          background: rgba(255, 255, 255, 0.3);
        }

        .search-cmd-pill {
          display: flex;
          align-items: center;
          gap: 2px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--ink-secondary);
          padding: 1px 4px;
          background: rgba(48, 1, 58, 0.08);
          border-radius: 4px;
        }

        .tomorrow-status-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.15);
        }

        .status-dot-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-orange);
          box-shadow: 0 0 8px var(--accent-orange-bright);
        }

        .status-label {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink-primary);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .navbar-zone-center {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .tomorrow-status-pill {
            display: none;
          }
          .search-cmd-pill {
            display: none;
          }
        }

        /* Mobile Drawer */
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(48, 1, 58, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 1100;
          display: flex;
          justify-content: flex-start;
          animation: fadeIn 0.25s ease;
        }

        .mobile-drawer-panel {
          width: 85vw;
          max-width: 380px;
          height: 100%;
          background: #E3ABDA;
          border-right: 1.5px solid var(--ink-primary);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 12px 0 40px rgba(48, 1, 58, 0.18);
          animation: slideRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
          border-bottom: 1.5px solid var(--ink-primary);
          margin-bottom: 20px;
        }

        .drawer-search-box {
          margin-bottom: 24px;
        }

        .drawer-search-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 9999px;
          border: 1.5px solid var(--accent-orange);
          background: rgba(255, 255, 255, 0.45);
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--ink-primary);
          cursor: pointer;
        }

        .drawer-search-btn kbd {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(48, 1, 58, 0.1);
          color: var(--ink-primary);
        }

        .drawer-title {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: var(--ink-primary);
        }

        .mobile-drawer-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .mobile-drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.2);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .mobile-drawer-link:hover {
          background: var(--ink-primary);
          border-color: var(--ink-primary);
        }

        .mobile-drawer-link:hover .drawer-link-text,
        .mobile-drawer-link:hover .drawer-link-num,
        .mobile-drawer-link:hover .drawer-arrow {
          color: var(--ink-on-accent);
        }

        .drawer-link-num {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-orange);
          font-weight: 700;
        }

        .drawer-link-text {
          font-family: var(--font-display);
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          color: var(--ink-primary);
        }

        .drawer-arrow {
          font-size: 1.1rem;
          color: var(--ink-primary);
          transition: transform 0.2s ease;
        }

        .mobile-drawer-link:hover .drawer-arrow {
          transform: translateX(4px);
        }

        .drawer-footer {
          padding-top: 24px;
          border-top: 1px solid var(--border-hairline);
        }

        .drawer-meta-kicker {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          font-weight: 600;
          color: var(--ink-secondary);
        }

        .drawer-meta-author {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--ink-muted);
          margin-top: 4px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </header>
  );
};
