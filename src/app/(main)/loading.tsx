import { Home, Coins, History } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

export default function HomeLoading() {
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
        </BreadcrumbList>
      </Breadcrumb>

      {/* User Header */}
      <div className="flex items-center gap-4 mb-2">
        <Avatar>
          <AvatarFallback>
            <Skeleton className="h-10 w-10 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div>
          <Skeleton className="h-8 w-48 mb-1" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>

      {/* Latest Bucket Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Latest Bucket</h2>
        </div>
        <Skeleton className="h-9 w-[130px]" /> {/* Add Bucket Button */}
      </div>

      {/* Latest Bucket Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-9 w-9" /> {/* View Button */}
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="flex justify-between items-start w-full">
            {[1, 2].map((i) => (
              <div key={i} className="text-left w-1/2">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start w-full">
              {[1, 2].map((i) => (
                <div key={i} className="text-left w-1/2">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
            <Skeleton className="h-9 w-full" /> {/* Add Transaction Button */}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <Alert key={i} className="flex gap-4 bg-main border-2 border-border">
            <Skeleton className="h-5 w-5 mt-[2px]" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-32" />
              </div>

              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                ))}
                <div className="mt-3 pt-2 border-t border-border">
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  );
}
