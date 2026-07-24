"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/config/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  createAccount: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const ALLOWED_ADMIN_EMAIL = "niyamulhasanbd@gmail.com";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.email !== ALLOWED_ADMIN_EMAIL) {
        firebaseSignOut(auth);
        setUser(null);
      } else {
        setUser(firebaseUser);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (email !== ALLOWED_ADMIN_EMAIL) {
      throw new Error(`Access Denied: Only ${ALLOWED_ADMIN_EMAIL} is authorized.`);
    }
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res.user.email !== ALLOWED_ADMIN_EMAIL) {
      await firebaseSignOut(auth);
      throw new Error(`Access Denied: Only ${ALLOWED_ADMIN_EMAIL} is authorized.`);
    }
  }, []);

  const createAccount = useCallback(async (email: string, password: string) => {
    if (email !== ALLOWED_ADMIN_EMAIL) {
      throw new Error(`Public sign-up is disabled. Only ${ALLOWED_ADMIN_EMAIL} is authorized.`);
    }
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res.user.email !== ALLOWED_ADMIN_EMAIL) {
      await firebaseSignOut(auth);
      throw new Error(`Access Denied: Only ${ALLOWED_ADMIN_EMAIL} is authorized.`);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if (result.user.email !== ALLOWED_ADMIN_EMAIL) {
      await firebaseSignOut(auth);
      throw new Error(`Access Denied: ${result.user.email} is not authorized. Only ${ALLOWED_ADMIN_EMAIL} can access the Admin Panel.`);
    }
  }, []);

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, createAccount, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
