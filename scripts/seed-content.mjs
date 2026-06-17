#!/usr/bin/env node
/**
 * Seed the Domus Loucis Sanity dataset with realistic sample content.
 *
 * What it creates:
 *   - 1 photographer (with portrait)
 *   - 3 categories (Weddings, Portraits, Editorial)
 *   - 9 photos (3 per collection) referenced from 3 collections
 *   - 3 collections (one per category), each with a cover + photo array
 *   - 3 services (Wedding, Portrait, Editorial) with featured images
 *   - 2 testimonials (referenced from collections)
 *   - 2 journal posts with covers and portable-text bodies
 *   - 3 FAQ items
 *   - 1 site settings document with ambient image
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=skXXXXX node scripts/seed-content.mjs
 *
 * Required env (read from .env.local automatically):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID   (default: btp23etn)
 *   NEXT_PUBLIC_SANITY_DATASET      (default: production)
 *   SANITY_API_WRITE_TOKEN          (Editor role required)
 *
 * Idempotency:
 *   The script first DELETES all documents of the types it manages, then
 *   uploads fresh assets and recreates the documents. Safe to re-run.
 */

import { createClient } from "@sanity/client";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "btp23etn";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API_VERSION = "2024-10-01";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!TOKEN) {
  console.error(
    "\n  ✗ Missing SANITY_API_WRITE_TOKEN.\n" +
      "    Get one from sanity.io/manage → API → Tokens (Editor role).\n" +
      "    Then run:\n" +
      "      SANITY_API_WRITE_TOKEN=skXXXX node scripts/seed-content.mjs\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  token: TOKEN,
  useCdn: false,
});

const IMAGES_DIR = "/tmp/domus-seed/images";

async function uploadImage(filename, alt) {
  const buffer = await fs.readFile(path.join(IMAGES_DIR, filename));
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/jpeg",
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: alt || "",
  };
}

const MANAGED_TYPES = [
  "siteSettings",
  "photographer",
  "category",
  "photo",
  "collection",
  "service",
  "testimonial",
  "journalPost",
  "faqItem",
];

async function clearExisting() {
  console.log("→ Clearing existing seed-managed documents…");
  for (const type of MANAGED_TYPES) {
    const query = `*[_type == "${type}"]{ _id }`;
    const docs = await client.fetch(query);
    if (docs.length === 0) continue;
    console.log(`  · ${type}: deleting ${docs.length}`);
    const tx = client.transaction();
    for (const d of docs) tx.delete(d._id);
    await tx.commit();
  }
}

function pt(text) {
  // Convert plain text to a portable-text block array.
  const paragraphs = text.split("\n\n").map((p) => ({
    _type: "block",
    _key: randomUUID().slice(0, 8),
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: randomUUID().slice(0, 8),
        marks: [],
        text: p,
      },
    ],
  }));
  return paragraphs;
}

