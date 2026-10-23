export type ThemeId =
  | 'minimalist'
  | 'dark-luxury'
  | 'futuristic'
  | 'glassmorphism'
  | 'editorial'
  | 'immersive'
  | 'swiss-grid'
  | 'corporate-saas'
  | 'material-design'
  | 'flat-design'
  | 'neumorphism'
  | 'claymorphism'
  | 'skeuomorphism'
  | 'brutalism'
  | 'neo-brutalism'
  | 'maximalism'
  | 'bento-grid'
  | 'collage-mixed'
  | 'hand-drawn'
  | 'synthwave'
  | 'y2k-nostalgia'
  | 'cyberpunk'
  | 'aurora-mesh'
  | 'organic-nature';

export type ColorMode = 'light' | 'dark';

export type ThemeGroup =
  | 'Minimal & Structural'
  | 'Tactile & Dimensional'
  | 'Expressive & Editorial'
  | 'Futuristic & Nostalgic'
  | 'Atmospheric & Organic';

export interface ThemeTokens {
  bgPrimary: string;
  bgSecondary: string;
  bgSurface: string;
  bgElevated: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentPrimary: string;
  accentSecondary: string;
  accentContrast: string;
  borderSubtle: string;
  borderStrong: string;
  shadowCard: string;
  shadowElevated: string;
  heroBackdrop: string;
  badgeBg: string;
  badgeText: string;
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  shortLabel: string;
  group: ThemeGroup;
  description: string;
  defaultMode: ColorMode;
  characteristics: string[];
  typography: {
    fontDisplay: string;
    fontBody: string;
    fontMono: string;
    heroSize: string;
    heroWeight: string;
    heroTracking: string;
    headingTransform: 'none' | 'uppercase';
  };
  layout: {
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusPill: string;
    sectionPadding: string;
    cardBorderWidth: string;
    heroVariant: string;
  };
  tokens: {
    light: ThemeTokens;
    dark: ThemeTokens;
  };
}

