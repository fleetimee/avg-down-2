"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreVertical, ListIcon, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatJakartaTime } from "@/lib/utils";
import {
  EnrichedBucket,
  type CoinGeckoResponse,
} from "../types/coingecko.types";
import { useState } from "react";
import { DeleteBucketDrawer } from "./DeleteBucketDrawer";

interface BucketDetailsHeaderProps {
  coinDetails: CoinGeckoResponse;
  createdAt: Date;
  bucket: EnrichedBucket["bucket"];
}

export function BucketDetailsHeader({
  coinDetails,
  createdAt,
  bucket,
}: BucketDetailsHeaderProps) {
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
  const router = useRouter();

  console.log(coinDetails);

  const handleViewTransactions = () => {
    router.push(`/transaction?coin=${bucket.coin_symbol.toLowerCase()}`);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          {coinDetails?.image && (
            <Image
              src={coinDetails.image.large}
              alt={coinDetails.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <h1 className="text-xl font-semibold mb-1">{coinDetails?.name}</h1>
            <p className="text-sm text-muted-foreground">
              Created {formatJakartaTime(createdAt)}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-muted rounded-full">
              <MoreVertical className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={handleViewTransactions}
            >
              <ListIcon className="h-4 w-4" />
              View Transactions
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive"
              onClick={() => setIsDeleteDrawerOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              Delete Bucket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteBucketDrawer
        bucketId={bucket.id}
        bucketName={coinDetails?.name}
        isOpen={isDeleteDrawerOpen}
        onClose={() => setIsDeleteDrawerOpen(false)}
      />
    </>
  );
}
