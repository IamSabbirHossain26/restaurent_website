import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/validation";

/**
 * Contact form boundary.
 *
 * Currently runs in DEMO MODE: validates the payload and returns
 * `{ ok: true, mode: "demo" }` without sending an email or storing data.
 * Wire `RESEND_API_KEY` / SMTP / CRM webhook here for production.
 */
export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  return NextResponse.json({
    ok: true,
    mode: "demo",
  });
}
