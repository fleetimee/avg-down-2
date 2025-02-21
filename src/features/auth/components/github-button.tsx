"use client";

import { useState } from "react";
import { Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export function GithubButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social(
        {
          provider: "github",
        },
        {
          onSuccess: () => {
            setIsLoading(false);

            toast({
              title: "Success",
              description: "Signed in with GitHub successfully.",
            });
          },
          onError: (error) => {
            console.error("GitHub sign in error:", error);
            toast({
              title: "Error",
              description: error.error.message,
              variant: "destructive",
            });
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.error("GitHub sign in failed:", error);
      toast({
        title: "Error",
        description: "Failed to sign in with GitHub. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="default"
      className="w-full gap-2 h-12 text-base"
      onClick={handleGithubSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Github className="h-5 w-5" />
      )}
      Continue with GitHub
    </Button>
  );
}
