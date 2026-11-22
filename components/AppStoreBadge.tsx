"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/lib/site";

export function AppStoreBadge({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const hu = lang === "hu";
  const [released, setReleased] = useState(false);

  useEffect(() => {
    const releaseMs = new Date(site.iosReleaseDate).getTime();
    setReleased(Date.now() >= releaseMs);
  }, []);

  if (!site.appStoreUrl) return null;

  const topLabel = released
    ? hu
      ? "Letölthető innen:"
      : "Download on the"
    : hu
      ? "Előrendelés (nov. 30.):"
      : "Pre-order (Nov 30):";

  return (
    <a
      href={site.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hu ? "Elérhető az App Store-ban" : "Download on the App Store"}
      className={`group inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-white/15 bg-[#0b0f12] px-4 text-left text-white shadow-[0_6px_20px_-6px_rgba(0,0,0,0.45)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-[0_10px_26px_-6px_rgba(15,103,123,0.45)] active:translate-y-px ${className}`}
    >
      {/* Apple icon */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="currentColor"
        className="h-6 w-6 shrink-0 text-white transition-transform duration-200 group-hover:scale-105"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.79-.96 2.84 1.04.08 2.08-.52 2.72-1.3Z" />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-white/75">
          {topLabel}
        </span>
        <span className="mt-0.5 text-[1.02rem] font-semibold tracking-[-0.01em] text-white">
          App Store
        </span>
      </span>
    </a>
  );
}
