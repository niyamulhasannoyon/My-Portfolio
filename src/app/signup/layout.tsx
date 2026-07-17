import { AuthProvider } from "@/contexts/auth-context";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}