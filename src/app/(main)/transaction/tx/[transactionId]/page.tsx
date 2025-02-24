import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "../../../../../../auth";
import { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getTransactionById } from "@/features/transactions/services/transaction.service";
import { getBucketById } from "@/features/buckets/services/bucket.service";
import { formatJakartaTime, formatNonCompactPrice } from "@/lib/utils";
import { AlertCircle, ArrowLeft, History, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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

export default async function TransactionDetailPage(props: PageProps) {
  const { transactionId } = await props.params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const transaction = await getTransactionById(transactionId, session.user.id);

  console.log("transaction", transaction);

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
              href="/transaction"
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              Transaction Hub
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="flex items-center gap-2 text-muted-foreground">
              Transaction Details
            </span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Transaction Details
        </h1>
        <Button variant="neutral" size="sm" asChild>
          <Link href="/transaction" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-3">
            {enrichedBucket?.coinDetails?.image?.thumb ? (
              <Image
                src={enrichedBucket.coinDetails.image.thumb}
                alt={enrichedBucket.coinDetails.name}
                width={24}
                height={24}
                className="h-6 w-6"
              />
            ) : (
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            )}
            <div>
              <h2 className="text-xl font-semibold">
                {enrichedBucket?.coinDetails?.name ||
                  transaction.coin_symbol.toUpperCase()}
              </h2>
              <p className="text-sm text-muted-foreground">
                {formatJakartaTime(transaction.transaction_date)}
              </p>
            </div>
          </div>
          <Badge variant={transaction.is_sale ? "neutral" : "default"}>
            {transaction.is_sale ? "Sale" : "Purchase"}
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs font-mono">
              ID: {transaction.id}
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 pt-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground font-mono text-sm">
                Quantity
              </span>
              <span className="font-mono text-sm">
                {transaction.quantity.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 8,
                })}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground font-mono text-sm">
                Price per coin
              </span>
              <span className="font-mono text-sm">
                Rp {formatNonCompactPrice(transaction.price_per_coin)}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-mono text-sm">Total value</span>
              <span className="font-mono text-base">
                Rp {formatNonCompactPrice(transaction.total_cost)}
              </span>
            </div>

            <div className="grid grid-rows-2 gap-2 pt-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="neutral">Update</Button>
                <Button variant="neutral">Share</Button>
              </div>
              <Button variant="neutral">Mark as Sold</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
