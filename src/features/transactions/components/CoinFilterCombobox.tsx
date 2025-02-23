"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CoinFilterProps {
  coins: { symbol: string; name: string }[];
}

export function CoinFilterCombobox({ coins = [] }: CoinFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const currentCoin = searchParams.get("coin") || "";

  const handleSelect = (value: string) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("coin", value);
    } else {
      params.delete("coin");
    }
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="neutral"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isLoading}
        >
          {isLoading ? (
            "Loading..."
          ) : currentCoin ? (
            coins.find((coin) => coin.symbol.toLowerCase() === currentCoin.toLowerCase())?.name || currentCoin.toUpperCase()
          ) : (
            "Filter by coin..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search coin..." />
          <CommandEmpty>No coin found.</CommandEmpty>
          <CommandGroup>
            <CommandItem value="" onSelect={() => handleSelect("")}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  !currentCoin ? "opacity-100" : "opacity-0"
                )}
              />
              All coins
            </CommandItem>
            {coins.map((coin) => (
              <CommandItem
                key={coin.symbol}
                value={coin.symbol.toLowerCase()}
                onSelect={() => handleSelect(coin.symbol)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentCoin.toLowerCase() === coin.symbol.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {coin.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
