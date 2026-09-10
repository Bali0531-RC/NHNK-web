"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-px overflow-hidden rounded-sm border border-line">
      {(["hu", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] transition-colors duration-200 ${
            lang === code ? "bg-ink text-bg" : "text-muted hover:text-ink"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: `${routes.home}#funkciok`, label: t.nav.features, match: null },
    { href: `${routes.home}#letoltes`, label: t.nav.download, match: null },
    // The closed test is over, so the signup page stays reachable but stops being
    // advertised. Linking it next to a live store button only confuses people.
    ...(site.playStoreUrl ? [] : [{ href: routes.beta, label: t.nav.beta, match: routes.beta }]),
    { href: routes.donate, label: t.nav.donate, match: routes.donate },
    { href: routes.privacy, label: t.nav.privacy, match: routes.privacy },
  ];

  // trailingSlash is on, so the live pathname carries a slash the route constants do not.
  const isCurrent = (match: string | null) =>
    match !== null && pathname.replace(/\/$/, "") === match;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[76rem] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link
          href={routes.home}
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7" priority />
          <span className="text-sm font-semibold tracking-[-0.01em]">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const current = isCurrent(l.match);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={current ? "page" : undefined}
                className={`text-sm transition-colors duration-200 ${
                  current
                    ? "font-medium text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
                    : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <LangToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="grid h-8 w-8 place-items-center rounded-sm border border-line text-ink transition-colors duration-200 hover:border-line-2"
          >
            <span aria-hidden className="text-sm leading-none">
              {open ? "\u2715" : "\u2630"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-surface md:hidden">
          <div className="mx-auto flex max-w-[76rem] flex-col px-5 sm:px-8">
            {links.map((l) => {
              const current = isCurrent(l.match);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={`border-b border-line py-3 text-sm transition-colors duration-200 last:border-0 ${
                    current ? "font-medium text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
