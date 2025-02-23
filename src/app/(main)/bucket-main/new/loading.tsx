import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, LayoutGrid, FolderPlus, AlertCircle, Coins } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function BucketNewLoading() {
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
            <BreadcrumbLink
              href="/bucket-main/new"
              className="flex items-center gap-2"
            >
              <FolderPlus className="h-4 w-4" />
              Create New Bucket
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <FolderPlus className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Create New Bucket</h2>
        </div>
        <div className="max-w-lg space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Search and select a cryptocurrency to create a new bucket for
              tracking your investments.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Coins className="h-4 w-4" />
                Select Cryptocurrency
              </Label>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-5 w-48 bg-destructive/20" />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="default" disabled>
                Cancel
              </Button>
              <Button disabled>Create Bucket</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
