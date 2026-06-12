"use client";
// Carved corner scroll. Place in the four corners of framed sections. `position`
// rotates the same motif so one asset serves all corners.
type Corner = "tl" | "tr" | "bl" | "br";
type Props = { position?: Corner; size?: number; tone?: string; className?: string };

const rotation: Record<Corner, number> = { tl: 0, tr: 90, br: 180, bl: 270 };

export function CornerOrnament({
  position = "tl",
  size = 64,
  tone = "#C5A15A",
  className,
}: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${rotation[position]}deg)` }}
      fill="none"
      aria-hidden
    >
      <path
        d="M4 4 L46 4 M4 4 L4 46"
        stroke={tone}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 4 Q40 8 44 44 Q40 20 8 20 Q24 24 24 40"
        stroke={tone}
        strokeWidth="1"
        fill="none"
        opacity="0.8"
      />
      <circle cx="10" cy="10" r="2.5" fill={tone} />
      <path d="M14 4 Q30 6 30 22" stroke={tone} strokeWidth="0.6" fill="none" opacity="0.5" />
    </svg>
  );
}
