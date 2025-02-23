"use client";

import * as React from "react";
import Image from "next/image";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList,
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
  coins: { symbol: string; name: string; image?: string }[];
}

export function CoinFilterCombobox({ coins = [] }: CoinFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const currentCoin = searchParams.get("coin") || "";

  const filteredCoins = React.useMemo(() => {
    if (!searchValue) return coins;
    const search = searchValue.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  }, [coins, searchValue]);

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
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isLoading}
        >
          {isLoading ? (
            "Loading..."
          ) : currentCoin ? (
            <div className="flex items-center gap-2">
              {coins.find(
                (coin) =>
                  coin.symbol.toLowerCase() === currentCoin.toLowerCase()
              )?.image && (
                <Image
                  src={
                    coins.find(
                      (coin) =>
                        coin.symbol.toLowerCase() === currentCoin.toLowerCase()
                    )?.image || ""
                  }
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              )}
              <span>
                {
                  coins.find(
                    (coin) =>
                      coin.symbol.toLowerCase() === currentCoin.toLowerCase()
                  )?.name
                }
              </span>
              <span className="text-muted-foreground">
                ({currentCoin.toUpperCase()})
              </span>
            </div>
          ) : (
            "Filter by coin..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command>
          <CommandList>
            <CommandInput
              placeholder="Search coin..."
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No coin found.</CommandEmpty>
            <CommandGroup>
              <CommandItem onSelect={() => handleSelect("")}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    !currentCoin ? "opacity-100" : "opacity-0"
                  )}
                />
                All coins
              </CommandItem>
              {filteredCoins.map((coin) => (
                <CommandItem
                  key={coin.symbol}
                  value={coin.symbol.toLowerCase()}
                  onSelect={() => handleSelect(coin.symbol.toLowerCase())}
                >
                  <div className="flex items-center gap-2">
                    {coin.image && (
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    )}
                    <span>{coin.name}</span>
                    <span className="text-muted-foreground">
                      ({coin.symbol.toUpperCase()})
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentCoin.toLowerCase() === coin.symbol.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
