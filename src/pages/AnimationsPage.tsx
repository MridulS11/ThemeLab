import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ANIMATION_CATEGORIES,
  ANIMATION_DEMOS,
  AnimationCategoryId,
  AnimationDemoItem,
  AnimationTriggerType,
  TechBadge,
} from '../data/animations';
import { useMyList } from '../context/MyListContext';

interface DemoCardProps {
  item: AnimationDemoItem;
  globalPaused: boolean;
  isHighlighted?: boolean;
}

const SCRAMBLE_TARGET = 'SYSTEM DECODED';
const SCRAMBLE_CHARS = '01#@%&*+<>?/|[]{}ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AnimationDemoCard: React.FC<DemoCardProps> = ({
  item,
  globalPaused,
  isHighlighted = false,
}) => {
  const { isAnimationInList, toggleAnimationInList } = useMyList();
  const inList = isAnimationInList(item.id);
  const [playCount, setPlayCount] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simulatedHover, setSimulatedHover] = useState<boolean>(false);
  const [pointer, setPointer] = useState<{ x: number; y: number; pxX: number; pxY: number }>({
    x: 0,
    y: 0,
    pxX: 140,
    pxY: 82,
  });
  const [inView, setInView] = useState<boolean>(false);

  // Interactive state for newly added demos
  const [interactiveStep, setInteractiveStep] = useState<number>(0);
  const [scrambledText, setScrambledText] = useState<string>(SCRAMBLE_TARGET);
  const [rippleCoords, setRippleCoords] = useState<{ x: number; y: number; id: number } | null>(
    null
  );
  const [viewMode, setViewMode] = useState<'crossfade' | 'slide' | 'wipe'>('crossfade');
  const [modalMode, setModalMode] = useState<'none' | 'modal' | 'drawer'>('none');
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success' | 'error'>('idle');
  const [toggleOn, setToggleOn] = useState<boolean>(false);
  const [scrollRatio, setScrollRatio] = useState<number>(0.35);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const scrollBoxRef = useRef<HTMLDivElement | null>(null);
  const snapTrackRef = useRef<HTMLDivElement | null>(null);

  const effectivePlaying = isPlaying && !globalPaused;

  // Scroll-triggered reveal IntersectionObserver
  useEffect(() => {
    if (item.id !== 'scroll-triggered-reveal') return;
    const node = stageRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [item.id]);

  // Cipher text scramble effect
  useEffect(() => {
    if (item.id !== 'text-scramble') return;
    let iteration = 0;
    const interval = window.setInterval(() => {
      setScrambledText(
        SCRAMBLE_TARGET.split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return SCRAMBLE_TARGET[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      iteration += 0.45;
      if (iteration >= SCRAMBLE_TARGET.length) {
        window.clearInterval(interval);
        setScrambledText(SCRAMBLE_TARGET);
      }
    }, 35);
    return () => window.clearInterval(interval);
  }, [item.id, playCount]);

  const handleReplay = () => {
    if (item.id === 'scroll-triggered-reveal') {
      setInView(false);
      window.setTimeout(() => {
        setInView(true);
        setPlayCount((c) => c + 1);
      }, 60);
      return;
    }
    setPlayCount((c) => c + 1);
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (item.triggerType !== 'pointer') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pxX = Math.round(e.clientX - rect.left);
    const pxY = Math.round(e.clientY - rect.top);
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), pxX, pxY });
  };

  const handlePointerLeave = () => {
    if (item.triggerType !== 'pointer') return;
    setPointer({ x: 0, y: 0, pxX: 140, pxY: 82 });
  };

  const handleDemoPresetShift = () => {
    setPointer((prev) =>
      prev.x === 0 && prev.y === 0
        ? { x: 0.65, y: -0.55, pxX: 210, pxY: 48 }
        : { x: 0, y: 0, pxX: 140, pxY: 82 }
    );
  };

  const handleInteractiveTrigger = () => {
    if (item.id === 'scroll-scrub-progress') {
      const nextRatio = scrollRatio >= 0.9 ? 0.1 : Number((scrollRatio + 0.3).toFixed(2));
      setScrollRatio(nextRatio);
      if (scrollBoxRef.current) {
        const maxScroll =
          scrollBoxRef.current.scrollHeight - scrollBoxRef.current.clientHeight;
        scrollBoxRef.current.scrollTop = maxScroll * nextRatio;
      }
      return;
    }
    if (item.id === 'horizontal-scroll-snap') {
      const nextStep = (interactiveStep + 1) % 3;
      setInteractiveStep(nextStep);
      if (snapTrackRef.current) {
        const cardWidth = snapTrackRef.current.clientWidth * 0.78;
        snapTrackRef.current.scrollTo({ left: nextStep * cardWidth, behavior: 'smooth' });
      }
      return;
    }
    if (item.id === 'click-ripple-press') {
      setRippleCoords({ x: 75, y: 22, id: Date.now() });
      return;
    }
    if (item.id === 'modal-drawer-transition') {
      setModalMode((prev) => (prev === 'none' ? 'modal' : prev === 'modal' ? 'drawer' : 'none'));
      return;
    }
    if (item.id === 'feedback-microinteractions') {
      setFeedbackState((prev) =>
        prev === 'idle' ? 'success' : prev === 'success' ? 'error' : 'idle'
      );
      setToggleOn((prev) => !prev);
      return;
    }
    setInteractiveStep((prev) => prev + 1);
  };

  return (
    <article
      id={`demo-${item.id}`}
      data-anim-id={item.id}
      className={`anim-card ${isHighlighted ? 'anim-card-highlighted' : ''}`}
      aria-labelledby={`anim-title-${item.id}`}
    >
      <div className="anim-card-header">
        <div className="anim-card-title-row">
          <span className="anim-number">{item.number}</span>
          <h3 id={`anim-title-${item.id}`} className="anim-name">
            {item.name}
          </h3>
        </div>
        <div className="anim-badges-group">
          <span className="anim-tech-badge">{item.techBadge}</span>
          <span className="anim-trigger-badge">{item.triggerType.toUpperCase()}</span>
        </div>
      </div>

      <div className="anim-category-tag">{item.categoryLabel}</div>
      <p className="anim-description">{item.description}</p>

      {/* Visible Live Browser-Rendered Demonstration Stage */}
      <div
        ref={stageRef}
        className={`anim-stage anim-stage-${item.id}`}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        {/* 01. Fade In */}
        {item.id === 'fade-in' && (
          <div key={playCount} className="demo-box demo-fade-in">
            <span>FADE IN</span>
          </div>
        )}

        {/* 02. Slide Up */}
        {item.id === 'slide-up' && (
          <div key={playCount} className="demo-box demo-slide-up">
            <span>SLIDE UP ↑</span>
          </div>
        )}

        {/* 03. Scale In */}
        {item.id === 'scale-in' && (
          <div key={playCount} className="demo-box demo-scale-in">
            <span>SCALE IN ⤢</span>
          </div>
        )}

        {/* 04. Staggered Reveal */}
        {item.id === 'staggered-reveal' && (
          <div key={playCount} className="demo-stagger-grid">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="demo-stagger-item"
                style={{ animationDelay: `${(n - 1) * 95}ms` }}
              >
                0{n}
              </div>
            ))}
          </div>
        )}

        {/* 05. 3D Flip Entrance */}
        {item.id === 'flip-entrance' && (
          <div key={playCount} className="demo-box demo-flip-3d">
            <span>3D FLIP X/Y</span>
          </div>
        )}

        {/* 06. Optical Blur Reveal */}
        {item.id === 'blur-reveal' && (
          <div key={playCount} className="demo-box demo-blur-reveal">
            <span>OPTICAL FOCUS</span>
          </div>
        )}

        {/* 07. Elastic Spring Entrance */}
        {item.id === 'elastic-entrance' && (
          <div key={playCount} className="demo-box demo-elastic-spring">
            <span>SPRING BOUNCE</span>
          </div>
        )}

        {/* 08. Directional Exit & Re-entry */}
        {item.id === 'directional-exit' && (
          <div
            className={`demo-box demo-directional-exit ${
              interactiveStep % 2 === 1 ? 'is-exited' : 'is-entered'
            }`}
          >
            <span>{interactiveStep % 2 === 1 ? 'EXITED ↗' : 'ACTIVE SURFACE'}</span>
          </div>
        )}

        {/* 09. Text Mask Reveal */}
        {item.id === 'text-reveal' && (
          <div key={playCount} className="demo-text-reveal-wrap">
            <div className="demo-text-mask">
              <span className="demo-text-line" style={{ animationDelay: '0ms' }}>
                MOTION CREATES
              </span>
            </div>
            <div className="demo-text-mask">
              <span className="demo-text-line" style={{ animationDelay: '130ms' }}>
                VISUAL CLARITY.
              </span>
            </div>
          </div>
        )}

        {/* 10. Typewriter */}
        {item.id === 'typewriter' && (
          <div key={playCount} className="demo-typewriter-wrap">
            <span className="demo-typewriter-text">DESIGN BEYOND ORDINARY</span>
          </div>
        )}

        {/* 11. Split-Character Wave Stagger */}
        {item.id === 'char-stagger' && (
          <div key={playCount} className="demo-char-stagger" aria-label="KINETIC TYPE">
            {'KINETIC TYPE'.split('').map((ch, idx) => (
              <span
                key={idx}
                className="demo-char-glyph"
                style={{ animationDelay: `${idx * 45}ms` }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>
        )}

        {/* 12. Cipher Text Scramble */}
        {item.id === 'text-scramble' && (
          <div className="demo-box demo-scramble-box">
            <span>{scrambledText}</span>
          </div>
        )}

        {/* 13. Chromatic Glitch Slice */}
        {item.id === 'glitch-text' && (
          <div
            className={`demo-glitch-word ${effectivePlaying ? 'playing' : 'paused'}`}
            data-text="SIGNAL_GLITCH"
          >
            SIGNAL_GLITCH
          </div>
        )}

        {/* 14. Variable Weight & Shimmer Sweep */}
        {item.id === 'gradient-weight-morph' && (
          <div className={`demo-weight-shimmer ${effectivePlaying ? 'playing' : 'paused'}`}>
            ATELIER SCALE
          </div>
        )}

        {/* 15. Local View Crossfade, Slide & Wipe */}
        {item.id === 'view-crossfade-slide' && (
          <div className="demo-view-transition-box">
            <div className="demo-view-topbar">
              {(['crossfade', 'slide', 'wipe'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`demo-mini-tab ${viewMode === m ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode(m);
                    setInteractiveStep((s) => s + 1);
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
            <div
              key={`${viewMode}-${interactiveStep}`}
              className={`demo-view-panel mode-${viewMode}`}
            >
              <strong>VIEW 0{(interactiveStep % 3) + 1}</strong>
              <span>Transition: {viewMode.toUpperCase()}</span>
            </div>
          </div>
        )}

        {/* 16. Expanding Circle Iris Reveal */}
        {item.id === 'expanding-circle-transition' && (
          <div
            className={`demo-iris-stage ${interactiveStep % 2 === 1 ? 'iris-open' : ''}`}
            onClick={() => setInteractiveStep((s) => s + 1)}
          >
            <div className="demo-iris-base">LAYER A — CLICK TO IRIS</div>
            <div className="demo-iris-overlay">LAYER B — EXPANDED CIRCLE</div>
          </div>
        )}

        {/* 17. Shared-Element Card-to-Detail Morph */}
        {item.id === 'shared-element-morph' && (
          <div
            className={`demo-shared-morph ${interactiveStep % 2 === 1 ? 'expanded' : 'compact'}`}
            onClick={() => setInteractiveStep((s) => s + 1)}
          >
            <div className="demo-shared-badge">01</div>
            <div className="demo-shared-copy">
              <strong>{interactiveStep % 2 === 1 ? 'EXPANDED DETAIL VIEW' : 'COMPACT CARD'}</strong>
              <span>
                {interactiveStep % 2 === 1
                  ? 'Shared container morphed to full stage bounds.'
                  : 'Click to expand layout geometry.'}
              </span>
            </div>
          </div>
        )}

        {/* 18. Modal Dialog & Slide-Over Drawer */}
        {item.id === 'modal-drawer-transition' && (
          <div className="demo-modal-stage">
            <div className="demo-modal-triggers">
              <button
                type="button"
                className="demo-mini-tab"
                onClick={() => setModalMode('modal')}
              >
                Open Modal
              </button>
              <button
                type="button"
                className="demo-mini-tab"
                onClick={() => setModalMode('drawer')}
              >
                Open Drawer
              </button>
            </div>
            {modalMode !== 'none' && (
              <div className="demo-scrim" onClick={() => setModalMode('none')}>
                <div
                  className={
                    modalMode === 'modal' ? 'demo-modal-sheet' : 'demo-drawer-sheet'
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <strong>{modalMode === 'modal' ? 'MODAL DIALOG' : 'SLIDE DRAWER'}</strong>
                  <button
                    type="button"
                    className="demo-mini-tab"
                    onClick={() => setModalMode('none')}
                  >
                    Close ×
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 19. Animated Grid-to-List & Shuffle */}
        {item.id === 'layout-rearrange' && (
          <div
            key={interactiveStep}
            className={`demo-rearrange-wrap ${
              interactiveStep % 2 === 1 ? 'list-mode' : 'grid-mode'
            }`}
          >
            {(interactiveStep % 3 === 0
              ? ['A1', 'B2', 'C3', 'D4']
              : interactiveStep % 3 === 1
              ? ['C3', 'A1', 'D4', 'B2']
              : ['D4', 'B2', 'A1', 'C3']
            ).map((code) => (
              <div key={code} className="demo-rearrange-tile">
                TILE {code}
              </div>
            ))}
          </div>
        )}

        {/* 20. Organic Contour Morphing */}
        {item.id === 'morphing-shape' && (
          <div
            className={`demo-morph-blob ${effectivePlaying ? 'playing' : 'paused'}`}
            aria-label="Morphing geometric contour"
          >
            <span>MORPH</span>
          </div>
        )}

        {/* 21. SVG Path Drawing */}
        {item.id === 'svg-path-draw' && (
          <svg
            key={playCount}
            className="demo-svg-draw"
            viewBox="0 0 220 110"
            fill="none"
            aria-label="Animated SVG line drawing"
          >
            <rect
              x="16"
              y="16"
              width="188"
              height="78"
              stroke="currentColor"
              strokeWidth="2"
              className="svg-stroke-path"
            />
            <circle
              cx="65"
              cy="55"
              r="24"
              stroke="currentColor"
              strokeWidth="2"
              className="svg-stroke-path"
            />
            <path
              d="M110 78 L142 32 L182 78 Z"
              stroke="currentColor"
              strokeWidth="2"
              className="svg-stroke-path"
            />
          </svg>
        )}

        {/* 22. Morphing Vector State Icon */}
        {item.id === 'animated-svg-icon' && (
          <button
            type="button"
            className={`demo-svg-icon-btn ${interactiveStep % 2 === 1 ? 'is-open' : ''}`}
            onClick={() => setInteractiveStep((s) => s + 1)}
            aria-label="Toggle morphing menu icon"
          >
            <svg viewBox="0 0 48 48" width="48" height="48">
              <line x1="10" y1="16" x2="38" y2="16" className="icon-line line-top" />
              <line x1="10" y1="24" x2="38" y2="24" className="icon-line line-mid" />
              <line x1="10" y1="32" x2="38" y2="32" className="icon-line line-bot" />
            </svg>
            <span>{interactiveStep % 2 === 1 ? 'CLOSE (×)' : 'MENU (≡)'}</span>
          </button>
        )}

        {/* 23. Liquid Metaballs (SVG Gooey Filter) */}
        {item.id === 'gooey-blobs' && (
          <div className="demo-gooey-stage">
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
              <defs>
                <filter id={`gooey-filter-${item.id}`}>
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
                    result="goo"
                  />
                </filter>
              </defs>
            </svg>
            <div
              className={`gooey- droplets-wrap ${effectivePlaying ? 'playing' : 'paused'}`}
              style={{ filter: `url(#gooey-filter-${item.id})` }}
            >
              <span className="gooey-drop drop-left" />
              <span className="gooey-drop drop-right" />
            </div>
          </div>
        )}

        {/* 24. Scroll-Triggered Reveal */}
        {item.id === 'scroll-triggered-reveal' && (
          <div
            key={playCount}
            className={`demo-scroll-box ${inView ? 'is-visible' : 'is-hidden'}`}
          >
            <span>{inView ? '✓ IN VIEWPORT' : 'WAITING FOR SCROLL'}</span>
          </div>
        )}

        {/* 25. Multi-Plane Parallax Depth */}
        {item.id === 'parallax-effect' && (
          <div className="demo-parallax-viewport">
            <div
              className="parallax-layer parallax-back"
              style={{
                transform: `translate3d(${pointer.x * -10}px, ${pointer.y * -8}px, 0)`,
              }}
            >
              BACK (0.3x)
            </div>
            <div
              className="parallax-layer parallax-mid"
              style={{
                transform: `translate3d(${pointer.x * 16}px, ${pointer.y * 12}px, 0)`,
              }}
            >
              MID (0.6x)
            </div>
            <div
              className="parallax-layer parallax-front"
              style={{
                transform: `translate3d(${pointer.x * 32}px, ${pointer.y * 22}px, 0)`,
              }}
            >
              FRONT (1.0x)
            </div>
          </div>
        )}

        {/* 26. Scroll-Scrub & Pinned Storytelling */}
        {item.id === 'scroll-scrub-progress' && (
          <div
            ref={scrollBoxRef}
            className="demo-scroll-scrub-viewport"
            onScroll={(e) => {
              const el = e.currentTarget;
              const max = Math.max(1, el.scrollHeight - el.clientHeight);
              setScrollRatio(Number((el.scrollTop / max).toFixed(2)));
            }}
          >
            <div className="demo-scrub-sticky">
              <div
                className="demo-scrub-bar"
                style={{ transform: `scaleX(${scrollRatio})` }}
              />
              <div className="demo-scrub-hud">
                <span
                  className="demo-scrub-wheel"
                  style={{ transform: `rotate(${Math.round(scrollRatio * 360)}deg)` }}
                >
                  ❈
                </span>
                <span>SCRUB: {Math.round(scrollRatio * 100)}%</span>
              </div>
            </div>
            <div className="demo-scrub-spacer">
              <p>01. Scroll down inside this viewport...</p>
              <p>02. Pinned header tracks scroll progress...</p>
              <p>03. 100% completion reached.</p>
            </div>
          </div>
        )}

        {/* 27. Horizontal Scroll & Mandatory Snap */}
        {item.id === 'horizontal-scroll-snap' && (
          <div ref={snapTrackRef} className="demo-snap-track">
            {['SLIDE 01 (SNAP)', 'SLIDE 02 (SNAP)', 'SLIDE 03 (SNAP)'].map((label) => (
              <div key={label} className="demo-snap-card">
                {label}
              </div>
            ))}
          </div>
        )}

        {/* 28. Hover Lift */}
        {item.id === 'hover-lift' && (
          <div
            tabIndex={0}
            className={`demo-hover-card ${simulatedHover ? 'is-hovered' : ''}`}
          >
            <span className="demo-hover-card-label">HOVER ME</span>
            <span className="demo-hover-card-sub">Elevation -8px</span>
          </div>
        )}

        {/* 29. Animated Button */}
        {item.id === 'animated-button' && (
          <button
            type="button"
            className={`demo-interactive-btn ${simulatedHover ? 'is-hovered' : ''}`}
            onClick={() => setSimulatedHover((prev) => !prev)}
          >
            <span className="demo-interactive-btn-bg" aria-hidden="true" />
            <span className="demo-interactive-btn-text">
              Explore Action <span className="demo-btn-arrow">→</span>
            </span>
          </button>
        )}

        {/* 30. Magnetic Button */}
        {item.id === 'magnetic-button' && (
          <button
            type="button"
            className="demo-magnetic-btn"
            style={{
              transform: `translate3d(${pointer.x * 24}px, ${pointer.y * 18}px, 0)`,
            }}
            onClick={handleDemoPresetShift}
          >
            MAGNETIC PULL
          </button>
        )}

        {/* 31. Animated Underline */}
        {item.id === 'animated-underline' && (
          <div className={`demo-underline-group ${simulatedHover ? 'is-hovered' : ''}`}>
            <span tabIndex={0} className="demo-underline-link">
              Architecture
            </span>
            <span tabIndex={0} className="demo-underline-link">
              Typography
            </span>
          </div>
        )}

        {/* 32. Coordinate Click Ripple & Press */}
        {item.id === 'click-ripple-press' && (
          <button
            type="button"
            className="demo-ripple-btn"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setRippleCoords({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                id: Date.now(),
              });
            }}
          >
            <span>CLICK FOR RIPPLE WAVE</span>
            {rippleCoords && (
              <span
                key={rippleCoords.id}
                className="demo-ripple-circle"
                style={{ left: rippleCoords.x, top: rippleCoords.y }}
              />
            )}
          </button>
        )}

        {/* 33. Toggle Switch, Checkmark & Error Shake */}
        {item.id === 'feedback-microinteractions' && (
          <div className={`demo-feedback-suite state-${feedbackState}`}>
            <button
              type="button"
              role="switch"
              aria-checked={toggleOn}
              className={`demo-spring-switch ${toggleOn ? 'on' : 'off'}`}
              onClick={() => setToggleOn((v) => !v)}
            >
              <span className="switch-thumb" />
            </button>
            <button
              type="button"
              className="demo-mini-tab"
              onClick={() => setFeedbackState('success')}
            >
              ✓ Success
            </button>
            <button
              type="button"
              className="demo-mini-tab"
              onClick={() => setFeedbackState('error')}
            >
              ✕ Shake
            </button>
            {feedbackState === 'success' && (
              <svg className="demo-check-svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M4 12.5 L9.5 18 L20 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            )}
          </div>
        )}

        {/* 34. Orbital Spinner & Rotating Seal */}
        {item.id === 'rotating-element' && (
          <div
            className={`demo-rotating-seal ${effectivePlaying ? 'playing' : 'paused'}`}
            aria-label="Rotating geometric emblem"
          >
            <div className="seal-ring" />
            <div className="seal-cross" />
          </div>
        )}

        {/* 35. Skeleton Shimmer Placeholder */}
        {item.id === 'skeleton-shimmer' && (
          <div className="demo-skeleton-card">
            {interactiveStep % 2 === 1 ? (
              <div className="demo-skeleton-resolved">
                <strong>✓ Content Loaded</strong>
                <span>Real typography and surface data resolved.</span>
              </div>
            ) : (
              <>
                <div className="skeleton-avatar shimmer-line" />
                <div className="skeleton-lines">
                  <span className="shimmer-line w-80" />
                  <span className="shimmer-line w-55" />
                </div>
              </>
            )}
          </div>
        )}

        {/* 36. Progress Bar & SVG Circular Ring */}
        {item.id === 'progress-bar-ring' && (
          <div className="demo-progress-suite">
            {(() => {
              const pct = ((interactiveStep % 4) + 1) * 25;
              const circumference = 2 * Math.PI * 22;
              const offset = circumference - (pct / 100) * circumference;
              return (
                <>
                  <svg width="58" height="58" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="var(--pf-border-subtle)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="22"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                    />
                  </svg>
                  <div className="demo-linear-progress-col">
                    <strong>{pct}% COMPLETE</strong>
                    <div className="demo-linear-track">
                      <div
                        className="demo-linear-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* 37. Staggered Loading Dots & Wave */}
        {item.id === 'loading-dots-pulse' && (
          <div className={`demo-dots-wave ${effectivePlaying ? 'playing' : 'paused'}`}>
            <span />
            <span />
            <span />
          </div>
        )}

        {/* 38. Pulsing Glow */}
        {item.id === 'pulsing-glow' && (
          <div className={`demo-pulse-beacon ${effectivePlaying ? 'playing' : 'paused'}`}>
            <span className="pulse-ring pulse-ring-1" />
            <span className="pulse-ring pulse-ring-2" />
            <span className="pulse-core">LIVE</span>
          </div>
        )}

        {/* 39. Levitating Multi-Phase Elements */}
        {item.id === 'floating-elements' && (
          <div className={`demo-floating-group ${effectivePlaying ? 'playing' : 'paused'}`}>
            <div className="float-card float-a">LAYER A</div>
            <div className="float-card float-b">LAYER B</div>
          </div>
        )}

        {/* 40. Moving Horizon Grid & Particle Field */}
        {item.id === 'aurora-moving-grid' && (
          <div className={`demo-horizon-stage ${effectivePlaying ? 'playing' : 'paused'}`}>
            <div className="horizon-grid-plane" />
            <span className="horizon-badge">MOVING PERSPECTIVE GRID</span>
          </div>
        )}

        {/* 41. Infinite Marquee Ticker */}
        {item.id === 'infinite-marquee' && (
          <div className={`demo-marquee-viewport ${effectivePlaying ? 'playing' : 'paused'}`}>
            <div className="demo-marquee-track">
              <span>THEMELAB MOTION SYSTEM • KINETIC RIBBON • </span>
              <span>THEMELAB MOTION SYSTEM • KINETIC RIBBON • </span>
            </div>
          </div>
        )}

        {/* 42. Animated Film Grain & Tactile Noise */}
        {item.id === 'grain-noise-motion' && (
          <div className={`demo-grain-stage ${effectivePlaying ? 'playing' : 'paused'}`}>
            <div className="grain-pattern-layer" />
            <span className="demo-box">CELLULOID GRAIN OVERLAY</span>
          </div>
        )}

        {/* 43. 3D Card Tilt */}
        {item.id === 'card-tilt-3d' && (
          <div
            className="demo-tilt-card"
            style={{
              transform: `perspective(600px) rotateY(${pointer.x * 18}deg) rotateX(${
                pointer.y * -18
              }deg)`,
            }}
          >
            <span className="demo-tilt-title">3D PLANE</span>
            <span className="demo-tilt-coords">
              X:{pointer.x.toFixed(1)} Y:{pointer.y.toFixed(1)}
            </span>
          </div>
        )}

        {/* 44. Cursor Radial Spotlight & Follower */}
        {item.id === 'cursor-spotlight-trail' && (
          <div
            className="demo-spotlight-stage"
            style={{
              background: `radial-gradient(90px circle at ${pointer.pxX}px ${pointer.pxY}px, var(--pf-bg-container) 0%, var(--pf-bg-subtle) 100%)`,
            }}
          >
            <div
              className="demo-cursor-follower"
              style={{
                transform: `translate3d(${pointer.pxX - 18}px, ${pointer.pxY - 18}px, 0)`,
              }}
            />
            <span className="demo-spotlight-label">SPOTLIGHT AT ({pointer.pxX}, {pointer.pxY})</span>
          </div>
        )}

        {/* 45. Vector Motion Path Orbit */}
        {item.id === 'motion-path-orbit' && (
          <div className={`demo-orbit-stage ${effectivePlaying ? 'playing' : 'paused'}`}>
            <div className="orbit-ring-track">
              <span className="orbit-satellite" />
            </div>
            <span className="orbit-core-label">ORBIT</span>
          </div>
        )}

        {/* 46. Interactive 3D Spatial Cube */}
        {item.id === 'interactive-3d-cube' && (
          <div className="demo-cube-scene">
            <div
              className="demo-cube"
              style={{
                transform: `rotateX(${-22 + pointer.y * -35}deg) rotateY(${
                  38 + pointer.x * 45
                }deg)`,
              }}
            >
              <div className="cube-face face-front">FRONT</div>
              <div className="cube-face face-back">BACK</div>
              <div className="cube-face face-right">RIGHT</div>
              <div className="cube-face face-left">LEFT</div>
              <div className="cube-face face-top">TOP</div>
              <div className="cube-face face-bottom">BASE</div>
            </div>
          </div>
        )}

        {/* 47. Image Mask Reveal */}
        {item.id === 'image-mask-reveal' && (
          <div key={playCount} className="demo-image-mask-frame">
            <div className="demo-image-mask-inner">
              <div className="demo-architectural-art">
                <div className="art-sun" />
                <div className="art-grid-lines" />
                <div className="art-caption">MASKED COMPOSITION</div>
              </div>
            </div>
          </div>
        )}

        {/* 48. Hover Zoom & Grayscale-to-Color */}
        {item.id === 'image-zoom-grayscale' && (
          <div
            tabIndex={0}
            className={`demo-zoom-color-frame ${simulatedHover ? 'is-hovered' : ''}`}
          >
            <div className="demo-zoom-color-art">
              <span className="zoom-badge">HOVER: GRAYSCALE → COLOR + 1.12x ZOOM</span>
            </div>
          </div>
        )}

        {/* 49. Duotone & Halftone Channel Mapping */}
        {item.id === 'duotone-treatment' && (
          <div className={`demo-duotone-stage palette-${interactiveStep % 3}`}>
            <div className="duotone-halftone-dots" />
            <span className="duotone-label">
              DUOTONE CHANNEL 0{(interactiveStep % 3) + 1}
            </span>
          </div>
        )}

        {/* 50. Animated Conic & Perimeter Border */}
        {item.id === 'animated-border-draw' && (
          <div className={`demo-conic-border-box ${effectivePlaying ? 'playing' : 'paused'}`}>
            <div className="demo-conic-inner">PERIMETER TRACE</div>
          </div>
        )}

        {/* 51. Frosted-Glass Backdrop Blur Lens */}
        {item.id === 'frosted-glass-effect' && (
          <div className="demo-frosted-stage">
            <div className="frosted-back-type">BACKDROP CONTRAST</div>
            <div
              className="frosted-acrylic-lens"
              style={{
                backdropFilter: `blur(${
                  interactiveStep % 3 === 0 ? 8 : interactiveStep % 3 === 1 ? 16 : 3
                }px)`,
              }}
            >
              BLUR: {interactiveStep % 3 === 0 ? '8px' : interactiveStep % 3 === 1 ? '16px' : '3px'}
            </div>
          </div>
        )}

        {/* 52. Sticky Header & Mode Crossfade */}
        {item.id === 'sticky-mode-crossfade' && (
          <div
            className={`demo-sticky-crossfade ${
              interactiveStep % 2 === 1 ? 'inverted-mode' : ''
            }`}
          >
            <div
              className={`demo-sticky-bar ${
                interactiveStep % 2 === 1 ? 'is-compact' : ''
              }`}
            >
              <strong>ThemeLab</strong>
              <span>{interactiveStep % 2 === 1 ? 'COMPACT DARK' : 'EXPANDED LIGHT'}</span>
            </div>
            <div className="demo-sticky-body">
              Surface &amp; Sticky Header Crossfade
            </div>
          </div>
        )}
      </div>

      {/* Effect Indication & Associated Themes */}
      <div className="anim-meta-block">
        <p className="anim-indication">
          <strong>Mechanism:</strong> {item.effectIndication}
        </p>
        <p className="anim-themes-note">
          <strong>Theme association:</strong> {item.commonThemes}
        </p>
      </div>

      {/* Footer Control Row */}
      <div className="anim-controls-row">
        <span className="anim-instruction">{item.instruction}</span>

        <div className="anim-controls-buttons">
          {(item.triggerType === 'replay' || item.triggerType === 'scroll') && (
            <button
              type="button"
              className="anim-control-btn"
              onClick={handleReplay}
              aria-label={`Replay ${item.name} animation`}
            >
              ↻ Replay
            </button>
          )}

          {item.triggerType === 'continuous' && (
            <button
              type="button"
              className="anim-control-btn"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={`${effectivePlaying ? 'Pause' : 'Play'} ${item.name} animation`}
            >
              {effectivePlaying ? '❚❚ Pause' : '▶ Play'}
            </button>
          )}

          {item.triggerType === 'hover' && (
            <button
              type="button"
              className="anim-control-btn"
              onClick={() => setSimulatedHover((prev) => !prev)}
              aria-pressed={simulatedHover}
            >
              {simulatedHover ? 'Reset State' : 'Trigger State'}
            </button>
          )}

          {item.triggerType === 'pointer' && (
            <button
              type="button"
              className="anim-control-btn"
              onClick={handleDemoPresetShift}
            >
              {pointer.x === 0 && pointer.y === 0 ? 'Test Offset' : 'Reset Axis'}
            </button>
          )}

          {item.triggerType === 'interactive' && (
            <button
              type="button"
              className="anim-control-btn"
              onClick={handleInteractiveTrigger}
            >
              <svg
                className="anim-bolt-icon"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Trigger / Cycle</span>
            </button>
          )}

          <button
            type="button"
            className={`add-to-list-btn ${inList ? 'is-added' : ''}`}
            onClick={() => toggleAnimationInList(item.id)}
            aria-pressed={inList}
            aria-label={
              inList
                ? `Remove ${item.name} from My List`
                : `Add ${item.name} to My List`
            }
          >
            {inList ? '✓ Added to List' : '+ Add to List'}
          </button>
        </div>
      </div>
    </article>
  );
};

export const AnimationsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const targetItemParam = searchParams.get('item');

  const [selectedCategory, setSelectedCategory] = useState<'ALL' | AnimationCategoryId>('ALL');
  const [selectedTrigger, setSelectedTrigger] = useState<'ALL' | AnimationTriggerType>('ALL');
  const [selectedTech, setSelectedTech] = useState<'ALL' | TechBadge>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [globalPaused, setGlobalPaused] = useState<boolean>(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  // Sections are expanded by default; collapsedCategories tracks contracted sections
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // When navigating to /animations?item=<id>, ensure the item is visible, scroll to it, and highlight it briefly
  useEffect(() => {
    if (!targetItemParam) return;
    const found = ANIMATION_DEMOS.find((d) => d.id === targetItemParam);
    if (!found) return;

    setSelectedCategory('ALL');
    setSelectedTrigger('ALL');
    setSelectedTech('ALL');
    setSearchQuery('');
    setCollapsedCategories((prev) => ({ ...prev, [found.category]: false }));
    setHighlightedId(found.id);

    const scrollTimer = window.setTimeout(() => {
      const el = document.getElementById(`demo-${found.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 80);

    const clearHighlightTimer = window.setTimeout(() => {
      setHighlightedId((prev) => (prev === found.id ? null : prev));
    }, 2600);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(clearHighlightTimer);
    };
  }, [targetItemParam]);

  const toggleCategoryCollapse = (catId: AnimationCategoryId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const filteredDemos = useMemo(() => {
    return ANIMATION_DEMOS.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (selectedTrigger !== 'ALL' && item.triggerType !== selectedTrigger) return false;
      if (selectedTech !== 'ALL' && item.techBadge !== selectedTech) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.effectIndication.toLowerCase().includes(q) ||
        item.commonThemes.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, selectedTrigger, selectedTech, searchQuery]);

  const groupedByCategory = useMemo(() => {
    return ANIMATION_CATEGORIES.map((cat) => ({
      category: cat,
      items: filteredDemos.filter((d) => d.category === cat.id),
    })).filter((group) => group.items.length > 0);
  }, [filteredDemos]);

  const allAreCollapsed =
    groupedByCategory.length > 0 &&
    groupedByCategory.every((g) => Boolean(collapsedCategories[g.category.id]));

  const handleToggleAllSections = () => {
    if (allAreCollapsed) {
      setCollapsedCategories({});
    } else {
      const next: Record<string, boolean> = {};
      ANIMATION_CATEGORIES.forEach((cat) => {
        next[cat.id] = true;
      });
      setCollapsedCategories(next);
    }
  };

  return (
    <section className="animations-section" aria-labelledby="animations-page-heading">
      <div className="animations-header">
        <h1 id="animations-page-heading" className="animations-heading">
          Animations &amp; Visual Effects ({ANIMATION_DEMOS.length} Live Demonstrations)
        </h1>
        <p className="animations-description">
          Explore how motion, interaction, and visual effects can transform a website experience.
          Organized across 10 core motion and visual effect families with live browser-rendered
          controls.
        </p>
      </div>

      {/* Search, Filter & Global Motion Toolbar (Contracted by default on mobile) */}
      <div className="catalogue-toolbar" role="region" aria-label="Animation Library Filters">
        <div className="catalogue-mobile-bar">
          <span className="catalogue-mobile-summary">
            Showing {filteredDemos.length} of {ANIMATION_DEMOS.length} Effects
          </span>
          <button
            type="button"
            className="catalogue-mobile-toggle-btn"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            aria-expanded={mobileFiltersOpen}
            aria-controls="animations-filter-panel"
          >
            {mobileFiltersOpen ? 'Hide Filters ▴' : 'Search & Filter ▾'}
          </button>
        </div>

        <div
          id="animations-filter-panel"
          className={`catalogue-collapsible-body ${mobileFiltersOpen ? 'is-open' : ''}`}
        >
          <div className="catalogue-search-row">
            <input
              type="search"
              className="catalogue-search-input"
              placeholder="Search 52 animations & effects (e.g. glitch, gooey, parallax, duotone, bento, ripple)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search animations and effects"
            />

            <select
              className="catalogue-select"
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value as 'ALL' | AnimationTriggerType)}
              aria-label="Filter by trigger type"
            >
              <option value="ALL">All Triggers</option>
              <option value="replay">Replay / One-Shot</option>
              <option value="interactive">Interactive / State</option>
              <option value="hover">Hover / Focus</option>
              <option value="pointer">Pointer / 3D Axis</option>
              <option value="scroll">Scroll-Linked</option>
              <option value="continuous">Continuous Loop</option>
            </select>

            <select
              className="catalogue-select"
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value as 'ALL' | TechBadge)}
              aria-label="Filter by implementation technology"
            >
              <option value="ALL">All Technologies</option>
              <option value="CSS">CSS Keyframes / Transitions</option>
              <option value="CSS + JS">CSS + JS State</option>
              <option value="SVG + CSS">SVG Vector + CSS</option>
              <option value="SVG Filter">SVG Filter Pipeline</option>
              <option value="JS + DOM">JS + DOM</option>
            </select>

            {(selectedCategory !== 'ALL' ||
              selectedTrigger !== 'ALL' ||
              selectedTech !== 'ALL' ||
              searchQuery.trim() !== '') && (
              <button
                type="button"
                className="catalogue-reset-btn"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedTrigger('ALL');
                  setSelectedTech('ALL');
                  setSearchQuery('');
                }}
              >
                Reset ({filteredDemos.length}/{ANIMATION_DEMOS.length})
              </button>
            )}

            <button
              type="button"
              className="catalogue-reset-btn"
              onClick={() => setGlobalPaused((prev) => !prev)}
              aria-pressed={globalPaused}
            >
              <span className="catalogue-btn-icon" aria-hidden="true">
                {globalPaused ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="5" y="4" width="4" height="16" />
                    <rect x="15" y="4" width="4" height="16" />
                  </svg>
                )}
              </span>
              <span>{globalPaused ? 'Resume Loops' : 'Pause Loops'}</span>
            </button>

            <button
              type="button"
              className="catalogue-reset-btn"
              onClick={handleToggleAllSections}
            >
              <span className="catalogue-btn-icon" aria-hidden="true">
                {allAreCollapsed ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                )}
              </span>
              <span>{allAreCollapsed ? 'Expand All Sections' : 'Collapse All Sections'}</span>
            </button>
          </div>

          {/* Category Navigation Pills */}
          <div
            className="catalogue-category-pills"
            role="tablist"
            aria-label="Animation Categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'ALL'}
              className={`catalogue-pill ${selectedCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ALL')}
            >
              All ({ANIMATION_DEMOS.length})
            </button>
            {ANIMATION_CATEGORIES.map((cat) => {
              const count = ANIMATION_DEMOS.filter((d) => d.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`catalogue-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedCategory('ALL');
                    } else {
                      setSelectedCategory(cat.id);
                      setCollapsedCategories((prev) => ({ ...prev, [cat.id]: false }));
                    }
                  }}
                >
                  {cat.code}. {cat.shortTitle} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grouped Category Sections (Expanded by default, individually contractable) */}
      {groupedByCategory.length === 0 ? (
        <div className="catalogue-empty">
          <p>No animations or visual effects matched your current search and filters.</p>
          <button
            type="button"
            className="catalogue-reset-btn"
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedTrigger('ALL');
              setSelectedTech('ALL');
              setSearchQuery('');
            }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        groupedByCategory.map(({ category, items }) => {
          const isCollapsed = Boolean(collapsedCategories[category.id]);
          return (
            <div
              key={category.id}
              className={`anim-category-section ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}
            >
              <div
                className="anim-category-banner anim-category-banner-interactive"
                onClick={() => toggleCategoryCollapse(category.id)}
              >
                <div>
                  <h2 className="anim-category-heading">{category.label}</h2>
                  <p className="anim-category-sub">{category.description}</p>
                </div>
                <div className="anim-category-banner-actions">
                  <span className="anim-category-count">{items.length} Demos</span>
                  <button
                    type="button"
                    className="anim-section-collapse-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategoryCollapse(category.id);
                    }}
                    aria-expanded={!isCollapsed}
                    aria-controls={`anim-section-grid-${category.id}`}
                    aria-label={`${isCollapsed ? 'Expand' : 'Collapse'} ${category.label}`}
                  >
                    {isCollapsed ? 'Expand ▾' : 'Collapse ▴'}
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <div id={`anim-section-grid-${category.id}`} className="animations-grid">
                  {items.map((item) => (
                    <AnimationDemoCard
                      key={item.id}
                      item={item}
                      globalPaused={globalPaused}
                      isHighlighted={highlightedId === item.id}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </section>
  );
};
