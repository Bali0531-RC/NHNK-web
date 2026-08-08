import type { Metadata } from "next";
import DonateContent from "./content";

export const metadata: Metadata = {
  title: "Támogatás",
  description:
    "Az NHNK ingyenes és nyílt forráskódú. Ha szeretnéd, PayPalon, Revoluton vagy GitHub Sponsorson keresztül támogathatod a fejlesztést.",
  alternates: { canonical: "/tamogatas/" },
};

export default function Page() {
  return <DonateContent />;
}
