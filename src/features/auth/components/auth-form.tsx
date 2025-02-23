"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useAuthForm } from "../hooks/use-auth-form";
import { AuthFormFields } from "./auth-form-fields";
import { GithubButton } from "./github-button";
import { Separator } from "@/components/ui/separator";

interface AuthFormProps {
  mode: "signin" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const { form, isLoading, onSubmit } = useAuthForm({ mode });

  return (
    <Card className="w-full backdrop-blur-none bg-white/70 border-0 shadow-none">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </CardTitle>
        <CardDescription className="text-center">
          {mode === "signin"
            ? "Enter your credentials to access your account"
            : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-16 px-6 sm:px-10">
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col">
            <div className="space-y-8 mb-6">
              <AuthFormFields mode={mode} form={form} isLoading={isLoading} />
            </div>

            <div className=" space-y-10">
              <div className="space-y-6">
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

                <Separator className="my-4" />

                <GithubButton />
              </div>

              <div className="text-center text-sm pt-2">
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
      </CardContent>
    </Card>
  );
}
