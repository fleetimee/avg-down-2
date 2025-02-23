import { EnrichedBucket } from "../types/coingecko.types";
import Image from "next/image";
import { formatJakartaTime } from "@/lib/utils";
import { AddTransactionButton } from "./AddTransactionButton";

interface BucketDetailsHeaderProps {
  bucket: EnrichedBucket;
}

export function BucketDetailsHeader({ bucket }: BucketDetailsHeaderProps) {
  const { bucket: bucketData, coinDetails } = bucket;

  return (
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
            {coinDetails?.name || bucketData.coin_symbol.toUpperCase()}
          </h1>
          <p className="text-sm text-muted-foreground">
            Created {formatJakartaTime(bucketData.created_at)}
          </p>
        </div>
      </div>
      <AddTransactionButton className="w-full mt-6" bucketId={bucketData.id} />
    </div>
  );
}
