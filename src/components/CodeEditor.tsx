import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

// Timing and loop configuration constants
export const START_DELAY = 900;
export const CHAR_SPEED_MIN = 22;
export const CHAR_SPEED_MAX = 50;
export const LINE_PAUSE = 260;
export const BLANK_LINE_PAUSE = 120;
export const ENABLE_LOOP = true;
export const LOOP_WAIT = 6000;
export const ERASE_SPEED = 8;

export type TokenType =
  | 'keyword'
  | 'string'
  | 'function'
  | 'functionPurple'
  | 'comment'
  | 'boolean'
  | 'property'
  | 'plain'
  | 'punctuation'
  | 'indent';

export type TokenPair = [string, TokenType];

// 13 lines of code structured as [text, tokenType] pairs
export const CODE_LINES: TokenPair[][] = [
  // Line 1
  [
    ['import', 'keyword'],
    [' { ', 'punctuation'],
    ['createExperience', 'function'],
    [' } ', 'punctuation'],
    ['from', 'keyword'],
    [' ', 'plain'],
    ["'@nexa/core'", 'string'],
    [';', 'punctuation'],
  ],
  // Line 2 (empty)
  [],
  // Line 3
  [
    ['// Building responsive modern digital solutions', 'comment'],
  ],
  // Line 4
  [
    ['export', 'keyword'],
    [' ', 'plain'],
    ['async', 'keyword'],
    [' ', 'plain'],
    ['function', 'keyword'],
    [' ', 'plain'],
    ['launchProject', 'functionPurple'],
    ['() {', 'punctuation'],
  ],
  // Line 5
  [
    ['  ', 'indent'],
    ['const', 'keyword'],
    [' ', 'plain'],
    ['project', 'plain'],
    [' = ', 'punctuation'],
    ['await', 'keyword'],
    [' ', 'plain'],
    ['createExperience', 'function'],
    ['({', 'punctuation'],
  ],
  // Line 6
  [
    ['    ', 'indent'],
    ['brand', 'property'],
    [': ', 'punctuation'],
    ['"Nexa Development"', 'string'],
    [',', 'punctuation'],
  ],
  // Line 7
  [
    ['    ', 'indent'],
    ['responsive', 'property'],
    [': ', 'punctuation'],
    ['true', 'boolean'],
    [',', 'punctuation'],
  ],
  // Line 8
  [
    ['    ', 'indent'],
    ['performance', 'property'],
    [': ', 'punctuation'],
    ['"optimized"', 'string'],
    [',', 'punctuation'],
  ],
  // Line 9
  [
    ['    ', 'indent'],
    ['cleanCode', 'property'],
    [': ', 'punctuation'],
    ['true', 'boolean'],
    [',', 'punctuation'],
  ],
  // Line 10
  [
    ['  ', 'indent'],
    ['});', 'punctuation'],
  ],
  // Line 11 (empty)
  [],
  // Line 12
  [
    ['  ', 'indent'],
    ['return', 'keyword'],
    [' ', 'plain'],
    ['project', 'plain'],
    ['.', 'punctuation'],
    ['deployToCloud', 'function'],
    ['();', 'punctuation'],
  ],
  // Line 13
  [
    ['}', 'punctuation'],
  ],
];

// Full code text for screen readers (sr-only)
export const FULL_CODE_TEXT = `import { createExperience } from '@nexa/core';

// Building responsive modern digital solutions
export async function launchProject() {
  const project = await createExperience({
    brand: "Nexa Development",
    responsive: true,
    performance: "optimized",
    cleanCode: true,
  });

  return project.deployToCloud();
}`;

// Syntax highlighting colors mapping
const TOKEN_STYLES: Record<TokenType, string> = {
  keyword: 'text-[#00BFFF]',
  string: 'text-[#4ADE80]',
  function: 'text-[#FDE047]',
  functionPurple: 'text-[#C084FC]',
  comment: 'text-[#7D8CA6] italic',
  boolean: 'text-[#38BDF8]',
  property: 'text-[#93C5FD]',
  plain: 'text-[#F5F7FF]',
  punctuation: 'text-[#94A3B8]',
  indent: 'whitespace-pre select-none text-transparent',
};

