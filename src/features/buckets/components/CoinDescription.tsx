import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CoinDescriptionProps {
  name: string;
  description: string;
}

export function CoinDescription({ name, description }: CoinDescriptionProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">About {name}</h2>
        </div>
        <div
          className="text-sm text-muted-foreground prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
    </Card>
  );
}
