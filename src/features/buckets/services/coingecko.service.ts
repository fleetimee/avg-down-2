import { CoinGeckoResponse } from "../types/coingecko.types";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

export async function getCoinDetails(
  coinId: string
): Promise<CoinGeckoResponse | null> {
  try {
    const response = await fetch(`${COINGECKO_API_URL}/coins/${coinId}`, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": COINGECKO_API_KEY ?? "",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching coin details:", error);
    return null;
  }
}
