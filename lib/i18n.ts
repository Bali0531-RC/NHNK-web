export type Lang = "hu" | "en";

export const routes = {
  home: "/",
  privacy: "/adatvedelem",
  terms: "/felhasznalasi-feltetelek",
  donate: "/tamogatas",
  beta: "/zart-teszt",
} as const;

type Dict = {
  nav: { features: string; download: string; donate: string; privacy: string; terms: string; beta: string };
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
    playProgress: string;
    playDayProgress: string;
    playCountdown: string;
    playReview: string;
    playReviewNote: string;
    playCta: string;
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
  beta: {
    title: string;
    intro: string;
    googleNote: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    successAdded: string;
    successAlready: string;
    errorInvalid: string;
    errorRate: string;
    errorGeneric: string;
    privacyNote: string;
    stepsTitle: string;
    steps: string[];
  };
};

export const dict: Record<Lang, Dict> = {
  hu: {
    nav: {
      features: "Funkciók",
      download: "Letöltés",
      donate: "Támogatás",
      privacy: "Adatvédelem",
      terms: "Feltételek",
      beta: "Zárt teszt",
    },
    hero: {
      badge: "Nem hivatalos • nyílt forráskódú • ingyenes",
      title: "A Neptun, ahogy a telefonodon működnie kellene",
      subtitle:
        "Órarend, jegyek, üzenetek és befizetések egy gyors, letisztult alkalmazásban. Reklám nélkül, követés nélkül, saját szerver nélkül.",
      ctaDownload: "Letöltés APK-ként",
      ctaPlay: "Elérhető a Google Play-en",
      ctaPlaySoon: "Zárt tesztelés alatt",
      ctaSource: "Forráskód",
      unofficial: "Független alkalmazás — nem a Neptun üzemeltetőjének terméke",
    },
    disclaimer: {
      title: "Mielőtt letöltöd — fontos tudnod",
      points: [
        "Az NHNK **független, nem hivatalos** alkalmazás. Nem áll kapcsolatban a Campus Codeworks Zrt.-vel (korábban SDA Informatika Zrt.), a Neptun rendszer fejlesztőjével, sem bármely felsőoktatási intézménnyel, és azok nem támogatják vagy hagyták jóvá.",
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
        "Jelenleg zárt tesztelés alatt. A Play akkor engedélyezi a nyilvános megjelenést, ha {required} tesztelő {days} napon keresztül folyamatosan használja az appot — a számláló csak a {required}. tesztelőtől indul.",
      abiHint: "A legtöbb mai telefonhoz az arm64-v8a csomag kell.",
      obtainiumHint: "Automatikus frissítéshez add hozzá a repót az Obtainiumhoz.",
      playProgress: "{current} / {required} tesztelő",
      playDayProgress: "{day}. / {days}. nap",
      playCountdown: "A {days} napos szakasz vége: {date}",
      playReview: "Felülvizsgálat alatt",
      playReviewNote:
        "A zárt teszt lezárult. A Google most ellenőrzi az appot — ez néhány órától akár egy hétig is eltarthat.",
      playCta: "Jelentkezem tesztelőnek",
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
        "Független, nem hivatalos alkalmazás. Nem áll kapcsolatban a Campus Codeworks Zrt.-vel (korábban SDA Informatika Zrt.) vagy bármely felsőoktatási intézménnyel. A „Neptun” név és védjegy a jogosultja tulajdona.",
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
    beta: {
      title: "Jelentkezés a zárt tesztre",
      intro:
        "Az NHNK jelenleg zárt tesztelés alatt áll a Play Áruházban. Add meg az e-mail-címedet, és felveszlek a tesztelők közé.",
      googleNote:
        "Fontos: Google-fiókhoz tartozó e-mail-címet adj meg (jellemzően Gmail). A Play Áruház csak ilyen címeket tud tesztelőként kezelni.",
      emailLabel: "E-mail-cím",
      emailPlaceholder: "pelda@gmail.com",
      submit: "Jelentkezem",
      submitting: "Küldés...",
      successAdded:
        "Köszönjük! Felvettünk a listára. A tesztelői meghívó kiküldése után a Play Áruházban éred el az appot.",
      successAlready: "Ez a cím már szerepel a listán, nincs teendőd.",
      errorInvalid: "Ez nem tűnik érvényes e-mail-címnek.",
      errorRate: "Túl sok próbálkozás. Próbáld újra később.",
      errorGeneric: "Valami hiba történt. Próbáld újra később.",
      privacyNote:
        "Csak az e-mail-címedet és a jelentkezés időpontját tároljuk, kizárólag a tesztelői meghíváshoz. Törlést a lenti e-mail-címen kérhetsz.",
      stepsTitle: "Mi történik ezután?",
      steps: [
        "A címed felkerül a tesztelői listára.",
        "A következő meghívókörnél felveszlek a Play Console-ban.",
        "Ezután ugyanazzal a Google-fiókkal megnyitva látni fogod az appot a Play Áruházban.",
      ],
    },
  },
  en: {
    nav: {
      features: "Features",
      download: "Download",
      donate: "Donate",
      privacy: "Privacy",
      terms: "Terms",
      beta: "Closed test",
    },
    hero: {
      badge: "Unofficial • open source • free",
      title: "Neptun, the way it should work on your phone",
      subtitle:
        "Timetable, grades, messages and payments in one fast, uncluttered app. No ads, no tracking, no server of our own.",
      ctaDownload: "Download the APK",
      ctaPlay: "Get it on Google Play",
      ctaPlaySoon: "In closed testing",
      ctaSource: "Source code",
      unofficial: "An independent app — not a product of the Neptun operator",
    },
    disclaimer: {
      title: "Before you download — please read",
      points: [
        "NHNK is an **independent, unofficial** application. It is not affiliated with, endorsed by or approved by Campus Codeworks Zrt. (formerly SDA Informatika Zrt.), the developer of the Neptun system, or by any higher education institution.",
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
        "Currently in closed testing. Play only opens up public release once {required} testers have used the app for {days} consecutive days — and the countdown only starts at the {required}th tester.",
      abiHint: "Most current phones need the arm64-v8a package.",
      obtainiumHint: "For automatic updates, add the repository to Obtainium.",
      playProgress: "{current} / {required} testers",
      playDayProgress: "day {day} of {days}",
      playCountdown: "The {days}-day run ends {date}",
      playReview: "Under review",
      playReviewNote:
        "The closed test is complete. Google is reviewing the app — this can take anywhere from a few hours to a week.",
      playCta: "Sign up as a tester",
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
        "An independent, unofficial application. Not affiliated with Campus Codeworks Zrt. (formerly SDA Informatika Zrt.) or any higher education institution. The “Neptun” name and trademark are the property of their respective owner.",
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
    beta: {
      title: "Join the closed test",
      intro:
        "NHNK is currently in closed testing on Google Play. Leave your email address and you will be added to the tester list.",
      googleNote:
        "Important: use an email address tied to a Google account (usually Gmail). Google Play can only accept those as testers.",
      emailLabel: "Email address",
      emailPlaceholder: "you@gmail.com",
      submit: "Sign me up",
      submitting: "Sending...",
      successAdded:
        "Thanks! You are on the list. Once invitations go out you will find the app on Google Play.",
      successAlready: "That address is already on the list, nothing else to do.",
      errorInvalid: "That does not look like a valid email address.",
      errorRate: "Too many attempts. Please try again later.",
      errorGeneric: "Something went wrong. Please try again later.",
      privacyNote:
        "Only your email address and the time you signed up are stored, solely to send the tester invitation. Write to the address below to have it removed.",
      stepsTitle: "What happens next?",
      steps: [
        "Your address goes on the tester list.",
        "You are added in the Play Console at the next round of invitations.",
        "Opening Google Play with that same Google account will then show the app.",
      ],
    },
  },
};
