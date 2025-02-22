import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { getLatestUserBucket } from "@/features/buckets/services/bucket.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CoinPriceDisplay } from "@/features/buckets/components/CoinPriceDisplay";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const enrichedBucket = await getLatestUserBucket(session.user.id);

  return (
    <div className="flex flex-col gap-6 p-4">
      {enrichedBucket && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              {enrichedBucket.coinDetails?.image && (
                <Image
                  src={enrichedBucket.coinDetails.image.small}
                  alt={enrichedBucket.coinDetails.name}
                  width={32}
                  height={32}
                />
              )}
              <CardTitle>
                {enrichedBucket.coinDetails?.name ||
                  enrichedBucket.bucket.coin_symbol}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="text-lg font-semibold">
                    {enrichedBucket.bucket.total_quantity}
                  </p>
                </div>
                <CoinPriceDisplay
                  price={enrichedBucket.bucket.average_price}
                  variant="average"
                />
              </div>

              {enrichedBucket.coinDetails?.market_data && (
                <div className="grid grid-cols-2 gap-4">
                  <CoinPriceDisplay
                    price={
                      enrichedBucket.coinDetails.market_data.current_price.usd
                    }
                    priceChange={
                      enrichedBucket.coinDetails.market_data
                        .price_change_percentage_24h
                    }
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
