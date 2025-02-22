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
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Quantity (Left) and Average Cost (Right) in the same row */}
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="text-lg font-semibold">
              {bucket.bucket.total_quantity}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Average Cost</p>
            <p className="text-lg font-semibold">
              Rp {bucket.bucket.average_price}
            </p>
          </div>

          {/* Current Price and Transaction Button on separate rows */}
          {bucket.coinDetails?.market_data && (
            <div className="col-span-2 flex justify-between items-center">
              <CoinPriceDisplay
                price={bucket.coinDetails.market_data.current_price.usd}
                priceChange={
                  bucket.coinDetails.market_data.price_change_percentage_24h
                }
              />
              <AddTransactionButton className="w-auto" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
