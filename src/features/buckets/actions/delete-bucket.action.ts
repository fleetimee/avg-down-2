"use server";

import { auth } from "@/../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { deleteBucketById } from "../services/bucket.service";

export async function deleteBucketAction(bucketId: string): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  try {
    const isDeleted = await deleteBucketById(bucketId, session.user.id);

    if (isDeleted) {
      redirect("/bucket-main");
    }

    return false;
  } catch (error) {
    console.error("Failed to delete bucket:", error);
    return false;
  }
}
