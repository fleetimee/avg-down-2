import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getBucketById } from "@/features/buckets/services/bucket.service";
import { CoinPriceDisplay } from "@/features/buckets/components/CoinPriceDisplay";
import { AddTransactionButton } from "@/features/buckets/components/AddTransactionButton";
import { Card, CardContent } from "@/components/ui/card";
import { formatCompactPrice, formatJakartaTime } from "@/lib/utils";
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
  params: {
    bucketId: string;
  };
}

export default async function BucketDetailsPage({ params }: PageProps) {
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
  const currentValue = bucket.total_quantity * currentPrice;

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
              <p className="text-xl font-semibold">{bucket.total_quantity}</p>
            </div>
            <div className="text-left w-1/2">
              <p className="text-sm text-muted-foreground">Average Cost</p>
              <p className="text-xl font-semibold">Rp {bucket.average_price}</p>
            </div>
          </div>

          <div className="flex justify-between items-start">
            <div className="text-left w-1/2">
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className="text-xl font-semibold">
                Rp {formatCompactPrice(bucket.total_cost)}
              </p>
            </div>
            <div className="text-left w-1/2">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-xl font-semibold">
                Rp {formatCompactPrice(currentValue)}
              </p>
            </div>
          </div>
        </div>

        <AddTransactionButton className="w-full mt-6" bucketId={bucket.id} />
      </div>

      {/* Market Data Section */}
      {coinDetails?.market_data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Price Information</h2>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="text-left w-1/2">
                    <CoinPriceDisplay
                      price={coinDetails.market_data.current_price.idr}
                      priceChange={
                        coinDetails.market_data.price_change_percentage_24h
                      }
                      compact={false}
                    />
                  </div>
                  <div className="text-left w-1/2">
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
                </div>

                <div className="flex justify-between items-start">
                  <div className="text-left w-1/2">
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="text-base font-semibold">
                      Rp{" "}
                      {formatCompactPrice(
                        coinDetails.market_data.market_cap.idr
                      )}
                    </p>
                  </div>
                  <div className="text-left w-1/2">
                    <p className="text-sm text-muted-foreground">
                      Market Cap Rank
                    </p>
                    <p className="text-base font-semibold">
                      #{coinDetails.market_cap_rank || "N/A"}
                    </p>
                  </div>
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
                ].map(
                  (change, index, arr) =>
                    index % 2 === 0 && (
                      <div
                        key={change.label}
                        className="flex justify-between items-start"
                      >
                        <div className="text-left w-1/2">
                          <p className="text-sm text-muted-foreground">
                            {change.label} Change
                          </p>
                          <p
                            className={`text-base font-semibold ${
                              change.value >= 0
                                ? "text-greenHulk"
                                : "text-red-500"
                            }`}
                          >
                            {change.value >= 0 ? "+" : ""}
                            {change.value?.toFixed(2)}%
                          </p>
                        </div>
                        {index + 1 < arr.length && (
                          <div className="text-left w-1/2">
                            <p className="text-sm text-muted-foreground">
                              {arr[index + 1].label} Change
                            </p>
                            <p
                              className={`text-base font-semibold ${
                                arr[index + 1].value >= 0
                                  ? "text-greenHulk"
                                  : "text-red-500"
                              }`}
                            >
                              {arr[index + 1].value >= 0 ? "+" : ""}
                              {arr[index + 1].value?.toFixed(2)}%
                            </p>
                          </div>
                        )}
                      </div>
                    )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Coin Description */}
      {coinDetails?.description?.en && (
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
      )}
    </div>
  );
}
