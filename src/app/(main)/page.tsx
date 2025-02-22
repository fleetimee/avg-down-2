import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { getLatestUserBucket } from "@/features/buckets/services/bucket.service";
import {
  AddTransactionButton,
  BucketCard,
} from "@/features/buckets/components";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const enrichedBucket = await getLatestUserBucket(session.user.id);

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Bucket Coin</h2>
        {enrichedBucket && <AddTransactionButton />}
      </div>
      {enrichedBucket && <BucketCard bucket={enrichedBucket} />}
    </div>
  );
}