export const CodeEditor: React.FC = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSuccessTriggered, setIsSuccessTriggered] = useState(false);
  const [isElevatedGlow, setIsElevatedGlow] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastExiting, setToastExiting] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isCancelledRef = useRef(false);
  const isIntersectingRef = useRef(true);
  const resumeCallbackRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Compute total non-indent typeable characters for any line
  const getLineTypeableChars = (lineIdx: number): number => {
    if (lineIdx < 0 || lineIdx >= CODE_LINES.length) return 0;
    const line = CODE_LINES[lineIdx];
    return line
      .filter(([_, type]) => type !== 'indent')
      .reduce((sum, [text]) => sum + text.length, 0);
  };

  useEffect(() => {
    isCancelledRef.current = false;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsReducedMotion(true);
        setIsFinished(true);
        setCurrentLineIndex(CODE_LINES.length - 1);
        setCurrentCharIndex(getLineTypeableChars(CODE_LINES.length - 1));
        return;
      }
    }

    // Schedule helper that pauses when tab is hidden or element is out of viewport
    const scheduleNext = (callback: () => void, delayMs: number) => {
      if (isCancelledRef.current) return;

      const execute = () => {
        if (isCancelledRef.current) return;

        if (document.hidden || !isIntersectingRef.current) {
          // Pause and wait for resume trigger
          resumeCallbackRef.current = execute;
          return;
        }

        callback();
      };

      timerRef.current = setTimeout(execute, delayMs);
    };

    // Trigger success moment effects: ring pulse, top border sweep, 1.2s glow peak, toast
    const triggerSuccessMoment = () => {
      if (isCancelledRef.current) return;

      setIsSuccessTriggered(true);
      setIsElevatedGlow(true);

      // Return window glow to normal over 1.2s
      const glowTimer = setTimeout(() => {
        if (!isCancelledRef.current) {
          setIsElevatedGlow(false);
        }
      }, 1200);
      toastTimersRef.current.push(glowTimer);

      // Toast appears 500ms after success, stays 2.5s, then fades out in 300ms
      const toastShowTimer = setTimeout(() => {
        if (!isCancelledRef.current) {
          setToastVisible(true);
          setToastExiting(false);

          const toastExitTimer = setTimeout(() => {
            if (!isCancelledRef.current) {
              setToastExiting(true);

              const toastHideTimer = setTimeout(() => {
                if (!isCancelledRef.current) {
                  setToastVisible(false);
                  setToastExiting(false);
                }
              }, 300);
              toastTimersRef.current.push(toastHideTimer);
            }
          }, 2500);
          toastTimersRef.current.push(toastExitTimer);
        }
      }, 500);
      toastTimersRef.current.push(toastShowTimer);
    };

    // Erase sequence (backspace character by character from line 13 to line 1)
    const runErasing = (lineIdx: number, charIdx: number) => {
      if (isCancelledRef.current) return;

      if (charIdx > 0) {
        setCurrentLineIndex(lineIdx);
        setCurrentCharIndex(charIdx - 1);

        scheduleNext(() => {
          runErasing(lineIdx, charIdx - 1);
        }, ERASE_SPEED);
      } else {
        // Line reached 0 characters! Move to previous line
        if (lineIdx > 0) {
          const prevLineIdx = lineIdx - 1;
          const prevLineChars = getLineTypeableChars(prevLineIdx);
          setCurrentLineIndex(prevLineIdx);
          setCurrentCharIndex(prevLineChars);

          scheduleNext(() => {
            runErasing(prevLineIdx, prevLineChars);
          }, ERASE_SPEED);
        } else {
          // All lines erased! Ready to restart typing
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
          setHasStarted(false);

          scheduleNext(() => {
            setHasStarted(true);
            runTyping(0, 0);
          }, 350);
        }
      }
    };

    // Typing sequence
    const runTyping = (lineIdx: number, charIdx: number) => {
      if (isCancelledRef.current) return;

      if (lineIdx >= CODE_LINES.length) {
        // All 13 lines finished
        setIsFinished(true);
        triggerSuccessMoment();

        // Optional loop: after LOOP_WAIT, erase and retype
        if (ENABLE_LOOP) {
          scheduleNext(() => {
            if (isCancelledRef.current) return;
            setIsFinished(false);
            setIsSuccessTriggered(false);
            setToastVisible(false);
            setToastExiting(false);

            const lastLineIdx = CODE_LINES.length - 1;
            const lastLineChars = getLineTypeableChars(lastLineIdx);
            runErasing(lastLineIdx, lastLineChars);
          }, LOOP_WAIT);
        }
        return;
      }

      const typeableCharsCount = getLineTypeableChars(lineIdx);

      // Empty line (like line 2 or 11)
      if (typeableCharsCount === 0) {
        setCurrentLineIndex(lineIdx);
        setCurrentCharIndex(0);

        scheduleNext(() => {
          runTyping(lineIdx + 1, 0);
        }, BLANK_LINE_PAUSE);
        return;
      }

      // Typing characters on current line
      if (charIdx < typeableCharsCount) {
        setCurrentLineIndex(lineIdx);
        setCurrentCharIndex(charIdx + 1);

        const charSpeed =
          Math.floor(Math.random() * (CHAR_SPEED_MAX - CHAR_SPEED_MIN + 1)) +
          CHAR_SPEED_MIN;

        scheduleNext(() => {
          runTyping(lineIdx, charIdx + 1);
        }, charSpeed);
      } else {
        // Line finished typing!
        if (lineIdx === CODE_LINES.length - 1) {
          setIsFinished(true);
          triggerSuccessMoment();

          if (ENABLE_LOOP) {
            scheduleNext(() => {
              if (isCancelledRef.current) return;
              setIsFinished(false);
              setIsSuccessTriggered(false);
              setToastVisible(false);
              setToastExiting(false);

              const lastLineIdx = CODE_LINES.length - 1;
              const lastLineChars = getLineTypeableChars(lastLineIdx);
              runErasing(lastLineIdx, lastLineChars);
            }, LOOP_WAIT);
          }
        } else {
          scheduleNext(() => {
            runTyping(lineIdx + 1, 0);
          }, LINE_PAUSE);
        }
      }
    };

    // Resume handler when tab or viewport visibility is restored
    const handleResumeCheck = () => {
      if (!document.hidden && isIntersectingRef.current && resumeCallbackRef.current) {
        const resumeFn = resumeCallbackRef.current;
        resumeCallbackRef.current = null;
        resumeFn();
      }
    };

    const handleVisibilityChange = () => {
      handleResumeCheck();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // IntersectionObserver to pause loop when out of viewport
    let observer: IntersectionObserver | null = null;
    if (containerRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        handleResumeCheck();
      });
      observer.observe(containerRef.current);
    }

    // Initial delay of 600ms before starting
    scheduleNext(() => {
      setHasStarted(true);
      runTyping(0, 0);
    }, START_DELAY);

    return () => {
      isCancelledRef.current = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      toastTimersRef.current.forEach(clearTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Helper to render line tokens and cursor
  const renderLineContent = (lineIdx: number) => {
    const lineTokens = CODE_LINES[lineIdx];

    // If line has not been reached yet
    if (!isFinished && (!hasStarted || lineIdx > currentLineIndex)) {
      return null;
    }

    // If line is in the past, or animation is finished
    if (isFinished || lineIdx < currentLineIndex) {
      const isLastLine = lineIdx === CODE_LINES.length - 1;
      return (
        <>
          {lineTokens.map(([text, type], tokenIdx) => (
            <span key={tokenIdx} className={TOKEN_STYLES[type]}>
              {text}
            </span>
          ))}
          {/* Cursor stays blinking at the end of the last line when finished */}
          {isFinished && isLastLine && !isReducedMotion && (
            <span
              className="inline-block w-[8px] h-[1.15em] bg-[#00BFFF] align-middle ml-[2px] animate-cursor-blink"
              aria-hidden="true"
            />
          )}
        </>
      );
    }

    // Active line currently being typed or erased
    const indentToken = lineTokens.find(([_, type]) => type === 'indent');
    const typeableTokens = lineTokens.filter(([_, type]) => type !== 'indent');

    // Empty line active
    if (typeableTokens.length === 0) {
      return (
        <>
          {!isReducedMotion && (
            <span
              className="inline-block w-[8px] h-[1.15em] bg-[#00BFFF] align-middle animate-cursor-blink"
              aria-hidden="true"
            />
          )}
        </>
      );
    }

    let remaining = currentCharIndex;
    let cursorRendered = false;

    return (
      <>
        {/* Leading indentation appears instantly */}
        {indentToken && (
          <span className={TOKEN_STYLES.indent}>{indentToken[0]}</span>
        )}

        {/* If no characters typed yet on this line, cursor appears after indent */}
        {remaining === 0 && !cursorRendered && !isReducedMotion && (
          <span
            className="inline-block w-[8px] h-[1.15em] bg-[#00BFFF] align-middle ml-[2px] animate-cursor-blink"
            aria-hidden="true"
          />
        )}

        {/* Tokens typed slice by slice with live syntax highlighting */}
        {typeableTokens.map(([text, type], tokenIdx) => {
          if (remaining <= 0) {
            return null;
          }

          if (remaining >= text.length) {
            remaining -= text.length;
            const isEndOfLine =
              remaining === 0 &&
              tokenIdx === typeableTokens.length - 1 &&
              !cursorRendered &&
              !isReducedMotion;

            return (
              <React.Fragment key={tokenIdx}>
                <span className={TOKEN_STYLES[type]}>{text}</span>
                {isEndOfLine && (
                  <span
                    className="inline-block w-[8px] h-[1.15em] bg-[#00BFFF] align-middle ml-[2px] animate-cursor-blink"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          } else {
            const visibleSlice = text.slice(0, remaining);
            remaining = 0;
            cursorRendered = true;

            return (
              <React.Fragment key={tokenIdx}>
                <span className={TOKEN_STYLES[type]}>{visibleSlice}</span>
                {!isReducedMotion && (
                  <span
                    className="inline-block w-[8px] h-[1.15em] bg-[#00BFFF] align-middle ml-[2px] animate-cursor-blink"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            );
          }
        })}
      </>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[520px] mx-auto select-none"
    >
      {/* Visually hidden full code for screen readers */}
      <pre className="sr-only">
        <code>{FULL_CODE_TEXT}</code>
      </pre>

      {/* Floating "Nexa Development" badge at top-right corner overlapping window's top edge (top: -18px, right: 24px) */}
      <div
        className={`absolute z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#050817] border border-[#00BFFF]/50 text-[#00BFFF] text-[12px] sm:text-[13px] font-mono font-medium ${
          !isReducedMotion
            ? 'animate-badge-float animate-badge-glow'
            : 'shadow-[0_4px_16px_rgba(0,191,255,0.25)]'
        }`}
        style={{ top: '-18px', right: '24px' }}
      >
        <Sparkles
          className={`w-3.5 h-3.5 text-[#00BFFF] ${
            !isReducedMotion ? 'animate-sparkle' : ''
          }`}
        />
        <span>Nexa Development</span>
      </div>

      {/* Editor Window Container with 1px cyan border and dark soft shadow only (no cyan glow) */}
      <div
        className="relative w-full bg-[#0B1730] border border-[rgba(0,191,255,0.25)] rounded-[14px] overflow-hidden"
        style={{
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        }}
      >
        {/* Top Border Cyan Glow Sweep (one-time upon success) */}
        {isSuccessTriggered && !isReducedMotion && (
          <div
            className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none z-30"
            aria-hidden="true"
          >
            <div className="w-[50%] h-full bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent animate-border-sweep" />
          </div>
        )}

        {/* Header (height 40px) */}
        <div className="h-[40px] px-3.5 bg-[#081124] border-b border-[rgba(0,191,255,0.15)] flex items-center justify-between">
          {/* 3 dots (12px each) */}
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-sm"
              title="Close"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-sm"
              title="Minimize"
            />
            <span
              className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-sm"
              title="Maximize"
            />
          </div>

          {/* Filename tab: nexa.tsx */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#0B1730] rounded-t-md border-t border-x border-[rgba(0,191,255,0.2)] text-[12px] font-mono text-[#F5F7FF]">
            <Terminal className="w-3 h-3 text-[#00BFFF]" />
            <span>nexa.tsx</span>
          </div>

          {/* Clean right spacer so the badge has full clearance without overlap */}
          <div className="w-8" aria-hidden="true" />
        </div>

        {/* Code Content Area: fixed row height 26px mobile / 28px desktop, aria-hidden for accessibility */}
        <div
          aria-hidden="true"
          className="relative p-3.5 sm:p-4 font-mono text-[12.5px] sm:text-[14px] overflow-x-auto bg-[#071022]"
        >
          <div className="text-left w-full min-w-max">
            {CODE_LINES.map((_, lineIdx) => {
              const isActive =
                !isFinished && hasStarted && currentLineIndex === lineIdx;
              const isLineActiveOrPast =
                isFinished || (hasStarted && currentLineIndex >= lineIdx);

              return (
                <div
                  key={lineIdx}
                  className={`h-[26px] sm:h-[28px] leading-[26px] sm:leading-[28px] flex items-center whitespace-pre border-l-2 transition-all ${
                    isFinished ? 'duration-300' : 'duration-150'
                  } ${
                    isActive
                      ? 'bg-[rgba(0,191,255,0.06)] border-[#00BFFF]'
                      : 'bg-transparent border-transparent'
                  }`}
                >
                  {/* Line Number: cyan while active, gray when past, fades out when finished over 300ms */}
                  <span
                    className={`w-6 sm:w-7 pr-3 select-none text-right flex-shrink-0 transition-colors transition-opacity ${
                      isFinished ? 'duration-300' : 'duration-150'
                    } ${
                      isActive
                        ? 'text-[#00BFFF] opacity-100'
                        : isLineActiveOrPast
                        ? 'text-[#3A4A66] opacity-100'
                        : 'text-[#3A4A66] opacity-0'
                    }`}
                  >
                    {lineIdx + 1}
                  </span>

                  {/* Line Code Content */}
                  <div className="flex-1 overflow-visible">
                    {renderLineContent(lineIdx)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Success Toast Chip (slides up from bottom-right corner of code area) */}
          {toastVisible && (
            <div
              role="status"
              aria-live="polite"
              className={`absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A1730] border border-[#00BFFF]/50 text-[#00BFFF] text-[13px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-none select-none ${
                toastExiting
                  ? 'opacity-0 translate-y-1'
                  : 'opacity-100 translate-y-0'
              }`}
            >
              <span className="font-bold">✓</span>
              <span>Deployed to cloud</span>
            </div>
          )}
        </div>

        {/* Footer micro status bar */}
        <div className="px-3.5 py-1.5 bg-[#081124] border-t border-[rgba(0,191,255,0.12)] flex items-center justify-between text-[11px] font-mono text-[#A7B4C9]">
          <span>UTF-8 · LF</span>
          <div aria-live="polite" className="relative h-4 flex items-center">
            {!isFinished ? (
              <div className="flex items-center gap-2">
                {/* 8px gray dot pulsing */}
                <span
                  className={`w-2 h-2 rounded-full bg-[#7D8CA6] flex-shrink-0 ${
                    !isReducedMotion ? 'animate-status-dot-pulse' : ''
                  }`}
                  aria-hidden="true"
                />
                <span className="text-[#7D8CA6] flex items-center">
                  <span>Compiling</span>
                  <span
                    className="inline-flex tracking-wider ml-0.5"
                    aria-hidden="true"
                  >
                    <span className={!isReducedMotion ? 'animate-dot-1' : ''}>
                      .
                    </span>
                    <span className={!isReducedMotion ? 'animate-dot-2' : ''}>
                      .
                    </span>
                    <span className={!isReducedMotion ? 'animate-dot-3' : ''}>
                      .
                    </span>
                  </span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 animate-slide-up-fade">
                <div className="relative flex items-center justify-center w-2 h-2 flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#00BFFF]" />
                  {isSuccessTriggered && !isReducedMotion && (
                    <span
                      className="absolute inset-0 rounded-full border border-[#00BFFF] animate-ring-pulse pointer-events-none"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className="text-[#00BFFF]">Compiled Successfully</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
