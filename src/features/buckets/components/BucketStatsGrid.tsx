import { EnrichedBucket } from "../types/coingecko.types";
import { formatPrice } from "@/lib/utils";

interface BucketStatsGridProps {
  bucket: EnrichedBucket;
}

export function BucketStatsGrid({ bucket }: BucketStatsGridProps) {
  const { bucket: bucketData, coinDetails } = bucket;
  const currentPrice = coinDetails?.market_data?.current_price.idr ?? 0;
  const currentValue = (bucketData.total_quantity ?? 0) * currentPrice;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="text-left w-1/2">
          <p className="text-sm text-muted-foreground">Quantity</p>
          <p className="font-semibold">{bucketData.total_quantity ?? 0}</p>
        </div>
        <div className="text-left w-1/2">
          <p className="text-sm text-muted-foreground">Average Cost</p>
          <p className="font-semibold">
            {formatPrice(bucketData.average_price || 0)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div className="text-left w-1/2">
          <p className="text-sm text-muted-foreground">Total Cost</p>
          <p className="font-semibold">
            {formatPrice(bucketData.total_cost || 0)}
          </p>
        </div>
        <div className="text-left w-1/2">
          <p className="text-sm text-muted-foreground">Current Value</p>
          <p className="font-semibold">{formatPrice(currentValue)}</p>
        </div>
      </div>
    </div>
  );
}
