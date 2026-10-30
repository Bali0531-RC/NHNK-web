import type { Metadata } from "next";
import ImpressumContent from "./content";

export const metadata: Metadata = {
  title: "Impresszum",
  description:
    "Az NHNK weboldal és alkalmazás üzemeltetői és tárhelyszolgáltatói adatai (Impresszum).",
  alternates: { canonical: "/impresszum/" },
};

export default function Page() {
  return <ImpressumContent />;
}
