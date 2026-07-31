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
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-3 text-xs text-muted">
        {t.legal.lastUpdated}: {site.legalLastUpdated}
      </p>
      {intro && <p className="mt-6 text-[15px] leading-relaxed text-muted">{intro}</p>}

      <div className="prose-legal mt-4">{children}</div>

      <div className="mt-14 border-t border-line pt-6">
        <Link href={routes.home} className="text-sm text-accent hover:underline">
          &larr; {t.legal.backHome}
        </Link>
      </div>
    </article>
  );
}
