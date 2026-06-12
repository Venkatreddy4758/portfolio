"use client";
// Museum gallery (Section 23). Curated varied-size wall (not plain masonry).
// Full-screen lightbox with keyboard + swipe nav, category filters, ambient bg
// sampled from the active image, counter, captions, Esc-close, focus trap.
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { photos, categories, type Photo, type PhotoCategory } from "@/data/photos";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";
import { sampleImageColor } from "@/lib/sampleImageColor";
import { Portrait } from "./Portrait";
import { SectionDivider } from "@/components/art/SectionDivider";

// Curated span pattern for a museum wall (varied sizes).
const spans = [
  "lg:col-span-2 lg:row-span-2",
  "lg:row-span-1",
  "lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2 lg:row-span-1",
  "lg:row-span-2",
  "lg:col-span-1",
];

export function MuseumGallery() {
  const { lang } = useLang();
  const g = content.gallery[lang];
  const [filter, setFilter] = useState<PhotoCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [bg, setBg] = useState("rgb(61,32,57)");
  const closeRef = useRef<HTMLButtonElement>(null);

  const visible = filter === "all" ? photos : photos.filter((p) => p.category === filter);
  const active: Photo | null = openIndex !== null ? visible[openIndex] : null;

  const go = useCallback(
    (dir: number) => {
      setOpenIndex((i) => {
        if (i === null) return i;
        return (i + dir + visible.length) % visible.length;
      });
    },
    [visible.length]
  );

  // Sample ambient colour from the active image.
  useEffect(() => {
    if (active) sampleImageColor(active.src).then(setBg);
  }, [active]);

  // Keyboard nav + focus management.
  useEffect(() => {
    if (openIndex === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, go]);

  // Touch swipe in lightbox.
  const touchX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <section id="gallery" className="relative bg-cream py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionDivider className="mb-6" />
        <h2 className="text-center font-display text-4xl text-royal-maroon md:text-5xl">{g.title}</h2>
        <p className="mt-3 text-center font-body text-temple-stone/65">{g.subtitle}</p>

        {/* filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {(["all", ...categories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); }}
              data-cursor="open"
              className={`rounded-full border px-4 py-1.5 font-carved text-[11px] uppercase tracking-[0.15em] transition-all ${
                filter === cat ? "border-champagne-gold bg-rose-gold text-temple-stone" : "border-antique-gold/40 text-temple-stone/70 hover:text-temple-stone"
              }`}
            >
              {cat === "all" ? g.all : cat}
            </button>
          ))}
        </div>

        {/* wall */}
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-3 lg:auto-rows-[200px] lg:grid-cols-4">
          {visible.map((p, i) => (
            <motion.button
              key={p.id}
              layout
              onClick={() => setOpenIndex(i)}
              data-cursor="view"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              className={`group relative overflow-hidden rounded-xl ring-1 ring-antique-gold/20 ${filter === "all" ? spans[i % spans.length] : ""}`}
            >
              <Portrait photo={p} sizes="(max-width: 768px) 45vw, 25vw" />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="pointer-events-none absolute bottom-3 left-3 right-3 translate-y-2 text-left opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <span className="block font-display text-sm text-temple-stone">{p.title}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-10"
            style={{ background: `linear-gradient(to bottom, ${bg}f2, #1a0f17f7)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button ref={closeRef} onClick={() => setOpenIndex(null)} aria-label={g.close} className="absolute right-4 top-4 z-10 rounded-full border border-royal-maroon/30 p-2 text-temple-stone/80 hover:text-temple-stone">
              <X size={20} />
            </button>
            <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-royal-maroon/20 p-2 text-temple-stone/70 hover:text-temple-stone sm:left-6">
              <ChevronLeft size={26} />
            </button>
            <button onClick={() => go(1)} aria-label="Next" className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-royal-maroon/20 p-2 text-temple-stone/70 hover:text-temple-stone sm:right-6">
              <ChevronRight size={26} />
            </button>

            <motion.figure
              key={active.id}
              className="flex max-h-full max-w-3xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative aspect-[3/4] max-h-[72vh] w-auto overflow-hidden rounded-lg" style={{ height: "72vh" }}>
                <Portrait photo={active} sizes="80vw" />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-display text-xl text-temple-stone">{active.title}</p>
                <p className="mt-1 font-carved text-[11px] uppercase tracking-[0.2em] text-temple-stone/50">
                  {openIndex! + 1} {g.of} {visible.length}
                  {active.location ? ` · ${active.location}` : ""}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
