"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useLanguage();

  const project = [
    { label: t.footer.sourceCode, href: site.repo, external: true },
    { label: t.footer.reportBug, href: site.issues, external: true },
    { label: t.footer.license, href: site.license, external: true },
    { label: t.nav.donate, href: routes.donate, external: false },
  ];

  const legal = [
    { label: t.nav.privacy, href: routes.privacy },
    { label: t.nav.terms, href: routes.terms },
  ];

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7" />
              <span className="text-sm font-semibold tracking-[-0.01em]">{site.name}</span>
            </div>
            <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted">
              {t.footer.tagline}
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-4 inline-block font-mono text-xs text-accent underline decoration-line-2 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
            >
              {site.contactEmail}
            </a>
          </div>

          {/* Two short groups instead of a four-column link farm. */}
          <div className="grid grid-cols-2 gap-x-14 gap-y-8 sm:gap-x-20">
            <div>
              <h2 className="eyebrow">{t.footer.project}</h2>
              <ul className="mt-3 space-y-2">
                {project.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">{t.footer.legal}</h2>
              <ul className="mt-3 space-y-2">
                {legal.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="font-mono text-xs text-muted">
            {site.fullName}. {t.footer.builtBy} {site.author} ({site.authorHandle}). MIT.
          </p>
          <p className="mt-2.5 max-w-[80ch] text-xs leading-relaxed text-muted">
            {t.footer.trademark}
          </p>
        </div>
      </div>
    </footer>
  );
}
