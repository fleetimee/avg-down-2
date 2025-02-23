"use client";

import * as React from "react";
import Image from "next/image";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CoinSearchResult } from "../types/coingecko.types";
import { searchCoins } from "../services/coingecko.service";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";

interface CoinSearchComboboxProps {
  value?: string;
  onSelect: (value: string) => void;
}

export function CoinSearchCombobox({
  value,
  onSelect,
}: CoinSearchComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: coins = [], isLoading } = useQuery({
    queryKey: ["coins", debouncedSearch],
    queryFn: () => searchCoins(debouncedSearch),
    enabled: Boolean(debouncedSearch),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const [selectedCoinInfo, setSelectedCoinInfo] =
    React.useState<CoinSearchResult | null>(null);

  // When value changes externally, try to fetch coin info
  React.useEffect(() => {
    if (value && !selectedCoinInfo) {
      searchCoins(value).then((results) => {
        const coin = results.find(
          (c) => c.symbol.toLowerCase() === value.toLowerCase()
        );
        if (coin) {
          setSelectedCoinInfo(coin);
        }
      });
    }
  }, [value, selectedCoinInfo]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="noShadow"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedCoinInfo ? (
              <div className="flex items-center gap-2">
                <Image
                  src={selectedCoinInfo.thumb}
                  alt={selectedCoinInfo.name}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span>{selectedCoinInfo.name}</span>
                <span className="text-muted-foreground">
                  ({selectedCoinInfo.symbol.toUpperCase()})
                </span>
              </div>
            ) : (
              "Search for a cryptocurrency..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-0"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command className="w-full">
            <CommandInput
              placeholder="Search for a coin..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>
                {isLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  "No coins found."
                )}
              </CommandEmpty>
              <CommandGroup>
                {coins.map((coin) => (
                  <CommandItem
                    key={coin.id}
                    value={coin.api_symbol}
                    onSelect={() => {
                      setSelectedCoinInfo(coin);
                      onSelect(coin.api_symbol.toLowerCase());
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={coin.thumb}
                        alt={coin.name}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      <span>{coin.name}</span>
                      <span className="text-muted-foreground">
                        ({coin.symbol.toUpperCase()})
                      </span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === coin.symbol.toLowerCase()
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
    </div>
  );
}
