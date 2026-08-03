# NHNK-web

Az **[NHNK — Nem Hivatalos Neptun Kliens](https://github.com/Bali0531-RC/NHNK)** bemutatóoldala.

[![Licenc](https://img.shields.io/github/license/Bali0531-RC/NHNK-web?style=for-the-badge&color=blue)](LICENSE)
[![Alkalmazás](https://img.shields.io/github/v/release/Bali0531-RC/NHNK?style=for-the-badge&color=green&label=NHNK%20app)](https://github.com/Bali0531-RC/NHNK/releases/latest)

Élesben: **https://nhnk.bali0531.hu**

> [!NOTE]
> Ez a repó **csak a weboldalt** tartalmazza. Maga az Android-alkalmazás forráskódja a
> [Bali0531-RC/NHNK](https://github.com/Bali0531-RC/NHNK) repóban található.

## Oldalak

| Útvonal | Tartalom |
|---|---|
| `/` | Nyitóoldal: funkciók (`#funkciok`), letöltés (`#letoltes`) |
| `/adatvedelem` | Adatvédelmi tájékoztató |
| `/felhasznalasi-feltetelek` | Felhasználási feltételek |
| `/tamogatas` | Támogatási lehetőségek |

Az oldal kétnyelvű: magyar és angol. Első betöltéskor a böngésző nyelve dönt, utána a
választás `localStorage`-ban marad. A statikus HTML magyarul készül el, így a keresők és a
JavaScript nélküli látogatók is értelmes tartalmat kapnak.

## Technológia

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 4** (`@tailwindcss/postcss`)
- **Statikus export** (`output: "export"`) — a kimenet sima HTML/CSS/JS, bármilyen
  webtárhelyről kiszolgálható, nem kell hozzá futó Node.js

## Fejlesztés

Node.js **20.9 vagy újabb** szükséges (a Next.js 16 ezt írja elő).

```bash
npm install
npm run dev     # fejlesztői szerver: http://localhost:3000
npm run lint
npm run build   # statikus export az out/ mappába
```

Az elkészült oldal helyi megtekintéséhez:

```bash
npx serve out
```

> [!NOTE]
> A `npm start` (`next start`) **nem** használható: statikus exportnál nincs mit futtatni.
> Az `out/` mappát kell kiszolgálni.

## Tartalom szerkesztése

A szövegek és a beállítások néhány jól elkülönített helyen vannak, hogy ne kelljen
komponensekben keresgélni:

| Fájl | Mi van benne |
|---|---|
| `lib/site.ts` | Hivatkozások, e-mail cím, szerző, **támogatási módok**, `playStoreUrl` |
| `lib/i18n.ts` | Az összes felületi szöveg magyarul és angolul, valamint az útvonalak |
| `app/*/content.tsx` | A jogi oldalak (adatvédelem, feltételek) és a támogatás szövege |

Néhány gyakori művelet:

- **Új támogatási mód**: vedd fel egy elemmel a `donationMethods` tömböt a `lib/site.ts`-ben.
  A `/tamogatas` oldal adatvezérelt, magától követi.
- **Play Store gomb élesítése**: töltsd ki a `playStoreUrl` mezőt a `lib/site.ts`-ben. Amíg
  üres, a gomb inaktív marad.
- **Jogi szöveg módosítása**: a `legalLastUpdated` dátumot is frissítsd a `lib/site.ts`-ben.
  Ebből olvassák a jogi oldalak a „legutóbb frissítve" dátumot, és a `sitemap.xml` is ezt
  használja.

## Ikonok

Az oldal az alkalmazás ikonját használja. A forrás az app repóban lévő
`assets/nhnk_logo.png` (512×512), ebből származik:

| Fájl | Méret | Szerep |
|---|---|---|
| `public/logo.png` | 128 | Fejléc és lábléc |
| `app/icon.png` | 512 | Böngésző-ikon |
| `app/apple-icon.png` | 180 | iOS kezdőképernyő |
| `app/favicon.ico` | 16/32/48 | Klasszikus favicon |

Ha az ikon változik, mind a négyet újra kell generálni a forrásképből.

## Közzététel

Az oldal **Node-kiszolgálót igényel**, mert a zárt tesztre jelentkezés API-útvonalakat
használ. (Korábban statikus export volt; az `output: "export"` beállítás ezért került ki.)

```bash
pnpm install
pnpm build
pnpm start          # alapértelmezés szerint a 3000-es porton
```

### Környezeti változók

| Változó | Kötelező | Leírás |
|---|---|---|
| `NHNK_ADMIN_TOKEN` | igen, az exporthoz | Ezzel érhető el a tesztelői lista. Enélkül az export 503-mal elutasít. |
| `NHNK_DB_PATH` | nem | Az SQLite-fájl helye, alapértelmezés `./data/testers.db`. |

A token legyen hosszú és véletlenszerű, például `openssl rand -hex 32`.

### Tesztelői lista letöltése

```bash
# CSV, táblázatkezelőhöz
curl -H "Authorization: Bearer $NHNK_ADMIN_TOKEN" \
  https://nhnk.bali0531.hu/api/tester/export/ -o testers.csv

# Csak a címek, soronként egy — ezt várja a Play Console
curl -H "Authorization: Bearer $NHNK_ADMIN_TOKEN" \
  "https://nhnk.bali0531.hu/api/tester/export/?format=plain"
```

A záró perjel nem elhagyható: a `trailingSlash: true` miatt enélkül 308-as átirányítás jön.

### Adatkezelés

Az adatbázis **személyes adatot tartalmaz** (e-mail-címek), ezért nincs verziókövetésben,
és mentéskor is ennek megfelelően kell kezelni. Csak a cím, a nyelv és a jelentkezés
időpontja tárolódik; IP-cím nem. A zárt teszt végén az egész fájl törlendő — ezt ígéri az
adatvédelmi tájékoztató 6. pontja.

## Licenc

MIT — lásd a [LICENSE](LICENSE) fájlt.

Az alkalmazás külön licenc alatt áll, a saját repójában.
