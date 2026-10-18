import { NextResponse } from "next/server";
import { getPublicStats } from "@/lib/statsService";

export const revalidate = 1800;

export async function GET() {
  const stats = await getPublicStats();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
