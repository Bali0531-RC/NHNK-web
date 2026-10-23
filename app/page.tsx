"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FluidHeroCanvas } from "@/components/FluidHeroCanvas";
import { RichText, useLanguage } from "@/components/LanguageProvider";
import { TryPhone } from "@/components/TryPhone";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

function StaggerWords({
  text,
  baseDelayMs,
  stepMs,
}: {
  text: string;
  baseDelayMs: number;
  stepMs: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`}>
          <span
            className="nhnk-word-reveal"
            style={{ animationDelay: `${baseDelayMs + idx * stepMs}ms` }}
          >
            {word}
          </span>
          {idx < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function HomePage() {
  const { t, lang } = useLanguage();

  // Resolved after mount: the page is statically prerendered, so reading the clock during
  // render would freeze the build-time value into the HTML and desync hydration.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const startMs = new Date(site.closedTest.startsAt).getTime();
  const endMs = new Date(site.closedTest.endsAt).getTime();
  const underReview = now !== null && now >= endMs;
  const elapsed = now === null ? 0 : Math.min(1, Math.max(0, (now - startMs) / (endMs - startMs)));
  const dayNumber = Math.max(1, Math.ceil(elapsed * site.closedTest.days));

  // Timezone pinned so server and client render the same string, otherwise hydration mismatches.
  const closedTestEnd = new Intl.DateTimeFormat(lang === "hu" ? "hu-HU" : "en-GB", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(site.closedTest.endsAt));

  return (
    <>
      {/*
        Hero. Deliberately asymmetric and left-aligned, with the running demo carrying
        the right-hand column: the product is the strongest thing on the page, so it
        goes above the fold rather than into a section of its own further down.
      */}
      <section className="relative overflow-hidden border-b border-line">
        <FluidHeroCanvas />
        <div aria-hidden="true" className="nhnk-hero-scrim pointer-events-none absolute inset-0 z-[1]" />

        <div className="relative z-10 mx-auto grid max-w-[76rem] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_minmax(0,0.92fr)] lg:items-center lg:gap-16 lg:py-24">
          <div>
            <div
              className="nhnk-block-reveal mb-5 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 font-mono text-xs text-ink nhnk-glass-pill"
              style={{ animationDelay: "120ms" }}
            >
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>
                {lang === "hu"
                  ? "v2.0.10 · Google Play & GitHub · 100% Crash-Free"
                  : "v2.0.10 · Google Play & GitHub · 100% Crash-Free"}
              </span>
              <Link
                href={routes.stats}
                className="font-semibold text-accent underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
              >
                {lang === "hu" ? "Statisztika →" : "Live Stats →"}
              </Link>
            </div>

            <h1 className="max-w-[16ch] text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
              <StaggerWords text={t.hero.title} baseDelayMs={220} stepMs={65} />
            </h1>

            <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.65] text-muted">
              <StaggerWords text={t.hero.lede} baseDelayMs={520} stepMs={18} />
            </p>

            <div
              className="nhnk-block-reveal mt-9 flex flex-wrap items-center gap-x-3 gap-y-3"
              style={{ animationDelay: "860ms" }}
            >
              <a
                href={site.releases}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg shadow-[0_8px_24px_-8px_rgba(15,103,123,0.55)] transition-[transform,opacity,box-shadow] duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-px"
              >
                {t.hero.ctaDownload}
              </a>

              {site.playStoreUrl ? (
                <a
                  href={site.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-line-2 px-5 py-2.5 text-sm font-semibold text-ink nhnk-glass-pill transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent active:translate-y-px"
                >
                  {t.hero.ctaPlay}
                </a>
              ) : (
                <Link
                  href={routes.beta}
                  className="rounded-md border border-line-2 px-5 py-2.5 text-sm font-semibold text-ink nhnk-glass-pill transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent active:translate-y-px"
                >
                  {t.hero.ctaPlaySoon}
                </Link>
              )}

              <a
                href={site.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-1 text-sm font-medium text-muted underline decoration-line-2 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
              >
                {t.hero.ctaSource}
              </a>
            </div>

            {/* Plain facts, set in mono. Replaces the pill badge that used to sit above the title. */}
            <dl
              className="nhnk-block-reveal mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6"
              style={{ animationDelay: "1020ms" }}
            >
              {t.hero.specs.map((spec) => (
                <div key={spec.k}>
                  <dt className="eyebrow">{spec.k}</dt>
                  <dd className="tnum mt-1 font-mono text-sm text-ink">{spec.v}</dd>
                </div>
              ))}
            </dl>

            <p
              className="nhnk-block-reveal mt-6 text-xs leading-relaxed text-muted"
              style={{ animationDelay: "1140ms" }}
            >
              {t.hero.unofficial}
            </p>
          </div>

          <div
            id="kiprobalas"
            className="nhnk-block-reveal flex scroll-mt-24 justify-center lg:justify-end"
            style={{ animationDelay: "380ms" }}
          >
            <div className="w-full max-w-[288px]">
              <TryPhone />
            </div>
          </div>
        </div>
      </section>

      {/* What the demo is. Sits directly under the phone it refers to. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
            <h2 className="text-lg font-semibold tracking-[-0.015em] lg:pt-1">{t.tryIt.title}</h2>
            <div className="max-w-[62ch]">
              <p className="text-[0.9375rem] leading-[1.75] text-muted">{t.tryIt.body}</p>
              <ul className="mt-5 space-y-2.5">
                {t.tryIt.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-5 text-[0.9375rem] leading-[1.75] text-muted before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-2.5 before:bg-line-2"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why the project exists. Prose, in the author's own voice, on a narrow measure. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
            <h2 className="text-lg font-semibold tracking-[-0.015em] lg:pt-1">{t.why.title}</h2>
            <div className="max-w-[62ch] space-y-5">
              {t.why.body.map((paragraph, i) => (
                <p key={i} className="text-[0.9375rem] leading-[1.75] text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*
        Features as a definition list rather than a grid of equal cards. Rows can breathe
        to whatever length the text actually needs, which is what stops them reading as
        six interchangeable blurbs.
      */}
      <section id="funkciok" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="text-lg font-semibold tracking-[-0.015em]">{t.features.title}</h2>
          <p className="mt-2 text-[0.9375rem] text-muted">{t.features.subtitle}</p>

          <dl className="mt-10">
            {t.features.items.map((item) => (
              <div
                key={item.title}
                className="grid gap-x-16 gap-y-2 border-t border-line py-6 last:border-b lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]"
              >
                <dt className="text-[0.9375rem] font-semibold text-ink">{item.title}</dt>
                <dd className="max-w-[62ch] text-[0.9375rem] leading-[1.75] text-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Legal disclaimer. A ruled note, not a tinted card. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-[68ch] border-l-2 border-danger bg-danger-soft py-5 pl-5 pr-5 sm:pl-6">
            <h2 className="text-[0.9375rem] font-semibold text-danger">{t.disclaimer.title}</h2>
            <ul className="mt-4 space-y-3">
              {t.disclaimer.points.map((point, i) => (
                <li
                  key={i}
                  className="relative pl-5 text-[0.875rem] leading-[1.75] text-muted before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-2.5 before:bg-danger/50"
                >
                  <RichText text={point} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Download. GitHub releases and Google Play, with copy matching store availability. */}
      <section id="letoltes" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="text-lg font-semibold tracking-[-0.015em]">{t.download.title}</h2>
          <p className="mt-2 text-[0.9375rem] text-muted">{t.download.subtitle}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
            <div className="flex flex-col rounded-lg border border-line-2 bg-surface p-6 sm:p-7">
              <h3 className="text-base font-semibold">{t.download.githubTitle}</h3>
              <p className="mt-2.5 max-w-[52ch] flex-1 text-[0.9375rem] leading-[1.7] text-muted">
                {t.download.githubBody}
              </p>
              <a
                href={site.releases}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 rounded-md bg-accent px-5 py-2.5 text-center text-sm font-semibold text-bg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
              >
                {t.hero.ctaDownload}
              </a>
              <p className="mt-5 text-xs leading-relaxed text-muted">{t.download.abiHint}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
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

            <div className="flex flex-col rounded-lg border border-line p-6 sm:p-7">
              <h3 className="text-base font-semibold">{t.download.playTitle}</h3>
              <p className="mt-2.5 max-w-[52ch] flex-1 text-[0.9375rem] leading-[1.7] text-muted">
                {site.playStoreUrl
                  ? t.download.playBodyLive
                  : t.download.playBody
                      .replace(/{required}/g, String(site.closedTest.required))
                      .replace(/{days}/g, String(site.closedTest.days))}
              </p>

              {!site.playStoreUrl && (
                <div className="mt-6">
                  {underReview ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="eyebrow text-ink">{t.download.playReview}</span>
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-muted">
                        {t.download.playReviewNote}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="eyebrow">{t.hero.ctaPlaySoon}</span>
                        <span className="tnum font-mono text-xs text-ink">
                          {t.download.playDayProgress
                            .replace("{day}", String(dayNumber))
                            .replace("{days}", String(site.closedTest.days))}
                        </span>
                      </div>
                      <div
                        className="mt-2.5 h-1 overflow-hidden rounded-sm bg-surface-2"
                        role="progressbar"
                        aria-valuenow={dayNumber}
                        aria-valuemin={0}
                        aria-valuemax={site.closedTest.days}
                      >
                        <div
                          className="h-full origin-left rounded-sm bg-accent transition-[width] duration-700"
                          style={{ width: `${elapsed * 100}%` }}
                        />
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-muted">
                        {t.download.playCountdown
                          .replace("{days}", String(site.closedTest.days))
                          .replace("{date}", closedTestEnd)}
                      </p>
                    </>
                  )}
                </div>
              )}

              {site.playStoreUrl ? (
                <a
                  href={site.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 rounded-md border border-line-2 px-5 py-2.5 text-center text-sm font-semibold text-ink transition-[transform,border-color] duration-200 hover:border-accent active:translate-y-px"
                >
                  {t.hero.ctaPlay}
                </a>
              ) : (
                <Link
                  href={routes.beta}
                  className="mt-6 rounded-md border border-line-2 px-5 py-2.5 text-center text-sm font-semibold text-ink transition-[transform,border-color] duration-200 hover:border-accent active:translate-y-px"
                >
                  {t.download.playCta}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy, inline rather than boxed. */}
      <section>
        <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
            <h2 className="text-lg font-semibold tracking-[-0.015em] lg:pt-1">
              {t.privacyTeaser.title}
            </h2>
            <div className="max-w-[62ch]">
              <p className="text-[0.9375rem] leading-[1.75] text-muted">{t.privacyTeaser.body}</p>
              <Link
                href={routes.privacy}
                className="mt-5 inline-block text-sm font-medium text-accent underline decoration-line-2 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
              >
                {t.privacyTeaser.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
