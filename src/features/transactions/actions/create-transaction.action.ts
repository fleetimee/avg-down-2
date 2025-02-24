"use server";

import { z } from "zod";
import { auth } from "../../../../auth";
import { headers } from "next/headers";
import { createTransaction } from "../services/transaction.service";
import { revalidatePath } from "next/cache";

const MAX_NUMERIC_VALUE = 9999999999.99999999; // Matches PostgreSQL numeric(18,8) limit

const transactionSchema = z.object({
  quantity: z.coerce
    .number()
    .positive("Quantity must be positive")
    .max(MAX_NUMERIC_VALUE, "Quantity is too large")
    .transform((val) => Number(val.toFixed(8))), // Ensure 8 decimal places max
  price_per_coin: z.coerce
    .number()
    .positive("Price must be positive")
    .max(MAX_NUMERIC_VALUE, "Price is too large")
    .transform((val) => Number(val.toFixed(8))), // Ensure 8 decimal places max
});

export type CreateTransactionFormState = {
  success: boolean;
  message: string;
};

export async function createTransactionAction(
  bucketId: string,
  formData: FormData
): Promise<CreateTransactionFormState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "You must be logged in to create a transaction",
      };
    }

    const validatedFields = transactionSchema.safeParse({
      quantity: formData.get("quantity"),
      price_per_coin: formData.get("price_per_coin"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid form data. Please check your inputs.",
      };
    }

    const { quantity, price_per_coin } = validatedFields.data;

    // Additional validation for total cost
    const totalCost = quantity * price_per_coin;

    console.log("Total Cost:", totalCost);

    if (totalCost > MAX_NUMERIC_VALUE) {
      return {
        success: false,
        message: "Total transaction value exceeds maximum allowed amount",
      };
    }

    await createTransaction(
      session.user.id,
      bucketId,
      quantity,
      price_per_coin
    );

    revalidatePath("/bucket-main");
    revalidatePath(`/transaction/${bucketId}`);

    return {
      success: true,
      message: "Transaction created successfully",
    };
  } catch (error) {
    console.error("Failed to create transaction:", error);
    return {
      success: false,
      message: "Failed to create transaction. Please try again.",
    };
  }
}
