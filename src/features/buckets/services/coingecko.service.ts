import { CoinGeckoResponse, CoinSearchResult } from "../types/coingecko.types";

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
