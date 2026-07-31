"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

function LangToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center rounded-full border border-line bg-surface p-0.5">
      {(["hu", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition ${
            lang === code ? "bg-accent text-bg" : "text-muted hover:text-ink"
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

  const links = [
    { href: `${routes.home}#funkciok`, label: t.nav.features },
    { href: `${routes.home}#letoltes`, label: t.nav.download },
    { href: routes.donate, label: t.nav.donate },
    { href: routes.privacy, label: t.nav.privacy },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href={routes.home} className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-black text-bg">
            N
          </span>
          <span className="text-[15px] font-bold tracking-tight">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition hover:text-ink">
              {l.label}
            </Link>
          ))}
          <LangToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink"
          >
            <span className="text-base leading-none">{open ? "\u2715" : "\u2630"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-surface md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-sm text-muted last:border-0 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
