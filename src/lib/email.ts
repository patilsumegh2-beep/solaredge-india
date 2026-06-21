import type { LeadInput } from "./schemas";
import { PROPERTY_LABELS, TIMEFRAME_LABELS } from "./schemas";

/** Strip CR/LF so validated values can never be used for header injection. */
function oneLine(s: string) {
  return s.replace(/[\r\n]+/g, " ").trim();
}

function renderLeadText(lead: LeadInput, meta: { ip: string }) {
  // Plain text only — no HTML is constructed from user input, so there is no
  // XSS/HTML-injection surface in the delivered email.
  return [
    "New solar quote request",
    "------------------------",
    `Name:        ${lead.name}`,
    `Email:       ${lead.email}`,
    `Phone:       ${lead.phone}`,
    `ZIP:         ${lead.zip}`,
    `Property:    ${PROPERTY_LABELS[lead.propertyType]}`,
    `Monthly bill:$${lead.monthlyBill}`,
    `Timeframe:   ${TIMEFRAME_LABELS[lead.timeframe]}`,
    "",
    "Message:",
    lead.message ? lead.message : "(none)",
    "",
    "------------------------",
    `Submitted from IP: ${meta.ip}`,
    `At: ${new Date().toISOString()}`,
  ].join("\n");
}

/**
 * Deliver a lead via Resend's REST API (no SDK dependency). If the API key /
 * addresses are not configured, logs server-side and reports not-delivered —
 * so local/demo runs never crash and never silently swallow a real failure.
 */
export async function deliverLead(
  lead: LeadInput,
  meta: { ip: string },
): Promise<{ delivered: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;

  if (!key || !to || !from) {
    console.info("[lead] email disabled — captured lead:", {
      name: lead.name,
      email: lead.email,
      zip: lead.zip,
      monthlyBill: lead.monthlyBill,
    });
    return { delivered: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: oneLine(`New solar lead — ${lead.name} (${lead.zip})`),
      text: renderLeadText(lead, meta),
    }),
  });

  if (!res.ok) {
    console.error("[lead] Resend delivery failed:", res.status);
    throw new Error("email_delivery_failed");
  }
  return { delivered: true };
}
