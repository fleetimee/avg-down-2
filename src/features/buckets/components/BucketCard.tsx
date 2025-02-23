import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinPriceDisplay } from "./CoinPriceDisplay";
import { EnrichedBucket } from "../types/coingecko.types";
import { AddTransactionButton } from "./AddTransactionButton";
import { formatJakartaTime, formatPrice } from "@/lib/utils";

interface BucketCardProps {
  bucket: EnrichedBucket;
}

export function BucketCard({ bucket }: BucketCardProps) {
  const currentPrice = bucket.coinDetails?.market_data?.current_price.idr ?? 0;
  const currentValue = (bucket.bucket.total_quantity ?? 0) * currentPrice;

  return (
    <Link href={`/bucket-main/${bucket.bucket.id}`} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-4">
            {bucket.coinDetails?.image && (
              <Image
                src={bucket.coinDetails.image.large}
                alt={bucket.coinDetails.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col">
              <CardTitle className="text-xl">
                {bucket.coinDetails?.name ||
                  bucket.bucket.coin_symbol.toUpperCase()}
              </CardTitle>
              <span className="text-sm text-muted-foreground">
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
              <p className="text-base font-semibold">
                {bucket.bucket.total_quantity ?? "0"}
              </p>
            </div>

            <div className="text-left w-1/2">
              <CoinPriceDisplay
                price={bucket.bucket.average_price}
                variant="average"
                compact={false}
              />
            </div>
          </div>

          {bucket.coinDetails?.market_data && (
            <div className="flex flex-col gap-4">
              {/* Current Price & Total Value */}
              <div className="flex justify-between items-start w-full">
                <div className="text-left w-1/2">
                  <CoinPriceDisplay
                    price={currentPrice}
                    priceChange={
                      bucket.coinDetails.market_data.price_change_percentage_24h
                    }
                    compact={false}
                  />
                </div>

                <div className="text-left w-1/2">
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="text-base font-semibold">
                    {formatPrice(currentValue ?? 0)}
                  </p>
                </div>
              </div>

              <AddTransactionButton
                className="w-full mt-2"
                bucketId={bucket.bucket.id}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
