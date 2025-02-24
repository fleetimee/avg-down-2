"use client";

import {
  AlertCircle,
  PencilIcon,
  CheckSquareIcon,
  ShareIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatJakartaTime, formatNonCompactPrice } from "@/lib/utils";
import { Transaction } from "../types/transaction.types";
import { CoinGeckoResponse } from "@/features/buckets/types/coingecko.types";
import Image from "next/image";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface TransactionDetailsProps {
  transaction: Transaction;
  coinDetails: CoinGeckoResponse | null;
}

export function TransactionDetails({
  transaction,
  coinDetails,
}: TransactionDetailsProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Card variant="white">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          {coinDetails?.image?.thumb ? (
            <Image
              src={coinDetails.image.thumb}
              alt={coinDetails.name}
              width={24}
              height={24}
              className="h-6 w-6"
            />
          ) : (
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {coinDetails?.name || transaction.coin_symbol.toUpperCase()}
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
              <Button variant="neutral" className="flex items-center gap-2">
                <PencilIcon className="h-4 w-4" />
                Update
              </Button>
              <Button variant="neutral" className="flex items-center gap-2">
                <ShareIcon className="h-4 w-4" />
                Share
              </Button>
            </div>
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="neutral" className="flex items-center gap-2">
                  <CheckSquareIcon className="h-4 w-4" />
                  Mark as Sold
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Mark Transaction as Sold</DrawerTitle>
                  <DrawerDescription>
                    Enter the selling details for your{" "}
                    {transaction.coin_symbol.toUpperCase()} position.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pt-0">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Original purchase: {transaction.quantity}{" "}
                      {transaction.coin_symbol.toUpperCase()} at Rp{" "}
                      {formatNonCompactPrice(transaction.price_per_coin)} per
                      coin
                    </AlertDescription>
                  </Alert>
                  {/* Form will be added in next implementation */}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
