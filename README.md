# Naveen A D — Portfolio

Cybersecurity Awareness & Culture Lead · NextGen Identity.
Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion**.
Hacker theme: matrix-green on black, live terminal, glitch name, scanlines. Fonts (Instrument Sans, JetBrains Mono) are bundled locally, so there are no external font requests.

**Signature features:** an interactive hero terminal (visitors type `help`, `whoami`, `skills`, `certs`, `contact`…; its content comes from `src/data/`) and a "Phish or legit?" awareness demo (`src/components/PhishQuiz.tsx`, fictional emails you can edit).

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

Requires Node 18.18+ (Node 20/22 recommended).

## Add your real content (no code needed for images)

| What | Where | Notes |
|---|---|---|
| **Training photos** | `public/training/<category>/photo.jpg` | The folder name becomes the filter chip: `classroom/`, `corporate/`, `workshops-and-demos/`, `international/`… Photos placed directly in `public/training/` appear under "Highlights". |
| **Photo captions** | `public/training/captions.json` | `{ "classroom/session-01.jpg": "Security+ bootcamp, Bengaluru" }` |
| **Feedback screenshots** | `public/feedback/*.png` | Appear in the testimonial carousel. Optional `captions.json` in the same folder. |
| **Written testimonials** | `src/data/testimonials.ts` | Paste the learner's exact words, with name, designation and organisation. |
| **Certificate images** | `public/certificates/<id>.png` | `<id>` must match the id in `src/data/certifications.ts`: `iso27001-la`, `cisa`, `cysa-plus`, `security-plus`, `csap`, `a-plus`. |

Your first five training photos are already in `public/training/`. Add more the same way. Until you add testimonials/certificate images, the site shows clearly labelled amber **placeholder** tiles that disappear automatically. Tip: resize photos to ~1600px wide first; Next.js then serves optimised AVIF/WebP versions.

## Items marked "to confirm" (amber tags on the site)

These were not in your uploaded files, so they are flagged rather than invented. Edit them in `src/data/`:

- **NextGen Identity start date** — `experience.ts` → `currentRole` (remove `reviewNote` once set)
- **NIIT end date** — `experience.ts` → `previousRoles` → `niit` (the original site said "Present")
- **CISA status/date** — `certifications.ts` → `cisa` (the resume listed the exam for June 2026)
- **NextGen focus areas** in `experience.ts` come from your positioning notes; replace them with specific accomplishments when ready.

## Content map

- `src/data/profile.ts` — name, designation, links, contact form endpoint, hero metrics
- `src/data/experience.ts`, `training.ts`, `certifications.ts`, `skills.ts`, `achievements.ts`, `projects.ts`
- `src/components/` — one component per section; `Lightbox.tsx` is shared by the gallery, feedback and certificates
- `src/lib/media.ts` — build-time scan of the `public/training`, `public/feedback` and `public/certificates` folders

## Contact form

The form posts to the Formspree endpoint carried over from the original site (`profile.formEndpoint`). Replace it with your own if needed. Failures show an inline message with your email address as fallback. A honeypot field filters basic bots.

## Deploy (Vercel)

1. Push the project to GitHub.
2. On vercel.com → **New Project** → import the repo → **Deploy** (Next.js is auto-detected).
3. In **Settings → Environment Variables** add `NEXT_PUBLIC_SITE_URL` = your final URL (e.g. `https://naveenad.com`) so canonical links, the sitemap and social-preview images are correct. Redeploy. (Copy `.env.example` to `.env.local` for local testing.) To add your YouTube channel to the structured data, fill in `youtube` in `src/data/profile.ts`.
4. Add a custom domain under **Settings → Domains**.

Any Node host also works: `npm run build && npm run start`.

## SEO & accessibility

Metadata, Open Graph/Twitter image (generated in `src/app/opengraph-image.tsx`), JSON-LD `Person` schema, `sitemap.xml` and `robots.txt` are included. Navigation is keyboard accessible with a skip link, focus rings, labelled controls, a focus-trapped lightbox (Esc / ← →) and `prefers-reduced-motion` support.
