import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getBucketById } from "@/features/buckets/services/bucket.service";
import { CoinPriceDisplay } from "@/features/buckets/components/CoinPriceDisplay";
import { AddTransactionButton } from "@/features/buckets/components/AddTransactionButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatCompactPrice,
  formatJakartaTime,
  formatPrice,
} from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, LayoutGrid, ArrowUpDown } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    bucketId: string;
  }>;
}

export default async function BucketDetailsPage(props: PageProps) {
  const params = await props.params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const enrichedBucket = await getBucketById(params.bucketId, session.user.id);
  if (!enrichedBucket) {
    notFound();
  }

  const { bucket, coinDetails } = enrichedBucket;
  const currentPrice = coinDetails?.market_data?.current_price.idr ?? 0;
  const currentValue = (bucket.total_quantity ?? 0) * currentPrice;

  return (
    <div className="flex flex-col gap-6 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/bucket-main"
              className="flex items-center gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              Bucket Hub
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              {bucket.coin_symbol.toUpperCase()}
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Enhanced Banner Section */}
      <div className="bg-card rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-6 mb-6">
          {coinDetails?.image && (
            <Image
              src={coinDetails.image.large}
              alt={coinDetails.name}
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {coinDetails?.name || bucket.coin_symbol.toUpperCase()}
            </h1>
            <p className="text-sm text-muted-foreground">
              Created {formatJakartaTime(bucket.created_at)}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="text-left w-1/2">
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className=" font-semibold">{bucket.total_quantity ?? 0}</p>
            </div>
            <div className="text-left w-1/2">
              <p className="text-sm text-muted-foreground">Average Cost</p>
              <p className=" font-semibold">
                {formatPrice(bucket.average_price || 0)}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-start">
            <div className="text-left w-1/2">
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className=" font-semibold">
                {formatPrice(bucket.total_cost || 0)}
              </p>
            </div>
            <div className="text-left w-1/2">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="font-semibold">{formatPrice(currentValue)}</p>
            </div>
          </div>

          {/* PNL Section */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">Profit/Loss</p>
              <div className="flex items-center gap-2">
                <p
                  className={`text-xl font-bold ${
                    currentValue - (bucket.total_cost || 0) >= 0
                      ? "text-greenHulk"
                      : "text-red-500"
                  }`}
                >
                  {formatPrice(currentValue - (bucket.total_cost || 0))}
                </p>
                <p
                  className={`text-sm ${
                    currentValue - (bucket.total_cost || 0) >= 0
                      ? "text-greenHulk"
                      : "text-red-500"
                  }`}
                >
                  (
                  {(
                    (currentValue / (bucket.total_cost || 1) - 1) *
                    100
                  ).toFixed(2)}
                  %)
                </p>
              </div>
            </div>
          </div>
        </div>

        <AddTransactionButton className="w-full mt-6" bucketId={bucket.id} />
      </div>

      {/* Market Data Section */}
      {coinDetails?.market_data && (
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Price Information</h2>
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
                    {formatCompactPrice(
                      coinDetails.market_data.total_volume.idr
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Market Cap</p>
                  <p className="text-base font-semibold">
                    Rp{" "}
                    {formatCompactPrice(coinDetails.market_data.market_cap.idr)}
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
      )}

      {/* Coin Description */}
      {coinDetails?.description?.en && (
        <div className="max-w-2xl">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">
                About {coinDetails.name}
              </h2>
              <div
                className="text-sm text-muted-foreground prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: coinDetails.description.en }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
