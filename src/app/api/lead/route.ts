import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { deliverLead } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  return xff?.split(",")[0]?.trim() || "unknown";
}

function fail(status: number, error: string) {
  return NextResponse.json(
    { ok: false, error },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

/** Silently accept-and-drop suspected bots so they get no useful signal. */
function silentDrop() {
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}

async function verifyTurnstile(token: string | undefined, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // CAPTCHA disabled
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // 1) CSRF: enforce same-origin in production (browsers always send Origin on POST).
  if (process.env.NODE_ENV === "production") {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin) {
      try {
        if (new URL(origin).host !== host) return fail(403, "Invalid origin.");
      } catch {
        return fail(403, "Invalid origin.");
      }
    }
  }

  // 2) Rate limit per IP.
  const ip = clientIp(req);
  const rl = rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": String(rl.retryAfterSeconds),
        },
      },
    );
  }

  // 3) Parse + validate (never trust the client).
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return fail(400, "Invalid request.");
  }
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return fail(400, "Please check the form and try again.");
  const lead = parsed.data;

  // 4) Honeypot + time-trap — drop bots silently.
  if (lead.company) return silentDrop();
  if (typeof lead.elapsedMs === "number" && lead.elapsedMs < 2500) {
    return silentDrop();
  }

  // 5) CAPTCHA (only enforced when TURNSTILE_SECRET_KEY is set).
  if (!(await verifyTurnstile(lead.turnstileToken, ip))) {
    return fail(400, "Verification failed. Please try again.");
  }

  // 6) Deliver.
  try {
    await deliverLead(lead, { ip });
  } catch {
    return fail(500, "Something went wrong on our end. Please call us instead.");
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
