import { cn } from "@/lib/utils";

interface CoinPriceDisplayProps {
  price: number;
  variant?: "current" | "average";
  priceChange?: number;
  className?: string;
}

export function CoinPriceDisplay({
  price,
  variant = "current",
  priceChange,
  className,
}: CoinPriceDisplayProps) {
  const formattedPrice =
    variant === "average"
      ? Math.round(price).toLocaleString("id-ID") // For rupiah without decimals
      : price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }); // For USD with decimals

  return (
    <div className={cn("flex flex-col", className)}>
      <p className="text-sm text-gray-500">
        {variant === "current" ? "Current Price" : "Average Cost"}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">
          {variant === "current" ? "$" : "Rp"} {formattedPrice}
        </p>
        {variant === "current" && priceChange !== undefined && (
          <span
            className={cn(
              "text-sm font-medium",
              priceChange >= 0 ? "text-green-600" : "text-red-600"
            )}
          >
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
}
