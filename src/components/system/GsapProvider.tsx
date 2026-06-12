"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registers GSAP plugins once on the client. Safe to mount high in the tree.
let registered = false;

export function GsapProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    return () => {
      // Clean up all triggers on full unmount (e.g. fast refresh / route change).
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
