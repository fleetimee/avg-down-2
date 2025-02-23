import { Home, LayoutGrid } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BucketDetailsLoading() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Breadcrumb Loading State */}
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
            <Skeleton className="h-4 w-16" />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Card Loading State */}
      <div className="bg-card rounded-lg p-6 shadow-lg">
        {/* Header Loading */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-6 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Stats Overview Loading */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            {[1, 2].map((i) => (
              <div key={i} className="text-left w-1/2">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-start">
            {[1, 2].map((i) => (
              <div key={i} className="text-left w-1/2">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-col items-center justify-center bg-muted/50 rounded-lg p-4">
              <Skeleton className="h-5 w-32 mb-3" />
              <Skeleton className="h-8 w-40" />
            </div>
          </div>

          <Skeleton className="h-10 w-full mt-6" />
        </div>
      </div>

      {/* Market Data Loading */}
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        {[1, 2].map((card) => (
          <Card key={card}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Coin Description Loading */}
      <div className="max-w-2xl">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((line) => (
                <Skeleton key={line} className="h-4 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
