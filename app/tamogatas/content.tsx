"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { donationMethods, site } from "@/lib/site";

export default function DonatePage() {
  const { t, lang } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t.donate.title}</h1>
      <p className="mt-5 text-[15px] leading-relaxed text-muted">{t.donate.intro}</p>

      <div className="mt-6 rounded-xl border border-line bg-surface p-5">
        <p className="text-sm leading-relaxed text-muted">{t.donate.noObligation}</p>
      </div>

      <h2 className="mt-14 text-xl font-bold tracking-tight">{t.donate.methodsTitle}</h2>
      <div className="mt-5 grid gap-3">
        {donationMethods.map((method) => (
          <a
            key={method.id}
            href={method.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent/50"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="text-[15px] font-semibold text-ink">{method.name}</span>
                <span className="font-mono text-xs text-muted">{method.handle}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{method.note[lang]}</p>
            </div>
            <span className="shrink-0 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-muted transition group-hover:border-accent group-hover:text-accent">
              {t.donate.openLink}
            </span>
          </a>
        ))}
      </div>

      <h2 className="mt-14 text-xl font-bold tracking-tight">{t.donate.freeTitle}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">{t.donate.freeBody}</p>
      <ul className="mt-4 space-y-2.5">
        {t.donate.freeItems.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-14 rounded-xl border border-line bg-surface-2 p-5">
        <p className="text-xs leading-relaxed text-muted">{t.donate.taxNote}</p>
      </div>

      <p className="mt-8 text-xs text-muted">
        {site.name} &mdash; {site.author} ({site.authorHandle}) &middot;{" "}
        <a href={`mailto:${site.contactEmail}`} className="text-accent hover:underline">
          {site.contactEmail}
        </a>
      </p>
    </div>
  );
}
