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
  const [isLoading, setIsLoading] = React.useState(false);
  const [coins, setCoins] = React.useState<CoinSearchResult[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 300);

  React.useEffect(() => {
    async function fetchCoins() {
      if (!debouncedSearch) {
        setCoins([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchCoins(debouncedSearch);
        setCoins(results);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCoins();
  }, [debouncedSearch]);

  const selectedCoin = React.useMemo(
    () => coins.find((coin) => coin.symbol === value?.toLowerCase()),
    [coins, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCoin ? (
            <div className="flex items-center gap-2">
              <Image
                src={selectedCoin.thumb}
                alt={selectedCoin.name}
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span>{selectedCoin.name}</span>
              <span className="text-muted-foreground">
                ({selectedCoin.symbol.toUpperCase()})
              </span>
            </div>
          ) : (
            "Search for a cryptocurrency..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search for a coin..."
            value={searchQuery}
            onValueChange={setSearchQuery}
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
                  value={coin.symbol}
                  onSelect={(currentValue) => {
                    onSelect(currentValue);
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
                      value === coin.symbol ? "opacity-100" : "opacity-0"
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
