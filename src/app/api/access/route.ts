import { NextResponse } from "next/server";

// Server-side contact reveal. The access code and the real contact details live
// ONLY in server env (no NEXT_PUBLIC prefix) so they never reach the client
// bundle. Details are returned only after a correct code.
export const dynamic = "force-dynamic";

// Naive in-memory rate limit (per server instance). Replace with a shared store
// for multi-instance deployments.
const attempts = new Map<string, { n: number; t: number }>();
const WINDOW = 60_000;
const MAX = 8;

function limited(ip: string) {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now - rec.t > WINDOW) {
    attempts.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > MAX;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let code = "";
  try {
    const body = await request.json();
    code = String(body?.code ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const expected = process.env.CONTACT_ACCESS_CODE ?? "";
  if (!expected || code !== expected) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({
    ok: true,
    contact: {
      phone: process.env.CONTACT_PHONE ?? "",
      whatsapp: process.env.CONTACT_WHATSAPP ?? "",
      email: process.env.CONTACT_EMAIL ?? "",
    },
  });
}
