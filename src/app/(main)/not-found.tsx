import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 min-h-[90vh]">
      <FileQuestion className="w-24 h-24 text-slate-400" />
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-slate-600 text-center">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
