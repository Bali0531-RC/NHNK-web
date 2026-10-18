export type Lang = "hu" | "en";

export const routes = {
  home: "/",
  stats: "/statisztika",
  privacy: "/adatvedelem",
  terms: "/felhasznalasi-feltetelek",
  donate: "/tamogatas",
  beta: "/zart-teszt",
} as const;

type Dict = {
  nav: { features: string; download: string; stats: string; donate: string; privacy: string; terms: string; beta: string };
  hero: {
    title: string;
    lede: string;
    specs: { k: string; v: string }[];
    ctaDownload: string;
    ctaPlay: string;
    ctaPlaySoon: string;
    ctaSource: string;
    unofficial: string;
  };
  why: { title: string; body: string[] };
  tryIt: { title: string; body: string; points: string[] };
  disclaimer: { title: string; points: string[] };
  features: { title: string; subtitle: string; items: { title: string; body: string }[] };
  download: {
    title: string;
    subtitle: string;
    githubTitle: string;
    githubBody: string;
    playTitle: string;
    playBody: string;
    playBodyLive: string;
    abiHint: string;
    obtainiumHint: string;
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
    sourceCode: string;
    reportBug: string;
    license: string;
    contact: string;
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
  notFound: { code: string; title: string; body: string; cta: string };
};

export const dict: Record<Lang, Dict> = {
  hu: {
    nav: {
      features: "Funkciók",
      download: "Letöltés",
      stats: "Statisztika",
      donate: "Támogatás",
      privacy: "Adatvédelem",
      terms: "Feltételek",
      beta: "Zárt teszt",
    },
    hero: {
      title: "Nem hivatalos Neptun-kliens Androidra",
      lede:
        "Órarend, jegyek, üzenetek, befizetések. Az alkalmazás közvetlenül az intézményed Neptun-kiszolgálójával beszél, köztes szerver nélkül, és amit letölt, az a telefonon marad.",
      specs: [
        { k: "Platform", v: "Android" },
        { k: "Licenc", v: "MIT" },
        { k: "Adatgyűjtés", v: "Nincs" },
        { k: "Ár", v: "Ingyenes" },
      ],
      ctaDownload: "Letöltés APK-ként",
      ctaPlay: "Elérhető a Google Play-en",
      ctaPlaySoon: "Zárt tesztelés alatt",
      ctaSource: "Forráskód a GitHubon",
      unofficial: "Független alkalmazás, nem a Neptun üzemeltetőjének terméke.",
    },
    why: {
      title: "Miért van erre szükség",
      body: [
        "A Neptun webes felülete asztali böngészőre készült. Telefonon is megnyílik, de minden kattintás egy teljes oldalújratöltés, és mire az ember eljut az órarendjéig, már elment a kedve az egésztől.",
        "Az NHNK ugyanazokat a végpontokat hívja, amiket a böngésző, csak natív felülettel és helyi gyorsítótárral. Nem varázslat: ha a Neptun áll, az app is áll. Viszont amíg megy, addig gyorsabb.",
        "A projekt egyetem mellett, szabadidőben készül. A hibajelentésnek és a pull requestnek egyaránt örülök.",
      ],
    },
    tryIt: {
      title: "Kipróbálás telepítés nélkül",
      body:
        "A fenti telefonban maga az alkalmazás fut, a böngésződben. Ugyanaz a kód, mint a telefonos verzióé, csak demó módba kapcsolva, kitalált adatokkal.",
      points: [
        "Nem kell belépni, és nem is lehet. A demó egyetlen kérést sem küld a Neptun felé.",
        "A telefonos build gyorsabb, és többet tud. Ez inkább csak ízelítő.",
      ],
    },
    disclaimer: {
      title: "Mielőtt letöltöd",
      points: [
        "Az NHNK **független, nem hivatalos** alkalmazás. Nem áll kapcsolatban a Campus Codeworks Zrt.-vel (korábban SDA Informatika Zrt.), a Neptun rendszer fejlesztőjével, sem bármely felsőoktatási intézménnyel, és azok nem támogatják vagy hagyták jóvá.",
        "A „Neptun\" név és védjegy a **jogosultja tulajdona**. Ezen az oldalon kizárólag leíró jelleggel szerepel, annak jelzésére, hogy az alkalmazás mely rendszerrel működik együtt.",
        "A belépési adataid **közvetlenül** az intézményed Neptun-kiszolgálójára mennek, titkosított kapcsolaton. Az NHNK nem üzemeltet saját szervert, és nem gyűjt felhasználói adatokat.",
        "Hivatalos, kötelező érvényű adatnak minden esetben a **webes Neptun felületén** megjelenő információ számít.",
      ],
    },
    features: {
      title: "Mit tud",
      subtitle: "A napi Neptun-nyűgökre kihegyezve.",
      items: [
        {
          title: "Órarend",
          body:
            "Ha a Neptun API üres hetet ad vissza, az app a naptár-exportból pótolja az órákat. Ez elég gyakran előfordul ahhoz, hogy megérje beépíteni.",
        },
        {
          title: "Jegyek és átlagok",
          body:
            "Kreditindex és súlyozott átlag. Szellemjeggyel előre beírhatsz egy még meg nem szerzett osztályzatot, és látod, mit csinál az átlagoddal.",
        },
        {
          title: "Értesítések",
          body:
            "Órák, vizsgák és befizetési határidők előtt. Az ütemezés a készüléken történik, nem push-szerverről.",
        },
        {
          title: "Kétlépcsős azonosítás",
          body:
            "Támogatott. Ha megbízol az eszközödben, elmentett kulccsal magától újra bejelentkezik.",
        },
        {
          title: "Megjelenés",
          body: "Több beépített téma, állítható betűméret, letölthető nyelvi csomagok.",
        },
        {
          title: "Követés",
          body:
            "Nincs benne analitika és nincs benne hirdetés. Crash-reportot sem küld sehova. A forráskód nyilvános, bárki ellenőrizheti.",
        },
      ],
    },
    download: {
      title: "Letöltés",
      subtitle: "Két út vezet ide, válaszd a hozzád közelebbit.",
      githubTitle: "GitHub Releases",
      githubBody:
        "A teljes verzió, beépített frissítéskezelővel. Az app maga szól, ha új kiadás jelent meg, így nem kell figyelned a repót.",
      playTitle: "Google Play",
      playBody:
        "Jelenleg zárt tesztelés alatt. A Play akkor engedi a nyilvános megjelenést, ha {required} tesztelő {days} napon át folyamatosan használja az appot. A számláló csak a {required}. tesztelőtől indul.",
      playBodyLive:
        "Az NHNK már ingyenesen letölthető a Google Play Áruházból, tesztelői jelentkezés nélkül. A frissítéseket a Play Áruház kezeli.",
      abiHint: "A legtöbb mai telefonhoz az arm64-v8a csomag kell.",
      obtainiumHint: "Automatikus frissítéshez add hozzá a repót az Obtainiumhoz.",
      playDayProgress: "{day}. / {days}. nap",
      playCountdown: "A {days} napos szakasz vége: {date}",
      playReview: "Felülvizsgálat alatt",
      playReviewNote:
        "A zárt teszt lezárult. A Google most ellenőrzi az appot. Ez néhány órától akár egy hétig is eltarthat.",
      playCta: "Jelentkezem tesztelőnek",
    },
    privacyTeaser: {
      title: "Az adataid a tieid maradnak",
      body:
        "Nincs NHNK-szerver, amin átmennének. A belépési adatok az intézményed kiszolgálójára mennek, minden más a készüléken marad. Ha törlöd az alkalmazást, az adat is megy vele.",
      cta: "Adatvédelmi tájékoztató",
    },
    footer: {
      tagline: "Nem hivatalos Neptun-kliens Androidra.",
      project: "Projekt",
      legal: "Jogi",
      sourceCode: "Forráskód",
      reportBug: "Hibabejelentés",
      license: "Licenc (MIT)",
      contact: "Kapcsolat",
      builtBy: "Készítette",
      trademark:
        "Független, nem hivatalos alkalmazás. Nem áll kapcsolatban a Campus Codeworks Zrt.-vel (korábban SDA Informatika Zrt.) vagy bármely felsőoktatási intézménnyel. A „Neptun” név és védjegy a jogosultja tulajdona.",
    },
    donate: {
      title: "Támogatás",
      intro:
        "Az NHNK ingyenes és nyílt forráskódú, és az is marad. Ha hasznosnak találod és van rá kereted, egy támogatással hozzájárulhatsz a fejlesztéshez.",
      noObligation:
        "A támogatás teljesen önkéntes. Az alkalmazás minden funkciója fizetés nélkül is elérhető, nincs prémium verzió és nincs fizetőfal.",
      methodsTitle: "Támogatási lehetőségek",
      openLink: "Megnyitás",
      freeTitle: "Ingyenes módok a segítségre",
      freeBody: "Ha pénzzel nem tudsz vagy nem szeretnél támogatni, ezek is sokat érnek:",
      freeItems: [
        "Jelentsd a hibákat, amikbe belefutsz. A részletes hibajelentés aranyat ér.",
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
        "Google-fiókhoz tartozó e-mail-címet adj meg, jellemzően Gmailt. A Play Áruház csak ilyen címeket tud tesztelőként kezelni.",
      emailLabel: "E-mail-cím",
      emailPlaceholder: "pelda@gmail.com",
      submit: "Jelentkezem",
      submitting: "Küldés...",
      successAdded:
        "Felvettünk a listára. A tesztelői meghívó kiküldése után a Play Áruházban éred el az appot.",
      successAlready: "Ez a cím már szerepel a listán, nincs teendőd.",
      errorInvalid: "Ez nem tűnik érvényes e-mail-címnek.",
      errorRate: "Túl sok próbálkozás. Próbáld újra később.",
      errorGeneric: "Nem sikerült elküldeni. Próbáld újra később.",
      privacyNote:
        "Csak az e-mail-címedet és a jelentkezés időpontját tároljuk, kizárólag a tesztelői meghíváshoz. Törlést a lenti e-mail-címen kérhetsz.",
      stepsTitle: "Mi történik ezután",
      steps: [
        "A címed felkerül a tesztelői listára.",
        "A következő meghívókörnél felveszlek a Play Console-ban.",
        "Ezután ugyanazzal a Google-fiókkal megnyitva látni fogod az appot a Play Áruházban.",
      ],
    },
    notFound: {
      code: "404",
      title: "Ez az oldal nincs meg",
      body:
        "Valószínűleg elírás történt a címben, vagy egy régi hivatkozást követtél. A főoldalról minden elérhető.",
      cta: "Vissza a főoldalra",
    },
  },
  en: {
    nav: {
      features: "Features",
      download: "Download",
      stats: "Statistics",
      donate: "Donate",
      privacy: "Privacy",
      terms: "Terms",
      beta: "Closed test",
    },
    hero: {
      title: "An unofficial Neptun client for Android",
      lede:
        "Timetable, grades, messages, payments. The app talks straight to your institution's Neptun server with nothing in between, and whatever it fetches stays on the phone.",
      specs: [
        { k: "Platform", v: "Android" },
        { k: "Licence", v: "MIT" },
        { k: "Tracking", v: "None" },
        { k: "Price", v: "Free" },
      ],
      ctaDownload: "Download the APK",
      ctaPlay: "Get it on Google Play",
      ctaPlaySoon: "In closed testing",
      ctaSource: "Source on GitHub",
      unofficial: "An independent app, not a product of the Neptun operator.",
    },
    why: {
      title: "Why this exists",
      body: [
        "The Neptun web interface was built for a desktop browser. It opens on a phone, but every click is a full page reload, and by the time you have reached your timetable you have rather lost interest.",
        "NHNK calls the same endpoints the browser does, just with a native interface and a local cache. It is not magic: when Neptun is down, the app is down too. While it is up, though, this is quicker.",
        "The project is built in spare time alongside university. Bug reports and pull requests are both very welcome.",
      ],
    },
    tryIt: {
      title: "Try it without installing anything",
      body:
        "The phone above is running the actual app, in your browser. Same code as the Android build, switched into demo mode with made-up data.",
      points: [
        "There is no sign-in, and none is possible. The demo sends not a single request to Neptun.",
        "The Android build is faster and does more. This is a taster.",
      ],
    },
    disclaimer: {
      title: "Before you download",
      points: [
        "NHNK is an **independent, unofficial** application. It is not affiliated with, endorsed by or approved by Campus Codeworks Zrt. (formerly SDA Informatika Zrt.), the developer of the Neptun system, or by any higher education institution.",
        "The \"Neptun\" name and trademark are the **property of their respective owner**. They appear on this site purely descriptively, to indicate which system the app interoperates with.",
        "Your login details are sent **directly** to your institution's Neptun server over an encrypted connection. NHNK runs no server of its own and collects no user data.",
        "The information shown in the **official Neptun web interface** is always the authoritative source.",
      ],
    },
    features: {
      title: "What it does",
      subtitle: "Aimed at the parts of Neptun you touch every day.",
      items: [
        {
          title: "Timetable",
          body:
            "When the Neptun API hands back an empty week, the app fills it in from the calendar export. That happens often enough to be worth building in.",
        },
        {
          title: "Grades and averages",
          body:
            "Credit index and weighted average. Ghost grades let you pencil in a mark you have not earned yet and see what it does to the average.",
        },
        {
          title: "Notifications",
          body:
            "Ahead of classes, exams and payment deadlines. Scheduling happens on the device, not from a push server.",
        },
        {
          title: "Two-factor login",
          body:
            "Supported. If you trust your device, a stored key lets it re-authenticate on its own.",
        },
        {
          title: "Appearance",
          body: "Several built-in themes, adjustable font size, downloadable language packs.",
        },
        {
          title: "Tracking",
          body:
            "There is no analytics and there are no ads. It does not send crash reports anywhere either. The source is public, so anyone can check.",
        },
      ],
    },
    download: {
      title: "Download",
      subtitle: "Two routes in. Take whichever is closer to hand.",
      githubTitle: "GitHub Releases",
      githubBody:
        "The full build, with the in-app updater. The app tells you when a new release lands, so you need not watch the repository.",
      playTitle: "Google Play",
      playBody:
        "Currently in closed testing. Play only opens up public release once {required} testers have used the app for {days} consecutive days. The countdown starts at the {required}th tester.",
      playBodyLive:
        "NHNK is now available for free on Google Play, with no tester sign-up required. Updates are handled by Google Play.",
      abiHint: "Most current phones need the arm64-v8a package.",
      obtainiumHint: "For automatic updates, add the repository to Obtainium.",
      playDayProgress: "day {day} of {days}",
      playCountdown: "The {days}-day run ends {date}",
      playReview: "Under review",
      playReviewNote:
        "The closed test is complete. Google is reviewing the app. That can take anywhere from a few hours to a week.",
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
      sourceCode: "Source code",
      reportBug: "Report a bug",
      license: "Licence (MIT)",
      contact: "Contact",
      builtBy: "Built by",
      trademark:
        "An independent, unofficial application. Not affiliated with Campus Codeworks Zrt. (formerly SDA Informatika Zrt.) or any higher education institution. The “Neptun” name and trademark are the property of their respective owner.",
    },
    donate: {
      title: "Support the project",
      intro:
        "NHNK is free and open source, and it will stay that way. If you find it useful and can spare something, a contribution helps keep development going.",
      noObligation:
        "Donating is entirely optional. Every feature is available without paying, there is no premium tier and no paywall.",
      methodsTitle: "Ways to contribute",
      openLink: "Open",
      freeTitle: "Free ways to help",
      freeBody: "If you can't or would rather not give money, these are worth just as much:",
      freeItems: [
        "Report the bugs you run into. A detailed report is worth a lot.",
        "Star the project on GitHub so other people can find it.",
        "Recommend it to people on your course.",
        "Send a translation or a fix if you fancy it.",
      ],
      taxNote:
        "A contribution counts as a gift to a private individual. It is not a charitable donation, and nothing is provided in return, no product, service or benefit. We cannot issue an invoice for it.",
    },
    legal: { lastUpdated: "Last updated", backHome: "Back to the home page" },
    beta: {
      title: "Join the closed test",
      intro:
        "NHNK is currently in closed testing on Google Play. Leave your email address and you will be added to the tester list.",
      googleNote:
        "Use an email address tied to a Google account, usually a Gmail one. Google Play can only accept those as testers.",
      emailLabel: "Email address",
      emailPlaceholder: "you@gmail.com",
      submit: "Sign me up",
      submitting: "Sending...",
      successAdded:
        "You are on the list. Once invitations go out you will find the app on Google Play.",
      successAlready: "That address is already on the list, nothing else to do.",
      errorInvalid: "That does not look like a valid email address.",
      errorRate: "Too many attempts. Please try again later.",
      errorGeneric: "That did not send. Please try again later.",
      privacyNote:
        "Only your email address and the time you signed up are stored, solely to send the tester invitation. Write to the address below to have it removed.",
      stepsTitle: "What happens next",
      steps: [
        "Your address goes on the tester list.",
        "You are added in the Play Console at the next round of invitations.",
        "Opening Google Play with that same Google account will then show the app.",
      ],
    },
    notFound: {
      code: "404",
      title: "There is nothing at this address",
      body:
        "Most likely a typo in the URL, or an old link that has moved. Everything is reachable from the home page.",
      cta: "Back to the home page",
    },
  },
};
