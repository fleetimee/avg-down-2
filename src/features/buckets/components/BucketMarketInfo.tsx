import { EnrichedBucket } from "../types/coingecko.types";
import { CoinPriceDisplay } from "./CoinPriceDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompactPrice } from "@/lib/utils";

interface BucketMarketInfoProps {
  bucket: EnrichedBucket;
}

export function BucketMarketInfo({ bucket }: BucketMarketInfoProps) {
  const { coinDetails } = bucket;
  if (!coinDetails?.market_data) return null;

  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Information</h2>
          <div className="flex flex-col gap-4">
            <div>
              <CoinPriceDisplay
                price={coinDetails.market_data.current_price.idr}
                priceChange={
                  coinDetails.market_data.price_change_percentage_24h
                }
                compact={false}
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                24h Trading Volume
              </p>
              <p className="text-base font-semibold">
                Rp{" "}
                {formatCompactPrice(coinDetails.market_data.total_volume.idr)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-base font-semibold">
                Rp {formatCompactPrice(coinDetails.market_data.market_cap.idr)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Price Changes</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                label: "24h",
                value: coinDetails.market_data.price_change_percentage_24h,
              },
              {
                label: "7d",
                value: coinDetails.market_data.price_change_percentage_7d,
              },
              {
                label: "30d",
                value: coinDetails.market_data.price_change_percentage_30d,
              },
            ].map((change) => (
              <div key={change.label}>
                <p className="text-sm text-muted-foreground">
                  {change.label} Change
                </p>
                <p
                  className={`text-base font-semibold ${
                    change.value >= 0 ? "text-greenHulk" : "text-red-500"
                  }`}
                >
                  {change.value >= 0 ? "+" : ""}
                  {change.value?.toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
