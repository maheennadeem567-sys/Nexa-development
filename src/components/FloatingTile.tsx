import React from 'react';
import { Atom, Flame, Server, CodeXml, Smartphone, LucideIcon } from 'lucide-react';
import { FloatingTileData, TILE_START, TILE_STAGGER } from '../constants/heroAnimation.ts';

const iconMap: Record<NonNullable<FloatingTileData['iconName']>, LucideIcon> = {
  Atom,
  Flame,
  Server,
  CodeXml,
  Smartphone,
};

export interface FloatingTileProps {
  tile: FloatingTileData;
  index: number;
}

export const FloatingTile: React.FC<FloatingTileProps> = ({ tile, index }) => {
  const entranceDelay = TILE_START + index * TILE_STAGGER;

  // Show floating tiles only on desktop (1024px and above)
  const visibilityClass = 'hidden lg:block';

  const IconComponent = tile.iconName ? iconMap[tile.iconName] : null;

  return (
    <div
      aria-hidden="true"
      className={`absolute z-20 pointer-events-none select-none ${visibilityClass}`}
      style={{
        ...tile.desktopPosition,
      }}
    >
      {/* Outer element: entrance animation (scale 0.8 to 1, fade in) */}
      <div
        className="floating-tile-outer pointer-events-auto"
        style={{
          animationDelay: `${entranceDelay}ms`,
        }}
      >
        {/* Inner element: floating loop (translateY 0 to -10px, rotate -2deg to 2deg) */}
        <div
          className="floating-tile-inner group cursor-default"
          style={{
            animationDuration: `${tile.duration}s`,
            animationDelay: tile.floatDelay,
          }}
        >
          {/* Card box: rounded-2xl (16px), 90% navy, 1px cyan border, 0 8px 24px shadow */}
          <div
            style={{ borderColor: 'rgba(0, 191, 255, 0.18)' }}
            className="floating-tile-card w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] lg:w-[64px] lg:h-[64px] rounded-[16px] bg-[#0B1730]/90 border shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-200"
          >
            {tile.type === 'icon' && IconComponent ? (
              <IconComponent
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[28px] lg:h-[28px] transition-transform duration-200"
                style={{ color: tile.color }}
              />
            ) : (
              <span
                className="font-mono font-bold text-[15px] sm:text-[18px] lg:text-[22px] tracking-tight transition-transform duration-200"
                style={{ color: tile.color }}
              >
                {tile.text}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
