"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useTransition } from "react";

export function AddBucketForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      // TODO: Implement bucket creation
      console.log({
        symbol: formData.get("symbol"),
      });
    });
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="symbol">Coin Symbol</Label>
        <Input
          id="symbol"
          name="symbol"
          type="text"
          placeholder="e.g. BTC"
          required
          className="uppercase"
        />
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Bucket"}
        </Button>
      </AlertDialogFooter>
    </form>
  );
}
