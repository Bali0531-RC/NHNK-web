"use client";

import { LegalShell } from "@/components/LegalShell";
import { useLanguage } from "@/components/LanguageProvider";
import { site } from "@/lib/site";

export default function ImpressumPage() {
  const { lang } = useLanguage();
  const hu = lang === "hu";

  return (
    <LegalShell
      title={hu ? "Impresszum" : "Impressum"}
      intro={
        hu
          ? "Az elektronikus kereskedelmi szolgáltatások, valamint az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény (Ekertv.) alapján közzétett üzemeltetői és tárhelyszolgáltatói adatok."
          : "Operator and hosting provider information published in accordance with Act CVIII of 2001 on Electronic Commerce and Information Society Services (Hungary)."
      }
    >
      {hu ? (
        <>
          <h2>1. A szolgáltató (üzemeltető és fejlesztő)</h2>
          <ul>
            <li>
              <strong>Név:</strong> {site.author} ({site.authorHandle})
            </li>
            <li>
              <strong>Jogállás:</strong> Magánszemély (nyílt forráskódú, nem kereskedelmi projekt)
            </li>
            <li>
              <strong>Általános kapcsolat:</strong>{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </li>
            <li>
              <strong>Felhasználói segítségnyújtás és támogatás:</strong>{" "}
              <a href={`mailto:${site.helpEmail}`}>{site.helpEmail}</a>
            </li>
            <li>
              <strong>Jogi és adatvédelmi megkeresések:</strong>{" "}
              <a href={`mailto:${site.legalEmail}`}>{site.legalEmail}</a>
            </li>
            <li>
              <strong>Üzemeltetés és biztonság:</strong>{" "}
              <a href={`mailto:${site.adminEmail}`}>{site.adminEmail}</a>
            </li>
            <li>
              <strong>Weboldal:</strong>{" "}
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                {site.url}
              </a>
            </li>
            <li>
              <strong>Forráskód és hibabejelentés:</strong>{" "}
              <a href={site.repo} target="_blank" rel="noopener noreferrer">
                {site.repo}
              </a>
            </li>
          </ul>

          <h2>2. Tárhelyszolgáltató</h2>
          <p>
            A weboldal (<strong>nhnk.hu</strong> / <strong>nhnk.bali0531.hu</strong>) egy Vipy
            dedikált szerveren (Vipy Dedicated Server) fut:
          </p>
          <ul>
            <li>
              <strong>Tárhelyszolgáltató neve:</strong> ByteFly Kft. (Vipy Dedicated Server)
            </li>
            <li>
              <strong>Tárhelyszolgáltató székhelye:</strong> 9022 Győr, Batthyány tér 6. 1. em. 6.
              ajtó
            </li>
            <li>
              <strong>Cégjegyzékszám / Adószám:</strong> 08-09-035442 / 32192236-2-08
            </li>
            <li>
              <strong>Tárhelyszolgáltató elérhetősége:</strong>{" "}
              <a href="mailto:info@vipy.hu">info@vipy.hu</a>,{" "}
              <a href="https://vipy.hu" target="_blank" rel="noopener noreferrer">
                https://vipy.hu
              </a>
            </li>
          </ul>

          <h2>3. Jognyilatkozat</h2>
          <p>
            Az NHNK <strong>független, nem hivatalos</strong> nyílt forráskódú projekt. Nem áll
            kapcsolatban a Campus Codeworks Zrt.-vel (korábban SDA Informatika Zrt.), a Neptun
            rendszer fejlesztőjével és üzemeltetőjével, sem bármely felsőoktatási intézménnyel. A
            „Neptun” név és védjegy a jogosultja tulajdona, a weboldalon és az alkalmazásban
            kizárólag leíró jelleggel szerepel.
          </p>
        </>
      ) : (
        <>
          <h2>1. Operator and Developer</h2>
          <ul>
            <li>
              <strong>Name:</strong> {site.author} ({site.authorHandle})
            </li>
            <li>
              <strong>Status:</strong> Private individual (open-source, non-commercial project)
            </li>
            <li>
              <strong>General contact:</strong>{" "}
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </li>
            <li>
              <strong>User support and help:</strong>{" "}
              <a href={`mailto:${site.helpEmail}`}>{site.helpEmail}</a>
            </li>
            <li>
              <strong>Legal and privacy inquiries:</strong>{" "}
              <a href={`mailto:${site.legalEmail}`}>{site.legalEmail}</a>
            </li>
            <li>
              <strong>Administration and security:</strong>{" "}
              <a href={`mailto:${site.adminEmail}`}>{site.adminEmail}</a>
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                {site.url}
              </a>
            </li>
            <li>
              <strong>Source code and issue tracker:</strong>{" "}
              <a href={site.repo} target="_blank" rel="noopener noreferrer">
                {site.repo}
              </a>
            </li>
          </ul>

          <h2>2. Hosting Provider</h2>
          <p>
            This website (<strong>nhnk.hu</strong> / <strong>nhnk.bali0531.hu</strong>) is hosted on
            a Vipy Dedicated Server:
          </p>
          <ul>
            <li>
              <strong>Hosting provider name:</strong> ByteFly Kft. (Vipy Dedicated Server)
            </li>
            <li>
              <strong>Registered seat:</strong> 9022 Győr, Batthyány tér 6. 1. em. 6. ajtó, Hungary
            </li>
            <li>
              <strong>Company reg. no. / Tax no.:</strong> 08-09-035442 / 32192236-2-08 (EU VAT:
              HU32192236)
            </li>
            <li>
              <strong>Hosting provider contact:</strong>{" "}
              <a href="mailto:info@vipy.hu">info@vipy.hu</a>,{" "}
              <a href="https://vipy.hu" target="_blank" rel="noopener noreferrer">
                https://vipy.hu
              </a>
            </li>
          </ul>

          <h2>3. Legal Notice</h2>
          <p>
            NHNK is an <strong>independent, unofficial</strong> open-source project. It is not
            affiliated with Campus Codeworks Zrt. (formerly SDA Informatika Zrt.), the developer and
            operator of the Neptun system, or with any higher education institution. The
            &ldquo;Neptun&rdquo; name and trademark are the property of their respective owner and
            appear purely descriptively.
          </p>
        </>
      )}
    </LegalShell>
  );
}
