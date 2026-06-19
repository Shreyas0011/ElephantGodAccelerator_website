// ================================================================
// Shared Site Content — Types, Defaults & Storage Helpers
// Used by both the Admin CMS and the public-facing pages
// ================================================================

export interface HeroContent {
  badge: string;
  headline: string;
  subheadline: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  stat3Value: string;
}

export interface ServiceItem {
  tag: string;
  title: string;
  desc: string;
  highlight1: string;
  highlight2: string;
  highlight3: string;
}

export interface CapitalNode {
  key: string;
  title: string;
  stage: string;
  ticket: string;
  desc: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  title: string;
  impact: string;
}

export interface ExpertiseItem {
  number: string;
  title: string;
  badge: string;
  desc: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badge: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface SiteContent {
  hero: HeroContent;
  services: ServiceItem[];
  capitalNodes: CapitalNode[];
  testimonials: TestimonialItem[];
  expertise: ExpertiseItem[];
  pricing: PricingTier[];
}

// ─── Defaults ──────────────────────────────────────────────────
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: "Venture Acceleration & Operational Growth Platform",
    headline: "We build the operational systems that turn startups into Market Leaders",
    subheadline:
      "Elephant God Accelerator works alongside founders as hands-on execution partners, driving Go-To-Market blueprints, compliance systems, B2B sales automation, and institutional fundraising.",
    stat1Label: "Vetted Cohort Startups",
    stat1Value: "18",
    stat2Label: "Recurring Overhead Saved",
    stat2Value: "40",
    stat3Label: "Institutional Partners",
    stat3Value: "50",
  },
  services: [
    {
      tag: "Digital",
      title: "End-to-End Website Development",
      desc: "Design, build, and optimize scalable websites tailored to your business objectives — from architecture and UX to performance and SEO.",
      highlight1: "Custom UI/UX Design",
      highlight2: "Performance Optimization",
      highlight3: "SEO Architecture",
    },
    {
      tag: "Advisory",
      title: "Comprehensive Business & Technology Audits",
      desc: "Detailed assessments across operations, technology, and processes — identifying inefficiencies and surfacing high-leverage improvement opportunities.",
      highlight1: "Ops & Tech Review",
      highlight2: "Process Gap Analysis",
      highlight3: "Improvement Roadmap",
    },
    {
      tag: "Governance",
      title: "Business Hygiene Checks",
      desc: "Establish governance, compliance frameworks, documentation standards, and operational best practices to ensure organizational readiness.",
      highlight1: "Compliance Frameworks",
      highlight2: "Documentation Standards",
      highlight3: "Governance Setup",
    },
    {
      tag: "Strategy",
      title: "Strategic Roadmap Creation",
      desc: "Clear execution plans and growth roadmaps aligned with short- and long-term goals — turning vision into structured, actionable milestones.",
      highlight1: "90-Day Sprints",
      highlight2: "OKR Alignment",
      highlight3: "Milestone Planning",
    },
    {
      tag: "Fundraising",
      title: "Investor Pitch Deck Preparation",
      desc: "Compelling pitch decks with refined messaging, financial narratives, and go-to-market strategies that resonate with institutional investors.",
      highlight1: "Financial Narrative",
      highlight2: "GTM Strategy",
      highlight3: "Investor Matchmaking",
    },
    {
      tag: "Leadership",
      title: "CEO, CXO & CFO Mentorship",
      desc: "Leadership guidance, strategic advisory, and executive mentoring to support decision-making, team structuring, and organizational growth.",
      highlight1: "1:1 Executive Mentoring",
      highlight2: "Decision Frameworks",
      highlight3: "Leadership Coaching",
    },
  ],
  capitalNodes: [
    {
      key: "angels",
      title: "Angel Networks",
      stage: "Pre-Seed / Seed",
      ticket: "₹10L - ₹50L",
      desc: "Early syndicates and HNI pools focused on validating initial product concepts and prototype traction.",
    },
    {
      key: "family",
      title: "Family Offices",
      stage: "Seed / Series A",
      ticket: "₹50L - ₹2Cr",
      desc: "Long-term, patient institutional capital looking for sustainable unit economics and corporate governance.",
    },
    {
      key: "vc",
      title: "Venture Capitals",
      stage: "Series A / Series B",
      ticket: "₹2Cr - ₹10Cr",
      desc: "Institutional growth-stage funds scaling established PMF models to national and global levels.",
    },
    {
      key: "strategic",
      title: "Strategic Investors",
      stage: "Growth Stage",
      ticket: "Custom Ticket",
      desc: "Industry experts and joint-venture partners offering proprietary channel distribution and regulatory support.",
    },
    {
      key: "corp",
      title: "Corporate Venture",
      stage: "Syndicate / M&A",
      ticket: "Above ₹5Cr",
      desc: "Large enterprise conglomerates matching technology architectures with parent systems for acquisition or integration.",
    },
  ],
  testimonials: [
    {
      quote:
        "ElephantGod Accelerator did not just consult us; they became our operational execution department. We optimized our core unit economics and restructured our CRM pipeline, leading to a 40% save in operating expenses.",
      author: "Venkata Raman",
      title: "Co-Founder, Ingo Electric",
      impact: "40% Ops Savings",
    },
    {
      quote:
        "Mr. Ramani Iyer's active guidance helped us structure our distribution system. The shared services support for compliance and MCA audits saved us months of overhead.",
      author: "Radha Krishnan",
      title: "Founder, Ammamma's",
      impact: "MCA Compliance Cleared",
    },
  ],
  expertise: [
    {
      number: "01",
      title: "Startup Accelerator India",
      badge: "Acceleration",
      desc: "A structured program that accelerates early-stage startups through mentorship, resources, and networking over 3–6 months, helping them refine business models and scale rapidly.",
    },
    {
      number: "02",
      title: "Startup Funding India",
      badge: "Capital",
      desc: "Provides seed to growth-stage capital — including up to ₹50 lakhs via the Startup India Seed Fund Scheme — for prototype development, product trials, and market entry.",
    },
    {
      number: "03",
      title: "Angel Investor Network India",
      badge: "Network",
      desc: "India's largest B2B network connecting startups with active angel investors from diverse professional backgrounds for early investment and strategic partnerships.",
    },
    {
      number: "04",
      title: "Startup Mentorship India",
      badge: "Mentorship",
      desc: "Curated guidance from experienced entrepreneurs and industry experts to refine business strategies, improve product-market fit, and accelerate growth.",
    },
    {
      number: "05",
      title: "Venture Accelerator Bengaluru",
      badge: "Bengaluru",
      desc: "Bengaluru-focused accelerator programs offering localized mentorship, investor connections, and growth support for tech startups in India's startup hub.",
    },
    {
      number: "06",
      title: "Venture Accelerator India",
      badge: "Multi-Stage",
      desc: "Multi-stage, fund-led accelerator supporting 200+ startups across GenAI, fintech, SaaS, and healthtech with funding, mentorship, and global expansion support.",
    },
    {
      number: "07",
      title: "Startup Growth Consulting India",
      badge: "Consulting",
      desc: "Strategic consulting for scaling startups — covering GTM strategy, sales pipeline creation, user interface design, and organizational capability building.",
    },
  ],
  pricing: [
    {
      id: "advisory",
      name: "Advisory Track",
      badge: "Entry",
      price: "₹75,000",
      period: "/ engagement",
      description: "For early-stage startups seeking structured mentorship and foundational operational support.",
      features: [
        "2 × Monthly 1:1 Mentor Sessions",
        "Startup Readiness Assessment",
        "Basic Compliance Checklist",
        "Email Support (48h Response)",
        "Access to EGA Resource Library",
      ],
      cta: "Apply Now",
      highlighted: false,
    },
    {
      id: "accelerator",
      name: "Accelerator Program",
      badge: "Most Popular",
      price: "₹2,50,000",
      period: "/ 6-week sprint",
      description: "Full operational execution sprint — our flagship program for growth-stage startups ready to scale.",
      features: [
        "6-Week Dedicated Execution Sprint",
        "GTM & CRM Automation Setup",
        "Investor Pitch Deck Refinement",
        "Cap Table & 3-Year Financial Model",
        "Compliance & MCA Audit",
        "Investor Syndicate Matchmaking",
        "Priority Support (12h Response)",
      ],
      cta: "Apply for Cohort",
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Partner",
      badge: "Custom",
      price: "Custom",
      period: "/ bespoke engagement",
      description: "For scale-stage companies requiring deep strategic partnership, board advisory, and capital syndication.",
      features: [
        "Dedicated EGA Partner Embedded",
        "Ongoing GTM & Sales Operations",
        "Board-Level Advisory Access",
        "Multi-round Capital Matchmaking",
        "Full Legal & Compliance Management",
        "Technology Architecture Reviews",
        "Dedicated Slack Channel (24h Support)",
      ],
      cta: "Contact Us",
      highlighted: false,
    },
  ],
};

