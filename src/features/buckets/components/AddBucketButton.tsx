import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";

interface AddBucketButtonProps {
  className?: string;
}

export function AddBucketButton({ className }: AddBucketButtonProps) {
  return (
    <Button variant="default" className={className} asChild>
      <Link href="/bucket-main" className="flex items-center gap-2">
        <LayoutGrid className="h-4 w-4" />
        <span>Bucket Hub</span>
      </Link>
    </Button>
  );
}
