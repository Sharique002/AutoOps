import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  FileText,
  Terminal,
  Layers,
  Radio,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import {
  DOCUMENTATION_RESOURCES,
  DEMO_COMMANDS,
  MILESTONES,
  ARCHITECTURE_COMPONENTS,
} from '../data/projectData';

interface SearchItem {
  id: string;
  title: string;
  category: 'Section' | 'Report' | 'Milestone' | 'Tool' | 'Command';
  subtitle: string;
  actionType: 'navigate' | 'copy';
  target: string;
}

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDoc?: (docId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenDoc,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build searchable index
  const allItems: SearchItem[] = [
    // Sections
    {
      id: 'sec-overview',
      title: 'Platform Overview & Baseline',
      category: 'Section',
      subtitle: 'DevOps engineering platform, WSL2 runtime, 6/6 milestones verified',
      actionType: 'navigate',
      target: '#overview',
    },
    {
      id: 'sec-arch',
      title: 'Subsystem Architecture & Dual Topology',
      category: 'Section',
      subtitle: 'Compose runtime (autoops-network) & Terraform isolated infrastructure (autoops-infra-net)',
      actionType: 'navigate',
      target: '#architecture',
    },
    {
      id: 'sec-pipe',
      title: 'Automation CI/CD Pipeline Flow',
      category: 'Section',
      subtitle: '7 continuous quality gates from Pytest to Docker & Ansible deployment',
      actionType: 'navigate',
      target: '#pipeline',
    },
    {
      id: 'sec-mon',
      title: 'Nagios Core Observability & Telemetry',
      category: 'Section',
      subtitle: 'Proactive service health probes and controlled failure recovery sequences',
      actionType: 'navigate',
      target: '#monitoring',
    },
    {
      id: 'sec-sec',
      title: 'Container Hardening & Security Audit',
      category: 'Section',
      subtitle: 'Immutable root filesystem, non-root user, dropped capabilities, and secret scan',
      actionType: 'navigate',
      target: '#security',
    },
    {
      id: 'sec-ms',
      title: 'Six-Milestone Delivery Lifecycle',
      category: 'Section',
      subtitle: 'Incremental progression M01 to M06 with technical deliverables and evidence',
      actionType: 'navigate',
      target: '#milestones',
    },
    {
      id: 'sec-ver',
      title: 'Quality Assurance & Acceptance Matrix',
      category: 'Section',
      subtitle: '16 deterministic acceptance checks across all subsystems and layers',
      actionType: 'navigate',
      target: '#verification',
    },
    {
      id: 'sec-doc',
      title: 'Academic Reports & Demonstration Guide',
      category: 'Section',
      subtitle: 'Comprehensive Markdown project documentation and viva inspection scripts',
      actionType: 'navigate',
      target: '#documentation',
    },

    // Reports
    ...DOCUMENTATION_RESOURCES.map((doc) => ({
      id: `doc-${doc.id}`,
      title: doc.title,
      category: 'Report' as const,
      subtitle: `${doc.category} • ${doc.sizeOrSections} • ${doc.relativePath}`,
      actionType: 'navigate' as const,
      target: `#doc-${doc.id}`,
    })),

    // Milestones
    ...MILESTONES.map((ms) => ({
      id: `ms-${ms.id}`,
      title: `Milestone 0${ms.number}: ${ms.title}`,
      category: 'Milestone' as const,
      subtitle: `${ms.category} • Tools: ${ms.tools.join(', ')}`,
      actionType: 'navigate' as const,
      target: '#milestones',
    })),

    // Subsystems / Tools
    ...ARCHITECTURE_COMPONENTS.map((comp) => ({
      id: `comp-${comp.id}`,
      title: comp.name,
      category: 'Tool' as const,
      subtitle: `${comp.tool} • Managed by ${comp.ownership}`,
      actionType: 'navigate' as const,
      target: '#architecture',
    })),

    // Demo Commands
    ...DEMO_COMMANDS.map((cmd) => ({
      id: `cmd-${cmd.id}`,
      title: cmd.label,
      category: 'Command' as const,
      subtitle: `${cmd.command} — ${cmd.description}`,
      actionType: 'copy' as const,
      target: cmd.command,
    })),
  ];

  // Filter items
  const filteredItems = allItems.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCat;
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveCategory('All');
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    if (item.actionType === 'copy') {
      navigator.clipboard.writeText(item.target).then(() => {
        setCopiedId(item.id);
        setTimeout(() => setCopiedId(null), 1500);
      });
      return;
    }

    if (item.category === 'Report' && onOpenDoc) {
      const docId = item.id.replace('doc-', '');
      onOpenDoc(docId);
      onClose();
      return;
    }

    onClose();
    const element = document.querySelector(item.target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (category: SearchItem['category']) => {
    switch (category) {
      case 'Section':
        return <Layers size={14} color="var(--accent-orange)" />;
      case 'Report':
        return <FileText size={14} color="var(--accent-orange)" />;
      case 'Milestone':
        return <FileCheck size={14} color="var(--accent-orange)" />;
      case 'Tool':
        return <Radio size={14} color="var(--accent-orange)" />;
      case 'Command':
        return <Terminal size={14} color="var(--accent-orange)" />;
      default:
        return <CheckCircle2 size={14} color="var(--accent-orange)" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={18} color="var(--ink-secondary)" className="search-lead-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-text-input"
            placeholder="Search sections, tools, milestones, reports, commands... (Type to filter)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
          <kbd className="search-esc-kbd" onClick={onClose}>ESC</kbd>
        </div>

        {/* Filter Chips Bar */}
        <div className="search-chips-bar">
          {['All', 'Section', 'Report', 'Milestone', 'Tool', 'Command'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`search-filter-chip ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
            >
              {cat === 'All' ? 'All Resources' : `${cat}s`}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="search-results-list" role="listbox">
          {filteredItems.length === 0 ? (
            <div className="search-empty-state">
              <p className="empty-title">No matching resources found</p>
              <p className="empty-sub">Try searching for &quot;Docker&quot;, &quot;Nagios&quot;, &quot;Milestone&quot;, &quot;Report&quot;, or &quot;pytest&quot;.</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`search-result-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="item-icon-box">{getCategoryIcon(item.category)}</div>

                  <div className="item-content-box">
                    <div className="item-top-row">
                      <span className="item-title">{item.title}</span>
                      <span className="item-cat-tag">{item.category}</span>
                    </div>
                    <p className="item-subtitle">{item.subtitle}</p>
                  </div>

                  <div className="item-action-box">
                    {item.actionType === 'copy' ? (
                      <span className="item-action-pill copy-pill">
                        {isCopied ? <Check size={12} color="#FFF" /> : <Copy size={12} />}
                        <span>{isCopied ? 'COPIED' : 'COPY'}</span>
                      </span>
                    ) : (
                      <span className="item-action-pill jump-pill">
                        <span>JUMP</span>
                        <ArrowRight size={12} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Search Footer */}
        <div className="search-modal-footer">
          <div className="footer-shortcuts">
            <span className="shortcut-item">
              <kbd>↑</kbd> <kbd>↓</kbd> Navigate
            </span>
            <span className="shortcut-item">
              <kbd>↵</kbd> Select
            </span>
            <span className="shortcut-item">
              <kbd>ESC</kbd> Close
            </span>
          </div>
          <span className="footer-count">
            Showing {filteredItems.length} of {allItems.length} indexed platform items
          </span>
        </div>
      </div>

      <style>{`
        .search-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(48, 1, 58, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 1000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 16px 24px 16px;
          animation: searchFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes searchFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .search-modal-container {
          width: 100%;
          max-width: 680px;
          background: #E3ABDA;
          border: 2px solid var(--ink-primary);
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(48, 1, 58, 0.35);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
          animation: searchScaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes searchScaleUp {
          from { transform: scale(0.96) translateY(-10px); }
          to { transform: scale(1) translateY(0); }
        }

        .search-input-header {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1.5px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.35);
          gap: 12px;
        }

        .search-lead-icon {
          flex-shrink: 0;
        }

        .search-text-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--ink-primary);
          font-weight: 600;
        }

        .search-text-input::placeholder {
          color: var(--ink-muted);
          font-weight: 500;
        }

        .search-clear-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
          background: rgba(48, 1, 58, 0.1);
          color: var(--ink-secondary);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .search-clear-btn:hover {
          background: rgba(48, 1, 58, 0.2);
          color: var(--ink-primary);
        }

        .search-esc-kbd {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(48, 1, 58, 0.1);
          border: 1px solid var(--border-hairline);
          color: var(--ink-secondary);
          cursor: pointer;
        }

        .search-chips-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.18);
          border-bottom: 1px solid var(--border-hairline);
          overflow-x: auto;
        }

        .search-filter-chip {
          padding: 4px 12px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          background: transparent;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--ink-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .search-filter-chip:hover {
          border-color: var(--ink-primary);
          color: var(--ink-primary);
        }

        .search-filter-chip.active {
          background: var(--ink-primary);
          color: var(--ink-on-accent);
          border-color: var(--ink-primary);
        }

        .search-results-list {
          flex: 1;
          overflow-y: auto;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .search-empty-state {
          padding: 48px 24px;
          text-align: center;
        }

        .empty-title {
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink-primary);
          margin-bottom: 6px;
        }

        .empty-sub {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--ink-secondary);
        }

        .search-result-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .search-result-item:hover,
        .search-result-item.selected {
          background: rgba(255, 255, 255, 0.65);
          border-color: var(--ink-primary);
          transform: translateX(2px);
        }

        .item-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(242, 93, 23, 0.14);
          border: 1px solid rgba(242, 93, 23, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .item-content-box {
          flex: 1;
          min-width: 0;
        }

        .item-top-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 3px;
        }

        .item-title {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--ink-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-cat-tag {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(48, 1, 58, 0.08);
          color: var(--ink-secondary);
          flex-shrink: 0;
        }

        .item-subtitle {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          color: var(--ink-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-action-box {
          flex-shrink: 0;
        }

        .item-action-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .jump-pill {
          background: rgba(48, 1, 58, 0.08);
          color: var(--ink-primary);
          border: 1px solid var(--border-hairline);
        }

        .copy-pill {
          background: var(--accent-orange);
          color: #FFF;
          border: 1px solid var(--accent-orange);
        }

        .search-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.25);
          border-top: 1px solid var(--border-hairline);
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--ink-secondary);
        }

        .footer-shortcuts {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .shortcut-item kbd {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          padding: 2px 5px;
          border-radius: 4px;
          background: rgba(48, 1, 58, 0.1);
          border: 1px solid var(--border-hairline);
          color: var(--ink-primary);
        }

        .footer-count {
          color: var(--ink-muted);
        }

        @media (max-width: 600px) {
          .search-modal-backdrop {
            padding: 20px 10px;
          }
          .footer-shortcuts {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};