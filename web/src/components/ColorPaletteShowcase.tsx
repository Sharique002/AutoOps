import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export const ColorPaletteShowcase: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const swatches = [
    {
      name: 'Orchid Lilac Canvas',
      hex: '#E0A8D7',
      textColor: '#30013A',
      bgColor: '#E0A8D7',
      description: 'Core Canvas & Subtle Tint Gradient',
      borderColor: '#B87BAE',
    },
    {
      name: 'Deep Aubergine Ink',
      hex: '#30013A',
      textColor: '#FFF8FC',
      bgColor: '#30013A',
      description: 'Display Headlines, Rules & Primary Ink',
      borderColor: '#1D0023',
    },
    {
      name: 'Electric Tangerine',
      hex: '#F25D17',
      textColor: '#FFFFFF',
      bgColor: '#F25D17',
      description: 'Focal Pop Accent, Active States & CTAs',
      borderColor: '#C83E00',
    },
    {
      name: 'Deep Plum Terminal',
      hex: '#23022B',
      textColor: '#FF6B1A',
      bgColor: '#23022B',
      description: 'Deepest Aubergine for Code & Telemetry',
      borderColor: '#4A1A54',
    },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    }).catch(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1800);
    });
  };

  return (
    <div className="tomorrow-palette-container">
      <div className="palette-header-row">
        <div className="palette-tag">
          <Sparkles size={14} color="var(--accent-orange)" />
          <span>"TOMORROW" EDITORIAL DESIGN SYSTEM SPECIFICATION</span>
        </div>
        <div className="editorial-rule-38" style={{ margin: '12px 0 16px 0' }} />
        <h3 className="palette-title">Orchid Lilac, Deep Aubergine &amp; Electric Tangerine</h3>
        <p className="palette-desc">
          Strictly standardized across all pages, sections, modals, and responsive viewports. No dark charcoal or unstyled default themes.
        </p>
      </div>

      <div className="palette-grid-swatches">
        {swatches.map((swatch) => {
          const isCopied = copiedHex === swatch.hex;

          return (
            <button
              key={swatch.hex}
              type="button"
              className="swatch-card-item"
              style={{
                backgroundColor: swatch.bgColor,
                color: swatch.textColor,
                borderColor: swatch.borderColor,
              }}
              onClick={() => handleCopy(swatch.hex)}
              title={`Click to copy ${swatch.hex}`}
            >
              <div className="swatch-header-inner">
                <span className="swatch-name-text">{swatch.name}</span>
                <div className="swatch-copy-pill" style={{ borderColor: swatch.textColor }}>
                  {isCopied ? <Check size={11} /> : <Copy size={11} />}
                  <span>{isCopied ? 'COPIED' : 'HEX'}</span>
                </div>
              </div>

              <div className="swatch-body-inner">
                <span className="swatch-hex-val">{swatch.hex}</span>
                <span className="swatch-role-text">{swatch.description}</span>
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .tomorrow-palette-container {
          background: rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
          border-radius: 24px;
          padding: 28px;
          margin-top: 32px;
          margin-bottom: 24px;
        }

        .palette-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--ink-secondary);
        }

        .palette-title {
          font-family: var(--font-display);
          font-size: 1.8rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: var(--ink-primary);
          margin-bottom: 8px;
        }

        .palette-desc {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--ink-secondary);
          margin-bottom: 24px;
          max-width: 650px;
        }

        .palette-grid-swatches {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .swatch-card-item {
          border-radius: 18px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 120px;
          text-align: left;
          cursor: pointer;
          border-width: 1.5px;
          border-style: solid;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
          box-shadow: 0 4px 16px rgba(48, 1, 58, 0.06);
        }

        .swatch-card-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(48, 1, 58, 0.12);
        }

        .swatch-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .swatch-name-text {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .swatch-copy-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 9999px;
          border: 1px solid;
          background: rgba(255, 255, 255, 0.15);
        }

        .swatch-body-inner {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .swatch-hex-val {
          font-family: var(--font-mono);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .swatch-role-text {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
};
