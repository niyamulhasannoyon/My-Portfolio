import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body as { name?: string; email?: string; message?: string };

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 422 });
  }

  // TODO: wire to Resend / HubSpot / your CRM using env vars.
  // Example: await fetch("https://api.resend.com/emails", {...})
  console.log("[contact] new lead", { name, email, to: siteConfig.email });

  return NextResponse.json({ ok: true });
}
