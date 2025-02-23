"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteBucketAction } from "../actions/delete-bucket.action";

interface DeleteBucketDrawerProps {
  bucketId: string;
  bucketName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteBucketDrawer({
  bucketId,
  bucketName,
  isOpen,
  onClose,
}: DeleteBucketDrawerProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const { success } = await deleteBucketAction(bucketId);

    if (success) {
      toast({
        title: "Success",
        description: "Bucket deleted successfully",
      });
      router.push("/bucket-main");
    } else {
      toast({
        title: "Error",
        description: "Failed to delete bucket",
        variant: "destructive",
      });
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Delete Bucket</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete your {bucketName} bucket? This
            action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant="default" onClick={handleDelete}>
            Delete Bucket
          </Button>
          <DrawerClose asChild>
            <Button variant="neutral">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
