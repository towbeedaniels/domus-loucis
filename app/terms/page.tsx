import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms under which Domus Loucis accepts commissions and provides services.",
};

const SECTIONS: LegalSection[] = [
  {
    eyebrow: "01",
    title: "Working together",
    paragraphs: [
      "These are the terms that govern our working relationship when you commission a project from Domus Loucis. They're written in plain language because I'd rather you read them than skim past them. If anything below feels off, tell me before we sign — I'd rather adjust than surprise.",
      "By submitting an inquiry, signing a commission agreement, or using this website, you agree to these terms.",
    ],
  },
  {
    eyebrow: "02",
    title: "What I offer",
    paragraphs: [
      "Editorial, wedding, portrait, commercial, and lifestyle photography — and the prints, albums, and digital galleries that accompany them. The live Services page lists current offerings and starting prices; a final quote is always tailored to your scope.",
      "Anything I deliver under a custom commission is governed by the signed agreement we put in place together, which takes precedence over these general terms in case of conflict.",
    ],
  },
  {
    eyebrow: "03",
    title: "Inquiries & bookings",
    paragraphs: [
      "An inquiry is a conversation, not a commitment. Once we've talked through your story and I've sent a proposal, I'll hold your date for seven days while you decide. To confirm, I require a signed agreement and the retainer described below.",
      "Dates aren't officially reserved — and don't appear on my calendar — until both are in hand.",
    ],
  },
  {
    eyebrow: "04",
    title: "Retainers & payment",
    paragraphs: [
      "A non-refundable retainer of [30]% of the total fee secures your booking. The balance is due no later than [fourteen] days before your session or event date, or upon delivery of final galleries for portrait and commercial work — whichever we've agreed to in your contract.",
      "Invoices accept major credit cards and bank transfer. Late payments accrue a [1.5]% monthly fee after a [fourteen]-day grace period.",
    ],
  },
  {
    eyebrow: "05",
    title: "Cancellations",
    paragraphs: [
      "If you cancel for any reason, the retainer is forfeited as compensation for the dates I turned away. If I cancel, you receive a full refund of every payment made — and, where possible, a hand-off to a trusted colleague.",
      "For cancellations made within [thirty] days of the shoot date, the full fee is due regardless of circumstance, since last-minute cancellations rarely give me time to refill the calendar.",
    ],
  },
  {
    eyebrow: "06",
    title: "Reschedules & weather",
    paragraphs: [
      "Outdoor sessions may be rescheduled once without penalty for weather or light, with reasonable notice. Beyond that, additional reschedules may incur a coordination fee to cover my time.",
      "If I am unable to perform due to illness, accident, or other genuine emergency, every effort will be made to find a replacement photographer of comparable style, or to refund payments for services not yet rendered.",
    ],
  },
  {
    eyebrow: "07",
    title: "Your gallery",
    paragraphs: [
      "Edited galleries are delivered through a private online gallery, typically within [four to eight] weeks of your session or wedding date. A small selection of sneak peeks arrives sooner — usually within a week — so you have something to hold in the meantime.",
      "Your gallery remains available for download and ordering for at least twelve months. After that, I archive the files but cannot guarantee indefinite access; please download and back up your favorites.",
    ],
  },
  {
    eyebrow: "08",
    title: "Usage & rights",
    paragraphs: [
      "I retain copyright in all images. You receive a personal-use license: print, share with family and friends, post online with credit, hang on your walls. Commercial usage — including advertising, resale, or publication beyond personal context — requires a separate written agreement.",
      "I reserve the right to use images from your session in my portfolio, on this site, on social media, in promotional materials, in editorial features, and in teaching or award submissions. If there's a particular image you'd prefer I keep private, just say so — I'm happy to honor that where it doesn't compromise the integrity of a body of work.",
    ],
  },
  {
    eyebrow: "09",
    title: "Your responsibilities",
    paragraphs: [
      "You agree to coordinate access to venues, secure any required permits, communicate scheduling changes promptly, and ensure key participants are aware of the timeline. If a vendor's policies affect our ability to photograph — for example, in a religious ceremony — please flag this in advance so we can plan around it together.",
      "Cooperation on the day matters more than perfection. Bring patience, bring love, bring yourself.",
    ],
  },
  {
    eyebrow: "10",
    title: "Travel",
    paragraphs: [
      "Travel is included within [fifty] miles of the studio's home base in [City, State]. Beyond that, I invoice travel at cost — typically mileage, accommodation where an overnight is required, and any necessary permits or fees — quoted in advance.",
      "Destination commissions are quoted case by case and require a separate travel deposit.",
    ],
  },
  {
    eyebrow: "11",
    title: "Refunds",
    paragraphs: [
      "Because each commission is custom-built around you, refunds beyond the cancellation terms above are rare. Where extraordinary circumstances warrant, I review them case by case. Disputes that we cannot resolve together may be addressed through mediation before any formal legal action.",
    ],
  },
  {
    eyebrow: "12",
    title: "A note on liability",
    paragraphs: [
      "My total liability for any claim related to your commission is capped at the amount you've paid for that commission. I'm not liable for indirect or consequential damages — lost profits, lost opportunities, and the like.",
      "I carry professional liability and equipment insurance, and I take every reasonable precaution to safeguard your images. Even so, no system is infallible; I cannot guarantee against events outside my reasonable control.",
    ],
  },
  {
    eyebrow: "13",
    title: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of [State / Country]. Any disputes will be addressed first through good-faith conversation, then through mediation, and only as a last resort through the appropriate courts of [Jurisdiction].",
      "If any provision of these terms is found unenforceable, the rest remain in full effect.",
    ],
  },
];

export default async function TermsPage() {
  let siteSettings: SiteSettings | null = null;
  try {
    siteSettings = await sanityFetch<SiteSettings | null>({
      query: siteSettingsQuery,
      tags: ["siteSettings"],
    });
  } catch {}

  return (
    <LegalLayout
      eyebrow="Terms"
      title="The shape of our work."
      intro="Plain language for how commissions begin, unfold, and find their way to you. Read slowly — there are no surprises buried in fine print."
      lastUpdated="June 17, 2026"
      sections={SECTIONS}
      backdropSrc="/images/ambient/cream-room.jpg"
      backdropImage={siteSettings?.ambientImage}
      contactEmail={siteSettings?.contactEmail ?? "hello@domusloucis.com"}
    />
  );
}