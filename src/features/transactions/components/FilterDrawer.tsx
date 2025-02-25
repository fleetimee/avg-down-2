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
import { Input } from "@/components/ui/input";

const sortOptions = [
  { value: "date_desc", label: "Date (Newest First)" },
  { value: "date_asc", label: "Date (Oldest First)" },
  { value: "amount_desc", label: "Amount (Highest First)" },
  { value: "amount_asc", label: "Amount (Lowest First)" },
  { value: "price_desc", label: "Price (Highest First)" },
  { value: "price_asc", label: "Price (Lowest First)" },
] as const;

const limitOptions = [
  { value: "10", label: "10 per page" },
  { value: "20", label: "20 per page" },
  { value: "50", label: "50 per page" },
  { value: "100", label: "100 per page" },
] as const;

const MAX_ITEMS_PER_PAGE = 100;

export function FilterDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [jumpToPage, setJumpToPage] = React.useState("");

  // Get current filter values from URL
  const currentSort = searchParams.get("sort") || "date_desc";
  const showSaleOnly = searchParams.get("sale") === "true";
  const currentLimit = searchParams.get("limit") || "10";

  const handleFilterChange = (
    key: "sort" | "sale" | "limit" | "page",
    value: string | boolean
  ) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      // Add validation for limit values
      if (key === "limit") {
        const limitValue = parseInt(value.toString());
        if (limitValue > MAX_ITEMS_PER_PAGE) {
          value = MAX_ITEMS_PER_PAGE.toString();
        }
      }
      params.set(key, value.toString());
      // Reset to page 1 when changing filters except for direct page changes
      if (key !== "page") {
        params.set("page", "1");
      }
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (jumpToPage) {
      const pageNum = parseInt(jumpToPage);
      if (pageNum > 0) {
        handleFilterChange("page", pageNum.toString());
        setJumpToPage("");
      }
    }
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort");
    params.delete("sale");
    params.delete("limit");
    params.delete("page");
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

          <div className="space-y-2">
            <Label htmlFor="limit">Items per page</Label>
            <Select
              value={currentLimit}
              onValueChange={(value) => handleFilterChange("limit", value)}
            >
              <SelectTrigger id="limit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {limitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jump-page">Jump to page</Label>
            <form onSubmit={handleJumpToPage} className="flex gap-2">
              <Input
                id="jump-page"
                type="number"
                min="1"
                placeholder="Page number"
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.target.value)}
              />
              <Button type="submit" variant="neutral" size="sm">
                Go
              </Button>
            </form>
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
