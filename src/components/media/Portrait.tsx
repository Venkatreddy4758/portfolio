"use client";
// Reusable photo wrapper: next/image with per-photo focal point, responsive
// mobile source, blur-in, and identity-safe object-fit (never distorts faces).
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "@/data/photos";
import { withBase } from "@/lib/basePath";

type Props = {
  photo: Photo;
  priority?: boolean;
  className?: string;
  sizes?: string;
  rounded?: boolean;
};

export function Portrait({
  photo,
  priority = false,
  className,
  sizes = "(max-width: 768px) 90vw, 50vw",
  rounded = false,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const focal = isMobile ? photo.focalPoint.mobile : photo.focalPoint.desktop;
  const src = isMobile && photo.mobileSrc ? photo.mobileSrc : photo.src;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${rounded ? "rounded-2xl" : ""} ${className ?? ""}`}
    >
      <Image
        src={withBase(src)}
        alt={photo.alt}
        fill
        priority={priority}
        quality={85}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onContextMenu={(e) => e.preventDefault()}
        className={`object-cover transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-105"
        }`}
        style={{ objectPosition: focal }}
      />
    </div>
  );
}
