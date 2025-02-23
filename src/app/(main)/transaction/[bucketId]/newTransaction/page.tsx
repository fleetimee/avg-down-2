import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/../auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CreateTransactionForm } from "@/features/transactions/components/CreateTransactionForm";
import { Home, LayoutGrid, Plus } from "lucide-react";

interface NewTransactionPageProps {
  params: {
    bucketId: string;
  };
}

export default async function NewTransactionPage({
  params,
}: NewTransactionPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

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
              href={`/transaction/${params.bucketId}/newTransaction`}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Transaction
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <Plus className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Create New Transaction</h2>
        </div>
        <div className="max-w-lg">
          <CreateTransactionForm bucketId={params.bucketId} />
        </div>
      </div>
    </div>
  );
}
