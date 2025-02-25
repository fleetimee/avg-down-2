import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../../../auth";
import { getTransactionById } from "@/features/transactions/services/transaction.service";
import { EditTransactionForm } from "@/features/transactions/components/EditTransactionForm";

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

  return (
    <div className="flex flex-col gap-6 p-4">
      <EditTransactionForm transaction={transaction} />
    </div>
  );
}
