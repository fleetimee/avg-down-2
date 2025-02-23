import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { getBucketById } from "@/features/buckets/services/bucket.service";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, LayoutGrid, ArrowUpDown } from "lucide-react";
import { BucketDetailsHeader } from "@/features/buckets/components/BucketDetailsHeader";
import { BucketStatsGrid } from "@/features/buckets/components/BucketStatsGrid";
import { BucketMarketInfo } from "@/features/buckets/components/BucketMarketInfo";
import { BucketDescription } from "@/features/buckets/components/BucketDescription";

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
              {enrichedBucket.bucket.coin_symbol.toUpperCase()}
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BucketDetailsHeader bucket={enrichedBucket} />

      <div className="bg-card rounded-lg p-6 shadow-lg">
        <BucketStatsGrid bucket={enrichedBucket} />
      </div>

      <BucketMarketInfo bucket={enrichedBucket} />

      <BucketDescription bucket={enrichedBucket} />
    </div>
  );
}
