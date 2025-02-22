import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AddBucketButtonProps {
  className?: string;
}

export function AddBucketButton({ className }: AddBucketButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" size="icon" className={className}>
          <Plus className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Bucket</AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
