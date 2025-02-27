"use client";

import { Loader2, Wallet2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthForm } from "../hooks/use-auth-form";
import { AuthFormFields } from "./auth-form-fields";
import { GithubButton } from "./github-button";
import { GoogleButton } from "./google-button";
import { Separator } from "@/components/ui/separator";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const { form, isLoading, onSubmit } = useAuthForm({ mode });

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <Wallet2 className="mx-auto h-10 w-10 text-yellow-400 animate-bounce" />
        <h1 className="text-2xl font-bold">
          {mode === "signin" ? "FleeDCA Sign In" : "FleeDCA Sign Up"}
        </h1>
        <p className="text-muted-foreground">
          {mode === "signin"
            ? "Enter your credentials to access your account"
            : "Create a new account"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <AuthFormFields mode={mode} form={form} isLoading={isLoading} />

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full gap-2 h-12 text-base"
              disabled={isLoading}
              variant={"neutral"}
            >
              {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
              {isLoading
                ? "Processing..."
                : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
            </Button>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <GithubButton />
              <GoogleButton />
            </div>

            <div className="text-center text-sm pt-4">
              {mode === "signin" ? (
                <p>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-blue-600 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
