/**
 * Single source of truth for everything brand- and content-related.
 * Rebrand the whole site by editing this one file.
 *
 * Keep this file free of secrets — it ships to the browser.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://solaredgeindia.example.com";

export type NavItem = { label: string; href: string };

export const site = {
  name: "SolarEdge India",
  shortName: "SolarEdge",
  /** Used in <title> templates, schema, OG. */
  legalName: "SolarEdge Solar Solutions Pvt. Ltd.",
  url: SITE_URL,

  description:
    "Premium residential & commercial solar installations across Delhi NCR — MNRE-certified engineers, 25-year performance guarantee, and ₹0-down financing.",

  tagline: {
    // The hero headline. `accent` gets the gradient highlight.
    lead: "Own Your Energy",
    accent: "Independence.",
    sub: "Custom solar systems for Delhi NCR homes — cut your electricity bill, own your power, and gain true energy freedom.",
  },

  phone: { display: "+91 98765 43210", tel: "+919876543210" },
  email: "info@solaredgeindia.in",

  address: {
    street: "B-42, Connaught Place",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110001",
    country: "IN",
  },

  /** Local-SEO service areas. */
  areasServed: [
    "Delhi",
    "Noida",
    "Gurgaon",
    "Faridabad",
    "Ghaziabad",
    "Greater Noida",
    "Dwarka",
    "Gurugram",
  ],

  /** Geo coordinates for LocalBusiness schema (Connaught Place, New Delhi). */
  geo: { latitude: 28.6315, longitude: 77.2167 },

  hours: "Mo-Sa 09:00-19:00",

  /** Trust signals surfaced near CTAs. */
  trust: {
    licenseNo: "MNRE/EMP/2020/DL-4782",
    yearsInBusiness: 9,
    installs: 1800,
    rating: 4.8,
    reviews: 620,
    warrantyYears: 25,
    homesPowered: "200+",
    totalSaved: "₹18 Cr+",
  },

  /** Credibility badges for the trust bar. */
  certifications: [
    "MNRE Empanelled",
    "BEE Certified Installers",
    "Tier-1 Equipment",
    "25-Year Warranty",
  ],

  /** "Why solar" benefit cards. `icon` keys map to SVGs in the Benefits component. */
  benefits: [
    {
      icon: "savings",
      title: "Cut your electricity bill",
      body: "Delhi electricity rates are rising every year. Lock in free solar energy and reduce your bill by up to 90% — permanently.",
    },
    {
      icon: "independence",
      title: "Beat power cuts",
      body: "Pair panels with battery storage to power your home through outages, peak-hour rates, and grid failures.",
    },
    {
      icon: "value",
      title: "Boost your property value",
      body: "Solar properties command a premium in Delhi NCR. Your roof becomes a revenue-generating asset, not a liability.",
    },
    {
      icon: "shield",
      title: "25-year peace of mind",
      body: "Tier-1 panels with industry-leading performance warranty — and our team monitors your system for life.",
    },
    {
      icon: "leaf",
      title: "Clean energy for India",
      body: "Every system offsets tons of CO₂ annually — and helps India reach its 500 GW renewable energy target.",
    },
    {
      icon: "monitor",
      title: "Smart app monitoring",
      body: "Track your production, savings, and battery levels in real time — right from your phone.",
    },
  ],

  /** Installation journey steps. */
  process: [
    {
      title: "Free site assessment",
      body: "Our engineer visits your rooftop, checks shadow angles, structural load, and your DISCOM meter — at no cost.",
    },
    {
      title: "Custom design & quote",
      body: "We size your system precisely for your consumption, roof layout, and budget. Transparent pricing, no hidden charges.",
    },
    {
      title: "Net metering & approvals",
      body: "We handle all DISCOM paperwork, net metering application, and society/RWA approvals so you don't have to follow up once.",
    },
    {
      title: "Professional installation",
      body: "MNRE-certified crews install in 1–2 days and leave your terrace cleaner than they found it.",
    },
    {
      title: "Power on & earn credits",
      body: "After DISCOM inspection we switch you on — excess units go back to the grid and appear as credits on your next bill.",
    },
  ],

  /** Nodes for the energy-flow visualization (How solar works). */
  energyFlow: [
    { icon: "sun", label: "Sunlight", sub: "Free fuel" },
    { icon: "panel", label: "Panels", sub: "Capture" },
    { icon: "inverter", label: "Inverter", sub: "Convert" },
    { icon: "battery", label: "Battery", sub: "Store" },
    { icon: "home", label: "Your home", sub: "Power" },
  ],

  /** Financing options. Replace per client with real lender terms. */
  financing: [
    {
      name: "₹0-Down EMI",
      tag: "Most popular",
      blurb:
        "Own your system from day one with nothing upfront. Your monthly EMI is often less than your current electricity bill.",
      points: [
        "No money down",
        "Keep the PM Surya Ghar subsidy",
        "Fixed, predictable EMI",
      ],
    },
    {
      name: "Cash Purchase",
      tag: "Best lifetime ROI",
      blurb:
        "Pay once and maximize every rupee of savings. Fastest payback and the largest 25-year return.",
      points: [
        "Lowest total cost",
        "Highest long-term savings",
        "Full subsidy benefit",
      ],
    },
    {
      name: "Solar Lease",
      tag: null,
      blurb:
        "Go solar with zero upfront cost and a simple monthly rental. Maintenance and monitoring included.",
      points: [
        "Zero barrier to entry",
        "Maintenance included",
        "Predictable monthly rate",
      ],
    },
  ],

  testimonials: [
    {
      name: "Rajesh K.",
      city: "Noida",
      rating: 5,
      text: "Bill dropped from ₹8,500/mo to ₹420. Installation was clean and done in a day. Best investment I've made for my home.",
      saved: "₹97,000/yr",
      system: "8 kW + battery",
    },
    {
      name: "Priya & Amit S.",
      city: "Gurgaon",
      rating: 5,
      text: "SolarEdge handled all the DISCOM and RWA approvals. We didn't follow up even once. Already saving ₹7,000 every month.",
      saved: "₹84,000/yr",
      system: "10 kW panels",
    },
    {
      name: "Vikram M.",
      city: "Delhi",
      rating: 5,
      text: "Was skeptical about ROI. The monitoring app proves it — system will pay for itself in under 5 years. Wish I had done this sooner.",
      saved: "₹68,000/yr",
      system: "6 kW panels",
    },
  ],

  faq: [
    {
      q: "How much will I save on my electricity bill?",
      a: "Most Delhi NCR homeowners reduce their bill by 80–90%. Exact savings depend on your current consumption, DISCOM tariff slab, and system size. Our free assessment gives you exact numbers.",
    },
    {
      q: "How long does the whole process take?",
      a: "Installation takes 1–2 days. DISCOM net metering approval takes 4–8 weeks. From signed contract to first power-on is typically 6–10 weeks.",
    },
    {
      q: "What about monsoon season and cloudy days?",
      a: "Panels still produce on cloudy days — at 20–30% capacity. Delhi gets 300+ sunny days a year, so annual production numbers remain strong. Battery storage covers you through outages.",
    },
    {
      q: "Do I need DISCOM approval and net metering?",
      a: "Yes, and we handle it entirely. Net metering lets you export excess units to the grid and earn credits. We manage the entire application with BSES/TPDDL so you don't have to do anything.",
    },
    {
      q: "What subsidies are available?",
      a: "Under PM Surya Ghar Muft Bijli Yojana, residential systems get ₹30,000–₹78,000 in central subsidy. We handle subsidy paperwork as part of our service.",
    },
    {
      q: "Can I go solar with ₹0 upfront?",
      a: "Yes. Our ₹0-down EMI option means your monthly payment is typically lower than your current electricity bill. You keep the full government subsidy — we handle setup.",
    },
  ],

  nav: [
    { label: "Why solar", href: "#benefits" },
    { label: "Process", href: "#process" },
    { label: "Savings", href: "#savings" },
    { label: "Results", href: "#case-studies" },
    { label: "Financing", href: "#financing" },
    { label: "FAQ", href: "#faq" },
  ] satisfies NavItem[],

  cta: {
    primary: { label: "Get a free quote", href: "#quote" },
    secondary: { label: "Estimate my savings", href: "#savings" },
    call: { label: "Call now", href: "" },
  },

  social: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/company/",
    youtube: "https://youtube.com/",
  },

  legal: {
    privacyHref: "/privacy",
    termsHref: "/terms",
  },
} as const;

export type Site = typeof site;
