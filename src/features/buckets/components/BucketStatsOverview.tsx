import {
  CoinsIcon,
  Calculator,
  DollarSign,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { AddTransactionButton } from "./AddTransactionButton";

interface BucketStatsOverviewProps {
  quantity: number;
  averagePrice: number;
  totalCost: number;
  currentValue: number;
  bucketId: string;
}

export function BucketStatsOverview({
  quantity,
  averagePrice,
  totalCost,
  currentValue,
  bucketId,
}: BucketStatsOverviewProps) {
  const pnl = currentValue - totalCost;
  const pnlPercentage = ((currentValue / totalCost - 1) * 100).toFixed(2);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="text-left w-1/2">
          <div className="flex items-center gap-2 mb-1">
            <CoinsIcon className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-extralight">Quantity</p>
          </div>
          <p className="font-semibold">{quantity}</p>
        </div>
        <div className="text-left w-1/2">
          <div className="flex items-center gap-2 mb-1">
            <Calculator className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-extralight">Average Cost</p>
          </div>
          <p className="font-semibold">{formatPrice(averagePrice)}</p>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="text-left w-1/2">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-extralight">Total Cost</p>
          </div>
          <p className="font-semibold">{formatPrice(totalCost)}</p>
        </div>
        <div className="text-left w-1/2">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-extralight">Current Value</p>
          </div>
          <p className="font-semibold">{formatPrice(currentValue)}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-col items-center justify-center bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm font-medium uppercase tracking-wide">
              Profit/Loss
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p
              className={`text-2xl font-bold ${
                pnl >= 0 ? "text-greenHulk" : "text-red-500"
              }`}
            >
              {formatPrice(pnl)}
            </p>
            <p
              className={`text-sm ${
                pnl >= 0 ? "text-greenHulk" : "text-red-500"
              }`}
            >
              ({pnl >= 0 ? "+" : ""}
              {pnlPercentage}%)
            </p>
          </div>
        </div>
      </div>

      <AddTransactionButton className="w-full mt-6" bucketId={bucketId} />
    </div>
  );
}
