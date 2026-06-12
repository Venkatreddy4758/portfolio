"use client";
// Dedicated print/PDF view for the one-page biodata. Auto-opens the print dialog
// and provides a manual button. Print stylesheet strips margins/background.
import { useEffect } from "react";
import Link from "next/link";
import { PrintableBiodata } from "@/components/contact/PrintableBiodata";

export default function BiodataPrintPage() {
  useEffect(() => {
    document.title = "Venkat Reddy Regulapally — Biodata";
  }, []);

  return (
    <div className="min-h-screen bg-[#e9e2d2] py-8">
      <div className="no-print mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-4">
        <Link href="/" className="font-serif text-sm text-[#5e1826] underline">← Back to portfolio</Link>
        <button
          onClick={() => window.print()}
          className="rounded-full bg-[#5e1826] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f8f0df]"
        >
          Print / Save as PDF
        </button>
      </div>

      <PrintableBiodata />

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: #fff !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
