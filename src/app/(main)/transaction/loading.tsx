import { History, Home as HomeIcon, AlertCircle, Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionLoading() {
  return (
    <div className="flex flex-col gap-6 p-4 pb-32 relative min-h-screen">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/transaction"
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              Transactions
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-sm text-muted-foreground">
            Track your investment journey
          </p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          View your last 10 transactions across all cryptocurrency buckets
        </AlertDescription>
      </Alert>

      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <div className="flex-1">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 bg-main border-2 border-border p-4 rounded-lg"
          >
            <Skeleton className="h-5 w-5 mt-[2px] rounded-full" />
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-36" />
                </div>
                <div className="mt-4 pt-2 border-t border-border">
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
