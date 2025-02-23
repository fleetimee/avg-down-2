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
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { createTransactionAction } from "../actions/create-transaction.action";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  quantity: z.coerce.number().positive("Quantity must be positive"),
  price_per_coin: z.coerce.number().positive("Price must be positive"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTransactionFormProps {
  bucketId: string;
}

export function CreateTransactionForm({
  bucketId,
}: CreateTransactionFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      price_per_coin: 0,
    },
  });

  const onSubmit = (values: FormValues) => {
    setErrorMessage(null);
    startTransition(async () => {
      const formData = new FormData();
      formData.set("quantity", values.quantity.toString());
      formData.set("price_per_coin", values.price_per_coin.toString());

      const result = await createTransactionAction(bucketId, formData);

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
            Enter the quantity and price per coin for your new transaction.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price_per_coin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per coin (Rp)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
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

        <div className="flex justify-end gap-4">
          <Button type="button" variant="neutral" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
