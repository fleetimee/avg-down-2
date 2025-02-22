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
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Quantity</span>
          <span>{transaction.quantity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Price per coin</span>
          <span>{formatPrice(transaction.price_per_coin)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total cost</span>
          <span>{formatPrice(transaction.total_cost)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Date</span>
          <span>{formatDate(transaction.transaction_date)}</span>
        </div>
      </div>
    </Card>
  );
}
