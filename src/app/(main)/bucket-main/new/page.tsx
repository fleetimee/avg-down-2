import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CreateBucketForm } from "@/features/buckets/components/CreateBucketForm";
import { Home, LayoutGrid } from "lucide-react";

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
            <BreadcrumbLink href="/bucket-main/new">New Bucket</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <h2 className="text-lg font-semibold mb-6">Create New Bucket</h2>
        <div className="max-w-lg">
          <CreateBucketForm />
        </div>
      </div>
    </div>
  );
}
