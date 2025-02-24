import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getBucketById } from "@/features/buckets/services/bucket.service";
import { BucketDetailsBreadcrumb } from "@/features/buckets/components/BucketDetailsBreadcrumb";
import { BucketDetailsHeader } from "@/features/buckets/components/BucketDetailsHeader";
import { BucketStatsOverview } from "@/features/buckets/components/BucketStatsOverview";
import { BucketMarketData } from "@/features/buckets/components/BucketMarketData";
import { CoinDescription } from "@/features/buckets/components/CoinDescription";

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
  if (!enrichedBucket || !enrichedBucket.coinDetails) {
    notFound();
  }

  const { bucket, coinDetails } = enrichedBucket;
  const currentPrice = coinDetails.market_data?.current_price.idr ?? 0;
  const currentValue = (bucket.total_quantity ?? 0) * currentPrice;

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
