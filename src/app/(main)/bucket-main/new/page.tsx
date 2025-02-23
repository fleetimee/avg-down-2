import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CreateBucketForm } from "@/features/buckets/components/CreateBucketForm";
import { Home, LayoutGrid, FolderPlus } from "lucide-react";

export default function BucketNewPage() {
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
        <div className="max-w-lg">
          <CreateBucketForm />
        </div>
      </div>
    </div>
  );
}
