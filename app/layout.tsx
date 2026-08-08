import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Nem hivatalos Neptun mobilalkalmazás`,
    template: `%s — ${site.name}`,
  },
  description:
    "Ingyenes, nyílt forráskódú Neptun mobil app Androidra. Órarend, jegyek, üzenetek és befizetések egy helyen, reklám és követés nélkül.",
  applicationName: site.name,
  keywords: [
    "Neptun mobil",
    "Neptun app",
    "Neptun alkalmazás",
    "Neptun Android",
    "Neptun kliens",
    "Neptun órarend",
    "nem hivatalos Neptun",
    "egyetemi órarend alkalmazás",
    "NHNK",
  ],
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  publisher: site.author,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Nem hivatalos Neptun mobilalkalmazás`,
    description:
      "Ingyenes, nyílt forráskódú Neptun mobil app Androidra. Órarend, jegyek, üzenetek és befizetések, reklám és követés nélkül.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.fullName}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Nem hivatalos Neptun mobilalkalmazás`,
    description: "Ingyenes, nyílt forráskódú Neptun mobil app Androidra.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "education",
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
};

/** Rich-result data for the app itself. No ratings are declared: inventing them is a manual-action risk. */
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  alternateName: site.fullName,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Android",
  description:
    "Független, nyílt forráskódú Neptun kliens Androidra: órarend, jegyek, üzenetek és befizetések.",
  url: site.url,
  image: `${site.url}/og.png`,
  inLanguage: "hu",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "HUF" },
  author: { "@type": "Person", name: site.author },
  license: site.license,
  softwareHelp: site.repo,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
        <LanguageProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
