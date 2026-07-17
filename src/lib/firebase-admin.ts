import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!privateKey || !process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
    throw new Error(
      "Firebase Admin credentials missing. Check FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY in .env.local",
    );
  }

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

let cachedAdminDb: ReturnType<typeof getFirestore> | null = null;

export function getAdminDb() {
  if (!cachedAdminDb) {
    cachedAdminDb = getFirestore(getAdminApp());
  }
  return cachedAdminDb;
}

export async function verifyAuth(token: string) {
  try {
    const { getAuth } = await import("firebase-admin/auth");
    return await getAuth(getAdminApp()).verifyIdToken(token);
  } catch {
    return null;
  }
}
