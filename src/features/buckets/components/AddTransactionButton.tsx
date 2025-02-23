"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddTransactionForm } from "./AddTransactionForm";

interface AddTransactionButtonProps {
  className?: string;
}

export function AddTransactionButton({ className }: AddTransactionButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className} size="lg" variant="neutral">
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Transaction</AlertDialogTitle>
        </AlertDialogHeader>
        <AddTransactionForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
