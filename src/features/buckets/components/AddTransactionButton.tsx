"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AddTransactionButtonProps {
  bucketId: string;
  className?: string;
}

export function AddTransactionButton({
  bucketId,
  className,
}: AddTransactionButtonProps) {
  return (
    <Button asChild className={className} variant="neutral">
      <Link href={`/transaction/${bucketId}/newTransaction`}>
        Add Transaction
      </Link>
    </Button>
  );
}
