import React from 'react';
import { ThemeDefinition, ColorMode } from '../data/themes';

interface ThemeMiniPreviewProps {
  theme: ThemeDefinition;
  mode?: ColorMode;
}

export const ThemeMiniPreview: React.FC<ThemeMiniPreviewProps> = ({ theme, mode }) => {
  const activeMode = mode ?? theme.defaultMode;
  const tokens = theme.tokens[activeMode];

  const isSurfaceHero =
    theme.id === 'glassmorphism' ||
    theme.id === 'futuristic' ||
    theme.id === 'immersive' ||
    theme.id === 'neumorphism' ||
    theme.id === 'claymorphism' ||
    theme.id === 'skeuomorphism' ||
    theme.id === 'neo-brutalism' ||
    theme.id === 'bento-grid' ||
    theme.id === 'collage-mixed' ||
    theme.id === 'hand-drawn' ||
    theme.id === 'y2k-nostalgia' ||
    theme.id === 'cyberpunk' ||
    theme.id === 'aurora-mesh';

  return (
    <div
      className={`live-mini-preview live-mini-${theme.id}`}
      style={{
        background: tokens.heroBackdrop,
        color: tokens.textPrimary,
        fontFamily: theme.typography.fontBody,
        borderColor: tokens.borderSubtle,
      }}
      aria-hidden="true"
    >
      {/* Mini Navigation Bar */}
      <div
        className="live-mini-nav"
        style={{
          borderBottom: `1px solid ${tokens.borderSubtle}`,
          background:
            theme.id === 'y2k-nostalgia'
              ? tokens.accentSecondary
              : theme.id === 'glassmorphism' || theme.id === 'skeuomorphism'
              ? tokens.bgSurface
              : 'transparent',
          color: theme.id === 'y2k-nostalgia' ? tokens.accentContrast : tokens.textPrimary,
          paddingLeft: theme.id === 'y2k-nostalgia' ? '6px' : '0',
          paddingRight: theme.id === 'y2k-nostalgia' ? '6px' : '0',
        }}
      >
        <span
          className="live-mini-brand"
          style={{
            fontFamily: theme.typography.fontDisplay,
            color: theme.id === 'y2k-nostalgia' ? tokens.accentContrast : tokens.textPrimary,
          }}
        >
          ThemeLab
        </span>
        <div className="live-mini-nav-dots">
          <span style={{ background: tokens.textMuted }} />
          <span style={{ background: tokens.textMuted }} />
          <span
            className="live-mini-cta-Chip"
            style={{
              background: tokens.accentPrimary,
              color: tokens.accentContrast,
              borderRadius: theme.layout.radiusPill,
            }}
          />
        </div>
      </div>

      {/* Mini Hero Area */}
      <div className="live-mini-stage">
        {(theme.id === 'glassmorphism' || theme.id === 'aurora-mesh') && (
          <>
            <div className="live-mini-orb orb-a" style={{ background: tokens.accentPrimary }} />
            <div className="live-mini-orb orb-b" style={{ background: tokens.accentSecondary }} />
          </>
        )}

        <div
          className="live-mini-hero-card"
          style={{
            background: isSurfaceHero ? tokens.bgSurface : 'transparent',
            border:
              theme.id === 'minimalist' || theme.id === 'flat-design'
                ? 'none'
                : `${theme.layout.cardBorderWidth} solid ${tokens.borderStrong}`,
            borderRadius: theme.layout.radiusMd,
            boxShadow: tokens.shadowCard,
            transform: theme.id === 'collage-mixed' ? 'rotate(-1deg)' : 'none',
          }}
        >
          <span
            className="live-mini-kicker"
            style={{
              background: tokens.badgeBg,
              color: tokens.badgeText,
              fontFamily: theme.typography.fontMono,
              borderRadius: theme.layout.radiusSm,
            }}
          >
            {theme.name}
          </span>
          <div
            className="live-mini-title"
            style={{
              fontFamily: theme.typography.fontDisplay,
              textTransform: theme.typography.headingTransform,
              color: tokens.textPrimary,
            }}
          >
            Design Beyond Ordinary.
          </div>
          <div className="live-mini-actions">
            <span
              className="live-mini-btn-primary"
              style={{
                background: tokens.accentPrimary,
                color: tokens.accentContrast,
                borderRadius: theme.layout.radiusPill,
                boxShadow:
                  theme.id === 'neo-brutalism' || theme.id === 'brutalism'
                    ? `2px 2px 0 ${tokens.borderStrong}`
                    : 'none',
              }}
            >
              Get Started
            </span>
            <span
              className="live-mini-btn-secondary"
              style={{
                borderColor: tokens.borderStrong,
                color: tokens.textPrimary,
                borderRadius: theme.layout.radiusPill,
              }}
            >
              Explore
            </span>
          </div>
        </div>

        {/* Mini 3-Card Feature Row */}
        <div className="live-mini-features">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className="live-mini-feature-box"
              style={{
                background: tokens.bgSurface,
                border: `${theme.layout.cardBorderWidth} solid ${tokens.borderSubtle}`,
                borderRadius: theme.layout.radiusSm,
                boxShadow:
                  theme.id === 'neumorphism' ||
                  theme.id === 'claymorphism' ||
                  theme.id === 'neo-brutalism'
                    ? tokens.shadowCard
                    : 'none',
              }}
            >
              <span
                className="live-mini-feature-bar"
                style={{
                  background:
                    idx === 0
                      ? tokens.accentPrimary
                      : idx === 1
                      ? tokens.accentSecondary
                      : tokens.textMuted,
                }}
              />
              <span
                className="live-mini-feature-line"
                style={{ background: tokens.borderSubtle }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
