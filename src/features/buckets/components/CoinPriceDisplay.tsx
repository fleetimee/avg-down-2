import { cn } from "@/lib/utils";
import { formatCompactPrice, formatNonCompactPrice } from "@/lib/utils";

interface CoinPriceDisplayProps {
  price: number;
  variant?: "current" | "average";
  priceChange?: number;
  className?: string;
  compact?: boolean;
}

export function CoinPriceDisplay({
  price,
  variant = "current",
  priceChange,
  className,
  compact = true,
}: CoinPriceDisplayProps) {
  const formattedPrice =
    variant === "current" || !compact
      ? formatNonCompactPrice(price)
      : formatCompactPrice(price);

  return (
    <div className={cn("flex flex-col text-left", className)}>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">
          {variant === "current" ? "Current Price" : "Average Cost"}
        </p>
        {variant === "current" && priceChange !== undefined && (
          <span
            className={cn(
              "text-xs font-semibold",
              priceChange >= 0 ? "text-greenHulk" : "text-red-500"
            )}
          >
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </span>
        )}
      </div>
      <p className="text-base font-semibold">Rp {formattedPrice}</p>
    </div>
  );
}
