"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-[46rem] px-5 py-24 sm:px-8 sm:py-32">
      <p className="tnum font-mono text-sm text-muted">{t.notFound.code}</p>
      <h1 className="mt-3 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.022em] sm:text-[2.125rem]">
        {t.notFound.title}
      </h1>
      <p className="mt-5 max-w-[56ch] text-[0.9375rem] leading-[1.75] text-muted">
        {t.notFound.body}
      </p>
      <Link
        href={routes.home}
        className="mt-8 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
      >
        {t.notFound.cta}
      </Link>
    </div>
  );
}
