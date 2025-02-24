import { Home, LayoutGrid, Plus } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function NewTransactionLoading() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Breadcrumb */}
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
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Plus className="h-5 w-5" />
          <div className="text-lg font-semibold">
            <Skeleton className="h-6 w-48" />
          </div>
        </div>

        {/* Form Loading State */}
        <div className="max-w-lg space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Enter the quantity and price per coin for your new transaction.
            </AlertDescription>
          </Alert>

          {/* Form Fields */}
          {[1, 2].map((field) => (
            <div key={field} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
