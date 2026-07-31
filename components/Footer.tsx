"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="text-[15px] font-bold">{site.name}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              {t.footer.project}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={site.repo} className="text-muted hover:text-accent" target="_blank" rel="noopener noreferrer">
                  {t.footer.sourceCode}
                </a>
              </li>
              <li>
                <a href={site.issues} className="text-muted hover:text-accent" target="_blank" rel="noopener noreferrer">
                  {t.footer.reportBug}
                </a>
              </li>
              <li>
                <Link href={routes.donate} className="text-muted hover:text-accent">
                  {t.nav.donate}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              {t.footer.legal}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href={routes.privacy} className="text-muted hover:text-accent">
                  {t.nav.privacy}
                </Link>
              </li>
              <li>
                <Link href={routes.terms} className="text-muted hover:text-accent">
                  {t.nav.terms}
                </Link>
              </li>
              <li>
                <a href={site.license} className="text-muted hover:text-accent" target="_blank" rel="noopener noreferrer">
                  {t.footer.license}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink">
              {t.footer.contact}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={`mailto:${site.contactEmail}`} className="text-muted hover:text-accent">
                  {site.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs leading-relaxed text-muted">
            {site.name} ({site.fullName}) &mdash;{" "}
            {t.footer.builtBy} {site.author} ({site.authorHandle}). MIT.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted/80">{t.footer.trademark}</p>
        </div>
      </div>
    </footer>
  );
}
