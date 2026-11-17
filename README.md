# Olive & Ember — Catering Studio Website (Portfolio Demo)

Multilingual Next.js App Router website for a catering studio, built with TypeScript, Tailwind CSS v4, `next-intl` (`en` and `bn`), and Lucide icons.

> **Demo notice:** All business details, prices, packages, service zones, and testimonials are editable sample content. No email, CRM, or payment backend is connected.

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` (redirects to `/en`, or visit `/bn` for Bangla).

### Verification scripts

```bash
npm run test       # Vitest unit tests (estimator & validation)
npm run typecheck  # TypeScript strict check
npm run lint       # ESLint
npm run build      # Production build
```

## Key routes

- `/[locale]` — Home (hero, quick quote starter, event formats, featured packages, process, menu/estimator callouts, testimonials, service areas)
- `/[locale]/packages` — Filterable & sortable packages + side-by-side comparison table
- `/[locale]/packages/[slug]` — Individual package details, inclusions & sample menu
- `/[locale]/events` & `/[locale]/events/[slug]` — Weddings, Corporate, Private celebrations with planning timelines
- `/[locale]/menus` — Searchable & filterable sample dish library (course, cuisine, dietary tags)
- `/[locale]/estimator` — Interactive guest-count cost & staffing estimator
- `/[locale]/quote` — 3-step quote request form (date, venue, guest count, package, style, dietary counts, contact details)
- `/[locale]/gallery` — Filterable gallery with keyboard-accessible lightbox
- `/[locale]/service-areas` — Zone breakdown & instant area lookup
- `/[locale]/about` — Studio story, values & team placeholders
- `/[locale]/faq` — Searchable, categorized FAQ accordion
- `/[locale]/contact` — Contact form, studio address, hours & map link
- `/[locale]/privacy` & `/[locale]/terms` — Template legal pages

## Editing business content

- **Brand, contact, hours, social links & booking rules:** `src/config/site.ts`
- **Packages & comparison matrix:** `src/content/packages.ts`
- **Event types & timelines:** `src/content/events.ts`
- **Sample menu library:** `src/content/dishes.ts`
- **Gallery, service zones, testimonials & FAQ:** `src/content/misc.ts`
- **Images:** `src/content/media.ts` (drop real photos into `public/images/` and set `src` on the matching key; entries without `src` render art-directed CSS placeholders)

## Adding another language

1. Add the locale code to `locales`, `localeLabels`, `intlLocale`, and `ogLocale` in `src/i18n/routing.ts`.
2. Copy `messages/en.json` to `messages/<code>.json` and translate all keys.
3. Add the new locale key to every `Localized` object in `src/config/site.ts` and `src/content/*` (TypeScript will flag any missing translations).

## Integrations requiring credentials / backend work

- **Quote & contact delivery (`src/app/api/quote/route.ts`, `src/app/api/contact/route.ts`):** Currently validate payloads and return `{ ok: true, mode: "demo" }`. Connect an email service (e.g. Resend/Postmark/SMTP) or CRM webhook with environment variables for production.
- **Canonical URL (`NEXT_PUBLIC_SITE_URL`):** Set your production domain in `.env.local` for `sitemap.xml`, `robots.txt`, and `hreflang` links.
- **Photography:** 3 generated photos are included in `public/images/`; remaining slots use CSS placeholders until real event photos are added.
