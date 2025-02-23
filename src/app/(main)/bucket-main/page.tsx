import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "../../../../auth";
import { getAllUserBuckets } from "@/features/buckets/services/bucket.service";
import { BucketCard } from "@/features/buckets/components/BucketCard";
import { EmptyBucketCard } from "@/features/buckets/components/EmptyBucketCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Home,
  LayoutGrid,
  Plus,
  AlertCircle,
  FolderPlus,
  Briefcase,
} from "lucide-react";

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
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FolderPlus className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Add Bucket</h2>
          </div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Create a new bucket to track your investments in a specific
              cryptocurrency.
            </AlertDescription>
          </Alert>
          <Button asChild className="w-full mt-4" variant="neutral">
            <Link
              href="/bucket-main/new"
              className="flex items-center gap-2 justify-center"
            >
              <Plus className="h-4 w-4" />
              Create New Bucket
            </Link>
          </Button>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5" />
            <h2 className="text-lg font-semibold">My Buckets</h2>
            <span className="text-sm text-muted-foreground">
              ({buckets.length})
            </span>
          </div>

          {buckets.length > 0 ? (
            <div className="flex flex-col gap-4">
              {buckets.map((bucket) => (
                <BucketCard key={bucket.bucket.id} bucket={bucket} />
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
              <EmptyBucketCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
