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
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { updateTransactionAction } from "../actions/update-transaction.action";
import { UpdateTransactionSchema } from "../schemas/update-transaction.schema";
import { Transaction } from "../types/transaction.types";
import { formatNonCompactPrice } from "@/lib/utils";

interface EditTransactionFormProps {
  transaction: Transaction;
}

type FormData = {
  quantity: string;
  price_per_coin: string;
};

export function EditTransactionForm({ transaction }: EditTransactionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(UpdateTransactionSchema),
    defaultValues: {
      quantity: transaction.quantity.toString(),
      price_per_coin: transaction.price_per_coin.toString(),
    },
  });

  const onSubmit = form.handleSubmit((data: FormData) => {
    setErrorMessage(null);
    startTransition(async () => {
      const result = await updateTransactionAction(transaction.id, {
        quantity: data.quantity,
        price_per_coin: data.price_per_coin,
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "Transaction has been updated.",
        });
        router.push(`/transaction/tx/${transaction.id}`);
        router.refresh();
      } else {
        setErrorMessage(result.message);
      }
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Current transaction: {transaction.quantity}{" "}
            {transaction.coin_symbol.toUpperCase()} at Rp{" "}
            {formatNonCompactPrice(transaction.price_per_coin)} per coin
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
                  {...field}
                  type="number"
                  step="0.00000001"
                  min="0"
                  placeholder="0.00000000"
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
                  {...field}
                  type="number"
                  step="0.00000001"
                  min="0"
                  placeholder="0.00"
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
            {isPending ? "Updating..." : "Update Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
