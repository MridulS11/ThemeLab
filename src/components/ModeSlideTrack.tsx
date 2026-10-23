import React from 'react';
import { ColorMode } from '../data/themes';

interface ModeSlideTrackProps {
  mode: ColorMode;
  prefix?: string;
}

export const ModeSlideTrack: React.FC<ModeSlideTrackProps> = ({ mode, prefix }) => {
  return (
    <span className="mode-slide-viewport" aria-hidden="true">
      <span className={`mode-slide-reel ${mode === 'dark' ? 'is-dark' : 'is-light'}`}>
        {/* State 1: Light (Sun) */}
        <span className="mode-slide-item">
          <svg
            className="mode-slide-svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <span>
            {prefix ? `${prefix}: ` : ''}
            <strong>Light</strong>
          </span>
        </span>

        {/* State 2: Dark (Moon) */}
        <span className="mode-slide-item">
          <svg
            className="mode-slide-svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span>
            {prefix ? `${prefix}: ` : ''}
            <strong>Dark</strong>
          </span>
        </span>
      </span>
    </span>
  );
};
