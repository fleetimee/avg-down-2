// app/actions/create-bucket.action.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../../../../auth";
import { createBucket } from "../services/bucket.service";
import { headers } from "next/headers";

const newBucketSchema = z.object({
  coin_symbol: z.string().min(1, "Coin symbol is required").toLowerCase(),
});

export type CreateBucketFormState = {
  success: boolean;
  message: string;
};

export async function createBucketAction(
  formData: FormData
): Promise<CreateBucketFormState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return {
        success: false,
        message: "You must be logged in to create a bucket",
      };
    }

    const formDataObj = Object.fromEntries(formData.entries());
    const validatedFields = newBucketSchema.safeParse(formDataObj);

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid coin symbol provided",
      };
    }

    await createBucket(session.user.id, validatedFields.data.coin_symbol);

    revalidatePath("/bucket-main");

    return {
      success: true,
      message: "Bucket created successfully",
    };
  } catch (error) {
    console.error("Failed to create bucket:", error);
    return {
      success: false,
      message: "Failed to create bucket. Please try again.",
    };
  }
}
