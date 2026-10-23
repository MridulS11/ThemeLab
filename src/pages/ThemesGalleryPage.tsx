import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { THEMES, THEME_GROUPS, ThemeGroup } from '../data/themes';
import { ThemeMiniPreview } from '../components/ThemeMiniPreview';
import { usePlatformTheme } from '../context/ThemeContext';
import { useMyList } from '../context/MyListContext';

export const ThemesGalleryPage: React.FC = () => {
  const { getThemeMode } = usePlatformTheme();
  const { isThemeInList, toggleThemeInList } = useMyList();
  const [selectedGroup, setSelectedGroup] = useState<'ALL' | ThemeGroup>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredThemes = useMemo(() => {
    return THEMES.filter((theme) => {
      const matchesGroup = selectedGroup === 'ALL' || theme.group === selectedGroup;
      if (!matchesGroup) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        theme.name.toLowerCase().includes(q) ||
        theme.description.toLowerCase().includes(q) ||
        theme.group.toLowerCase().includes(q) ||
        theme.characteristics.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [selectedGroup, searchQuery]);

  return (
    <section className="gallery-section" aria-labelledby="themes-gallery-heading">
      <div className="gallery-intro">
        <h1 id="themes-gallery-heading" className="gallery-heading">
          Theme Collection
        </h1>
        <p className="gallery-subheading">{THEMES.length} Visual Systems</p>
        <p className="gallery-description">
          Twenty-four distinct visual interpretations of one identical landing page. Select any
          theme to explore its live layout, typography, decorative system, and independent
          light/dark mode.
        </p>
      </div>

      {/* Filter & Search Bar (Contracted by default on mobile with expand/contract button) */}
      <div className="catalogue-toolbar" role="region" aria-label="Filter Themes">
        <div className="catalogue-mobile-bar">
          <span className="catalogue-mobile-summary">
            Showing {filteredThemes.length} of {THEMES.length} Themes
            {selectedGroup !== 'ALL' ? ` • ${selectedGroup}` : ''}
          </span>
          <button
            type="button"
            className="catalogue-mobile-toggle-btn"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            aria-expanded={mobileFiltersOpen}
            aria-controls="themes-filter-panel"
          >
            {mobileFiltersOpen ? 'Hide Filters ▴' : 'Search & Filter ▾'}
          </button>
        </div>

        <div
          id="themes-filter-panel"
          className={`catalogue-collapsible-body ${mobileFiltersOpen ? 'is-open' : ''}`}
        >
          <div className="catalogue-search-row">
            <input
              type="search"
              className="catalogue-search-input"
              placeholder="Search themes by name, style, or visual trait (e.g. Bento, Brutalism, Clay, Neon)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search themes"
            />
            {(selectedGroup !== 'ALL' || searchQuery.trim() !== '') && (
              <button
                type="button"
                className="catalogue-reset-btn"
                onClick={() => {
                  setSelectedGroup('ALL');
                  setSearchQuery('');
                }}
              >
                Reset ({filteredThemes.length}/{THEMES.length})
              </button>
            )}
          </div>

          <div
            className="catalogue-category-pills"
            role="tablist"
            aria-label="Theme Style Families"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedGroup === 'ALL'}
              className={`catalogue-pill ${selectedGroup === 'ALL' ? 'active' : ''}`}
              onClick={() => setSelectedGroup('ALL')}
            >
              All Themes ({THEMES.length})
            </button>
            {THEME_GROUPS.map((group) => {
              const count = THEMES.filter((t) => t.group === group).length;
              const isSelected = selectedGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`catalogue-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedGroup(isSelected ? 'ALL' : group)}
                >
                  {group} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredThemes.length === 0 ? (
        <div className="catalogue-empty">
          <p>No themes matched your filter criteria.</p>
          <button
            type="button"
            className="catalogue-reset-btn"
            onClick={() => {
              setSelectedGroup('ALL');
              setSearchQuery('');
            }}
          >
            Show All {THEMES.length} Themes
          </button>
        </div>
      ) : (
        <div className="gallery-grid">
          {filteredThemes.map((theme) => {
            const currentMode = getThemeMode(theme.id);
            const inList = isThemeInList(theme.id);
            return (
              <article key={theme.id} className="gallery-card" data-theme-card={theme.id}>
                <Link
                  to={`/themes/${theme.id}`}
                  className="gallery-card-link"
                  aria-label={`Open ${theme.name} live demo page`}
                >
                  <div className="gallery-card-preview-wrap">
                    <ThemeMiniPreview theme={theme} mode={currentMode} />
                  </div>

                  <div className="gallery-card-body">
                    <div className="gallery-card-header-row">
                      <span className="gallery-card-kicker">{theme.shortLabel}</span>
                      <span className="gallery-card-mode-tag">{theme.group}</span>
                    </div>

                    <h2 className="gallery-card-title">{theme.name}</h2>
                    <p className="gallery-card-description">{theme.description}</p>

                    <ul
                      className="gallery-card-tags"
                      aria-label={`${theme.name} key characteristics`}
                    >
                      {theme.characteristics.map((trait) => (
                        <li key={trait} className="gallery-card-tag">
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>

                <div className="gallery-card-cta-row">
                  <Link to={`/themes/${theme.id}`} className="gallery-preview-affordance">
                    Open Live Theme Demo <span aria-hidden="true">→</span>
                  </Link>

                  <button
                    type="button"
                    className={`add-to-list-btn ${inList ? 'is-added' : ''}`}
                    onClick={() => toggleThemeInList(theme.id)}
                    aria-pressed={inList}
                    aria-label={
                      inList
                        ? `Remove ${theme.name} theme from My List`
                        : `Add ${theme.name} theme to My List`
                    }
                  >
                    {inList ? '✓ Added to List' : '+ Add to List'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
