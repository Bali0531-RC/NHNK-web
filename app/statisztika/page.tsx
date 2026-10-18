import type { Metadata } from "next";
import { getPublicStats } from "@/lib/statsService";
import StatsContent from "./content";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Statisztika",
  description:
    "Nyilvános, anonim Google Play és GitHub Releases statisztikák az NHNK alkalmazásról: aktív eszközök, verzió-adaptáció, Android-verziók és letöltések.",
  alternates: { canonical: "/statisztika/" },
};

export default async function Page() {
  const initialStats = await getPublicStats();
  return <StatsContent initialStats={initialStats} />;
}
