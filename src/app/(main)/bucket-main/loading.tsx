import {
  Home,
  AlertCircle,
  LayoutGrid,
  FolderPlus,
  Briefcase,
  Plus,
  ExternalLink,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function BucketMainLoading() {
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
            <Skeleton className="h-5 w-12" />
          </div>

          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Button variant="neutral" size="icon" disabled>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-6">
                  <div className="flex justify-between items-start w-full">
                    <div className="text-left w-1/2">
                      <Skeleton className="h-4 w-16 mb-2" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <div className="text-left w-1/2">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start w-full">
                      <div className="text-left w-1/2">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                      <div className="text-left w-1/2">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-5 w-28" />
                      </div>
                    </div>
                    <Skeleton className="h-9 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
