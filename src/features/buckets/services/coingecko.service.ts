import {
  CoinGeckoMarketChart,
  CoinGeckoResponse,
  CoinSearchResult,
  MarketChartOptions,
} from "../types/coingecko.types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function isValidCoinId(coinId: string): boolean {
  return /^[a-zA-Z0-9-_]+$/.test(coinId);
}

export async function getCoinDetails(
  coinId: string
): Promise<CoinGeckoResponse | null> {
  if (!coinId || !isValidCoinId(coinId)) {
    console.error(`Invalid coin ID format: ${coinId}`);
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/coins/${encodeURIComponent(coinId.toLowerCase())}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.status} for coin ${coinId}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching coin details:", error);
    return null;
  }
}

export async function getCoinMarketChart(
  coinId: string,
  options: MarketChartOptions = {}
): Promise<CoinGeckoMarketChart | null> {
  if (!coinId || !isValidCoinId(coinId)) {
    console.error(`Invalid coin ID format: ${coinId}`);
    return null;
  }

  // Default options
  const defaultOptions: MarketChartOptions = {
    vs_currency: "usd",
    days: 7,
    interval: "daily",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  // Build query parameters
  const params = new URLSearchParams();
  Object.entries(mergedOptions).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });

  try {
    // Make the request to our internal API endpoint
    const response = await fetch(
      `${BASE_URL}/api/coins/${encodeURIComponent(
        coinId.toLowerCase()
      )}/market-chart?${params.toString()}`,
      {
        // Use Next.js 15 fetch cache configuration
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      console.error(
        `API error: ${response.status} for coin market chart ${coinId}`
      );
      return null;
    }

    // Parse and validate the response
    const data = await response.json();

    // Validate the response structure matches what we expect
    if (!data.prices || !Array.isArray(data.prices)) {
      console.error("Invalid market chart data format", data);
      return null;
    }

    return data as CoinGeckoMarketChart;
  } catch (error) {
    console.error("Error fetching market chart data:", error);
    return null;
  }
}

export async function searchCoins(query: string): Promise<CoinSearchResult[]> {
  if (!query) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/api/coins/search?query=${encodeURIComponent(query)}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error("Error searching coins:", error);
    return [];
  }
}
