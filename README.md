# Domus Loucis — House of Light

A world-class editorial photography website for **Domus Loucis**, built on Next.js 16 + Sanity CMS with cinematic motion design.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **CMS**: Sanity (headless, real-time)
- **Styling**: Tailwind CSS v4 (custom design tokens)
- **Motion**: Framer Motion + GSAP + Lenis smooth scroll
- **Image**: Next/Image + Sanity CDN (AVIF/WebP, hotspot, blur)
- **i18n**: next-intl (EN / FR / ES — wired but ready)
- **Commerce**: Stripe (configurable)
- **Auth**: Clerk (configurable, for client proofing)
- **Email**: Resend (configurable)
- **Analytics**: Plausible or Fathom (privacy-friendly)

## Brand System

| Token | Value | Usage |
|---|---|---|
| `bone` | `#F5F1EA` | Primary background |
| `ink` | `#1A1814` | Text, dark sections |
| `gold` | `#C9A961` | Champagne accent — "House of Light" |
| `taupe` | `#8C7B5C` | Secondary warm |
| `paper` | `#FFFFFF` | Galleries |
| `mist` | `#E6DFD3` | Image placeholders |

**Typography**: Editorial serif (Cormorant Garamond) + Inter (UI).
**Motion**: Custom `ease-editorial` curve, 0.8–1.4s slow reveal, magnetic buttons, parallax images, marquee strip, smooth scroll via Lenis.

## Pages

- `/` — Home (Hero, marquee, featured collections, services, testimonials, journal teaser, CTA)
- `/portfolio` — All collections in bento grid
- `/portfolio/[category]` — Filtered by category (Weddings / Portraits / Commercial / Lifestyle)
- `/portfolio/[slug]` — Individual collection (hero, story, lightbox gallery, testimonial, related)
- `/services` — Editorial service list with pricing
- `/about` — Photographer bio, mission, credentials
- `/journal` — Blog index (alternating editorial layout)
- `/journal/[slug]` — Article with portable text + related posts
- `/press` — Publications + testimonials
- `/faq` — Categorized accordion
- `/shop` — Prints & packages (Stripe-ready)
- `/contact` — 3-step inquiry form
- `/account` — Client login placeholder
- `/studio` — Sanity Studio (CMS UI)

## Sanity Schemas

`siteSettings`, `photographer`, `photo`, `collection`, `category`, `service`, `productPackage`, `journalPost`, `pressFeature`, `testimonial`, `faqItem` — defined in `sanity/schemas/`.

## Getting Started

```bash
# Install
npm install

# Copy environment template
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID after creating your Sanity project

# Run dev server
npm run dev

# Open CMS
# Visit http://localhost:3000/studio
```

### Create a Sanity project

```bash
cd sanity
npx sanity init --env
# Or create at https://www.sanity.io/manage
# Then paste the project ID into .env.local
```

## Folder Structure

```
app/                  # Next.js App Router pages
components/
  home/               # Hero, home sections
  portfolio/          # Bento gallery
  gallery/            # Lightbox
  motion/             # Reusable motion primitives
  ui/                 # Generic UI (empty state, FAQ accordion)
  layout/             # Navigation, footer
  contact/            # Multi-step form
sanity/
  schemas/            # Content models
  lib/                # Client, image URL builder, GROQ queries
types/                # TypeScript types
lib/                  # Utilities (cn, formatDate, slugify)
```

## Production Readiness Checklist

- [ ] Add real Sanity project ID
- [ ] Generate favicon + OG image (`/public/og-image.jpg` 1200×630)
- [ ] Wire contact form to Resend (`/api/inquiry` route)
- [ ] Wire Stripe Checkout for `/shop`
- [ ] Add Clerk auth to `/account` + per-collection passwords
- [ ] Set up Plausible or Fathom
- [ ] Add Google Search Console verification
- [ ] Draft Privacy & Terms with legal counsel
- [ ] Lighthouse audit (target ≥90 mobile, ≥95 desktop)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] E2E test critical paths (Playwright)

## Design Tokens Reference

All brand tokens are defined as CSS variables in `app/globals.css` and consumed via Tailwind v4 `@theme`:

```
bg-bone, bg-ink, bg-gold, bg-taupe, bg-paper, bg-mist
text-bone, text-ink, text-gold, text-taupe
border-ink/10, border-gold
font-serif, font-sans
ease-editorial, ease-reveal
```

## License

Proprietary — commissioned by Domus Loucis.