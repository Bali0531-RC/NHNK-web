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
    default: `${site.name} — ${site.fullName}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Független, nyílt forráskódú Neptun kliens Androidra. Órarend, jegyek, üzenetek és befizetések reklám és követés nélkül.",
  applicationName: site.name,
  keywords: ["Neptun", "NHNK", "egyetem", "órarend", "Android", "nyílt forráskódú"],
  authors: [{ name: site.author }],
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.fullName}`,
    description:
      "Független, nyílt forráskódú Neptun kliens Androidra. Reklám nélkül, követés nélkül.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <LanguageProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
