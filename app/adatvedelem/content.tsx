"use client";

import { LegalShell } from "@/components/LegalShell";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/lib/site";

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const hu = lang === "hu";

  return (
    <LegalShell
      title={hu ? "Adatvédelmi tájékoztató" : "Privacy Policy"}
      intro={
        hu
          ? "Röviden: az NHNK nem gyűjt rólad adatot. Nincs saját szerverünk, nincs analitika, nincs hirdetés. Az alábbiakban részletesen is leírjuk, mi történik az adataiddal."
          : "In short: NHNK collects no data about you. We run no server of our own, there is no analytics and no advertising. The details are set out below."
      }
    >
      {hu ? (
        <>
          <h2>1. Az adatkezelő</h2>
          <p>
            Az alkalmazást <strong>{site.author} ({site.authorHandle})</strong> magánszemélyként
            fejleszti és adja ki. Kapcsolat:{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
          <p>
            Az NHNK <strong>független, nem hivatalos</strong> alkalmazás. Nem áll kapcsolatban a
            Campus Codeworks Zrt.-vel (korábban SDA Informatika Zrt.), a Neptun rendszer
            fejlesztőjével, sem bármely felsőoktatási intézménnyel.
          </p>

          <h2>2. Milyen adatokat kezel az alkalmazás?</h2>
          <p>
            Az alkalmazás működéséhez a következő adatok kerülnek a készülékedre, kizárólag helyben
            tárolva:
          </p>
          <ul>
            <li>Neptun felhasználónév, jelszó és az intézményed kiszolgálójának címe</li>
            <li>Opcionálisan a kétlépcsős azonosítás titkos kulcsa, ha az automatikus újrabejelentkezést kéred</li>
            <li>A Neptunból lekért adatok: órarend, jegyek, üzenetek, befizetések, időszakok, tárgyak</li>
            <li>Alkalmazásbeállítások: nyelv, téma, betűméret, értesítési beállítások</li>
          </ul>

          <h2>3. Hová kerülnek ezek az adatok?</h2>
          <p>
            <strong>Sehová, ami hozzánk tartozna.</strong> A belépési adataid közvetlenül az általad
            kiválasztott intézmény Neptun-kiszolgálójára mennek, titkosított (HTTPS) kapcsolaton. Az
            NHNK nem üzemeltet köztes szervert, és nem továbbítja az adataidat harmadik félnek.
          </p>
          <p>
            Minden lekért adat a készüléked helyi tárolójában marad. Ha kijelentkezel vagy törlöd az
            alkalmazást, ezek az adatok is törlődnek.
          </p>

          <h2>4. Amit nem csinálunk</h2>
          <ul>
            <li>Nincs analitika, telemetria vagy használatkövetés</li>
            <li>Nincs hirdetés és nincs hirdetési azonosító</li>
            <li>Nincs automatikus hibajelentés-küldés</li>
            <li>Nincs felhasználói fiók az NHNK oldalán</li>
            <li>Nem adunk el és nem osztunk meg semmilyen adatot</li>
          </ul>

          <h2>5. Külső szolgáltatások</h2>
          <h3>5.1 Az intézményed Neptun-kiszolgálója</h3>
          <p>
            Az alkalmazás minden tanulmányi adatot innen kér le. Ezen adatok kezelésére az
            intézményed, illetve a Neptun üzemeltetőjének saját adatvédelmi tájékoztatója vonatkozik.
          </p>
          <h3>5.2 GitHub</h3>
          <p>
            Az alkalmazás a GitHubról tölti le a támogatott intézmények listáját, a letölthető nyelvi
            csomagokat és témákat, valamint innen ellenőrzi, hogy van-e újabb kiadás. Ezek a kérések
            nem tartalmaznak azonosításra alkalmas adatot, de a GitHub — mint minden webkiszolgáló —
            láthatja a kérés IP-címét. Erre a GitHub adatvédelmi tájékoztatója vonatkozik.
          </p>
          <h3>5.3 Google Play</h3>
          <p>
            Ha az alkalmazást a Google Play áruházból telepítetted, a telepítésre és a frissítésekre a
            Google saját adatkezelése vonatkozik. Erre nincs ráhatásunk, és nem kapunk hozzáférést a
            Play által gyűjtött adatokhoz.
          </p>

          <h2>6. Jogosultságok és céljuk</h2>
          <ul>
            <li><strong>Internet</strong> — a Neptun-kiszolgáló elérése</li>
            <li><strong>Értesítések</strong> — órákra, vizsgákra, befizetési határidőkre figyelmeztetés</li>
            <li><strong>Pontos ébresztők</strong> — az értesítések időzítése a megfelelő időpontra</li>
            <li><strong>Rezgés</strong> — visszajelzés a felületen</li>
            <li><strong>Tárhely</strong> — naptár- és adatexport mentése, ha te kéred</li>
            <li>
              <strong>Csomagok telepítése</strong> — kizárólag a GitHubról letöltött változatban, a
              beépített frissítő működéséhez. A Google Play áruházból telepített változat ezt a
              jogosultságot nem tartalmazza.
            </li>
          </ul>

          <h2>7. Adatmegőrzés</h2>
          <p>
            Mivel semmit nem tárolunk a saját oldalunkon, megőrzési idő sincs. A készüléken tárolt
            adatok addig maradnak meg, amíg ki nem jelentkezel vagy nem törlöd az alkalmazást.
          </p>

          <h2>8. Gyermekek</h2>
          <p>
            Az alkalmazás felsőoktatásban tanulóknak készült, és nem 13 év alatti gyermekeknek szól.
            Tudatosan nem gyűjtünk adatot gyermekektől — ahogy senki mástól sem.
          </p>

          <h2>9. A te jogaid (GDPR)</h2>
          <p>
            Mivel az NHNK nem tárol személyes adatot szervereken, a hozzáférési, helyesbítési és
            törlési jogod gyakorlatilag a saját készülékeden érvényesül: az adatok törléséhez elég
            kijelentkezned vagy eltávolítanod az alkalmazást. A Neptunban tárolt adataiddal
            kapcsolatos jogaidat az intézményednél tudod érvényesíteni.
          </p>

          <h2>10. A tájékoztató módosítása</h2>
          <p>
            Ha a tájékoztató változik, a módosított változat ezen az oldalon jelenik meg, frissített
            dátummal. Lényeges változás esetén a kiadási jegyzetekben is jelezzük.
          </p>

          <h2>11. Kapcsolat</h2>
          <p>
            Kérdés vagy adatvédelmi észrevétel esetén:{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </>
      ) : (
        <>
          <h2>1. Who is responsible</h2>
          <p>
            The application is developed and published by <strong>{site.author} ({site.authorHandle})</strong>{" "}
            as a private individual. Contact:{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
          </p>
          <p>
            NHNK is an <strong>independent, unofficial</strong> application. It is not affiliated
            with SDA Informatika Zrt., the developer of the Neptun system, or with any higher
            education institution.
          </p>

          <h2>2. What data the app handles</h2>
          <p>The following is stored on your device, and only there:</p>
          <ul>
            <li>Your Neptun username, password and your institution&rsquo;s server address</li>
            <li>Optionally your two-factor secret, if you ask for automatic re-authentication</li>
            <li>Data fetched from Neptun: timetable, grades, messages, payments, periods, subjects</li>
            <li>App settings: language, theme, font size, notification preferences</li>
          </ul>

          <h2>3. Where that data goes</h2>
          <p>
            <strong>Nowhere that belongs to us.</strong> Your login details are sent directly to the
            Neptun server of the institution you select, over an encrypted (HTTPS) connection. NHNK
            operates no intermediary server and passes your data to no third party.
          </p>
          <p>
            Everything fetched stays in your device&rsquo;s local storage. Logging out or uninstalling
            the app removes it.
          </p>

          <h2>4. What we do not do</h2>
          <ul>
            <li>No analytics, telemetry or usage tracking</li>
            <li>No advertising and no advertising identifier</li>
            <li>No automatic crash reporting</li>
            <li>No user accounts on the NHNK side</li>
            <li>We neither sell nor share any data</li>
          </ul>

          <h2>5. Third-party services</h2>
          <h3>5.1 Your institution&rsquo;s Neptun server</h3>
          <p>
            All academic data is fetched from there. Its handling is governed by the privacy policy
            of your institution and of the Neptun operator.
          </p>
          <h3>5.2 GitHub</h3>
          <p>
            The app downloads the list of supported institutions, the optional language packs and
            themes, and the update check from GitHub. These requests carry no identifying
            information, but GitHub — like any web server — can see the requesting IP address. That
            is covered by GitHub&rsquo;s own privacy policy.
          </p>
          <h3>5.3 Google Play</h3>
          <p>
            If you installed the app from Google Play, installation and updates are subject to
            Google&rsquo;s own data handling. We have no control over that and receive no access to
            the data Play collects.
          </p>

          <h2>6. Permissions and why they exist</h2>
          <ul>
            <li><strong>Internet</strong> — to reach the Neptun server</li>
            <li><strong>Notifications</strong> — reminders for classes, exams and payment deadlines</li>
            <li><strong>Exact alarms</strong> — to fire those reminders at the right moment</li>
            <li><strong>Vibration</strong> — interface feedback</li>
            <li><strong>Storage</strong> — saving a calendar or data export, when you ask for one</li>
            <li>
              <strong>Install packages</strong> — only in the build distributed via GitHub, for the
              in-app updater. The Google Play build does not request this permission.
            </li>
          </ul>

          <h2>7. Retention</h2>
          <p>
            Since we store nothing on our side, there is no retention period. Data on the device
            remains until you log out or uninstall the app.
          </p>

          <h2>8. Children</h2>
          <p>
            The app is intended for students in higher education and is not directed at children
            under 13. We knowingly collect no data from children — nor from anyone else.
          </p>

          <h2>9. Your rights (GDPR)</h2>
          <p>
            Because NHNK holds no personal data on any server, your rights of access, rectification
            and erasure are exercised on your own device: logging out or uninstalling removes the
            data. Rights concerning the data held inside Neptun itself must be exercised with your
            institution.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            If this policy changes, the updated version appears on this page with a new date.
            Significant changes will also be noted in the release notes.
          </p>

          <h2>11. Contact</h2>
          <p>
            For questions or privacy concerns:{" "}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </>
      )}
    </LegalShell>
  );
}
