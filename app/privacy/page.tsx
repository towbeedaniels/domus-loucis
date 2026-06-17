import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Domus Loucis collects, uses, and protects your personal information.",
};

const SECTIONS: LegalSection[] = [
  {
    eyebrow: "01",
    title: "A word on your privacy",
    paragraphs: [
      "I believe in keeping things quiet and considered — and that includes what happens with your information when you visit this site or write to me. This page explains, plainly, what I collect, why I collect it, and what I never do with it.",
      "I don't sell, rent, or trade your information. I don't run ad networks. If something here is unclear, write to me and I'll happily translate.",
    ],
  },
  {
    eyebrow: "02",
    title: "What I collect",
    paragraphs: [
      "Two kinds of information come my way: what you give me directly, and what your browser quietly tells the web as a matter of course. Both are listed below.",
    ],
  },
  {
    eyebrow: "03",
    title: "What you give me",
    paragraphs: [
      "When you reach out through the contact form, you share your name, email address, and the details of your story — event date, venue, scope, anything you choose to include in your message. If we move forward together, I'll also collect whatever is needed to prepare your contract and invoice (your partner's name, mailing address, and the like).",
      "If you create an account to access private galleries, your email and a hashed password are stored with the authentication provider. Nothing more.",
    ],
  },
  {
    eyebrow: "04",
    title: "What's collected quietly",
    paragraphs: [
      "Like nearly every site on the web, basic technical information is logged automatically: your IP address, browser type, operating system, the pages you visit on this site, and the site that referred you here. This information exists in server logs and in privacy-friendly analytics (see below). It is never linked to your identity in a way that I personally look at.",
    ],
  },
  {
    eyebrow: "05",
    title: "Cookies & analytics",
    paragraphs: [
      "I use a small set of cookies. Some are essential — they remember whether you're signed in, or keep your inquiry form from clearing between pages. Others help me understand which work resonates and which doesn't, so I can shape the studio accordingly.",
      "Where possible, I use privacy-friendly analytics (such as Plausible or Fathom) that record aggregate trends without tracking you across the web. I don't use Google Analytics, Facebook Pixel, or any cross-site advertising cookies.",
      "You can disable non-essential cookies through your browser at any time.",
    ],
  },
  {
    eyebrow: "06",
    title: "How I use it",
    paragraphs: [
      "Your information is used to: reply to your inquiry; prepare and deliver the services you commission; send occasional studio updates if you've opted in; meet legal obligations like invoicing and tax record-keeping; and improve this site over time.",
      "That's the full list. I don't build marketing profiles, and I don't share your information to enrich anyone else's database.",
    ],
  },
  {
    eyebrow: "07",
    title: "Who I share it with",
    paragraphs: [
      "Only the people who need it to do their job — and only the slice they need.",
      "This typically includes: the Sanity content platform that powers this site; my email and gallery delivery providers; a payment processor for invoices; and, where applicable, an accountant and legal counsel under confidentiality.",
      "I may also disclose information when required by law, or to protect my rights or someone else's safety. Otherwise, your information stays with me.",
    ],
  },
  {
    eyebrow: "08",
    title: "How long I keep it",
    paragraphs: [
      "Inquiry messages are kept for up to twenty-four months, then archived or deleted. Active client records — contracts, delivery details, final invoice — are kept for seven years to meet tax and legal obligations in [Jurisdiction].",
      "If you'd like me to delete your inquiry sooner, just ask.",
    ],
  },
  {
    eyebrow: "09",
    title: "Your rights",
    paragraphs: [
      "You have the right to know what I hold about you, to correct it, to download it, to delete it (where my legal obligations allow), and to withdraw consent where I rely on it. To exercise any of these, write to me at the address below — I respond personally and usually within a few days.",
      "If you're unsatisfied with my response, you have the right to lodge a complaint with your local data protection authority.",
    ],
  },
  {
    eyebrow: "10",
    title: "A note on children",
    paragraphs: [
      "This site is not directed at children under thirteen, and I don't knowingly collect information from them. If you believe a child has shared information with the studio, please contact me so I can remove it promptly.",
    ],
  },
  {
    eyebrow: "11",
    title: "Changes to this policy",
    paragraphs: [
      "I may update this page from time to time as my tools or practices evolve. When I do, the date at the top will change, and — for material changes — I'll note it briefly on the home page. The current version always lives at this URL.",
    ],
  },
];

export default async function PrivacyPage() {
  let siteSettings: SiteSettings | null = null;
  try {
    siteSettings = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
  } catch {}

  return (
    <LegalLayout
      eyebrow="Privacy"
      title="Your information,"
      intro="Quietly handled, plainly explained. Here is exactly what I collect, why, and what I never do with it."
      lastUpdated="June 17, 2026"
      sections={SECTIONS}
      backdropSrc="/images/ambient/linen-light.jpg"
      backdropImage={siteSettings?.ambientImage}
      contactEmail={siteSettings?.contactEmail ?? "hello@domusloucis.com"}
    />
  );
}