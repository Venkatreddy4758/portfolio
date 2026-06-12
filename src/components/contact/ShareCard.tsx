"use client";
// Share card + QR (Section 35). Copies a private link and shows a gold-on-ivory
// QR with a lotus centre. The QR is ideal for printing beside the biodata.
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Share2 } from "lucide-react";
import { profile } from "@/data/profile";
import { content } from "@/data/content";
import { useLang } from "@/lib/LanguageProvider";

export function ShareCard({ onClose }: { onClose?: () => void }) {
  const { lang } = useLang();
  const c = content.contact[lang];
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // SSR-safe: window.location is only available on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(window.location.origin + window.location.pathname);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: profile.fullName, text: content.meta[lang].siteDescription, url });
      } catch {}
    } else {
      copy();
    }
  }

  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-antique-gold/40 bg-rose p-8 text-center text-temple-stone">
      <p className="font-carved text-xs uppercase tracking-[0.25em] text-earth-brown">{c.shareProfile}</p>
      <p className="mt-1 font-display text-2xl text-royal-maroon">{profile.displayName}</p>

      <div className="relative mx-auto mt-6 inline-block rounded-2xl bg-moon-cream p-4 ring-1 ring-antique-gold/40">
        {url && (
          <QRCodeSVG
            value={url}
            size={176}
            bgColor="#FFF9ED"
            fgColor="#5E1826"
            level="H"
            imageSettings={{ src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%23FFF9ED'/%3E%3Ccircle cx='20' cy='20' r='7' fill='%23C5A15A'/%3E%3C/svg%3E", height: 38, width: 38, excavate: true }}
          />
        )}
      </div>

      <div className="mt-6 flex gap-2">
        <button onClick={copy} data-cursor="open" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-royal-maroon/40 py-2.5 font-carved text-[11px] uppercase tracking-[0.15em] text-royal-maroon hover:bg-cream hover:text-temple-stone">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy link"}
        </button>
        <button onClick={nativeShare} data-cursor="open" className="flex items-center justify-center gap-2 rounded-full bg-cream px-5 py-2.5 font-carved text-[11px] uppercase tracking-[0.15em] text-temple-stone">
          <Share2 size={14} /> Share
        </button>
      </div>
      {onClose && (
        <button onClick={onClose} className="mt-4 font-carved text-[11px] uppercase tracking-[0.2em] text-earth-brown/70 hover:text-earth-brown">
          {c.viewBiodata ? "Close" : "Close"}
        </button>
      )}
    </div>
  );
}
