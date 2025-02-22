import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface MainHeaderProps {
  title: string;
  subtitle?: string;
}

export function MainHeader({ title, subtitle }: MainHeaderProps) {
  return (
    <Card className="rounded-none border-x-0 border-t-0 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
          <Button variant="neutral" size="icon" asChild>
            <Link href="/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
