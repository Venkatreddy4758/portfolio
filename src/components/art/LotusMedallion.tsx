"use client";
// Layered lotus medallion / seal. Used for the secret interaction, scroll-thread
// markers, and as a decorative seal. `open` blooms the inner petals.
type Props = {
  size?: number;
  className?: string;
  open?: boolean;
  tone?: string;
};

export function LotusMedallion({
  size = 48,
  className,
  open = false,
  tone = "#C5A15A",
}: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      aria-hidden
    >
      {/* outer ring */}
      <circle cx="50" cy="50" r="46" stroke={tone} strokeWidth="1" opacity="0.7" />
      {/* outer 8 petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={`o-${i}`}
          d="M50 50 C44 30 44 18 50 8 C56 18 56 30 50 50 Z"
          fill={tone}
          opacity={0.55}
          transform={`rotate(${i * 45} 50 50)`}
        />
      ))}
      {/* inner 8 petals — bloom outward when open */}
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={`i-${i}`}
          d="M50 50 C46 36 46 28 50 20 C54 28 54 36 50 50 Z"
          fill={tone}
          opacity={0.95}
          transform={`rotate(${i * 45 + 22.5} 50 50) scale(${open ? 1 : 0.7})`}
          style={{
            transformOrigin: "50px 50px",
            transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill={tone} />
      <circle cx="50" cy="50" r="2.5" fill="#F8F0DF" />
    </svg>
  );
}
