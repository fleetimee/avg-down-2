"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TransactionSortOption } from "../services/transaction.service";

const sortLabels: Record<TransactionSortOption, string> = {
  date_desc: "Newest First",
  date_asc: "Oldest First",
  amount_desc: "Highest Amount",
  amount_asc: "Lowest Amount",
  price_desc: "Highest Price",
  price_asc: "Lowest Price",
};

interface FilterBadgesProps {
  coinDetails?: Record<string, { name: string; symbol: string }>;
  className?: string;
}

export function FilterBadges({ coinDetails, className }: FilterBadgesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") as TransactionSortOption;
  const showSaleOnly = searchParams.get("sale") === "true";
  const currentCoin = searchParams.get("coin");

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!currentSort && !showSaleOnly && !currentCoin) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {currentCoin && (
        <Badge
          variant="neutral"
          className="cursor-pointer hover:opacity-80"
          onClick={() => removeFilter("coin")}
        >
          {coinDetails?.[currentCoin.toLowerCase()]?.name || currentCoin.toUpperCase()}
          <X className="ml-1 h-3 w-3" />
        </Badge>
      )}
      {currentSort && (
        <Badge
          variant="neutral"
          className="cursor-pointer hover:opacity-80"
          onClick={() => removeFilter("sort")}
        >
          {sortLabels[currentSort]}
          <X className="ml-1 h-3 w-3" />
        </Badge>
      )}
      {showSaleOnly && (
        <Badge
          variant="neutral"
          className="cursor-pointer hover:opacity-80"
          onClick={() => removeFilter("sale")}
        >
          Sales Only
          <X className="ml-1 h-3 w-3" />
        </Badge>
      )}
    </div>
  );
}