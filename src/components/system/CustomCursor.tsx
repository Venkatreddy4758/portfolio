"use client";
import { useEffect, useRef, useState } from "react";

// Antique-gold ring + dot with smooth delayed follow. Desktop / fine-pointer only.
// Reads data-cursor="view|open|chudandi" on hovered elements to change the label.
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        const c = target.dataset.cursor;
        setLabel(c === "view" ? "VIEW" : c === "open" ? "OPEN" : c === "chudandi" ? "చూడండి" : "");
      } else {
        setLabel("");
      }
      // Hide over editable / selectable text inputs.
      const el = e.target as HTMLElement;
      setHidden(["INPUT", "TEXTAREA"].includes(el?.tagName) || el?.isContentEditable === true);
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    document.documentElement.style.cursor = "none";

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="cursor-layer" data-hidden={hidden}>
      <div ref={ringRef} className={`cursor-ring ${label ? "is-labelled" : ""}`}>
        {label && <span className="cursor-label">{label}</span>}
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
