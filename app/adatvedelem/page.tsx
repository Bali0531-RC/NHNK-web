import type { Metadata } from "next";
import PrivacyContent from "./content";

export const metadata: Metadata = {
  title: "Adatvédelmi tájékoztató",
  description:
    "Az NHNK nem gyűjt rólad adatot: nincs saját szerver, nincs analitika, nincs hirdetés. A belépési adatok közvetlenül az intézményed Neptun-kiszolgálójára mennek.",
};

export default function Page() {
  return <PrivacyContent />;
}
