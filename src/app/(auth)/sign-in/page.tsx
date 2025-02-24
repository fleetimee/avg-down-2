import { AuthForm } from "@/features/auth/components/auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account to manage your cryptocurrency investments",
  openGraph: {
    title: "Sign In",
    description: "Sign in to your account to manage your cryptocurrency investments",
  },
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
