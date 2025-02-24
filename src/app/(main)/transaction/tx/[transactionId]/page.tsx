import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTransactionById } from "@/features/transactions/services/transaction.service";
import { getBucketById } from "@/features/buckets/services/bucket.service";
import { TrendingUp } from "lucide-react";
import {
  TransactionBreadcrumb,
  TransactionDetails,
  TransactionPerformance,
} from "@/features/transactions/components";

interface PageProps {
  params: Promise<{
    transactionId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { transactionId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      title: "Transaction Details",
      description: "View details of your cryptocurrency transaction",
    };
  }

  const transaction = await getTransactionById(transactionId, session.user.id);
  if (!transaction) {
    return {
      title: "Transaction Not Found",
      description: "The requested transaction could not be found",
    };
  }

  return {
    title: `${transaction.coin_symbol.toUpperCase()} Transaction Details`,
    description: `View details of your ${transaction.coin_symbol.toUpperCase()} transaction`,
    openGraph: {
      title: `${transaction.coin_symbol.toUpperCase()} Transaction Details`,
      description: `View details of your ${transaction.coin_symbol.toUpperCase()} transaction`,
    },
  };
}

export default async function TransactionDetailPage({ params }: PageProps) {
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

  // Get bucket details to get coin information
  const enrichedBucket = await getBucketById(
    transaction.bucket_id,
    session.user.id
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      <TransactionBreadcrumb title="Transaction Details" />

      <TransactionDetails
        transaction={transaction}
        coinDetails={enrichedBucket?.coinDetails ?? null}
      />

      <Card variant="white">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Performance Since Buy</h2>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <TransactionPerformance
            currentPrice={
              enrichedBucket?.coinDetails?.market_data?.current_price.idr ?? 0
            }
            quantity={transaction.quantity}
            totalCost={transaction.total_cost}
          />
        </CardContent>
      </Card>
    </div>
  );
}
