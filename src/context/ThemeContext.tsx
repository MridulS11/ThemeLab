/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorMode, THEMES, ThemeId } from '../data/themes';

interface PlatformThemeContextValue {
  platformMode: ColorMode;
  togglePlatformMode: () => void;
  setPlatformMode: (mode: ColorMode) => void;
  getThemeMode: (themeId: ThemeId) => ColorMode;
  toggleThemeMode: (themeId: ThemeId) => void;
  setThemeMode: (themeId: ThemeId, mode: ColorMode) => void;
}

const PlatformThemeContext = createContext<PlatformThemeContextValue | undefined>(undefined);

const PLATFORM_STORAGE_KEY = 'themelab_platform_mode_v1';
const THEME_MODES_STORAGE_KEY = 'themelab_demo_modes_v1';

function getInitialThemeModes(): Record<ThemeId, ColorMode> {
  const defaults = THEMES.reduce(
    (acc, theme) => {
      acc[theme.id] = theme.defaultMode;
      return acc;
    },
    {} as Record<ThemeId, ColorMode>
  );

  try {
    const saved = localStorage.getItem(THEME_MODES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<Record<ThemeId, ColorMode>>;
      return { ...defaults, ...parsed };
    }
  } catch {
    // Ignore storage errors
  }
  return defaults;
}

export const PlatformThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platformMode, setPlatformModeState] = useState<ColorMode>(() => {
    try {
      const saved = localStorage.getItem(PLATFORM_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
    return 'light';
  });

  const [themeModes, setThemeModes] = useState<Record<ThemeId, ColorMode>>(getInitialThemeModes);

  useEffect(() => {
    try {
      localStorage.setItem(PLATFORM_STORAGE_KEY, platformMode);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.setAttribute('data-platform-mode', platformMode);
  }, [platformMode]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_MODES_STORAGE_KEY, JSON.stringify(themeModes));
    } catch {
      // Ignore storage errors
    }
  }, [themeModes]);

  const togglePlatformMode = () => {
    setPlatformModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setPlatformMode = (mode: ColorMode) => {
    setPlatformModeState(mode);
  };

  const getThemeMode = (themeId: ThemeId): ColorMode => {
    return themeModes[themeId] ?? 'light';
  };

  const toggleThemeMode = (themeId: ThemeId) => {
    setThemeModes((prev) => ({
      ...prev,
      [themeId]: prev[themeId] === 'light' ? 'dark' : 'light',
    }));
  };

  const setThemeMode = (themeId: ThemeId, mode: ColorMode) => {
    setThemeModes((prev) => ({
      ...prev,
      [themeId]: mode,
    }));
  };

  return (
    <PlatformThemeContext.Provider
      value={{
        platformMode,
        togglePlatformMode,
        setPlatformMode,
        getThemeMode,
        toggleThemeMode,
        setThemeMode,
      }}
    >
      {children}
    </PlatformThemeContext.Provider>
  );
};

export function usePlatformTheme(): PlatformThemeContextValue {
  const context = useContext(PlatformThemeContext);
  if (!context) {
    throw new Error('usePlatformTheme must be used within a PlatformThemeProvider');
  }
  return context;
}
