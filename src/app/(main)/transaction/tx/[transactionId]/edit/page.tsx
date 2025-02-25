import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../../../auth";
import { getTransactionById } from "@/features/transactions/services/transaction.service";
import { EditTransactionForm } from "@/features/transactions/components/EditTransactionForm";
import { getBucketById } from "@/features/buckets/services/bucket.service";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home, LayoutGrid, PencilIcon } from "lucide-react";

interface PageProps {
  params: Promise<{
    transactionId: string;
  }>;
}

export default async function EditTransactionPage({ params }: PageProps) {
  const { transactionId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const transaction = await getTransactionById(transactionId, session.user.id);

  if (!transaction) {
    notFound();
  }

  if (transaction.is_sale) {
    redirect(`/transaction/tx/${transactionId}`);
  }

  // Get bucket details to display coin name
  const bucket = await getBucketById(transaction.bucket_id, session.user.id);

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
              href={`/transaction/tx/${transactionId}/edit`}
              className="flex items-center gap-2"
            >
              <PencilIcon className="h-4 w-4" />
              Edit Transaction
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <PencilIcon className="h-5 w-5" />
          <div className="text-lg font-semibold">
            Edit Transaction for{" "}
            {bucket?.coinDetails?.name || transaction.coin_symbol}
          </div>
        </div>
        <div className="max-w-lg">
          <EditTransactionForm transaction={transaction} />
        </div>
      </div>
    </div>
  );
}
