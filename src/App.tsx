import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PlatformThemeProvider } from './context/ThemeContext';
import { MyListProvider } from './context/MyListContext';
import { PlatformLayout } from './components/PlatformLayout';
import { HomePage } from './pages/HomePage';
import { ThemesGalleryPage } from './pages/ThemesGalleryPage';
import { ThemeDemoPage } from './pages/ThemeDemoPage';
import { AnimationsPage } from './pages/AnimationsPage';
import { MyListPage } from './pages/MyListPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <PlatformThemeProvider>
      <MyListProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <PlatformLayout>
                  <HomePage />
                </PlatformLayout>
              }
            />
            <Route
              path="/themes"
              element={
                <PlatformLayout>
                  <ThemesGalleryPage />
                </PlatformLayout>
              }
            />
            <Route path="/themes/:themeId" element={<ThemeDemoPage />} />
            <Route
              path="/animations"
              element={
                <PlatformLayout>
                  <AnimationsPage />
                </PlatformLayout>
              }
            />
            <Route
              path="/my-list"
              element={
                <PlatformLayout>
                  <MyListPage />
                </PlatformLayout>
              }
            />
            <Route
              path="*"
              element={
                <PlatformLayout>
                  <HomePage />
                </PlatformLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </MyListProvider>
    </PlatformThemeProvider>
  );
};

export default App;
