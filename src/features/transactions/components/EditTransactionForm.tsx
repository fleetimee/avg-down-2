"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(UpdateTransactionSchema),
    defaultValues: {
      quantity: transaction.quantity.toString(),
      price_per_coin: transaction.price_per_coin.toString(),
    },
  });

  const onSubmit = form.handleSubmit((data: FormData) => {
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
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        });
      }
    });
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Transaction</CardTitle>
        <CardDescription>
          Update the quantity and price per coin for this transaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Original transaction: {transaction.quantity}{" "}
            {transaction.coin_symbol.toUpperCase()} at Rp{" "}
            {formatNonCompactPrice(transaction.price_per_coin)} per coin
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
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
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="neutral"
                className="w-full"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Updating..." : "Update Transaction"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
