import db from "@/app/db";
import { Transaction } from "../types/transaction.types";
import { getCoinDetails } from "@/features/buckets/services/coingecko.service";

export type TransactionSortOption =
  | "date_desc"
  | "date_asc"
  | "amount_desc"
  | "amount_asc"
  | "price_desc"
  | "price_asc";

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
  limit: number = 10,
  filters: {
    coinSymbol?: string;
    isSale?: boolean;
    sortBy?: TransactionSortOption;
  } = {}
): Promise<{ transactions: Transaction[]; total: number }> {
  const offset = (page - 1) * limit;
  const { coinSymbol, isSale, sortBy } = filters;

  // Build WHERE clause
  const conditions = ["t.user_id = $1"];
  const params = [userId];
  let paramCount = 1;

  if (coinSymbol) {
    paramCount++;
    conditions.push(`LOWER(b.coin_symbol) = LOWER($${paramCount})`);
    params.push(coinSymbol);
  }

  if (typeof isSale === "boolean") {
    paramCount++;
    conditions.push(`t.is_sale = $${paramCount}`);
    params.push(isSale.toString());
  }

  // Define sorting
  let orderBy = "t.transaction_date DESC";
  if (sortBy) {
    switch (sortBy) {
      case "date_asc":
        orderBy = "t.transaction_date ASC";
        break;
      case "date_desc":
        orderBy = "t.transaction_date DESC";
        break;
      case "amount_desc":
        orderBy = "t.quantity DESC";
        break;
      case "amount_asc":
        orderBy = "t.quantity ASC";
        break;
      case "price_desc":
        orderBy = "t.price_per_coin DESC";
        break;
      case "price_asc":
        orderBy = "t.price_per_coin ASC";
        break;
    }
  }

  // Get total count
  const countQuery = `
    SELECT COUNT(*) as total
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE ${conditions.join(" AND ")}`;

  const totalCount = await db.query(countQuery, params);

  // Get paginated transactions
  const query = `
    SELECT 
      t.*,
      b.coin_symbol,
      b.user_id
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE ${conditions.join(" AND ")}
    ORDER BY ${orderBy}
    LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
  `;

  const queryParams = [...params, limit, offset];
  const result = await db.query<Transaction>(query, queryParams);

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
    ) VALUES ($1, $2, $3::numeric(18,8), $4::numeric(18,8))
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

export async function getTransactionById(
  transactionId: string,
  userId: string
): Promise<Transaction | null> {
  const result = await db.query<Transaction>(
    `SELECT 
      t.*,
      b.coin_symbol,
      b.user_id
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE t.id = $1 AND t.user_id = $2
    LIMIT 1`,
    [transactionId, userId]
  );

  return result.rows[0] || null;
}

export async function markTransactionAsSold(
  transactionId: string,
  userId: string
): Promise<Transaction> {
  const result = await db.query<Transaction>(
    `UPDATE transactions 
     SET is_sale = TRUE 
     WHERE id = $1 AND user_id = $2 
     RETURNING *`,
    [transactionId, userId]
  );

  if (!result.rows[0]) {
    throw new Error("Transaction not found or unauthorized");
  }

  return result.rows[0];
}
