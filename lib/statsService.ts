import { createSign } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { playStatsSnapshot } from "./playStatsSnapshot";

export type DailyPlayStat = {
  date: string;
  activeDevices: number;
  dailyInstalls: number;
  dailyUninstalls: number;
  dailyUpgrades: number;
  installEvents: number;
  updateEvents: number;
  uninstallEvents: number;
  storeVisitors: number;
  storeAcquisitions: number;
  versions: Record<string, number>;
  androidApi: Record<string, number>;
};

export type DeviceStat = {
  codename: string;
  model: string;
  brand: string;
  activeDevices: number;
};

export type GithubReleaseStat = {
  tag: string;
  name: string;
  publishedAt: string;
  totalDownloads: number;
  arm64Downloads: number;
  armv7Downloads: number;
  x86_64Downloads: number;
  universalDownloads: number;
  iosDownloads: number;
  aabDownloads: number;
};

export type PublicStatsPayload = {
  source: "live-gcs+github" | "snapshot+github";
  updatedAt: string;
  latestPlayDate: string;
  play: {
    activeDevices: number;
    peakActiveDevices: number;
    totalInstallEvents: number;
    totalUpdateEvents: number;
    totalUninstallEvents: number;
    totalStoreVisitors: number;
    totalStoreAcquisitions: number;
    rating: number;
    ratingCount: number;
    totalCrashes: number;
    totalAnrs: number;
    crashFreePercent: number;
    latestVersionSharePercent: number;
    v2AdoptionPercent: number;
    currentVersions: { version: string; activeDevices: number; sharePercent: number }[];
    currentAndroidVersions: { api: string; label: string; activeDevices: number; sharePercent: number }[];
    devices: DeviceStat[];
    brands: { brand: string; activeDevices: number; sharePercent: number }[];
    daily: DailyPlayStat[];
  };
  github: {
    totalDownloads: number;
    releaseCount: number;
    latestTag: string;
    latestPublishedAt: string;
    abiTotals: {
      arm64: number;
      universal: number;
      armv7: number;
      x86_64: number;
      ios: number;
    };
    releases: GithubReleaseStat[];
  };
};

const VC_MAP: Record<string, string> = {
  "17": "1.0.11",
  "18": "1.0.12",
  "19": "1.0.13",
  "20": "1.1.0",
  "21": "1.1.1",
  "22": "1.1.2",
  "23": "1.2.0",
  "24": "1.2.1",
  "25": "1.2.2",
  "26": "1.2.3",
  "27": "1.2.4",
  "28": "1.2.5",
  "29": "1.2.6",
  "30": "1.2.7",
  "31": "1.2.8",
  "32": "1.2.9",
  "33": "1.2.10",
  "34": "1.3.0",
  "35": "1.3.1",
  "36": "2.0.0",
  "37": "2.0.1",
  "38": "2.0.2",
  "39": "2.0.3",
  "40": "2.0.4",
  "41": "2.0.5",
  "42": "2.0.6",
  "43": "2.0.7",
  "44": "2.0.8",
  "45": "2.0.9",
};

const ANDROID_API_LABELS: Record<string, string> = {
  "36": "Android 16 (API 36)",
  "35": "Android 15 (API 35)",
  "34": "Android 14 (API 34)",
  "33": "Android 13 (API 33)",
  "32": "Android 12L (API 32)",
  "31": "Android 12 (API 31)",
  "30": "Android 11 (API 30)",
  "29": "Android 10 (API 29)",
};

