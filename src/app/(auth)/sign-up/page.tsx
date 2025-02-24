import { AuthForm } from "@/features/auth/components/auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a new account to start tracking your cryptocurrency investments",
  openGraph: {
    title: "Sign Up",
    description:
      "Create a new account to start tracking your cryptocurrency investments",
  },
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}
