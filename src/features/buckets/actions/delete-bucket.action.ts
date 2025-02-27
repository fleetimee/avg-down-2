"use server";

import { auth } from "@/../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { deleteBucketById } from "../services/bucket.service";
import { revalidatePath } from "next/cache";

export async function deleteBucketAction(
  bucketId: string
): Promise<{ success: boolean }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  try {
    await deleteBucketById(bucketId, session.user.id);
    revalidatePath("/bucket-main");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete bucket:", error);
    return { success: false };
  }
}
