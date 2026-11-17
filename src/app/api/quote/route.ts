import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { validateQuote, type QuotePayload } from "@/lib/validation";

/**
 * Quote submission boundary.
 *
 * Currently runs in DEMO MODE: validates the payload with the same rules as
 * the client form and returns `{ ok: true, mode: "demo" }` without persisting
 * or sending emails.
 *
 * To connect a real backend:
 * 1. Configure an email provider (e.g. Resend / Postmark) or CRM webhook via
 *    environment variables (e.g. `RESEND_API_KEY`, `QUOTE_RECIPIENT_EMAIL`).
 * 2. Dispatch the validated payload there and return `{ ok: true, mode: "live" }`.
 */
export async function POST(request: Request) {
  let payload: QuotePayload;
  try {
    payload = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const errors = validateQuote(payload, {
    minLeadDays: site.booking.minLeadDays,
    maxGuests: site.booking.maxGuests,
  });

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  return NextResponse.json({
    ok: true,
    mode: "demo",
  });
}
