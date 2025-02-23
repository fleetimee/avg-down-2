import { Bucket } from "./bucket.types";

export interface CoinGeckoMarketData {
  current_price: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap: { [key: string]: number };
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
}

export interface CoinGeckoImage {
  thumb: string;
  small: string;
  large: string;
}

export interface CoinGeckoResponse {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: CoinGeckoImage;
  market_data: CoinGeckoMarketData;
  last_updated: string;
}

export interface EnrichedBucket {
  bucket: Bucket;
  coinDetails: CoinGeckoResponse | null;
}

export interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  api_symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}
