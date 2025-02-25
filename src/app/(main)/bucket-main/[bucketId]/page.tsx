import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { Metadata } from "next";
import { getBucketById } from "@/features/buckets/services/bucket.service";
import { BucketDetailsBreadcrumb } from "@/features/buckets/components/BucketDetailsBreadcrumb";
import { BucketDetailsHeader } from "@/features/buckets/components/BucketDetailsHeader";
import { BucketStatsOverview } from "@/features/buckets/components/BucketStatsOverview";
import { BucketMarketData } from "@/features/buckets/components/BucketMarketData";
import { CoinDescription } from "@/features/buckets/components/CoinDescription";
import { getCoinMarketChart } from "@/features/buckets/services/coingecko.service";
import { MarketChartCard } from "@/components/chart/market-chart-card";

interface PageProps {
  params: Promise<{
    bucketId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { bucketId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      title: "Bucket Details",
      description: "View detailed information about your investment bucket",
    };
  }

  const enrichedBucket = await getBucketById(bucketId, session.user.id);
  if (!enrichedBucket || !enrichedBucket.coinDetails) {
    return {
      title: "Bucket Not Found",
      description: "The requested bucket could not be found",
    };
  }

  const { bucket, coinDetails } = enrichedBucket;
  return {
    title: `${coinDetails.name} (${bucket.coin_symbol.toUpperCase()})`,
    description: `Track your ${coinDetails.name} investment bucket and performance`,
    openGraph: {
      title: `${coinDetails.name} Bucket Details`,
      description: `Track your ${coinDetails.name} investment bucket and performance`,
    },
  };
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
  if (!enrichedBucket || !enrichedBucket.coinDetails) {
    notFound();
  }

  const { bucket, coinDetails } = enrichedBucket;
  const currentPrice = coinDetails.market_data?.current_price.idr ?? 0;
  const currentValue = (bucket.total_quantity ?? 0) * currentPrice;

  const getCoin = await getCoinMarketChart(bucket.coin_symbol, {
    vs_currency: "idr",
    days: "7",
    interval: "daily",
  });

  return (
    <div className="flex flex-col gap-6 p-4">
      <BucketDetailsBreadcrumb coinSymbol={bucket.coin_symbol} />

      <div className="bg-card rounded-lg p-6 shadow-lg">
        <BucketDetailsHeader
          coinDetails={coinDetails}
          createdAt={bucket.created_at}
          bucket={bucket}
        />

        <BucketStatsOverview
          quantity={bucket.total_quantity ?? 0}
          averagePrice={bucket.average_price ?? 0}
          totalCost={bucket.total_cost ?? 0}
          currentValue={currentValue}
          bucketId={bucket.id}
        />
      </div>

      {coinDetails.market_data && (
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <BucketMarketData coinDetails={coinDetails} />
        </div>
      )}

      <MarketChartCard
        title="Price Chart (7 days)"
        data={getCoin}
        dataType="prices" // or "market_caps" or "total_volumes"
        height={200}
        currency="IDR"
      />

      {coinDetails.description?.en && (
        <div className="max-w-2xl">
          <CoinDescription
            name={coinDetails.name}
            description={coinDetails.description.en}
          />
        </div>
      )}
    </div>
  );
}
