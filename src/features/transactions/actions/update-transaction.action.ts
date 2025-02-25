"use server";

import { auth } from "../../../../auth";
import { UpdateTransactionSchema } from "../schemas/update-transaction.schema";
import { headers } from "next/headers";
import { updateTransaction } from "../services/transaction.service";

const MAX_NUMERIC_VALUE = 99999999999.99999999;

export async function updateTransactionAction(
  transactionId: string,
  formData: {
    quantity: string;
    price_per_coin: string;
  }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return {
        success: false,
        message: "You must be logged in to update a transaction.",
      };
    }

    const validatedFields = UpdateTransactionSchema.safeParse({
      quantity: formData.quantity,
      price_per_coin: formData.price_per_coin,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid form data. Please check your inputs.",
      };
    }

    // Convert validated strings to numbers
    const quantity = parseFloat(validatedFields.data.quantity);
    const price_per_coin = parseFloat(validatedFields.data.price_per_coin);

    // Additional validation for total cost
    const totalCost = quantity * price_per_coin;
    if (totalCost > MAX_NUMERIC_VALUE) {
      return {
        success: false,
        message: "Total transaction value exceeds maximum allowed amount",
      };
    }

    const success = await updateTransaction(
      transactionId,
      session.user.id,
      quantity,
      price_per_coin
    );

    if (!success) {
      return {
        success: false,
        message: "Transaction not found or you're not authorized to update it.",
      };
    }

    return {
      success: true,
      message: "Transaction updated successfully",
    };
  } catch (error) {
    console.error("Error in updateTransactionAction:", error);
    return {
      success: false,
      message: "Failed to update transaction. Please try again.",
    };
  }
}
