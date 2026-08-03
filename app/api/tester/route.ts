import { NextResponse } from "next/server";

import { addTester, isPlausibleEmail, normaliseEmail } from "@/lib/testers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Per-IP sliding window. In memory on purpose: no need to persist abuse state. */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(req: Request) {
  // Same-origin only: this endpoint is called from our own form.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "bad-origin" }, { status: 403 });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ error: "rate-limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  const { email, lang, website } = (body ?? {}) as {
    email?: unknown;
    lang?: unknown;
    website?: unknown;
  };

  // Honeypot: a real person never fills a field that is hidden from them.
  // Answer as if it worked, so bots get no signal to adapt.
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ status: "added" });
  }

  if (typeof email !== "string") {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const normalised = normaliseEmail(email);
  if (!isPlausibleEmail(normalised)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  try {
    const result = addTester(normalised, typeof lang === "string" ? lang : "hu");
    return NextResponse.json({ status: result });
  } catch {
    return NextResponse.json({ error: "server-error" }, { status: 500 });
  }
}
