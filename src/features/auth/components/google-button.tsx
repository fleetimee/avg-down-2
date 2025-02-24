"use client";

import { useState } from "react";
import { Chrome, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social(
        {
          provider: "google",
        },
        {
          onSuccess: () => {
            setIsLoading(false);
          },
          onError: (error) => {
            console.error("Google sign in error:", error);

            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.error("Google sign in failed:", error);
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
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
      onClick={handleGoogleSignIn}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Chrome className="h-5 w-5" />
      )}
    </Button>
  );
}
