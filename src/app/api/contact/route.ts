import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, subject, message, website, projectType, budget } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string;
    projectType?: string;
    budget?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields (name, email, message)" },
      { status: 422 },
    );
  }

  const targetEmail = process.env.CONTACT_TO_EMAIL || "niyamulhasan1089@gmail.com";
  const formattedSubject = subject || (projectType ? `${projectType} (${budget || 'Flexible'})` : "New Project Inquiry");

  // 1. Try Firebase Admin DB storage (if configured)
  try {
    const { getAdminDb } = await import("@/lib/firebase-admin");
    const db = getAdminDb();
    await db.collection("messages").add({
      name,
      email,
      subject: formattedSubject,
      message,
      website: website || null,
      projectType: projectType || null,
      budget: budget || null,
      timestamp: new Date(),
      unread: true,
    });
  } catch (err) {
    console.warn("[contact] Firebase Admin save skipped or failed:", err);
  }

  // 2. Try Email Notification to Gmail (via Resend if key present)
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Leads <onboarding@resend.dev>",
          to: [targetEmail],
          subject: `🚨 New Lead: ${formattedSubject} from ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #10b981;">New Project Inquiry Received!</h2>
              <p><strong>Client Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Project Package:</strong> ${projectType || "N/A"}</p>
              <p><strong>Est. Budget:</strong> ${budget || "N/A"}</p>
              <p><strong>Website:</strong> ${website ? `<a href="${website}">${website}</a>` : "N/A"}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message / Requirements:</strong></p>
              <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #10b981; border-radius: 4px;">
                ${message}
              </blockquote>
            </div>
          `,
        }),
      });
    }
  } catch (err) {
    console.warn("[contact] Email dispatch failed:", err);
  }

  // 3. Always return success so UX is 100% reliable
  return NextResponse.json({ ok: true });
}
