import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePlatformTheme } from '../context/ThemeContext';
import { useMyList } from '../context/MyListContext';
import { ModeSlideTrack } from './ModeSlideTrack';

interface PlatformLayoutProps {
  children: React.ReactNode;
  showSectionSwitcher?: boolean;
}

export const PlatformLayout: React.FC<PlatformLayoutProps> = ({
  children,
  showSectionSwitcher = true,
}) => {
  const { platformMode, togglePlatformMode } = usePlatformTheme();
  const { totalCount, toastMessage, dismissToast } = useMyList();
  const location = useLocation();

  const isAnimationsActive = location.pathname.startsWith('/animations');
  const isMyListActive = location.pathname.startsWith('/my-list');
  const isThemesActive = !isAnimationsActive && !isMyListActive;

  return (
    <div className="platform-shell" data-mode={platformMode}>
      <div className="platform-frame">
        <header className="platform-header">
          <div className="platform-header-inner">
            <Link to="/" className="platform-brand">
              ThemeLab
            </Link>

            <div className="platform-header-actions">
              <button
                type="button"
                className="platform-mode-toggle"
                onClick={togglePlatformMode}
                aria-label={
                  platformMode === 'light'
                    ? 'Switch platform to dark mode'
                    : 'Switch platform to light mode'
                }
                title={
                  platformMode === 'light'
                    ? 'Switch platform to dark mode'
                    : 'Switch platform to light mode'
                }
              >
                <ModeSlideTrack mode={platformMode} />
              </button>

              {/* Rightmost Header Control: My List */}
              <Link
                to="/my-list"
                className={`platform-mylist-link ${isMyListActive ? 'active' : ''}`}
                aria-label={
                  totalCount > 0 ? `Open My List (${totalCount} saved items)` : 'Open My List'
                }
              >
                <svg
                  className="mylist-header-icon"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                <span className="mylist-header-label">My List</span>
                {totalCount > 0 && (
                  <span className="mylist-count-badge" data-testid="header-mylist-count">
                    {totalCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>

        <main className="platform-main">
          {showSectionSwitcher && (
            <div
              className="platform-section-switcher"
              role="navigation"
              aria-label="Section Switcher"
            >
              <Link
                to="/themes"
                className={`section-switch-tab ${isThemesActive ? 'selected' : ''}`}
                aria-current={isThemesActive ? 'page' : undefined}
              >
                Themes
              </Link>
              <Link
                to="/animations"
                className={`section-switch-tab ${isAnimationsActive ? 'selected' : ''}`}
                aria-current={isAnimationsActive ? 'page' : undefined}
              >
                Animations
              </Link>
            </div>
          )}

          {children}
        </main>

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

        <footer className="platform-footer">
          <div className="platform-footer-inner">
            <div className="platform-footer-brand">
              <strong>ThemeLab</strong>
              <span>Website Theme &amp; Animation Showcase Platform</span>
            </div>
            <div className="platform-footer-links">
              <button
                type="button"
                className="platform-footer-top-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ↑ Top
              </button>
              <Link to="/themes">Themes</Link>
              <Link to="/animations">Animations</Link>
              <Link to="/my-list">My List</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
