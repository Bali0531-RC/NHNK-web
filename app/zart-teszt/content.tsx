"use client";

import Link from "next/link";
import { useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { routes } from "@/lib/i18n";
import { site } from "@/lib/site";

type State = "idle" | "sending" | "added" | "already" | "error";

export default function BetaContent() {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;

    setState("sending");
    setMessage("");

    try {
      // Trailing slash matters: next.config sets trailingSlash, so /api/tester would 308.
      const res = await fetch("/api/tester/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, lang, website }),
      });
      const data = (await res.json()) as { status?: string; error?: string };

      if (res.ok && data.status === "added") {
        setState("added");
        setMessage(t.beta.successAdded);
        setEmail("");
      } else if (res.ok && data.status === "already-registered") {
        setState("already");
        setMessage(t.beta.successAlready);
      } else if (res.status === 429) {
        setState("error");
        setMessage(t.beta.errorRate);
      } else if (data.error === "invalid-email") {
        setState("error");
        setMessage(t.beta.errorInvalid);
      } else {
        setState("error");
        setMessage(t.beta.errorGeneric);
      }
    } catch {
      setState("error");
      setMessage(t.beta.errorGeneric);
    }
  }

  const done = state === "added" || state === "already";
  const failed = state === "error";

  return (
    <div className="mx-auto max-w-[46rem] px-5 py-14 sm:px-8 sm:py-20">
      <h1 className="text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.022em] sm:text-[2.125rem]">
        {t.beta.title}
      </h1>
      <p className="mt-6 max-w-[62ch] text-[0.9375rem] leading-[1.75] text-muted">{t.beta.intro}</p>

      <p className="mt-6 max-w-[62ch] border-l-2 border-line-2 py-1 pl-5 text-[0.875rem] leading-[1.7] text-muted">
        {t.beta.googleNote}
      </p>

      <form onSubmit={submit} noValidate className="mt-10">
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          {t.beta.emailLabel}
        </label>
        <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.beta.emailPlaceholder}
            aria-invalid={failed || undefined}
            aria-describedby={message ? "email-status" : undefined}
            className={`flex-1 rounded-md border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 ${
              failed ? "border-danger" : "border-line-2 focus:border-accent"
            }`}
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55"
          >
            {state === "sending" ? t.beta.submitting : t.beta.submit}
          </button>
        </div>

        {/* Hidden from people, tempting to bots. */}
        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
      </form>

      {message && (
        <p
          id="email-status"
          role="status"
          className={`mt-3.5 max-w-[62ch] border-l-2 py-1 pl-4 text-sm leading-relaxed ${
            done ? "border-accent text-ink" : "border-danger text-danger"
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-6 max-w-[62ch] text-xs leading-relaxed text-muted">
        {t.beta.privacyNote}{" "}
        <a
          href={`mailto:${site.contactEmail}`}
          className="text-accent underline underline-offset-2"
        >
          {site.contactEmail}
        </a>
      </p>

      <h2 className="mt-16 text-lg font-semibold tracking-[-0.015em]">{t.beta.stepsTitle}</h2>
      <ol className="mt-6">
        {t.beta.steps.map((step, i) => (
          <li
            key={i}
            className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-2 border-t border-line py-4 last:border-b"
          >
            <span aria-hidden className="tnum font-mono text-xs text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="max-w-[58ch] text-[0.9375rem] leading-[1.7] text-muted">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-16 border-t border-line pt-6">
        <Link
          href={routes.home}
          className="text-sm font-medium text-accent underline decoration-line-2 underline-offset-4 transition-colors duration-200 hover:decoration-accent"
        >
          {t.legal.backHome}
        </Link>
      </div>
    </div>
  );
}
