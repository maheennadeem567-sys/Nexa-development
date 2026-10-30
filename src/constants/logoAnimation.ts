/**
 * Centralized timing constants for Logo Animation System
 * All delays and durations in milliseconds (ms) unless noted
 */
export const LOGO_TIMINGS = {
  // Entrance sequence (delays from page load)
  ENTRANCE_DURATION: 600, // Icon box entrance duration
  ICON_ROTATE_FROM: -90, // deg
  ICON_SCALE_FROM: 0.6,

  // Bracket entrance timing
  BRACKET_DRAW_DELAY: 200, // 200ms after icon box appears
  BRACKET_DRAW_DURATION: 400, // 400ms slide & fade
  SLASH_FADE_DELAY: 400, // fades in last
  SLASH_FADE_DURATION: 200, // 200ms

  // Brand text entrance timing
  WORD_FIRST_DELAY: 250, // 250ms
  WORD_FIRST_DURATION: 500, // 500ms
  WORD_SECOND_DELAY: 350, // 350ms
  WORD_SECOND_DURATION: 500, // 500ms

  // One-time shine on cyan word after entrance finishes
  SHINE_DELAY: 1000, // ~1000ms after load
  SHINE_DURATION: 900, // 900ms sweep duration

  // Idle effects
  BORDER_PULSE_DURATION: 3000, // 3s alternate infinite
  NUDGE_INTERVAL: 6000, // every 6 seconds
  NUDGE_DURATION: 500, // 500ms ease-in-out

  // Hover & Interaction
  HOVER_DURATION: 250, // 250ms ease
  HOVER_SHINE_DURATION: 600, // 600ms shine sweep on hover
  PRESS_DURATION: 100, // 100ms scale 0.97
  SCROLL_SHRINK_DURATION: 250, // 250ms scale 1 to 0.94
} as const;

export const ENTRANCE_DURATION = LOGO_TIMINGS.ENTRANCE_DURATION;
export const SHINE_DELAY = LOGO_TIMINGS.SHINE_DELAY;
export const NUDGE_INTERVAL = LOGO_TIMINGS.NUDGE_INTERVAL;
export const HOVER_DURATION = LOGO_TIMINGS.HOVER_DURATION;
