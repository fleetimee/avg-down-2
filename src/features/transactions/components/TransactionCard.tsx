import { Card } from "@/components/ui/card";
import { Transaction } from "../types/transaction.types";
import { formatDate, formatPrice } from "@/lib/utils";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{transaction.coin_symbol}</span>
          <span className="text-sm">
            {formatDate(transaction.transaction_date)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Quantity</span>
          <span>{transaction.quantity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Price per coin</span>
          <span>{formatPrice(transaction.price_per_coin)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-2 mt-1">
          <span className="text-sm font-medium">Total cost</span>
          <span className="font-semibold">
            {formatPrice(transaction.total_cost)}
          </span>
        </div>
      </div>
    </Card>
  );
}
