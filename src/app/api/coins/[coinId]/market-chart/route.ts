import { NextResponse } from "next/server";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

// Force dynamic responses for market data
export const dynamic = "force-dynamic";

export async function GET(
  request: Request, 
  props: { params: Promise<{ coinId: string }> }
) {
  const params = await props.params;
  const coinId = params.coinId;
  const { searchParams } = new URL(request.url);
  
  // Parse query parameters
  const vs_currency = searchParams.get("vs_currency") || "usd";
  const days = searchParams.get("days") || "7";
  const interval = searchParams.get("interval") || "daily";

  if (!coinId || !isValidCoinId(coinId)) {
    return NextResponse.json(
      { error: "Invalid coin ID format" },
      { status: 400 }
    );
  }

  try {
    // Build query parameters exactly as CoinGecko expects them
    const queryParams = new URLSearchParams();
    queryParams.set("vs_currency", vs_currency);
    queryParams.set("days", days);
    if (interval) {
      queryParams.set("interval", interval);
    }

    // Make request to CoinGecko API
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/${encodeURIComponent(coinId.toLowerCase())}/market_chart?${queryParams.toString()}`,
      {
        headers: {
          "Accept": "application/json",
          "x-cg-demo-api-key": COINGECKO_API_KEY || "",
        },
        // Ensure we're not caching market data by default
        cache: searchParams.get("cache") === "force-cache" ? "force-cache" : "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `CoinGecko API error: ${response.status}` },
        { status: response.status }
      );
    }

    // Directly parse and return the exact response from CoinGecko
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching market chart data:", error);
    return NextResponse.json(
      { error: "Failed to fetch market chart data" },
      { status: 500 }
    );
  }
}

// Only allow alphanumeric characters, hyphens, and underscores
function isValidCoinId(coinId: string): boolean {
  return /^[a-zA-Z0-9-_]+$/.test(coinId);
}
