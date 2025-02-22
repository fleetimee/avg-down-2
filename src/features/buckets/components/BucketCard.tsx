import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinPriceDisplay } from "./CoinPriceDisplay";
import { EnrichedBucket } from "../types/coingecko.types";
import { AddTransactionButton } from "./AddTransactionButton";
import { formatJakartaTime } from "@/lib/utils";

interface BucketCardProps {
  bucket: EnrichedBucket;
}

export function BucketCard({ bucket }: BucketCardProps) {
  const currentPrice = bucket.coinDetails?.market_data?.current_price.idr ?? 0;
  const currentValue = bucket.bucket.total_quantity * currentPrice;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          {bucket.coinDetails?.image && (
            <Image
              src={bucket.coinDetails.image.small}
              alt={bucket.coinDetails.name}
              width={32}
              height={32}
            />
          )}
          <div className="flex flex-col">
            <CardTitle>
              {bucket.coinDetails?.name || bucket.bucket.coin_symbol}
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              Created {formatJakartaTime(bucket.bucket.created_at)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Quantity & Average Cost */}
        <div className="flex justify-between items-start w-full">
          <div className="text-left w-1/2">
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="text-lg font-semibold">
              {bucket.bucket.total_quantity}
            </p>
          </div>

          <div className="text-left w-1/2">
            <p className="text-sm text-gray-500">Average Cost</p>
            <p className="text-lg font-semibold">
              Rp {bucket.bucket.average_price}
            </p>
          </div>
        </div>

        {bucket.coinDetails?.market_data && (
          <div className="flex flex-col gap-4">
            {/* Current Price & Total Value */}
            <div className="flex justify-between items-start w-full">
              <div className="text-left w-1/2">
                <CoinPriceDisplay
                  price={bucket.coinDetails.market_data.current_price.idr}
                  priceChange={
                    bucket.coinDetails.market_data.price_change_percentage_24h
                  }
                />
              </div>

              <div className="text-left w-1/2">
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-lg font-semibold">
                  Rp {currentValue.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <AddTransactionButton className="w-full mt-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
