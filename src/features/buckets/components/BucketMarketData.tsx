import { Info, LineChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CoinPriceDisplay } from "./CoinPriceDisplay";
import { formatCompactPrice } from "@/lib/utils";
import type { CoinGeckoResponse } from "../types/coingecko.types";

interface BucketMarketDataProps {
  coinDetails: CoinGeckoResponse;
}

export function BucketMarketData({ coinDetails }: BucketMarketDataProps) {
  const { market_data } = coinDetails;

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Information</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <CoinPriceDisplay
                price={market_data.current_price.idr}
                priceChange={market_data.price_change_percentage_24h}
                compact={false}
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                24h Trading Volume
              </p>
              <p className="text-base font-semibold">
                Rp {formatCompactPrice(market_data.total_volume.idr)}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="text-base font-semibold">
                Rp {formatCompactPrice(market_data.market_cap.idr)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Prices</h2>
          </div>
          <div className="flex flex-col gap-4">
            {[
              {
                label: "24h",
                value: market_data.price_change_percentage_24h,
              },
              {
                label: "7d",
                value: market_data.price_change_percentage_7d,
              },
              {
                label: "30d",
                value: market_data.price_change_percentage_30d,
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
    </>
  );
}
