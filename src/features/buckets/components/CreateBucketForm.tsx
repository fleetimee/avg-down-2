// app/components/CreateBucketForm.tsx
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBucketAction } from "../actions/create-bucket.action";
import { useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="coin_symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coin Symbol</FormLabel>
              <FormControl>
                <Input placeholder="btc" className="uppercase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="reverse" onClick={() => router.back()}>
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
