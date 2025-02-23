import db from "@/app/db";
import { Bucket } from "../types/bucket.types";
import { EnrichedBucket } from "../types/coingecko.types";
import { getCoinDetails } from "./coingecko.service";

export async function getLatestUserBucket(
  userId: string
): Promise<EnrichedBucket | null> {
  const result = await db.query<Bucket>(
    `SELECT 
      id,
      user_id,
      coin_symbol,
      total_quantity::numeric,
      total_cost::numeric,
      average_price::numeric,
      created_at,
      updated_at
    FROM buckets 
    WHERE user_id = $1 
    ORDER BY created_at DESC 
    LIMIT 1`,
    [userId]
  );

  if (!result.rows[0]) {
    return null;
  }

  const bucket = result.rows[0];
  // Convert coin_symbol to lowercase for CoinGecko API
  const coinDetails = await getCoinDetails(bucket.coin_symbol.toLowerCase());

  return {
    bucket,
    coinDetails,
  };
}

export async function getAllUserBuckets(
  userId: string
): Promise<EnrichedBucket[]> {
  const result = await db.query<Bucket>(
    `SELECT 
      id,
      user_id,
      coin_symbol,
      total_quantity::numeric,
      total_cost::numeric,
      average_price::numeric,
      created_at,
      updated_at
    FROM buckets 
    WHERE user_id = $1 
    ORDER BY created_at DESC`,
    [userId]
  );

  const enrichedBuckets = await Promise.all(
    result.rows.map(async (bucket) => {
      const coinDetails = await getCoinDetails(
        bucket.coin_symbol.toLowerCase()
      );
      return {
        bucket,
        coinDetails,
      };
    })
  );

  return enrichedBuckets;
}

export async function createBucket(
  userId: string,
  coin_symbol: string
): Promise<EnrichedBucket> {
  const result = await db.query<Bucket>(
    `INSERT INTO buckets (
      user_id,
      coin_symbol
    ) VALUES ($1, $2)
    RETURNING *`,
    [userId, coin_symbol.toLowerCase()]
  );

  const bucket = result.rows[0];
  const coinDetails = await getCoinDetails(bucket.coin_symbol);

  return {
    bucket,
    coinDetails,
  };
}

export async function getBucketById(
  bucketId: string,
  userId: string
): Promise<EnrichedBucket | null> {
  const result = await db.query<Bucket>(
    `SELECT 
      id,
      user_id,
      coin_symbol,
      total_quantity::numeric,
      total_cost::numeric,
      average_price::numeric,
      created_at,
      updated_at
    FROM buckets 
    WHERE id = $1 AND user_id = $2`,
    [bucketId, userId]
  );

  if (!result.rows[0]) {
    return null;
  }

  const bucket = result.rows[0];
  const coinDetails = await getCoinDetails(bucket.coin_symbol.toLowerCase());

  return {
    bucket,
    coinDetails,
  };
}

export async function deleteBucketById(
  bucketId: string,
  userId: string
): Promise<boolean> {
  const result = await db.query(
    `DELETE FROM buckets 
    WHERE id = $1 AND user_id = $2 
    RETURNING id`,
    [bucketId, userId]
  );

  return (result.rowCount ?? 0) > 0;
}
