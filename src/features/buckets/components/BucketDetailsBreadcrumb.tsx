import { Home, LayoutGrid, ArrowUpDown } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BucketDetailsBreadcrumbProps {
  coinSymbol: string;
}

export function BucketDetailsBreadcrumb({
  coinSymbol,
}: BucketDetailsBreadcrumbProps) {
  return (
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
          <span className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            {coinSymbol.toUpperCase()}
          </span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
