import { auth } from "../../../../auth";
import { headers } from "next/headers";
import { TransactionList } from "@/features/transactions/components";
import { getRecentUserTransactions } from "@/features/transactions/services/transaction.service";
import { EmptyTransactionCard } from "@/features/transactions/components/EmptyTransactionCard";
import { History, Home as HomeIcon, AlertCircle, Search } from "lucide-react";
import { CoinFilterCombobox } from "@/features/transactions/components/CoinFilterCombobox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAllUserBuckets } from "@/features/buckets/services/bucket.service";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Fragment } from "react";

const ITEMS_PER_PAGE = 1;

interface TransactionPageProps {
  searchParams: Promise<{ coin?: string; page?: string }>;
}

export default async function TransactionPage(props: TransactionPageProps) {
  const searchParams = await props.searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const currentPage = Math.max(1, parseInt(searchParams.page || "1"));

  const [{ transactions, total }, buckets] = await Promise.all([
    getRecentUserTransactions(
      session.user.id,
      currentPage,
      ITEMS_PER_PAGE,
      searchParams.coin
    ),
    getAllUserBuckets(session.user.id),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const initials = session.user.name?.[0] || session.user.email?.[0] || "?";

  const coinDetailsMap = buckets.reduce((acc, bucket) => {
    if (bucket.coinDetails) {
      acc[bucket.bucket.coin_symbol.toLowerCase()] = {
        symbol: bucket.bucket.coin_symbol,
        name: bucket.coinDetails.name,
        image: bucket.coinDetails.image.small || bucket.coinDetails.image.thumb,
      };
    }
    return acc;
  }, {} as Record<string, { symbol: string; name: string; image?: string }>);

  const availableCoins = Object.values(coinDetailsMap);

  const enrichedTransactions = transactions.map((tx) => ({
    ...tx,
    coinDetails:
      buckets.find(
        (b) =>
          b.bucket.coin_symbol.toLowerCase() === tx.coin_symbol.toLowerCase()
      )?.coinDetails || null,
  }));

  function generatePageUrl(pageNum: number) {
    const params = new URLSearchParams();
    if (searchParams.coin) params.set("coin", searchParams.coin);
    params.set("page", pageNum.toString());
    return `/transaction?${params.toString()}`;
  }

  return (
    <div className="flex flex-col gap-6 p-4 pb-20">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/transaction"
              className="flex items-center gap-2"
            >
              <History className="h-4 w-4" />
              Transactions
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={session.user.image || ""}
            alt={session.user.name || "User"}
          />
          <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-sm text-muted-foreground">
            Track your investment journey
          </p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {searchParams.coin
            ? `Showing your last 10 transactions for ${
                coinDetailsMap[searchParams.coin.toLowerCase()]?.name ||
                searchParams.coin.toUpperCase()
              }`
            : "View your last 10 transactions across all cryptocurrency buckets"}
        </AlertDescription>
      </Alert>

      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <div className="flex-1">
          <CoinFilterCombobox coins={availableCoins} />
        </div>
      </div>

      {enrichedTransactions.length > 0 ? (
        <>
          <TransactionList transactions={enrichedTransactions} />
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={generatePageUrl(currentPage - 1)}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, index, array) => {
                    if (index > 0 && array[index - 1] !== page - 1) {
                      return (
                        <Fragment key={`ellipsis-${page}`}>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              href={generatePageUrl(page)}
                              isActive={page === currentPage}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        </Fragment>
                      );
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href={generatePageUrl(page)}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={generatePageUrl(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <EmptyTransactionCard />
      )}
    </div>
  );
}
