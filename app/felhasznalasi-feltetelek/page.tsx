import type { Metadata } from "next";
import TermsContent from "./content";

export const metadata: Metadata = {
  title: "Felhasználási feltételek",
  description:
    "Az NHNK használatának feltételei: nem hivatalos státusz, védjegyek, garancia kizárása és a felelősség korlátozása.",
  alternates: { canonical: "/felhasznalasi-feltetelek/" },
};

export default function Page() {
  return <TermsContent />;
}
