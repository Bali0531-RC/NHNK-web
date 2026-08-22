"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

export function LegalShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <article className="mx-auto max-w-[46rem] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.022em] sm:text-[2.125rem]">
        {title}
      </h1>
      <p className="eyebrow mt-4">
        {t.legal.lastUpdated}: <span className="tnum">{site.legalLastUpdated}</span>
      </p>
      {intro && (
        <p className="mt-6 max-w-[68ch] text-[0.9375rem] leading-[1.75] text-muted">{intro}</p>
      )}

      <div className="prose-legal mt-6">{children}</div>

      <div className="mt-16 border-t border-line pt-6">
        <Link
          href={routes.home}
          className="text-sm font-medium text-accent underline decoration-line-2 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
        >
          {t.legal.backHome}
        </Link>
      </div>
    </article>
  );
}
