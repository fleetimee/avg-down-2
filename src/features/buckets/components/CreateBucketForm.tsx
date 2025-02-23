"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBucketAction } from "../actions/create-bucket.action";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  coin_symbol: z.string().min(1, "Coin symbol is required").toLowerCase(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateBucketForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coin_symbol: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("coin_symbol", values.coin_symbol);

      const result = await createBucketAction(formData);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        router.push("/bucket-main");
      } else {
        setErrorMessage(result.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Enter the symbol of the cryptocurrency you want to track (e.g., btc for Bitcoin, eth for Ethereum).
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="coin_symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coin Symbol</FormLabel>
              <FormControl>
                <Input 
                  placeholder="btc" 
                  className="uppercase" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                The trading symbol for your cryptocurrency (e.g., BTC, ETH, SOL)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <Button 
            type="button" 
            variant="default"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating Bucket..." : "Create Bucket"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
