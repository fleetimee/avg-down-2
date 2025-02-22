import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import {
  getLatestUserBucket,
  getAllUserBuckets,
} from "@/features/buckets/services/bucket.service";
import { BucketCard } from "@/features/buckets/components/BucketCard";
import { AddBucketButton } from "@/features/buckets/components/AddBucketButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRecentUserTransactions } from "@/features/transactions/services/transaction.service";
import { TransactionList } from "@/features/transactions/components";
import { EnrichedBucket } from "@/features/buckets/types/coingecko.types";
import { Coins, History, Home as HomeIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const [enrichedBucket, recentTransactions, buckets] = await Promise.all([
    getLatestUserBucket(session.user.id),
    getRecentUserTransactions(session.user.id, 5),
    getAllUserBuckets(session.user.id),
  ]);

  const bucketMap = buckets.reduce<Record<string, EnrichedBucket>>(
    (acc, bucket) => {
      acc[bucket.bucket.coin_symbol] = bucket;
      return acc;
    },
    {}
  );

  const enrichedTransactions = recentTransactions.map((transaction) => ({
    ...transaction,
    coinDetails: bucketMap[transaction.coin_symbol]?.coinDetails || null,
  }));

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
          <h1 className="text-2xl font-bold">
            Welcome, {session.user.name || session.user.email}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your investment buckets
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5" />
          <h2 className="text-2xl font-semibold">Latest Bucket</h2>
        </div>
        <AddBucketButton />
      </div>
      {enrichedBucket && <BucketCard bucket={enrichedBucket} />}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5" />
          <h2 className="text-2xl font-semibold">Recent Transactions</h2>
        </div>
      </div>
      {recentTransactions.length > 0 ? (
        <TransactionList transactions={enrichedTransactions} />
      ) : (
        <p className="text-sm text-muted-foreground">No transactions yet</p>
      )}
    </div>
  );
}