const DEVICE_MAP: Record<string, { model: string; brand: string }> = {
  a26x: { model: "Samsung Galaxy A26 5G", brand: "Samsung" },
  a34x: { model: "Samsung Galaxy A34 5G", brand: "Samsung" },
  a53x: { model: "Samsung Galaxy A53 5G", brand: "Samsung" },
  b0s: { model: "Samsung Galaxy S22 Ultra", brand: "Samsung" },
  dm3q: { model: "Samsung Galaxy S23 Ultra", brand: "Samsung" },
  beyond2: { model: "Samsung Galaxy S10+", brand: "Samsung" },
  Asteroids: { model: "Nothing Phone (2a) Plus", brand: "Nothing" },
  OP515BL1: { model: "OnePlus Nord CE 2", brand: "OnePlus" },
  ruby: { model: "Xiaomi Redmi Note 12 Pro", brand: "Xiaomi" },
  psyche: { model: "Xiaomi 12X", brand: "Xiaomi" },
  malachite: { model: "Xiaomi Redmi Note 14 Pro", brand: "Xiaomi" },
  lemon: { model: "Realme Narzo / C-Series", brand: "Realme" },
  HNPTPX: { model: "Honor Magic / X-Series", brand: "Honor" },
  warhol: { model: "Motorola / Android OEM", brand: "Motorola" },
  unknown: { model: "Egyéb Android készülék", brand: "Other" },
};

let cachedPayload: PublicStatsPayload | null = null;
let cachedAtMs = 0;
const CACHE_TTL_MS = 30 * 60 * 1000;

function base64Url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function loadServiceAccount(): { client_email: string; private_key: string; token_uri: string } | null {
  const rawEnv = process.env.PLAY_STORE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (rawEnv && rawEnv.trim().startsWith("{")) {
    try {
      return JSON.parse(rawEnv);
    } catch {
      // fall through
    }
  }
  const localPath = "/home/bali0531/Downloads/white-berm-505521-u0-0693b9e33067.json";
  if (existsSync(localPath)) {
    try {
      return JSON.parse(readFileSync(localPath, "utf8"));
    } catch {
      return null;
    }
  }
  return null;
}

async function getGoogleAccessToken(sa: {
  client_email: string;
  private_key: string;
  token_uri: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/devstorage.read_only",
      aud: sa.token_uri || "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  signer.end();
  const signature = base64Url(signer.sign(sa.private_key));
  const res = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${header}.${claim}.${signature}`,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`OAuth token error ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function parseCsv(text: string): Record<string, string>[] {
  const lines = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    const obj: Record<string, string> = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = (cols[c] ?? "").trim();
    }
    rows.push(obj);
  }
  return rows;
}

async function fetchGcsCsv(bucket: string, name: string, token: string): Promise<Record<string, string>[]> {
  const url = `https://storage.googleapis.com/storage/v1/b/${bucket}/o/${encodeURIComponent(name)}?alt=media`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const buf = Buffer.from(await res.arrayBuffer());
  const text =
    buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe
      ? buf.subarray(2).toString("utf16le")
      : buf.toString("utf8");
  return parseCsv(text);
}

