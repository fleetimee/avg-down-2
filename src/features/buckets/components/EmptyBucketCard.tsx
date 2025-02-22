import { CircleDollarSign, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyBucketCard() {
  return (
    <Card className="w-full min-h-[300px] flex flex-col justify-center items-center border-dashed">
      <CardHeader className="text-center pb-0">
        <CircleDollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">No Investment Buckets Yet</h3>
        <p className="text-sm text-muted-foreground">
          Start tracking your investments by creating your first bucket
        </p>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/bucket-main" className="gap-2">
            <Plus className="w-4 h-4" />
            Create First Bucket
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
