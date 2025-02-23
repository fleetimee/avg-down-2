import { NextResponse } from "next/server";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ coins: [] });
  }

  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/search?query=${encodeURIComponent(query)}`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": COINGECKO_API_KEY ?? "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({ coins: data.coins || [] });
  } catch (error) {
    console.error("Error searching coins:", error);
    return NextResponse.json({ coins: [] }, { status: 500 });
  }
}
