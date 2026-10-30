/**
 * Centralized timing constants for Services Section Animation System
 * All delays and durations in milliseconds (ms)
 */
export const SERVICES_TIMINGS = {
  ENTRANCE_START: 200, // delay after heading reveal
  CARD_STAGGER: 90, // stagger per card
  CARD_DURATION: 600, // duration
  HOVER_DURATION: 250, // hover transition
  TOP_LINE_DURATION: 300, // top gradient line
  SHINE_DURATION: 700, // diagonal shine sweep
} as const;
