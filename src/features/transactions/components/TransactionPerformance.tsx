import { AlertTriangle } from "lucide-react";
import { formatNonCompactPrice } from "@/lib/utils";

interface TransactionPerformanceProps {
  currentPrice: number;
  quantity: number;
  totalCost: number;
}

export function TransactionPerformance({
  currentPrice,
  quantity,
  totalCost,
}: TransactionPerformanceProps) {
  const currentValue = currentPrice * quantity;
  const pnl = currentValue - totalCost;
  const pnlPercentage = (pnl / totalCost) * 100;

  const getMessage = (pnl: number, percentage: number) => {
    if (percentage > 100) return "🚀 To the moon!";
    if (percentage > 50) return "💎 Diamond hands paying off!";
    if (percentage > 20) return "📈 Solid gains!";
    if (percentage > 0) return "✨ In the green!";
    if (percentage > -10) return "💪 Hold strong!";
    if (percentage > -20) return "😅 Still early days!";
    if (percentage > -50) return "🙏 Trust the process!";
    return "💎 True diamond hands test!";
  };

  if (!currentPrice) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <AlertTriangle className="h-4 w-4" />
        <p className="text-sm">Unable to fetch current market data</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between py-2 border-b">
        <span className="text-muted-foreground font-mono text-sm">Current Price</span>
        <span className="font-mono text-sm">
          Rp {formatNonCompactPrice(currentPrice)}
        </span>
      </div>
      <div className="flex justify-between py-2 border-b">
        <span className="text-muted-foreground font-mono text-sm">Current Value</span>
        <span className="font-mono text-sm">
          Rp {formatNonCompactPrice(currentValue)}
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 py-4">
        <span className={`font-mono text-2xl font-bold ${pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
          {pnl >= 0 ? "+" : ""}{formatNonCompactPrice(pnl)}
        </span>
        <span className={`font-mono text-sm ${pnl >= 0 ? "text-green-500/80" : "text-red-500/80"}`}>
          ({pnlPercentage.toFixed(2)}%)
        </span>
        <span className="text-sm text-muted-foreground font-medium mt-2">
          {getMessage(pnl, pnlPercentage)}
        </span>
      </div>
    </>
  );
}