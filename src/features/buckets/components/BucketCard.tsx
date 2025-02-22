import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinPriceDisplay } from "./CoinPriceDisplay";
import { EnrichedBucket } from "../types/coingecko.types";
import { AddTransactionButton } from "./AddTransactionButton";

interface BucketCardProps {
  bucket: EnrichedBucket;
}

export function BucketCard({ bucket }: BucketCardProps) {
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
          <CardTitle>
            {bucket.coinDetails?.name || bucket.bucket.coin_symbol}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* First row */}
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="text-lg font-semibold">
              {bucket.bucket.total_quantity}
            </p>
          </div>

          <CoinPriceDisplay
            price={bucket.bucket.average_price}
            variant="average"
          />

          {/* Second row */}
          {bucket.coinDetails?.market_data && (
            <CoinPriceDisplay
              price={bucket.coinDetails.market_data.current_price.usd}
              priceChange={
                bucket.coinDetails.market_data.price_change_percentage_24h
              }
              className="col-span-1"
            />
          )}

          <div className="flex items-center justify-end">
            <AddTransactionButton className="w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