export const THEMES: ThemeDefinition[] = [
  /* --------------------------------------------------------------------------
     1. Minimalist (Original)
     -------------------------------------------------------------------------- */
  {
    id: 'minimalist',
    name: 'Minimalist',
    shortLabel: '01 / Pure Space & Calm Restraint',
    group: 'Minimal & Structural',
    description:
      'Clean layouts, generous whitespace, crisp monochrome typography, and subtle structural borders.',
    defaultMode: 'light',
    characteristics: ['Generous Whitespace', 'Hairline Borders', 'Monochrome Calm'],
    typography: {
      fontDisplay: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontBody: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontMono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
      heroSize: 'clamp(2.5rem, 5vw, 4.25rem)',
      heroWeight: '600',
      heroTracking: '-0.04em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '0px',
      radiusMd: '2px',
      radiusLg: '4px',
      radiusPill: '2px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1px',
      heroVariant: 'minimal-grid',
    },
    tokens: {
      light: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8f8f8',
        bgSurface: '#ffffff',
        bgElevated: '#f3f3f3',
        textPrimary: '#111111',
        textSecondary: '#444444',
        textMuted: '#767676',
        accentPrimary: '#111111',
        accentSecondary: '#555555',
        accentContrast: '#ffffff',
        borderSubtle: '#e2e2e2',
        borderStrong: '#111111',
        shadowCard: 'none',
        shadowElevated: '0 8px 24px rgba(0, 0, 0, 0.05)',
        heroBackdrop: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        badgeBg: '#f2f2f2',
        badgeText: '#111111',
      },
      dark: {
        bgPrimary: '#0c0c0c',
        bgSecondary: '#141414',
        bgSurface: '#121212',
        bgElevated: '#1c1c1c',
        textPrimary: '#f5f5f5',
        textSecondary: '#b8b8b8',
        textMuted: '#888888',
        accentPrimary: '#f5f5f5',
        accentSecondary: '#a0a0a0',
        accentContrast: '#0c0c0c',
        borderSubtle: '#2a2a2a',
        borderStrong: '#f5f5f5',
        shadowCard: 'none',
        shadowElevated: '0 8px 24px rgba(0, 0, 0, 0.45)',
        heroBackdrop: 'linear-gradient(180deg, #0c0c0c 0%, #121212 100%)',
        badgeBg: '#1f1f1f',
        badgeText: '#f5f5f5',
      },
    },
  },

  /* --------------------------------------------------------------------------
     2. Dark Luxury (Original)
     -------------------------------------------------------------------------- */
  {
    id: 'dark-luxury',
    name: 'Dark Luxury',
    shortLabel: '02 / Haute Atelier & Warm Gold',
    group: 'Expressive & Editorial',
    description:
      'Refined serif typography, charcoal and alabaster surfaces, restrained metallic gold accents, and poised spacing.',
    defaultMode: 'dark',
    characteristics: ['High-Contrast Serif', 'Champagne Gold Accents', 'Atelier Framing'],
    typography: {
      fontDisplay: '"Playfair Display", "Didot", "Bodoni MT", Georgia, serif',
      fontBody: '"Helvetica Neue", "Inter", Arial, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
      heroWeight: '400',
      heroTracking: '-0.02em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '2px',
      radiusPill: '0px',
      sectionPadding: '6rem',
      cardBorderWidth: '1px',
      heroVariant: 'luxury-centered',
    },
    tokens: {
      dark: {
        bgPrimary: '#0b0a09',
        bgSecondary: '#13110f',
        bgSurface: '#161412',
        bgElevated: '#1e1b18',
        textPrimary: '#f4efe6',
        textSecondary: '#c7bda8',
        textMuted: '#8d8270',
        accentPrimary: '#d4af37',
        accentSecondary: '#aa8825',
        accentContrast: '#0b0a09',
        borderSubtle: 'rgba(212, 175, 55, 0.24)',
        borderStrong: '#d4af37',
        shadowCard: '0 20px 50px rgba(0, 0, 0, 0.6)',
        shadowElevated: '0 24px 64px rgba(0, 0, 0, 0.75)',
        heroBackdrop:
          'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.14) 0%, rgba(11, 10, 9, 0.98) 70%)',
        badgeBg: 'rgba(212, 175, 55, 0.12)',
        badgeText: '#e6c65a',
      },
      light: {
        bgPrimary: '#faf6f0',
        bgSecondary: '#f2ece1',
        bgSurface: '#fffdf9',
        bgElevated: '#efe6d5',
        textPrimary: '#1b1712',
        textSecondary: '#4d4438',
        textMuted: '#7c6f5b',
        accentPrimary: '#8d6b14',
        accentSecondary: '#b8922e',
        accentContrast: '#fffdf9',
        borderSubtle: 'rgba(141, 107, 20, 0.25)',
        borderStrong: '#8d6b14',
        shadowCard: '0 16px 40px rgba(27, 23, 18, 0.06)',
        shadowElevated: '0 24px 56px rgba(27, 23, 18, 0.12)',
        heroBackdrop:
          'radial-gradient(circle at 50% 0%, rgba(184, 146, 46, 0.15) 0%, rgba(250, 246, 240, 1) 70%)',
        badgeBg: 'rgba(141, 107, 20, 0.1)',
        badgeText: '#73560d',
      },
    },
  },

  /* --------------------------------------------------------------------------
     3. Futuristic / Neon (Original)
     -------------------------------------------------------------------------- */
  {
    id: 'futuristic',
    name: 'Futuristic / Neon',
    shortLabel: '03 / Cybernetic Grid & Cyan Pulse',
    group: 'Futuristic & Nostalgic',
    description:
      'High-tech interfaces with electric cyan and violet highlights, glowing borders, and precision telemetry details.',
    defaultMode: 'dark',
    characteristics: ['Neon Glow Borders', 'Cybernetic Telemetry', 'Electric Cyan & Violet'],
    typography: {
      fontDisplay: '"Space Grotesk", "Trebuchet MS", "Inter", sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.5rem, 5.2vw, 4.4rem)',
      heroWeight: '700',
      heroTracking: '-0.03em',
      headingTransform: 'uppercase',
    },
    layout: {
      radiusSm: '4px',
      radiusMd: '8px',
      radiusLg: '12px',
      radiusPill: '4px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1px',
      heroVariant: 'neon-cyber',
    },
    tokens: {
      dark: {
        bgPrimary: '#050711',
        bgSecondary: '#090d1f',
        bgSurface: 'rgba(13, 19, 42, 0.85)',
        bgElevated: '#111936',
        textPrimary: '#e8f7ff',
        textSecondary: '#94b8d7',
        textMuted: '#5d7c99',
        accentPrimary: '#00f0ff',
        accentSecondary: '#9d4edd',
        accentContrast: '#040711',
        borderSubtle: 'rgba(0, 240, 255, 0.25)',
        borderStrong: '#00f0ff',
        shadowCard: '0 0 28px rgba(0, 240, 255, 0.14), inset 0 0 12px rgba(157, 78, 221, 0.08)',
        shadowElevated: '0 0 42px rgba(0, 240, 255, 0.28)',
        heroBackdrop:
          'radial-gradient(circle at 80% 20%, rgba(157, 78, 221, 0.22) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(0, 240, 255, 0.18) 0%, transparent 50%), #050711',
        badgeBg: 'rgba(0, 240, 255, 0.12)',
        badgeText: '#00f0ff',
      },
      light: {
        bgPrimary: '#eef6ff',
        bgSecondary: '#e0eeff',
        bgSurface: '#ffffff',
        bgElevated: '#d8eaff',
        textPrimary: '#07132c',
        textSecondary: '#23406e',
        textMuted: '#526f9a',
        accentPrimary: '#0066ff',
        accentSecondary: '#7b2cbf',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(0, 102, 255, 0.28)',
        borderStrong: '#0066ff',
        shadowCard: '0 8px 28px rgba(0, 102, 255, 0.12)',
        shadowElevated: '0 12px 36px rgba(123, 44, 191, 0.2)',
        heroBackdrop:
          'radial-gradient(circle at 80% 20%, rgba(123, 44, 191, 0.14) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(0, 102, 255, 0.15) 0%, transparent 50%), #eef6ff',
        badgeBg: 'rgba(0, 102, 255, 0.12)',
        badgeText: '#0050cc',
      },
    },
  },

  /* --------------------------------------------------------------------------
     4. Glassmorphism (Original)
     -------------------------------------------------------------------------- */
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    shortLabel: '04 / Frosted Acrylic & Mesh Orbs',
    group: 'Atmospheric & Organic',
    description:
      'Layered translucent surfaces, frosted-glass blur effects, luminous specular borders, and controlled mesh gradients.',
    defaultMode: 'light',
    characteristics: ['Backdrop Blur Surfaces', 'Specular Highlight Borders', 'Ambient Mesh Orbs'],
    typography: {
      fontDisplay: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      fontBody: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.5rem, 5vw, 4.25rem)',
      heroWeight: '700',
      heroTracking: '-0.03em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '12px',
      radiusMd: '20px',
      radiusLg: '28px',
      radiusPill: '999px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1px',
      heroVariant: 'glass-layered',
    },
    tokens: {
      light: {
        bgPrimary: '#edf2fb',
        bgSecondary: '#e2eafc',
        bgSurface: 'rgba(255, 255, 255, 0.62)',
        bgElevated: 'rgba(255, 255, 255, 0.82)',
        textPrimary: '#0f172a',
        textSecondary: '#334155',
        textMuted: '#64748b',
        accentPrimary: '#3b82f6',
        accentSecondary: '#ec4899',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(255, 255, 255, 0.75)',
        borderStrong: 'rgba(59, 130, 246, 0.55)',
        shadowCard: '0 16px 40px rgba(31, 38, 135, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
        shadowElevated: '0 24px 56px rgba(31, 38, 135, 0.16)',
        heroBackdrop:
          'radial-gradient(circle at 18% 22%, rgba(59, 130, 246, 0.28) 0%, transparent 42%), radial-gradient(circle at 82% 28%, rgba(236, 72, 153, 0.24) 0%, transparent 42%), radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 45%), #edf2fb',
        badgeBg: 'rgba(255, 255, 255, 0.72)',
        badgeText: '#1d4ed8',
      },
      dark: {
        bgPrimary: '#0b1120',
        bgSecondary: '#111827',
        bgSurface: 'rgba(30, 41, 59, 0.54)',
        bgElevated: 'rgba(51, 65, 85, 0.65)',
        textPrimary: '#f8fafc',
        textSecondary: '#cbd5e1',
        textMuted: '#94a3b8',
        accentPrimary: '#60a5fa',
        accentSecondary: '#f472b6',
        accentContrast: '#0b1120',
        borderSubtle: 'rgba(255, 255, 255, 0.16)',
        borderStrong: 'rgba(96, 165, 250, 0.6)',
        shadowCard: '0 20px 48px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.18)',
        shadowElevated: '0 28px 64px rgba(0, 0, 0, 0.6)',
        heroBackdrop:
          'radial-gradient(circle at 18% 22%, rgba(59, 130, 246, 0.32) 0%, transparent 42%), radial-gradient(circle at 82% 28%, rgba(236, 72, 153, 0.28) 0%, transparent 42%), radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.22) 0%, transparent 45%), #0b1120',
        badgeBg: 'rgba(255, 255, 255, 0.1)',
        badgeText: '#93c5fd',
      },
    },
  },

  /* --------------------------------------------------------------------------
     5. Editorial / Bold Typography (Original)
     -------------------------------------------------------------------------- */
  {
    id: 'editorial',
    name: 'Editorial / Bold Typography',
    shortLabel: '05 / Broadsheet Scale & Vermilion Ink',
    group: 'Expressive & Editorial',
    description:
      'Expressive display headlines, asymmetric magazine-style compositions, high-impact contrast, and bold structural rules.',
    defaultMode: 'light',
    characteristics: ['Expressive Display Scale', 'Asymmetric Editorial Columns', 'Bold Ink Rules'],
    typography: {
      fontDisplay: '"Georgia", "Times New Roman", Times, serif',
      fontBody: '"Inter", "Helvetica Neue", Arial, sans-serif',
      fontMono: '"Courier New", Courier, monospace',
      heroSize: 'clamp(3rem, 6.2vw, 5.4rem)',
      heroWeight: '800',
      heroTracking: '-0.04em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      radiusPill: '0px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '2px',
      heroVariant: 'editorial-asymmetric',
    },
    tokens: {
      light: {
        bgPrimary: '#f5f0e6',
        bgSecondary: '#ebe3d5',
        bgSurface: '#faf6ee',
        bgElevated: '#e4dac8',
        textPrimary: '#12100e',
        textSecondary: '#2e2924',
        textMuted: '#63594f',
        accentPrimary: '#d9381e',
        accentSecondary: '#12100e',
        accentContrast: '#faf6ee',
        borderSubtle: '#c4b9a5',
        borderStrong: '#12100e',
        shadowCard: '6px 6px 0px #12100e',
        shadowElevated: '10px 10px 0px #d9381e',
        heroBackdrop: 'linear-gradient(180deg, #f5f0e6 0%, #efe8da 100%)',
        badgeBg: '#d9381e',
        badgeText: '#faf6ee',
      },
      dark: {
        bgPrimary: '#141210',
        bgSecondary: '#1c1916',
        bgSurface: '#1f1b18',
        bgElevated: '#292420',
        textPrimary: '#f5efe4',
        textSecondary: '#d1c7b7',
        textMuted: '#998e7d',
        accentPrimary: '#ff5436',
        accentSecondary: '#f5efe4',
        accentContrast: '#141210',
        borderSubtle: '#3d362f',
        borderStrong: '#f5efe4',
        shadowCard: '6px 6px 0px #ff5436',
        shadowElevated: '10px 10px 0px #f5efe4',
        heroBackdrop: 'linear-gradient(180deg, #141210 0%, #1c1916 100%)',
        badgeBg: '#ff5436',
        badgeText: '#141210',
      },
    },
  },

  /* --------------------------------------------------------------------------
     6. 3D / Immersive (Original)
     -------------------------------------------------------------------------- */
  {
    id: 'immersive',
    name: '3D / Immersive',
    shortLabel: '06 / Spatial Perspective & Depth Layers',
    group: 'Tactile & Dimensional',
    description:
      'Spatial depth, interactive perspective planes, layered floating cards, and tactile multi-axis elevation.',
    defaultMode: 'dark',
    characteristics: ['3D Perspective Planes', 'Multi-Layer Depth', 'Interactive Spatial Tilt'],
    typography: {
      fontDisplay: '"Inter", system-ui, -apple-system, sans-serif',
      fontBody: '"Inter", system-ui, -apple-system, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.6rem, 5.4vw, 4.5rem)',
      heroWeight: '800',
      heroTracking: '-0.035em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '10px',
      radiusMd: '18px',
      radiusLg: '24px',
      radiusPill: '999px',
      sectionPadding: '6rem',
      cardBorderWidth: '1px',
      heroVariant: 'immersive-depth',
    },
    tokens: {
      dark: {
        bgPrimary: '#090714',
        bgSecondary: '#110e24',
        bgSurface: '#171332',
        bgElevated: '#221c47',
        textPrimary: '#f3f0ff',
        textSecondary: '#c0b6f2',
        textMuted: '#8376b8',
        accentPrimary: '#8b5cf6',
        accentSecondary: '#38bdf8',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(139, 92, 246, 0.3)',
        borderStrong: '#8b5cf6',
        shadowCard:
          '0 22px 44px -12px rgba(5, 3, 15, 0.85), 0 -1px 0 0 rgba(255, 255, 255, 0.18) inset, 0 8px 0 0 rgba(88, 28, 135, 0.45)',
        shadowElevated:
          '0 32px 64px -12px rgba(5, 3, 15, 0.95), 0 -1px 0 0 rgba(255, 255, 255, 0.25) inset, 0 12px 0 0 rgba(139, 92, 246, 0.5)',
        heroBackdrop:
          'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.35) 0%, rgba(56, 189, 248, 0.14) 40%, #090714 78%)',
        badgeBg: 'rgba(139, 92, 246, 0.2)',
        badgeText: '#ddd6fe',
      },
      light: {
        bgPrimary: '#f3f1ff',
        bgSecondary: '#e8e4ff',
        bgSurface: '#ffffff',
        bgElevated: '#ede9fe',
        textPrimary: '#171133',
        textSecondary: '#3e3370',
        textMuted: '#6d61a6',
        accentPrimary: '#6d28d9',
        accentSecondary: '#0284c7',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(109, 40, 217, 0.25)',
        borderStrong: '#6d28d9',
        shadowCard:
          '0 20px 38px -12px rgba(109, 40, 217, 0.22), 0 -1px 0 0 rgba(255, 255, 255, 0.9) inset, 0 6px 0 0 rgba(109, 40, 217, 0.18)',
        shadowElevated:
          '0 28px 54px -12px rgba(109, 40, 217, 0.32), 0 10px 0 0 rgba(109, 40, 217, 0.26)',
        heroBackdrop:
          'radial-gradient(ellipse at 50% 0%, rgba(109, 40, 217, 0.18) 0%, rgba(2, 132, 199, 0.12) 40%, #f3f1ff 78%)',
        badgeBg: 'rgba(109, 40, 217, 0.12)',
        badgeText: '#5b21b6',
      },
    },
  },

  /* --------------------------------------------------------------------------
     7. Swiss / International Typographic Style (New)
     -------------------------------------------------------------------------- */
  {
    id: 'swiss-grid',
    name: 'Swiss / International Typographic',
    shortLabel: '07 / Josef Müller-Brockmann Modular Grid',
    group: 'Minimal & Structural',
    description:
      'Mathematical modular grids, flush-left neo-grotesque typography, stark structural rules, and iconic Swiss International red accents.',
    defaultMode: 'light',
    characteristics: ['Exposed Modular Grid', 'Neo-Grotesque Sans', 'Swiss Red Accents'],
    typography: {
      fontDisplay: '"Helvetica Neue", Helvetica, "Inter", Arial, sans-serif',
      fontBody: '"Helvetica Neue", Helvetica, "Inter", Arial, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.8rem, 5.8vw, 5rem)',
      heroWeight: '800',
      heroTracking: '-0.045em',
      headingTransform: 'uppercase',
    },
    layout: {
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      radiusPill: '0px',
      sectionPadding: '5rem',
      cardBorderWidth: '2px',
      heroVariant: 'swiss-modular',
    },
    tokens: {
      light: {
        bgPrimary: '#f4f3ef',
        bgSecondary: '#eae8e1',
        bgSurface: '#f4f3ef',
        bgElevated: '#e2dfd7',
        textPrimary: '#0d0d0d',
        textSecondary: '#262626',
        textMuted: '#595959',
        accentPrimary: '#e62e25',
        accentSecondary: '#0d0d0d',
        accentContrast: '#ffffff',
        borderSubtle: '#0d0d0d',
        borderStrong: '#0d0d0d',
        shadowCard: 'none',
        shadowElevated: '6px 6px 0px #e62e25',
        heroBackdrop: '#f4f3ef',
        badgeBg: '#e62e25',
        badgeText: '#ffffff',
      },
      dark: {
        bgPrimary: '#111111',
        bgSecondary: '#181818',
        bgSurface: '#141414',
        bgElevated: '#222222',
        textPrimary: '#f2f0ea',
        textSecondary: '#c7c5be',
        textMuted: '#8a8882',
        accentPrimary: '#ff3b30',
        accentSecondary: '#f2f0ea',
        accentContrast: '#111111',
        borderSubtle: '#f2f0ea',
        borderStrong: '#ff3b30',
        shadowCard: 'none',
        shadowElevated: '6px 6px 0px #ff3b30',
        heroBackdrop: '#111111',
        badgeBg: '#ff3b30',
        badgeText: '#111111',
      },
    },
  },

  /* --------------------------------------------------------------------------
     8. Corporate / SaaS (New)
     -------------------------------------------------------------------------- */
  {
    id: 'corporate-saas',
    name: 'Corporate / SaaS',
    shortLabel: '08 / Enterprise Clarity & Trust',
    group: 'Minimal & Structural',
    description:
      'Polished B2B software presentation with trustworthy cobalt-indigo accents, structured metric cards, and balanced elevation.',
    defaultMode: 'light',
    characteristics: ['Enterprise Indigo Palette', 'Soft Card Elevation', 'High-Clarity UI'],
    typography: {
      fontDisplay: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      fontBody: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.4rem, 4.8vw, 3.9rem)',
      heroWeight: '700',
      heroTracking: '-0.03em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '6px',
      radiusMd: '10px',
      radiusLg: '14px',
      radiusPill: '8px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1px',
      heroVariant: 'saas-split',
    },
    tokens: {
      light: {
        bgPrimary: '#f8fafc',
        bgSecondary: '#f1f5f9',
        bgSurface: '#ffffff',
        bgElevated: '#f1f5f9',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        textMuted: '#64748b',
        accentPrimary: '#4f46e5',
        accentSecondary: '#0ea5e9',
        accentContrast: '#ffffff',
        borderSubtle: '#e2e8f0',
        borderStrong: '#4f46e5',
        shadowCard: '0 4px 12px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.06)',
        shadowElevated: '0 12px 28px rgba(79, 70, 229, 0.18)',
        heroBackdrop: 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)',
        badgeBg: '#e0e7ff',
        badgeText: '#3730a3',
      },
      dark: {
        bgPrimary: '#0b0f19',
        bgSecondary: '#111827',
        bgSurface: '#161f33',
        bgElevated: '#1e293b',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        textMuted: '#64748b',
        accentPrimary: '#6366f1',
        accentSecondary: '#38bdf8',
        accentContrast: '#ffffff',
        borderSubtle: '#1e293b',
        borderStrong: '#6366f1',
        shadowCard: '0 8px 24px rgba(0, 0, 0, 0.35)',
        shadowElevated: '0 14px 32px rgba(99, 102, 241, 0.28)',
        heroBackdrop: 'linear-gradient(180deg, #111827 0%, #0b0f19 100%)',
        badgeBg: 'rgba(99, 102, 241, 0.18)',
        badgeText: '#a5b4fc',
      },
    },
  },

  /* --------------------------------------------------------------------------
     9. Modern Material Design (New)
     -------------------------------------------------------------------------- */
  {
    id: 'material-design',
    name: 'Modern Material Design',
    shortLabel: '09 / Material You Tonal Surfaces',
    group: 'Minimal & Structural',
    description:
      'Adaptive tonal surface containers, generous 28px pill geometry, state-layer elevation, and friendly geometric typography.',
    defaultMode: 'light',
    characteristics: ['Tonal Surface Containers', 'Pill Action Geometry', 'Adaptive State Layers'],
    typography: {
      fontDisplay: '"Roboto", "Google Sans", "Inter", system-ui, sans-serif',
      fontBody: '"Roboto", "Inter", system-ui, sans-serif',
      fontMono: '"Roboto Mono", monospace',
      heroSize: 'clamp(2.5rem, 5vw, 4.2rem)',
      heroWeight: '700',
      heroTracking: '-0.02em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '16px',
      radiusMd: '24px',
      radiusLg: '32px',
      radiusPill: '999px',
      sectionPadding: '5rem',
      cardBorderWidth: '1px',
      heroVariant: 'material-tonal',
    },
    tokens: {
      light: {
        bgPrimary: '#fef7ff',
        bgSecondary: '#f3edf7',
        bgSurface: '#f7f2fa',
        bgElevated: '#eaddff',
        textPrimary: '#1d1b20',
        textSecondary: '#49454f',
        textMuted: '#79747e',
        accentPrimary: '#6750a4',
        accentSecondary: '#7d5260',
        accentContrast: '#ffffff',
        borderSubtle: '#cac4d0',
        borderStrong: '#6750a4',
        shadowCard: '0 2px 6px 2px rgba(29, 27, 32, 0.08)',
        shadowElevated: '0 8px 18px 4px rgba(103, 80, 164, 0.18)',
        heroBackdrop: 'linear-gradient(135deg, #f3edf7 0%, #fef7ff 100%)',
        badgeBg: '#eaddff',
        badgeText: '#21005d',
      },
      dark: {
        bgPrimary: '#141218',
        bgSecondary: '#1d1b20',
        bgSurface: '#211f26',
        bgElevated: '#2b2930',
        textPrimary: '#e6e0e9',
        textSecondary: '#cac4d0',
        textMuted: '#938f99',
        accentPrimary: '#d0bcff',
        accentSecondary: '#efb8c8',
        accentContrast: '#381e72',
        borderSubtle: '#49454f',
        borderStrong: '#d0bcff',
        shadowCard: '0 4px 12px rgba(0, 0, 0, 0.4)',
        shadowElevated: '0 10px 24px rgba(208, 188, 255, 0.2)',
        heroBackdrop: 'linear-gradient(135deg, #211f26 0%, #141218 100%)',
        badgeBg: '#4f378b',
        badgeText: '#eaddff',
      },
    },
  },

  /* --------------------------------------------------------------------------
     10. Flat Design / Flat 2.0 (New)
     -------------------------------------------------------------------------- */
  {
    id: 'flat-design',
    name: 'Flat Design / Flat 2.0',
    shortLabel: '10 / Crisp Vector Blocks & Solid Color',
    group: 'Minimal & Structural',
    description:
      'Zero-blur solid color planes, bold iconographic hierarchy, crisp edge-to-edge blocks, and subtle Flat 2.0 layering.',
    defaultMode: 'light',
    characteristics: ['Zero-Blur Solid Surfaces', 'Primary Vector Blocks', 'Crisp Flat 2.0 Hierarchy'],
    typography: {
      fontDisplay: '"Montserrat", "Inter", system-ui, sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.5rem, 5vw, 4.2rem)',
      heroWeight: '800',
      heroTracking: '-0.025em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '4px',
      radiusMd: '8px',
      radiusLg: '10px',
      radiusPill: '6px',
      sectionPadding: '5rem',
      cardBorderWidth: '0px',
      heroVariant: 'flat-vector',
    },
    tokens: {
      light: {
        bgPrimary: '#ecf0f1',
        bgSecondary: '#dfe6e9',
        bgSurface: '#ffffff',
        bgElevated: '#d5dbdb',
        textPrimary: '#2c3e50',
        textSecondary: '#34495e',
        textMuted: '#7f8c8d',
        accentPrimary: '#2980b9',
        accentSecondary: '#e74c3c',
        accentContrast: '#ffffff',
        borderSubtle: '#bdc3c7',
        borderStrong: '#2980b9',
        shadowCard: '0 4px 0px #bdc3c7',
        shadowElevated: '0 6px 0px #1f618d',
        heroBackdrop: '#ecf0f1',
        badgeBg: '#2ecc71',
        badgeText: '#ffffff',
      },
      dark: {
        bgPrimary: '#1e272e',
        bgSecondary: '#2f3640',
        bgSurface: '#2f3640',
        bgElevated: '#353b48',
        textPrimary: '#f5f6fa',
        textSecondary: '#dcdde1',
        textMuted: '#7f8fa6',
        accentPrimary: '#00a8ff',
        accentSecondary: '#e84118',
        accentContrast: '#1e272e',
        borderSubtle: '#353b48',
        borderStrong: '#00a8ff',
        shadowCard: '0 4px 0px #141a1f',
        shadowElevated: '0 6px 0px #0097e6',
        heroBackdrop: '#1e272e',
        badgeBg: '#4cd137',
        badgeText: '#1e272e',
      },
    },
  },

  /* --------------------------------------------------------------------------
     11. Neumorphism (New)
     -------------------------------------------------------------------------- */
  {
    id: 'neumorphism',
    name: 'Neumorphism',
    shortLabel: '11 / Extruded Soft UI & Dual Shadows',
    group: 'Tactile & Dimensional',
    description:
      'Monochromatic extruded surfaces sculpted with opposing light and dark drop shadows and recessed tactile wells.',
    defaultMode: 'light',
    characteristics: ['Dual Opposing Shadows', 'Extruded Soft Surfaces', 'Recessed Tactile Wells'],
    typography: {
      fontDisplay: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontBody: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.4rem, 4.8vw, 4rem)',
      heroWeight: '700',
      heroTracking: '-0.03em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '14px',
      radiusMd: '22px',
      radiusLg: '30px',
      radiusPill: '999px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1px',
      heroVariant: 'neumorphic-soft',
    },
    tokens: {
      light: {
        bgPrimary: '#e0e5ec',
        bgSecondary: '#e0e5ec',
        bgSurface: '#e0e5ec',
        bgElevated: '#e6ebf2',
        textPrimary: '#2d3748',
        textSecondary: '#4a5568',
        textMuted: '#718096',
        accentPrimary: '#4c51bf',
        accentSecondary: '#38b2ac',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(255, 255, 255, 0.65)',
        borderStrong: 'rgba(163, 177, 198, 0.7)',
        shadowCard: '9px 9px 18px #a3b1c6, -9px -9px 18px #ffffff',
        shadowElevated: '14px 14px 28px #a3b1c6, -14px -14px 28px #ffffff',
        heroBackdrop: '#e0e5ec',
        badgeBg: '#e0e5ec',
        badgeText: '#4c51bf',
      },
      dark: {
        bgPrimary: '#242933',
        bgSecondary: '#242933',
        bgSurface: '#242933',
        bgElevated: '#2a303c',
        textPrimary: '#e2e8f0',
        textSecondary: '#a0aec0',
        textMuted: '#718096',
        accentPrimary: '#7f9cf5',
        accentSecondary: '#4fd1c5',
        accentContrast: '#1a202c',
        borderSubtle: 'rgba(255, 255, 255, 0.05)',
        borderStrong: 'rgba(15, 18, 24, 0.8)',
        shadowCard: '8px 8px 16px #181b22, -8px -8px 16px #303744',
        shadowElevated: '12px 12px 24px #161920, -12px -12px 24px #323946',
        heroBackdrop: '#242933',
        badgeBg: '#242933',
        badgeText: '#7f9cf5',
      },
    },
  },

  /* --------------------------------------------------------------------------
     12. Claymorphism (New)
     -------------------------------------------------------------------------- */
  {
    id: 'claymorphism',
    name: 'Claymorphism',
    shortLabel: '12 / Inflated 3D Matte Clay & Inner Glow',
    group: 'Tactile & Dimensional',
    description:
      'Friendly inflated 3D containers with generous 36px radii, multi-layered inner rim shadows, and buoyant pastel depth.',
    defaultMode: 'light',
    characteristics: ['Inflated Inner Shadows', 'Buoyant 36px Radii', 'Matte Clay Surfaces'],
    typography: {
      fontDisplay: '"Fredoka", "Nunito", "Plus Jakarta Sans", sans-serif',
      fontBody: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.5rem, 5vw, 4.2rem)',
      heroWeight: '800',
      heroTracking: '-0.025em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '20px',
      radiusMd: '28px',
      radiusLg: '36px',
      radiusPill: '999px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '2px',
      heroVariant: 'clay-buoyant',
    },
    tokens: {
      light: {
        bgPrimary: '#f0f4ff',
        bgSecondary: '#e5edff',
        bgSurface: '#ffffff',
        bgElevated: '#f5f8ff',
        textPrimary: '#1e1b4b',
        textSecondary: '#3730a3',
        textMuted: '#6366f1',
        accentPrimary: '#ff6b6b',
        accentSecondary: '#6366f1',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(255, 255, 255, 0.9)',
        borderStrong: '#c7d2fe',
        shadowCard:
          '0 18px 36px rgba(99, 102, 241, 0.16), inset -6px -6px 14px rgba(99, 102, 241, 0.14), inset 6px 6px 14px rgba(255, 255, 255, 0.95)',
        shadowElevated:
          '0 24px 44px rgba(255, 107, 107, 0.25), inset -6px -6px 14px rgba(0, 0, 0, 0.12), inset 6px 6px 14px rgba(255, 255, 255, 0.6)',
        heroBackdrop: 'radial-gradient(circle at 80% 20%, #fde2e4 0%, #f0f4ff 65%)',
        badgeBg: '#ffe3e3',
        badgeText: '#c92a2a',
      },
      dark: {
        bgPrimary: '#18142c',
        bgSecondary: '#211c3a',
        bgSurface: '#282246',
        bgElevated: '#332b59',
        textPrimary: '#f5f3ff',
        textSecondary: '#c4b5fd',
        textMuted: '#8b5cf6',
        accentPrimary: '#ff758f',
        accentSecondary: '#818cf8',
        accentContrast: '#18142c',
        borderSubtle: 'rgba(255, 255, 255, 0.12)',
        borderStrong: '#818cf8',
        shadowCard:
          '0 20px 38px rgba(0, 0, 0, 0.55), inset -6px -6px 16px rgba(10, 8, 22, 0.7), inset 6px 6px 14px rgba(255, 255, 255, 0.12)',
        shadowElevated:
          '0 26px 48px rgba(0, 0, 0, 0.7), inset -6px -6px 14px rgba(0, 0, 0, 0.5), inset 6px 6px 14px rgba(255, 255, 255, 0.2)',
        heroBackdrop: 'radial-gradient(circle at 80% 20%, #2d1e3e 0%, #18142c 65%)',
        badgeBg: 'rgba(255, 117, 143, 0.2)',
        badgeText: '#ffccd5',
      },
    },
  },

  /* --------------------------------------------------------------------------
     13. Skeuomorphism (New)
     -------------------------------------------------------------------------- */
  {
    id: 'skeuomorphism',
    name: 'Skeuomorphism',
    shortLabel: '13 / Tactile Hardware Bezels & Physical LEDs',
    group: 'Tactile & Dimensional',
    description:
      'Real-world studio hardware cues featuring brushed metallic bevels, recessed display screens, physical push-buttons, and warm LED indicators.',
    defaultMode: 'dark',
    characteristics: ['Beveled Hardware Surfaces', 'Recessed Display Wells', 'Tactile Push Controls'],
    typography: {
      fontDisplay: '"Helvetica Neue", "Lucida Grande", Arial, sans-serif',
      fontBody: '"Helvetica Neue", "Lucida Grande", Arial, sans-serif',
      fontMono: '"Courier New", Consolas, monospace',
      heroSize: 'clamp(2.35rem, 4.6vw, 3.85rem)',
      heroWeight: '700',
      heroTracking: '-0.02em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '6px',
      radiusMd: '10px',
      radiusLg: '14px',
      radiusPill: '8px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1px',
      heroVariant: 'skeuo-hardware',
    },
    tokens: {
      dark: {
        bgPrimary: '#1c1d21',
        bgSecondary: '#151619',
        bgSurface: '#282a30',
        bgElevated: '#32353d',
        textPrimary: '#eceef2',
        textSecondary: '#b0b5c0',
        textMuted: '#7b818f',
        accentPrimary: '#ff8c00',
        accentSecondary: '#32cd32',
        accentContrast: '#111111',
        borderSubtle: '#111215',
        borderStrong: '#4a4e59',
        shadowCard:
          'inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(0, 0, 0, 0.7), 0 8px 18px rgba(0, 0, 0, 0.65)',
        shadowElevated:
          'inset 0 1px 1px rgba(255, 255, 255, 0.35), 0 12px 24px rgba(0, 0, 0, 0.8), 0 0 12px rgba(255, 140, 0, 0.35)',
        heroBackdrop: 'linear-gradient(180deg, #26282e 0%, #18191d 100%)',
        badgeBg: '#121316',
        badgeText: '#ff9f1c',
      },
      light: {
        bgPrimary: '#d9dde2',
        bgSecondary: '#cbd0d6',
        bgSurface: '#eceff2',
        bgElevated: '#f7f9fa',
        textPrimary: '#1f2328',
        textSecondary: '#3e444c',
        textMuted: '#636b75',
        accentPrimary: '#d95f02',
        accentSecondary: '#1b9e77',
        accentContrast: '#ffffff',
        borderSubtle: '#a8b0b9',
        borderStrong: '#7d8691',
        shadowCard:
          'inset 0 1px 0 #ffffff, inset 0 -1px 0 #b8c0c8, 0 5px 12px rgba(0, 0, 0, 0.15)',
        shadowElevated:
          'inset 0 1px 0 #ffffff, 0 8px 20px rgba(0, 0, 0, 0.22)',
        heroBackdrop: 'linear-gradient(180deg, #e6eaee 0%, #cfd5dc 100%)',
        badgeBg: '#22262b',
        badgeText: '#52ff00',
      },
    },
  },

  /* --------------------------------------------------------------------------
     14. Brutalism (New)
     -------------------------------------------------------------------------- */
  {
    id: 'brutalism',
    name: 'Brutalism',
    shortLabel: '14 / Raw Monospace & Exposed Structure',
    group: 'Expressive & Editorial',
    description:
      'Unfiltered web brutalism with exposed structural borders, raw monospace/grotesque typography, stark hazard contrast, and zero ornamental polish.',
    defaultMode: 'light',
    characteristics: ['Raw Monospace Type', '3px Exposed Rules', 'Utilitarian Contrast'],
    typography: {
      fontDisplay: '"Courier New", Consolas, "SFMono-Regular", monospace',
      fontBody: '"Courier New", Consolas, "SFMono-Regular", monospace',
      fontMono: '"Courier New", Consolas, monospace',
      heroSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
      heroWeight: '800',
      heroTracking: '-0.03em',
      headingTransform: 'uppercase',
    },
    layout: {
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      radiusPill: '0px',
      sectionPadding: '4.5rem',
      cardBorderWidth: '3px',
      heroVariant: 'brutalist-raw',
    },
    tokens: {
      light: {
        bgPrimary: '#ffffff',
        bgSecondary: '#f0f0f0',
        bgSurface: '#ffffff',
        bgElevated: '#ffea00',
        textPrimary: '#000000',
        textSecondary: '#000000',
        textMuted: '#333333',
        accentPrimary: '#0000ff',
        accentSecondary: '#ff0000',
        accentContrast: '#ffffff',
        borderSubtle: '#000000',
        borderStrong: '#000000',
        shadowCard: 'none',
        shadowElevated: '8px 8px 0px #000000',
        heroBackdrop: '#ffffff',
        badgeBg: '#ffea00',
        badgeText: '#000000',
      },
      dark: {
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        bgSurface: '#000000',
        bgElevated: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e5e5e5',
        textMuted: '#a0a0a0',
        accentPrimary: '#ccff00',
        accentSecondary: '#ff0055',
        accentContrast: '#000000',
        borderSubtle: '#ffffff',
        borderStrong: '#ccff00',
        shadowCard: 'none',
        shadowElevated: '8px 8px 0px #ccff00',
        heroBackdrop: '#000000',
        badgeBg: '#ccff00',
        badgeText: '#000000',
      },
    },
  },

  /* --------------------------------------------------------------------------
     15. Neo-brutalism (New)
     -------------------------------------------------------------------------- */
  {
    id: 'neo-brutalism',
    name: 'Neo-brutalism',
    shortLabel: '15 / Bold Ink Outlines & Hard Offset Shadows',
    group: 'Expressive & Editorial',
    description:
      'Playful modern editorial blocks pairing warm saturated fills with crisp 2.5px black outlines and hard non-blurred offset shadows.',
    defaultMode: 'light',
    characteristics: ['Hard Offset Shadows', 'Bold Black Outlines', 'Saturated Pop Fills'],
    typography: {
      fontDisplay: '"Space Grotesk", "Inter", system-ui, sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"JetBrains Mono", Consolas, monospace',
      heroSize: 'clamp(2.6rem, 5.4vw, 4.6rem)',
      heroWeight: '800',
      heroTracking: '-0.035em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '6px',
      radiusMd: '12px',
      radiusLg: '16px',
      radiusPill: '999px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '2.5px',
      heroVariant: 'neobrutal-pop',
    },
    tokens: {
      light: {
        bgPrimary: '#fffbeb',
        bgSecondary: '#fef3c7',
        bgSurface: '#ffffff',
        bgElevated: '#fde68a',
        textPrimary: '#111111',
        textSecondary: '#27272a',
        textMuted: '#52525b',
        accentPrimary: '#ff5722',
        accentSecondary: '#8b5cf6',
        accentContrast: '#ffffff',
        borderSubtle: '#111111',
        borderStrong: '#111111',
        shadowCard: '6px 6px 0px #111111',
        shadowElevated: '9px 9px 0px #111111',
        heroBackdrop: '#fffbeb',
        badgeBg: '#a7f3d0',
        badgeText: '#111111',
      },
      dark: {
        bgPrimary: '#18181b',
        bgSecondary: '#27272a',
        bgSurface: '#27272a',
        bgElevated: '#3f3f46',
        textPrimary: '#fafafa',
        textSecondary: '#e4e4e7',
        textMuted: '#a1a1aa',
        accentPrimary: '#facc15',
        accentSecondary: '#f472b6',
        accentContrast: '#111111',
        borderSubtle: '#fafafa',
        borderStrong: '#facc15',
        shadowCard: '6px 6px 0px #facc15',
        shadowElevated: '9px 9px 0px #f472b6',
        heroBackdrop: '#18181b',
        badgeBg: '#f472b6',
        badgeText: '#111111',
      },
    },
  },

  /* --------------------------------------------------------------------------
     16. Maximalism / Dopamine Design (New)
     -------------------------------------------------------------------------- */
  {
    id: 'maximalism',
    name: 'Maximalism / Dopamine Design',
    shortLabel: '16 / Electric Color Clash & Joyful Layering',
    group: 'Expressive & Editorial',
    description:
      'High-energy dopamine palette, expressive display typography, layered sticker badges, and unapologetic visual abundance.',
    defaultMode: 'light',
    characteristics: ['Dopamine Color Clash', 'Sticker Badge Layers', 'Expressive Scale'],
    typography: {
      fontDisplay: '"Impact", "Arial Black", "Inter", sans-serif',
      fontBody: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontMono: '"Courier New", monospace',
      heroSize: 'clamp(2.8rem, 6vw, 5.2rem)',
      heroWeight: '900',
      heroTracking: '-0.02em',
      headingTransform: 'uppercase',
    },
    layout: {
      radiusSm: '12px',
      radiusMd: '20px',
      radiusLg: '28px',
      radiusPill: '999px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '3px',
      heroVariant: 'maximal-dopamine',
    },
    tokens: {
      light: {
        bgPrimary: '#fff0f6',
        bgSecondary: '#f3d9fa',
        bgSurface: '#ffffff',
        bgElevated: '#ffd8a8',
        textPrimary: '#1a0526',
        textSecondary: '#3b0764',
        textMuted: '#6b21a8',
        accentPrimary: '#ff006e',
        accentSecondary: '#3a86ff',
        accentContrast: '#ffffff',
        borderSubtle: '#1a0526',
        borderStrong: '#ff006e',
        shadowCard: '8px 8px 0px #8338ec',
        shadowElevated: '10px 10px 0px #ffbe0b',
        heroBackdrop:
          'radial-gradient(circle at 15% 20%, #ffbe0b 0%, transparent 35%), radial-gradient(circle at 85% 80%, #00f5d4 0%, transparent 38%), #fff0f6',
        badgeBg: '#ffbe0b',
        badgeText: '#1a0526',
      },
      dark: {
        bgPrimary: '#160028',
        bgSecondary: '#240046',
        bgSurface: '#2d0657',
        bgElevated: '#3c096c',
        textPrimary: '#ffffff',
        textSecondary: '#f3d9fa',
        textMuted: '#c77dff',
        accentPrimary: '#ff007f',
        accentSecondary: '#00f5d4',
        accentContrast: '#160028',
        borderSubtle: '#00f5d4',
        borderStrong: '#ffbe0b',
        shadowCard: '8px 8px 0px #00f5d4',
        shadowElevated: '10px 10px 0px #ff007f',
        heroBackdrop:
          'radial-gradient(circle at 15% 20%, rgba(255, 0, 127, 0.35) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(0, 245, 212, 0.3) 0%, transparent 40%), #160028',
        badgeBg: '#00f5d4',
        badgeText: '#160028',
      },
    },
  },

  /* --------------------------------------------------------------------------
     17. Bento Grid Layout (New)
     -------------------------------------------------------------------------- */
  {
    id: 'bento-grid',
    name: 'Bento Grid Layout',
    shortLabel: '17 / Modular Architectural Compartments',
    group: 'Minimal & Structural',
    description:
      'Self-contained rounded bento compartments organizing hero narrative, feature cells, and callouts into a cohesive architectural tile matrix.',
    defaultMode: 'dark',
    characteristics: ['Multi-Span Bento Cells', 'Self-Contained Tiles', 'Subtle Rim Borders'],
    typography: {
      fontDisplay: '"SF Pro Display", "Inter", -apple-system, sans-serif',
      fontBody: '"SF Pro Text", "Inter", -apple-system, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.4rem, 4.8vw, 4rem)',
      heroWeight: '700',
      heroTracking: '-0.035em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '16px',
      radiusMd: '24px',
      radiusLg: '28px',
      radiusPill: '999px',
      sectionPadding: '4rem',
      cardBorderWidth: '1px',
      heroVariant: 'bento-matrix',
    },
    tokens: {
      dark: {
        bgPrimary: '#09090b',
        bgSecondary: '#09090b',
        bgSurface: '#141417',
        bgElevated: '#1f1f24',
        textPrimary: '#fafafa',
        textSecondary: '#a1a1aa',
        textMuted: '#71717a',
        accentPrimary: '#10b981',
        accentSecondary: '#3b82f6',
        accentContrast: '#09090b',
        borderSubtle: 'rgba(255, 255, 255, 0.09)',
        borderStrong: 'rgba(16, 185, 129, 0.5)',
        shadowCard: '0 10px 30px rgba(0, 0, 0, 0.45)',
        shadowElevated: '0 16px 40px rgba(16, 185, 129, 0.18)',
        heroBackdrop: '#09090b',
        badgeBg: 'rgba(16, 185, 129, 0.15)',
        badgeText: '#34d399',
      },
      light: {
        bgPrimary: '#f4f4f5',
        bgSecondary: '#f4f4f5',
        bgSurface: '#ffffff',
        bgElevated: '#e4e4e7',
        textPrimary: '#18181b',
        textSecondary: '#52525b',
        textMuted: '#71717a',
        accentPrimary: '#059669',
        accentSecondary: '#2563eb',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(24, 24, 27, 0.09)',
        borderStrong: '#059669',
        shadowCard: '0 4px 20px rgba(0, 0, 0, 0.04)',
        shadowElevated: '0 12px 30px rgba(5, 150, 105, 0.15)',
        heroBackdrop: '#f4f4f5',
        badgeBg: '#d1fae5',
        badgeText: '#065f46',
      },
    },
  },

  /* --------------------------------------------------------------------------
     18. Collage / Mixed Media (New)
     -------------------------------------------------------------------------- */
  {
    id: 'collage-mixed',
    name: 'Collage / Mixed Media',
    shortLabel: '18 / Cutout Zine Scraps & Halftone Grain',
    group: 'Expressive & Editorial',
    description:
      'Tactile zine aesthetic blending newsprint paper textures, angled cutout cards, masking-tape accents, and mixed serif/monospace labels.',
    defaultMode: 'light',
    characteristics: ['Cutout Paper Layers', 'Zine Type Contrast', 'Taped Frame Accents'],
    typography: {
      fontDisplay: '"Georgia", "Playfair Display", Times, serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"Courier New", Courier, monospace',
      heroSize: 'clamp(2.6rem, 5.4vw, 4.5rem)',
      heroWeight: '700',
      heroTracking: '-0.025em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '2px',
      radiusMd: '4px',
      radiusLg: '4px',
      radiusPill: '2px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1.5px',
      heroVariant: 'collage-scrapbook',
    },
    tokens: {
      light: {
        bgPrimary: '#efe9dc',
        bgSecondary: '#e5dec9',
        bgSurface: '#fbf8f1',
        bgElevated: '#dfd5bd',
        textPrimary: '#1c1917',
        textSecondary: '#44403c',
        textMuted: '#78716c',
        accentPrimary: '#c2410c',
        accentSecondary: '#1d4ed8',
        accentContrast: '#fbf8f1',
        borderSubtle: '#78716c',
        borderStrong: '#1c1917',
        shadowCard: '5px 6px 0px rgba(28, 25, 23, 0.22)',
        shadowElevated: '8px 10px 0px rgba(194, 65, 12, 0.4)',
        heroBackdrop:
          'radial-gradient(#c7bca6 1px, transparent 1px) 0 0 / 16px 16px, #efe9dc',
        badgeBg: '#1c1917',
        badgeText: '#fef08a',
      },
      dark: {
        bgPrimary: '#1c1917',
        bgSecondary: '#262320',
        bgSurface: '#292524',
        bgElevated: '#38322e',
        textPrimary: '#f5f5f4',
        textSecondary: '#d6d3d1',
        textMuted: '#a8a29e',
        accentPrimary: '#fb923c',
        accentSecondary: '#60a5fa',
        accentContrast: '#1c1917',
        borderSubtle: '#57534e',
        borderStrong: '#f5f5f4',
        shadowCard: '5px 6px 0px rgba(0, 0, 0, 0.65)',
        shadowElevated: '8px 10px 0px rgba(251, 146, 60, 0.5)',
        heroBackdrop:
          'radial-gradient(#38322e 1px, transparent 1px) 0 0 / 16px 16px, #1c1917',
        badgeBg: '#fef08a',
        badgeText: '#1c1917',
      },
    },
  },

  /* --------------------------------------------------------------------------
     19. Hand-drawn / Sketch (New)
     -------------------------------------------------------------------------- */
  {
    id: 'hand-drawn',
    name: 'Hand-drawn / Sketch',
    shortLabel: '19 / Notebook Ink & Organic Sketch Contours',
    group: 'Expressive & Editorial',
    description:
      'Warm sketchbook paper, asymmetric hand-inked contours, dashed margin annotations, and approachable studio notebook charm.',
    defaultMode: 'light',
    characteristics: ['Sketchbook Contours', 'Ruled Paper Grid', 'Ink Pen Annotations'],
    typography: {
      fontDisplay: '"Comic Sans MS", "Bradley Hand", "Chalkboard SE", cursive, sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"Courier New", monospace',
      heroSize: 'clamp(2.5rem, 5vw, 4.2rem)',
      heroWeight: '700',
      heroTracking: '-0.01em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '18px 4px 16px 6px / 6px 16px 4px 18px',
      radiusMd: '24px 8px 22px 10px / 8px 22px 6px 24px',
      radiusLg: '255px 15px 225px 15px / 15px 225px 15px 255px',
      radiusPill: '255px 25px 225px 25px / 25px 225px 25px 255px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '2px',
      heroVariant: 'sketch-notebook',
    },
    tokens: {
      light: {
        bgPrimary: '#fdfbf7',
        bgSecondary: '#f5f0e6',
        bgSurface: '#fffef9',
        bgElevated: '#f2ead8',
        textPrimary: '#1e293b',
        textSecondary: '#334155',
        textMuted: '#64748b',
        accentPrimary: '#2563eb',
        accentSecondary: '#e11d48',
        accentContrast: '#ffffff',
        borderSubtle: '#94a3b8',
        borderStrong: '#1e293b',
        shadowCard: '3px 4px 0px #1e293b',
        shadowElevated: '5px 6px 0px #2563eb',
        heroBackdrop:
          'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(37, 99, 235, 0.1) 28px), #fdfbf7',
        badgeBg: '#fef08a',
        badgeText: '#1e293b',
      },
      dark: {
        bgPrimary: '#181c24',
        bgSecondary: '#1f2430',
        bgSurface: '#222836',
        bgElevated: '#2c3446',
        textPrimary: '#f1f5f9',
        textSecondary: '#cbd5e1',
        textMuted: '#94a3b8',
        accentPrimary: '#60a5fa',
        accentSecondary: '#fb7185',
        accentContrast: '#181c24',
        borderSubtle: '#64748b',
        borderStrong: '#f1f5f9',
        shadowCard: '3px 4px 0px #60a5fa',
        shadowElevated: '5px 6px 0px #fb7185',
        heroBackdrop:
          'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(148, 163, 184, 0.1) 28px), #181c24',
        badgeBg: '#334155',
        badgeText: '#fef08a',
      },
    },
  },

  /* --------------------------------------------------------------------------
     20. Retro-futurism / Synthwave (New)
     -------------------------------------------------------------------------- */
  {
    id: 'synthwave',
    name: 'Retro-futurism / Synthwave',
    shortLabel: '20 / Outrun Sunset Horizon & Laser Grid',
    group: 'Futuristic & Nostalgic',
    description:
      '1980s analog-digital nostalgia with neon magenta-to-amber sunset gradients, perspective laser horizons, and chrome display type.',
    defaultMode: 'dark',
    characteristics: ['Outrun Sunset Gradient', 'Laser Horizon Grid', 'Neon Magenta & Amber'],
    typography: {
      fontDisplay: '"Trebuchet MS", "Impact", "Space Grotesk", sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"Courier New", Consolas, monospace',
      heroSize: 'clamp(2.6rem, 5.5vw, 4.6rem)',
      heroWeight: '800',
      heroTracking: '0.02em',
      headingTransform: 'uppercase',
    },
    layout: {
      radiusSm: '4px',
      radiusMd: '8px',
      radiusLg: '12px',
      radiusPill: '4px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1.5px',
      heroVariant: 'synthwave-outrun',
    },
    tokens: {
      dark: {
        bgPrimary: '#120428',
        bgSecondary: '#1b063b',
        bgSurface: 'rgba(34, 8, 68, 0.86)',
        bgElevated: '#2c0b59',
        textPrimary: '#fff0f8',
        textSecondary: '#f7b2e1',
        textMuted: '#b86fd6',
        accentPrimary: '#ff2a85',
        accentSecondary: '#00f5d4',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(255, 42, 133, 0.45)',
        borderStrong: '#00f5d4',
        shadowCard: '0 0 24px rgba(255, 42, 133, 0.25), inset 0 0 12px rgba(0, 245, 212, 0.12)',
        shadowElevated: '0 0 36px rgba(0, 245, 212, 0.4)',
        heroBackdrop:
          'linear-gradient(180deg, #120428 0%, #3b096c 55%, #ff2a85 100%)',
        badgeBg: 'rgba(255, 190, 11, 0.2)',
        badgeText: '#ffbe0b',
      },
      light: {
        bgPrimary: '#fff0f7',
        bgSecondary: '#ffe3f1',
        bgSurface: '#ffffff',
        bgElevated: '#ffd1e8',
        textPrimary: '#240046',
        textSecondary: '#5a189a',
        textMuted: '#9d4edd',
        accentPrimary: '#ff006e',
        accentSecondary: '#3a86ff',
        accentContrast: '#ffffff',
        borderSubtle: '#ff85c0',
        borderStrong: '#ff006e',
        shadowCard: '0 10px 25px rgba(255, 0, 110, 0.15)',
        shadowElevated: '0 14px 32px rgba(58, 134, 255, 0.28)',
        heroBackdrop:
          'linear-gradient(180deg, #fff0f7 0%, #ffd6ff 60%, #ffcad4 100%)',
        badgeBg: '#ff006e',
        badgeText: '#ffffff',
      },
    },
  },

  /* --------------------------------------------------------------------------
     21. Y2K / Digital Nostalgia (New)
     -------------------------------------------------------------------------- */
  {
    id: 'y2k-nostalgia',
    name: 'Y2K / Digital Nostalgia',
    shortLabel: '21 / Millennium Chrome & Cyber Bubblegum',
    group: 'Futuristic & Nostalgic',
    description:
      'Turn-of-the-millennium optimism with translucent aqua plastics, metallic chrome bevels, pixel window headers, and starburst accents.',
    defaultMode: 'light',
    characteristics: ['Millennium Chrome Bevels', 'Window Title Headers', 'Cyber Ice & Pink'],
    typography: {
      fontDisplay: '"Trebuchet MS", "Verdana", sans-serif',
      fontBody: '"Verdana", "Inter", sans-serif',
      fontMono: '"Courier New", monospace',
      heroSize: 'clamp(2.4rem, 5vw, 4.1rem)',
      heroWeight: '800',
      heroTracking: '-0.02em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '8px',
      radiusMd: '14px',
      radiusLg: '20px',
      radiusPill: '999px',
      sectionPadding: '5rem',
      cardBorderWidth: '2px',
      heroVariant: 'y2k-chrome',
    },
    tokens: {
      light: {
        bgPrimary: '#e6f4ff',
        bgSecondary: '#cce9ff',
        bgSurface: '#ffffff',
        bgElevated: '#d6efff',
        textPrimary: '#002966',
        textSecondary: '#0047b3',
        textMuted: '#4d88ff',
        accentPrimary: '#ff1493',
        accentSecondary: '#00bfff',
        accentContrast: '#ffffff',
        borderSubtle: '#66b3ff',
        borderStrong: '#0047b3',
        shadowCard: 'inset 0 2px 3px #ffffff, 4px 4px 0px #0047b3',
        shadowElevated: 'inset 0 2px 4px #ffffff, 6px 6px 0px #ff1493',
        heroBackdrop:
          'radial-gradient(circle at 80% 20%, #ffcce6 0%, #e6f4ff 55%, #b3e0ff 100%)',
        badgeBg: '#ff1493',
        badgeText: '#ffffff',
      },
      dark: {
        bgPrimary: '#061326',
        bgSecondary: '#0c2240',
        bgSurface: '#102c54',
        bgElevated: '#173d73',
        textPrimary: '#e6f7ff',
        textSecondary: '#99ddff',
        textMuted: '#4db8ff',
        accentPrimary: '#ff66b3',
        accentSecondary: '#00e6e6',
        accentContrast: '#061326',
        borderSubtle: '#0088cc',
        borderStrong: '#00e6e6',
        shadowCard: 'inset 0 2px 3px rgba(255,255,255,0.25), 4px 4px 0px #00e6e6',
        shadowElevated: 'inset 0 2px 4px rgba(255,255,255,0.35), 6px 6px 0px #ff66b3',
        heroBackdrop:
          'radial-gradient(circle at 80% 20%, #3d0f2e 0%, #061326 65%)',
        badgeBg: '#00e6e6',
        badgeText: '#061326',
      },
    },
  },

  /* --------------------------------------------------------------------------
     22. Cyberpunk (New)
     -------------------------------------------------------------------------- */
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    shortLabel: '22 / High-Voltage Hazard Yellow & Glitch HUD',
    group: 'Futuristic & Nostalgic',
    description:
      'High-contrast dystopian HUD interface combining acid hazard yellow, cybernetic magenta, notched corner frames, and industrial telemetry.',
    defaultMode: 'dark',
    characteristics: ['Hazard Yellow Contrast', 'Notched HUD Frames', 'Industrial Telemetry'],
    typography: {
      fontDisplay: '"Orbitron", "Arial Black", "Space Grotesk", sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"Courier New", Consolas, monospace',
      heroSize: 'clamp(2.5rem, 5.3vw, 4.4rem)',
      heroWeight: '900',
      heroTracking: '0.01em',
      headingTransform: 'uppercase',
    },
    layout: {
      radiusSm: '0px',
      radiusMd: '2px',
      radiusLg: '4px',
      radiusPill: '0px',
      sectionPadding: '5rem',
      cardBorderWidth: '2px',
      heroVariant: 'cyberpunk-hud',
    },
    tokens: {
      dark: {
        bgPrimary: '#08080c',
        bgSecondary: '#101018',
        bgSurface: '#141420',
        bgElevated: '#1d1d2e',
        textPrimary: '#fcee09',
        textSecondary: '#e2e8f0',
        textMuted: '#94a3b8',
        accentPrimary: '#fcee09',
        accentSecondary: '#ff003c',
        accentContrast: '#08080c',
        borderSubtle: '#ff003c',
        borderStrong: '#fcee09',
        shadowCard: '4px 4px 0px #ff003c',
        shadowElevated: '6px 6px 0px #00f0ff',
        heroBackdrop:
          'linear-gradient(135deg, rgba(255, 0, 60, 0.14) 0%, #08080c 55%, rgba(0, 240, 255, 0.12) 100%)',
        badgeBg: '#ff003c',
        badgeText: '#ffffff',
      },
      light: {
        bgPrimary: '#fcee09',
        bgSecondary: '#f5e000',
        bgSurface: '#fffdf0',
        bgElevated: '#ffffff',
        textPrimary: '#08080c',
        textSecondary: '#1e1e24',
        textMuted: '#4a4a52',
        accentPrimary: '#ff003c',
        accentSecondary: '#0055ff',
        accentContrast: '#ffffff',
        borderSubtle: '#08080c',
        borderStrong: '#08080c',
        shadowCard: '5px 5px 0px #08080c',
        shadowElevated: '7px 7px 0px #ff003c',
        heroBackdrop: '#fcee09',
        badgeBg: '#08080c',
        badgeText: '#fcee09',
      },
    },
  },

  /* --------------------------------------------------------------------------
     23. Aurora / Gradient Mesh (New)
     -------------------------------------------------------------------------- */
  {
    id: 'aurora-mesh',
    name: 'Aurora / Gradient Mesh',
    shortLabel: '23 / Luminous Northern Lights & Silk Diffusions',
    group: 'Atmospheric & Organic',
    description:
      'Atmospheric multi-stop aurora borealis light curtains paired with silky translucent containers and serene typographic balance.',
    defaultMode: 'dark',
    characteristics: ['Multi-Stop Aurora Curtains', 'Silky Diffused Cards', 'Luminous Contrast'],
    typography: {
      fontDisplay: '"Plus Jakarta Sans", "Inter", sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.6rem, 5.2vw, 4.4rem)',
      heroWeight: '700',
      heroTracking: '-0.03em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '12px',
      radiusMd: '20px',
      radiusLg: '26px',
      radiusPill: '999px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1px',
      heroVariant: 'aurora-atmospheric',
    },
    tokens: {
      dark: {
        bgPrimary: '#040814',
        bgSecondary: '#071024',
        bgSurface: 'rgba(13, 25, 48, 0.72)',
        bgElevated: 'rgba(22, 40, 74, 0.85)',
        textPrimary: '#f0fdf4',
        textSecondary: '#bbf7d0',
        textMuted: '#6ee7b7',
        accentPrimary: '#34d399',
        accentSecondary: '#818cf8',
        accentContrast: '#040814',
        borderSubtle: 'rgba(52, 211, 153, 0.25)',
        borderStrong: '#34d399',
        shadowCard: '0 20px 50px rgba(4, 8, 20, 0.65)',
        shadowElevated: '0 24px 60px rgba(52, 211, 153, 0.25)',
        heroBackdrop:
          'radial-gradient(ellipse at 20% 10%, rgba(52, 211, 153, 0.35) 0%, transparent 50%), radial-gradient(ellipse at 80% 25%, rgba(129, 140, 248, 0.35) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(236, 72, 153, 0.22) 0%, transparent 55%), #040814',
        badgeBg: 'rgba(52, 211, 153, 0.16)',
        badgeText: '#6ee7b7',
      },
      light: {
        bgPrimary: '#f0fdf9',
        bgSecondary: '#e0f2fe',
        bgSurface: 'rgba(255, 255, 255, 0.82)',
        bgElevated: '#ffffff',
        textPrimary: '#064e3b',
        textSecondary: '#0f766e',
        textMuted: '#0d9488',
        accentPrimary: '#059669',
        accentSecondary: '#4f46e5',
        accentContrast: '#ffffff',
        borderSubtle: 'rgba(5, 150, 105, 0.22)',
        borderStrong: '#059669',
        shadowCard: '0 16px 36px rgba(6, 78, 59, 0.08)',
        shadowElevated: '0 20px 48px rgba(79, 70, 229, 0.16)',
        heroBackdrop:
          'radial-gradient(ellipse at 20% 10%, rgba(52, 211, 153, 0.28) 0%, transparent 50%), radial-gradient(ellipse at 80% 25%, rgba(129, 140, 248, 0.25) 0%, transparent 50%), #f0fdf9',
        badgeBg: '#d1fae5',
        badgeText: '#065f46',
      },
    },
  },

  /* --------------------------------------------------------------------------
     24. Organic / Nature-inspired (New)
     -------------------------------------------------------------------------- */
  {
    id: 'organic-nature',
    name: 'Organic / Nature-inspired',
    shortLabel: '24 / Botanical Earth, Warm Clay & Leaf Curves',
    group: 'Atmospheric & Organic',
    description:
      'Biophilic calm inspired by forest moss, warm terracotta clay, linen parchment, and asymmetric botanical leaf radii.',
    defaultMode: 'light',
    characteristics: ['Botanical Leaf Radii', 'Moss & Terracotta Palette', 'Warm Linen Surfaces'],
    typography: {
      fontDisplay: '"Georgia", "Palatino Linotype", Book Antiqua, serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      heroSize: 'clamp(2.5rem, 5vw, 4.3rem)',
      heroWeight: '600',
      heroTracking: '-0.02em',
      headingTransform: 'none',
    },
    layout: {
      radiusSm: '12px 24px 12px 24px',
      radiusMd: '18px 36px 18px 36px',
      radiusLg: '24px 48px 24px 48px',
      radiusPill: '999px',
      sectionPadding: '5.5rem',
      cardBorderWidth: '1px',
      heroVariant: 'organic-botanical',
    },
    tokens: {
      light: {
        bgPrimary: '#f4f1ea',
        bgSecondary: '#e9e4d8',
        bgSurface: '#faf8f3',
        bgElevated: '#e2dccb',
        textPrimary: '#1f2e21',
        textSecondary: '#3b4f3e',
        textMuted: '#637866',
        accentPrimary: '#2d5a27',
        accentSecondary: '#c86d51',
        accentContrast: '#faf8f3',
        borderSubtle: '#c8c2b2',
        borderStrong: '#2d5a27',
        shadowCard: '0 12px 30px rgba(31, 46, 33, 0.06)',
        shadowElevated: '0 18px 40px rgba(45, 90, 39, 0.14)',
        heroBackdrop: 'linear-gradient(180deg, #eef0e6 0%, #f4f1ea 100%)',
        badgeBg: '#dde5d7',
        badgeText: '#1f2e21',
      },
      dark: {
        bgPrimary: '#111a13',
        bgSecondary: '#17241a',
        bgSurface: '#1c2b20',
        bgElevated: '#25382a',
        textPrimary: '#e9efe8',
        textSecondary: '#b7c9b8',
        textMuted: '#7f9982',
        accentPrimary: '#74b47c',
        accentSecondary: '#e08a6d',
        accentContrast: '#111a13',
        borderSubtle: '#2f4534',
        borderStrong: '#74b47c',
        shadowCard: '0 16px 36px rgba(0, 0, 0, 0.45)',
        shadowElevated: '0 22px 48px rgba(116, 180, 124, 0.2)',
        heroBackdrop: 'linear-gradient(180deg, #17241a 0%, #111a13 100%)',
        badgeBg: '#25382a',
        badgeText: '#a8d5ae',
      },
    },
  },
];

export const THEME_GROUPS: ThemeGroup[] = [
  'Minimal & Structural',
  'Tactile & Dimensional',
  'Expressive & Editorial',
  'Futuristic & Nostalgic',
  'Atmospheric & Organic',
];

export function getThemeById(themeId: string | undefined): ThemeDefinition | undefined {
  return THEMES.find((theme) => theme.id === themeId);
}