async function fetchLivePlayData(): Promise<{
  source: "live-gcs+github" | "snapshot+github";
  latestDate: string;
  rating: number;
  ratingCount: number;
  totalCrashes: number;
  totalAnrs: number;
  daily: DailyPlayStat[];
  devices: DeviceStat[];
}> {
  const sa = loadServiceAccount();
  if (!sa) {
    return {
      source: "snapshot+github",
      latestDate: playStatsSnapshot.latestDate,
      rating: playStatsSnapshot.rating,
      ratingCount: playStatsSnapshot.ratingCount,
      totalCrashes: playStatsSnapshot.totalCrashes,
      totalAnrs: playStatsSnapshot.totalAnrs,
      daily: playStatsSnapshot.daily.map((d) => ({
        ...d,
        versions: { ...d.versions },
        androidApi: { ...d.androidApi },
      })),
      devices: playStatsSnapshot.devices.map((d) => ({ ...d })),
    };
  }

  try {
    const token = await getGoogleAccessToken(sa);
    const bucket = "pubsite_prod_6403002304390498932";
    const listRes = await fetch(
      `https://storage.googleapis.com/storage/v1/b/${bucket}/o?maxResults=200`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" },
    );
    if (!listRes.ok) throw new Error(`GCS list ${listRes.status}`);
    const listJson = (await listRes.json()) as { items?: { name: string }[] };
    const names = (listJson.items ?? []).map((i) => i.name).sort();

    const overviewFiles = names.filter((n) => n.startsWith("stats/installs/") && n.endsWith("_overview.csv"));
    const versionFiles = names.filter((n) => n.startsWith("stats/installs/") && n.endsWith("_app_version.csv"));
    const osFiles = names.filter((n) => n.startsWith("stats/installs/") && n.endsWith("_os_version.csv"));
    const deviceFiles = names.filter((n) => n.startsWith("stats/installs/") && n.endsWith("_device.csv"));
    const crashFiles = names.filter((n) => n.startsWith("stats/crashes/") && n.endsWith("_overview.csv"));
    const storeFiles = names.filter((n) => n.startsWith("stats/store_performance/") && n.endsWith("_country.csv"));

    const [overviewNested, versionNested, osNested, deviceNested, crashNested, storeNested] =
      await Promise.all([
        Promise.all(overviewFiles.map((f) => fetchGcsCsv(bucket, f, token))),
        Promise.all(versionFiles.map((f) => fetchGcsCsv(bucket, f, token))),
        Promise.all(osFiles.map((f) => fetchGcsCsv(bucket, f, token))),
        Promise.all(deviceFiles.slice(-1).map((f) => fetchGcsCsv(bucket, f, token))),
        Promise.all(crashFiles.map((f) => fetchGcsCsv(bucket, f, token))),
        Promise.all(storeFiles.map((f) => fetchGcsCsv(bucket, f, token))),
      ]);

    const overviewRows = overviewNested.flat();
    const versionRows = versionNested.flat();
    const osRows = osNested.flat();
    const deviceRows = deviceNested.flat();
    const crashRows = crashNested.flat();
    const storeRows = storeNested.flat();

    if (overviewRows.length === 0) throw new Error("Empty overview rows");

    const byDateVer: Record<string, Record<string, number>> = {};
    for (const r of versionRows) {
      const d = r["Date"];
      const vc = r["App Version Code"] ?? "";
      const act = Number.parseInt(r["Active Device Installs"] || "0", 10) || 0;
      if (d && vc && act > 0) {
        (byDateVer[d] ??= {})[VC_MAP[vc] ?? `b${vc}`] = act;
      }
    }

    const byDateOs: Record<string, Record<string, number>> = {};
    for (const r of osRows) {
      const d = r["Date"];
      const api = r["Android OS Version"] ?? "";
      const act = Number.parseInt(r["Active Device Installs"] || "0", 10) || 0;
      if (d && api && api !== "0" && act > 0) {
        (byDateOs[d] ??= {})[api] = act;
      }
    }

    const storeByDate: Record<string, { visitors: number; acquisitions: number }> = {};
    for (const r of storeRows) {
      const d = r["Date"];
      if (!d) continue;
      const cur = (storeByDate[d] ??= { visitors: 0, acquisitions: 0 });
      cur.visitors += Number.parseInt(r["Store listing visitors"] || "0", 10) || 0;
      cur.acquisitions += Number.parseInt(r["Store listing acquisitions"] || "0", 10) || 0;
    }

    const daily: DailyPlayStat[] = overviewRows.map((r) => {
      const d = r["Date"];
      return {
        date: d,
        activeDevices: Number.parseInt(r["Active Device Installs"] || "0", 10) || 0,
        dailyInstalls: Number.parseInt(r["Daily Device Installs"] || "0", 10) || 0,
        dailyUninstalls: Number.parseInt(r["Daily Device Uninstalls"] || "0", 10) || 0,
        dailyUpgrades: Number.parseInt(r["Daily Device Upgrades"] || "0", 10) || 0,
        installEvents: Number.parseInt(r["Install events"] || "0", 10) || 0,
        updateEvents: Number.parseInt(r["Update events"] || "0", 10) || 0,
        uninstallEvents: Number.parseInt(r["Uninstall events"] || "0", 10) || 0,
        storeVisitors: storeByDate[d]?.visitors ?? 0,
        storeAcquisitions: storeByDate[d]?.acquisitions ?? 0,
        versions: byDateVer[d] ?? {},
        androidApi: byDateOs[d] ?? {},
      };
    });

    const latestDate = daily[daily.length - 1].date;
    const devices: DeviceStat[] = [];
    for (const r of deviceRows) {
      if (r["Date"] === latestDate) {
        const cnt = Number.parseInt(r["Active Device Installs"] || "0", 10) || 0;
        if (cnt > 0) {
          const code = r["Device"] || "unknown";
          const mapped = DEVICE_MAP[code] ?? { model: code, brand: "Other" };
          devices.push({ codename: code, model: mapped.model, brand: mapped.brand, activeDevices: cnt });
        }
      }
    }
    devices.sort((a, b) => b.activeDevices - a.activeDevices || a.model.localeCompare(b.model));

    return {
      source: "live-gcs+github",
      latestDate,
      rating: 5.0,
      ratingCount: 1,
      totalCrashes: crashRows.reduce((s, r) => s + (Number.parseInt(r["Daily Crashes"] || "0", 10) || 0), 0),
      totalAnrs: crashRows.reduce((s, r) => s + (Number.parseInt(r["Daily ANRs"] || "0", 10) || 0), 0),
      daily,
      devices,
    };
  } catch {
    return {
      source: "snapshot+github",
      latestDate: playStatsSnapshot.latestDate,
      rating: playStatsSnapshot.rating,
      ratingCount: playStatsSnapshot.ratingCount,
      totalCrashes: playStatsSnapshot.totalCrashes,
      totalAnrs: playStatsSnapshot.totalAnrs,
      daily: playStatsSnapshot.daily.map((d) => ({
        ...d,
        versions: { ...d.versions },
        androidApi: { ...d.androidApi },
      })),
      devices: playStatsSnapshot.devices.map((d) => ({ ...d })),
    };
  }
}

