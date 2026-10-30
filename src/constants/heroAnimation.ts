/**
 * Centralized timing constants for Hero Section Animation System
 * All delays and durations in milliseconds (ms) unless noted
 */
export const HERO_TIMINGS = {
  // Existing left-column timings (kept intact)
  TOP_BADGE_DELAY: 0,
  TOP_BADGE_DURATION: 600,
  SPARKLE_POP_DELAY: 200,
  SPARKLE_POP_DURATION: 500,

  H1_START_DELAY: 150,
  WORD_STAGGER: 80,
  WORD_DURATION: 700,

  DESCRIPTION_DELAY: 600,
  DESCRIPTION_DURATION: 600,

  BUTTON_PRIMARY_DELAY: 760,
  BUTTON_OUTLINE_DELAY: 860,
  BUTTON_ENTRANCE_DURATION: 600,

  TECH_LABEL_DELAY: 960,
  TECH_LABEL_DURATION: 500,

  TECH_BADGES_START: 1000,
  BADGE_STAGGER: 70,
  TECH_BADGE_DURATION: 500,

  HEADING_SHINE_DELAY: 1100,
  HEADING_SHINE_DURATION: 1000,

  HOVER_DURATION: 200,
  NUDGE_INTERVAL: 6000,
  NUDGE_DURATION: 500,
  WAVE_INTERVAL: 8000,
  WAVE_DURATION: 600,
  WAVE_START_DELAY: 2000,
  WAVE_STAGGER: 90,
  AMBIENT_DRIFT_DURATION: 12000,
  SPARKLE_TWINKLE_DURATION: 2400,
  BADGE_GLOW_PULSE_DURATION: 3000,
  RIPPLE_DURATION: 500,

  // Code Editor & Floating Tiles & Scroll Indicator timings:
  WINDOW_DELAY: 300,
  WINDOW_DURATION: 700,
  TYPE_START: 900,
  TILE_START: 1000,
  TILE_STAGGER: 100,
  TILE_ENTRANCE_DURATION: 500,
  SCROLL_INDICATOR_DELAY: 1800,
} as const;

export const WINDOW_DELAY = HERO_TIMINGS.WINDOW_DELAY;
export const TYPE_START = HERO_TIMINGS.TYPE_START;
export const TILE_START = HERO_TIMINGS.TILE_START;
export const TILE_STAGGER = HERO_TIMINGS.TILE_STAGGER;
export const SCROLL_INDICATOR_DELAY = HERO_TIMINGS.SCROLL_INDICATOR_DELAY;

export interface FloatingTileData {
  id: string;
  name: string;
  type: 'icon' | 'text';
  iconName?: 'Atom' | 'Flame' | 'Server' | 'CodeXml' | 'Smartphone';
  text?: string;
  color: string;
  duration: number; // in seconds
  floatDelay: string; // e.g. "-1.2s"
  minBreakpoint: 'mobile' | 'tablet' | 'desktop'; // mobile (all), tablet (640+), desktop (1024+)
  // Positions
  desktopSize: number;
  desktopPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  tabletSize: number;
  tabletPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  mobileSize: number;
  mobilePosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

/**
 * 6 floating technology tiles data:
 * 1. React: atom icon, #61DAFB, 64px, top -6%, left 6%
 * 2. JavaScript: "JS" text in bold mono, #F7DF1E, 64px, top 14%, right 0
 * 3. Firebase: flame icon, #FFCA28, 60px, top 62%, right 0
 * 4. Backend: server icon, #00BFFF, 64px, bottom 12%, left 0
 * 5. HTML: code brackets </> icon, #E34F26, 52px, bottom -5%, left 38%
 * 6. Flutter/mobile: smartphone icon, #54C5F8, 44px, bottom 22%, right 12%
 */
export const FLOATING_TILES_DATA: FloatingTileData[] = [
  {
    id: 'tile-react',
    name: 'React',
    type: 'icon',
    iconName: 'Atom',
    color: '#61DAFB',
    duration: 5.2,
    floatDelay: '-1.4s',
    minBreakpoint: 'mobile',
    desktopSize: 64,
    desktopPosition: { top: '-6%', left: '6%' },
    tabletSize: 52,
    tabletPosition: { top: '-5%', left: '5%' },
    mobileSize: 44,
    mobilePosition: { top: '-4%', left: '3%' },
  },
  {
    id: 'tile-javascript',
    name: 'JavaScript',
    type: 'text',
    text: 'JS',
    color: '#F7DF1E',
    duration: 6.4,
    floatDelay: '-2.8s',
    minBreakpoint: 'mobile',
    desktopSize: 64,
    desktopPosition: { top: '14%', right: '0' },
    tabletSize: 52,
    tabletPosition: { top: '12%', right: '0' },
    mobileSize: 44,
    mobilePosition: { top: '10%', right: '0' },
  },
  {
    id: 'tile-firebase',
    name: 'Firebase',
    type: 'icon',
    iconName: 'Flame',
    color: '#FFCA28',
    duration: 4.8,
    floatDelay: '-0.9s',
    minBreakpoint: 'tablet',
    desktopSize: 60,
    desktopPosition: { top: '62%', right: '0' },
    tabletSize: 52,
    tabletPosition: { top: '60%', right: '0' },
    mobileSize: 44,
    mobilePosition: { top: '58%', right: '0' },
  },
  {
    id: 'tile-backend',
    name: 'Backend',
    type: 'icon',
    iconName: 'Server',
    color: '#00BFFF',
    duration: 5.8,
    floatDelay: '-3.3s',
    minBreakpoint: 'mobile',
    desktopSize: 64,
    desktopPosition: { bottom: '12%', left: '0' },
    tabletSize: 52,
    tabletPosition: { bottom: '10%', left: '0' },
    mobileSize: 44,
    mobilePosition: { bottom: '8%', left: '0' },
  },
  {
    id: 'tile-html',
    name: 'HTML',
    type: 'icon',
    iconName: 'CodeXml',
    color: '#E34F26',
    duration: 6.8,
    floatDelay: '-4.1s',
    minBreakpoint: 'desktop',
    desktopSize: 52,
    desktopPosition: { bottom: '-5%', left: '38%' },
    tabletSize: 48,
    tabletPosition: { bottom: '-4%', left: '38%' },
    mobileSize: 40,
    mobilePosition: { bottom: '-3%', left: '38%' },
  },
  {
    id: 'tile-flutter',
    name: 'Flutter',
    type: 'icon',
    iconName: 'Smartphone',
    color: '#54C5F8',
    duration: 4.4,
    floatDelay: '-1.7s',
    minBreakpoint: 'desktop',
    desktopSize: 44,
    desktopPosition: { bottom: '22%', right: '12%' },
    tabletSize: 40,
    tabletPosition: { bottom: '20%', right: '10%' },
    mobileSize: 36,
    mobilePosition: { bottom: '18%', right: '8%' },
  },
];
