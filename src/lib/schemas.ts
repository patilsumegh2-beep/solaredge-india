import { z } from "zod";

export const PROPERTY_TYPES = [
  "single-family",
  "townhouse",
  "multi-family",
  "commercial",
] as const;

export const TIMEFRAMES = [
  "asap",
  "1-3-months",
  "3-6-months",
  "researching",
] as const;

export const PROPERTY_LABELS: Record<(typeof PROPERTY_TYPES)[number], string> = {
  "single-family": "Single-family home",
  townhouse: "Townhouse",
  "multi-family": "Multi-family",
  commercial: "Commercial",
};

export const TIMEFRAME_LABELS: Record<(typeof TIMEFRAMES)[number], string> = {
  asap: "As soon as possible",
  "1-3-months": "In 1–3 months",
  "3-6-months": "In 3–6 months",
  researching: "Just researching",
};

// Permissive enough for international/US formats, strict enough to block junk.
const phoneRegex = /^[\d\s().+-]{7,20}$/;
const zipRegex = /^\d{5}(-\d{4})?$/;

/**
 * The single source of truth for lead validation — imported by BOTH the client
 * form (instant feedback) and the server route (never trust the client).
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address")
    .max(120),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Enter a valid phone number"),
  zip: z.string().trim().regex(zipRegex, "Enter a valid ZIP code"),
  propertyType: z.enum(PROPERTY_TYPES),
  monthlyBill: z.coerce
    .number({ message: "Enter your monthly bill" })
    .int()
    .min(20, "That seems low — enter your average monthly bill")
    .max(10000, "Enter a realistic monthly bill"),
  timeframe: z.enum(TIMEFRAMES),
  message: z.string().trim().max(1000).optional().or(z.literal("")),

  // --- anti-spam (validated server-side, never shown to humans) ---
  /**
   * Honeypot: real users never fill this; bots do. Accepted by the schema (so
   * the request validates) then silently dropped in the route — bots get no
   * signal that they were detected.
   */
  company: z.string().max(200).optional(),
  /** Milliseconds from form mount to submit — sub-second = bot. */
  elapsedMs: z.coerce.number().nonnegative().optional(),
  /** Cloudflare Turnstile token (only when CAPTCHA is enabled). */
  turnstileToken: z.string().max(4096).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Field groups for per-step client validation in the multi-step form. */
export const stepFields = {
  1: ["propertyType", "monthlyBill", "zip"],
  2: ["timeframe", "message"],
  3: ["name", "email", "phone"],
} as const;
