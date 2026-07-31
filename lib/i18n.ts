export type Lang = "hu" | "en";

export const routes = {
  home: "/",
  privacy: "/adatvedelem",
  terms: "/felhasznalasi-feltetelek",
  donate: "/tamogatas",
} as const;

type Dict = {
  nav: { features: string; download: string; donate: string; privacy: string; terms: string };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaDownload: string;
    ctaPlay: string;
    ctaPlaySoon: string;
    ctaSource: string;
    unofficial: string;
  };
  disclaimer: { title: string; points: string[] };
  features: { title: string; subtitle: string; items: { title: string; body: string }[] };
  download: {
    title: string;
    subtitle: string;
    githubTitle: string;
    githubBody: string;
    playTitle: string;
    playBody: string;
    abiHint: string;
    obtainiumHint: string;
  };
  privacyTeaser: { title: string; body: string; cta: string };
  footer: {
    tagline: string;
    project: string;
    legal: string;
    community: string;
    sourceCode: string;
    reportBug: string;
    license: string;
    contact: string;
    rights: string;
    builtBy: string;
    trademark: string;
  };
  donate: {
    title: string;
    intro: string;
    noObligation: string;
    methodsTitle: string;
    openLink: string;
    freeTitle: string;
    freeBody: string;
    freeItems: string[];
    taxNote: string;
  };
  legal: { lastUpdated: string; backHome: string };
};

