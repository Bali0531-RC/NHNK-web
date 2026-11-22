"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { FluidHeroCanvas } from "@/components/FluidHeroCanvas";
import { GooglePlayBadge } from "@/components/GooglePlayBadge";
import { RichText, useLanguage } from "@/components/LanguageProvider";
import { TryPhone } from "@/components/TryPhone";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

function StaggerWords({
  text,
  baseDelayMs,
  stepMs,
  active = true,
}: {
  text: string;
  baseDelayMs: number;
  stepMs: number;
  active?: boolean;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`}>
          <span
            className={active ? "nhnk-word-reveal" : "inline-block opacity-0"}
            style={active ? { animationDelay: `${baseDelayMs + idx * stepMs}ms` } : undefined}
          >
            {word}
          </span>
          {idx < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function ScrollReveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-6 opacity-0 blur-[3px]"
      } ${className}`}
    >
      {children}
    </div>
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
    <div className="relative">
      {/* Full-viewport interactive WebGL / Canvas fluid background across the whole landing page */}
      <FluidHeroCanvas />
      <div
        aria-hidden="true"
        className="nhnk-hero-scrim pointer-events-none fixed inset-0 z-[1]"
      />

      <div className="relative z-10">
        {/* Hero */}
        <section className="border-b border-line/80">
          <div className="mx-auto grid max-w-[76rem] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr_minmax(0,0.92fr)] lg:items-center lg:gap-16 lg:py-24">
            <div>
              <div
                className="nhnk-block-reveal mb-5 inline-flex flex-wrap items-center gap-2.5 rounded-full px-3.5 py-1.5 font-mono text-xs text-ink nhnk-glass-pill"
                style={{ animationDelay: "100ms" }}
              >
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span>
                  {lang === "hu"
                    ? "Android v2.0.11 · iOS v1.0 (nov. 30.) · 100% Crash-Free"
                    : "Android v2.0.11 · iOS v1.0 (Nov 30) · 100% Crash-Free"}
                </span>
                <Link
                  href={routes.stats}
                  className="font-semibold text-accent underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
                >
                  {lang === "hu" ? "Statisztika →" : "Live Stats →"}
                </Link>
              </div>

              <h1 className="max-w-[16ch] text-[2rem] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[2.5rem] lg:text-[3rem]">
                <StaggerWords text={t.hero.title} baseDelayMs={200} stepMs={60} />
              </h1>

              <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.65] text-muted">
                <StaggerWords text={t.hero.lede} baseDelayMs={480} stepMs={16} />
              </p>

              <div
                className="nhnk-block-reveal mt-9 flex flex-wrap items-center gap-x-3 gap-y-3"
                style={{ animationDelay: "820ms" }}
              >
                {site.playStoreUrl ? (
                  <GooglePlayBadge />
                ) : (
                  <Link
                    href={routes.beta}
                    className="rounded-md border border-line-2 px-5 py-2.5 text-sm font-semibold text-ink nhnk-glass-pill transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent active:translate-y-px"
                  >
                    {t.hero.ctaPlaySoon}
                  </Link>
                )}

                <AppStoreBadge />

                <a
                  href={site.releases}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-bg shadow-[0_8px_24px_-8px_rgba(15,103,123,0.55)] transition-[transform,opacity,box-shadow] duration-200 hover:-translate-y-0.5 hover:opacity-95 active:translate-y-px"
                >
                  {t.hero.ctaDownload}
                </a>

                <a
                  href={site.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-1 text-sm font-medium text-muted underline decoration-line-2 underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                >
                  {t.hero.ctaSource}
                </a>
              </div>

              <dl
                className="nhnk-block-reveal mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6"
                style={{ animationDelay: "980ms" }}
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
                style={{ animationDelay: "1100ms" }}
              >
                {t.hero.unofficial}
              </p>
            </div>

            <div
              id="kiprobalas"
              className="nhnk-block-reveal flex scroll-mt-24 justify-center lg:justify-end"
              style={{ animationDelay: "340ms" }}
            >
              <div className="w-full max-w-[288px]">
                <TryPhone />
              </div>
            </div>
          </div>
        </section>

        {/* What the demo is */}
        <section className="border-b border-line/80 backdrop-blur-[2px]">
          <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
              <ScrollReveal>
                <h2 className="text-lg font-semibold tracking-[-0.015em] lg:pt-1">
                  {t.tryIt.title}
                </h2>
              </ScrollReveal>
              <div className="max-w-[62ch]">
                <ScrollReveal delayMs={80}>
                  <p className="text-[0.9375rem] leading-[1.75] text-muted">{t.tryIt.body}</p>
                </ScrollReveal>
                <ul className="mt-5 space-y-2.5">
                  {t.tryIt.points.map((point, idx) => (
                    <ScrollReveal key={point} delayMs={140 + idx * 70}>
                      <li className="relative pl-5 text-[0.9375rem] leading-[1.75] text-muted before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-2.5 before:bg-line-2">
                        {point}
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why the project exists */}
        <section className="border-b border-line/80 backdrop-blur-[2px]">
          <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
              <ScrollReveal>
                <h2 className="text-lg font-semibold tracking-[-0.015em] lg:pt-1">{t.why.title}</h2>
              </ScrollReveal>
              <div className="max-w-[62ch] space-y-5">
                {t.why.body.map((paragraph, i) => (
                  <ScrollReveal key={i} delayMs={90 + i * 90}>
                    <p className="text-[0.9375rem] leading-[1.75] text-muted">{paragraph}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="funkciok" className="scroll-mt-24 border-b border-line/80 backdrop-blur-[2px]">
          <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
            <ScrollReveal>
              <h2 className="text-lg font-semibold tracking-[-0.015em]">{t.features.title}</h2>
              <p className="mt-2 text-[0.9375rem] text-muted">{t.features.subtitle}</p>
            </ScrollReveal>

            <dl className="mt-10">
              {t.features.items.map((item, idx) => (
                <ScrollReveal key={item.title} delayMs={(idx % 4) * 65}>
                  <div className="group grid gap-x-16 gap-y-2 border-t border-line py-6 transition-colors duration-300 hover:bg-surface/45 hover:px-3 last:border-b lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                    <dt className="text-[0.9375rem] font-semibold text-ink transition-colors group-hover:text-accent">
                      {item.title}
                    </dt>
                    <dd className="max-w-[62ch] text-[0.9375rem] leading-[1.75] text-muted">
                      {item.body}
                    </dd>
                  </div>
                </ScrollReveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Legal disclaimer */}
        <section className="border-b border-line/80 backdrop-blur-[2px]">
          <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
            <ScrollReveal>
              <div className="max-w-[68ch] border-l-2 border-danger bg-danger-soft/90 py-5 pl-5 pr-5 backdrop-blur-md sm:pl-6">
                <h2 className="text-[0.9375rem] font-semibold text-danger">{t.disclaimer.title}</h2>
                <ul className="mt-4 space-y-3">
                  {t.disclaimer.points.map((point, i) => (
                    <ScrollReveal key={i} delayMs={80 + i * 65}>
                      <li className="relative pl-5 text-[0.875rem] leading-[1.75] text-muted before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-2.5 before:bg-danger/50">
                        <RichText text={point} />
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Download */}
        <section id="letoltes" className="scroll-mt-24 border-b border-line/80 backdrop-blur-[2px]">
          <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
            <ScrollReveal>
              <h2 className="text-lg font-semibold tracking-[-0.015em]">{t.download.title}</h2>
              <p className="mt-2 text-[0.9375rem] text-muted">{t.download.subtitle}</p>
            </ScrollReveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3 lg:grid-rows-[auto_1fr_auto_auto] lg:gap-x-7 lg:gap-y-0">
              <ScrollReveal
                delayMs={80}
                className="flex flex-col rounded-lg border border-line bg-surface/75 p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:p-7 lg:row-span-4 lg:grid lg:grid-rows-subgrid"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">{t.download.playTitle}</h3>
                  <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
                    Android · Flutter
                  </span>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted">
                  {site.playStoreUrl
                    ? t.download.playBodyLive
                    : t.download.playBody
                        .replace(/{required}/g, String(site.closedTest.required))
                        .replace(/{days}/g, String(site.closedTest.days))}
                </p>

                {site.playStoreUrl ? (
                  <div className="mt-6">
                    <GooglePlayBadge className="w-full" />
                  </div>
                ) : (
                  <Link
                    href={routes.beta}
                    className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg border border-line-2 px-5 text-center text-sm font-semibold text-ink transition-[transform,border-color] duration-200 hover:border-accent active:translate-y-px"
                  >
                    {t.download.playCta}
                  </Link>
                )}

                <div className="mt-5 flex flex-col justify-between gap-1.5 border-t border-line/70 pt-3.5 text-xs leading-relaxed text-muted">
                  <p>
                    {lang === "hu"
                      ? "Automatikus frissítések a Play Áruházon keresztül."
                      : "Automatic updates managed by Google Play."}
                  </p>
                  <p className="font-mono text-[0.72rem] text-muted/90">
                    {t.download.androidMaintainer}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal
                delayMs={140}
                className="flex flex-col rounded-lg border border-line bg-surface/75 p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:p-7 lg:row-span-4 lg:grid lg:grid-rows-subgrid"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">{t.download.appStoreTitle}</h3>
                  <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
                    iOS · Expo
                  </span>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted">
                  {t.download.appStoreBody}
                </p>

                <div className="mt-6">
                  <AppStoreBadge className="w-full" />
                </div>

                <div className="mt-5 flex flex-col justify-between gap-1.5 border-t border-line/70 pt-3.5 text-xs leading-relaxed text-muted">
                  <p>{t.download.appStoreNote}</p>
                  <p className="font-mono text-[0.72rem] text-muted/90">
                    {t.download.iosMaintainer}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal
                delayMs={200}
                className="flex flex-col rounded-lg border border-line-2 bg-surface/85 p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:p-7 lg:row-span-4 lg:grid lg:grid-rows-subgrid"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">{t.download.githubTitle}</h3>
                  <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted">
                    Android · APK
                  </span>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted">
                  {t.download.githubBody}
                </p>

                <div className="mt-6">
                  <a
                    href={site.releases}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-accent px-5 text-center text-sm font-semibold text-bg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
                  >
                    {t.hero.ctaDownload}
                  </a>
                </div>

                <div className="mt-5 flex flex-col justify-between gap-1.5 border-t border-line/70 pt-3.5 text-xs leading-relaxed text-muted">
                  <p>{t.download.abiHint}</p>
                  <p className="font-mono text-[0.72rem] text-muted/90">
                    {t.download.obtainiumHint}{" "}
                    <a
                      href={site.obtainium}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline underline-offset-2"
                    >
                      Obtainium
                    </a>
                    {" · "}
                    {site.author} ({site.authorHandle})
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="backdrop-blur-[2px]">
          <div className="mx-auto max-w-[76rem] px-5 py-16 sm:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
              <ScrollReveal>
                <h2 className="text-lg font-semibold tracking-[-0.015em] lg:pt-1">
                  {t.privacyTeaser.title}
                </h2>
              </ScrollReveal>
              <ScrollReveal delayMs={100} className="max-w-[62ch]">
                <p className="text-[0.9375rem] leading-[1.75] text-muted">{t.privacyTeaser.body}</p>
                <Link
                  href={routes.privacy}
                  className="mt-5 inline-block text-sm font-medium text-accent underline decoration-line-2 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
                >
                  {t.privacyTeaser.cta}
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
