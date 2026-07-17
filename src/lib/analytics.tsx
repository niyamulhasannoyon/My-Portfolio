import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import React from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC8dARkCRO71qvp1ofzHdk1n3sDMaLgbQw",
  authDomain: "niyamul-portfolio.firebaseapp.com",
  projectId: "niyamul-portfolio",
  storageBucket: "niyamul-portfolio.firebasestorage.app",
  messagingSenderId: "275337245683",
  appId: "1:275337245683:web:fa5150911165e8ed549886",
  measurementId: "G-KM4FS4JGMV",
};

const app = initializeApp(firebaseConfig);

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
        setAnalytics(getAnalytics(app));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
