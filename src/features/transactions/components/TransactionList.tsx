import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Transaction } from "../types/transaction.types";
import { formatDate, formatPrice } from "@/lib/utils";
import { Coins } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="flex flex-col gap-4">
      {transactions.map((transaction) => (
        <Alert key={transaction.id} className="flex gap-4 bg-main border-2 border-border">
          <Coins className="h-5 w-5 mt-[2px]" />
          <div className="flex-1">
            <AlertTitle className="flex items-center justify-between">
              <span>Transaction</span>
              <span className="text-sm font-normal">
                {formatDate(transaction.transaction_date)}
              </span>
            </AlertTitle>
            <AlertDescription className="mt-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="text-right">{transaction.quantity}</span>

                <span className="text-muted-foreground">Price per coin:</span>
                <span className="text-right">
                  {formatPrice(transaction.price_per_coin)}
                </span>

                <span className="text-muted-foreground">Total cost:</span>
                <span className="text-right font-medium">
                  {formatPrice(transaction.total_cost)}
                </span>
              </div>
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
}
