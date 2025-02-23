import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Transaction } from "../types/transaction.types";
import { formatJakartaTime, formatNonCompactPrice } from "@/lib/utils";
import { Coins } from "lucide-react";
import { CoinGeckoResponse } from "@/features/buckets/types/coingecko.types";
import Image from "next/image";

interface TransactionListProps {
  transactions: Array<Transaction & { coinDetails: CoinGeckoResponse | null }>;
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="flex flex-col gap-4">
      {transactions.map((transaction) => (
        <Alert
          key={transaction.id}
          className="flex gap-4 bg-main border-2 border-border"
        >
          {transaction.coinDetails?.image?.thumb ? (
            <Image
              src={transaction.coinDetails.image.thumb}
              alt={transaction.coinDetails.name}
              width={20}
              height={20}
              className="h-5 w-5 mt-[2px]"
            />
          ) : (
            <Coins className="h-5 w-5 mt-[2px]" />
          )}
          <div className="flex-1">
            <AlertTitle className="flex items-center justify-between">
              <span>
                {transaction.coinDetails?.name ||
                  transaction.coin_symbol.toUpperCase()}
              </span>
              <span className="text-sm font-normal">
                {formatJakartaTime(transaction.transaction_date)}
              </span>
            </AlertTitle>
            <AlertDescription className="mt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quantity:</span>
                <span className="text-sm">
                  {transaction.quantity.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 8,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Price per coin:
                </span>
                <span className="text-sm">
                  Rp {formatNonCompactPrice(transaction.price_per_coin)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Total cost:
                </span>
                <span className="text-sm font-medium">
                  Rp {formatNonCompactPrice(transaction.total_cost)}
                </span>
              </div>

              <div className="mt-1 pt-2 border-t border-border">
                <span className="text-xs font-mono text-muted-foreground">
                  {transaction.id}
                </span>
              </div>
            </AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
}
