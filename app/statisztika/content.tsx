"use client";

import { useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { PublicStatsPayload } from "@/lib/statsService";

type ChartMode = "active" | "versions" | "events" | "github";

const VERSION_PALETTE = [
  "#0f677b",
  "#2b9eb3",
  "#5cc0d6",
  "#4d7c8a",
  "#7aa6b3",
  "#3b5d66",
  "#8fb8c2",
  "#638994",
];

function formatDateLabel(isoDate: string, lang: "hu" | "en"): string {
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  const [, m, d] = parts;
  const monthsHu = ["jan.", "feb.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."];
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const idx = Math.max(0, Math.min(11, Number(m) - 1));
  return lang === "hu" ? `${monthsHu[idx]} ${Number(d)}.` : `${monthsEn[idx]} ${Number(d)}`;
}

export default function StatsContent({ initialStats }: { initialStats: PublicStatsPayload }) {
  const { lang } = useLanguage();
  const hu = lang === "hu";
  const [stats, setStats] = useState<PublicStatsPayload>(initialStats);
  const [refreshing, setRefreshing] = useState(false);

  const daily = stats.play.daily;
  const totalDays = daily.length;

  const [chartMode, setChartMode] = useState<ChartMode>("active");
  const [rangeStart, setRangeStart] = useState<number>(0);
  const [rangeEnd, setRangeEnd] = useState<number>(Math.max(0, totalDays - 1));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [dragStartIdx, setDragStartIdx] = useState<number | null>(null);
  const [dragCurrentIdx, setDragCurrentIdx] = useState<number | null>(null);
  const [releaseQuery, setReleaseQuery] = useState("");

  const svgRef = useRef<SVGSVGElement | null>(null);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/stats", { cache: "no-store" });
      if (res.ok) {
        const fresh = (await res.json()) as PublicStatsPayload;
        setStats(fresh);
        setRangeStart(0);
        setRangeEnd(Math.max(0, fresh.play.daily.length - 1));
      }
    } finally {
      setRefreshing(false);
    }
  }

  function applyPreset(days: number | "all") {
    if (days === "all" || days >= totalDays) {
      setRangeStart(0);
      setRangeEnd(Math.max(0, totalDays - 1));
    } else {
      setRangeEnd(Math.max(0, totalDays - 1));
      setRangeStart(Math.max(0, totalDays - days));
    }
  }

  const visibleDaily = useMemo(() => {
    const s = Math.max(0, Math.min(rangeStart, rangeEnd));
    const e = Math.min(totalDays - 1, Math.max(rangeStart, rangeEnd));
    return daily.slice(s, e + 1);
  }, [daily, rangeStart, rangeEnd, totalDays]);

  // Cumulative GitHub releases ordered oldest -> newest
  const githubChronological = useMemo(() => {
    const sorted = [...stats.github.releases].sort(
      (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
    );
    return sorted.reduce<
      (PublicStatsPayload["github"]["releases"][number] & {
        date: string;
        cumulativeDownloads: number;
      })[]
    >((acc, r) => {
      const prev = acc.length > 0 ? acc[acc.length - 1].cumulativeDownloads : 0;
      acc.push({
        ...r,
        date: r.publishedAt.slice(0, 10),
        cumulativeDownloads: prev + r.totalDownloads,
      });
      return acc;
    }, []);
  }, [stats.github.releases]);

  // All distinct version names observed in visibleDaily, ordered newest -> oldest
  const allObservedVersions = useMemo(() => {
    const set = new Set<string>();
    for (const d of visibleDaily) {
      for (const v of Object.keys(d.versions)) set.add(v);
    }
    return Array.from(set).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  }, [visibleDaily]);

  const activeDataCount = chartMode === "github" ? githubChronological.length : visibleDaily.length;

  function clientXToIndex(clientX: number): number {
    const svg = svgRef.current;
    if (!svg || activeDataCount <= 1) return 0;
    const rect = svg.getBoundingClientRect();
    const padLeft = 48;
    const padRight = 20;
    const plotW = Math.max(1, rect.width - padLeft - padRight);
    const relX = Math.max(0, Math.min(plotW, clientX - rect.left - padLeft));
    return Math.round((relX / plotW) * (activeDataCount - 1));
  }

  function handleWheelZoom(e: React.WheelEvent<SVGSVGElement>) {
    if (chartMode === "github" || totalDays <= 5) return;
    e.preventDefault();
    const currentSpan = rangeEnd - rangeStart + 1;
    const delta = e.deltaY < 0 ? -Math.max(2, Math.round(currentSpan * 0.18)) : Math.max(2, Math.round(currentSpan * 0.18));
    const newSpan = Math.max(5, Math.min(totalDays, currentSpan + delta));
    const centerRatio = hoverIndex !== null && visibleDaily.length > 1 ? hoverIndex / (visibleDaily.length - 1) : 0.5;
    const centerGlobal = rangeStart + Math.round((rangeEnd - rangeStart) * centerRatio);
    let nextStart = Math.round(centerGlobal - newSpan * centerRatio);
    let nextEnd = nextStart + newSpan - 1;
    if (nextStart < 0) {
      nextEnd -= nextStart;
      nextStart = 0;
    }
    if (nextEnd >= totalDays) {
      nextStart -= nextEnd - (totalDays - 1);
      nextEnd = totalDays - 1;
    }
    setRangeStart(Math.max(0, nextStart));
    setRangeEnd(Math.min(totalDays - 1, nextEnd));
  }

  function finishBrushSelection() {
    if (dragStartIdx !== null && dragCurrentIdx !== null && chartMode !== "github") {
      const a = Math.min(dragStartIdx, dragCurrentIdx);
      const b = Math.max(dragStartIdx, dragCurrentIdx);
      if (b - a >= 2) {
        const nextStart = rangeStart + a;
        const nextEnd = rangeStart + b;
        setRangeStart(nextStart);
        setRangeEnd(nextEnd);
        setHoverIndex(null);
      }
    }
    setDragStartIdx(null);
    setDragCurrentIdx(null);
  }

  const combinedTotalDownloads = stats.github.totalDownloads + stats.play.totalInstallEvents;
  const firstActive = visibleDaily[0]?.activeDevices ?? 0;
  const lastActive = visibleDaily[visibleDaily.length - 1]?.activeDevices ?? 0;
  const periodDelta = lastActive - firstActive;

  const filteredReleases = useMemo(() => {
    const q = releaseQuery.trim().toLowerCase();
    if (!q) return stats.github.releases;
    return stats.github.releases.filter(
      (r) => r.tag.toLowerCase().includes(q) || r.name.toLowerCase().includes(q),
    );
  }, [stats.github.releases, releaseQuery]);

  const maxReleaseDownloads = useMemo(
    () => Math.max(1, ...stats.github.releases.map((r) => r.totalDownloads)),
    [stats.github.releases],
  );

  // SVG dimensions
  const W = 920;
  const H = 320;
  const PAD_L = 48;
  const PAD_R = 20;
  const PAD_T = 20;
  const PAD_B = 36;
  const PLOT_W = W - PAD_L - PAD_R;
  const PLOT_H = H - PAD_T - PAD_B;

  const yMax = useMemo(() => {
    if (chartMode === "github") {
      return Math.max(10, ...githubChronological.map((r) => r.cumulativeDownloads));
    }
    if (chartMode === "events") {
      return Math.max(
        4,
        ...visibleDaily.map((d) => Math.max(d.installEvents, d.updateEvents, d.uninstallEvents)),
      );
    }
    if (chartMode === "versions") {
      return Math.max(
        5,
        ...visibleDaily.map((d) => Object.values(d.versions).reduce((s, c) => s + c, 0)),
      );
    }
    return Math.max(5, ...visibleDaily.map((d) => d.activeDevices));
  }, [chartMode, visibleDaily, githubChronological]);

  const xAt = (i: number, count: number) =>
    PAD_L + (count <= 1 ? PLOT_W / 2 : (i / (count - 1)) * PLOT_W);
  const yAt = (val: number) => PAD_T + PLOT_H - (Math.min(yMax, Math.max(0, val)) / yMax) * PLOT_H;

  const hoveredDay =
    chartMode !== "github" && hoverIndex !== null ? visibleDaily[hoverIndex] ?? null : null;
  const hoveredRelease =
    chartMode === "github" && hoverIndex !== null ? githubChronological[hoverIndex] ?? null : null;

  return (
    <div className="mx-auto max-w-[76rem] px-5 py-12 sm:px-8 sm:py-16">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">{hu ? "Nyilvános Áruházi Telemetria" : "Public Store Telemetry"}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            {hu ? "Alkalmazás-statisztika & Adaptáció" : "App Statistics & Version Adoption"}
          </h1>
          <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted">
            {hu
              ? "Élő és historikus mutatók a Google Play Áruház és a GitHub Releases összesített számlálóiból: aktív eszközök, verzió-adaptáció, Android-verziók és letöltések."
              : "Live and historical metrics from Google Play Store and GitHub Releases aggregate counters: active devices, version adoption, Android OS distribution, and downloads."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-sm border border-line bg-surface px-3 py-1.5 font-mono text-xs text-muted">
            {hu ? "Play adat:" : "Play data:"} <strong className="text-ink">{stats.latestPlayDate}</strong>
          </span>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="rounded-sm border border-line bg-surface px-3.5 py-1.5 font-mono text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
          >
            {refreshing
              ? hu
                ? "Frissítés..."
                : "Refreshing..."
              : hu
                ? "Adatok frissítése"
                : "Refresh data"}
          </button>
        </div>
      </div>

      {/* Zero-Data-Collection Transparency Callout */}
      <div className="mt-6 rounded-sm border border-line bg-surface p-4 sm:px-5">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent">
            {hu
              ? "0% alkalmazáson belüli adatgyűjtés · 100% áruházi transzparencia"
              : "0% In-App Tracking · 100% Store Transparency"}
          </p>
          <span className="font-mono text-[0.6875rem] text-muted">
            {stats.source === "live-gcs+github"
              ? hu
                ? "Forrás: Google Play Cloud Storage + GitHub API (Élő)"
                : "Source: Google Play Cloud Storage + GitHub API (Live)"
              : hu
                ? "Forrás: Ellenőrzött Google Play riport + GitHub API"
                : "Source: Verified Google Play report + GitHub API"}
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">
          {hu
            ? "Maga az NHNK alkalmazás nem tartalmaz semmilyen analitikát, Firebase-t, Crashlytics-et vagy követőkódot, és nem üzemeltet saját szervert. Az alábbi adatok kizárólag a Google Play Áruház és a GitHub Releases saját, anonim, összesített letöltési és telepítési számlálói."
            : "The NHNK app itself contains zero analytics, Firebase, Crashlytics, or tracking code, and runs no backend server. All figures below come strictly from Google Play Store and GitHub Releases aggregate store counters."}
        </p>
      </div>

      {/* KPI Bento Grid */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-sm border border-line bg-surface p-4">
          <p className="eyebrow">{hu ? "Összes letöltés" : "Total Downloads"}</p>
          <p className="tnum mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {combinedTotalDownloads}
          </p>
          <p className="mt-1 font-mono text-[0.6875rem] text-muted">
            GitHub ({stats.github.totalDownloads}) + Play ({stats.play.totalInstallEvents})
          </p>
        </div>

        <div className="rounded-sm border border-line bg-surface p-4">
          <p className="eyebrow">{hu ? "Play Aktív Eszköz" : "Play Active Devices"}</p>
          <p className="tnum mt-2 text-2xl font-semibold tracking-tight text-accent sm:text-3xl">
            {stats.play.activeDevices}
          </p>
          <p className="mt-1 font-mono text-[0.6875rem] text-muted">
            {hu ? `Csúcs: ${stats.play.peakActiveDevices} eszköz` : `Peak: ${stats.play.peakActiveDevices} devices`}
          </p>
        </div>

        <div className="rounded-sm border border-line bg-surface p-4">
          <p className="eyebrow">{hu ? "v2.x Adaptáció" : "v2.x Adoption"}</p>
          <p className="tnum mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {stats.play.v2AdoptionPercent}%
          </p>
          <p className="mt-1 font-mono text-[0.6875rem] text-muted">
            {hu
              ? `${stats.play.latestVersionSharePercent}% a legújabb verzión`
              : `${stats.play.latestVersionSharePercent}% on latest build`}
          </p>
        </div>

        <div className="rounded-sm border border-line bg-surface p-4">
          <p className="eyebrow">{hu ? "GitHub Kiadások" : "GitHub Releases"}</p>
          <p className="tnum mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {stats.github.releaseCount}
          </p>
          <p className="mt-1 font-mono text-[0.6875rem] text-muted">
            {hu ? `Legújabb: ${stats.github.latestTag}` : `Latest: ${stats.github.latestTag}`}
          </p>
        </div>

        <div className="rounded-sm border border-line bg-surface p-4">
          <p className="eyebrow">{hu ? "Crash-mentes" : "Crash-Free"}</p>
          <p className="tnum mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {stats.play.crashFreePercent}%
          </p>
          <p className="mt-1 font-mono text-[0.6875rem] text-muted">
            {hu
              ? `${stats.play.totalCrashes} crash · ${stats.play.totalAnrs} ANR`
              : `${stats.play.totalCrashes} crashes · ${stats.play.totalAnrs} ANRs`}
          </p>
        </div>

        <div className="rounded-sm border border-line bg-surface p-4">
          <p className="eyebrow">{hu ? "Play Értékelés" : "Play Rating"}</p>
          <p className="tnum mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {stats.play.rating.toFixed(1)} ★
          </p>
          <p className="mt-1 font-mono text-[0.6875rem] text-muted">
            {hu
              ? `${stats.play.totalUpdateEvents} sikeres frissítés`
              : `${stats.play.totalUpdateEvents} update events`}
          </p>
        </div>
      </div>

      {/* Main Interactive Zoomable Chart */}
      <div className="mt-8 rounded-sm border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow">
              {hu
                ? "Interaktív Idősor (Húzd az egeret vagy görgess a nagyításhoz)"
                : "Interactive Time Series (Drag to brush-zoom or scroll wheel)"}
            </p>
            <div className="mt-1.5 flex flex-wrap items-baseline gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-ink">
                {chartMode === "active" &&
                  (hu ? "Google Play Aktív Eszközök" : "Google Play Active Devices")}
                {chartMode === "versions" &&
                  (hu ? "Verzió-adaptáció időbeli alakulása" : "Version Adoption Waves Over Time")}
                {chartMode === "events" &&
                  (hu ? "Napi telepítések, frissítések és törlések" : "Daily Installs, Updates & Uninstalls")}
                {chartMode === "github" &&
                  (hu ? "GitHub Releases kumulált letöltések" : "GitHub Releases Cumulative Downloads")}
              </h2>
              {chartMode !== "github" && (
                <span className="tnum font-mono text-xs text-muted">
                  {visibleDaily[0]?.date} → {visibleDaily[visibleDaily.length - 1]?.date} ({visibleDaily.length}{" "}
                  {hu ? "nap" : "days"}, {periodDelta >= 0 ? `+${periodDelta}` : periodDelta})
                </span>
              )}
            </div>
          </div>

          {/* Mode & Zoom Preset Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap overflow-hidden rounded-sm border border-line">
              {(
                [
                  { id: "active", hu: "Aktív eszközök", en: "Active Devices" },
                  { id: "versions", hu: "Verzió-adaptáció", en: "Version Adoption" },
                  { id: "events", hu: "Napi mozgás", en: "Daily Flow" },
                  { id: "github", hu: "GitHub kumulált", en: "GitHub Cumulative" },
                ] as const
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setChartMode(m.id);
                    setHoverIndex(null);
                  }}
                  className={`px-2.5 py-1.5 font-mono text-xs transition-colors ${
                    chartMode === m.id ? "bg-ink text-bg font-medium" : "text-muted hover:text-ink"
                  }`}
                >
                  {hu ? m.hu : m.en}
                </button>
              ))}
            </div>

            {chartMode !== "github" && (
              <div className="flex overflow-hidden rounded-sm border border-line">
                {(
                  [
                    { label: "14N", en: "14D", days: 14 as const },
                    { label: "30N", en: "30D", days: 30 as const },
                    { label: "60N", en: "60D", days: 60 as const },
                    { label: "Mind", en: "All", days: "all" as const },
                  ]
                ).map((p) => {
                  const active =
                    p.days === "all"
                      ? rangeStart === 0 && rangeEnd === totalDays - 1
                      : rangeEnd === totalDays - 1 && rangeEnd - rangeStart + 1 === p.days;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => applyPreset(p.days)}
                      className={`px-2.5 py-1.5 font-mono text-xs transition-colors ${
                        active ? "bg-accent text-bg font-medium" : "text-muted hover:text-ink"
                      }`}
                    >
                      {hu ? p.label : p.en}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Hover Readout Bar */}
        <div className="mt-4 flex min-h-[2.25rem] flex-wrap items-center justify-between gap-3 rounded-sm bg-surface-2 px-3.5 py-2 font-mono text-xs">
          {hoveredDay ? (
            <>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-semibold text-ink">{hoveredDay.date}</span>
                <span>
                  {hu ? "Aktív eszköz:" : "Active devices:"}{" "}
                  <strong className="text-accent">{hoveredDay.activeDevices}</strong>
                </span>
                <span>
                  {hu ? "Új telepítés:" : "Installs:"} <strong>+{hoveredDay.installEvents}</strong>
                </span>
                <span>
                  {hu ? "Frissítés:" : "Updates:"} <strong>{hoveredDay.updateEvents}</strong>
                </span>
                <span>
                  {hu ? "Törlés:" : "Uninstalls:"} <strong>-{hoveredDay.uninstallEvents}</strong>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[0.6875rem] text-muted">
                {Object.entries(hoveredDay.versions)
                  .sort((a, b) => b[1] - a[1])
                  .map(([ver, cnt]) => (
                    <span key={ver} className="rounded-sm border border-line bg-surface px-1.5 py-0.5">
                      v{ver}: <strong className="text-ink">{cnt}</strong>
                    </span>
                  ))}
              </div>
            </>
          ) : hoveredRelease ? (
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold text-ink">
                {hoveredRelease.tag} ({hoveredRelease.date})
              </span>
              <span>
                {hu ? "Kiadás letöltései:" : "Release downloads:"}{" "}
                <strong className="text-accent">{hoveredRelease.totalDownloads}</strong>
              </span>
              <span>
                {hu ? "Kumulált GitHub letöltés:" : "Cumulative GitHub downloads:"}{" "}
                <strong>{hoveredRelease.cumulativeDownloads}</strong>
              </span>
            </div>
          ) : (
            <span className="text-muted">
              {hu
                ? "Mozgasd az egeret vagy az ujjad a grafikon fölé a napi részletekért, vagy jelölj ki egy szakaszt a nagyításhoz."
                : "Hover or touch the chart to inspect daily metrics, or drag across a range to zoom in."}
            </span>
          )}
        </div>

        {/* SVG Chart Canvas */}
        <div className="relative mt-4 select-none overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="h-[260px] w-full cursor-crosshair sm:h-[320px]"
            onWheel={handleWheelZoom}
            onMouseDown={(e) => {
              const idx = clientXToIndex(e.clientX);
              setDragStartIdx(idx);
              setDragCurrentIdx(idx);
            }}
            onMouseMove={(e) => {
              const idx = clientXToIndex(e.clientX);
              setHoverIndex(idx);
              if (dragStartIdx !== null) {
                setDragCurrentIdx(idx);
              }
            }}
            onMouseUp={finishBrushSelection}
            onMouseLeave={() => {
              setHoverIndex(null);
              if (dragStartIdx !== null) finishBrushSelection();
            }}
          >
            <defs>
              <linearGradient id="nhnkAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const val = Math.round(yMax * t);
              const y = yAt(val);
              return (
                <g key={t}>
                  <line
                    x1={PAD_L}
                    x2={W - PAD_R}
                    y1={y}
                    y2={y}
                    stroke="var(--color-line)"
                    strokeDasharray={t === 0 ? undefined : "3 3"}
                  />
                  <text
                    x={PAD_L - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-muted font-mono text-[10px]"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Brush selection overlay */}
            {dragStartIdx !== null && dragCurrentIdx !== null && chartMode !== "github" && (
              <rect
                x={Math.min(
                  xAt(dragStartIdx, activeDataCount),
                  xAt(dragCurrentIdx, activeDataCount),
                )}
                y={PAD_T}
                width={Math.abs(
                  xAt(dragCurrentIdx, activeDataCount) - xAt(dragStartIdx, activeDataCount),
                )}
                height={PLOT_H}
                fill="var(--color-accent)"
                fillOpacity={0.15}
                stroke="var(--color-accent)"
              />
            )}

            {/* Mode 1: Active Devices Area + Line */}
            {chartMode === "active" && visibleDaily.length > 0 && (
              <>
                <path
                  d={`M ${xAt(0, visibleDaily.length)} ${PAD_T + PLOT_H} ${visibleDaily
                    .map((d, i) => `L ${xAt(i, visibleDaily.length)} ${yAt(d.activeDevices)}`)
                    .join(" ")} L ${xAt(visibleDaily.length - 1, visibleDaily.length)} ${PAD_T + PLOT_H} Z`}
                  fill="url(#nhnkAreaGrad)"
                />
                <path
                  d={visibleDaily
                    .map(
                      (d, i) =>
                        `${i === 0 ? "M" : "L"} ${xAt(i, visibleDaily.length)} ${yAt(d.activeDevices)}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={2.5}
                />
                {visibleDaily.map((d, i) => (
                  <circle
                    key={d.date}
                    cx={xAt(i, visibleDaily.length)}
                    cy={yAt(d.activeDevices)}
                    r={hoverIndex === i ? 5 : visibleDaily.length <= 35 ? 2.5 : 1.5}
                    fill="var(--color-accent)"
                  />
                ))}
              </>
            )}

            {/* Mode 2: Stacked Version Adoption Bars */}
            {chartMode === "versions" &&
              visibleDaily.map((d, i) => {
                const barW = Math.max(3, Math.min(24, PLOT_W / Math.max(1, visibleDaily.length) - 2));
                const x = xAt(i, visibleDaily.length) - barW / 2;
                const segments = allObservedVersions.reduce<
                  { ver: string; vIdx: number; yTop: number; height: number }[]
                >((acc, ver, vIdx) => {
                  const count = d.versions[ver] ?? 0;
                  if (count <= 0) return acc;
                  const prevSum = acc.reduce(
                    (s, seg) => s + (d.versions[seg.ver] ?? 0),
                    0,
                  );
                  const yTop = yAt(prevSum + count);
                  const yBot = yAt(prevSum);
                  acc.push({
                    ver,
                    vIdx,
                    yTop,
                    height: Math.max(1, yBot - yTop),
                  });
                  return acc;
                }, []);
                return (
                  <g key={d.date}>
                    {segments.map((seg) => (
                      <rect
                        key={seg.ver}
                        x={x}
                        y={seg.yTop}
                        width={barW}
                        height={seg.height}
                        fill={VERSION_PALETTE[seg.vIdx % VERSION_PALETTE.length]}
                        opacity={hoverIndex === null || hoverIndex === i ? 0.92 : 0.55}
                      />
                    ))}
                  </g>
                );
              })}

            {/* Mode 3: Daily Install / Update / Uninstall Bars */}
            {chartMode === "events" &&
              visibleDaily.map((d, i) => {
                const groupW = Math.max(4, Math.min(26, PLOT_W / Math.max(1, visibleDaily.length) - 2));
                const singleW = Math.max(1.5, groupW / 3);
                const baseX = xAt(i, visibleDaily.length) - groupW / 2;
                const yZero = yAt(0);
                return (
                  <g key={d.date}>
                    {d.installEvents > 0 && (
                      <rect
                        x={baseX}
                        y={yAt(d.installEvents)}
                        width={singleW}
                        height={Math.max(2, yZero - yAt(d.installEvents))}
                        fill="#0f677b"
                      />
                    )}
                    {d.updateEvents > 0 && (
                      <rect
                        x={baseX + singleW}
                        y={yAt(d.updateEvents)}
                        width={singleW}
                        height={Math.max(2, yZero - yAt(d.updateEvents))}
                        fill="#2b9eb3"
                      />
                    )}
                    {d.uninstallEvents > 0 && (
                      <rect
                        x={baseX + singleW * 2}
                        y={yAt(d.uninstallEvents)}
                        width={singleW}
                        height={Math.max(2, yZero - yAt(d.uninstallEvents))}
                        fill="var(--color-danger)"
                      />
                    )}
                  </g>
                );
              })}

            {/* Mode 4: Cumulative GitHub Downloads */}
            {chartMode === "github" && githubChronological.length > 0 && (
              <>
                <path
                  d={`M ${xAt(0, githubChronological.length)} ${PAD_T + PLOT_H} ${githubChronological
                    .map(
                      (r, i) =>
                        `L ${xAt(i, githubChronological.length)} ${yAt(r.cumulativeDownloads)}`,
                    )
                    .join(" ")} L ${xAt(githubChronological.length - 1, githubChronological.length)} ${PAD_T + PLOT_H} Z`}
                  fill="url(#nhnkAreaGrad)"
                />
                <path
                  d={githubChronological
                    .map(
                      (r, i) =>
                        `${i === 0 ? "M" : "L"} ${xAt(i, githubChronological.length)} ${yAt(r.cumulativeDownloads)}`,
                    )
                    .join(" ")}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth={2.5}
                />
                {githubChronological.map((r, i) => (
                  <circle
                    key={r.tag}
                    cx={xAt(i, githubChronological.length)}
                    cy={yAt(r.cumulativeDownloads)}
                    r={hoverIndex === i ? 5.5 : 3}
                    fill="var(--color-accent)"
                  />
                ))}
              </>
            )}

            {/* Hover vertical crosshair */}
            {hoverIndex !== null && hoverIndex < activeDataCount && (
              <line
                x1={xAt(hoverIndex, activeDataCount)}
                x2={xAt(hoverIndex, activeDataCount)}
                y1={PAD_T}
                y2={PAD_T + PLOT_H}
                stroke="var(--color-ink)"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            )}

            {/* X-axis labels */}
            {chartMode !== "github"
              ? visibleDaily.map((d, i) => {
                  const step = Math.max(1, Math.ceil(visibleDaily.length / 7));
                  if (i % step !== 0 && i !== visibleDaily.length - 1) return null;
                  return (
                    <text
                      key={d.date}
                      x={xAt(i, visibleDaily.length)}
                      y={H - 10}
                      textAnchor="middle"
                      className="fill-muted font-mono text-[10px]"
                    >
                      {formatDateLabel(d.date, lang)}
                    </text>
                  );
                })
              : githubChronological.map((r, i) => {
                  const step = Math.max(1, Math.ceil(githubChronological.length / 7));
                  if (i % step !== 0 && i !== githubChronological.length - 1) return null;
                  return (
                    <text
                      key={r.tag}
                      x={xAt(i, githubChronological.length)}
                      y={H - 10}
                      textAnchor="middle"
                      className="fill-muted font-mono text-[10px]"
                    >
                      {r.tag}
                    </text>
                  );
                })}
          </svg>
        </div>

        {/* Dual Range Zoom Slider + Legend */}
        {chartMode !== "github" && (
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-muted">
                {hu ? "Időablak finomhangolás:" : "Zoom window:"}
              </span>
              <input
                type="range"
                min={0}
                max={Math.max(0, rangeEnd - 2)}
                value={rangeStart}
                aria-label={hu ? "Kezdőnap" : "Start date"}
                onChange={(e) => setRangeStart(Math.min(Number(e.target.value), rangeEnd - 2))}
                className="h-1.5 flex-1 accent-[var(--color-accent)]"
              />
              <input
                type="range"
                min={Math.min(totalDays - 1, rangeStart + 2)}
                max={Math.max(0, totalDays - 1)}
                value={rangeEnd}
                aria-label={hu ? "Zárónap" : "End date"}
                onChange={(e) => setRangeEnd(Math.max(Number(e.target.value), rangeStart + 2))}
                className="h-1.5 flex-1 accent-[var(--color-accent)]"
              />
            </div>

            {chartMode === "versions" && (
              <div className="flex flex-wrap items-center gap-2">
                {allObservedVersions.slice(0, 8).map((ver, idx) => (
                  <span key={ver} className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted">
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-[2px]"
                      style={{ backgroundColor: VERSION_PALETTE[idx % VERSION_PALETTE.length] }}
                    />
                    v{ver}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3-Column Breakdown: Version Adoption % | Android OS Versions | OEM Brands & Models */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Card 1: Version Adoption % */}
        <div className="rounded-sm border border-line bg-surface p-5">
          <p className="eyebrow">{hu ? "Verzió-adaptáció (Google Play)" : "Version Adoption (Google Play)"}</p>
          <h3 className="mt-1.5 text-base font-semibold text-ink">
            {hu ? "Aktív verziók megoszlása" : "Active Version Share"}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {hu
              ? "A Play Áruházból telepített aktív készülékek hány százaléka fut a legfrissebb verziókon."
              : "Share of active Google Play devices running each app version."}
          </p>

          <div className="mt-5 space-y-3.5">
            {stats.play.currentVersions.map((v, idx) => (
              <div key={v.version}>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-semibold text-ink">
                    v{v.version}{" "}
                    {idx === 0 && (
                      <span className="ml-1.5 rounded-sm bg-surface-2 px-1.5 py-0.5 text-[10px] text-accent">
                        {hu ? "legújabb" : "latest"}
                      </span>
                    )}
                  </span>
                  <span className="tnum text-muted">
                    <strong className="text-ink">{v.sharePercent}%</strong> ({v.activeDevices}{" "}
                    {hu ? "eszköz" : "devices"})
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-sm bg-surface-2">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${Math.max(4, v.sharePercent)}%`,
                      backgroundColor: VERSION_PALETTE[idx % VERSION_PALETTE.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-line pt-4 font-mono text-xs text-muted">
            <div className="flex justify-between">
              <span>{hu ? "2.x főverzió arány:" : "v2.x major adoption:"}</span>
              <strong className="text-ink">{stats.play.v2AdoptionPercent}%</strong>
            </div>
            <div className="mt-1 flex justify-between">
              <span>{hu ? "1.x örökölt verzió:" : "v1.x legacy share:"}</span>
              <strong className="text-ink">{Math.max(0, 100 - stats.play.v2AdoptionPercent)}%</strong>
            </div>
          </div>
        </div>

        {/* Card 2: Android OS Version Distribution */}
        <div className="rounded-sm border border-line bg-surface p-5">
          <p className="eyebrow">{hu ? "Operációs rendszer" : "Operating System"}</p>
          <h3 className="mt-1.5 text-base font-semibold text-ink">
            {hu ? "Android-verziók megoszlása" : "Android OS Distribution"}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {hu
              ? "Aktív eszközök API-szint szerinti megoszlása (Android 12 – Android 16)."
              : "Active devices broken down by Android SDK / API level."}
          </p>

          <div className="mt-5 space-y-3.5">
            {stats.play.currentAndroidVersions.map((os, idx) => (
              <div key={os.api}>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-medium text-ink">{os.label}</span>
                  <span className="tnum text-muted">
                    <strong className="text-ink">{os.sharePercent}%</strong> ({os.activeDevices})
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-sm bg-surface-2">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${Math.max(4, os.sharePercent)}%`,
                      backgroundColor: VERSION_PALETTE[idx % VERSION_PALETTE.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: OEM Brands & Top Devices */}
        <div className="rounded-sm border border-line bg-surface p-5">
          <p className="eyebrow">{hu ? "Készülékek & Gyártók" : "Devices & OEMs"}</p>
          <h3 className="mt-1.5 text-base font-semibold text-ink">
            {hu ? "Gyártói megoszlás" : "Manufacturer Breakdown"}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {hu
              ? "Milyen gyártók készülékein fut az NHNK (a háttérfolyamat-kezelő miatt kiemelten fontos)."
              : "OEM distribution across active devices."}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {stats.play.brands.map((b) => (
              <span
                key={b.brand}
                className="rounded-sm border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs"
              >
                <strong className="text-ink">{b.brand}</strong>: {b.sharePercent}% ({b.activeDevices})
              </span>
            ))}
          </div>

          <div className="mt-4 max-h-[190px] overflow-y-auto border-t border-line pt-3">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-line text-[10px] uppercase text-muted">
                  <th className="pb-1.5">{hu ? "Modell" : "Model"}</th>
                  <th className="pb-1.5 text-right">{hu ? "Aktív" : "Active"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {stats.play.devices.map((d) => (
                  <tr key={d.codename}>
                    <td className="py-1.5 text-ink">
                      {d.model}{" "}
                      <span className="text-[10px] text-muted">({d.codename})</span>
                    </td>
                    <td className="tnum py-1.5 text-right font-semibold text-ink">{d.activeDevices}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* GitHub Releases & Architecture Table */}
      <div className="mt-8 rounded-sm border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">GitHub Releases API</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-ink">
              {hu
                ? "Kiadások és architektúrák szerinti letöltések"
                : "Downloads by Release & Architecture"}
            </h2>
            <p className="mt-1 text-xs text-muted">
              {hu
                ? "Minden publikált GitHub kiadás letöltésszáma (arm64-v8a APK, universal APK, armeabi-v7a, x86_64 és iOS .ipa)."
                : "Download counts for every published GitHub release across Android ABIs and iOS .ipa."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs">
              arm64-v8a: <strong className="text-ink">{stats.github.abiTotals.arm64}</strong>
            </span>
            <span className="rounded-sm border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs">
              universal: <strong className="text-ink">{stats.github.abiTotals.universal}</strong>
            </span>
            <span className="rounded-sm border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs">
              iOS (.ipa): <strong className="text-ink">{stats.github.abiTotals.ios}</strong>
            </span>
            <span className="rounded-sm border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs">
              armv7 + x86_64:{" "}
              <strong className="text-ink">
                {stats.github.abiTotals.armv7 + stats.github.abiTotals.x86_64}
              </strong>
            </span>
            <input
              type="search"
              value={releaseQuery}
              onChange={(e) => setReleaseQuery(e.target.value)}
              placeholder={hu ? "Verzió keresése (pl. 2.0)..." : "Filter version (e.g. 2.0)..."}
              className="rounded-sm border border-line bg-bg px-3 py-1 font-mono text-xs text-ink placeholder:text-muted"
            />
          </div>
        </div>

        <div className="mt-4 max-h-[420px] overflow-x-auto overflow-y-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="sticky top-0 bg-surface">
              <tr className="border-b border-line text-[10px] uppercase tracking-wider text-muted">
                <th className="py-2.5 pr-4">{hu ? "Verzió" : "Version"}</th>
                <th className="py-2.5 pr-4">{hu ? "Dátum" : "Published"}</th>
                <th className="py-2.5 pr-4 text-right">arm64</th>
                <th className="py-2.5 pr-4 text-right">universal</th>
                <th className="py-2.5 pr-4 text-right">iOS .ipa</th>
                <th className="py-2.5 pr-4 text-right">{hu ? "Összes" : "Total"}</th>
                <th className="w-36 py-2.5">{hu ? "Arány" : "Share"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredReleases.map((rel) => {
                const pct = Math.round((rel.totalDownloads / maxReleaseDownloads) * 100);
                return (
                  <tr key={rel.tag} className="hover:bg-surface-2/50">
                    <td className="py-2.5 pr-4 font-semibold text-ink">{rel.tag}</td>
                    <td className="py-2.5 pr-4 text-muted">{rel.publishedAt.slice(0, 10)}</td>
                    <td className="tnum py-2.5 pr-4 text-right text-muted">{rel.arm64Downloads}</td>
                    <td className="tnum py-2.5 pr-4 text-right text-muted">{rel.universalDownloads}</td>
                    <td className="tnum py-2.5 pr-4 text-right text-muted">{rel.iosDownloads}</td>
                    <td className="tnum py-2.5 pr-4 text-right font-semibold text-ink">
                      {rel.totalDownloads}
                    </td>
                    <td className="py-2.5">
                      <div className="h-2 w-full overflow-hidden rounded-sm bg-surface-2">
                        <div
                          className="h-full bg-accent"
                          style={{ width: `${Math.max(3, pct)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
