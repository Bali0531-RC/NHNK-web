"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/lib/site";

export function GooglePlayBadge({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const hu = lang === "hu";

  if (!site.playStoreUrl) return null;

  return (
    <a
      href={site.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hu ? "Szerezd meg a Google Play-en" : "Get it on Google Play"}
      className={`group inline-flex items-center justify-center gap-3 rounded-lg border border-white/15 bg-[#0b0f12] px-4 py-2 text-left text-white shadow-[0_6px_20px_-6px_rgba(0,0,0,0.45)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-[0_10px_26px_-6px_rgba(15,103,123,0.45)] active:translate-y-px ${className}`}
    >
      {/* Official 4-color Google Play prism icon */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 shrink-0 transition-transform duration-200 group-hover:scale-105"
      >
        <path
          fill="#00D2FF"
          d="M3.61 1.814A1.89 1.89 0 0 0 3 3.245v17.51c0 .575.23 1.074.61 1.431l.075.066L13.5 12.437v-.232L3.685 1.748l-.075.066Z"
        />
        <path
          fill="#FFCE00"
          d="m16.77 15.709-3.27-3.272v-.232l3.27-3.272.074.042 3.878 2.204c1.108.63 1.108 1.66 0 2.29l-3.878 2.198-.074.042Z"
        />
        <path
          fill="#FF3A44"
          d="M16.844 15.667 13.5 12.321 3.61 22.186c.365.387.968.435 1.646.05l11.588-6.569Z"
        />
        <path
          fill="#00F076"
          d="M16.844 8.975 5.256 2.385c-.678-.385-1.281-.337-1.646.05L13.5 12.321l3.344-3.346Z"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-white/75">
          {hu ? "Szerezd meg:" : "Get it on"}
        </span>
        <span className="mt-0.5 text-[1.02rem] font-semibold tracking-[-0.01em] text-white">
          Google Play
        </span>
      </span>
    </a>
  );
}
