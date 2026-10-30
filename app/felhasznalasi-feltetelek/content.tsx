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
          ? "Az NHNK letöltésével és használatával elfogadod az alábbi feltételeket, és kijelented, hogy rendelkezel a megállapodás megkötéséhez szükséges jog- és cselekvőképességgel. Kérjük, olvasd el őket, különösen a felelősségkorlátozásról szóló részt."
          : "By downloading and using NHNK you accept the terms below and confirm that you have the legal capacity to enter into this agreement. Please read them, particularly the section on limitation of liability."
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
          <p>
            Ha az alkalmazást harmadik fél platformjáról (például a Google Play áruházból) töltöd
            le, a platform használatára annak saját felhasználási feltételei is irányadók.
          </p>

          <h2>2. Nem hivatalos státusz és védjegyek</h2>
          <p>
            Az NHNK <strong>független, nem hivatalos</strong> alkalmazás. Nem áll kapcsolatban a
            Campus Codeworks Zrt.-vel (korábban SDA Informatika Zrt.), a Neptun rendszer
            fejlesztőjével és üzemeltetőjével, sem bármely felsőoktatási intézménnyel, és azok az
            alkalmazást nem támogatják, nem ellenőrizték és nem hagyták jóvá.
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
            garancia vagy szavatosság nélkül. Nem garantáljuk, hogy az alkalmazás megfelel az
            egyéni elvárásaidnak, hibamentesen működik, vagy folyamatosan, megszakítás nélkül
            elérhető.
          </p>

          <h2>6. Felelősség korlátozása</h2>
          <p>
            A jogszabályok által megengedett legteljesebb mértékben a szerzők és a jogtulajdonosok
            nem felelnek semmilyen közvetlen, közvetett, véletlen, különleges vagy következményes
            kárért, amely az alkalmazás használatából vagy használhatatlanságából ered. Ide értve,
            de nem kizárólagosan: elmulasztott határidők, elmaradt vizsgajelentkezés, téves
            átlagszámítás vagy adatvesztés.
          </p>
          <p>
            Vállalod, hogy mentesíted a fejlesztőt minden olyan követelés, kár vagy jogi eljárás
            alól, amely az alkalmazás általad történő visszaélésszerű használatából vagy a jelen
            feltételek megszegéséből ered.
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

          <h2>9. Alkalmazandó jog és részleges érvénytelenség</h2>
          <p>
            A jelen feltételekre Magyarország joga irányadó, a kollíziós szabályok alkalmazása
            nélkül.
          </p>
          <p>
            Ha a jelen feltételek bármely rendelkezését az illetékes bíróság érvénytelennek vagy
            végrehajthatatlannak minősíti, az a többi rendelkezés érvényességét nem érinti, azok
            változatlanul teljes hatállyal érvényben maradnak.
          </p>

          <h2>10. Kapcsolat és impresszum</h2>
          <ul>
            <li>
              <strong>Üzemeltető és fejlesztő:</strong> {site.author} ({site.authorHandle},
              magánszemély)
            </li>
            <li>
              <strong>E-mail (jogi megkeresések):</strong>{" "}
              <a href={`mailto:${site.legalEmail}`}>{site.legalEmail}</a>
            </li>
            <li>
              <strong>E-mail (általános kapcsolat és segítség):</strong>{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>,{" "}
              <a href={`mailto:${site.helpEmail}`}>{site.helpEmail}</a>
            </li>
            <li>
              <strong>Tárhelyszolgáltató neve:</strong> ByteFly Kft. (Vipy Dedicated Server)
            </li>
            <li>
              <strong>Tárhelyszolgáltató székhelye:</strong> 9022 Győr, Batthyány tér 6. 1. em. 6.
              ajtó
            </li>
            <li>
              <strong>Tárhelyszolgáltató elérhetősége:</strong>{" "}
              <a href="mailto:info@vipy.hu">info@vipy.hu</a>,{" "}
              <a href="https://vipy.hu" target="_blank" rel="noopener noreferrer">
                https://vipy.hu
              </a>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h2>1. What this service is</h2>
          <p>
            NHNK (Nem Hivatalos Neptun Kliens / Unofficial Neptun Client) is a free, open-source
            Android application for viewing data from the Neptun student information system. It
            communicates with your institution&rsquo;s server on your behalf, using your own Neptun
            credentials.
          </p>
          <p>
            If you downloaded the app from a third-party platform such as Google Play, your use of
            that platform is also subject to its respective terms of service.
          </p>

          <h2>2. Unofficial status and trademarks</h2>
          <p>
            NHNK is an <strong>independent, unofficial</strong> application. It is not affiliated
            with Campus Codeworks Zrt. (formerly SDA Informatika Zrt.), the developer and operator
            of the Neptun system, or with any higher education institution, and none of them
            endorse, review or approve it.
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
            implied. We do not guarantee that the app will meet your specific needs, operate
            without interruption, or be error-free.
          </p>

          <h2>6. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, the authors and copyright holders shall not be
            liable for any direct, indirect, incidental, special or consequential damages arising
            from the use of, or inability to use, the application. This includes but is not limited
            to missed deadlines, failed exam registration, incorrect average calculation or data
            loss.
          </p>
          <p>
            You agree to indemnify and hold harmless the developer from any claims, damages, or
            legal actions arising out of your misuse of the app or violation of these terms.
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

          <h2>9. Governing law and severability</h2>
          <p>
            These terms are governed by the law of Hungary, without regard to its conflict of law
            provisions.
          </p>
          <p>
            If any provision of these terms is found to be invalid or unenforceable by a court of
            competent jurisdiction, the remaining provisions will remain in full force and effect.
          </p>

          <h2>10. Contact and Impressum</h2>
          <ul>
            <li>
              <strong>Operator and developer:</strong> {site.author} ({site.authorHandle}, private
              individual)
            </li>
            <li>
              <strong>Email (legal inquiries):</strong>{" "}
              <a href={`mailto:${site.legalEmail}`}>{site.legalEmail}</a>
            </li>
            <li>
              <strong>Email (general contact and support):</strong>{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>,{" "}
              <a href={`mailto:${site.helpEmail}`}>{site.helpEmail}</a>
            </li>
            <li>
              <strong>Hosting provider name:</strong> ByteFly Kft. (Vipy Dedicated Server)
            </li>
            <li>
              <strong>Hosting provider registered seat:</strong> 9022 Győr, Batthyány tér 6. 1. em.
              6. ajtó, Hungary
            </li>
            <li>
              <strong>Hosting provider contact:</strong>{" "}
              <a href="mailto:info@vipy.hu">info@vipy.hu</a>,{" "}
              <a href="https://vipy.hu" target="_blank" rel="noopener noreferrer">
                https://vipy.hu
              </a>
            </li>
          </ul>
        </>
      )}
    </LegalShell>
  );
}
