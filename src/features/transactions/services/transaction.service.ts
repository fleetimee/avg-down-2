import db from "@/app/db";
import { Transaction } from "../types/transaction.types";
import { getCoinDetails } from "@/features/buckets/services/coingecko.service";

export async function getLatestUserTransaction(
  userId: string
): Promise<Transaction | null> {
  const result = await db.query<Transaction>(
    `SELECT 
      t.*,
      b.coin_symbol,
      b.user_id
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE t.user_id = $1
    ORDER BY t.transaction_date DESC
    LIMIT 1`,
    [userId]
  );

  return result.rows[0] || null;
}

export async function getRecentUserTransactions(
  userId: string,
  limit: number = 5,
  coinSymbol?: string
): Promise<Transaction[]> {
  const query = `
    SELECT 
      t.*,
      b.coin_symbol,
      b.user_id
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE t.user_id = $1
    ${coinSymbol ? "AND LOWER(b.coin_symbol) = LOWER($3)" : ""}
    ORDER BY t.transaction_date DESC
    LIMIT $2
  `;

  const params = coinSymbol ? [userId, limit, coinSymbol] : [userId, limit];

  const result = await db.query<Transaction>(query, params);
  return result.rows;
}

export async function createTransaction(
  userId: string,
  bucketId: string,
  quantity: number,
  price_per_coin: number
): Promise<Transaction> {
  const result = await db.query<Transaction>(
    `INSERT INTO transactions (
      user_id,
      bucket_id,
      quantity,
      price_per_coin
    ) VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [userId, bucketId, quantity, price_per_coin]
  );

  return result.rows[0];
}

export async function getUserCoins(userId: string) {
  // First get unique coins from buckets
  const result = await db.query<{ symbol: string }>(
    `SELECT DISTINCT 
      b.coin_symbol as symbol
    FROM buckets b
    WHERE b.user_id = $1
    ORDER BY b.coin_symbol`,
    [userId]
  );

  // Then fetch coin details from CoinGecko for each unique coin
  const coinDetails = await Promise.all(
    result.rows.map(async (row) => {
      const details = await getCoinDetails(row.symbol);
      return {
        symbol: row.symbol,
        name: details?.name || row.symbol.toUpperCase(),
      };
    })
  );

  return coinDetails;
}