async function fetchGithubStats(): Promise<PublicStatsPayload["github"]> {
  try {
    const res = await fetch("https://api.github.com/repos/Bali0531-RC/NHNK/releases?per_page=100", {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "NHNK-Web-Stats",
      },
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const data = (await res.json()) as {
      tag_name: string;
      name: string;
      published_at: string;
      draft: boolean;
      assets: { name: string; download_count: number }[];
    }[];

    const releases: GithubReleaseStat[] = [];
    let arm64 = 0;
    let universal = 0;
    let armv7 = 0;
    let x86_64 = 0;
    let ios = 0;

    for (const rel of data) {
      if (rel.draft) continue;
      let rArm64 = 0;
      let rArmv7 = 0;
      let rX86 = 0;
      let rUni = 0;
      let rIos = 0;
      let rAab = 0;
      let rTotal = 0;

      for (const a of rel.assets ?? []) {
        const n = a.name.toLowerCase();
        if (n.endsWith(".txt") || n.endsWith(".sha256")) continue;
        const c = a.download_count || 0;
        rTotal += c;
        if (n.includes("arm64")) {
          rArm64 += c;
          arm64 += c;
        } else if (n.includes("armeabi") || n.includes("armv7")) {
          rArmv7 += c;
          armv7 += c;
        } else if (n.includes("x86_64")) {
          rX86 += c;
          x86_64 += c;
        } else if (n.endsWith(".ipa")) {
          rIos += c;
          ios += c;
        } else if (n.endsWith(".aab")) {
          rAab += c;
        } else if (n.endsWith(".apk")) {
          rUni += c;
          universal += c;
        }
      }

      releases.push({
        tag: rel.tag_name,
        name: rel.name || rel.tag_name,
        publishedAt: rel.published_at,
        totalDownloads: rTotal,
        arm64Downloads: rArm64,
        armv7Downloads: rArmv7,
        x86_64Downloads: rX86,
        universalDownloads: rUni,
        iosDownloads: rIos,
        aabDownloads: rAab,
      });
    }

    const totalDownloads = releases.reduce((s, r) => s + r.totalDownloads, 0);
    return {
      totalDownloads,
      releaseCount: releases.length,
      latestTag: releases[0]?.tag ?? "v2.0.9",
      latestPublishedAt: releases[0]?.publishedAt ?? new Date().toISOString(),
      abiTotals: { arm64, universal, armv7, x86_64, ios },
      releases,
    };
  } catch {
    return {
      totalDownloads: 145,
      releaseCount: 27,
      latestTag: "v2.0.9",
      latestPublishedAt: new Date().toISOString(),
      abiTotals: { arm64: 96, universal: 32, armv7: 6, x86_64: 4, ios: 7 },
      releases: [],
    };
  }
}

export async function getPublicStats(): Promise<PublicStatsPayload> {
  if (cachedPayload && Date.now() - cachedAtMs < CACHE_TTL_MS) {
    return cachedPayload;
  }

  const [playRaw, github] = await Promise.all([fetchLivePlayData(), fetchGithubStats()]);
  const daily = playRaw.daily;
  const latestDay = daily[daily.length - 1];
  const activeDevices = latestDay?.activeDevices ?? 0;
  const peakActiveDevices = daily.reduce((m, d) => Math.max(m, d.activeDevices), 0);

  const totalInstallEvents = daily.reduce((s, d) => s + d.installEvents, 0);
  const totalUpdateEvents = daily.reduce((s, d) => s + d.updateEvents, 0);
  const totalUninstallEvents = daily.reduce((s, d) => s + d.uninstallEvents, 0);
  const totalStoreVisitors = daily.reduce((s, d) => s + d.storeVisitors, 0);
  const totalStoreAcquisitions = daily.reduce((s, d) => s + d.storeAcquisitions, 0);

  const verEntries = Object.entries(latestDay?.versions ?? {}).sort((a, b) => b[1] - a[1]);
  const verSum = verEntries.reduce((s, [, c]) => s + c, 0) || 1;
  const currentVersions = verEntries.map(([version, count]) => ({
    version,
    activeDevices: count,
    sharePercent: Math.round((count / verSum) * 1000) / 10,
  }));

  const latestVersionSharePercent = currentVersions[0]?.sharePercent ?? 100;
  const v2Count = verEntries
    .filter(([v]) => v.startsWith("2."))
    .reduce((s, [, c]) => s + c, 0);
  const v2AdoptionPercent = Math.round((v2Count / verSum) * 1000) / 10;

  const osEntries = Object.entries(latestDay?.androidApi ?? {}).sort(
    (a, b) => Number(b[0]) - Number(a[0]),
  );
  const osSum = osEntries.reduce((s, [, c]) => s + c, 0) || 1;
  const currentAndroidVersions = osEntries.map(([api, count]) => ({
    api,
    label: ANDROID_API_LABELS[api] ?? `Android API ${api}`,
    activeDevices: count,
    sharePercent: Math.round((count / osSum) * 1000) / 10,
  }));

  const brandMap: Record<string, number> = {};
  for (const d of playRaw.devices) {
    brandMap[d.brand] = (brandMap[d.brand] ?? 0) + d.activeDevices;
  }
  const brandSum = Object.values(brandMap).reduce((s, c) => s + c, 0) || 1;
  const brands = Object.entries(brandMap)
    .sort((a, b) => b[1] - a[1])
    .map(([brand, count]) => ({
      brand,
      activeDevices: count,
      sharePercent: Math.round((count / brandSum) * 1000) / 10,
    }));

  const payload: PublicStatsPayload = {
    source: playRaw.source,
    updatedAt: new Date().toISOString(),
    latestPlayDate: playRaw.latestDate,
    play: {
      activeDevices,
      peakActiveDevices,
      totalInstallEvents,
      totalUpdateEvents,
      totalUninstallEvents,
      totalStoreVisitors,
      totalStoreAcquisitions,
      rating: playRaw.rating,
      ratingCount: playRaw.ratingCount,
      totalCrashes: playRaw.totalCrashes,
      totalAnrs: playRaw.totalAnrs,
      crashFreePercent: playRaw.totalCrashes === 0 ? 100 : 99.5,
      latestVersionSharePercent,
      v2AdoptionPercent,
      currentVersions,
      currentAndroidVersions,
      devices: playRaw.devices,
      brands,
      daily,
    },
    github,
  };

  cachedPayload = payload;
  cachedAtMs = Date.now();
  return payload;
}
