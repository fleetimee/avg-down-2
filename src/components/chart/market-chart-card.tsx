import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinGeckoMarketChart } from "@/features/buckets/types/coingecko.types";
import { cn } from "@/lib/utils";
import { MarketChart } from "./market-chart";

interface MarketChartCardProps {
  title: string;
  data?: CoinGeckoMarketChart | null;
  loading?: boolean;
  dataType?: "prices" | "market_caps" | "total_volumes";
  currency?: string;
  className?: string;
  height?: number;
}

export function MarketChartCard({
  title,
  data,
  loading = false,
  dataType = "prices",
  currency = "IDR",
  className,
  height = 200,
}: MarketChartCardProps) {
  // If data is loading or null, show loading states
  if (loading || !data) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-6 w-24 animate-pulse bg-gray-200 dark:bg-gray-800 rounded" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div
            className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md"
            style={{ height: `${height}px` }}
          />
        </CardContent>
      </Card>
    );
  }

  // Get the current and initial values to calculate change
  const chartData = data[dataType];
  if (!chartData || chartData.length === 0) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div>No data available</div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div
            className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-md"
            style={{ height: `${height}px` }}
          >
            <p className="text-sm text-gray-500">No chart data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Extract the first and last data points for calculations
  const firstDataPoint = chartData[0];
  const lastDataPoint = chartData[chartData.length - 1];
  const initialValue = firstDataPoint[1];
  const currentValue = lastDataPoint[1];

  // Calculate percentage change
  const change = currentValue - initialValue;
  const percentChange = (change / initialValue) * 100;
  const isPositive = percentChange >= 0;

  // Format the current value based on data type
  const formattedValue = formatValue(currentValue, dataType, currency);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{formattedValue}</span>
          <span
            className={cn(
              "text-sm font-medium",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isPositive ? "+" : ""}
            {percentChange.toFixed(2)}%
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <MarketChart
          data={data}
          height={height}
          dataType={dataType}
          currency={currency}
        />
      </CardContent>
    </Card>
  );
}

// Helper function to format values based on data type
function formatValue(
  value: number,
  dataType: string,
  currency: string
): string {
  if (dataType === "prices") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: value < 1000 ? 4 : 0,
      maximumFractionDigits: value < 1000 ? 6 : 0,
    }).format(value);
  } else {
    // For market caps and volumes, format with abbreviations
    const formatter = new Intl.NumberFormat("id-ID");
    if (value >= 1e12) {
      return `${formatter.format(value / 1e12)}T`;
    } else if (value >= 1e9) {
      return `${formatter.format(value / 1e9)}B`;
    } else if (value >= 1e6) {
      return `${formatter.format(value / 1e6)}M`;
    } else if (value >= 1e3) {
      return `${formatter.format(value / 1e3)}K`;
    }
    return formatter.format(value);
  }
}
