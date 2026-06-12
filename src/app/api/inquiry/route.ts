import { NextResponse } from "next/server";

// Family-introduction inquiry endpoint (Section 36). Validates, checks a honeypot
// and rate-limits. The recipient address lives only in server env and is never
// exposed to the client. If no email provider is configured the submission is
// logged server-side and still acknowledged (wire a provider where noted).
export const dynamic = "force-dynamic";

const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 60_000;
const MAX = 4;

function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > WINDOW) {
    hits.set(ip, { n: 1, t: now });
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

  let data: Record<string, string> = {};
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (data.company) {
    return NextResponse.json({ ok: true }); // silently accept-and-drop bots
  }

  const name = String(data.name ?? "").trim();
  const contact = String(data.contact ?? "").trim();
  const message = String(data.message ?? "").trim();
  if (!name || !contact || name.length > 120 || message.length > 2000) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const to = process.env.INQUIRY_TO_EMAIL;
  // TODO: wire a real email/notification provider here (Resend, SES, etc.).
  // Until then we log server-side so submissions are not lost in development.
  console.info("[inquiry]", {
    to: to ?? "(unset)",
    name,
    relation: String(data.relation ?? "").slice(0, 120),
    contact,
    message: message.slice(0, 2000),
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
