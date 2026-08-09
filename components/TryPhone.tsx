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
      <div className="relative w-full max-w-[400px] rounded-[2.6rem] border border-line bg-[#0b0b0d] p-3 shadow-2xl">
        <div
          ref={screenRef}
          className="relative overflow-hidden rounded-[2rem] bg-black"
          // Height comes from CSS, not from the measured scale: driving it from state
          // resizes the very element being observed, and the loop never settles.
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {on ? (
            <iframe
              src="/demo/index.html"
              title="NHNK demo"
              className="origin-top-left border-0"
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
              className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
              aria-label={t("Demó indítása", "Start the demo")}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 transition group-hover:border-accent group-hover:bg-accent/10">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v9" strokeLinecap="round" />
                  <path d="M6.5 6.5a8 8 0 1 0 11 0" strokeLinecap="round" />
                </svg>
              </span>
              <span className="px-6 text-base font-bold text-white">
                {t("Próbáld ki", "Try me out")}
              </span>
              <span className="px-8 text-xs leading-relaxed text-white/45">
                {t(
                  "Valódi app, kitalált mintaadatokkal. Nem kell belépni.",
                  "The real app with fictional sample data. No sign-in needed.",
                )}
              </span>
            </button>
          )}
        </div>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-white/15" />
      </div>

      {on && (
        <p className="mt-4 max-w-xs text-center text-xs leading-relaxed text-muted">
          {t(
            "Demó mód: minden adat kitalált, és semmi nem megy a Neptun felé.",
            "Demo mode: every figure is made up and nothing is sent to Neptun.",
          )}
        </p>
      )}
    </div>
  );
}
