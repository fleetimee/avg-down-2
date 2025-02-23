"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface AddTransactionButtonProps {
  className?: string;
  bucketId: string;
}

export function AddTransactionButton({
  className,
  bucketId,
}: AddTransactionButtonProps) {
  const router = useRouter();

  return (
    <Button
      className={className}
      size="lg"
      variant="neutral"
      onClick={() => router.push(`/transaction/${bucketId}/newTransaction`)}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Transaction
    </Button>
  );
}
