# Content Guide — Domus Loucis

Everything on the site flows from `/studio`. This guide explains what each
document type does, which fields map to which pages, and how to keep your
content feeling cohesive.

## Quick start

1. Open `/studio` (locally: `http://localhost:3000/studio`).
2. Sign in with the Sanity account that owns the project.
3. The Studio lists every document type on the left. Click into any to edit.

## Document types at a glance

| Type | What it is | Pages it powers |
| --- | --- | --- |
| `siteSettings` | Singleton — one only | Everywhere (footer, contact, ambient backdrop, OG image) |
| `photographer` | Singleton — one only | `/about` |
| `category` | Taxonomies | `/portfolio/category/[slug]`, filter bar |
| `photo` | A single photograph | Referenced from collections |
| `collection` | A body of work | `/portfolio`, `/portfolio/[slug]`, home bento |
| `service` | An offering | `/services`, home services grid |
| `testimonial` | A client quote | Home, `/press`, collection detail |
| `journalPost` | A blog entry | `/journal`, `/journal/[slug]`, home journal |
| `faqItem` | A Q&A | `/faq` |
| `pressFeature` | A publication mention | `/press` |
| `productPackage` | A print / bundle | `/shop` |

## Site Settings (start here)

Open **Site Settings** and fill in:

- **Site Title** — `Domus Loucis` (default).
- **Tagline** — `House of Light` (default).
- **Ambient Backdrop Image** — *the single most important image on the site*. This becomes the soft background behind home, about, services, contact, privacy, and terms headers. Choose a warm, quiet photograph — linen, window light, skin tones. Low contrast works best.
- **Ambient Position** — center / top / bottom anchor for the image.
- **Contact Email** — shown on `/contact` and the legal pages' closing note.
- **Studio Address** — multiline; appears on `/contact`.
- **Social Links** — array of `{ platform, url }`.
- **Footer Note** — small italic line under the footer headline.

**Tip:** Hit **Publish** after every change here — the front-end revalidates hourly (or sooner on deploy).

## Photographer (about page)

- **Name** — appears on `/about` and as the journal author.
- **Portrait** — square or 4:5, warm light. The home uses this if no photographer quote is set.
- **Bio** — portable text. Two to four short paragraphs is plenty.
- **Mission** — one short italic line, displayed in the gold rule.
- **Quote** — large serif pull-quote in the dark band.
- **Credentials** — array of strings (publication mentions, awards).

## Categories

Create three to start: **Weddings**, **Portraits**, **Editorial**. The order field controls display order on the filter bar.

## Collections (your portfolio)

A collection is a single body of work. It has:

- A **Category** reference (required).
- A **Cover Image** (the hero on the detail page).
- A **Story** (portable text — supports images too).
- A **Photos** array — references to `photo` documents.
- **Client / Location / Date** — meta shown on the hero.
- **Featured** toggle — checked = appears on home bento gallery.
- **Visibility** — public / unlisted / password / private.

### Workflow for a new collection

1. Upload each photograph as a `photo` document (so they have alt text, EXIF, ordering).
2. Create the `collection`, attach category, set the cover image.
3. In **Photos**, click *Add item* and search for the photos you uploaded.
4. Toggle **Featured** if you want it on home.
5. **Publish.**

## Services

One document per service offering. The home page shows up to 6 **featured** services in the dark grid. The full list appears on `/services`.

Fields worth filling in:
- **Title** — `Wedding`, `Portrait`, `Editorial & Brand`, etc.
- **Tagline** — one short italic line shown under the title.
- **Description** — portable text. Two short paragraphs.
- **Price From** — starting price (display only, no checkout).
- **Duration** — `Full day`, `1–2 hours`, etc.
- **Deliverables** — bullet list shown as gold-rule items.
- **Add-Ons** — optional extras.
- **Featured Image** — square or 4:5, used in the home grid card.
- **Featured** toggle — controls home visibility.

## Testimonials

Client quotes. Fields:
- **Client Name** — full name or `A. & M.` style.
- **Use Initials** — toggle for privacy.
- **Quote** — the actual testimonial.
- **Event Type** — `Wedding`, `Portrait`, etc.
- **Date** — when it happened.
- **Linked Collection** — optional reference; auto-linked if set.
- **Featured** toggle — controls home + press visibility.

## Journal Posts

- **Title**, **Slug** (auto-generated from title), **Excerpt** — used in previews.
- **Cover Image** — landscape, 4:3.
- **Published At** — set in the future to schedule.
- **Author** — references the photographer document.
- **Categories** — tags, free-form.
- **Body** — portable text. Supports text blocks, images, image grids, pull quotes.
- **Related Posts** — references shown at the bottom of the post.

The home page shows the three most recent posts.

## FAQ Items

- **Question** — short.
- **Answer** — portable text.
- **Category** — booking / pricing / process / deliverables / general.
- **Order** — manual sort.

## Press Features

- **Publication** — Vogue, Kinfolk, etc.
- **Publication Logo** — small grayscale logo (auto-desaturated, color on hover).
- **Headline** — the article title.
- **URL** — link out.
- **Date** — month/year.
- **Excerpt** — optional one-paragraph summary.

## Re-seeding

If you ever want to reset to a complete sample dataset, see
`scripts/seed-content.mjs`. The script is idempotent — it clears what it
manages and rebuilds it. **Do not run it after you've added real content**;
it will delete it.

## Image tips

- **Hotspot** — when uploading, click the subject of the photo to set the hotspot. The image cropper uses this for responsive crops.
- **Alt text** — required for accessibility on `photo` and `coverImage`. Describe meaningfully: "Couple sharing a first look at golden hour" beats "wedding photo".
- **Format** — JPEG or PNG, ideally under 2 MB. Sanity will optimise further on delivery.
- **Aspect ratios** that work well:
  - `coverImage` — landscape, 3:2 or 4:3
  - `portrait` (photographer) — 4:5 or square
  - `featuredImage` (service) — 4:5
  - `ambientImage` — landscape, 16:9 or wider