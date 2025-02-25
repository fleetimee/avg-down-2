import { CSSProperties } from "react";
import {
  scaleTime,
  scaleLinear,
  max,
  min,
  line as d3_line,
  curveMonotoneX,
  extent,
} from "d3";
import { CoinGeckoMarketChart } from "@/features/buckets/types/coingecko.types";

interface MarketChartProps {
  data?: CoinGeckoMarketChart | null;
  height?: number;
  loading?: boolean;
  dataType?: "prices" | "market_caps" | "total_volumes";
  currency?: string;
}

export function MarketChart({
  data,
  height = 200,
  loading = false,
  dataType = "prices",
  currency = "IDR",
}: MarketChartProps) {
  if (loading) {
    return (
      <div
        className="relative animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md"
        style={{ height: `${height}px` }}
      />
    );
  }

  if (!data || !data[dataType] || data[dataType].length === 0) {
    return (
      <div
        className="relative flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-md"
        style={{ height: `${height}px` }}
      >
        <p className="text-sm text-gray-500">No chart data available</p>
      </div>
    );
  }

  const chartData = data[dataType].map(([timestamp, value]) => ({
    date: new Date(timestamp),
    value,
  }));

  // Calculate domain values for scales
  const dates = extent(chartData.map((d) => d.date)) as [Date, Date];
  const values = [
    (min(chartData.map((d) => d.value)) as number) * 0.99, // Add some padding
    (max(chartData.map((d) => d.value)) as number) * 1.01, // Add some padding
  ];

  const xScale = scaleTime().domain(dates).range([0, 100]);

  const yScale = scaleLinear().domain(values).nice().range([100, 0]);

  const line = d3_line<(typeof chartData)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(curveMonotoneX);

  const pathData = line(chartData);
  if (!pathData) {
    return null;
  }

  // Calculate if the trend is positive (last value > first value)
  const isPositiveTrend =
    chartData[chartData.length - 1].value > chartData[0].value;
  const lineColor = isPositiveTrend ? "stroke-green-500" : "stroke-red-500";
  const dotColor = isPositiveTrend ? "text-green-400" : "text-red-400";

  // Format the price or value based on the data type
  const formatValue = (value: number): string => {
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
  };

  return (
    <div
      className="relative w-full"
      style={
        {
          height: `${height}px`,
          "--marginTop": "10px",
          "--marginRight": "10px",
          "--marginBottom": "25px",
          "--marginLeft": "60px",
        } as CSSProperties
      }
    >
      {/* Y axis */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        {yScale.ticks(5).map((value, i) => (
          <div
            key={i}
            style={{
              top: `${yScale(value)}%`,
              left: "0%",
            }}
            className="absolute text-xs tabular-nums -translate-y-1/2 text-gray-500 w-full text-right pr-2"
          >
            {formatValue(value)}
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <svg
          viewBox="0 0 100 100"
          className="overflow-visible w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {yScale.ticks(5).map((value, i) => (
            <g
              transform={`translate(0,${yScale(value)})`}
              className="text-zinc-300 dark:text-zinc-700"
              key={i}
            >
              <line
                x1={0}
                x2={100}
                stroke="currentColor"
                strokeDasharray="6,5"
                strokeWidth={0.5}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ))}
          {/* Line */}
          <path
            d={pathData}
            fill="none"
            className={lineColor}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Circles - only show a few key points */}
          {chartData
            .filter((_, i, arr) => {
              // Show first, last, and highest/lowest points
              const isFirst = i === 0;
              const isLast = i === arr.length - 1;
              const isHighest =
                arr[i].value === Math.max(...arr.map((d) => d.value));
              const isLowest =
                arr[i].value === Math.min(...arr.map((d) => d.value));

              // For longer datasets, only show select points
              if (arr.length > 14) {
                return isFirst || isLast || isHighest || isLowest;
              }

              // For smaller datasets, show all points
              return true;
            })
            .map((d, index) => (
              <path
                key={index}
                d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                vectorEffect="non-scaling-stroke"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                className={dotColor}
              />
            ))}
        </svg>

        <div className="translate-y-2">
          {/* X Axis */}
          {chartData
            .filter((_, i, arr) => {
              // For x-axis, show fewer labels if we have many data points
              if (arr.length <= 7) return true;
              if (arr.length <= 14) return i % 2 === 0;
              if (arr.length <= 30) return i % 3 === 0;
              return i % 7 === 0 || i === 0 || i === arr.length - 1;
            })
            .map((day, i, filtered) => {
              const isFirst = i === 0;
              const isLast = i === filtered.length - 1;

              return (
                <div key={i} className="overflow-visible text-zinc-500">
                  <div
                    style={{
                      left: `${xScale(day.date)}%`,
                      top: "100%",
                      transform: `translateX(${
                        isFirst ? "0%" : isLast ? "-100%" : "-50%"
                      })`,
                    }}
                    className="text-xs absolute"
                  >
                    {day.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
