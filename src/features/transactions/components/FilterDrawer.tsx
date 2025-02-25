"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const sortOptions = [
  { value: "date_desc", label: "Date (Newest First)" },
  { value: "date_asc", label: "Date (Oldest First)" },
  { value: "amount_desc", label: "Amount (Highest First)" },
  { value: "amount_asc", label: "Amount (Lowest First)" },
  { value: "price_desc", label: "Price (Highest First)" },
  { value: "price_asc", label: "Price (Lowest First)" },
] as const;

export function FilterDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);

  // Get current filter values from URL
  const currentSort = searchParams.get("sort") || "date_desc";
  const showSaleOnly = searchParams.get("sale") === "true";

  const handleFilterChange = (
    key: "sort" | "sale",
    value: string | boolean
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort");
    params.delete("sale");
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="neutral" size="icon">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter Transactions</DrawerTitle>
          <DrawerDescription>
            Customize how your transactions are displayed
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sort">Sort by</Label>
            <Select
              value={currentSort}
              onValueChange={(value) => handleFilterChange("sort", value)}
            >
              <SelectTrigger id="sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sale-filter">Show sales only</Label>
            <Switch
              id="sale-filter"
              checked={showSaleOnly}
              onCheckedChange={(checked) => handleFilterChange("sale", checked)}
            />
          </div>
        </div>
        <DrawerFooter>
          <Button variant="default" onClick={handleReset}>
            Reset Filters
          </Button>
          <DrawerClose asChild>
            <Button variant="neutral">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
