# Venkat Reddy Regulapally — Ultra-Luxury Telugu Marriage Portfolio

A cinematic, bilingual (English ⇄ Telugu) digital marriage portfolio — *"From the
Soil of Telangana to the World."* Built as an immersive, museum-grade experience
rather than a biodata page.

Built with **Next.js 16 (App Router)**, **TypeScript (strict)**, **Tailwind CSS v4**,
**Framer Motion**, **GSAP + ScrollTrigger**, **Lenis** smooth scroll, **React Three
Fiber** (loaded only where it adds depth), `qrcode.react` and `react-to-print`.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in private values (see below)
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build && npm run start
```

> **Node**: this project targets Node 18+ (developed on Node 22 LTS).

---

## The five files you edit (everything else flows from these)

| File | What lives here |
|------|-----------------|
| `src/data/profile.ts` | All personal facts (name, DOB, education, profession, family, interests, **jathakam**) |
| `src/data/photos.ts`  | The 12 photographs, captions, categories and per-photo focal points |
| `src/data/content.ts` | All bilingual website copy (EN + TE), poetry, chapter narratives |
| `src/config/privacy.ts` | What is public vs. gated (phones, horoscope, downloads, inquiry) |
| `src/config/theme.ts` | Palette, fonts and motion tokens (mirrored in `app/globals.css`) |

Change a value in one place and the whole site updates. **Never hardcode personal
details inside components.**

### ⚠️ Before going live — fill these in

1. **Jathakam** — `gotram`, `rasi`, `nakshatram`, `padam` in `profile.ts` are blank on
   purpose. Add accurate values. Any field left as `""` is hidden automatically.
2. **Diet / languages / interests** — adjust in `profile.ts` if defaults are wrong.
3. **Photos** — see below.
4. **Contact** — see below. Keep real numbers out of git.

---

## Swapping in the real photos

Drop the 12 images into `public/images/venkat/` using the **exact filenames** in
`photos.ts`:

```
01-hero-portrait.webp   (+ 01-hero-portrait-mobile.webp)
02-traditional.webp     03-outdoor.webp     04-cambridge.webp
05-professional.webp    06-casual.webp      07-family.webp
08-native.webp          09-travel.webp      10-festival.webp
11-candid.webp          12-final.webp
```

- Prefer `.webp`/`.avif`; Next.js serves modern formats automatically.
- Adjust each photo's `focalPoint` in `photos.ts` so faces are never cropped wrong.
- The repo ships with tasteful **placeholder** images. Regenerate them anytime with
  `node scripts/gen-placeholders.mjs`.

---

## Contact privacy (important)

Real contact details and the access code live **only in server env** and never reach
the browser bundle.

In `.env.local`:

```bash
# Gated reveal — returned by /api/access only after the correct code (server-only)
CONTACT_ACCESS_CODE=your-private-code
CONTACT_PHONE=+91XXXXXXXXXX
CONTACT_WHATSAPP=+91XXXXXXXXXX
CONTACT_EMAIL=family@example.com

# Where inquiry-form introductions are sent (server-only)
INQUIRY_TO_EMAIL=family@example.com

# Public canonical URL (used for share links, QR, OG image)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Toggle behaviour in `src/config/privacy.ts`:

- `requireAccessCodeForContact` — gate the reveal behind a code (checked server-side).
- `showHoroscopePublicly` — when `false`, jathakam values are **never rendered** into
  public source; the horoscope chamber shows a graceful "request access" note instead.
- `showPhoneNumbersPublicly`, `enableInquiryForm`, `enableBiodataDownload`,
  `enableWhatsAppContact`, `blockImageDownload`.

> The inquiry endpoint logs submissions server-side by default. To actually deliver
> them, wire an email provider (Resend / SES / etc.) where marked `TODO` in
> `src/app/api/inquiry/route.ts`.

---

## Printable one-page biodata

`/biodata/print` renders a tasteful A4 page (B/W-safe) that relatives can print or
save as PDF. It respects every privacy flag. A "Print / PDF" action also lives in the
biodata drawer and the contact panel.

---

## Language, sound & accessibility

- **Language toggle** (`EN · తె`) in the nav switches *all* copy via `content.ts`.
- **Ambient audio** is OFF by default and never autoplays. Add a
  `public/audio/ambient.mp3` to enable the control (it hides itself if absent).
- Full keyboard nav, focus management in modals/lightbox, Esc-to-close, visible focus,
  alt text on every photo, and a `prefers-reduced-motion` path that disables heavy
  motion (Lenis, GSAP scrubs, parallax) in favour of simple fades.

---

## Project structure

```
src/
├─ app/            layout, page, /biodata/print, /og, /api/{access,inquiry}, robots, sitemap
├─ components/
│  ├─ system/      Providers, Lenis, GSAP, CustomCursor, Audio
│  ├─ art/         TempleArchFrame, RoyalMonogram, LotusMedallion, ToranamBorder, …
│  ├─ nav/         LuxuryNavigation, MobileNavigation, CeremonialScrollThread, toggles
│  ├─ chapters/    opening, hero, sticky story, education, family, personality, finale, …
│  ├─ media/       Portrait, ScrollRevealPhoto, CinematicFilmstrip, MuseumGallery, LivingPortrait
│  └─ contact/     BiodataDrawer, PrintableBiodata, PrivateContactPanel, InquiryForm, ShareCard, SecretLotusMessage
├─ data/           profile, photos, content
├─ config/         privacy, theme, sections
└─ lib/            getAge, useReducedMotion, useScrollReveal, useActiveSection, sampleImageColor, LanguageProvider
```

## Easter eggs

- Click the lotus seal near the end for a soft blessing.
- Click the **monogram** five times for a private family blessing.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the env vars from `.env.example` under **Project → Settings → Environment
   Variables** (set `NEXT_PUBLIC_SITE_URL` to your production domain).
4. Deploy — no extra build config needed.

```bash
# or from the CLI
npx vercel
npx vercel --prod
```
