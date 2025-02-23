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
  page: number = 1,
  limit: number = 1,
  coinSymbol?: string
): Promise<{ transactions: Transaction[]; total: number }> {
  const offset = (page - 1) * limit;

  // Get total count
  const countQuery = `
    SELECT COUNT(*) as total
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE t.user_id = $1
    ${coinSymbol ? "AND LOWER(b.coin_symbol) = LOWER($2)" : ""}
  `;

  const countParams = coinSymbol ? [userId, coinSymbol] : [userId];
  const totalCount = await db.query(countQuery, countParams);

  // Get paginated transactions
  const query = `
    SELECT 
      t.*,
      b.coin_symbol,
      b.user_id
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE t.user_id = $1
    ${coinSymbol ? "AND LOWER(b.coin_symbol) = LOWER($4)" : ""}
    ORDER BY t.transaction_date DESC
    LIMIT $2 OFFSET $3
  `;

  const params = coinSymbol
    ? [userId, limit, offset, coinSymbol]
    : [userId, limit, offset];

  const result = await db.query<Transaction>(query, params);

  return {
    transactions: result.rows,
    total: parseInt(totalCount.rows[0].total),
  };
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
