import { History, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyTransactionCard() {
  return (
    <Card className="w-full min-h-[200px] flex flex-col justify-center items-center border-dashed">
      <CardHeader className="text-center pb-0">
        <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium">No Transactions Yet</h3>
        <p className="text-sm text-muted-foreground">
          Add your first transaction to start tracking your investments
        </p>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href="/bucket-main" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Transaction
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
