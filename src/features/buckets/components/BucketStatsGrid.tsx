import { EnrichedBucket } from "../types/coingecko.types";
import { formatPrice } from "@/lib/utils";
import { Calculator, CandlestickChart, Coins, DollarSign, TrendingUp } from "lucide-react";

interface BucketStatsGridProps {
  bucket: EnrichedBucket;
}

export function BucketStatsGrid({ bucket }: BucketStatsGridProps) {
  const { bucket: bucketData, coinDetails } = bucket;
  const currentPrice = coinDetails?.market_data?.current_price.idr ?? 0;
  const currentValue = (bucketData.total_quantity ?? 0) * currentPrice;
  const totalCost = bucketData.total_cost || 0;
  
  // Calculate PnL
  const pnl = currentValue - totalCost;
  const pnlPercentage = totalCost > 0 ? (pnl / totalCost) * 100 : 0;
  const hasPnl = totalCost > 0 && currentValue > 0;

  // Round PnL percentage to 1 decimal place for cleaner display
  const formattedPnlPercentage = Math.abs(pnlPercentage).toFixed(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="text-left w-1/2">
          <p className="text-xs font-normal text-muted-foreground flex items-center gap-2 mb-1">
            <Coins className="h-3.5 w-3.5" /> Quantity
          </p>
          <p className="text-base font-semibold">{bucketData.total_quantity ?? 0}</p>
        </div>
        <div className="text-left w-1/2">
          <p className="text-xs font-normal text-muted-foreground flex items-center gap-2 mb-1">
            <Calculator className="h-3.5 w-3.5" /> Average Cost
          </p>
          <p className="text-base font-semibold">
            {formatPrice(bucketData.average_price || 0)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="text-left w-1/2">
          <p className="text-xs font-normal text-muted-foreground flex items-center gap-2 mb-1">
            <DollarSign className="h-3.5 w-3.5" /> Total Cost
          </p>
          <p className="text-base font-semibold">
            {formatPrice(totalCost)}
          </p>
        </div>
        <div className="text-left w-1/2">
          <p className="text-xs font-normal text-muted-foreground flex items-center gap-2 mb-1">
            <CandlestickChart className="h-3.5 w-3.5" /> Current Value
          </p>
          <p className="text-base font-semibold">{formatPrice(currentValue)}</p>
        </div>
      </div>

      <div className="border-t border-border/40 pt-6 mt-4">
        <div className="flex flex-col items-center">
          <p className="text-xs font-normal text-muted-foreground flex items-center gap-2 mb-2.5">
            <TrendingUp className="h-3.5 w-3.5" /> Profit/Loss
          </p>
          {hasPnl ? (
            <>
              <p className={`text-lg font-semibold ${pnl >= 0 ? 'text-greenHulk' : 'text-red-500'}`}>
                {pnl >= 0 ? '+' : '-'}{formatPrice(Math.abs(pnl))}
              </p>
              <p className={`text-sm ${pnl >= 0 ? 'text-greenHulk' : 'text-red-500'}`}>
                ({pnl >= 0 ? '+' : '-'}{formattedPnlPercentage}%)
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
