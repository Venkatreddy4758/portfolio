"use client";
// Traditional brass diya / lamp with an optional living flame (pure CSS/SVG).
type Props = { size?: number; className?: string; lit?: boolean };

export function BrassLamp({ size = 64, className, lit = true }: Props) {
  return (
    <div className={`relative inline-block ${className ?? ""}`} style={{ width: size }}>
      {lit && (
        <span
          aria-hidden
          className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
          style={{
            width: size * 0.34,
            height: size * 0.34,
            background:
              "radial-gradient(circle, rgba(255,210,120,0.9) 0%, rgba(213,164,55,0.4) 45%, transparent 70%)",
            filter: "blur(2px)",
            animation: "lampFlicker 2.6s ease-in-out infinite",
          }}
        />
      )}
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" aria-hidden>
        <defs>
          <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E4C98E" />
            <stop offset="0.5" stopColor="#C5A15A" />
            <stop offset="1" stopColor="#8A6A2E" />
          </linearGradient>
        </defs>
        {lit && (
          <path d="M50 14 q7 8 0 18 q-7 -10 0 -18" fill="#FFB347" opacity="0.95">
            <animate attributeName="opacity" values="0.8;1;0.85" dur="1.8s" repeatCount="indefinite" />
          </path>
        )}
        {/* bowl */}
        <path d="M22 54 Q50 78 78 54 Q70 64 50 66 Q30 64 22 54 Z" fill="url(#brass)" />
        <ellipse cx="50" cy="54" rx="28" ry="7" fill="url(#brass)" />
        <path d="M78 54 q6 -2 8 -8" stroke="url(#brass)" strokeWidth="2.5" fill="none" />
        {/* stem + base */}
        <rect x="46" y="66" width="8" height="12" fill="url(#brass)" />
        <path d="M34 90 Q50 80 66 90 Q50 84 34 90 Z" fill="url(#brass)" />
        <ellipse cx="50" cy="90" rx="20" ry="5" fill="url(#brass)" />
      </svg>
      <style jsx>{`
        @keyframes lampFlicker {
          0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
