import { getAnalytics, isSupported } from "firebase/analytics";
import React from "react";
import { getFirebaseApp } from "@/config/firebase";

export function Analytics() {
  if (typeof window === "undefined") return null;

  return <FirebaseAnalytics />;
}

function FirebaseAnalytics() {
  const [analytics, setAnalytics] = React.useState<ReturnType<typeof getAnalytics> | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    isSupported().then((supported) => {
      if (!cancelled && supported) {
        const app = getFirebaseApp();
        if (app) setAnalytics(getAnalytics(app));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
