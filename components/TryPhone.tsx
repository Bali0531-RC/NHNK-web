"use client";

import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";

/// Below roughly 360 logical pixels the app's bottom bar and day tabs clip, so it
/// always renders at this width and the frame is scaled to whatever room there is.
const SCREEN_WIDTH = 400;
const SCREEN_HEIGHT = Math.round((SCREEN_WIDTH * 19.5) / 9);

/**
 * The demo is a real Flutter build of the app running in demo mode, so it is a few
 * megabytes. The iframe is only mounted once someone asks for it, otherwise every
 * visitor to the landing page would pay for it.
 */
export function TryPhone() {
  const { lang } = useLanguage();
  const [on, setOn] = useState(false);
  const [scale, setScale] = useState(1);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / SCREEN_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const t = (hu: string, en: string) => (lang === "hu" ? hu : en);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full rounded-[2rem] border border-line-2/60 bg-[#161c1e] p-2.5 shadow-[0_24px_50px_-24px_rgba(28,36,38,0.45)]">
        <div
          ref={screenRef}
          className="relative overflow-hidden rounded-[1.5rem] bg-[#0c1112]"
          // Height comes from CSS, not from the measured scale: driving it from state
          // resizes the very element being observed, and the loop never settles.
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {on ? (
            <iframe
              src="/demo/index.html"
              title={t("NHNK demó", "NHNK demo")}
              className="absolute left-0 top-0 origin-top-left border-0"
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                transform: `scale(${scale})`,
              }}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <button
              type="button"
              onClick={() => setOn(true)}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-3.5 px-5 text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-[transform,border-color,background-color] duration-200 group-hover:border-white/60 group-hover:bg-white/5 group-active:scale-95">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 3.5v8.5" strokeLinecap="round" />
                  <path d="M6.8 6.8a7.4 7.4 0 1 0 10.4 0" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[0.9375rem] font-semibold text-white">
                {t("Demó indítása", "Start the demo")}
              </span>
              <span className="text-xs leading-relaxed text-white/50">
                {t(
                  "A valódi app, kitalált mintaadatokkal. Nem kell belépni.",
                  "The real app with made-up sample data. No sign-in needed.",
                )}
              </span>
            </button>
          )}
        </div>
        <div aria-hidden className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-white/15" />
      </div>

      <p className="mt-4 max-w-[34ch] text-center text-xs leading-relaxed text-muted">
        {on
          ? t(
              "Demó mód: minden adat kitalált, és semmi nem megy a Neptun felé.",
              "Demo mode: every figure is made up and nothing is sent to Neptun.",
            )
          : t(
              "Az alkalmazás böngészőben futó változata.",
              "The browser build of the application.",
            )}
      </p>
    </div>
  );
}
