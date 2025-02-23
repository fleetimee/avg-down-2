import { EnrichedBucket } from "../types/coingecko.types";
import { Card, CardContent } from "@/components/ui/card";

interface BucketDescriptionProps {
  bucket: EnrichedBucket;
}

export function BucketDescription({ bucket }: BucketDescriptionProps) {
  const { coinDetails } = bucket;
  if (!coinDetails?.description?.en) return null;

  return (
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
  );
}
