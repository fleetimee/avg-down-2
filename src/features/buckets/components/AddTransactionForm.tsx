"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";

export function AddTransactionForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      // TODO: Implement transaction submission
      console.log({
        quantity: formData.get("quantity"),
        price: formData.get("price"),
      });
    });
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          step="any"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Price (Rp)</Label>
        <Input id="price" name="price" type="number" step="any" required />
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Transaction"}
        </Button>
      </AlertDialogFooter>
    </form>
  );
}
