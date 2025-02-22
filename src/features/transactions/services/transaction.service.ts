import db from "@/app/db";
import { Transaction } from "../types/transaction.types";

export async function getLatestUserTransaction(
  userId: string
): Promise<Transaction | null> {
  const result = await db.query<Transaction>(
    `
    SELECT *
    FROM transactions
    WHERE user_id = $1
    ORDER BY transaction_date DESC
    LIMIT 1
  `,
    [userId]
  );

  return result.rows[0] || null;
}
