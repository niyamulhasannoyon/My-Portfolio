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

  try {
    // Lazy-import Firebase Admin only at runtime to avoid build-time resolution
    const { getAdminDb } = await import("@/lib/firebase-admin");
    const db = getAdminDb();
    
    const formattedSubject = subject || (projectType ? `${projectType} (${budget || 'Flexible'})` : "New Project Inquiry");

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Firestore write failed", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
