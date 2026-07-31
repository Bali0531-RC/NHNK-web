"use client";

import { LegalShell } from "@/components/LegalShell";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/lib/site";

export default function TermsPage() {
  const { lang } = useLanguage();
  const hu = lang === "hu";

  return (
    <LegalShell
      title={hu ? "Felhasználási feltételek" : "Terms of Service"}
      intro={
        hu
          ? "Az NHNK letöltésével és használatával elfogadod az alábbi feltételeket. Kérjük, olvasd el őket — különösen a felelősségkorlátozásról szóló részt."
          : "By downloading and using NHNK you accept the terms below. Please read them — particularly the section on limitation of liability."
      }
    >
      {hu ? (
        <>
          <h2>1. Mi ez a szolgáltatás</h2>
          <p>
            Az NHNK (Nem Hivatalos Neptun Kliens) egy ingyenes, nyílt forráskódú Android
            alkalmazás, amely a Neptun tanulmányi rendszer adatainak megjelenítésére szolgál. Az
            alkalmazás a saját Neptun-hozzáféréseddel, a te nevedben kommunikál az intézményed
            kiszolgálójával.
          </p>

          <h2>2. Nem hivatalos státusz és védjegyek</h2>
          <p>
            Az NHNK <strong>független, nem hivatalos</strong> alkalmazás. Nem áll kapcsolatban az
            SDA Informatika Zrt.-vel, a Neptun rendszer fejlesztőjével és üzemeltetőjével, sem
            bármely felsőoktatási intézménnyel, és azok az alkalmazást nem támogatják, nem
            ellenőrizték és nem hagyták jóvá.
          </p>
          <p>
            A „Neptun” név és védjegy a jogosultja tulajdona. Az alkalmazásban és ezen az oldalon
            kizárólag leíró jelleggel szerepel, annak jelzésére, hogy az NHNK mely rendszerrel
            működik együtt. Ez nem jelent együttműködést vagy jóváhagyást.
          </p>

          <h2>3. A használat feltételei</h2>
          <ul>
            <li>Saját, érvényes Neptun-hozzáféréssel kell rendelkezned.</li>
            <li>
              Kizárólag olyan adatokhoz férhetsz hozzá az alkalmazáson keresztül, amelyekhez amúgy is
              jogosult vagy.
            </li>
            <li>
              Az intézményed informatikai és tanulmányi szabályzatának betartása a te felelősséged.
            </li>
            <li>
              Tilos az alkalmazást a Neptun-kiszolgálók túlterhelésére, automatizált tömeges
              adatlekérésre vagy bármilyen jogosulatlan hozzáférésre használni.
            </li>
          </ul>

          <h2>4. Az adatok pontossága</h2>
          <p>
            Az alkalmazás az intézményed kiszolgálójától kapott adatokat jeleníti meg. Ezek hibásak,
            hiányosak vagy elavultak lehetnek, például a kiszolgáló hibája vagy hálózati probléma
            miatt.
          </p>
          <p>
            <strong>
              Hivatalos, kötelező érvényű adatnak minden esetben a webes Neptun felületén megjelenő
              információ számít.
            </strong>{" "}
            Határidők, jegyek, vizsgaidőpontok és befizetések tekintetében ne kizárólag erre az
            alkalmazásra támaszkodj.
          </p>

          <h2>5. Garancia kizárása</h2>
          <p>
            Az alkalmazás „AHOGY VAN” állapotban érhető el, mindenféle kifejezett vagy hallgatólagos
            garancia nélkül, ideértve a forgalomképességre, az adott célra való alkalmasságra és a
            jogtisztaságra vonatkozó garanciákat is. Nem garantáljuk, hogy az alkalmazás hibamentes
            vagy folyamatosan elérhető.
          </p>

          <h2>6. Felelősség korlátozása</h2>
          <p>
            A jogszabályok által megengedett legteljesebb mértékben a szerzők és a jogtulajdonosok
            nem felelnek semmilyen közvetlen, közvetett, véletlen, különleges vagy következményes
            kárért, amely az alkalmazás használatából vagy használhatatlanságából ered. Ide értve,
            de nem kizárólagosan: elmulasztott határidők, elmaradt vizsgajelentkezés, téves
            átlagszámítás vagy adatvesztés.
          </p>

          <h2>7. Licenc</h2>
          <p>
            Az alkalmazás MIT licenc alatt érhető el. A forráskód nyilvános, megtekinthető és
            módosítható a licenc feltételei szerint. A teljes licencszöveg a{" "}
            <a href={site.license} target="_blank" rel="noopener noreferrer">
              GitHub tárolóban
            </a>{" "}
            található.
          </p>
          <p>
            Az NHNK a <a href={site.upstream.neptun2} target="_blank" rel="noopener noreferrer">Neptun 2</a>{" "}
            (domedav) projekt forkja, a{" "}
            <a href={site.upstream.neptunMobile} target="_blank" rel="noopener noreferrer">Neptun Mobile</a>{" "}
            (zoligamer) forkon keresztül. A korábbi szerzői jogi megjelölések a licenc előírása
            szerint megmaradtak.
          </p>

          <h2>8. Módosítás és megszüntetés</h2>
          <p>
            A feltételek bármikor módosulhatnak; a hatályos változat ezen az oldalon érhető el. Az
            alkalmazás fejlesztése és terjesztése bármikor, előzetes értesítés nélkül
            felfüggeszthető.
          </p>

          <h2>9. Alkalmazandó jog</h2>
          <p>
            A jelen feltételekre Magyarország joga irányadó, a kollíziós szabályok alkalmazása
            nélkül.
          </p>

          <h2>10. Kapcsolat</h2>
          <p>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </>
      ) : (
        <>
          <h2>1. What this service is</h2>
          <p>
            NHNK (Nem Hivatalos Neptun Kliens — Unofficial Neptun Client) is a free, open-source
            Android application for viewing data from the Neptun student information system. It
            communicates with your institution&rsquo;s server on your behalf, using your own Neptun
            credentials.
          </p>

          <h2>2. Unofficial status and trademarks</h2>
          <p>
            NHNK is an <strong>independent, unofficial</strong> application. It is not affiliated
            with SDA Informatika Zrt., the developer and operator of the Neptun system, or with any
            higher education institution, and none of them endorse, review or approve it.
          </p>
          <p>
            The &ldquo;Neptun&rdquo; name and trademark are the property of their respective owner.
            They appear in the app and on this site purely descriptively, to indicate which system
            NHNK interoperates with. This implies no partnership or endorsement.
          </p>

          <h2>3. Conditions of use</h2>
          <ul>
            <li>You must hold your own valid Neptun credentials.</li>
            <li>
              You may only access data through the app that you are already entitled to access.
            </li>
            <li>
              Complying with your institution&rsquo;s IT and academic regulations is your
              responsibility.
            </li>
            <li>
              You must not use the app to overload Neptun servers, perform automated bulk data
              extraction, or attempt any unauthorised access.
            </li>
          </ul>

          <h2>4. Accuracy of data</h2>
          <p>
            The app displays data returned by your institution&rsquo;s server. That data may be
            incorrect, incomplete or out of date, for instance because of a server fault or a
            network problem.
          </p>
          <p>
            <strong>
              The information shown in the official Neptun web interface is always the authoritative
              source.
            </strong>{" "}
            Do not rely solely on this app for deadlines, grades, exam slots or payments.
          </p>

          <h2>5. Disclaimer of warranty</h2>
          <p>
            The application is provided &ldquo;AS IS&rdquo;, without warranty of any kind, express or
            implied, including but not limited to the warranties of merchantability, fitness for a
            particular purpose and non-infringement. We do not warrant that the app is error-free or
            continuously available.
          </p>

          <h2>6. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, the authors and copyright holders shall not be
            liable for any direct, indirect, incidental, special or consequential damages arising
            from the use of, or inability to use, the application. This includes but is not limited
            to missed deadlines, failed exam registration, incorrect average calculation or data
            loss.
          </p>

          <h2>7. Licence</h2>
          <p>
            The application is released under the MIT licence. The source code is public and may be
            inspected and modified under the terms of that licence. The full licence text is
            available in the{" "}
            <a href={site.license} target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>
            .
          </p>
          <p>
            NHNK is a fork of{" "}
            <a href={site.upstream.neptun2} target="_blank" rel="noopener noreferrer">Neptun 2</a>{" "}
            (domedav), by way of{" "}
            <a href={site.upstream.neptunMobile} target="_blank" rel="noopener noreferrer">Neptun Mobile</a>{" "}
            (zoligamer). All prior copyright notices are retained as the licence requires.
          </p>

          <h2>8. Changes and discontinuation</h2>
          <p>
            These terms may change at any time; the version in force is the one published on this
            page. Development and distribution of the app may be suspended at any time without prior
            notice.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These terms are governed by the law of Hungary, without regard to its conflict of law
            provisions.
          </p>

          <h2>10. Contact</h2>
          <p>
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </>
      )}
    </LegalShell>
  );
}
