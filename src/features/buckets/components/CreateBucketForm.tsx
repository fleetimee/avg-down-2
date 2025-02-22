"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBucketAction } from "../actions/create-bucket.action";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function CreateBucketForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [state, formAction] = useFormState(createBucketAction, null);

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Success",
        description: state.message,
      });
      router.push("/bucket-main");
    } else if (state?.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
      if (state.message.includes("must be logged in")) {
        router.push("/sign-in");
      }
    }
  }, [state, router, toast]);

  return (
    <form action={formAction} className="space-y-4">
      <FormItem>
        <FormLabel>Coin Symbol</FormLabel>
        <FormControl>
          <Input name="coin_symbol" placeholder="btc" className="uppercase" />
        </FormControl>
        {state?.errors?.find((e) => e.field === "coin_symbol") && (
          <FormMessage>
            {state.errors.find((e) => e.field === "coin_symbol")?.message}
          </FormMessage>
        )}
      </FormItem>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="reverse" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit">Create Bucket</Button>
      </div>
    </form>
  );
}
