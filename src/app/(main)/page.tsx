import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { getLatestUserBucket } from "@/features/buckets/services/bucket.service";
import { BucketCard } from "@/features/buckets/components/BucketCard";

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
      <h2 className="text-2xl font-semibold">Latest Bucket</h2>
      {enrichedBucket && <BucketCard bucket={enrichedBucket} />}
    </div>
  );
}
