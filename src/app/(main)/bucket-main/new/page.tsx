"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBucket } from "@/features/buckets/services/bucket.service";
import { auth } from "../../../../../auth";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { headers } from "next/headers";

const newBucketSchema = z.object({
  coin_symbol: z.string().min(1, "Coin symbol is required").toLowerCase(),
});

type NewBucketForm = z.infer<typeof newBucketSchema>;

export default function BucketNewPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<NewBucketForm>({
    resolver: zodResolver(newBucketSchema),
    defaultValues: {
      coin_symbol: "",
    },
  });

  async function onSubmit(data: NewBucketForm) {
    startTransition(async () => {
      try {
        const session = await auth.api.getSession({
          headers: await headers(),
        });
        if (!session) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to create a bucket",
          });
          router.push("/sign-in");
          return;
        }

        await createBucket(session.user.id, data.coin_symbol);
        toast({
          title: "Success",
          description: "Bucket created successfully",
        });
        router.refresh();
        router.push("/bucket-main");
      } catch (error: unknown) {
        console.error("Failed to create bucket:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create bucket. Please try again.",
        });
      }
    });
  }

  return (
    <div className="container max-w-lg py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Bucket</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="coin_symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coin Symbol</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="btc"
                        {...field}
                        className="uppercase"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="reverse"
                  onClick={() => router.back()}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create Bucket"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
