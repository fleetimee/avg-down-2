"use server";

import { auth } from "../../../../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { markTransactionAsSold } from "../services/transaction.service";

export async function markAsSoldAction(transactionId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "You must be logged in to perform this action",
      };
    }

    await markTransactionAsSold(transactionId, session.user.id);
    
    revalidatePath("/bucket-main");
    revalidatePath("/transaction/tx/[transactionId]", "page");

    return {
      success: true,
      message: "Transaction marked as sold successfully",
    };
  } catch (error: unknown) {
    console.error("Failed to mark transaction as sold:", error);
    return {
      success: false,
      message: "Failed to mark transaction as sold",
    };
  }
}