"use client";
// VR / వెం royal seal — engraved monogram inside a lotus-ringed medallion.
// Clicking it 5× triggers the secret blessing (Section 31) via onSecret().
import { useRef } from "react";

type Props = {
  size?: number;
  className?: string;
  onSecret?: () => void;
  title?: string;
};

export function RoyalMonogram({ size = 72, className, onSecret, title = "VR" }: Props) {
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    if (clicks.current >= 5) {
      clicks.current = 0;
      onSecret?.();
      return;
    }
    timer.current = setTimeout(() => (clicks.current = 0), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${title} monogram`}
      data-cursor="open"
      className={`group inline-grid place-items-center bg-transparent ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" aria-hidden>
        <defs>
          <linearGradient id="rm-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E4C98E" />
            <stop offset="0.5" stopColor="#C5A15A" />
            <stop offset="1" stopColor="#9C7B3A" />
          </linearGradient>
        </defs>
        {/* outer ring */}
        <circle cx="50" cy="50" r="46" stroke="url(#rm-gold)" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="42" stroke="url(#rm-gold)" strokeWidth="0.5" opacity="0.6" />
        {/* twelve lotus petals around the ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 50 + Math.cos(a) * 44;
          const y = 50 + Math.sin(a) * 44;
          return (
            <path
              key={i}
              d={`M${x} ${y} q3 -4 0 -8 q-3 4 0 8`}
              transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`}
              fill="url(#rm-gold)"
              opacity="0.9"
            />
          );
        })}
        {/* engraved VR */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="Cinzel, Georgia, serif"
          fontSize="30"
          fill="url(#rm-gold)"
          className="transition-transform duration-700 [transform-origin:center] group-hover:[transform:rotate(4deg)]"
        >
          VR
        </text>
      </svg>
    </button>
  );
}
