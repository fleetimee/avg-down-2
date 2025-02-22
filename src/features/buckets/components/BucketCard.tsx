import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinPriceDisplay } from "./CoinPriceDisplay";
import { EnrichedBucket } from "../types/coingecko.types";

interface BucketCardProps {
  bucket: EnrichedBucket;
}

export function BucketCard({ bucket }: BucketCardProps) {
  return (
    <Card>
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
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
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
          </div>

          {bucket.coinDetails?.market_data && (
            <div className="grid grid-cols-2 gap-4">
              <CoinPriceDisplay
                price={bucket.coinDetails.market_data.current_price.usd}
                priceChange={bucket.coinDetails.market_data.price_change_percentage_24h}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}