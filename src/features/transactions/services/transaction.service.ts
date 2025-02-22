import db from "@/app/db";
import { Transaction, TransactionWithCoin } from "../types/transaction.types";
import { getCoinDetails } from "@/features/buckets/services/coingecko.service";

export async function getLatestUserTransaction(
  userId: string
): Promise<TransactionWithCoin | null> {
  const result = await db.query<Transaction>(
    `
    SELECT t.*, b.coin_symbol
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE t.user_id = $1
    ORDER BY t.transaction_date DESC
    LIMIT 1
  `,
    [userId]
  );

  if (!result.rows[0]) return null;

  const transaction = result.rows[0];
  const coinDetails = await getCoinDetails(
    transaction.coin_symbol.toLowerCase()
  );

  return {
    ...transaction,
    coinDetails,
  };
}

export async function getRecentUserTransactions(
  userId: string,
  limit: number = 5
): Promise<TransactionWithCoin[]> {
  const result = await db.query<Transaction>(
    `
    SELECT t.*, b.coin_symbol
    FROM transactions t
    JOIN buckets b ON t.bucket_id = b.id
    WHERE t.user_id = $1
    ORDER BY t.transaction_date DESC
    LIMIT $2
  `,
    [userId, limit]
  );

  const transactionsWithCoin = await Promise.all(
    result.rows.map(async (transaction) => {
      const coinDetails = await getCoinDetails(
        transaction.coin_symbol.toLowerCase()
      );
      return {
        ...transaction,
        coinDetails,
      };
    })
  );

  return transactionsWithCoin;
}
