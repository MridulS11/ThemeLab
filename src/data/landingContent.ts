export interface FeatureCardContent {
  id: string;
  title: string;
  description: string;
}

export interface LandingPageContent {
  brandName: string;
  navigation: {
    home: string;
    features: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    headline: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
  features: {
    heading: string;
    items: FeatureCardContent[];
  };
  about: {
    heading: string;
    description: string;
  };
  cta: {
    heading: string;
    description: string;
    button: string;
  };
  footer: {
    brandName: string;
    description: string;
    links: {
      home: string;
      themes: string;
      animations: string;
    };
  };
}

export const SHARED_LANDING_CONTENT: LandingPageContent = {
  brandName: 'ThemeLab',
  navigation: {
    home: 'Home',
    features: 'Features',
    about: 'About',
    contact: 'Contact',
    cta: 'Get Started',
  },
  hero: {
    headline: 'Design Beyond Ordinary.',
    description:
      'Explore creative possibilities, discover new ideas, and experience design through a different perspective.',
    primaryButton: 'Get Started',
    secondaryButton: 'Explore Features',
  },
  features: {
    heading: 'Everything You Need to Create.',
    items: [
      {
        id: 'creative-freedom',
        title: 'Creative Freedom',
        description: 'Explore different styles and bring your ideas to life.',
      },
      {
        id: 'modern-experience',
        title: 'Modern Experience',
        description: 'Discover interfaces designed for clarity, usability, and impact.',
      },
      {
        id: 'flexible-design',
        title: 'Flexible Design',
        description: 'Find the visual direction that works best for your next project.',
      },
    ],
  },
  about: {
    heading: 'One Experience. Different Perspectives.',
    description:
      'Great design is more than appearance. It combines structure, typography, color, and interaction to create a memorable experience.',
  },
  cta: {
    heading: 'Ready to Explore?',
    description: 'Find your style and see what a different design perspective can achieve.',
    button: 'Explore Themes',
  },
  footer: {
    brandName: 'ThemeLab',
    description:
      'An interactive showcase comparing website themes and motion systems with one shared narrative.',
    links: {
      home: 'Home',
      themes: 'Themes',
      animations: 'Animations',
    },
  },
};
