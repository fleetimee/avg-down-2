import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { getAllUserBuckets } from "@/features/buckets/services/bucket.service";
import { BucketCard } from "@/features/buckets/components/BucketCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, LayoutGrid } from "lucide-react";

export default async function BucketMain() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const buckets = await getAllUserBuckets(session.user.id);

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
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h1 className="text-2xl font-bold mb-2">Your Investment Buckets</h1>
        <p className="text-sm text-muted-foreground">
          Manage and track all your investment buckets
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {buckets.length > 0 ? (
          buckets.map((bucket) => (
            <BucketCard key={bucket.bucket.id} bucket={bucket} />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No buckets created yet. Start by adding your first investment
            bucket!
          </p>
        )}
      </div>
    </div>
  );
}