export const dict: Record<Lang, Dict> = {
  hu: {
    nav: {
      features: "Funkciók",
      download: "Letöltés",
      donate: "Támogatás",
      privacy: "Adatvédelem",
      terms: "Feltételek",
    },
    hero: {
      badge: "Nem hivatalos • nyílt forráskódú • ingyenes",
      title: "A Neptun, ahogy a telefonodon működnie kellene",
      subtitle:
        "Órarend, jegyek, üzenetek és befizetések egy gyors, letisztult alkalmazásban. Reklám nélkül, követés nélkül, saját szerver nélkül.",
      ctaDownload: "Letöltés APK-ként",
      ctaPlay: "Elérhető a Google Play-en",
      ctaPlaySoon: "Hamarosan a Google Play-en",
      ctaSource: "Forráskód",
      unofficial: "Független alkalmazás — nem a Neptun üzemeltetőjének terméke",
    },
    disclaimer: {
      title: "Mielőtt letöltöd — fontos tudnod",
      points: [
        "Az NHNK **független, nem hivatalos** alkalmazás. Nem áll kapcsolatban az SDA Informatika Zrt.-vel, a Neptun rendszer fejlesztőjével, sem bármely felsőoktatási intézménnyel, és azok nem támogatják vagy hagyták jóvá.",
        "A „Neptun\" név és védjegy a **jogosultja tulajdona**. Ezen az oldalon kizárólag leíró jelleggel szerepel, annak jelzésére, hogy az alkalmazás mely rendszerrel működik együtt.",
        "A belépési adataid **közvetlenül** az intézményed Neptun-kiszolgálójára mennek, titkosított kapcsolaton. Az NHNK nem üzemeltet saját szervert, és nem gyűjt felhasználói adatokat.",
        "Hivatalos, kötelező érvényű adatnak minden esetben a **webes Neptun felületén** megjelenő információ számít.",
      ],
    },
    features: {
      title: "Amit tud",
      subtitle: "A napi Neptun-nyűgökre kihegyezve.",
      items: [
        {
          title: "Órarend, hiánytalanul",
          body: "Ha a Neptun API üresen hagyja a hetet, az alkalmazás a naptár-exportból pótolja az órákat.",
        },
        {
          title: "Jegyek és átlagok",
          body: "Kreditek, súlyozott átlagok, és szellemjegyek, amivel előre kiszámolhatod, hogy jössz ki.",
        },
        {
          title: "Értesítések",
          body: "Órákról, vizsgákról és befizetési határidőkről, a készüléken ütemezve.",
        },
        {
          title: "Kétlépcsős azonosítás",
          body: "Támogatott, és ha kéred, elmentett kulccsal automatikusan újra bejelentkezik.",
        },
        {
          title: "Témák és nyelvek",
          body: "Több beépített téma, letölthető nyelvi csomagok, állítható betűméret.",
        },
        {
          title: "Nincs követés",
          body: "Nincs analitika, nincs hirdetés, nincs profilozás. A kód nyilvános, ellenőrizheted.",
        },
      ],
    },
    download: {
      title: "Letöltés",
      subtitle: "Válaszd azt, amelyik jobban illik hozzád.",
      githubTitle: "GitHub Releases",
      githubBody:
        "A teljes verzió, beépített frissítéskezelővel. Az alkalmazás maga szól, ha új kiadás jelent meg.",
      playTitle: "Google Play",
      playBody:
        "A Play-en terjesztett változat a Play szabályai szerint készül: frissítéseket a Play kezeli.",
      abiHint: "A legtöbb mai telefonhoz az arm64-v8a csomag kell.",
      obtainiumHint: "Automatikus frissítéshez add hozzá a repót az Obtainiumhoz.",
    },
    privacyTeaser: {
      title: "Az adataid a tieid maradnak",
      body:
        "Nincs NHNK-szerver, amin átmennének. A bejelentkezési adatok az intézményed kiszolgálójára mennek, minden más a készüléken marad. Ha törlöd az alkalmazást, az adat is megy vele.",
      cta: "Adatvédelmi tájékoztató",
    },
    footer: {
      tagline: "Nem hivatalos Neptun kliens Androidra.",
      project: "Projekt",
      legal: "Jogi",
      community: "Közösség",
      sourceCode: "Forráskód",
      reportBug: "Hibabejelentés",
      license: "Licenc (MIT)",
      contact: "Kapcsolat",
      rights: "Minden jog fenntartva.",
      builtBy: "Készítette",
      trademark:
        "Független, nem hivatalos alkalmazás. Nem áll kapcsolatban az SDA Informatika Zrt.-vel vagy bármely felsőoktatási intézménnyel. A „Neptun” név és védjegy a jogosultja tulajdona.",
    },
    donate: {
      title: "Támogatás",
      intro:
        "Az NHNK ingyenes és nyílt forráskódú, és az is marad. Ha hasznosnak találod és van rá kereted, egy támogatással hozzájárulhatsz a fejlesztéshez.",
      noObligation:
        "A támogatás teljesen önkéntes. Az alkalmazás minden funkciója fizetés nélkül is elérhető — nincs prémium verzió és nincs fizetőfal.",
      methodsTitle: "Támogatási lehetőségek",
      openLink: "Megnyitás",
      freeTitle: "Ingyenes módok a segítségre",
      freeBody: "Ha pénzzel nem tudsz vagy nem szeretnél támogatni, ezek is sokat érnek:",
      freeItems: [
        "Jelentsd a hibákat, amikbe belefutsz — a részletes hibajelentés aranyat ér.",
        "Csillagozd meg a projektet GitHubon, hogy mások is megtalálják.",
        "Ajánld az évfolyamtársaidnak.",
        "Küldj fordítást vagy javítást, ha van hozzá kedved.",
      ],
      taxNote:
        "A támogatás magánszemélynek adott ajándéknak minősül, nem adomány, és nem jár érte semmilyen ellenszolgáltatás, termék vagy szolgáltatás. Számlát nem áll módunkban kiállítani.",
    },
    legal: { lastUpdated: "Utoljára frissítve", backHome: "Vissza a főoldalra" },
  },
  en: {
    nav: {
      features: "Features",
      download: "Download",
      donate: "Donate",
      privacy: "Privacy",
      terms: "Terms",
    },
    hero: {
      badge: "Unofficial • open source • free",
      title: "Neptun, the way it should work on your phone",
      subtitle:
        "Timetable, grades, messages and payments in one fast, uncluttered app. No ads, no tracking, no server of our own.",
      ctaDownload: "Download the APK",
      ctaPlay: "Get it on Google Play",
      ctaPlaySoon: "Coming soon to Google Play",
      ctaSource: "Source code",
      unofficial: "An independent app — not a product of the Neptun operator",
    },
    disclaimer: {
      title: "Before you download — please read",
      points: [
        "NHNK is an **independent, unofficial** application. It is not affiliated with, endorsed by or approved by SDA Informatika Zrt., the developer of the Neptun system, or by any higher education institution.",
        "The \"Neptun\" name and trademark are the **property of their respective owner**. They appear on this site purely descriptively, to indicate which system the app interoperates with.",
        "Your login details are sent **directly** to your institution's Neptun server over an encrypted connection. NHNK runs no server of its own and collects no user data.",
        "The information shown in the **official Neptun web interface** is always the authoritative source.",
      ],
    },
    features: {
      title: "What it does",
      subtitle: "Built around the parts of Neptun you touch every day.",
      items: [
        {
          title: "A complete timetable",
          body: "When the Neptun API returns an empty week, the app fills it in from the calendar export.",
        },
        {
          title: "Grades and averages",
          body: "Credits, weighted averages, and ghost grades so you can work out where you'll land.",
        },
        {
          title: "Notifications",
          body: "For classes, exams and payment deadlines, scheduled on the device itself.",
        },
        {
          title: "Two-factor login",
          body: "Supported, and it can re-authenticate automatically from a stored key if you want it to.",
        },
        {
          title: "Themes and languages",
          body: "Several built-in themes, downloadable language packs, adjustable font size.",
        },
        {
          title: "No tracking",
          body: "No analytics, no ads, no profiling. The code is public, so you can check for yourself.",
        },
      ],
    },
    download: {
      title: "Download",
      subtitle: "Pick whichever suits you better.",
      githubTitle: "GitHub Releases",
      githubBody:
        "The full build, with the in-app updater. The app tells you when a new release is out.",
      playTitle: "Google Play",
      playBody:
        "The Play build follows Play's rules: updates are handled by Play itself.",
      abiHint: "Most current phones need the arm64-v8a package.",
      obtainiumHint: "For automatic updates, add the repository to Obtainium.",
    },
    privacyTeaser: {
      title: "Your data stays yours",
      body:
        "There is no NHNK server in the middle. Login details go to your institution's server; everything else stays on the device. Uninstall the app and the data goes with it.",
      cta: "Read the privacy policy",
    },
    footer: {
      tagline: "An unofficial Neptun client for Android.",
      project: "Project",
      legal: "Legal",
      community: "Community",
      sourceCode: "Source code",
      reportBug: "Report a bug",
      license: "Licence (MIT)",
      contact: "Contact",
      rights: "All rights reserved.",
      builtBy: "Built by",
      trademark:
        "An independent, unofficial application. Not affiliated with SDA Informatika Zrt. or any higher education institution. The “Neptun” name and trademark are the property of their respective owner.",
    },
    donate: {
      title: "Support the project",
      intro:
        "NHNK is free and open source, and it will stay that way. If you find it useful and can spare something, a contribution helps keep development going.",
      noObligation:
        "Donating is entirely optional. Every feature is available without paying — there is no premium tier and no paywall.",
      methodsTitle: "Ways to contribute",
      openLink: "Open",
      freeTitle: "Free ways to help",
      freeBody: "If you can't or would rather not give money, these are worth just as much:",
      freeItems: [
        "Report the bugs you run into — a detailed report is worth a lot.",
        "Star the project on GitHub so other people can find it.",
        "Recommend it to people on your course.",
        "Send a translation or a fix if you fancy it.",
      ],
      taxNote:
        "A contribution counts as a gift to a private individual. It is not a charitable donation, and nothing — no product, service or benefit — is provided in return. We cannot issue an invoice for it.",
    },
    legal: { lastUpdated: "Last updated", backHome: "Back to the home page" },
  },
};
