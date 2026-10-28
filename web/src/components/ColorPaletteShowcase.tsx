import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export const ColorPaletteShowcase: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const swatches = [
    {
      name: 'Pastel Orchid Pink',
      hex: '#E7B0DE',
      textColor: '#400849',
      bgColor: '#E7B0DE',
      description: 'Primary Canvas & Surface Tint',
      borderColor: '#C790BD',
    },
    {
      name: 'Deep Eggplant Violet',
      hex: '#400849',
      textColor: '#FAF0F8',
      bgColor: '#400849',
      description: 'Bold Typography & Contrast Panels',
      borderColor: '#300537',
    },
    {
      name: 'Signal Orange',
      hex: '#FF5A0A',
      textColor: '#FFFFFF',
      bgColor: '#FF5A0A',
      description: 'Vibrant Accent, CTAs & Focus Rings',
      borderColor: '#D44600',
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
    <div className="palette-showcase-container">
      <div className="palette-header">
        <div className="palette-eyebrow">
          <Sparkles size={14} className="text-orange" />
          <span>MATCHED DESIGN SYSTEM PALETTE</span>
        </div>
        <h3 className="palette-title">Curated Color Harmony from Reference</h3>
        <p className="palette-desc">
          Exact tri-color scheme extracted from your reference: <strong>Pastel Orchid Pink</strong> canvas, high-contrast <strong>Deep Eggplant Violet</strong> typography, and electric <strong>Signal Orange</strong> accents.
        </p>
      </div>

      <div className="swatches-grid">
        {swatches.map((swatch) => {
          const isCopied = copiedHex === swatch.hex;

          return (
            <button
              key={swatch.hex}
              type="button"
              className="swatch-card"
              style={{
                backgroundColor: swatch.bgColor,
                color: swatch.textColor,
                borderColor: swatch.borderColor,
              }}
              onClick={() => handleCopy(swatch.hex)}
              title={`Click to copy ${swatch.hex}`}
            >
              <div className="swatch-top">
                <span className="swatch-label-text">{swatch.name}</span>
                <div className="swatch-copy-pill" style={{ borderColor: swatch.textColor }}>
                  {isCopied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{isCopied ? 'COPIED' : 'COPY'}</span>
                </div>
              </div>

              <div className="swatch-bottom">
                <span className="swatch-hex-code">{swatch.hex}</span>
                <span className="swatch-role">{swatch.description}</span>
              </div>
            </button>
          );
        })}
      </div>

      <style>{`
        .palette-showcase-container {
          background: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          padding: 24px;
          margin-top: var(--space-8);
          margin-bottom: var(--space-6);
        }

        .palette-header {
          margin-bottom: 20px;
        }

        .palette-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--accent-orange);
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .palette-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .palette-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .swatches-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .swatch-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 18px;
          border-radius: var(--radius-lg);
          border-width: 1.5px;
          border-style: solid;
          min-height: 140px;
          text-align: left;
          box-shadow: 0 4px 16px rgba(64, 8, 73, 0.10);
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }

        .swatch-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(64, 8, 73, 0.20);
        }

        .swatch-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .swatch-label-text {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 800;
          line-height: 1.2;
          max-width: 120px;
        }

        .swatch-copy-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: var(--radius-pill);
          border-width: 1px;
          border-style: solid;
          opacity: 0.85;
        }

        .swatch-bottom {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .swatch-hex-code {
          font-family: var(--font-mono);
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .swatch-role {
          font-size: 11px;
          opacity: 0.85;
          font-weight: 500;
        }

        .text-orange { color: var(--accent-orange); }

        @media (max-width: 768px) {
          .swatches-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