// ─── Storage Helpers ────────────────────────────────────────────
const CONTENT_KEY = "ega_site_content";

export function loadSiteContent(): SiteContent {
  if (typeof window === "undefined") return DEFAULT_CONTENT;
  try {
    const stored = localStorage.getItem(CONTENT_KEY);
    if (!stored) return DEFAULT_CONTENT;
    // Deep-merge stored with defaults so new fields always exist
    const parsed = JSON.parse(stored) as Partial<SiteContent>;
    return {
      hero: { ...DEFAULT_CONTENT.hero, ...parsed.hero },
      services: parsed.services?.length ? parsed.services : DEFAULT_CONTENT.services,
      capitalNodes: parsed.capitalNodes?.length ? parsed.capitalNodes : DEFAULT_CONTENT.capitalNodes,
      testimonials: parsed.testimonials?.length ? parsed.testimonials : DEFAULT_CONTENT.testimonials,
      expertise: parsed.expertise?.length ? parsed.expertise : DEFAULT_CONTENT.expertise,
      pricing: parsed.pricing?.length ? parsed.pricing : DEFAULT_CONTENT.pricing,
    };
  } catch {
    return DEFAULT_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent): void {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
}

export function resetSiteContent(): void {
  localStorage.removeItem(CONTENT_KEY);
}
