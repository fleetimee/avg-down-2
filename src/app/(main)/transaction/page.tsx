import { auth } from "../../../../auth";
import { headers } from "next/headers";
import { TransactionList } from "@/features/transactions/components";
import { getRecentUserTransactions } from "@/features/transactions/services/transaction.service";
import { EmptyTransactionCard } from "@/features/transactions/components/EmptyTransactionCard";
import { History, Home as HomeIcon, AlertCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function TransactionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const recentTransactions = await getRecentUserTransactions(session.user.id, 10);
  const initials = session.user.name?.[0] || session.user.email?.[0] || "?";

  return (
    <div className="flex flex-col gap-6 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/transaction" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Transactions
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4 mb-2">
        <Avatar>
          <AvatarImage
            src={session.user.image || ""}
            alt={session.user.name || "User"}
          />
          <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-sm text-muted-foreground">Track your investment journey</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          View your last 10 transactions across all cryptocurrency buckets in chronological order.
        </AlertDescription>
      </Alert>

      {recentTransactions.length > 0 ? (
        <TransactionList
          transactions={recentTransactions.map((tx) => ({
            ...tx,
            coinDetails: null,
          }))}
        />
      ) : (
        <EmptyTransactionCard />
      )}
    </div>
  );
}
