"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";
import { donationMethods, site } from "@/lib/site";

export default function DonatePage() {
  const { t, lang } = useLanguage();

  return (
    <div className="mx-auto max-w-[46rem] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.022em] sm:text-[2.125rem]">
        {t.donate.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-[1.75] text-muted">
        {t.donate.intro}
      </p>

      <p className="mt-6 max-w-[62ch] border-l-2 border-line-2 py-1 pl-5 text-[0.875rem] leading-[1.7] text-muted">
        {t.donate.noObligation}
      </p>

      <h2 className="mt-16 text-lg font-semibold tracking-[-0.015em]">{t.donate.methodsTitle}</h2>
      <ul className="mt-6">
        {donationMethods.map((method) => (
          <li key={method.id} className="border-t border-line last:border-b">
            <a
              href={method.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-6 py-5 transition-colors duration-200"
            >
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-[0.9375rem] font-semibold text-ink transition-colors duration-200 group-hover:text-accent">
                    {method.name}
                  </span>
                  <span className="font-mono text-xs text-muted">{method.handle}</span>
                </span>
                <span className="mt-1.5 block max-w-[54ch] text-sm leading-[1.7] text-muted">
                  {method.note[lang]}
                </span>
              </span>
              <span
                aria-hidden
                className="mt-1 shrink-0 font-mono text-xs text-muted transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
              >
                {t.donate.openLink}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 text-lg font-semibold tracking-[-0.015em]">{t.donate.freeTitle}</h2>
      <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-[1.75] text-muted">
        {t.donate.freeBody}
      </p>
      <ul className="mt-4 space-y-2.5">
        {t.donate.freeItems.map((item) => (
          <li
            key={item}
            className="relative max-w-[62ch] pl-5 text-[0.9375rem] leading-[1.75] text-muted before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-2.5 before:bg-line-2"
          >
            {item}
          </li>
        ))}
      </ul>

      <p className="mt-16 max-w-[62ch] border-t border-line pt-6 text-xs leading-relaxed text-muted">
        {t.donate.taxNote}
      </p>

      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <Link
          href={routes.home}
          className="text-sm font-medium text-accent underline decoration-line-2 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
        >
          {t.legal.backHome}
        </Link>
        <a
          href={`mailto:${site.contactEmail}`}
          className="font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
        >
          {site.contactEmail}
        </a>
      </div>
    </div>
  );
}
