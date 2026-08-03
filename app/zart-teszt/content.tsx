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

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t.beta.title}</h1>
      <p className="mt-5 text-[15px] leading-relaxed text-muted">{t.beta.intro}</p>

      <div className="mt-6 rounded-xl border border-line bg-surface p-5">
        <p className="text-sm leading-relaxed text-muted">{t.beta.googleNote}</p>
      </div>

      <form onSubmit={submit} className="mt-8">
        <label htmlFor="email" className="block text-sm font-semibold">
          {t.beta.emailLabel}
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
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
            className="flex-1 rounded-lg border border-line bg-surface px-4 py-3 text-[15px] outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={state === "sending"}
            className="rounded-lg bg-accent px-6 py-3 text-[15px] font-bold text-black disabled:opacity-60"
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
          role="status"
          className={`mt-4 text-sm ${done ? "text-accent" : "text-red-400"}`}
        >
          {message}
        </p>
      )}

      <p className="mt-6 text-xs leading-relaxed text-muted">
        {t.beta.privacyNote}{" "}
        <a href={`mailto:${site.contactEmail}`} className="text-accent hover:underline">
          {site.contactEmail}
        </a>
      </p>

      <h2 className="mt-14 text-xl font-bold tracking-tight">{t.beta.stepsTitle}</h2>
      <ol className="mt-5 grid gap-3">
        {t.beta.steps.map((step, i) => (
          <li key={i} className="rounded-xl border border-line bg-surface p-4 text-sm text-muted">
            <span className="mr-2 font-bold text-accent">{i + 1}.</span>
            {step}
          </li>
        ))}
      </ol>

      <div className="mt-14 border-t border-line pt-6">
        <Link href={routes.home} className="text-sm text-accent hover:underline">
          &larr; {t.legal.backHome}
        </Link>
      </div>
    </div>
  );
}
