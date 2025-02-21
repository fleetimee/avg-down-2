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

interface AuthFormProps {
  mode: "signin" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const { form, isLoading, onSubmit } = useAuthForm({ mode });

  return (
    <Card className="w-full">
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
      <CardContent className="pb-12 px-10">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-10">
            <AuthFormFields mode={mode} form={form} isLoading={isLoading} />

            <br />

            <div className="pt-8">
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
            </div>

            <br />

            <div className="text-center text-sm pt-32">
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
