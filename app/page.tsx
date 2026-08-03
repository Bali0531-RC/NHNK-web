"use client";

import Link from "next/link";
import { RichText, useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="hero-glow border-b border-line/60">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
              {t.hero.badge}
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {t.hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={site.releases}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-bold text-bg transition hover:opacity-90 sm:w-auto"
              >
                {t.hero.ctaDownload}
              </a>
              {site.playStoreUrl ? (
                <a
                  href={site.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl border border-line bg-surface px-6 py-3 text-sm font-bold text-ink transition hover:border-accent sm:w-auto"
                >
                  {t.hero.ctaPlay}
                </a>
              ) : (
                <Link
                  href={routes.beta}
                  className="w-full rounded-xl border border-dashed border-line px-6 py-3 text-center text-sm font-semibold text-muted transition hover:border-accent hover:text-ink sm:w-auto"
                >
                  {t.hero.ctaPlaySoon}
                </Link>
              )}
              <a
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl px-6 py-3 text-sm font-semibold text-muted transition hover:text-ink sm:w-auto"
              >
                {t.hero.ctaSource}
              </a>
            </div>

            <p className="mt-6 text-xs text-muted/80">{t.hero.unofficial}</p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-4xl px-5 py-14">
        <div className="rounded-2xl border border-danger/30 bg-danger/5 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-base font-bold text-danger">
            <span aria-hidden>&#9888;</span>
            {t.disclaimer.title}
          </h2>
          <ul className="mt-5 space-y-3.5">
            {t.disclaimer.points.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-danger/70" />
                <p className="text-sm leading-relaxed text-muted">
                  <RichText text={point} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section id="funkciok" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.features.title}</h2>
        <p className="mt-2 text-muted">{t.features.subtitle}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line bg-surface p-6 transition hover:border-accent/40"
            >
              <h3 className="text-[15px] font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section id="letoltes" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-14">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.download.title}</h2>
        <p className="mt-2 text-muted">{t.download.subtitle}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-accent/40 bg-surface p-7">
            <h3 className="text-lg font-bold">{t.download.githubTitle}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.download.githubBody}</p>
            <a
              href={site.releases}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-xl bg-accent px-5 py-2.5 text-center text-sm font-bold text-bg transition hover:opacity-90"
            >
              {t.hero.ctaDownload}
            </a>
            <p className="mt-4 text-xs text-muted">{t.download.abiHint}</p>
            <p className="mt-1.5 text-xs text-muted">
              {t.download.obtainiumHint}{" "}
              <a
                href={site.obtainium}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2"
              >
                Obtainium
              </a>
            </p>
          </div>

          <div className="flex flex-col rounded-2xl border border-line bg-surface p-7">
            <h3 className="text-lg font-bold">{t.download.playTitle}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              {t.download.playBody
                .replace(/{required}/g, String(site.closedTest.required))
                .replace(/{days}/g, String(site.closedTest.days))}
            </p>
            {!site.playStoreUrl && (
              <div className="mt-5">
                <div className="flex items-baseline justify-between text-xs text-muted">
                  <span>{t.hero.ctaPlaySoon}</span>
                  <span className="font-bold text-ink">
                    {t.download.playProgress
                      .replace("{current}", String(site.closedTest.current))
                      .replace("{required}", String(site.closedTest.required))}
                  </span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
                  role="progressbar"
                  aria-valuenow={site.closedTest.current}
                  aria-valuemin={0}
                  aria-valuemax={site.closedTest.required}
                >
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{
                      width: `${Math.min(
                        100,
                        (site.closedTest.current / site.closedTest.required) * 100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {site.playStoreUrl ? (
              <a
                href={site.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 rounded-xl border border-line px-5 py-2.5 text-center text-sm font-bold text-ink transition hover:border-accent"
              >
                {t.hero.ctaPlay}
              </a>
            ) : (
              <Link
                href={routes.beta}
                className="mt-5 rounded-xl border border-line px-5 py-2.5 text-center text-sm font-bold text-ink transition hover:border-accent"
              >
                {t.download.playCta}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Privacy teaser */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="rounded-2xl border border-line bg-surface-2 p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight">{t.privacyTeaser.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {t.privacyTeaser.body}
          </p>
          <Link
            href={routes.privacy}
            className="mt-6 inline-block rounded-xl border border-line px-5 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            {t.privacyTeaser.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
