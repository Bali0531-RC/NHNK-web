import type { Metadata } from "next";
import BetaContent from "./content";

export const metadata: Metadata = {
  title: "Jelentkezés a zárt tesztre",
  description:
    "Az NHNK zárt tesztelés alatt áll a Play Áruházban. Add meg a Google-fiókodhoz tartozó e-mail-címet, és felveszünk a tesztelők közé.",
};

export default function Page() {
  return <BetaContent />;
}
