import { timingSafeEqual } from "node:crypto";

import { countTesters, listTesters } from "@/lib/testers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function tokenMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // timingSafeEqual throws on length mismatch, so check that separately.
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Excel opens CSV in the local charset unless a BOM says otherwise; Hungarian addresses need it. */
function toCsv(rows: { email: string; lang: string; created_at: string }[]): string {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = ["email,lang,created_at"];
  for (const r of rows) {
    lines.push([r.email, r.lang, r.created_at].map(escape).join(","));
  }
  return "\uFEFF" + lines.join("\r\n") + "\r\n";
}

export async function GET(req: Request) {
  const expected = process.env.NHNK_ADMIN_TOKEN;
  if (!expected) {
    return new Response("export disabled: NHNK_ADMIN_TOKEN is not set\n", { status: 503 });
  }

  const url = new URL(req.url);
  const provided =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    url.searchParams.get("token") ??
    "";

  if (!tokenMatches(provided, expected)) {
    return new Response("unauthorized\n", { status: 401 });
  }

  // Play Console's tester import wants one address per line, nothing else.
  if (url.searchParams.get("format") === "plain") {
    const body = listTesters().map((r) => r.email).join("\n") + "\n";
    return new Response(body, {
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
    });
  }

  return new Response(toCsv(listTesters()), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="nhnk-testers-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
      "cache-control": "no-store",
      "x-tester-count": String(countTesters()),
    },
  });
}
