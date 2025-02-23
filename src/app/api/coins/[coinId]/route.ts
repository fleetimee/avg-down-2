import { NextResponse } from "next/server";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

export async function GET(
  request: Request,
  { params }: { params: { coinId: string } }
) {
  const coinId = params.coinId;

  if (!coinId || !isValidCoinId(coinId)) {
    return NextResponse.json(
      { error: "Invalid coin ID format" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/${encodeURIComponent(coinId.toLowerCase())}`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": COINGECKO_API_KEY ?? "",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `CoinGecko API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching coin details:", error);
    return NextResponse.json(
      { error: "Failed to fetch coin details" },
      { status: 500 }
    );
  }
}

// Only allow alphanumeric characters, hyphens, and underscores
function isValidCoinId(coinId: string): boolean {
  return /^[a-zA-Z0-9-_]+$/.test(coinId);
}
