"use client";

import { Home, Settings, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background pb-safe">
      <Tabs defaultValue={pathname} className="w-full">
        <TabsList className="w-full h-16 grid grid-cols-3 rounded-none border-0 bg-background">
          <TabsTrigger value="/" asChild>
            <Link
              href="/"
              className="flex flex-col items-center py-2 data-[state=active]:text-primary"
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="/profile" asChild>
            <Link
              href="/profile"
              className="flex flex-col items-center py-2 data-[state=active]:text-primary"
            >
              <User size={24} />
              <span className="text-xs">Profile</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="/settings" asChild>
            <Link
              href="/settings"
              className="flex flex-col items-center py-2 data-[state=active]:text-primary"
            >
              <Settings size={24} />
              <span className="text-xs">Settings</span>
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
