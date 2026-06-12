"use client";
// Animated rangoli that draws itself — used as the loading / opening flourish.
type Props = { size?: number; className?: string; tone?: string; play?: boolean };

export function RangoliLoader({
  size = 160,
  className,
  tone = "#C5A15A",
  play = true,
}: Props) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      aria-hidden
    >
      <g
        style={{
          strokeDasharray: 1400,
          strokeDashoffset: play ? 0 : 1400,
          transition: "stroke-dashoffset 2.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <circle cx="100" cy="100" r="70" stroke={tone} strokeWidth="1.2" />
        <circle cx="100" cy="100" r="50" stroke={tone} strokeWidth="0.8" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d="M100 100 C112 70 112 50 100 30 C88 50 88 70 100 100 Z"
            stroke={tone}
            strokeWidth="1"
            transform={`rotate(${i * 45} 100 100)`}
          />
        ))}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <circle
              key={`d-${i}`}
              cx={100 + Math.cos(a) * 84}
              cy={100 + Math.sin(a) * 84}
              r="2.5"
              fill={tone}
            />
          );
        })}
      </g>
    </svg>
  );
}
