"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateBucketForm } from "@/features/buckets/components/CreateBucketForm";

export default function BucketNewPage() {
  return (
    <div className="container max-w-lg py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Bucket</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateBucketForm />
        </CardContent>
      </Card>
    </div>
  );
}
