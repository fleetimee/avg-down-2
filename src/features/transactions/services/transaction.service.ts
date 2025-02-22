import db from "@/app/db";
import { Transaction } from "../types/transaction.types";

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
  limit: number = 5
): Promise<Transaction[]> {
  const result = await db.query<Transaction>(
    `SELECT 
      t.*,
      b.coin_symbol,
      b.user_id
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE t.user_id = $1
    ORDER BY t.transaction_date DESC
    LIMIT $2`,
    [userId, limit]
  );

  return result.rows;
}
