import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SHARED_LANDING_CONTENT } from '../data/landingContent';
import { getThemeById, THEMES, ThemeDefinition } from '../data/themes';
import { usePlatformTheme } from '../context/ThemeContext';
import { useMyList } from '../context/MyListContext';
import { ModeSlideTrack } from '../components/ModeSlideTrack';

export const ThemeDemoPage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const { getThemeMode, toggleThemeMode } = usePlatformTheme();
  const { isThemeInList, toggleThemeInList, totalCount, toastMessage, dismissToast } =
    useMyList();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  const theme: ThemeDefinition | undefined = getThemeById(themeId);

  if (!theme) {
    return (
      <div className="theme-not-found">
        <div className="theme-not-found-box">
          <h1>Theme Not Found</h1>
          <p>The requested theme demo could not be located.</p>
          <Link to="/themes" className="theme-not-found-btn">
            Return to Themes Gallery
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = THEMES.findIndex((t) => t.id === theme.id);
  const prevTheme = THEMES[(currentIndex - 1 + THEMES.length) % THEMES.length];
  const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];

  const mode = getThemeMode(theme.id);
  const tokens = theme.tokens[mode];

  const cssVariables: React.CSSProperties = {
    '--td-bg-primary': tokens.bgPrimary,
    '--td-bg-secondary': tokens.bgSecondary,
    '--td-bg-surface': tokens.bgSurface,
    '--td-bg-elevated': tokens.bgElevated,
    '--td-text-primary': tokens.textPrimary,
    '--td-text-secondary': tokens.textSecondary,
    '--td-text-muted': tokens.textMuted,
    '--td-accent-primary': tokens.accentPrimary,
    '--td-accent-secondary': tokens.accentSecondary,
    '--td-accent-contrast': tokens.accentContrast,
    '--td-border-subtle': tokens.borderSubtle,
    '--td-border-strong': tokens.borderStrong,
    '--td-shadow-card': tokens.shadowCard,
    '--td-shadow-elevated': tokens.shadowElevated,
    '--td-hero-backdrop': tokens.heroBackdrop,
    '--td-badge-bg': tokens.badgeBg,
    '--td-badge-text': tokens.badgeText,
    '--td-font-display': theme.typography.fontDisplay,
    '--td-font-body': theme.typography.fontBody,
    '--td-font-mono': theme.typography.fontMono,
    '--td-hero-size': theme.typography.heroSize,
    '--td-hero-weight': theme.typography.heroWeight,
    '--td-hero-tracking': theme.typography.heroTracking,
    '--td-heading-transform': theme.typography.headingTransform,
    '--td-radius-sm': theme.layout.radiusSm,
    '--td-radius-md': theme.layout.radiusMd,
    '--td-radius-lg': theme.layout.radiusLg,
    '--td-radius-pill': theme.layout.radiusPill,
    '--td-section-padding': theme.layout.sectionPadding,
    '--td-card-border-width': theme.layout.cardBorderWidth,
  } as React.CSSProperties;

  const scrollToSection = (sectionId: string, feedbackMessage?: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (feedbackMessage) {
      setActiveFeedback(feedbackMessage);
      window.setTimeout(() => {
        setActiveFeedback((prev) => (prev === feedbackMessage ? null : prev));
      }, 3200);
    }
  };

  const handleHeroPointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointerOffset({ x: Number(normX.toFixed(2)), y: Number(normY.toFixed(2)) });
  };

  const handleHeroPointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className={`theme-demo-root theme-variant-${theme.id} theme-mode-${mode}`}
      style={cssVariables}
      data-theme-id={theme.id}
      data-theme-mode={mode}
    >
      {/* Top Studio Bar: Allows returning to ThemeLab, switching across all 24 themes, and toggling Demo Mode */}
      <aside className="td-studio-bar" aria-label="ThemeLab Demo Controls">
        <div className="td-studio-bar-inner">
          <div className="td-studio-left">
            <Link to="/themes" className="td-studio-back">
              ← Back to Themes
            </Link>
            <span className="td-studio-divider" aria-hidden="true">
              /
            </span>
            <span className="td-studio-current">
              {currentIndex + 1} of {THEMES.length}: <strong>{theme.name}</strong>
            </span>
          </div>

          <div className="td-studio-switcher" role="navigation" aria-label="Theme Selector">
            <Link
              to={`/themes/${prevTheme.id}`}
              className="td-studio-pill"
              title={`Previous theme: ${prevTheme.name}`}
              aria-label={`Previous theme: ${prevTheme.name}`}
            >
              ‹ Prev
            </Link>
            <select
              className="td-studio-select"
              value={theme.id}
              onChange={(e) => navigate(`/themes/${e.target.value}`)}
              aria-label="Select theme demonstration"
            >
              {THEMES.map((item, idx) => (
                <option key={item.id} value={item.id}>
                  {String(idx + 1).padStart(2, '0')}. {item.name} ({item.group})
                </option>
              ))}
            </select>
            <Link
              to={`/themes/${nextTheme.id}`}
              className="td-studio-pill"
              title={`Next theme: ${nextTheme.name}`}
              aria-label={`Next theme: ${nextTheme.name}`}
            >
              Next ›
            </Link>
          </div>

          <div className="td-studio-right">
            <button
              type="button"
              className="td-mode-toggle-btn"
              onClick={() => toggleThemeMode(theme.id)}
              aria-label={`Switch ${theme.name} theme to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              <ModeSlideTrack mode={mode} prefix={`${theme.name} Mode`} />
            </button>

            <button
              type="button"
              className={`td-studio-add-btn ${isThemeInList(theme.id) ? 'is-added' : ''}`}
              onClick={() => toggleThemeInList(theme.id)}
              aria-pressed={isThemeInList(theme.id)}
              aria-label={
                isThemeInList(theme.id)
                  ? `Remove ${theme.name} from My List`
                  : `Add ${theme.name} to My List`
              }
            >
              {isThemeInList(theme.id) ? '✓ Added to List' : '+ Add to List'}
            </button>

            <Link
              to="/my-list"
              className="td-studio-mylist-link"
              aria-label={
                totalCount > 0 ? `Open My List (${totalCount} saved items)` : 'Open My List'
              }
            >
              <span>My List</span>
              {totalCount > 0 && (
                <span className="mylist-count-badge" data-testid="demo-mylist-count">
                  {totalCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </aside>

      {toastMessage && (
        <div className="platform-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
          <button
            type="button"
            className="platform-toast-close"
            onClick={dismissToast}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Shared Landing Page Header & Navigation */}
      <header className="td-header">
        <div className="td-container td-header-inner">
          <a
            href="#demo-hero"
            className="td-brand"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('demo-hero');
            }}
          >
            {SHARED_LANDING_CONTENT.brandName}
          </a>

          <nav className="td-nav-desktop" aria-label="Theme Demo Navigation">
            <a
              href="#demo-hero"
              className="td-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo-hero');
              }}
            >
              {SHARED_LANDING_CONTENT.navigation.home}
            </a>
            <a
              href="#demo-features"
              className="td-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo-features');
              }}
            >
              {SHARED_LANDING_CONTENT.navigation.features}
            </a>
            <a
              href="#demo-about"
              className="td-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo-about');
              }}
            >
              {SHARED_LANDING_CONTENT.navigation.about}
            </a>
            <a
              href="#demo-cta"
              className="td-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo-cta');
              }}
            >
              {SHARED_LANDING_CONTENT.navigation.contact}
            </a>
          </nav>

          <div className="td-header-actions">
            <button
              type="button"
              className="td-inline-mode-toggle"
              onClick={() => toggleThemeMode(theme.id)}
              aria-label={`Toggle ${theme.name} ${mode === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch ${theme.name} to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              <ModeSlideTrack mode={mode} />
            </button>

            <button
              type="button"
              className="td-btn td-btn-primary td-nav-cta-desktop"
              onClick={() =>
                scrollToSection(
                  'demo-cta',
                  `Viewing "${SHARED_LANDING_CONTENT.navigation.cta}" in ${theme.name} (${mode} mode).`
                )
              }
            >
              {SHARED_LANDING_CONTENT.navigation.cta}
            </button>

            <button
              type="button"
              className="td-mobile-toggle"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-expanded={mobileNavOpen}
              aria-controls="td-mobile-nav-drawer"
              aria-label={mobileNavOpen ? 'Close theme navigation menu' : 'Open theme navigation menu'}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <nav
            id="td-mobile-nav-drawer"
            className="td-nav-mobile"
            aria-label="Theme Demo Mobile Navigation"
          >
            <a
              href="#demo-hero"
              className="td-mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo-hero');
              }}
            >
              {SHARED_LANDING_CONTENT.navigation.home}
            </a>
            <a
              href="#demo-features"
              className="td-mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo-features');
              }}
            >
              {SHARED_LANDING_CONTENT.navigation.features}
            </a>
            <a
              href="#demo-about"
              className="td-mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo-about');
              }}
            >
              {SHARED_LANDING_CONTENT.navigation.about}
            </a>
            <a
              href="#demo-cta"
              className="td-mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo-cta');
              }}
            >
              {SHARED_LANDING_CONTENT.navigation.contact}
            </a>
            <button
              type="button"
              className="td-btn td-btn-primary td-mobile-cta-btn"
              onClick={() =>
                scrollToSection(
                  'demo-cta',
                  `Viewing "${SHARED_LANDING_CONTENT.navigation.cta}" in ${theme.name} (${mode} mode).`
                )
              }
            >
              {SHARED_LANDING_CONTENT.navigation.cta}
            </button>
          </nav>
        )}
      </header>

      {/* Main Landing Page Content (Identical Written Content & Section Order across all 24 themes) */}
      <main>
        {/* 1. HERO SECTION */}
        <section
          id="demo-hero"
          className="td-hero"
          onMouseMove={handleHeroPointerMove}
          onMouseLeave={handleHeroPointerLeave}
        >
          {/* Theme-specific ambient background decorations */}
          <div className="td-hero-ambient" aria-hidden="true">
            {(theme.id === 'glassmorphism' || theme.id === 'aurora-mesh') && (
              <>
                <div
                  className="td-glass-orb td-glass-orb-1"
                  style={{
                    transform: `translate3d(${pointerOffset.x * 16}px, ${pointerOffset.y * 16}px, 0)`,
                  }}
                />
                <div
                  className="td-glass-orb td-glass-orb-2"
                  style={{
                    transform: `translate3d(${pointerOffset.x * -20}px, ${pointerOffset.y * -14}px, 0)`,
                  }}
                />
              </>
            )}
            {(theme.id === 'futuristic' || theme.id === 'synthwave' || theme.id === 'cyberpunk') && (
              <div className="td-cyber-grid-floor" />
            )}
            {theme.id === 'dark-luxury' && <div className="td-luxury-frame-ornament" />}
            {theme.id === 'swiss-grid' && <div className="td-swiss-crosshairs" />}
          </div>

          <div className="td-container td-hero-layout">
            <div className="td-hero-copy">
              <div className="td-theme-badge">{theme.shortLabel}</div>
              <h1 className="td-hero-headline">{SHARED_LANDING_CONTENT.hero.headline}</h1>
              <p className="td-hero-description">{SHARED_LANDING_CONTENT.hero.description}</p>
              <div className="td-hero-actions">
                <button
                  type="button"
                  className="td-btn td-btn-primary"
                  onClick={() =>
                    scrollToSection(
                      'demo-cta',
                      `Ready to get started with the ${theme.name} design system.`
                    )
                  }
                >
                  {SHARED_LANDING_CONTENT.hero.primaryButton}
                </button>
                <button
                  type="button"
                  className="td-btn td-btn-secondary"
                  onClick={() => scrollToSection('demo-features')}
                >
                  {SHARED_LANDING_CONTENT.hero.secondaryButton}
                </button>
              </div>
            </div>

            {/* Theme-specific decorative Hero Visual Showcase */}
            <div className="td-hero-visual" aria-hidden="true">
              <div
                className="td-visual-stage"
                style={
                  theme.id === 'immersive' || theme.id === 'claymorphism'
                    ? {
                        transform: `perspective(900px) rotateY(${pointerOffset.x * 10}deg) rotateX(${
                          pointerOffset.y * -10
                        }deg)`,
                      }
                    : undefined
                }
              >
                <div className="td-visual-layer td-visual-layer-back" />
                <div className="td-visual-layer td-visual-layer-mid">
                  <div className="td-visual-window-bar">
                    <span />
                    <span />
                    <span />
                    <small className="td-visual-window-label">{theme.group}</small>
                  </div>
                  <div className="td-visual-art-grid">
                    <div className="td-visual-block-a" />
                    <div className="td-visual-block-b" />
                    <div className="td-visual-block-c" />
                  </div>
                </div>
                <div className="td-visual-layer td-visual-layer-front">
                  <span className="td-visual-tag">{theme.name}</span>
                  <span className="td-visual-metric">{mode.toUpperCase()} MODE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FEATURES SECTION */}
        <section id="demo-features" className="td-section td-features-section">
          <div className="td-container">
            <div className="td-section-header">
              <span className="td-section-index" aria-hidden="true">
                01
              </span>
              <h2 className="td-section-heading">{SHARED_LANDING_CONTENT.features.heading}</h2>
            </div>

            <div className="td-features-grid">
              {SHARED_LANDING_CONTENT.features.items.map((item, idx) => (
                <article key={item.id} className="td-feature-card">
                  <div className="td-feature-card-top">
                    <span className="td-feature-number" aria-hidden="true">
                      0{idx + 1}
                    </span>
                    <span className="td-feature-icon-glyph" aria-hidden="true">
                      {idx === 0 ? '◇' : idx === 1 ? '◈' : '❖'}
                    </span>
                  </div>
                  <h3 className="td-feature-title">{item.title}</h3>
                  <p className="td-feature-description">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. ABOUT SECTION */}
        <section id="demo-about" className="td-section td-about-section">
          <div className="td-container">
            <div className="td-about-layout">
              <div className="td-about-header">
                <span className="td-section-index" aria-hidden="true">
                  02
                </span>
                <h2 className="td-section-heading">{SHARED_LANDING_CONTENT.about.heading}</h2>
              </div>
              <div className="td-about-body">
                <p className="td-about-description">{SHARED_LANDING_CONTENT.about.description}</p>
                <div className="td-about-traits" aria-label="Theme visual traits">
                  {theme.characteristics.map((trait) => (
                    <span key={trait} className="td-trait-chip">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CALL-TO-ACTION SECTION */}
        <section id="demo-cta" className="td-section td-cta-section">
          <div className="td-container">
            <div className="td-cta-banner">
              <div className="td-cta-content">
                <span className="td-section-index" aria-hidden="true">
                  03
                </span>
                <h2 className="td-cta-heading">{SHARED_LANDING_CONTENT.cta.heading}</h2>
                <p className="td-cta-description">{SHARED_LANDING_CONTENT.cta.description}</p>
                {activeFeedback && (
                  <p className="td-cta-feedback" role="status">
                    {activeFeedback}
                  </p>
                )}
              </div>
              <div className="td-cta-actions">
                <button
                  type="button"
                  className="td-btn td-btn-primary td-btn-large"
                  onClick={() => navigate('/themes')}
                >
                  {SHARED_LANDING_CONTENT.cta.button}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. SHARED FOOTER */}
      <footer className="td-footer">
        <div className="td-container td-footer-inner">
          <div className="td-footer-brand-col">
            <span className="td-footer-brand">{SHARED_LANDING_CONTENT.footer.brandName}</span>
            <p className="td-footer-description">{SHARED_LANDING_CONTENT.footer.description}</p>
          </div>
          <nav className="td-footer-links" aria-label="Footer Navigation">
            <button
              type="button"
              className="td-footer-link td-footer-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              ↑ Top
            </button>
            <Link to="/themes" className="td-footer-link">
              {SHARED_LANDING_CONTENT.footer.links.themes}
            </Link>
            <Link to="/animations" className="td-footer-link">
              {SHARED_LANDING_CONTENT.footer.links.animations}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};