async function seed() {
  await clearExisting();

  console.log("→ Uploading assets…");
  const [
    portraitImg,
    weddingCover,
    wedding1,
    wedding2,
    wedding3,
    portraitCover,
    portrait1,
    portrait2,
    portrait3,
    brandCover,
    brand1,
    brand2,
    brand3,
    serviceWeddingImg,
    servicePortraitImg,
    serviceEditorialImg,
    journal1Cover,
    journal2Cover,
    ambientWarm,
  ] = await Promise.all([
    uploadImage("portrait.jpg", "Portrait of the photographer"),
    uploadImage("wedding-cover.jpg", "Wedding couple at golden hour"),
    uploadImage("wedding-1.jpg", "Bride and groom during ceremony"),
    uploadImage("wedding-2.jpg", "Wedding reception details"),
    uploadImage("wedding-3.jpg", "Couple walking at sunset"),
    uploadImage("portrait-cover.jpg", "Editorial portrait in soft light"),
    uploadImage("portrait-1.jpg", "Studio portrait, contemplative"),
    uploadImage("portrait-2.jpg", "Outdoor portrait, natural light"),
    uploadImage("portrait-3.jpg", "Window-light portrait"),
    uploadImage("brand-cover.jpg", "Brand campaign still life"),
    uploadImage("brand-1.jpg", "Editorial fashion detail"),
    uploadImage("brand-2.jpg", "Brand lifestyle image"),
    uploadImage("brand-3.jpg", "Quiet product moment"),
    uploadImage("service-wedding.jpg", "Wedding photography reference"),
    uploadImage("service-portrait.jpg", "Portrait photography reference"),
    uploadImage("service-editorial.jpg", "Editorial photography reference"),
    uploadImage("journal-1-cover.jpg", "Golden hour light study"),
    uploadImage("journal-2-cover.jpg", "Camera and notebook on linen"),
    uploadImage("ambient-warm.jpg", "Soft ambient backdrop"),
  ]);
  console.log("  ✓ 19 assets uploaded");

  console.log("→ Creating site settings…");
  await client.create({
    _type: "siteSettings",
    siteTitle: "Domus Loucis",
    tagline: "House of Light",
    contactEmail: "hello@domusloucis.com",
    contactPhone: "",
    studioAddress: "By appointment only\n[Studio Address Line 1]\n[City, State, ZIP]",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/" },
      { platform: "Pinterest", url: "https://pinterest.com/" },
    ],
    ambientImage: ambientWarm,
    ambientPosition: "center",
    footerNote: "Photography rooted in intimacy and light.",
  });

  console.log("→ Creating photographer…");
  const photographer = await client.create({
    _type: "photographer",
    name: "Lou Cissé",
    portrait: portraitImg,
    bio: pt(
      "I'm Lou — a photographer working in editorial, wedding, and portrait photography across [City] and beyond. My work is rooted in light: the way it falls across a face, the way it changes a room, the way it holds a moment just long enough for the camera to see it.\n\nBefore this studio, I trained under documentary photographers in [City] and spent five years shooting for editorial clients. Today I take a small number of commissions each year, shaped around the people I work with.\n\nIf our work speaks to you, I'd love to hear about yours.",
    ),
    mission:
      "To make photographs that feel less like records and more like memories — quiet, considered, and warm.",
    quote:
      "Photography is the art of paying attention — and then trusting the light to do the rest.",
    credentials: [
      "Featured — Vogue Italia, 2024",
      "Featured — Kinfolk Magazine, 2023",
      "IPA — Editorial, Honourable Mention",
      "Workshop mentor — [Studio], 2022–2024",
      "Member — [Photography Association]",
    ],
  });

  console.log("→ Creating categories…");
  const catWeddings = await client.create({
    _type: "category",
    title: "Weddings",
    slug: { _type: "slug", current: "weddings" },
    description:
      "Intimate weddings and elopements, photographed with quiet attention and an editorial eye.",
    order: 1,
  });
  const catPortraits = await client.create({
    _type: "category",
    title: "Portraits",
    slug: { _type: "slug", current: "portraits" },
    description:
      "Studio and natural-light portraits for individuals, couples, and families.",
    order: 2,
  });
  const catEditorial = await client.create({
    _type: "category",
    title: "Editorial",
    slug: { _type: "slug", current: "editorial" },
    description:
      "Brand campaigns, editorial fashion, and quiet commercial work for studios and labels.",
    order: 3,
  });

  console.log("→ Creating photos…");
  const photoWeddings = await Promise.all([
    client.create({
      _type: "photo",
      title: "First look, golden hour",
      alt: "Couple sharing a first look at golden hour",
      image: wedding1,
      dateCaptured: "2024-08-12T18:30:00Z",
      order: 1,
    }),
    client.create({
      _type: "photo",
      title: "Reception details",
      alt: "Soft focus of reception table details",
      image: wedding2,
      dateCaptured: "2024-08-12T21:00:00Z",
      order: 2,
    }),
    client.create({
      _type: "photo",
      title: "Walking out",
      alt: "Couple walking together at sunset",
      image: wedding3,
      dateCaptured: "2024-08-12T19:45:00Z",
      order: 3,
    }),
  ]);
  const photoPortraits = await Promise.all([
    client.create({
      _type: "photo",
      title: "Window light study",
      alt: "Quiet portrait in soft window light",
      image: portrait1,
      dateCaptured: "2024-05-04T10:15:00Z",
      order: 1,
    }),
    client.create({
      _type: "photo",
      title: "Outdoor, golden hour",
      alt: "Outdoor portrait in warm late light",
      image: portrait2,
      dateCaptured: "2024-06-18T19:20:00Z",
      order: 2,
    }),
    client.create({
      _type: "photo",
      title: "Contemplative",
      alt: "Contemplative portrait, soft shadows",
      image: portrait3,
      dateCaptured: "2024-07-09T11:00:00Z",
      order: 3,
    }),
  ]);
  const photoEditorial = await Promise.all([
    client.create({
      _type: "photo",
      title: "Editorial — linen in light",
      alt: "Editorial fashion detail with linen",
      image: brand1,
      dateCaptured: "2024-09-22T14:30:00Z",
      order: 1,
    }),
    client.create({
      _type: "photo",
      title: "Brand lifestyle",
      alt: "Lifestyle image for a brand campaign",
      image: brand2,
      dateCaptured: "2024-09-22T16:00:00Z",
      order: 2,
    }),
    client.create({
      _type: "photo",
      title: "Quiet product moment",
      alt: "Quiet product detail photograph",
      image: brand3,
      dateCaptured: "2024-10-01T11:00:00Z",
      order: 3,
    }),
  ]);

  console.log("→ Creating testimonials…");
  const testimonial1 = await client.create({
    _type: "testimonial",
    clientName: "A. & M.",
    useInitials: true,
    quote:
      "Lou has the rarest gift — to be present without being seen. Our photographs feel like memories rather than images, and we will treasure them forever.",
    eventType: "Wedding",
    date: "2024-08-12",
    featured: true,
  });
  const testimonial2 = await client.create({
    _type: "testimonial",
    clientName: "Sade O.",
    useInitials: false,
    quote:
      "I have never felt so comfortable in front of a camera. The portrait Lou made of me feels more like me than I do.",
    eventType: "Portrait",
    date: "2024-05-04",
    featured: true,
  });

  console.log("→ Creating collections…");
  const _weddingCollection = await client.create({
    _type: "collection",
    title: "A Golden Hour Wedding",
    slug: { _type: "slug", current: "a-golden-hour-wedding" },
    category: { _type: "reference", _ref: catWeddings._id },
    coverImage: weddingCover,
    excerpt:
      "An intimate August wedding photographed in soft late-summer light, from first look to last dance.",
    story: pt(
      "A small wedding at a private estate, just outside the city. The light had been golden all afternoon, and the whole day felt like it was being held gently.\n\nWe spent the morning with each of them separately, then walked the grounds together for an unhurried first look. The ceremony was under an old oak, the reception was lit by candles and the last of the day's sun.\n\nThese are the photographs from that day.",
    ),
    photos: photoWeddings.map((p) => ({
      _type: "reference",
      _key: randomUUID().slice(0, 8),
      _ref: p._id,
    })),
    client: "A. & M.",
    location: "[Estate Name], [State]",
    date: "2024-08-12",
    testimonial: { _type: "reference", _ref: testimonial1._id },
    featured: true,
    order: 1,
    visibility: "public",
  });

  const _portraitCollection = await client.create({
    _type: "collection",
    title: "Quiet Portraits, Spring",
    slug: { _type: "slug", current: "quiet-portraits-spring" },
    category: { _type: "reference", _ref: catPortraits._id },
    coverImage: portraitCover,
    excerpt:
      "A series of portraits made in soft window light over a single morning, in the studio.",
    story: pt(
      "An afternoon in the studio with three people who agreed to be photographed in quiet, with no rush.\n\nThe light came through the east window and held for an hour and a half. We didn't talk much. These are the frames that mattered.",
    ),
    photos: photoPortraits.map((p) => ({
      _type: "reference",
      _key: randomUUID().slice(0, 8),
      _ref: p._id,
    })),
    location: "[Studio], [City]",
    date: "2024-05-04",
    testimonial: { _type: "reference", _ref: testimonial2._id },
    featured: true,
    order: 2,
    visibility: "public",
  });

  const _editorialCollection = await client.create({
    _type: "collection",
    title: "Linen & Light — Editorial Campaign",
    slug: { _type: "slug", current: "linen-and-light" },
    category: { _type: "reference", _ref: catEditorial._id },
    coverImage: brandCover,
    excerpt:
      "An autumn campaign for a small linen label, shot on location over two days.",
    story: pt(
      "A two-day shoot for a small studio's autumn collection. We worked in their workspace and in a quiet house nearby, mostly in available light.\n\nThe campaign was about unhurried things — folds, hands, the way a garment rests. These are the frames that made the final cut.",
    ),
    photos: photoEditorial.map((p) => ({
      _type: "reference",
      _key: randomUUID().slice(0, 8),
      _ref: p._id,
    })),
    client: "[Brand Name]",
    location: "[City], [State]",
    date: "2024-09-22",
    featured: true,
    order: 3,
    visibility: "public",
  });

  console.log("→ Creating services…");
  await Promise.all([
    client.create({
      _type: "service",
      title: "Wedding",
      slug: { _type: "slug", current: "wedding" },
      category: { _type: "reference", _ref: catWeddings._id },
      tagline: "From first look to last dance.",
      description: pt(
        "An unhurried, fully present record of your wedding day — from getting ready to the last song, photographed with quiet attention and an editorial eye.\n\nCoverage includes a planning call, a venue walk-through when possible, a curated online gallery, and high-resolution files for print and sharing.",
      ),
      priceFrom: 4800,
      priceCurrency: "USD",
      duration: "Full day, 8–10 hours",
      deliverables: [
        "Pre-wedding planning call",
        "Venue walk-through (when feasible)",
        "8–10 hours of coverage",
        "400–600 edited photographs",
        "Private online gallery",
        "High-resolution files for print",
        "Optional second photographer",
      ],
      addOns: [
        "Engagement session",
        "Album design + printing",
        "Additional coverage hours",
        "Travel beyond 50 miles",
      ],
      featuredImage: serviceWeddingImg,
      featured: true,
      order: 1,
    }),
    client.create({
      _type: "service",
      title: "Portrait",
      slug: { _type: "slug", current: "portrait" },
      category: { _type: "reference", _ref: catPortraits._id },
      tagline: "Slow light. Quiet rooms.",
      description: pt(
        "Studio or on-location portrait sessions for individuals, couples, and families. Sessions are unhurried — typically one to two hours — and shaped around the light available that day.\n\nYou receive a curated gallery of edited portraits and full-resolution files for print and sharing.",
      ),
      priceFrom: 750,
      priceCurrency: "USD",
      duration: "1–2 hours",
      deliverables: [
        "Pre-session consultation",
        "1–2 hours of shooting",
        "30–60 edited portraits",
        "Private online gallery",
        "High-resolution files for print",
      ],
      addOns: [
        "Additional hours",
        "Location scouting",
        "Hair & makeup coordination",
        "Print orders",
      ],
      featuredImage: servicePortraitImg,
      featured: true,
      order: 2,
    }),
    client.create({
      _type: "service",
      title: "Editorial & Brand",
      slug: { _type: "slug", current: "editorial-brand" },
      category: { _type: "reference", _ref: catEditorial._id },
      tagline: "Campaigns with restraint.",
      description: pt(
        "Editorial and brand work for studios, labels, and small companies. Projects are scoped collaboratively and shot primarily in available light.\n\nDeliverables are tailored to the brief: campaign stills, lookbooks, brand portraits, or quiet product moments.",
      ),
      priceFrom: 2400,
      priceCurrency: "USD",
      duration: "Project-based",
      deliverables: [
        "Brief & moodboard session",
        "Half-day or full-day shoot",
        "Curated edited gallery",
        "High-resolution files",
        "Web-optimised versions",
      ],
      addOns: [
        "Additional shoot days",
        "On-location travel",
        "Retouching beyond standard",
        "Usage license extensions",
      ],
      featuredImage: serviceEditorialImg,
      featured: true,
      order: 3,
    }),
  ]);

  console.log("→ Creating journal posts…");
  await Promise.all([
    client.create({
      _type: "journalPost",
      title: "On Waiting for Light",
      slug: { _type: "slug", current: "on-waiting-for-light" },
      excerpt:
        "Notes on patience, attention, and the half-hour before sunset — and why most of my favourite photographs happen there.",
      coverImage: journal1Cover,
      publishedAt: "2024-10-12T09:00:00Z",
      author: { _type: "reference", _ref: photographer._id },
      categories: ["Craft", "Process"],
      body: [
        ...pt(
          "Every photographer I admire has, at some point, told me the same thing: the photographs you remember are the ones you almost didn't take.\n\nThere is a half-hour before sunset — some photographers call it the golden hour, others call it the last light — when the world goes a little quieter. The colour is warm. Shadows soften. People forget the camera is there.",
        ),
        {
          _type: "block",
          _key: randomUUID().slice(0, 8),
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: randomUUID().slice(0, 8),
              marks: [],
              text: "I have built most of my working life around that half-hour. I have learned to wait for it, to plan for it, and to trust it. Almost every photograph I love from a wedding day was made in the ten minutes either side of it.",
            },
          ],
        },
        {
          _type: "object",
          _key: randomUUID().slice(0, 8),
          _type: "pullQuote",
          quote:
            "Patience is not the absence of motion. It is motion held still long enough for the world to settle.",
        },
        ...pt(
          "If you take one thing from this note, let it be this: light is not a problem to be solved. It is a presence to be accompanied. The slower you are with it, the more it gives.",
        ),
      ],
    }),
    client.create({
      _type: "journalPost",
      title: "What I Look for in a Quiet Portrait",
      slug: { _type: "slug", current: "what-i-look-for-in-a-quiet-portrait" },
      excerpt:
        "A short essay on the small, telling gestures — and why a portrait is rarely about the face you remember most.",
      coverImage: journal2Cover,
      publishedAt: "2024-08-30T09:00:00Z",
      author: { _type: "reference", _ref: photographer._id },
      categories: ["Portrait", "Craft"],
      body: pt(
        "Most people, when they sit for a portrait, give me their best face. They smile a little, hold their shoulders back, and try to look the way they think a photograph should look.\n\nWhat I am looking for is something else.\n\nI am looking for the moment after the good face — when they have given up on performing, and the real expression arrives. It is almost always smaller than people expect. A breath out. A look toward the window. The hands, settled.",
      ),
    }),
  ]);

  console.log("→ Creating FAQ items…");
  await Promise.all([
    client.create({
      _type: "faqItem",
      question: "How far in advance should I book?",
      answer: pt(
        "For weddings, six to twelve months is typical, with some dates filling a year out. Portrait sessions can usually be scheduled within a few weeks, depending on the season. Editorial and brand projects are scoped case by case.",
      ),
      category: "booking",
      order: 1,
    }),
    client.create({
      _type: "faqItem",
      question: "Do you travel for commissions?",
      answer: pt(
        "Yes — for weddings and destination projects worldwide. Travel within 50 miles of [City] is included; beyond that, travel is invoiced at cost and quoted in advance.",
      ),
      category: "general",
      order: 2,
    }),
    client.create({
      _type: "faqItem",
      question: "How long until I receive my photographs?",
      answer: pt(
        "Sneak peeks arrive within a week. Full edited galleries are delivered within four to eight weeks, depending on the season and scope of the project. You will receive an email with a private gallery link.",
      ),
      category: "deliverables",
      order: 3,
    }),
  ]);

  console.log("\n✓ Seed complete.");
  console.log(`  Project: ${PROJECT_ID} / ${DATASET}`);
  console.log(`  Visit /studio in your dev server to edit the content.`);
}

seed().catch((err) => {
  console.error("\n✗ Seed failed:");
  console.error(err);
  process.exit(1);
});